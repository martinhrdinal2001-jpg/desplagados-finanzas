// Opciones de bodega en evaluacion. La urgencia declarada (29-jul-2026) es dejar de pagar
// el arriendo actual lo antes posible: es el gasto fijo mas grande de la empresa.
//
// Los montos marcados `porCotizar: true` estan en 0 a proposito: NO son estimaciones inventadas,
// hay que reemplazarlos con cotizaciones reales. El comparador solo calcula las opciones con monto.
const BODEGA = {
  opciones: [
    { id:'actual', nombre:'Bodega actual — Av. Las Torres 1277, Huechuraba',
      arriendoMensual: 416500, inversionInicial: 0, ubicacion:'Santiago', porCotizar:false,
      obs:'Situacion vigente. Pago confirmado de $416.500 el 6-ago. Es el gasto fijo mas grande de la empresa.' },

    { id:'propia', nombre:'Bodega propia (construir)',
      arriendoMensual: 0, inversionInicial: 1500000, ubicacion:'Santiago', porCotizar:false,
      obs:'Supuesto que ya estaba en el modelo de proyeccion: inversion unica de $1.500.000, arriendo $0 desde ene-2027.' },

    { id:'stgo_chica', nombre:'Solo Santiago (bodega mas chica)',
      arriendoMensual: 0, inversionInicial: 0, ubicacion:'Santiago', porCotizar:true,
      obs:'Por cotizar. Conviene buscar cerca de Huechuraba: ahi esta el cluster mas grande de clientes.' },

    { id:'solo_pv', nombre:'Solo Puerto Varas / sur',
      arriendoMensual: 0, inversionInicial: 0, ubicacion:'Sur', porCotizar:true,
      obs:'Por cotizar. OJO: hoy el 100% de la facturacion recurrente esta en Santiago.' },

    { id:'stgo_pv', nombre:'Santiago + Puerto Varas (las dos)',
      arriendoMensual: 0, inversionInicial: 0, ubicacion:'Ambas', porCotizar:true,
      obs:'Por cotizar. Suma de los dos arriendos.' },

    { id:'sin_bodega', nombre:'Sin bodega (insumos en casa / taller chico)',
      arriendoMensual: 0, inversionInicial: 0, ubicacion:'Santiago', porCotizar:false,
      obs:'Escenario limite: ahorro total de $416.500/mes. Limitado por espacio para insumos, cebaderas y EPP, '
        + 'y por si la resolucion sanitaria exige una bodega habilitada para almacenar plaguicidas.' },
  ],

  // Restriccion a verificar antes de decidir: la resolucion sanitaria (se pagaron $595.000 por
  // el "Servicio Resolucion Sanitaria" en dic-2025) puede exigir una bodega habilitada
  // para almacenamiento de plaguicidas. Confirmar antes de cerrar cualquier opcion.
  restriccionSanitaria: 'Verificar si la resolucion sanitaria exige bodega habilitada para almacenar plaguicidas.',
};
