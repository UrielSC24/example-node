# fast-api-dev

## Descripción

Este proyecto es una aplicación backend de servidor desarrollada en Node.js utilizando el framework Express. A pesar del nombre del proyecto, este desarrollo no se basa en el framework FastAPI de Python. Consiste en una Interfaz de Programación de Aplicaciones (API) RESTful básica orientada al control de datos, provista de flujos de verificación de estado, consulta de inventario y configuración sólida para el aseguramiento de la calidad del código, integrando rutinas de análisis estático y pruebas en varias capas.

## Estructura de Directorios y Archivos

* **bin/www**: Script responsable de la inicialización y despliegue del servidor HTTP sobre la aplicación Express.
* **src/logic.js**: Módulo que concentra la lógica de negocio, incluyendo la función central para calcular el valor de operaciones del inventario.
* **routes/**: Contiene los módulos de enrutamiento del servidor.
  * **index.js**: Expone la ruta de validación de servicio y disponibilidad (`/health`).
  * **items.js**: Controlador de la ruta para la consulta de datos del inventario de artículos (`/items`).
  * **users.js**: Ruta de respuesta genérica a modo de demostración.
* **tests/app.test.js**: Archivo unificado de aseguramiento de calidad. Contiene tanto pruebas unitarias para funciones específicas como pruebas de integración HTTP, instrumentadas con Jest y Supertest.
* **app.js**: Archivo nuclear para la estructura de la aplicación Express, responsable de asignar el middleware funcional (registro de transacciones, análisis de cookies, resolución de recursos asíncronos) y los enrutadores.
* **package.json**: Manifiesto del proyecto de Node.js, donde se establecen las dependencias del servidor, el entorno de desarrollo y los comandos de ejecución rápida.
* **eslint.config.mjs / .prettierrc**: Archivos de configuración para las herramientas de análisis de formato, detectores de olores de código y estandarización de la escritura.

## Requisitos del Sistema

* Motor en tiempo de ejecución de Node.js.
* Gestor de paquetes npm (distribuido regularmente de forma conjunta con la instalación de Node.js).

## Instrucciones de Instalación

1. Ubicarse mediante línea de comandos dentro del directorio central del proyecto llamado `fast-api-dev`.
2. Emplear el gestor de paquetes incluido para resolver la instalación del árbol de dependencias, tanto regulares como de desarrollo, mediante el siguiente comando:

```bash
npm install
```

## Secuencias de Comandos Disponibles

El archivo de manifiesto expone diversas secuencias de automatización que pueden invocarse ejecutando `npm run <script>` o `npm <script>`:

* **npm start**: Inicia de forma habitual el proceso nativo del servidor HTTP resolviendo por defecto sobre el puerto de red 3000 o cualquier variable de entorno asignada previamente a tal propósito.
* **npm run test**: Lanza el grupo consolidado de pruebas y arroja el reporte de integridad en consola, utilizando Jest como motor.
* **npm run format**: Examina de manera recursiva todos los archivos del código y aplica automáticamente las reglas de tabulación y alineación señaladas por Prettier.
* **npm run lint**: Ejecuta la inspección asincrónica con ESLint para localizar quiebres contra la normativa de estructura y estilo de desarrollo.
* **npm run lint:fix**: Aplica de forma directa los arreglos o modificaciones a los fallos reportados en la sintaxis localizable al emplear ESLint.

## Especificación de Endpoints del API

### Monitoreo

* **GET `/health`**
  Ruta de monitoreo para comprobar la disponibilidad general de los recursos.
  * *Estado HTTP esperado:* 200 OK
  * *Estructura de respuesta:* JSON conteniendo una bandera de estado confirmatoria y la medida referencial de tiempo de funcionamiento del protocolo.

### Inventario de Artículos

* **GET `/items`**
  Ruta de solicitud de estructura de datos en sistema relacionada con el inventario almacenado.
  * *Estado HTTP esperado:* 200 OK
  * *Estructura de respuesta:* Un arreglo secuencial manifestando elementos en formato JSON, integrando valores fijos primarios y cantidades referenciales en almacén.
  * *Ejemplo de cuerpo:* `[{"id": 1, "name": "Laptop", "stock": 10}, {"id": 2, "name": "Mouse", "stock": 50}]`

### Usuarios

* **GET `/users`**
  Directiva genérica de validación de texto sin formato asíncrono.
  * *Estado HTTP esperado:* 200 OK
  * *Estructura de respuesta:* Cadena de texto simple indicando la respuesta exitosa.

## Enfoque de Pruebas

El sistema interno de evaluación aborda dos bloques independientes de seguridad definidos en `tests/app.test.js`:

1. **Unidad Lógica**: Verificaciones estrictas sobre el módulo funcional puro, asegurándose de que la lógica de cobro contenga bloqueos adecuados (evitando cálculos o multiplicadores de inventario con cifras negativas).
2. **Integración Externa**: Peticiones simuladas a la capa de red con la utilidad Supertest, garantizando que el diseño de las cabeceras HTTP y el tipo numérico del esquema JSON resultante respondan adecuadamente a las expectativas del cliente interactuando sobre las rutas expuestas, además de asentar las validaciones sobre errores clásicos como devoluciones 404 bajo trayectos erróneos.
