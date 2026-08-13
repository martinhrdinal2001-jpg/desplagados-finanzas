// DECISION YA TOMADA (10-ago-2026): la empresa se mudo a bodega propia. La ultima cuota de
// arriendo de la bodega de Huechuraba fue en agosto 2026 (~$416.500 bruto / $350.000 neto,
// ver movimientos.js id 222) y la bodega propia costo ~$500.000 (unico pago), mucho menos de
// lo que se habia estimado antes ($1.500.000). Se deja este comparador como registro historico
// de la decision, no como una opcion todavia abierta.
const BODEGA = {
  opciones: [
    { id:'actual', nombre:'Bodega arrendada — Av. Las Torres 1277, Huechuraba (HISTORICO, ya no se paga)',
      arriendoMensual: 416500, inversionInicial: 0, ubicacion:'Santiago', porCotizar:false,
      obs:'Terminado. Ultima cuota pagada en agosto 2026 ($416.500 bruto). Fue el gasto fijo mas grande de la empresa mientras duro.' },

    { id:'propia', nombre:'Bodega propia (YA CONSTRUIDA, ago-2026)',
      arriendoMensual: 0, inversionInicial: 500000, ubicacion:'Santiago', porCotizar:false,
      obs:'Ya no es un supuesto: se hizo en agosto 2026 por ~$500.000 (mucho menos que el $1.500.000 que se habia estimado antes), arriendo $0 desde entonces.' },

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
