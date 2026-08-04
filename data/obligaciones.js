// Obligaciones de la empresa: lo que Desplagados DEBE (al SII y a terceros).
// Complementa caja.js, que cubre lo que a Desplagados le deben a ella.

const IVA_CONFIG = {
  tasa: 0.19,

  // Los gastos en movimientos.js se registran por lo que efectivamente se PAGO, o sea con
  // IVA incluido (son compras de retail: "Murin Bloque $13.990", "Cyperkill $49.990").
  // Por eso el credito fiscal se saca hacia atras: monto * 19/119, no monto * 19%.
  // Si algun dia se pasan a registrar netos, cambiar esto a false.
  gastosIncluyenIva: true,

  // Categorias de gasto que dan derecho a credito fiscal (compras con factura).
  // Quedan fuera a proposito:
  //   - Honorarios: van con boleta de honorarios, no generan credito IVA.
  //   - Sueldo: remuneraciones, sin IVA.
  //   - Cuota furgon: se paga a Diego/Karel Hrdina (particulares), no hay factura.
  categoriasConCredito: [
    'Insumos/productos',
    'Combustible',
    'Equipamiento',
    'Mantención auto',
    'Marketing',
    'Contabilidad',
    'Arriendo',
    'Instalación inicial',
    'Capacitación',
  ],

  // "Otros gastos" es una bolsa mezclada (algunos con factura, otros no). Se excluye del
  // credito para no sobrestimarlo: mejor que el IVA a pagar salga alto y no bajo.
  nota: 'El debito fiscal se calcula desde las facturas emitidas al SII (facturas.js), que traen '
      + 'el IVA explicito. El credito se estima desde los gastos registrados. Es una ESTIMACION '
      + 'para tener visibilidad del compromiso: el F29 real lo arma el contador.',
};

// Deudas y creditos vigentes. cuotaMensual y fechas permiten calcular el saldo restante.
const DEUDAS = [
  {
    id: 'furgon',
    nombre: 'Furgón',
    acreedor: 'Diego / Karel Hrdina (familiar)',
    cuotaMensual: 250000,
    primerPago: '2025-12',
    ultimoPago: '2027-12',
    categoriaMovimiento: 'Cuota furgón', // para contar cuotas ya pagadas desde movimientos.js
    obs: 'Cuotas de $250.000 mensuales. Las primeras venian numeradas (N°1 a N°5). '
       + 'Al ser deuda familiar probablemente no tiene interes, pero conviene confirmar '
       + 'si hay un documento con el total y el plazo exacto.',
  },
  // Agregar aca cualquier otro credito o deuda cuando el usuario pase los datos:
  // { id:'...', nombre:'...', acreedor:'...', cuotaMensual:0, primerPago:'AAAA-MM',
  //   ultimoPago:'AAAA-MM', categoriaMovimiento:null, obs:'...' },
];
