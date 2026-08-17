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
  {
    id: 'credito_hrdina',
    nombre: 'Crédito de consumo (vía Martín Hrdina)',
    acreedor: 'Banco → Martín Hrdina (socio) → Desplagados',
    cuotaMensual: 128387,
    primerPago: '2026-09',
    ultimoPago: '2027-03',
    categoriaMovimiento: 'Cuota crédito', // para contar cuotas ya pagadas desde movimientos.js
    montoOriginal: 800000,
    tasaMensual: 0.03,          // 3,0% mensual efectiva -> ~42,5% anual
    interesTotal: 98846,
    obs: 'Tomado el 17-ago-2026. Martin Hrdina saco el credito a su nombre personal y presto los '
       + '$800.000 a la empresa, que los recibio en caja (ver movimientos.js id 231). La EMPRESA paga '
       + 'las 7 cuotas. Es caro: 3,0% mensual, ~42,5% anual, $98.846 de interes total. '
       + 'OJO: el titular ante el banco es Martin Hrdina, no Desplagados — si la empresa no puede pagar '
       + 'una cuota, el que queda en DICOM es el. Conviene priorizar esta cuota por sobre otros pagos.',
    // Tabla de amortizacion (3,0% mensual sobre saldo insoluto). El INTERES es gasto financiero;
    // el CAPITAL es amortizacion de deuda (bajo la linea, no es gasto). Sirve para el EERR del banco,
    // donde la linea "Gastos Financieros" ya no puede ir en 0.
    amortizacion: [
      { mes: '2026-09', cuota: 128387, interes: 24000, capital: 104387, saldo: 695613 },
      { mes: '2026-10', cuota: 128387, interes: 20868, capital: 107519, saldo: 588094 },
      { mes: '2026-11', cuota: 128387, interes: 17643, capital: 110744, saldo: 477350 },
      { mes: '2026-12', cuota: 128387, interes: 14320, capital: 114067, saldo: 363283 },
      { mes: '2027-01', cuota: 128387, interes: 10898, capital: 117489, saldo: 245794 },
      { mes: '2027-02', cuota: 128387, interes:  7374, capital: 121013, saldo: 124781 },
      { mes: '2027-03', cuota: 128387, interes:  3743, capital: 124781, saldo:      0 },
    ],
  },
  // Agregar aca cualquier otro credito o deuda cuando el usuario pase los datos:
  // { id:'...', nombre:'...', acreedor:'...', cuotaMensual:0, primerPago:'AAAA-MM',
  //   ultimoPago:'AAAA-MM', categoriaMovimiento:null, obs:'...' },
];
