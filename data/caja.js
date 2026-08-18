// Estado de caja, cuentas por cobrar y compromisos futuros conocidos.
// Actualizar cada vez que el socio informe el saldo o se sepa de un pago/cobro con fecha.
const CAJA = {
  // Saldo REAL informado por el usuario el 17-ago-2026: $903.000, ya incluyendo los $800.000
  // del credito que entro ese mismo dia.
  //
  // NO CUADRA DEL TODO — hay $39.166 MAS en la cuenta de lo que explican los movimientos.
  // Partiendo de los $753.743 del 03-ago y aplicando todo lo registrado desde entonces a valor
  // de cuenta (con IVA en lo afecto): -38.799 Cyperkill, -11.937 SAG, -416.500 arriendo,
  // +75.000 Torres, -29.990 pulverizador, -114.240 stickers, -13.695 TAG, -78.848 imposiciones,
  // -15.900 Optigard, -6.990 cebo, -38.010 diesel, +800.000 credito => $863.834.
  // Contra los $903.000 reales quedan $39.166 sin explicar, y la diferencia es POSITIVA, o sea
  // entro plata que no esta registrada. No calza exacto con ningun contrato activo: lo mas
  // cercano es Mar del Sur + Irma Dupont ($37.684) o Burgerholic ($41.674). PREGUNTADO AL
  // USUARIO el 17-ago-2026, pendiente de respuesta. No inventar el movimiento: cuando se sepa
  // cual es, se registra y esto deberia cuadrar solo.
  //
  // Contexto: que en agosto solo figure TGC como pago de contrato es normal — con un DSO real de
  // 28-49 dias, la mayoria de los contratos de agosto se cobran a fines de agosto o en septiembre.
  //
  // OJO al cuadrar: la cuenta bancaria se mueve por montos CON IVA, mientras que movimientos.js
  // guarda NETOS. Comparar netos contra el saldo del banco da diferencias falsas.
  saldoActual: 903000,
  fechaSaldo: '2026-08-17',
  fuente: 'Saldo real informado por el usuario el 17-ago-2026 (incluye los $800.000 del credito)',
  descuadreSinExplicar: 39166, // ver comentario de arriba; resolver cuando el usuario confirme

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
