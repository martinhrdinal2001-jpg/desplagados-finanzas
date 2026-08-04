// Registro de visitas. Vacío a propósito: no hay datos históricos de horas, traslado ni
// insumos por visita, así que no se inventa nada acá — se llena hacia adelante desde la
// pestaña "Visitas" del dashboard.
//
// Estructura de cada visita:
// {
//   id, fecha, cliente, contratoId (opcional, referencia a CONTRATOS),
//   tipoServicio: 'Desratización'|'Desinsectación'|'Sanitización'|'Servicio integral'|'Otro',
//   tipoVisita: 'Instalación inicial'|'Mantención'|'Seguimiento'|'Emergencia'|'Garantía'|'Servicio puntual',
//   persona: 'Martín del Río'|'Martín Hrdina'|'Técnico externo'|'Otro',
//   horasTerreno, horasTraslado, km, tag, peajes, estacionamiento,
//   productos: [{ productoId, nombre, cantidad, costoUnitario }],  // costoUnitario snapshot al momento de la visita
//   cebaderas,            // texto libre: cuántas/cuáles se instalaron
//   materialesOtros,      // texto libre
//   costoOtros,           // $ de otros costos directos
//   ingresoNeto,          // null si todavía no se sabe
//   factura,              // folio, si existe
//   obs,
//   local: true            // si se agregó desde el navegador, no sincronizado aún
// }
const VISITAS = [];
