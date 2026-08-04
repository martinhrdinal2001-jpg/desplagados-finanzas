"""Genera una version de UN SOLO ARCHIVO del dashboard, para compartir.

Por que existe: index.html carga los datos con <script src="./data/*.js">, el generador
de Excel desde ./vendor/ y el logo desde ./assets/. Eso funciona perfecto en la carpeta
del proyecto, pero si mandas solo el index.html por correo o WhatsApp, el que lo recibe
ve una pagina en blanco (no encuentra los datos).

Este script mete todo adentro del HTML (los .js embebidos y el logo como data URI), asi
queda un unico archivo que se abre con doble clic en cualquier computador, sin internet
y sin carpetas al lado.

Uso:
    python generar_compartible.py

Genera: Dashboard_Finanzas_Desplagados.html  (en esta misma carpeta)

Hay que volver a correrlo cada vez que se actualicen los datos, porque la copia
compartible queda "congelada" con los datos del momento en que se genero.
"""
import base64
import re
from pathlib import Path

BASE = Path(__file__).parent
SALIDA = BASE / "Dashboard_Finanzas_Desplagados.html"

html = (BASE / "index.html").read_text(encoding="utf-8")

# --- 1. Embeber los <script src="..."> locales ---
def embeber_script(match):
    src = match.group(1)
    ruta = BASE / src.lstrip("./")
    if not ruta.exists():
        raise SystemExit(f"No encuentro {ruta} — abortando para no generar un archivo roto.")
    codigo = ruta.read_text(encoding="utf-8")
    # Un "</script>" dentro del JS cerraria la etiqueta antes de tiempo.
    codigo = codigo.replace("</script>", "<\\/script>")
    return f"<script>\n/* ==== embebido: {src} ==== */\n{codigo}\n</script>"

html, n_scripts = re.subn(r'<script src="(\./(?:data|vendor)/[^"]+)"></script>', embeber_script, html)

# --- 2. Embeber el logo como data URI ---
logo = BASE / "assets" / "logo.png"
if logo.exists():
    b64 = base64.b64encode(logo.read_bytes()).decode("ascii")
    html, n_logo = re.subn(r'src="\./assets/logo\.png"', f'src="data:image/png;base64,{b64}"', html)
else:
    n_logo = 0

# --- 3. Aviso de que es una copia congelada ---
# OJO: count=1 a proposito. El texto "</title>" tambien aparece dentro de strings de
# JavaScript (los <title> de los tooltips SVG del donut), y un replace global inyectaba
# el comentario HTML en medio de un string, rompiendo todo el script.
html = html.replace(
    "</title>",
    "</title>\n<!-- Copia autocontenida generada por generar_compartible.py. "
    "Los datos estan congelados al momento de generarla. -->",
    1,
)

# --- 4. Chequeos antes de escribir ---
# Un archivo compartible roto es peor que ninguno: el que lo recibe ve una pagina en
# blanco y no sabe por que. Estos chequeos ya atajaron un bug real (un replace global
# de "</title>" que inyectaba HTML dentro de un string de JavaScript).
def bloque_script_principal(txt):
    i = txt.rfind("<script>")
    return txt[i + len("<script>") : txt.index("</script>", i)]

problemas = []

if re.search(r'<script src="\./', html):
    problemas.append("quedaron <script src> externos sin embeber")

if html.count("<script") != html.count("</script>"):
    problemas.append("etiquetas <script> desbalanceadas")

# El script principal no debe contener HTML inyectado por los reemplazos
principal = bloque_script_principal(html)
if "<!--" in principal:
    problemas.append("se colo un comentario HTML dentro del script principal")

# Comparar el script principal contra el original: deben ser identicos
original_principal = bloque_script_principal((BASE / "index.html").read_text(encoding="utf-8"))
if principal != original_principal:
    problemas.append("el script principal quedo distinto al de index.html")

if problemas:
    raise SystemExit("ABORTADO, el archivo habria quedado roto:\n  - " + "\n  - ".join(problemas))

SALIDA.write_text(html, encoding="utf-8")
print(f"OK  -> {SALIDA.name}")
print(f"     scripts embebidos: {n_scripts} | logo embebido: {'si' if n_logo else 'NO (no se encontro)'}")
print(f"     tamano: {SALIDA.stat().st_size/1024:.0f} KB")
print("     chequeos: sin referencias externas, tags balanceados, script principal intacto")
