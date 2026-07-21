# CM Ventor — Contexto del Proyecto

Sitio web corporativo de **CM Ventor S.A. de C.V.**, empresa de torres de enfriamiento industrial en San Nicolás de los Garza, N.L., México. Fundada en 1990, 30+ años de experiencia, certificada por CTI.

**Repositorio:** https://github.com/martinpartidac/cmventor
**Live:** https://cmventor.com (dominio propio, activo) — también responde en https://martinpartidac.github.io/cmventor/

---

## Archivos principales

| Archivo | Descripción |
|---|---|
| `index.html` | **Página principal activa (V4 — "plano técnico/datasheet")** |
| `index-v4.html` | Copia idéntica de V4 (mismo contenido que index.html) |
| `index-v3.html` | Respaldo de la V3 (rediseño editorial, Montserrat/Inter) con todos los fixes de accesibilidad/perf aplicados |
| `index-v2.html`, `index-v1.html` | Versiones anteriores, no usar |
| `css/styles-v4.css` | CSS del diseño activo (V4) |
| `css/styles-v3.css` | CSS de la V3 (respaldo) |
| `icons.svg` | Sprite propio con los 34 íconos usados (reemplaza a Font Awesome/CDN) |
| `CNAME` | Contiene `cmventor.com` — activa el dominio personalizado en GitHub Pages, no borrar |
| `js/script-v2.js` | JavaScript principal (modales, scroll, navegación, formulario) — compartido por V3 y V4 |
| `js/translations.js` | Textos en español e inglés para el sistema bilingüe |

---

## Diseño — V4 (activa)

### Colores
- **Navy:** `#0a1628` (`--navy`)
- **Cian (líneas técnicas):** `#38bdf8` (`--cyan` / `--blue-light`)
- **Amarillo:** `#f5b400` (`--yellow`) — **SOLO para botones CTA principales**, nunca en íconos/decoración
- **Blanco cálido:** `#fafaf7` (`--white`)

### Tipografía
- **IBM Plex Sans** (títulos y cuerpo) + **IBM Plex Mono** (specs, números, datos tabulares)

### Concepto visual
- Estética de "plano técnico / ficha de datos": textura sutil de grid cian sobre secciones oscuras (`.blueprint-grid`)
- Hero: layout dividido (texto izquierda, diagrama SVG de una torre de enfriamiento a la derecha que **se dibuja solo al cargar** vía `stroke-dashoffset`, respeta `prefers-reduced-motion`)
- Servicios: códigos tipo industrial (`INST`/`ELEC`/`MANT`/`SOLD`) en vez de numeración decorativa 01-04
- Specs de producto: filas monospace tipo datasheet, no pastillas
- Números "fantasma" grandes y translúcidos repetidos como hilo visual (Empresa, Stats bar, Proyectos-stats) — el "30" de Empresa es el elemento de firma
- Recursos: cards con esquina doblada (efecto documento físico)
- Motion: solo fundido simple en scroll (`.animate-on-scroll`), sin slide — el único momento de animación fuerte es el diagrama del hero
- Íconos: sprite propio `icons.svg` con `<svg class="icon"><use href="icons.svg#icon-x"></use></svg>`, NO usar Font Awesome/CDN

### V3 (respaldo, `index-v3.html`)
Rediseño editorial anterior — Montserrat/Inter, azul `#1e40af`, servicios numerados 01-04, specs en pastillas. Ya no es la versión activa pero se mantiene actualizada con los mismos fixes de accesibilidad/tipografía/íconos.

---

## Estructura de secciones (igual en V3 y V4, cambia el estilo)

1. **Hero** — V4: layout dividido con diagrama SVG; V3: foto de torre con overlay
2. **Stats bar** — números 30+ / 500+ / 100% / 14+
3. **Empresa** — split asimétrico, número "30" decorativo, historia, misión/visión/cert/seguridad
4. **Servicios** — V4: códigos INST/ELEC/MANT/SOLD; V3: numeración 01-04
5. **Características** — 6 cards en grid
6. **Productos** — 7 cards (Torres, Motores, Ventiladores, Rellenos, Espreas, Louvers, Vibroswitch)
7. **Reconocimientos** — CTI + Ternium cero accidentes
8. **Valores** — 5 valores en grid
9. **Recursos** — 3 cards (1 disponible: Presentación Corporativa PDF; 2 próximamente — pendiente)
10. **Proyectos** — 3 clientes (Ternium, METALSA, TEKSID) + stats row grande
11. **Clientes** — 14 logos en strip con grayscale/hover
12. **Contacto** — split screen con formulario + info + horarios
13. **Footer** — 4 columnas

---

## Pendientes de contenido

- **⚠️ El formulario de contacto no envía nada a ningún lado** — `initContactForm` en `js/script-v2.js` solo simula el envío (`setTimeout` + `console.log`), no hay integración real con backend/correo. Cualquier mensaje que llene un cliente se pierde. Prioridad alta: conectar a un servicio real (Formspree, EmailJS, endpoint propio, etc.)
- **Testimoniales / citas de clientes** — pedirle a contactos en Ternium, METALSA y TEKSID una frase corta sobre CM Ventor. Agregarlas en la sección de Proyectos Destacados.
- **Fotos reales de proyectos instalados** — la sección Proyectos solo tiene logos + listas de texto, sin fotos de instalaciones reales
- **Catálogo de Productos PDF** — marcado como "Próximamente" en Biblioteca de Recursos
- **Guías de Mantenimiento PDF** — marcado como "Próximamente" en Biblioteca de Recursos
- **Datos estructurados (schema.org)** — no hay markup de Organization/LocalBusiness/Product para SEO

---

## Imágenes

