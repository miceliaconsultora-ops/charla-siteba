/**
 * Encuentros SITEBA — Recepción de inscripciones en Google Sheets
 * -----------------------------------------------------------------
 * Este script recibe los datos del formulario web y los agrega como
 * una fila nueva en la planilla. Se despliega como "Aplicación web".
 *
 * Pasos de instalación: ver INSTRUCCIONES.md
 */

// Nombre de la pestaña donde se guardan las inscripciones.
// Si no existe, se usa la primera pestaña de la planilla.
const NOMBRE_HOJA = 'Inscripciones';

// Encabezados de las columnas (en orden).
const ENCABEZADOS = [
  'Fecha y hora',
  'Nombre',
  'Apellido',
  'Email',
  'Lugar de residencia',
  '¿Parte de organización?',
  'Organización',
  'Modalidad',
];

function doPost(e) {
  try {
    const hoja = obtenerHoja_();
    const p = (e && e.parameter) ? e.parameter : {};

    // Si la hoja está vacía, escribimos la fila de encabezados primero.
    if (hoja.getLastRow() === 0) {
      hoja.appendRow(ENCABEZADOS);
      hoja.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight('bold');
      hoja.setFrozenRows(1);
    }

    hoja.appendRow([
      new Date(),
      p.nombre || '',
      p.apellido || '',
      p.email || '',
      p.residencia || '',
      p.es_afiliado || '',
      p.organizacion || '',
      p.modalidad || '',
    ]);

    return respuestaJSON_({ result: 'ok' });
  } catch (err) {
    return respuestaJSON_({ result: 'error', message: String(err) });
  }
}

// Permite probar el despliegue abriendo la URL en el navegador.
function doGet() {
  return respuestaJSON_({ result: 'ok', message: 'Endpoint activo. Usá POST para enviar inscripciones.' });
}

function obtenerHoja_() {
  const planilla = SpreadsheetApp.getActiveSpreadsheet();
  return planilla.getSheetByName(NOMBRE_HOJA) || planilla.getSheets()[0];
}

function respuestaJSON_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
