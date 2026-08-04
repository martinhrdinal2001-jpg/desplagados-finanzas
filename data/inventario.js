// Inventario básico. Vacío a propósito: no hay stock físico registrado todavía — se carga
// manualmente desde la pestaña "Inventario" del dashboard (stock inicial + compras).
//
// { id, nombre, categoria, unidad, stockActual, costoUnitario, stockMinimo,
//   fechaVencimiento (o null), tipo: 'Consumible'|'Reutilizable' }
const PRODUCTOS = [];

// Movimientos de inventario. Cada consumo en visita se crea automáticamente al guardar una
// visita que use ese producto — no hay que cargarlo dos veces.
// { id, fecha, productoId, tipo: 'Compra'|'Consumo en visita'|'Ajuste manual'|'Pérdida',
//   cantidad, costoUnitario, visitaId (si aplica), obs }
const MOVIMIENTOS_INVENTARIO = [];