- `images/torre.webp` — imagen principal del hero
- `images/torre de enfriamiento-9.webp` — foto de instalaciones (sección empresa)
- `images/logotipo.jpg` — logo de CM Ventor
- `images/cti-logo.png` — logo CTI
- `images/logos/` — logos de clientes (ternium.png, Logo-Metalsa.png, teksid-seeklogo.png, etc.)
- `images/torres enfriamiento/` — galería de torres
- `images/motor/`, `images/ventilador/`, `images/relleno/`, `images/espreas/`, `images/Louvers/`, `images/Vibroswitch/` — imágenes por producto

---

## JavaScript — funciones clave

- `scrollToSection(id)` — scroll suave a sección
- `toggleMobileMenu()` — abre/cierra menú mobile
- `openProductModal(productId)` — abre modal de galería de productos. Usa clase `active` en `#productModal`
- `closeProductModal()` — cierra modal, remueve clase `active`
- `changeLanguage('es'|'en')` — cambia idioma usando objeto `translations` en translations.js
- `toggleLanguageMenu()` — abre/cierra dropdown de idioma

---

## Flujo de trabajo con GitHub

El proyecto usa Git y está desplegado en GitHub Pages. Para subir cambios:

```bash
# 1. Ver qué archivos cambiaron
git status

# 2. Agregar los archivos modificados
git add nombre-del-archivo.css
# o todos los cambios:
git add -A

# 3. Hacer commit con mensaje descriptivo
git commit -m "Descripción del cambio"

# 4. Subir a GitHub (se publica automáticamente en GitHub Pages)
git push origin main
```

GitHub Pages tarda **1-2 minutos** en reflejar los cambios después del push.
El sitio live es: **https://cmventor.com** (también responde en https://martinpartidac.github.io/cmventor/)

Para ver cambios localmente sin subir, abrir directamente el archivo:
```
open /Users/luismartinpartida/cmventor/index.html
```

---

## Contacto de la empresa

- **Teléfono:** (81) 8327-7529
- **Email actual:** cm_ventor@prodigy.net.mx
- **Dirección:** Puerto Vallarta 413, La Fe, 66477, San Nicolás de los Garza, N.L.
- **Horario:** Lun–Vie 8:00–18:00, Sáb 8:00–14:00
- **WhatsApp:** wa.me/52818327529

---

## Dominio y hosting — situación actual (resuelta, 21-jul-2026)

### Estado actual — ✅ funcionando
- El dominio **cmventor.com** ya apunta al sitio nuevo y seguro en GitHub Pages, con SSL válido
- Nameservers: `carrera.ns.cloudflare.com` / `eoin.ns.cloudflare.com` (Cloudflare, plan free)
- El registro **A** apunta a las 4 IPs de GitHub Pages (`185.199.108/109/110/111.153`), en modo DNS-only (sin proxy naranja)
- El **CNAME** `www` → `martinpartidac.github.io`
- Archivo `CNAME` en el repo (contiene `cmventor.com`) — es lo que activa el dominio personalizado en GitHub Pages, **no borrar**
- El **registro del dominio** (WHOIS) sigue estando en **GoDaddy** — no en Cloudflare todavía. Pendiente sin urgencia: usar el código EPP que se obtuvo para transferir el registro a una cuenta propia de Cloudflare y dejar de depender de la cuenta de GoDaddy de terceros

### Correo @cmventor.com — ✅ funcionando vía IONOS
- El correo (~15 cuentas del personal) sigue alojado en **IONOS Mail**, en una cuenta de terceros (ligada a quien administraba la página antes / posiblemente Asociados Web)
- Registros **MX** en Cloudflare apuntando de vuelta a IONOS: `mx00.ionos.mx` y `mx01.ionos.mx`, ambos prioridad 10
- **Riesgo pendiente**: esa cuenta de IONOS no es propiedad de CM Ventor — a futuro conviene migrar a un proveedor propio (Zoho Mail recomendado, ~$60 USD/mes para 15 cuentas, con migración IMAP) para no depender de terceros para el correo del negocio

### Historial de la disputa (abril–julio 2026)
- El dominio estaba originalmente en IONOS, administrado por **Asociados Web** (jaime.lopez@asociadosweb.net), quien fue evasivo al pedir el código EPP
- El sitio WordPress anterior estaba **comprometido con malware** (tarea cron descargando de pastebin.com cada minuto) — motivo original de la migración a un sitio estático
- 17-jul-2026: el dominio se transfirió de IONOS a **GoDaddy** (por vías que no quedaron del todo claras)
- 20/21-jul-2026: un contacto de WhatsApp ("Soporte", +52 81 2593 4034, quien administraba la página antes) cooperó tras un pago de $1,000 MXN — cambió los nameservers a Cloudflare y ayudó a restaurar el correo
- Detalle completo de esta historia en la memoria de Claude (`project_cmventor.md`), no hace falta repetirlo aquí salvo para referencia rápida

### Advertencia de seguridad (ya resuelta)
El sitio WordPress anterior estaba comprometido con malware. El sitio actual en GitHub Pages es estático (sin backend, sin WordPress) y no tiene ese problema.

---

## Sitio anterior (WordPress)

- El backup completo está en: `/Users/luismartinpartida/Documents/backup_cmventor.com_2602252048`
- Era un sitio **WordPress 6.0.5**
- Tenía **65 imágenes** en `wp-content/uploads/` — muchas ya están en el proyecto actual
- Base de datos: `admin_ventor` en MySQL
- Para extraer imágenes del backup: `zstd -d backup_user-data_2602252048.tzst -o /tmp/user-data.tar && tar -xf /tmp/user-data.tar httpdocs/wp-content/uploads/`
