# Finanzas Desplagados

Reemplaza el Excel de Google Drive. Los datos viven en `data/*.js`; el dashboard (`index.html`)
los lee y calcula todo en el momento — no hay fórmulas que se puedan romper.

Navegación por sidebar oscura (izquierda), organizada en 4 grupos: Panorama, Plata, Comercial,
Detalle y modelo.

## Los 6 análisis pedidos (2026-08-03)

| # | Qué | Dónde | Estado |
|---|---|---|---|
| ① | Ventas, margen y gastos fijos por mes | Inicio | **Real** — combo barras+línea |
| ② | Ingresos recurrentes vs. puntuales | Inicio | **Real** |
| ③ | Rentabilidad por cliente y contrato | Rentabilidad | **Estimado** — costo variable proporcional al ingreso, costo fijo repartido en partes iguales entre clientes (ver metodología en la pestaña) |
| ④ | Flujo de caja a 13 semanas | Caja y flujo | **Confirmado + estimado** — compromisos con fecha + contratos activos (cobrados según el DSO real de cada cliente) + IVA + promedio histórico de gastos |
| ⑤ | Embudo de cotizaciones | Contratos (Comercial) | **Parcial, honesto** — solo hay 2 estados reales (Negociando/Activo); no hay registro de prospectos ni cotizaciones perdidas |
| ⑥ | Margen por visita (horas + insumos + traslado) | Rentabilidad | **Real** — construido el 2026-08-04 con el nuevo registro de Visitas + Inventario. Arranca vacío: no se inventaron visitas históricas. |

Si en algún momento se empieza a registrar cotizaciones enviadas/perdidas, el punto ⑤ también se
puede construir con datos reales en vez de la aproximación de 2 estados.

## Visitas, Inventario y margen real (agregado 2026-08-04)

Tres pestañas nuevas para poder medir — no solo estimar — la rentabilidad:

- **Visitas** — formulario para registrar cada visita (cliente, tipo, persona, horas, traslado,
  productos usados, ingreso asociado). Guarda en `localStorage` como "+ Agregar" movimiento;
  clic en una fila propia la abre para editar. Usar los productos de una visita **descuenta el
  inventario automáticamente** y calcula el costo de esa visita.
- **Inventario** — productos, stock (siempre calculado en vivo desde los movimientos, nunca un
  campo separado que se pueda desincronizar), compras/ajustes/pérdidas.
- **Rentabilidad** → nuevo card de **parámetros de costo** (`data/costos.js`, arrancan en 0 —
  hay que configurarlos) y el **gráfico ⑥ de margen real por visita**, con tabla clickeable y
  clasificación Rentable / Revisar / Margen negativo / Información incompleta.

El detalle de cliente ahora tiene 3 bloques nuevos además del estimado histórico (que se
mantiene igual): **Inversión inicial**, **Operación mensual** y **Recuperación de inversión**
(con gráfico de margen acumulado) — todos calculados solo de visitas reales, no estimados.

La pestaña Proyección sumó un card de **"Costos corregidos por contrato"**: hace crecer el costo
variable, la mano de obra y la inversión inicial a medida que aumentan los contratos (antes
quedaban planos). Usa parámetros manuales o el promedio real de las visitas si hay 5 o más
completas, y alerta si las horas requeridas superan la capacidad mensual definida de los socios.

## Costeo de cotizaciones (agregado 2026-08-04, desde `Costos.xlsx`)

El usuario subió su propio presupuestador (`Costos.xlsx`): una hoja por cliente/prospecto con el
costo modelado ítem por ítem (categoría, cantidad, costo unitario → mensual/anual, por
Sanitización/Desratización/Fumigación/Otros costos), más una hoja "Hoja 1" con la política real de
márgenes objetivo por tamaño y distancia. Se agregó en **Comercial**, debajo de la tabla de
Contratos:

- **Costeo de cotizaciones** — las 12 hojas del Excel (`data/costeo.js`), cruzadas por nombre con
  `CONTRATOS` cuando corresponde (3 confirmadas: Fanadego, Janssen Maquinaria, Ferrocentro; varias
  "probables" sin confirmar; 3 prospectos nuevos que no estaban registrados). Clic en una fila
  muestra el detalle ítem por ítem y, si el Excel trae ingreso cotizado, el margen resultante.
