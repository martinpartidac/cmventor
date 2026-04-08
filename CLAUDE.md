# CM Ventor — Contexto del Proyecto

Sitio web corporativo de **CM Ventor S.A. de C.V.**, empresa de torres de enfriamiento industrial en San Nicolás de los Garza, N.L., México. Fundada en 1990, 30+ años de experiencia, certificada por CTI.

**Repositorio:** https://github.com/martinpartidac/cmventor
**Live:** https://martinpartidac.github.io/cmventor/

---

## Archivos principales

| Archivo | Descripción |
|---|---|
| `index.html` | **Página principal activa (V3 — rediseño editorial)** |
| `index-v2.html` | Respaldo del diseño anterior |
| `index-v3.html` | Copia del diseño V3 (mismo contenido que index.html) |
| `css/styles-v3.css` | CSS del diseño activo |
| `css/styles-v2.css` | CSS del diseño anterior (no usar) |
| `js/script-v2.js` | JavaScript principal (modales, scroll, navegación) |
| `js/translations.js` | Textos en español e inglés para el sistema bilingüe |

---

## Diseño — Reglas importantes

### Colores
- **Azul primario:** `#1e40af` (`--blue`)
- **Azul claro:** `#3b82f6` (`--blue-light`)
- **Azul oscuro (navy):** `#0f172a` (`--navy`)
- **Amarillo:** `#f59e0b` (`--yellow`) — **SOLO para botones CTA principales**
- El amarillo NO debe usarse en íconos, líneas decorativas, badges ni hovers. Solo en `btn-primary` y el highlight del título del hero.

### Concepto visual (V3)
- Secciones alternadas oscuro/claro: hero (navy) → stats (azul) → empresa (blanco) → servicios (navy) → características (gris claro) → productos (navy-mid) → reconocimientos (blanco) → valores (gris claro) → recursos (blanco) → proyectos (navy) → clientes (blanco) → contacto (split blanco/navy) → footer (navy)
- Servicios: lista editorial numerada (01–04), no cards
- Contacto: split screen — formulario blanco izquierda, info oscura derecha
- Tipografía: Montserrat (títulos, 800) + Inter (cuerpo)

---

## Estructura de secciones (index.html)

1. **Hero** — foto de torre de fondo con overlay oscuro, título grande, 2 CTAs
2. **Stats bar** — azul, números 30+ / 500+ / 100% / 14+
3. **Empresa** — split asimétrico, número "30" decorativo, historia, misión/visión/cert/seguridad
4. **Servicios** — lista editorial oscura 01-04
5. **Características** — 6 cards en grid sobre gris claro
6. **Productos** — 7 cards oscuras (Torres, Motores, Ventiladores, Rellenos, Espreas, Louvers, Vibroswitch)
7. **Reconocimientos** — CTI + Ternium cero accidentes
8. **Valores** — 5 valores en grid
9. **Recursos** — 3 cards (1 disponible: Presentación Corporativa PDF; 2 próximamente)
10. **Proyectos** — 3 clientes (Ternium, METALSA, TEKSID) + stats row grande
11. **Clientes** — 14 logos en strip con grayscale/hover
12. **Contacto** — split screen con formulario + info + horarios
13. **Footer** — 4 columnas sobre navy

---

## Pendientes de contenido

- **Testimoniales / citas de clientes** — pedirle a contactos en Ternium, METALSA y TEKSID una frase corta sobre CM Ventor. Agregarlas en la sección de Proyectos Destacados.
- **Catálogo de Productos PDF** — marcado como "Próximamente" en Biblioteca de Recursos
- **Guías de Mantenimiento PDF** — marcado como "Próximamente" en Biblioteca de Recursos

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
El sitio live es: **https://martinpartidac.github.io/cmventor/**

Para ver cambios localmente sin subir, abrir directamente el archivo:
```
open /Users/luismartinpartida/cmventor/index.html
```

---

## Contacto de la empresa

- **Teléfono:** (81) 8327-7529
- **Email:** cm_ventor@prodigy.net.mx
- **Dirección:** Puerto Vallarta 413, La Fe, 66477, San Nicolás de los Garza, N.L.
- **Horario:** Lun–Vie 8:00–18:00, Sáb 8:00–14:00
- **WhatsApp:** wa.me/52818327529
