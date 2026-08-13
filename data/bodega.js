// CORREGIDO 10-ago-2026 con el CONTRATO firmado a la vista (Bodegas Circulo SYSPEST,
// Bodega N51, 5 m2, Las Bandurrias Parcela 4A, Pirque -- NO Huechuraba como decia antes).
// El arriendo NO termino en agosto: el contrato tiene renta escalada hasta $500.000 neto/mes
// (mes 13 en adelante, feb-2027) y RENOVACION TACITA ANUAL. Ver data/proyeccion.js ->
// gastosFijos.arriendoBodega para el calendario completo.
//
// RESTRICCION CRITICA CONFIRMADA POR EL CONTRATO: ante 10 dias de atraso en el pago, se avisa
// a la SEREMI y la bodega se ELIMINA de la Resolucion Sanitaria. La habilitacion sanitaria de
// Desplagados depende de tener bodega registrada -> no se puede simplemente dejar de pagar.
const BODEGA = {
  opciones: [
    { id:'actual', nombre:'Bodega arrendada — Bodega N°51, Pirque (VIGENTE, renta escalada)',
      arriendoMensual: 476000, inversionInicial: 0, ubicacion:'Santiago', porCotizar:false,
      obs:'Contrato vigente con Bodegas Circulo SYSPEST. Renta escalada: $416.500 c/IVA hasta sep-2026, $476.000 oct-nov, $535.500 dic-ene, $595.000 desde feb-2027 (+IPC). Para salir hay que avisar por escrito 30 dias antes del vencimiento anual (~ene-2027).' },

    { id:'propia', nombre:'Bodega propia (invertida ago-2026, ~$500.000)',
      arriendoMensual: 0, inversionInicial: 500000, ubicacion:'Santiago', porCotizar:false,
      obs:'La inversion ya se hizo (~$500.000). PERO el ahorro solo se materializa si (a) se avisa la salida del contrato a tiempo y (b) la bodega nueva queda inscrita en la Resolucion Sanitaria. Verificar ambas cosas antes de darla por hecha.' },

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