- **Márgenes de referencia para cotizar** — la tabla de "Hoja 1" tal cual (25%–55% según tipo/tamaño/distancia).
- En **Rentabilidad**, el detalle de cada cliente matcheado ahora muestra también el costo directo
  *modelado* del presupuestador junto al estimado por prorrateo (el modelado es más confiable
  porque es costo real ítem por ítem, no repartido). Verificado contra los 3 clientes con match
  confirmado: los márgenes reales (Fanadego 50,5%, Janssen 49,1%, Ferrocentro 39,2%) caen dentro de
  lo esperado según la propia tabla de referencia (Empresa Mediana/Grande = 45–55%).
- Se agregaron 3 prospectos nuevos a `data/contratos.js` que aparecían en el Excel de costeo pero no
  estaban registrados: **Terrazas de la Reina**, **Richard Kraus**, **Club de Padel Santa María**
  (estado "Negociando", sin monto — no se inventó el ingreso).
- Nueva hoja **"Costeo cotizaciones"** en el Excel descargable.

> **Dato sin confirmar, pendiente de que el usuario responda:** "Club de Planeadores Vitacura",
> "Club Manquehue" y "Stadio Italiano" tienen el mismo ingreso mensual ($458.000) escrito literal
> (no fórmula) en la misma celda de las 3 hojas — huele a plantilla duplicada sin actualizar. Para
> Club Manquehue en particular, ese número choca con el ~$800.000 que el usuario había estimado de
> palabra y que está activo hoy en `proyeccion.js` → `prospectosGrandes`. No se tocó ese parámetro
> hasta que el usuario confirme cuál es el correcto.

## Cómo compartirlo

`index.html` **no funciona solo**: carga los datos desde `data/`, el generador de Excel desde
`vendor/` y el logo desde `assets/`. Si mandás solo ese archivo, el que lo recibe ve una página
en blanco.

Para compartir, generá la versión de un solo archivo:

```bash
python generar_compartible.py
```

Eso crea **`Dashboard_Finanzas_Desplagados.html`** (~660 KB) con todo adentro: datos, código y
logo embebidos. Ese archivo sí se puede mandar por correo o WhatsApp y se abre con doble clic en
cualquier computador, sin internet y sin carpetas al lado.

También está publicado en GitHub Pages (repo público): correr `.\publicar.ps1` regenera el
compartible, hace commit y sube. El link queda siempre con la última versión.

Hay que **volver a generarlo cada vez que se actualicen los datos**, porque la copia queda
congelada con los datos del momento. El script aborta si detecta que el archivo quedaría roto.

## Cómo ver el dashboard

Abrir `index.html` con doble clic (o arrastrarlo a un navegador). No necesita servidor ni internet.

El botón **⬇ Descargar Excel** (arriba a la derecha) genera un `.xlsx` con todo lo que muestra el
dashboard — Movimientos, Contratos, Facturas, Análisis mensual, Proyección y Caja — para mandarle
al socio o para que lo trabajen los contadores. Se genera con `vendor/xlsx-min.js`, el mismo
generador propio (sin dependencias) que usa [[project_price_index_export_excel_dashboard]]: no
carga nada de un CDN, así que sigue funcionando abierto con doble clic y sin internet.

El dashboard tiene 6 pestañas:

- **Inicio** — portada tipo Power BI: KPIs del mes con variación vs. el mes anterior, gráfico de ingresos vs. gastos, donut de "¿en qué se va la plata?", resumen del Estado de Resultados, **Hallazgos** (alertas y oportunidades automáticas), tarjetas de navegación a cada sección, y el diagnóstico del negocio.
- **Estado de Resultados** — P&L formal: Ventas → Costo del servicio → Utilidad Bruta → Gastos operacionales → Resultado, con columna de **análisis vertical** (% sobre ventas) y barras. Selector de período (un mes o acumulado) y tabla de evolución de márgenes.

  > **Criterio contable:** el *costo del servicio* son Insumos/productos, Combustible e Instalación inicial — lo que escala con cada trabajo. Todo lo demás (arriendo, contabilidad, honorarios, furgón, marketing, sueldos) es gasto operacional. Definido con el usuario el 03-ago-2026; si cambia, hay que ajustar `CATS_COSTO_SERVICIO` en `index.html`.
