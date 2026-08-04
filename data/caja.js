// Estado de caja, cuentas por cobrar y compromisos futuros conocidos.
// Actualizar cada vez que el socio informe el saldo o se sepa de un pago/cobro con fecha.
const CAJA = {
  // Saldo REAL informado por el usuario el 03-ago-2026.
  //
  // CUADRADO al 03-ago-2026. Partiendo de los $190.000 del 29-jul y sumando lo registrado
  // (Ferrocentro 299.880 + Janssen 193.970 + TGC 124.534 - Regalo Franca 17.800 - Patrol 49.937,
  // todo a valor de cuenta o sea con IVA en los ingresos) da $740.646 contra $753.743 reales.
  // Los $13.096 de diferencia se explican solos: los "190 lucas" del 29-jul eran una cifra
  // redondeada del socio; el saldo exacto de ese dia habria sido $203.096. No falta ningun
  // movimiento por registrar.
  //
  // OJO al cuadrar: la cuenta bancaria se mueve por montos CON IVA, mientras que movimientos.js
  // guarda NETOS. Comparar netos contra el saldo del banco da diferencias falsas.
  saldoActual: 753743,
  fechaSaldo: '2026-08-03',
  fuente: 'Saldo real informado por el usuario el 03-ago-2026',

  ivaTasa: 0.19,
  // Umbral de caja bajo el cual se considera riesgo de liquidez (colchón mínimo deseado).
  colchonMinimo: 200000,

  // Ya cobrados y sacados de esta lista (quedaron como movimientos en movimientos.js):
  //   - Ferrocentro: junio+julio juntos el 30-jul ($299.880)
  //   - Janssen Maquinaria: factura N29 el viernes 31-jul ($193.970)
  //   - Bunsa (Grupo Janssen)
  cuentasPorCobrar: [
    { cliente: 'De Costa a Costa', neto: 30000, iva: true, folio: 21, fechaFactura: '2026-06-25',
      obs: 'Factura N21 del 25-jun sin pagar. Ademas NO se ha emitido la factura de julio.' },
  ],

  // Obligaciones que se sabe que existen pero sin fecha confirmada todavia.
  // Se muestran aparte porque no se pueden ubicar en el calendario, pero SI afectan la liquidez.
  obligacionesSinFecha: [
    { concepto: 'Patente comercial', monto: 240000, iva: false,
      obs: 'Monto aproximado informado por el socio. Confirmar fecha de vencimiento en la municipalidad: si cae antes del 6-ago, agrava el deficit.' },
  ],

  // Tarjeta de credito SOLICITADA (no aprobada todavia) al Banco de Chile (ejecutiva Francisca
  // Varela, suc. Puerto Varas), 30-jul-2026. Es un CUPO disponible, no plata en caja: no se cuenta
  // como ingreso hasta que efectivamente se use. El escenario de abajo sirve para simular un uso.
  tarjetaCredito: {
    cupo: 1500000,
    estado: 'Solicitada', // Solicitada | Aprobada | Rechazada
    fechaSolicitud: '2026-07-30',
    banco: 'Banco de Chile (suc. Puerto Varas)',
    obs: 'Solicitada como respaldo de liquidez para la temporada baja. Enviamos flujo contable y EERR; '
       + 'plazo propuesto 6 meses, pago calzado a la temporada alta de verano (Dic-Feb).',
  },

  // Escenario de USO de la tarjeta (NO es un hecho, es una hipotesis para ver el efecto en caja
  // si se gira parte del cupo). Poner `activo: true` para verlo reflejado en la proyeccion de caja.
  escenarioCredito: {
    activo: false,
    monto: 1500000,
    concepto: 'Uso de tarjeta de credito (cupo solicitado)',
    fechaIngreso: '2026-08-05',
    obs: 'Simula girar parte o todo el cupo de la tarjeta solicitada al Banco de Chile. '
       + 'No es plata confirmada: la tarjeta todavia esta en evaluacion.',
  },

  // Calendario de movimientos comprometidos (montos netos; `iva:true` significa que a caja
  // entra/sale el monto + IVA).
  compromisos: [
    { fecha: '2026-08-06', tipo: 'Egreso',  concepto: 'Pago bodega',                        monto: 416500, iva: false },
    // OJO: el mensaje decía "fácil bodegas y imprenta (80.500 +iva 95.000 +iva)". Los montos
    // se asignaron cruzados respecto al orden del texto porque el contrato de Imprenta
    // (Tec. Graficas Cordillera) es exactamente $80.500 y Facil Bodegas facturo $96.600 en julio.
    // Confirmar con el socio.
    { fecha: '2026-08-07', tipo: 'Ingreso', concepto: 'Facil Bodegas',                      monto: 95000,  iva: true },
    { fecha: '2026-08-07', tipo: 'Ingreso', concepto: 'Imprenta (Tec. Graficas Cordillera)', monto: 80500,  iva: true },
    { fecha: '2026-08-11', tipo: 'Egreso',  concepto: 'Sueldo Martin del Rio (bruto)',      monto: 280000, iva: false },
  ],
};
