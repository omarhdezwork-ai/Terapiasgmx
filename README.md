# Terapias G

Sitio web estático de una sola página para Terapias G, construido desde cero con HTML5, CSS3 y JavaScript Vanilla.

## Abrir localmente

Abre `index.html` con doble clic. No requiere instalación, servidor, compilación, Node.js ni dependencias externas.

## Ver desde el celular fuera de casa

El sitio incluye un acceso remoto opcional para convertir tu computadora en servidor temporal.

1. Instala Cloudflare Tunnel una sola vez:

```powershell
winget install --id Cloudflare.cloudflared -e
```

2. Abre `Abrir acceso remoto.bat` con doble clic.

Tambien puedes hacerlo manualmente abriendo PowerShell dentro de la carpeta `TerapiasG` y ejecutando:

```powershell
.\acceso-remoto.ps1
```

3. Cuando aparezca una liga similar a `https://algo.trycloudflare.com`, abre esa liga en tu celular.

La liga funciona mientras la ventana siga abierta. Al cerrar la ventana, el acceso remoto se apaga.

Para revisar solo en la misma computadora, abre `Abrir servidor local.bat` con doble clic o ejecuta:

```powershell
.\servidor-local.ps1
```

Y abrir `http://127.0.0.1:8080/`.

## Menú interno

El menú superior navega dentro de la misma página:

- Inicio
- Servicios
- Opiniones
- Nosotros
- Contacto

## Cambiar testimonios

Los testimonios estan en `index.html`, dentro de la seccion `Opiniones`.

Para cambiar un testimonio, edita:

- `src` de la imagen, por ejemplo `assets/images/testimonial-mariana.png`.
- El nombre dentro de `<h3>`.
- La fuente o red social dentro de `<small>`.
- El comentario dentro de `<p>`.

Si solo quieres cambiar la foto y conservar el codigo igual, reemplaza la imagen en `assets/images/` usando exactamente el mismo nombre de archivo. Lo ideal es usar una imagen cuadrada, por ejemplo `800x800` o `1000x1000`, con la cara centrada.

## Cambiar galeria de terapias

La galeria visual usa estos archivos:

- `assets/images/galeria-terapia-1.jpg`
- `assets/images/galeria-terapia-2.jpg`
- `assets/images/galeria-terapia-3.png`

Para poner tus fotos reales, reemplaza esos archivos con el mismo nombre. La primera imagen funciona mejor en formato vertical o rectangular grande; las otras dos pueden ser horizontales o cuadradas. Si cambias el nombre del archivo, tambien hay que actualizarlo en `index.html`.

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