- **Caja y flujo** — saldo actual, proyección de caja día a día con los compromisos confirmados, cuentas por cobrar y alerta cuando el saldo se va a negativo. Los montos se muestran en efectivo real (con IVA) porque es lo que entra y sale de la cuenta.
- **Impuestos y deudas** — estimación del IVA mes a mes (F29): débito desde las facturas del SII, crédito estimado desde las compras con factura. Muestra cuánta de la plata en caja en realidad es del SII. Más el saldo restante de las deudas (furgón).

  > **Criterio IVA:** los gastos se registran por lo que se pagó (con IVA incluido), así que el crédito se saca hacia atrás (`monto × 19/119`). Honorarios, sueldos y cuota del furgón quedan fuera del crédito porque no llevan factura. `Otros gastos` también queda fuera, a propósito, para no subestimar lo que hay que pagar. Configurable en `data/obligaciones.js`.
- **Decisiones** — comparador de opciones de bodega (completá el arriendo cotizado y calcula ahorro, costo anual y payback), facturación por comuna para decidir dónde tener bodega, escenario del crédito bancario, y la lista de pendientes por definir.
- **Análisis mensual** — equivalente a la vieja hoja "Análisis": ingresos y gastos por categoría y mes.
- **Proyección** — equivalente a la vieja hoja "Proyección1": parámetros editables (contratos, temporadas, gastos fijos/variables, sueldo objetivo) que recalculan en vivo la proyección a 19 meses, el punto de equilibrio y la tabla de "cuántos contratos necesitamos para pagarnos". Los cambios en pantalla son solo para probar escenarios — para dejarlos guardados de forma permanente hay que pedirle a Claude que actualice `data/proyeccion.js`.
- **Facturación** — las facturas electrónicas reales del SII: matriz de facturación por cliente y mes (sirve para ver quién dejó de facturar) y el detalle folio por folio.
- **Contratos** — clientes activos y en negociación con su ingreso mensual equivalente.
- **Movimientos** — todos los registros, filtrables por mes/tipo/categoría/estado.
- **+ Agregar** — formulario para cargar un gasto/ingreso nuevo sin pasar por el chat (ver abajo).

El tab "Análisis mensual" también tiene 2 gráficos: ingresos vs. gastos reales por mes, y la
estacionalidad proyectada del año (según los supuestos de temporada de la pestaña Proyección —
sirve para visualizar el efecto de las casas de veraneo en verano).

### Números clickeables ("anexado")

Las celdas con plata en la tabla de Análisis mensual y los KPIs del Resumen (Ingresos, Gastos, Por
cobrar) son clickeables: llevan directo a la pestaña Movimientos con los filtros ya aplicados y
resaltan la tabla, para no tener que buscar manualmente qué compone una cifra.

### Agregar movimientos sin el chat

La pestaña **+ Agregar** tiene un formulario (fecha, tipo, categoría, descripción, monto, estado,
etc.) que al enviarse actualiza *todo* el dashboard al instante — KPIs, Análisis, gráficos, Excel.

**Importante:** esto se guarda en el `localStorage` de ese navegador/computador, **no** en
`data/movimientos.js`. O sea:
- Sobrevive a recargar la página y cerrar el navegador, en ese mismo equipo.
- No aparece si abrís el dashboard desde otro computador, ni si Claude vuelve a leer los datos
  para hacer un análisis.

Por eso la misma pestaña tiene una sección **"Pendientes de sincronizar con Claude"** con:
- **📋 Copiar para el chat** — arma un mensaje de texto con todo lo pendiente, listo para pegarle
  a Claude.
- **🗑 Ya los sincronicé, vaciar** — una vez que Claude confirma que los agregó de forma permanente
  a `data/movimientos.js`, esto limpia la lista local (sin borrar nada ya sincronizado).

La idea: usar el formulario para carga rápida en el momento, y sincronizar con Claude cada tanto
para que quede guardado de verdad y no se pierda si cambiás de computador.

## Cómo registrar un gasto o ingreso nuevo

Abrí una conversación con Claude en esta carpeta y pegale el mensaje que te mandó tu socio por WhatsApp (o resumíselo). Por ejemplo:

> "Compramos 2 trampas de moscas en Mercado Libre por 15.000, pagado con tarjeta hoy"

Claude agrega el registro correspondiente al final de `data/movimientos.js` y te confirma qué quedó guardado. Después solo tenés que recargar `index.html` en el navegador para ver los totales actualizados.

Si falta un dato importante (el monto, sobre todo), Claude te lo va a preguntar en vez de inventarlo.

## Estructura

