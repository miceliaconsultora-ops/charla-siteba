# Conectar el formulario con Google Sheets

Seguí estos pasos una sola vez. Al terminar, **cada inscripción del sitio web cae sola como una fila nueva en tu planilla**.

---

## 1. Crear la planilla

1. Entrá a [sheets.google.com](https://sheets.google.com) y creá una **planilla nueva**.
2. Ponele un nombre, por ejemplo: **Inscripciones — Encuentros SITEBA**.
3. (Opcional) Cambiá el nombre de la pestaña de abajo a **Inscripciones**.
   - Si la dejás como "Hoja 1", igual funciona: el script usa la primera pestaña.

> No hace falta que escribas los encabezados a mano. El script los crea solo la primera vez.

---

## 2. Pegar el script

1. En la planilla, andá al menú **Extensiones → Apps Script**.
2. Se abre una pestaña nueva con un editor. Borrá todo lo que haya en el archivo `Código.gs`.
3. Abrí el archivo **`Code.gs`** que está en esta carpeta, copiá **todo** su contenido y pegalo en el editor.
4. Hacé clic en el ícono de **guardar** (💾) o `Ctrl + S`.

---

## 3. Desplegar como aplicación web

1. Arriba a la derecha, hacé clic en **Implementar → Nueva implementación**.
2. Hacé clic en el engranaje ⚙️ (al lado de "Seleccionar tipo") y elegí **Aplicación web**.
3. Configurá así:
   - **Descripción:** Inscripciones SITEBA (lo que quieras).
   - **Ejecutar como:** **Yo** (tu cuenta).
   - **Quién tiene acceso:** **Cualquier usuario**. ⚠️ Este paso es clave: sin esto, el formulario no puede enviar.
4. Hacé clic en **Implementar**.
5. Google te va a pedir **autorizar permisos**:
   - Clic en **Autorizar acceso** → elegí tu cuenta.
   - Si aparece "Google no verificó esta app", hacé clic en **Configuración avanzada → Ir a (nombre del proyecto) (no seguro)** → **Permitir**.
   - *(Es seguro: es tu propio script en tu propia cuenta.)*
6. Al finalizar te muestra una **URL de la aplicación web**. Algo como:
   ```
   https://script.google.com/macros/s/AKfycb.....largo...../exec
   ```
   **Copiá esa URL.** La necesitás en el paso siguiente.

---

## 4. Pegar la URL en el sitio web

1. Abrí el archivo **`index.html`**.
2. Buscá esta línea (cerca del formulario):
   ```html
   <form id="reg-form" action="YOUR_SCRIPT_URL" method="POST">
   ```
3. Reemplazá **`YOUR_SCRIPT_URL`** por la URL que copiaste. Debe quedar así:
   ```html
   <form id="reg-form" action="https://script.google.com/macros/s/AKfycb...../exec" method="POST">
   ```
4. Guardá el archivo.

¡Listo! 🎉

---

## 5. Probar

1. Abrí el sitio (o subilo a donde lo tengas publicado).
2. Completá el formulario y enviá una inscripción de prueba.
3. Mirá tu Google Sheet: debería aparecer la fila con los datos.

> **Importante:** las pruebas funcionan mejor con el sitio **publicado** (subido a un servidor o a Vercel/Netlify/GitHub Pages). Abrir el `index.html` con doble clic desde el disco (`file://`) a veces bloquea el envío por seguridad del navegador.

---

## Si cambiás el código del script más adelante

Cada vez que edites `Code.gs`, tenés que **volver a implementar** para que los cambios tomen efecto:

- **Implementar → Administrar implementaciones → ✏️ (editar) → Versión: Nueva versión → Implementar.**
- La URL **no cambia**, así que no hace falta tocar el `index.html` de nuevo.

---

## Columnas que se guardan

| Fecha y hora | Nombre | Apellido | Email | Lugar de residencia | ¿Parte de organización? | Organización | Modalidad |
|---|---|---|---|---|---|---|---|

La fecha y hora se agregan automáticamente con cada inscripción.
