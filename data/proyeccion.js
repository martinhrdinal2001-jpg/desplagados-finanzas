// Parámetros del modelo de proyección financiera de Desplagados.
// Estos son los valores "oficiales": el dashboard permite jugar con otros valores
// en pantalla, pero si querés guardar un cambio de forma permanente, pedile a
// Claude que actualice este archivo.
const PROYECCION_PARAMS = {
  inicioProyeccion: '2026-06', // primer mes proyectado
  mesesProyeccion: 19,          // Jun 2026 -> Dic 2027

  // CORREGIDO 03-ago-2026: antes decia 8 contratos / $220.000, cifras de mayo-2026 que
  // quedaron obsoletas. La realidad segun las facturas del SII son 12 contratos activos
  // por $996.471 netos/mes. Con la base vieja la proyeccion subestimaba el negocio ~4,5x.
  contratosBase: 12,
  nuevosContratosPorMes: 3,
  ticketNuevoContrato: 80000,       // neto
  ingresoBaseContratosActuales: 996471, // facturación mensual real de los 12 contratos activos

  // Prospectos grandes que NO deben diluirse en el supuesto generico de "+3 contratos a
  // $80.000". Se suman con su monto real desde su mes de inicio esperado, y solo si
  // `activo: true` — asi se puede ver la proyeccion con y sin ellos.
  // `montoMensualInicial` + `mesesDescuento` (opcionales): si el prospecto tiene descuento
  // comercial en los primeros meses, se usa ese monto durante esos meses y despues pasa a
  // `montoMensual` (tarifa normal). Ver calcularProyeccion().
  //
  // ACTUALIZADO 10-ago-2026: Club Manquehue NO se cerro -- el proveedor actual les funciona
  // bien y no se quisieron cambiar (confirmado por el usuario). Se saco del escenario.
  // Aerodromo Vitacura sigue en pie, sin cambios.
  // Nuevo prospecto agregado: edificio en construccion (84 deptos), $1.457.000 + IVA/mes
  // cotizado, aun sin aceptar -- se deja `activo:false` (no confirmado) para no inflar el
  // escenario base; activarlo manualmente en pantalla para ver el efecto si se acepta.
  prospectosGrandes: [
    {
      // FIRMADO, no es un prospecto: el unico motivo por el que esta aca y no sumado a
      // `ingresoBaseContratosActuales` es que todavia no empieza a facturar.
      // CORREGIDO 12-ago-2026: antes se modelaba con inicio sep-2026 / primer cobro oct-2026.
      // El cliente tenia un contrato anual vigente con su proveedor actual que no se puede
      // romper antes, asi que el servicio parte el 01-ene-2027.
      nombre: 'Estadio Italiano (firmado, parte ene-2027)',
      montoMensual: 493000,
      desde: '2027-01',
      activo: true,
    },
    {
      nombre: 'Aerodromo Vitacura (club de aviadores)',
      montoMensual: 465631,          // tarifa normal: 11,4 UF/mes a UF $40.844,79 (06-ago-2026); reajustar con la UF vigente
      montoMensualInicial: 372504,   // 9,12 UF/mes los primeros 3 meses, misma UF de referencia
      mesesDescuento: 3,
      desde: '2026-10',
      activo: true,
    },
    {
      nombre: 'Edificio nuevo en construccion (84 deptos)',
      montoMensual: 1457000,         // cotizado 10-ago-2026, $1.457.000 + IVA/mes, neto (+IVA aparte)
      desde: '2026-11',              // estimado: edificio aun en construccion, inicio no confirmado -- ajustar cuando se sepa
      activo: false,                 // AUN NO ACEPTADO -- no se incluye en el escenario base
    },
  ],

  // Costos operativos que trae CADA contrato (nuevo o existente) a la proyección, en base a
  // visitas reales cuando hay suficientes (>=5 visitas con datos completos), y si no, a estos
  // valores manuales. Arrancan en 0 a propósito: no se inventan promedios sin datos que los
  // respalden. Ver el card "Costos corregidos por contrato" en la pestaña Proyección.
  porContratoNuevo: {
    visitasMensualesPromedio: 0,
    horasPromedioPorVisita: 0,      // terreno + traslado
    kmPromedioPorVisita: 0,
    costoPromedioProductos: 0,       // $ por visita
    inversionInicialPromedio: 0,     // $ único, solo para contratos NUEVOS ese mes
    usarPromediosReales: false,      // si hay >=5 visitas completas, se puede activar
  },

  servicioPuntual: {
    alta: 850000,   // Dic y Ene: fumigaciones casas de veraneo
    media: 400000,  // Jun, Jul, Nov
    baja: 200000,   // resto del año
  },
  // mapa mes calendario (1-12) -> temporada
  temporadaPorMes: { 1:'alta', 6:'media', 7:'media', 11:'media', 12:'alta' },

  // CORREGIDO 10-ago-2026 (2da vez, con el CONTRATO a la vista):
  // El pago de agosto NO fue la ultima cuota. Segun el contrato firmado (01-dic-2025, Bodegas
  // Circulo SYSPEST, Bodega N51, Pirque), agosto era el MES 7 de una renta ESCALADA que sube
  // hasta $500.000 neto/mes desde el mes 13 (feb-2027), con reajuste IPC anual y RENOVACION
  // TACITA ANUAL. Verificado: el prepago de ene-2026 ($1.800.000 neto) cubrio los meses 1-6
  // (feb-jul) y el pago de ago-2026 ($350.000 neto) calza exacto con la tarifa del mes 7-8.
  gastosFijos: {
    arriendoBodega: {
      // Renta por tramos segun contrato. Montos NETOS (el contrato tambien los da con IVA).
      tramos: [
        { hasta: '2026-07', neto: 300000 },  // meses 1-6  -- prepagados en ene-2026
        { hasta: '2026-09', neto: 350000 },  // meses 7-8  -- ago pagado, sep pendiente
        { hasta: '2026-11', neto: 400000 },  // meses 9-10
        { hasta: '2027-01', neto: 450000 },  // meses 11-12
        { hasta: null,      neto: 500000 },  // mes 13 en adelante (+ reajuste IPC)
      ],
      // Ultimo mes que se paga arriendo. null = el contrato sigue corriendo (renovacion tacita).
      // Para salir hay que avisar POR ESCRITO 30 dias antes del vencimiento anual (~ene-2027),
      // o sea el limite practico es DICIEMBRE 2026. Si se logra, poner aqui '2027-01'.
      terminaEn: null,
      contrato: 'Bodegas Circulo SYSPEST (Francisco Ruiz Bertin), Bodega N51, 5 m2, Pirque. Firmado 01-dic-2025.',
      // OJO CRITICO: el contrato dice que si hay 10 dias de atraso en el pago, ademas de
      // terminar el contrato se avisa a la SEREMI y la bodega se ELIMINA de la Resolucion
      // Sanitaria. La habilitacion sanitaria de Desplagados depende de tener bodega registrada.
      riesgoSanitario: true,
    },
    // ACTUALIZADO 18-ago-2026 con costos REALES, no estimados. La estimacion previa de
    // $500.000 se quedo corta: solo materiales + maestro ya suman $555.712 brutos, y todavia
    // falta la resolucion sanitaria del recinto nuevo (por cotizar; la de dic-2025 costo $595.000).
    //   - Materiales (Ferreteria San Francisco de Asis, pagado 18-ago): $160.712 bruto / $135.052 neto
    //   - Maestro (se paga al terminar la pega, ~mediados de sep-2026):  $395.000
    // La bodega estaria lista aprox. a mediados de sep-2026 segun el usuario.
    gastoBodegaConstruccion: { monto: 466985, mes: '2026-09' }, // neto de materiales + maestro
    cuotaFurgon: 250000, // hasta dic 2027
    contabilidad: 64000,
    honorarios: 120000,
  },

  gastosVariables: { // promedio histórico mensual
    insumosProductos: 340000,
    otrosGastos: 80000,
    marketing: 80000,
    combustible: 36000,
    mantencionAuto: 30000,
    capacitacion: 22000,
  },

  sueldoObjetivoTotal: 3000000, // 2 socios x $1.500.000

  // Contexto comercial (para el diagnóstico, no entra en los cálculos de $ directamente)
  tasaCierreCotizaciones: 0.425, // 40-45% histórico, se usa el punto medio

  // Liquidación real más reciente conocida, para comparar contra el sueldo objetivo del modelo
  liquidacionReferencia: {
    socio: 'Martín del Río',
    mes: '2026-04',
    sueldoBase: 280000,
    descuentosLegales: 49224,
    liquido: 230776,
  },

  // Tamaños de servicio de referencia (para cotizar rápido comparando con casos ya atendidos)
  tamanosReferencia: [
    { tipo: 'Casa particular', estaciones: '14', detalle: 'Cebaderas, trampas y seguimiento' },
    { tipo: 'Condominio', estaciones: '34–35', detalle: '' },
    { tipo: 'Edificio', estaciones: '61', detalle: '' },
    { tipo: 'Fanadego', estaciones: '~100', detalle: '' },
    { tipo: 'Estadio Italiano', estaciones: 'Grande (empresarial)', detalle: 'Cotización empresarial de mayor escala' },
  ],
};
