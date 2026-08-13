// Contratos de Desplagados. Montos MENSUALES NETOS (equivalente mensual para los trimestrales).
// Actualizado 29-jul-2026 cruzando contra las facturas electronicas reales (ver facturas.js).
const CONTRATOS = [
  {
    "id": 1,
    "cliente": "Fanadego",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": 212801,
    "inicio": "2026-06-26",
    "estado": "Activo",
    "tipoCliente": "Empresa",
    "obs": "Facturas N23 ($287.604) y N31 ($212.801). Monto variable segun servicio. Estaba como 'Negociando' pero factura hace 2 meses."
  },
  {
    "id": 2,
    "cliente": "Janssen Maquinaria (sede San Bernardo)",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": 163000,
    "inicio": "2026-06-12",
    "estado": "Activo",
    "tipoCliente": "Empresa",
    "obs": "Grupo Janssen, sede 1 de 2. Factura a JANSSEN MAQUINARIA SPA, RUT 99.560.200-8. Servicio en Pdte Jorge Alessandri Rodriguez 11832, San Bernardo (la carpeta la llama \"Panamericana Sur\"). Direccion de facturacion distinta: Panam Norte 5353, Conchali. Facturas N17 y N29, $163.000 neto/mes. Contacto: Felipe Lopez, serviciosgenerales@janssen.cl. Julio pendiente de pago al 29-jul."
  },
  {
    "id": 3,
    "cliente": "Bunsa (sede Cerrillos)",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": 155000,
    "inicio": "2026-07-02",
    "estado": "Activo",
    "tipoCliente": "Empresa",
    "obs": "Grupo Janssen, sede 2 de 2. Factura a BUNSTER Y SALAS S.A., RUT 79.660.480-8. Servicio en Las Encinas 560, Cerrillos. OJO: el contrato esta firmado con JANSSEN S.A. RUT 81.198.100-1 (tercer RUT del grupo, sin facturas emitidas). Facturas N27 y N32, $155.000 neto/mes. Contacto: Braulio Farias, braulio.farias@bunsa.cl."
  },
  {
    "id": 4,
    "cliente": "Ferrocentro",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": 126000,
    "inicio": "2026-06-22",
    "estado": "Activo",
    "tipoCliente": "Empresa",
    "obs": "Facturas N19 y N30, $126.000 neto/mes. No figuraba en la planilla de contratos. Julio pendiente de pago al 29-jul."
  },
  {
    "id": 5,
    "cliente": "Facil Bodegas",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": 95000,
    "inicio": "2026-03-02",
    "estado": "Activo",
    "tipoCliente": "Empresa",
    "obs": "Facturas N3,N7,N11,N15,N28. Subio de $73.500 a ~$95.000 desde junio."
  },
  {
    "id": 6,
    "cliente": "Tecnologias Graficas Cordillera",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": 104650,
    "inicio": "2026-03-02",
    "estado": "Activo",
    "tipoCliente": "Empresa",
    "obs": "Facturas N2,N6,N10,N14,N34 a $80.500. Desde ago-2026 subio a $104.650 neto (confirmado por pago del 01-ago-2026, $124.534 con IVA)."
  },
  {
    "id": 7,
    "cliente": "Burgerholic",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": 35020,
    "inicio": "2026-05-06",
    "estado": "Activo",
    "tipoCliente": "Restaurante",
    "obs": "Facturas N12,N25,N33. Promocion 15% dcto primeros 3 meses. Desde ago 2026 sube a $41.200 neto."
  },
  {
    "id": 8,
    "cliente": "De Costa a Costa",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": 30000,
    "inicio": "2026-04-16",
    "estado": "Activo",
    "tipoCliente": "Empresa",
    "obs": "Facturas N9,N13,N21. Sin factura en julio: confirmar si sigue activo."
  },
  {
    "id": 9,
    "cliente": "NovaClima",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Trimestral",
    "montoMensual": 30000,
    "inicio": "2026-05-01",
    "estado": "Activo",
    "tipoCliente": "Empresa",
    "obs": "Factura N24 por $90.000 (visita trimestral). Equivalente mensual $30.000."
  },
  {
    "id": 10,
    "cliente": "Mar del Sur 1140 (Edificio)",
    "tipoServicio": "Desratizacion",
    "frecuencia": "Trimestral",
    "montoMensual": 16667,
    "inicio": "2026-02-26",
    "estado": "Activo",
    "tipoCliente": "Edificio",
    "obs": "Factura N1 por $120.000 (instalacion inicial). Valor visita $50.000 trimestral."
  },
  {
    "id": 11,
    "cliente": "Irma Dupont",
    "tipoServicio": "Desratizacion",
    "frecuencia": "Trimestral",
    "montoMensual": 15000,
    "inicio": "2026-02-01",
    "estado": "Activo",
    "tipoCliente": "Empresa",
    "obs": "Valor visita $45.000. Trimestral. Sin factura en el respaldo."
  },
  {
    "id": 12,
    "cliente": "Isabel Gaete",
    "tipoServicio": "Desratizacion",
    "frecuencia": "Trimestral",
    "montoMensual": 13333,
    "inicio": "2026-03-01",
    "estado": "Activo",
    "tipoCliente": "Casa",
    "obs": "Valor visita $40.000. Trimestral. Sin factura en el respaldo."
  },
  {
    "id": 13,
    "cliente": "Quincho BBQ",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Restaurante",
    "obs": "4.14 UF (3,31 UF los primeros 3 meses)"
  },
  {
    "id": 14,
    "cliente": "Aerodromo Vitacura",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Empresa",
    "obs": "11.4 UF/mes (~$465.631 a UF del 06-ago-2026), 9.12 UF los primeros 3 meses. Cotizacion enviada hace tiempo con el permiso de caza de conejos pendiente (en tramite desde 04-ago-2026). ACTUALIZADO 07-ago-2026: el usuario dice que este cliente (\"club de aviadores\") sale \"si o si\", mismo timing que Manquehue -- empieza en ~1 mes (sep-2026), primer ingreso en ~2 meses (oct-2026). Activado en el escenario de la pestana Proyeccion."
  },
  {
    "id": 15,
    "cliente": "Hyundai",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Empresa",
    "obs": "$58.350 + IVA ($40.845 + IVA primeros 3 meses)"
  },
  {
    "id": 16,
    "cliente": "Atomica",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Empresa",
    "obs": "Mensual $71.300 + IVA / cada 2 meses $82.300 / trimestral $90.000"
  },
  {
    "id": 17,
    "cliente": "Cerveceria Cerros de Chena",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Restaurante",
    "obs": "$45.000 mensual"
  },
  {
    "id": 18,
    "cliente": "Edificio Mirador de Aguilas",
    "tipoServicio": "Desratizacion",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Edificio",
    "obs": "Monto por confirmar"
  },
  {
    "id": 19,
    "cliente": "Estadio Italiano",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Empresa",
    "obs": "Cotizacion empresarial grande. Monto por confirmar. Cotizacion enviada hace tiempo; quedo pendiente el permiso de caza de conejos (en tramite, confirmado 04-ago-2026). No esta claro si se perdio el cliente por la demora."
  },
  {
    "id": 20,
    "cliente": "BGL",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Empresa",
    "obs": "Cotizacion en carpeta DESPLAGADOS. Costos: inversion inicial $115.529, gastos por 2 visitas $99.375. Precio de venta por confirmar."
  },
  {
    "id": 21,
    "cliente": "Club Manquehue (Vitacura)",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": null,
    "inicio": null,
    "estado": "Perdido",
    "tipoCliente": "Club deportivo",
    "obs": "PERDIDO (confirmado por el usuario 10-ago-2026): el proveedor actual (~$1.100.000/mes) les funciona bien y no se quisieron cambiar. Se llego a tener cotizacion formal en firme ($800.000 + IVA, PDF 10-ago-2026) pero no se cerro. Desactivado del escenario de Proyeccion."
  },
  {
    "cliente": "Terrazas de la Reina",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Empresa",
    "obs": "Nuevo, encontrado en Costos.xlsx (04-ago-2026). Costo directo modelado ~$77.186/mes. Sin ingreso cotizado registrado. Cotizacion enviada hace tiempo; quedo pendiente el permiso de caza de conejos (en tramite, confirmado 04-ago-2026). No esta claro si se perdio el cliente por la demora.",
    "id": 22
  },
  {
    "cliente": "Richard Kraus",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Casa",
    "obs": "Nuevo, encontrado en Costos.xlsx (04-ago-2026). Costo directo modelado ~$41.330/mes. Sin ingreso cotizado registrado. Cotizacion enviada hace tiempo; quedo pendiente el permiso de caza de conejos (en tramite, confirmado 04-ago-2026). No esta claro si se perdio el cliente por la demora.",
    "id": 23
  },
  {
    "cliente": "Club de Padel Santa Maria",
    "tipoServicio": "Servicio Integral",
    "frecuencia": null,
    "montoMensual": null,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Empresa",
    "obs": "Nuevo, encontrado en Costos.xlsx (04-ago-2026). Costo directo modelado ~$40.434/mes. Sin ingreso cotizado registrado. Cotizacion enviada hace tiempo; quedo pendiente el permiso de caza de conejos (en tramite, confirmado 04-ago-2026). No esta claro si se perdio el cliente por la demora.",
    "id": 24
  },
  {
    "cliente": "Edificio nuevo en construccion (84 deptos)",
    "tipoServicio": "Servicio Integral",
    "frecuencia": "Mensual",
    "montoMensual": 1457000,
    "inicio": null,
    "estado": "Negociando",
    "tipoCliente": "Edificio",
    "obs": "Nuevo prospecto (10-ago-2026): edificio en construccion, 84 departamentos. Cotizacion enviada por el edificio completo: $1.457.000 + IVA/mes. Aun sin aceptar, pero el usuario lo ve muy probable. Pendiente: nombre/direccion del edificio y la cotizacion formal en PDF para verificar detalle (posible descuento inicial, fecha de entrega del edificio, etc. -- no confirmado todavia). Seria el segundo contrato mas grande despues de Fanadego.",
    "id": 25
  }
];
