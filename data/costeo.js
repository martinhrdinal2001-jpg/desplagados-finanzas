// Modelo de costeo por cliente/cotizacion, extraido de Costos.xlsx (subido por el usuario 2026-08-04).
// Es SU propio presupuestador: item, cantidad, costo unitario -> costo mensual/anual, por categoria
// (Sanitizacion/Desratizacion/Fumigacion/Otros costos), con Costo Directo total.
//
// OJO — 'Club de Planeadores Vitacura', 'Club Manquehue' y 'Stadio Italiano' tenian el MISMO
// ingreso mensual ($458.000), literal (no formula), en la misma celda de las 3 hojas: era un valor
// de plantilla sin actualizar. RESUELTO para Club Manquehue (confirmado por el usuario 04-ago-2026):
// el real es ~$800.000/mes (la empresa que hoy los atiende cobra ~$1.100.000/mes) — ya estaba
// correcto en proyeccion.js -> prospectosGrandes, no se toco. Vitacura y Stadio Italiano siguen con
// el $458.000 de plantilla sin confirmar, pero el usuario dijo que no importa: se les mando
// cotizacion hace tiempo, quedo pendiente el permiso de caza de conejos (en tramite) y no esta claro
// si se perdieron esos clientes — no relevante mientras no haya contrato.
const COSTEO_CLIENTES = [
  {
    "id": 1,
    "nombreHoja": "CLUB DE PLANEADORES VITACURA",
    "matchContrato": "Aerodromo Vitacura",
    "certezaMatch": "probable, no confirmado",
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 0.1,
        "costoUnitario": 7957.98,
        "mensual": 795.8,
        "anual": 9549.58
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 300.0,
        "costoUnitario": 125.0,
        "mensual": 37500.0,
        "anual": 450000.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": 10.0,
        "costoUnitario": 500.0,
        "mensual": 5000.0,
        "anual": 60000.0
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 10.0,
        "costoUnitario": 170.0,
        "mensual": 1700.0,
        "anual": 20400.0
      },
      {
        "categoria": "Fumigación",
        "item": "Cyperkill",
        "cantidad": 0.2,
        "costoUnitario": 37815.13,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Demand",
        "cantidad": 0.3,
        "costoUnitario": 42016.81,
        "mensual": 12605.04,
        "anual": 151260.5
      },
      {
        "categoria": "Fumigación",
        "item": "Atonit",
        "cantidad": null,
        "costoUnitario": 25210.08,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "MaxForce",
        "cantidad": 0.3,
        "costoUnitario": 12605.04,
        "mensual": 3781.51,
        "anual": 45378.15
      },
      {
        "categoria": "Fumigación",
        "item": "ForzaMix",
        "cantidad": null,
        "costoUnitario": 13613.45,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Belmax",
        "cantidad": null,
        "costoUnitario": 13445.38,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 4.0,
        "costoUnitario": 20000.0,
        "mensual": 80000.0,
        "anual": 960000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 1.0,
        "costoUnitario": 1100.0,
        "mensual": 1100.0,
        "anual": 13200.0
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 15000.0,
        "mensual": 15000.0,
        "anual": 180000.0
      }
    ],
    "costoDirectoMensual": 157712.35,
    "costoDirectoAnual": 1892548.24,
    "itemsInstalacion": [
      {
        "categoria": "Otros costos",
        "item": "Cajas Cebaderas",
        "cantidad": 300.0,
        "costoUnitario": null,
        "mensual": null,
        "anual": null
      }
    ],
    "costoInstalacionMensual": null,
    "ingresoMensual": 458000.0,
    "ingresoAnual": 5496000.0,
    "utilidadMensual": 300287.65,
    "utilidadAnual": 3603451.77
  },
  {
    "id": 2,
    "nombreHoja": "CLUB MANQUEHUE",
    "matchContrato": "Club Manquehue (Vitacura)",
    "certezaMatch": "confirmado",
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 0.3,
        "costoUnitario": 7957.98,
        "mensual": 2387.39,
        "anual": 28648.74
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 350.0,
        "costoUnitario": 125.0,
        "mensual": 43750.0,
        "anual": 525000.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": 15.0,
        "costoUnitario": 500.0,
        "mensual": 7500.0,
        "anual": 90000.0
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 15.0,
        "costoUnitario": 170.0,
        "mensual": 2550.0,
        "anual": 30600.0
      },
      {
        "categoria": "Fumigación",
        "item": "Cyperkill",
        "cantidad": 0.2,
        "costoUnitario": 37815.13,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Demand",
        "cantidad": 0.5,
        "costoUnitario": 42016.81,
        "mensual": 21008.4,
        "anual": 252100.84
      },
      {
        "categoria": "Fumigación",
        "item": "Atonit",
        "cantidad": null,
        "costoUnitario": 25210.08,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "MaxForce",
        "cantidad": 2.0,
        "costoUnitario": 12605.04,
        "mensual": 25210.08,
        "anual": 302521.01
      },
      {
        "categoria": "Fumigación",
        "item": "ForzaMix",
        "cantidad": null,
        "costoUnitario": 13613.45,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Belmax",
        "cantidad": null,
        "costoUnitario": 13445.38,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 6.0,
        "costoUnitario": 20000.0,
        "mensual": 120000.0,
        "anual": 1440000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 2.0,
        "costoUnitario": 1100.0,
        "mensual": 2200.0,
        "anual": 26400.0
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 2.0,
        "costoUnitario": 115.0,
        "mensual": 230.0,
        "anual": 2760.0
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 2.0,
        "costoUnitario": 115.0,
        "mensual": 230.0,
        "anual": 2760.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 15000.0,
        "mensual": 15000.0,
        "anual": 180000.0
      }
    ],
    "costoDirectoMensual": 240065.88,
    "costoDirectoAnual": 2880790.59,
    "itemsInstalacion": [
      {
        "categoria": "Otros costos",
        "item": "Cajas Cebaderas",
        "cantidad": 300.0,
        "costoUnitario": null,
        "mensual": null,
        "anual": null
      }
    ],
    "costoInstalacionMensual": null,
    "ingresoMensual": 458000.0,
    "ingresoAnual": 5496000.0,
    "utilidadMensual": 217934.12,
    "utilidadAnual": 2615209.41
  },
  {
    "id": 3,
    "nombreHoja": "STADIO ITALIANO",
    "matchContrato": "Estadio Italiano",
    "certezaMatch": "probable, no confirmado",
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 1.0,
        "costoUnitario": 7957.98,
        "mensual": 7957.98,
        "anual": 95495.8
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 320.0,
        "costoUnitario": 115.0,
        "mensual": 36800.0,
        "anual": 441600.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": 15.0,
        "costoUnitario": 500.0,
        "mensual": 7500.0,
        "anual": 90000.0
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 15.0,
        "costoUnitario": 170.0,
        "mensual": 2550.0,
        "anual": 30600.0
      },
      {
        "categoria": "Fumigación",
        "item": "Cyperkill",
        "cantidad": 0.2,
        "costoUnitario": 37815.13,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Demand",
        "cantidad": 0.5,
        "costoUnitario": 42016.81,
        "mensual": 21008.4,
        "anual": 252100.84
      },
      {
        "categoria": "Fumigación",
        "item": "Atonit",
        "cantidad": null,
        "costoUnitario": 25210.08,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "MaxForce",
        "cantidad": 2.0,
        "costoUnitario": 12605.04,
        "mensual": 25210.08,
        "anual": 302521.01
      },
      {
        "categoria": "Fumigación",
        "item": "ForzaMix",
        "cantidad": null,
        "costoUnitario": 13613.45,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Belmax",
        "cantidad": null,
        "costoUnitario": 13445.38,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 6.0,
        "costoUnitario": 20000.0,
        "mensual": 120000.0,
        "anual": 1440000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 2.0,
        "costoUnitario": 1100.0,
        "mensual": 2200.0,
        "anual": 26400.0
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 2.0,
        "costoUnitario": 115.0,
        "mensual": 230.0,
        "anual": 2760.0
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 2.0,
        "costoUnitario": 115.0,
        "mensual": 230.0,
        "anual": 2760.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 15000.0,
        "mensual": 15000.0,
        "anual": 180000.0
      }
    ],
    "costoDirectoMensual": 238686.47,
    "costoDirectoAnual": 2864237.65,
    "itemsInstalacion": [
      {
        "categoria": "Otros costos",
        "item": "Cajas Cebaderas",
        "cantidad": 300.0,
        "costoUnitario": null,
        "mensual": null,
        "anual": null
      }
    ],
    "costoInstalacionMensual": null,
    "ingresoMensual": 458000.0,
    "ingresoAnual": 5496000.0,
    "utilidadMensual": 219313.53,
    "utilidadAnual": 2631762.35
  },
  {
    "id": 4,
    "nombreHoja": "FANADEGO",
    "matchContrato": "Fanadego",
    "certezaMatch": "confirmado",
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 0.1,
        "costoUnitario": 7957.98,
        "mensual": 795.8,
        "anual": 9549.58
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 150.0,
        "costoUnitario": 114.0,
        "mensual": 17100.0,
        "anual": 205200.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": 3.0,
        "costoUnitario": 500.0,
        "mensual": 1500.0,
        "anual": 18000.0
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 3.0,
        "costoUnitario": 180.0,
        "mensual": 540.0,
        "anual": 6480.0
      },
      {
        "categoria": "Fumigación",
        "item": "Cyperkill",
        "cantidad": 0.2,
        "costoUnitario": 28000.0,
        "mensual": 5600.0,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Demand",
        "cantidad": 0.2,
        "costoUnitario": 42016.81,
        "mensual": 8403.36,
        "anual": 100840.34
      },
      {
        "categoria": "Fumigación",
        "item": "Atonit",
        "cantidad": null,
        "costoUnitario": 25210.08,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 2.0,
        "costoUnitario": 25000.0,
        "mensual": 50000.0,
        "anual": 600000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 1.0,
        "costoUnitario": 1100.0,
        "mensual": 1100.0,
        "anual": 13200.0
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 20000.0,
        "mensual": 20000.0,
        "anual": 240000.0
      }
    ],
    "costoDirectoMensual": 105269.16,
    "costoDirectoAnual": 1263229.92,
    "itemsInstalacion": [],
    "costoInstalacionMensual": null,
    "ingresoMensual": null,
    "ingresoAnual": null,
    "utilidadMensual": null,
    "utilidadAnual": null
  },
  {
    "id": 5,
    "nombreHoja": "TERRAZAS DE LA REINA",
    "matchContrato": null,
    "certezaMatch": null,
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 0.2,
        "costoUnitario": 7957.98,
        "mensual": 1591.6,
        "anual": 19099.16
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 24.0,
        "costoUnitario": 125.0,
        "mensual": 3000.0,
        "anual": 36000.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": 6.0,
        "costoUnitario": 500.0,
        "mensual": 3000.0,
        "anual": 36000.0
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 6.0,
        "costoUnitario": 180.0,
        "mensual": 1080.0,
        "anual": 12960.0
      },
      {
        "categoria": "Fumigación",
        "item": "Demand",
        "cantidad": 0.2,
        "costoUnitario": 42016.81,
        "mensual": 8403.36,
        "anual": 100840.34
      },
      {
        "categoria": "Fumigación",
        "item": "MaxForce",
        "cantidad": 0.3,
        "costoUnitario": 12605.04,
        "mensual": 3781.51,
        "anual": 45378.15
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 2.0,
        "costoUnitario": 20000.0,
        "mensual": 40000.0,
        "anual": 480000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 1.0,
        "costoUnitario": 1100.0,
        "mensual": 1100.0,
        "anual": 13200.0
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 15000.0,
        "mensual": 15000.0,
        "anual": 180000.0
      }
    ],
    "costoDirectoMensual": 77186.47,
    "costoDirectoAnual": 926237.65,
    "itemsInstalacion": [],
    "costoInstalacionMensual": null,
    "ingresoMensual": null,
    "ingresoAnual": null,
    "utilidadMensual": null,
    "utilidadAnual": null
  },
  {
    "id": 6,
    "nombreHoja": "JANSSEN PANAMERICANA SUR",
    "matchContrato": "Janssen Maquinaria (sede San Bernardo)",
    "certezaMatch": "confirmado",
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 0.1,
        "costoUnitario": 7957.98,
        "mensual": 795.8,
        "anual": 9549.58
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 100.0,
        "costoUnitario": 115.0,
        "mensual": 11500.0,
        "anual": 138000.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": 5.0,
        "costoUnitario": 500.0,
        "mensual": 2500.0,
        "anual": 30000.0
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 5.0,
        "costoUnitario": 180.0,
        "mensual": 900.0,
        "anual": 10800.0
      },
      {
        "categoria": "Fumigación",
        "item": "Cyperkill (5lt)",
        "cantidad": 0.2,
        "costoUnitario": 37815.13,
        "mensual": 7563.03,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Demand (5lt)",
        "cantidad": 0.2,
        "costoUnitario": 42016.81,
        "mensual": 8403.36,
        "anual": 100840.34
      },
      {
        "categoria": "Fumigación",
        "item": "Atonit",
        "cantidad": null,
        "costoUnitario": 25210.08,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "MaxForce",
        "cantidad": 0.3,
        "costoUnitario": 12605.04,
        "mensual": null,
        "anual": 0.0
      },
      {
        "categoria": "Fumigación",
        "item": "ForzaMix",
        "cantidad": null,
        "costoUnitario": 13613.45,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Belmax",
        "cantidad": null,
        "costoUnitario": 13445.38,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 2.0,
        "costoUnitario": 15000.0,
        "mensual": 30000.0,
        "anual": 360000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 1.0,
        "costoUnitario": 1100.0,
        "mensual": 1100.0,
        "anual": 13200.0
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 20000.0,
        "mensual": 20000.0,
        "anual": 240000.0
      }
    ],
    "costoDirectoMensual": 82992.18,
    "costoDirectoAnual": 995906.22,
    "itemsInstalacion": [],
    "costoInstalacionMensual": null,
    "ingresoMensual": null,
    "ingresoAnual": null,
    "utilidadMensual": null,
    "utilidadAnual": null
  },
  {
    "id": 7,
    "nombreHoja": "QUINCHO",
    "matchContrato": "Quincho BBQ",
    "certezaMatch": "probable, no confirmado",
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 0.1,
        "costoUnitario": 7957.98,
        "mensual": 795.8,
        "anual": 9549.58
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 100.0,
        "costoUnitario": 125.0,
        "mensual": 12500.0,
        "anual": 150000.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": 4.0,
        "costoUnitario": 500.0,
        "mensual": 2000.0,
        "anual": 24000.0
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 3.0,
        "costoUnitario": 180.0,
        "mensual": 540.0,
        "anual": 6480.0
      },
      {
        "categoria": "Fumigación",
        "item": "Demand",
        "cantidad": 0.2,
        "costoUnitario": 42016.81,
        "mensual": 8403.36,
        "anual": 100840.34
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 2.0,
        "costoUnitario": 15000.0,
        "mensual": 30000.0,
        "anual": 360000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 1.0,
        "costoUnitario": 1100.0,
        "mensual": 1100.0,
        "anual": 13200.0
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 15000.0,
        "mensual": 15000.0,
        "anual": 180000.0
      }
    ],
    "costoDirectoMensual": 70569.16,
    "costoDirectoAnual": 846829.92,
    "itemsInstalacion": [],
    "costoInstalacionMensual": null,
    "ingresoMensual": null,
    "ingresoAnual": null,
    "utilidadMensual": null,
    "utilidadAnual": null
  },
  {
    "id": 8,
    "nombreHoja": "RICHARD KRAUS",
    "matchContrato": null,
    "certezaMatch": null,
    "items": [
      {
        "categoria": "Desratización",
        "item": "Raticida Detia plus mini bloque (unidades)",
        "cantidad": null,
        "costoUnitario": 114.0,
        "mensual": 0.0,
        "anual": 0.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": null,
        "costoUnitario": null,
        "mensual": 0.0,
        "anual": 0.0
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": null,
        "costoUnitario": null,
        "mensual": 0.0,
        "anual": 0.0
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 2.0,
        "costoUnitario": 15000.0,
        "mensual": 30000.0,
        "anual": 360000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 1.0,
        "costoUnitario": 1100.0,
        "mensual": 1100.0,
        "anual": 13200.0
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 10000.0,
        "mensual": 10000.0,
        "anual": 120000.0
      }
    ],
    "costoDirectoMensual": 41330.0,
    "costoDirectoAnual": 495960.0,
    "itemsInstalacion": [],
    "costoInstalacionMensual": null,
    "ingresoMensual": null,
    "ingresoAnual": null,
    "utilidadMensual": null,
    "utilidadAnual": null
  },
  {
    "id": 9,
    "nombreHoja": "FERROCENTRO",
    "matchContrato": "Ferrocentro",
    "certezaMatch": "confirmado",
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 0.2,
        "costoUnitario": 7957.98,
        "mensual": 1591.6,
        "anual": 19099.16
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 50.0,
        "costoUnitario": 114.0,
        "mensual": 5700.0,
        "anual": 68400.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": 3.0,
        "costoUnitario": 500.0,
        "mensual": 1500.0,
        "anual": 18000.0
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa UV",
        "cantidad": 1.0,
        "costoUnitario": 1800.0,
        "mensual": 1800.0,
        "anual": 21600.0
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 3.0,
        "costoUnitario": 180.0,
        "mensual": 540.0,
        "anual": 6480.0
      },
      {
        "categoria": "Fumigación",
        "item": "Cyperkill Plus",
        "cantidad": 0.1,
        "costoUnitario": 40000.0,
        "mensual": 4000.0,
        "anual": 48000.0
      },
      {
        "categoria": "Fumigación",
        "item": "Demand",
        "cantidad": 0.1,
        "costoUnitario": 42016.81,
        "mensual": 4201.68,
        "anual": 50420.17
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 3.0,
        "costoUnitario": 12000.0,
        "mensual": 36000.0,
        "anual": 432000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 1.0,
        "costoUnitario": 1100.0,
        "mensual": 1100.0,
        "anual": 13200.0
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 1.0,
        "costoUnitario": 115.0,
        "mensual": 115.0,
        "anual": 1380.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 20000.0,
        "mensual": 20000.0,
        "anual": 240000.0
      }
    ],
    "costoDirectoMensual": 76663.28,
    "costoDirectoAnual": 919959.33,
    "itemsInstalacion": [],
    "costoInstalacionMensual": null,
    "ingresoMensual": null,
    "ingresoAnual": null,
    "utilidadMensual": null,
    "utilidadAnual": null
  },
  {
    "id": 10,
    "nombreHoja": "PADEL HYUNDAI",
    "matchContrato": "Hyundai",
    "certezaMatch": "probable, no confirmado",
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 0.1,
        "costoUnitario": 7957.98,
        "mensual": 795.8,
        "anual": null
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 18.0,
        "costoUnitario": 260.0,
        "mensual": 4680.0,
        "anual": null
      },
      {
        "categoria": "Desratización",
        "item": "Tubos cebaderos",
        "cantidad": 25.0,
        "costoUnitario": 500.0,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Desratización",
        "item": "Trampa pegajosa",
        "cantidad": 2.0,
        "costoUnitario": 546.0,
        "mensual": 1092.0,
        "anual": null
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 2.0,
        "costoUnitario": 172.0,
        "mensual": 344.0,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Cyperkill",
        "cantidad": 0.1,
        "costoUnitario": 37815.13,
        "mensual": 3781.51,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Demand",
        "cantidad": 0.1,
        "costoUnitario": 42016.81,
        "mensual": 4201.68,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Atonit",
        "cantidad": null,
        "costoUnitario": 25210.08,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "MaxForce",
        "cantidad": null,
        "costoUnitario": 12605.04,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "ForzaMix",
        "cantidad": null,
        "costoUnitario": 13613.45,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Belmax",
        "cantidad": null,
        "costoUnitario": 13445.38,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 1.0,
        "costoUnitario": 20000.0,
        "mensual": 20000.0,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 1.0,
        "costoUnitario": 1092.44,
        "mensual": 1092.44,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 1.0,
        "costoUnitario": null,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 1.0,
        "costoUnitario": null,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 8000.0,
        "mensual": 8000.0,
        "anual": null
      }
    ],
    "costoDirectoMensual": 43987.43,
    "costoDirectoAnual": null,
    "itemsInstalacion": [],
    "costoInstalacionMensual": null,
    "ingresoMensual": null,
    "ingresoAnual": null,
    "utilidadMensual": null,
    "utilidadAnual": null
  },
  {
    "id": 11,
    "nombreHoja": "CLUB DE PADEL SANTA MARÍA",
    "matchContrato": null,
    "certezaMatch": null,
    "items": [
      {
        "categoria": "Sanitización",
        "item": "Dryquat",
        "cantidad": 0.1,
        "costoUnitario": 7957.98,
        "mensual": 795.8,
        "anual": null
      },
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 30.0,
        "costoUnitario": 200.0,
        "mensual": 6000.0,
        "anual": null
      },
      {
        "categoria": "Desratización",
        "item": "Tubos cebaderos",
        "cantidad": 25.0,
        "costoUnitario": 500.0,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Desratización",
        "item": "Cebo atrayente",
        "cantidad": 2.0,
        "costoUnitario": 172.0,
        "mensual": 344.0,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Demand",
        "cantidad": 0.1,
        "costoUnitario": 42016.81,
        "mensual": 4201.68,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Atonit",
        "cantidad": null,
        "costoUnitario": 25210.08,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "MaxForce",
        "cantidad": null,
        "costoUnitario": 12605.04,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "ForzaMix",
        "cantidad": null,
        "costoUnitario": 13613.45,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Fumigación",
        "item": "Belmax",
        "cantidad": null,
        "costoUnitario": 13445.38,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 1.0,
        "costoUnitario": 20000.0,
        "mensual": 20000.0,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Overoles",
        "cantidad": 1.0,
        "costoUnitario": 1092.44,
        "mensual": 1092.44,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Guantes",
        "cantidad": 1.0,
        "costoUnitario": null,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Cubre zapato",
        "cantidad": 1.0,
        "costoUnitario": null,
        "mensual": null,
        "anual": null
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 8000.0,
        "mensual": 8000.0,
        "anual": null
      }
    ],
    "costoDirectoMensual": 40433.92,
    "costoDirectoAnual": null,
    "itemsInstalacion": [],
    "costoInstalacionMensual": null,
    "ingresoMensual": null,
    "ingresoAnual": null,
    "utilidadMensual": null,
    "utilidadAnual": null
  },
  {
    "id": 12,
    "nombreHoja": "EDIFICIO MAR DEL SUR 1172",
    "matchContrato": null,
    "certezaMatch": "OJO: distinto de \"Mar del Sur 1140\" que ya es cliente activo — direccion distinta, no fusionar",
    "items": [
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 46.0,
        "costoUnitario": 165.0,
        "mensual": 7590.0
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 1.0,
        "costoUnitario": 20000.0,
        "mensual": 20000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 3000.0,
        "mensual": 3000.0
      },
      {
        "categoria": "Otros costos",
        "item": "COSTO DIRECTO",
        "cantidad": null,
        "costoUnitario": null,
        "mensual": 30590.0
      }
    ],
    "costoDirectoMensual": 30590.0,
    "costoDirectoAnual": null,
    "itemsInstalacion": [
      {
        "categoria": "Desratización",
        "item": "Raticida (unidades)",
        "cantidad": 46.0,
        "costoUnitario": 165.0,
        "mensual": 7590.0
      },
      {
        "categoria": "Desratización",
        "item": "Tubos cebaderos",
        "cantidad": 46.0,
        "costoUnitario": 400.0,
        "mensual": 18400.0
      },
      {
        "categoria": "Desratización",
        "item": "Stiker",
        "cantidad": 46.0,
        "costoUnitario": 120.0,
        "mensual": 5520.0
      },
      {
        "categoria": "Otros costos",
        "item": "Mano de Obra (Horas)",
        "cantidad": 1.0,
        "costoUnitario": 20000.0,
        "mensual": 20000.0
      },
      {
        "categoria": "Otros costos",
        "item": "Bencina y TAG",
        "cantidad": 1.0,
        "costoUnitario": 3000.0,
        "mensual": 3000.0
      },
      {
        "categoria": "Otros costos",
        "item": "COSTO DIRECTO",
        "cantidad": null,
        "costoUnitario": null,
        "mensual": 54510.0
      }
    ],
    "costoInstalacionMensual": 54510.0,
    "ingresoMensual": null,
    "ingresoAnual": null,
    "utilidadMensual": null,
    "utilidadAnual": null
  }
];

