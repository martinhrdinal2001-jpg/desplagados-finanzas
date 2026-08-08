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
  // ACTUALIZADO 07-ago-2026: el usuario dice que Club Manquehue y Aerodromo Vitacura
  // (club de aviadores) salen "si o si" -- empiezan en ~1 mes (sep-2026) y el primer
  // ingreso cae en ~2 meses (oct-2026). Se activan los dos en la proyeccion.
  prospectosGrandes: [
    {
      nombre: 'Club Manquehue (Vitacura)',
      montoMensual: 850000,   // CONFIRMADO por el usuario 07-ago-2026 (antes $800.000 estimado)
      desde: '2026-10',       // inicio esperado
      activo: true,           // el usuario dice que sale "si o si" (07-ago-2026)
    },
    {
      nombre: 'Aerodromo Vitacura (club de aviadores)',
      montoMensual: 465631,   // 11,4 UF/mes a UF $40.844,79 (06-ago-2026); reajustar con la UF vigente
      desde: '2026-10',       // mismo timing que Manquehue, confirmado 07-ago-2026
      activo: true,
      nota: 'Cotizacion real: 11,4 UF/mes (9,12 UF los primeros 3 meses -- ese descuento inicial NO esta modelado aqui, se usa el monto full desde el primer mes por simplicidad).',
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

  gastosFijos: {
    arriendoBodegaJunNov2026: 400000,
    arriendoBodegaDic2026: 450000,
    arriendoBodegaDesde2027: 0, // bodega propia
    gastoBodegaConstruccion: { monto: 1500000, mes: '2027-01' }, // gasto único
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
