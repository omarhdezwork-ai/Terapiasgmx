# Terapias G

Sitio web estático de una sola página para Terapias G, construido desde cero con HTML5, CSS3 y JavaScript Vanilla.

## Abrir localmente

Abre `index.html` con doble clic. No requiere instalación, servidor, compilación, Node.js ni dependencias externas.

## Menú interno

El menú superior navega dentro de la misma página:

- Inicio
- Servicios
- Cursos
- Nosotros
- Contacto

## WhatsApp

Para cambiar el enlace de agenda, abre `js/main.js` y modifica esta línea:

```js
var WHATSAPP_LINK = 'https://wa.me/5215512345678';
```

Usa el formato recomendado `https://wa.me/521XXXXXXXXXX`.

## Estructura

- `index.html`: sitio completo de una sola página.
- `css/`: estilos base, responsive y animaciones.
- `js/`: interacción, menú móvil, navegación activa, WhatsApp y formulario.
- `assets/`: logo oficial, imágenes locales, iconos y fondos.