// Tabla de margenes de referencia por tamano/distancia (hoja 'Hoja 1' del mismo Excel).
// Es la politica de precios real que usan para cotizar.
const TABLA_MARGENES = [
  {
    "tipo": "Casa",
    "tamano": "Chica",
    "estaciones": "0-15",
    "ubicacion": "a 0-10km",
    "margen": 0.25
  },
  {
    "tipo": "Casa",
    "tamano": "Chica",
    "estaciones": null,
    "ubicacion": "10+",
    "margen": 0.3
  },
  {
    "tipo": "Casa",
    "tamano": "Mediana",
    "estaciones": "16-30",
    "ubicacion": "a 0-10km",
    "margen": 0.3
  },
  {
    "tipo": "Casa",
    "tamano": "Mediana",
    "estaciones": null,
    "ubicacion": "10+",
    "margen": 0.35
  },
  {
    "tipo": "Casa",
    "tamano": "Grande",
    "estaciones": "31+",
    "ubicacion": "a 0-10km",
    "margen": 0.35
  },
  {
    "tipo": "Casa",
    "tamano": "Grande",
    "estaciones": null,
    "ubicacion": "10+",
    "margen": 0.4
  },
  {
    "tipo": "Empresa",
    "tamano": "Chica",
    "estaciones": "0-29",
    "ubicacion": "a 0-10km",
    "margen": 0.4
  },
  {
    "tipo": "Empresa",
    "tamano": "Chica",
    "estaciones": null,
    "ubicacion": "10+",
    "margen": 0.45
  },
  {
    "tipo": "Empresa",
    "tamano": "Mediana",
    "estaciones": "30-79",
    "ubicacion": "a 0-10km",
    "margen": 0.45
  },
  {
    "tipo": "Empresa",
    "tamano": "Mediana",
    "estaciones": null,
    "ubicacion": "10+",
    "margen": 0.5
  },
  {
    "tipo": "Empresa",
    "tamano": "Grande",
    "estaciones": "80+",
    "ubicacion": "a 0-10km",
    "margen": 0.5
  },
  {
    "tipo": "Empresa",
    "tamano": "Grande",
    "estaciones": null,
    "ubicacion": "10+",
    "margen": 0.55
  }
];
