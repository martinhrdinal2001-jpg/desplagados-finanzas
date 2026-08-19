// Estado de caja, cuentas por cobrar y compromisos futuros conocidos.
// Actualizar cada vez que el socio informe el saldo o se sepa de un pago/cobro con fecha.
const CAJA = {
  // Saldo REAL informado por el usuario el 19-ago-2026: $874.000.
  //
  // EL DESCUADRE CRECIO, no se resolvio. Partiendo de los $753.743 del 03-ago (ultimo punto
  // 100% confirmado) y aplicando TODOS los movimientos registrados hasta el 19-ago a valor de
  // cuenta (con IVA en lo afecto; las 4 "casa" sin factura -- Torres, Carolina Carrera, Sole
  // Algorta, Ale Navarro -- entran tal cual, sin IVA) da $714.622.
  // Contra los $874.000 reales quedan $159.378 sin explicar (positivo: entro plata no registrada).
  //
  // Es MAS que el descuadre anterior de $39.166 (17-ago) -- crecio $120.212 en solo 2 dias.
  // Osea el $39.166 de antes probablemente SIGUE sin registrarse, y ademas hay algo nuevo entre
  // el 17 y el 19-ago que tampoco esta registrado. No calza con ninguna combinacion de contratos
  // activos (se probo hasta con 3 combinados). PREGUNTADO AL USUARIO el 19-ago-2026: que cobros
  // entraron esos dos dias que no se hayan pasado. No inventar el movimiento.
  //
  // Contexto: que en agosto solo figure TGC como pago de contrato es normal — con un DSO real de
  // 28-49 dias, la mayoria de los contratos de agosto se cobran a fines de agosto o en septiembre.
  //
  // OJO al cuadrar: la cuenta bancaria se mueve por montos CON IVA (salvo las casas sin factura,
  // que van tal cual), mientras que movimientos.js guarda NETOS. Comparar netos contra el saldo
  // del banco da diferencias falsas.
  saldoActual: 874000,
  fechaSaldo: '2026-08-19',
  fuente: 'Saldo real informado por el usuario el 19-ago-2026',
  descuadreSinExplicar: 159378, // ver comentario de arriba; CRECIENTE, resolver cuando el usuario confirme

  ivaTasa: 0.19,
  // Umbral de caja bajo el cual se considera riesgo de liquidez (colchón mínimo deseado).
  colchonMinimo: 200000,

  // Ya cobrados y sacados de esta lista (quedaron como movimientos en movimientos.js):
  //   - Ferrocentro: junio+julio juntos el 30-jul ($299.880)
  //   - Janssen Maquinaria: factura N29 el viernes 31-jul ($193.970)
  //   - Bunsa (Grupo Janssen)
  // ACTUALIZADO 17-ago-2026 con la lista de pendientes que paso el socio por WhatsApp.
  // Criterio de IVA usado: el socio escribio "200.000 + IVA" SOLO para Edificio Bicentenario,
  // asi que ese monto es neto; los demas los reporto sin aclaracion, o sea brutos (regla
  // acordada con el usuario). Calza con la logica del negocio: a empresa se cotiza neto+IVA,
  // a cliente residencial se le da el precio final. CONFIRMAR con el usuario si algun caso
  // esta al reves.
  cuentasPorCobrar: [
    { cliente: 'Janssen Maquinaria (sede San Bernardo)', neto: 163000, iva: true, folio: null, fechaFactura: null,
      obs: 'Servicio de julio, pendiente de pago. La factura N29 (09-jul) ya se cobro el 31-jul; esta es la siguiente, '
         + 'que no esta en el respaldo de facturas — probablemente es uno de los 8 folios que faltan.' },
    { cliente: 'Bunsa (sede Cerrillos)', neto: 155000, iva: true, folio: 32, fechaFactura: '2026-07-19',
      obs: 'Factura N32 del 19-jul sin pagar. La N27 (02-jul) si se cobro el 18-jul.' },
    { cliente: 'De Costa a Costa', neto: 30000, iva: true, folio: 21, fechaFactura: '2026-06-25',
      obs: 'Factura N21 del 25-jun sin pagar. Es la mas antigua de todas las cuentas por cobrar.' },
    { cliente: 'De Costa a Costa', neto: 30000, iva: true, folio: null, fechaFactura: null,
      obs: 'Servicio de julio. OJO: la factura todavia NO se ha emitido — no se puede cobrar lo que no se factura.' },
    { cliente: 'Edificio Bicentenario', neto: 200000, iva: true, folio: null, fechaFactura: null,
      obs: 'Servicio puntual. Reportado como "200.000 + IVA", o sea el neto es $200.000. Cliente NUEVO, no esta en contratos. '
         + 'Confirmar si es puntual o si va a ser recurrente: a $200.000/mes seria el 4to contrato mas grande.' },
  ],

  // Obligaciones que se sabe que existen pero sin fecha confirmada todavia.
  // Se muestran aparte porque no se pueden ubicar en el calendario, pero SI afectan la liquidez.
  obligacionesSinFecha: [
    { concepto: 'Maestro — construcción bodega propia', monto: 395000, iva: false,
      obs: 'Informado por el usuario el 18-ago-2026: se le paga al maestro cuando termine la pega. '
         + 'La bodega estaria lista en ~1 mes (mediados de sep-2026). El monto se guarda tal cual se informo '
         + '($395.000); si viene con boleta de honorarios no lleva IVA, si es con factura habria que netearlo — confirmar.' },
    { concepto: 'Resolución sanitaria bodega nueva', monto: 0, iva: false,
      obs: 'POR COTIZAR, monto en 0 a proposito (no inventar). Una vez lista la bodega hay que inscribirla en la '
         + 'Resolucion Sanitaria; sin eso el ahorro del arriendo no se materializa y se arriesga la habilitacion '
         + 'para operar. Referencia: el "Servicio Resolucion Sanitaria" de dic-2025 costo $595.000.' },
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
