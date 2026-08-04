// Facturas electronicas emitidas, extraidas de los PDF del SII (carpeta DESPLAGADOS/Empresas).
// Fuente de verdad de lo FACTURADO (distinto de lo COBRADO, que vive en movimientos.js).
// Folios ausentes en el respaldo al 29-jul-2026: 4, 5, 8, 16, 18, 20, 22, 26.
const FACTURAS = [
  {
    "folio": 1,
    "fecha": "2026-02-26",
    "cliente": "Mar del Sur 1140 (Edificio)",
    "razonSocial": "COMUNIDAD EDIFICIO EL NAVEGANTE",
    "rut": "56.040.300-3",
    "neto": 120000,
    "iva": 22800,
    "total": 142800,
    "comuna": "Las Condes"
  },
  {
    "folio": 2,
    "fecha": "2026-03-02",
    "cliente": "Tecnologias Graficas Cordillera",
    "razonSocial": "TECNOLOGIAS GRAFICAS CORDILLERA S A",
    "rut": "78.740.280-1",
    "neto": 80500,
    "iva": 15295,
    "total": 95795,
    "comuna": "Huechuraba"
  },
  {
    "folio": 3,
    "fecha": "2026-03-04",
    "cliente": "Facil Bodegas",
    "razonSocial": "INVERSIONES Y BODEGAS LAS TORRES SPA",
    "rut": "76.731.964-9",
    "neto": 73500,
    "iva": 13965,
    "total": 87465,
    "comuna": "Huechuraba"
  },
  {
    "folio": 6,
    "fecha": "2026-04-02",
    "cliente": "Tecnologias Graficas Cordillera",
    "razonSocial": "TECNOLOGIAS GRAFICAS CORDILLERA S A",
    "rut": "78.740.280-1",
    "neto": 80500,
    "iva": 15295,
    "total": 95795,
    "comuna": "Huechuraba"
  },
  {
    "folio": 7,
    "fecha": "2026-04-02",
    "cliente": "Facil Bodegas",
    "razonSocial": "INVERSIONES Y BODEGAS LAS TORRES SPA",
    "rut": "76.731.964-9",
    "neto": 73500,
    "iva": 13965,
    "total": 87465,
    "comuna": "Huechuraba"
  },
  {
    "folio": 9,
    "fecha": "2026-04-17",
    "cliente": "De Costa a Costa",
    "razonSocial": "COSTAMAR GOURMET SPA",
    "rut": "76.898.736-K",
    "neto": 30000,
    "iva": 5700,
    "total": 35700,
    "comuna": "Vitacura"
  },
  {
    "folio": 10,
    "fecha": "2026-04-30",
    "cliente": "Tecnologias Graficas Cordillera",
    "razonSocial": "TECNOLOGIAS GRAFICAS CORDILLERA S A",
    "rut": "78.740.280-1",
    "neto": 80500,
    "iva": 15295,
    "total": 95795,
    "comuna": "Huechuraba"
  },
  {
    "folio": 11,
    "fecha": "2026-05-08",
    "cliente": "Facil Bodegas",
    "razonSocial": "INVERSIONES Y BODEGAS LAS TORRES SPA",
    "rut": "76.731.964-9",
    "neto": 116800,
    "iva": 22192,
    "total": 138992,
    "comuna": "Huechuraba"
  },
  {
    "folio": 12,
    "fecha": "2026-05-11",
    "cliente": "Burgerholic",
    "razonSocial": "BH SPA",
    "rut": "77.694.224-3",
    "neto": 35020,
    "iva": 6654,
    "total": 41674,
    "comuna": "Lo Barnechea"
  },
  {
    "folio": 13,
    "fecha": "2026-05-15",
    "cliente": "De Costa a Costa",
    "razonSocial": "COSTAMAR GOURMET SPA",
    "rut": "76.898.736-K",
    "neto": 30000,
    "iva": 5700,
    "total": 35700,
    "comuna": "Vitacura"
  },
  {
    "folio": 14,
    "fecha": "2026-05-29",
    "cliente": "Tecnologias Graficas Cordillera",
    "razonSocial": "TECNOLOGIAS GRAFICAS CORDILLERA S A",
    "rut": "78.740.280-1",
    "neto": 80500,
    "iva": 15295,
    "total": 95795,
    "comuna": "Huechuraba"
  },
  {
    "folio": 15,
    "fecha": "2026-06-03",
    "cliente": "Facil Bodegas",
    "razonSocial": "INVERSIONES Y BODEGAS LAS TORRES SPA",
    "rut": "76.731.964-9",
    "neto": 95550,
    "iva": 18155,
    "total": 113705,
    "comuna": "Huechuraba"
  },
  {
    "folio": 17,
    "fecha": "2026-06-12",
    "cliente": "Janssen Maquinaria",
    "razonSocial": "JANSSEN MAQUINARIA SPA",
    "rut": "99.560.200-8",
    "neto": 163000,
    "iva": 30970,
    "total": 193970,
    "comuna": "Conchali"
  },
  {
    "folio": 19,
    "fecha": "2026-06-22",
    "cliente": "Ferrocentro",
    "razonSocial": "INDUSTRIAL Y COMERCIAL FERROCENTRO LTDA",
    "rut": "79.677.100-3",
    "neto": 126000,
    "iva": 23940,
    "total": 149940,
    "comuna": "Maipu"
  },
  {
    "folio": 21,
    "fecha": "2026-06-25",
    "cliente": "De Costa a Costa",
    "razonSocial": "COSTAMAR GOURMET SPA",
    "rut": "76.898.736-K",
    "neto": 30000,
    "iva": 5700,
    "total": 35700,
    "comuna": "Vitacura"
  },
  {
    "folio": 23,
    "fecha": "2026-06-26",
    "cliente": "Fanadego",
    "razonSocial": "FANADEGO SPA",
    "rut": "80.723.200-2",
    "neto": 287604,
    "iva": 54645,
    "total": 342249,
    "comuna": "San Bernardo"
  },
  {
    "folio": 24,
    "fecha": "2026-06-29",
    "cliente": "NovaClima",
    "razonSocial": "IMPACON SPA",
    "rut": "76.479.542-3",
    "neto": 90000,
    "iva": 17100,
    "total": 107100,
    "comuna": "Huechuraba"
  },
  {
    "folio": 25,
    "fecha": "2026-06-30",
    "cliente": "Burgerholic",
    "razonSocial": "BH SPA",
    "rut": "77.694.224-3",
    "neto": 35020,
    "iva": 6654,
    "total": 41674,
    "comuna": "Lo Barnechea"
  },
  {
    "folio": 27,
    "fecha": "2026-07-02",
    "cliente": "Bunsa (Bunster y Salas)",
    "razonSocial": "BUNSTER Y SALAS S A",
    "rut": "79.660.480-8",
    "neto": 155000,
    "iva": 29450,
    "total": 184450,
    "comuna": "Cerrillos"
  },
  {
    "folio": 28,
    "fecha": "2026-07-06",
    "cliente": "Facil Bodegas",
    "razonSocial": "INVERSIONES Y BODEGAS LAS TORRES SPA",
    "rut": "76.731.964-9",
    "neto": 95000,
    "iva": 18050,
    "total": 113050,
    "comuna": "Huechuraba"
  },
  {
    "folio": 29,
    "fecha": "2026-07-09",
    "cliente": "Janssen Maquinaria",
    "razonSocial": "JANSSEN MAQUINARIA SPA",
    "rut": "99.560.200-8",
    "neto": 163000,
    "iva": 30970,
    "total": 193970,
    "comuna": "Conchali"
  },
  {
    "folio": 30,
    "fecha": "2026-07-15",
    "cliente": "Ferrocentro",
    "razonSocial": "INDUSTRIAL Y COMERCIAL FERROCENTRO LTDA",
    "rut": "79.677.100-3",
    "neto": 126000,
    "iva": 23940,
    "total": 149940,
    "comuna": "Maipu"
  },
  {
    "folio": 31,
    "fecha": "2026-07-19",
    "cliente": "Fanadego",
    "razonSocial": "FANADEGO SPA",
    "rut": "80.723.200-2",
    "neto": 212801,
    "iva": 40432,
    "total": 253233,
    "comuna": "San Bernardo"
  },
  {
    "folio": 32,
    "fecha": "2026-07-19",
    "cliente": "Bunsa (Bunster y Salas)",
    "razonSocial": "BUNSTER Y SALAS S A",
    "rut": "79.660.480-8",
    "neto": 155000,
    "iva": 29450,
    "total": 184450,
    "comuna": "Cerrillos"
  },
  {
    "folio": 33,
    "fecha": "2026-07-27",
    "cliente": "Burgerholic",
    "razonSocial": "BH SPA",
    "rut": "77.694.224-3",
    "neto": 35020,
    "iva": 6654,
    "total": 41674,
    "comuna": "Lo Barnechea"
  },
  {
    "folio": 34,
    "fecha": "2026-07-28",
    "cliente": "Tecnologias Graficas Cordillera",
    "razonSocial": "TECNOLOGIAS GRAFICAS CORDILLERA S A",
    "rut": "78.740.280-1",
    "neto": 80500,
    "iva": 15295,
    "total": 95795,
    "comuna": "Huechuraba"
  }
];
