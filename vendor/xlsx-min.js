/* xlsx-min.js — generador mínimo de archivos .xlsx, sin dependencias.
 *
 * Por qué existe: el dashboard es HTML/JS autocontenido que tiene que abrirse
 * con doble clic (file://) y sin conexión, así que no puede cargar SheetJS ni
 * ninguna librería desde un CDN. Como lo único que necesitamos son tablas
 * planas (texto y números, sin colores ni fórmulas), alcanza con escribir el
 * .xlsx a mano: un .xlsx es un ZIP con XMLs adentro.
 *
 * El ZIP se arma con método STORE (sin comprimir) para no necesitar deflate.
 * Excel, LibreOffice y Google Sheets lo aceptan sin problema; el archivo pesa
 * más que uno comprimido, pero para estas tablas es irrelevante.
 *
 * Uso:
 *   const blob = XlsxMin.crear([
 *     { nombre: "Resumen", encabezados: ["A", "B"], filas: [["x", 1], ["y", 2]] },
 *     { nombre: "PBB", encabezados: [...], filas: [...] },
 *   ]);
 *   XlsxMin.descargar("archivo.xlsx", blob);
 *
 * Los valores numéricos se escriben como números reales (no texto), así se
 * pueden ordenar y sumar en Excel. null/undefined/"" dejan la celda vacía.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.XlsxMin = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // ------------------------------------------------------------------ CRC32
  var CRC_TABLE = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32(buf) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  // ------------------------------------------------------------- utilidades
  var enc = new TextEncoder();
  function bytes(str) { return enc.encode(str); }

  // XML 1.0 no admite la mayoría de los caracteres de control. Los sacamos
  // antes de escribir para no generar un archivo que Excel rechace.
  function escXml(s) {
    return String(s)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }

  function colLetra(n) {  // 1 -> A, 27 -> AA
    var s = "";
    while (n > 0) {
      var r = (n - 1) % 26;
      s = String.fromCharCode(65 + r) + s;
      n = (n - 1 - r) / 26;
    }
    return s;
  }

  // Excel: máximo 31 caracteres y sin : \ / ? * [ ]
  function limpiarNombreHoja(nombre, usados) {
    var n = String(nombre || "Hoja").replace(/[:\\\/\?\*\[\]]/g, "-").slice(0, 31).trim() || "Hoja";
    var base = n, i = 2;
    while (usados[n.toLowerCase()]) {
      var suf = " (" + i + ")";
      n = base.slice(0, 31 - suf.length) + suf;
      i++;
    }
    usados[n.toLowerCase()] = true;
    return n;
  }

  function esNumero(v) {
    return typeof v === "number" && isFinite(v);
  }

  // ------------------------------------------------------------ hoja -> XML
  function hojaXml(hoja) {
    var enc_ = hoja.encabezados || [];
    var filas = hoja.filas || [];
    var nCols = enc_.length;
    for (var f = 0; f < filas.length; f++) nCols = Math.max(nCols, filas[f].length);

    var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      // Fila de encabezado congelada: en tablas largas es lo que las hace usables.
      '<sheetViews><sheetView workbookViewId="0">' +
      '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>' +
      '</sheetView></sheetViews>';

    // Ancho de columna estimado según el contenido (sin esto los nombres de
    // producto quedan ilegibles). No es formato visual, es legibilidad básica.
    if (nCols) {
      xml += "<cols>";
      for (var c = 1; c <= nCols; c++) {
        var ancho = String(enc_[c - 1] == null ? "" : enc_[c - 1]).length;
        for (var r = 0; r < filas.length; r++) {
          var val = filas[r][c - 1];
          if (val != null) ancho = Math.max(ancho, String(val).length);
        }
        ancho = Math.min(Math.max(ancho + 2, 8), 55);
        xml += '<col min="' + c + '" max="' + c + '" width="' + ancho + '" customWidth="1"/>';
      }
      xml += "</cols>";
    }

    xml += "<sheetData>";

    function filaXml(valores, nFila) {
      var s = '<row r="' + nFila + '">';
      for (var i = 0; i < valores.length; i++) {
        var v = valores[i];
        if (v == null || v === "") continue;   // celda vacía: no se escribe
        var ref = colLetra(i + 1) + nFila;
        if (esNumero(v)) {
          s += '<c r="' + ref + '"><v>' + v + "</v></c>";
        } else {
          s += '<c r="' + ref + '" t="inlineStr"><is><t xml:space="preserve">' +
               escXml(v) + "</t></is></c>";
        }
      }
      return s + "</row>";
    }

    var nFila = 1;
    if (enc_.length) xml += filaXml(enc_, nFila++);
    for (var j = 0; j < filas.length; j++) xml += filaXml(filas[j], nFila++);

    return xml + "</sheetData></worksheet>";
  }

  // ------------------------------------------------------------------- ZIP
  function u16(n) { return [n & 0xFF, (n >>> 8) & 0xFF]; }
  function u32(n) { return [n & 0xFF, (n >>> 8) & 0xFF, (n >>> 16) & 0xFF, (n >>> 24) & 0xFF]; }

  function armarZip(archivos) {
    // Fecha/hora DOS: usamos una fija y válida (2020-01-01 00:00) para que el
    // archivo sea reproducible y no dependa del reloj del equipo.
    var dosTime = 0, dosDate = ((2020 - 1980) << 9) | (1 << 5) | 1;

    var partes = [], central = [], offset = 0, i;

    for (i = 0; i < archivos.length; i++) {
      var nombreBytes = bytes(archivos[i].nombre);
      var datos = archivos[i].datos;
      var crc = crc32(datos);

      var local = [].concat(
        u32(0x04034b50), u16(20), u16(0), u16(0),      // firma, versión, flags, método STORE
        u16(dosTime), u16(dosDate), u32(crc),
        u32(datos.length), u32(datos.length),          // comprimido == sin comprimir
        u16(nombreBytes.length), u16(0)
      );
      partes.push(new Uint8Array(local), nombreBytes, datos);

      central.push([].concat(
        u32(0x02014b50), u16(20), u16(20), u16(0), u16(0),
        u16(dosTime), u16(dosDate), u32(crc),
        u32(datos.length), u32(datos.length),
        u16(nombreBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0),
        u32(offset)
      ), nombreBytes);

      offset += local.length + nombreBytes.length + datos.length;
    }

    var centralInicio = offset, centralLargo = 0;
    for (i = 0; i < central.length; i += 2) {
      partes.push(new Uint8Array(central[i]), central[i + 1]);
      centralLargo += central[i].length + central[i + 1].length;
    }

    partes.push(new Uint8Array([].concat(
      u32(0x06054b50), u16(0), u16(0),
      u16(archivos.length), u16(archivos.length),
      u32(centralLargo), u32(centralInicio), u16(0)
    )));

    var total = 0;
    for (i = 0; i < partes.length; i++) total += partes[i].length;
    var out = new Uint8Array(total), pos = 0;
    for (i = 0; i < partes.length; i++) { out.set(partes[i], pos); pos += partes[i].length; }
    return out;
  }

  // -------------------------------------------------------------- API público
  function crearBytes(hojas) {
    if (!hojas || !hojas.length) throw new Error("Se necesita al menos una hoja.");

    var usados = {}, i;
    var nombres = hojas.map(function (h) { return limpiarNombreHoja(h.nombre, usados); });

    var contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>';
    for (i = 0; i < hojas.length; i++) {
      contentTypes += '<Override PartName="/xl/worksheets/sheet' + (i + 1) +
        '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>';
    }
    contentTypes += "</Types>";

    var rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
      "</Relationships>";

    var workbook = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>';
    for (i = 0; i < hojas.length; i++) {
      workbook += '<sheet name="' + escXml(nombres[i]) + '" sheetId="' + (i + 1) +
        '" r:id="rId' + (i + 1) + '"/>';
    }
    workbook += "</sheets></workbook>";

    var wbRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
    for (i = 0; i < hojas.length; i++) {
      wbRels += '<Relationship Id="rId' + (i + 1) +
        '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" ' +
        'Target="worksheets/sheet' + (i + 1) + '.xml"/>';
    }
    wbRels += "</Relationships>";

    var archivos = [
      { nombre: "[Content_Types].xml", datos: bytes(contentTypes) },
      { nombre: "_rels/.rels", datos: bytes(rels) },
      { nombre: "xl/workbook.xml", datos: bytes(workbook) },
      { nombre: "xl/_rels/workbook.xml.rels", datos: bytes(wbRels) },
    ];
    for (i = 0; i < hojas.length; i++) {
      archivos.push({
        nombre: "xl/worksheets/sheet" + (i + 1) + ".xml",
        datos: bytes(hojaXml(hojas[i])),
      });
    }

    return armarZip(archivos);
  }

  function crear(hojas) {
    return new Blob([crearBytes(hojas)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  }

  function descargar(nombreArchivo, blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombreArchivo;
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  return { crear: crear, crearBytes: crearBytes, descargar: descargar };
});