```
finanzas/
  index.html          # dashboard (abrir en el navegador)
  assets/
    logo.png            # logo de Desplagados, mostrado en el header
  data/
    movimientos.js     # todos los ingresos y gastos (fuente de verdad)
    contratos.js       # contratos recurrentes activos y en negociación
    proyeccion.js       # parámetros "oficiales" del modelo de proyección
    caja.js             # saldo actual, cuentas por cobrar y compromisos con fecha
    facturas.js         # facturas electrónicas emitidas (extraídas de los PDF del SII)
    bodega.js           # opciones de bodega en evaluación
    obligaciones.js     # config de IVA (F29) y deudas vigentes
    visitas.js           # registro de visitas (vacío hasta que se cargue)
    inventario.js         # productos y movimientos de inventario (vacío hasta que se cargue)
    costos.js             # parámetros de costo por hora/km/administrativo (arrancan en 0)
    costeo.js             # presupuestador por cliente/prospecto (desde Costos.xlsx) + tabla de márgenes de referencia
```

> Los montos marcados `porCotizar: true` en `bodega.js` están en **0 a propósito**: no son
> estimaciones inventadas. Hay que reemplazarlos con cotizaciones reales, y el comparador solo
> calcula las opciones que tengan un monto cargado.

> **Facturado ≠ cobrado.** `facturas.js` es lo que se emitió al SII; `movimientos.js` es lo que
> efectivamente entró o salió de la cuenta. Se mantienen separados a propósito: cruzarlos es lo que
> permite detectar cobros pendientes y errores de registro.

## Cómo actualizar la caja

Cuando tu socio informe el saldo ("en caja X lucas"), un pago pendiente o una fecha de cobro/pago,
pasámelo y actualizo `data/caja.js`. Eso es lo que alimenta la proyección de caja y las alertas de
liquidez — es la parte que más rápido se desactualiza, así que conviene refrescarla cada vez que
haya novedad.

### Qué detecta solo el dashboard

La sección **Hallazgos** se recalcula con cada dato nuevo y avisa de:

- Caja proyectada bajo cero, con la **fecha límite real** y cuánto falta juntar antes de ese día.
- Qué cuenta por cobrar alcanza para tapar el hoyo (y si hace falta cobrar más de una).
- Qué porcentaje de los gastos fijos cubren los contratos recurrentes, y cuántos contratos nuevos faltan.
- Concentración de clientes (riesgo de depender de uno solo).
- Clientes que están facturando pero no figuran como contrato activo.
- Diferencias entre los parámetros de la proyección y los montos reales que se están pagando.
- Retorno de inversiones operativas (ej.: en cuántos meses se paga la bodega propia).

## Datos migrados desde el Excel (2026-07-29)

Se migraron las 207 filas de la hoja "Movimientos", los 16 contratos de la hoja "Contratos" y los parámetros de la hoja "Proyección1" del archivo `Desplagados_ (3) (3).xlsx`. En el proceso se corrigió:

- 2 montos que estaban escritos como texto (`253233(CON iva)` y `41674 (iva incl)`), que eran la causa de que **todos** los totales de la hoja "Análisis" del Excel dieran error `#VALUE!` (una fórmula `SUMPRODUCT` sobre toda la columna se rompe si un solo valor no es numérico).
- La categoría duplicada por typo `Equiapmiento` → `Equipamiento`.

La tabla de "Proyección1" se reconstruyó como cálculo en vivo (no una copia estática): los mismos supuestos (contratos base, ticket por contrato nuevo, temporadas de servicios puntuales, gastos fijos con sus cambios de fecha como el arriendo de bodega y la bodega propia desde 2027) generan la proyección de 19 meses, el punto de equilibrio y la tabla de hitos de sueldo, todo recalculado desde los mismos parámetros — se verificó que reproduce exactamente los números del Excel original.

También se agregó, a partir del contexto de negocio que compartió el usuario: la tasa de cierre de cotizaciones (40-45%) para estimar cuántas cotizaciones por mes hacen falta, la liquidación real de un socio como referencia frente al sueldo objetivo del modelo, y una tabla de tamaños de servicio típicos (casa particular, condominio, edificio, etc.) para cotizar más rápido.

### Pendiente de completar

Hay registros que quedaron sin monto o sin fecha (se muestran resaltados arriba del dashboard). Van a seguir apareciendo ahí hasta que se completen los datos vía chat con Claude.
