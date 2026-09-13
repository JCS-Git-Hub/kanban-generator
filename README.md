<div align="center">
    <img src="./src/assets/logo.svg" width="240">

# DevBoard

</div>

## 1. Explicación del proyecto

**DevBoard** es una aplicación web de gestión de tareas basada en la metodología Kanban, diseñada para facilitar la organización y seguimiento del trabajo de equipos de desarrollo y producto.

El proyecto presenta un tablero dividido en tres estados: `Por hacer`, `En progreso` y `Finalizado`, permitiendo visualizar de forma clara el estado de cada tarea y gestionar su evolución a lo largo del flujo de trabajo.

Entre sus principales funcionalidades se encuentran:

- Creación de nuevas tareas.
- Edición y eliminación de tareas existentes.
- Asignación de prioridades: alta, media y baja.
- Establecimiento de fechas límite.
- Cambio de estado mediante arrastrar y soltar (*Drag & Drop*).
- Búsqueda de tareas mediante el buscador integrado.
- Visualización y gestión de comentarios asociados a cada tarea.
- Edición y eliminación de comentarios.
- Diseño responsive, adaptado a diferentes tamaños de pantalla.
- Interfaz accesible y optimizada.

La aplicación utiliza una API REST proporcionada por `json-server` para gestionar las operaciones de creación, consulta, modificación y eliminación de las tareas y sus comentarios.

## 2. Capturas de pantalla del sitio web
**PENDIENTE POR SUBIR**

## 3. Capturas de pantalla al prototipado
**PENDIENTE POR SUBIR**

## 4. Herramientas y stack tecnológico
### Tecnologías
- HTML5 — Estructura y contenido de la aplicación web.
- CSS3 — Diseño visual, estilos y adaptación responsive.
- JavaScript — Lógica de la aplicación, interacción con el usuario y comunicación con la API.
- json-server — API REST utilizada para la gestión de los datos de la aplicación. Su utilización forma parte de los requisitos del stack tecnológico del proyecto.
- SortableJS — Librería utilizada para implementar la funcionalidad de arrastrar y soltar las tareas entre las diferentes columnas del tablero.
- npm — Gestión e instalación de las dependencias del proyecto.

### Herramientas de desarrollo
- Visual Studio Code — Entorno de desarrollo utilizado para la programación y edición de los archivos del proyecto.
- Git — Sistema de control de versiones utilizado para gestionar el código fuente.
- GitHub — Plataforma utilizada para alojar el repositorio y realizar el despliegue de la aplicación mediante GitHub Pages.

### Prototipado y diseño
- v0 — Utilizado para la creación del prototipo inicial de la interfaz de la página web.
- ChatGPT — Utilizado como herramienta de asistencia durante la creación del prototipo inicial del logotipo en formato SVG.
- Adobe Illustrator — Utilizado posteriormente para crear y preparar la versión final del logotipo a partir del prototipo inicial.

### Análisis y optimización
- Lighthouse — Utilizado para realizar auditorías del proyecto y comprobar aspectos relacionados con el rendimiento, accesibilidad, buenas prácticas y SEO.

### Asistencia mediante inteligencia artificial
- Claude — Utilizado como herramienta de asistencia durante el desarrollo y programación del proyecto.
- ChatGPT — Utilizado como apoyo en el proceso de creación del prototipo del logotipo SVG.

## 5. Cómo instalar y ejecutar el proyecto
### Prerrequisitos

Antes de ejecutar el proyecto es necesario disponer de:

- Git instalado en el equipo.
- Node.js instalado. El proyecto ha sido desarrollado utilizando Node.js v24.18.0.
- Un navegador web moderno.

### 1. Clonar el repositorio

Desde una terminal, clona el repositorio utilizando el siguiente comando:

`git clone "https://github.com/JCS-Git-Hub/kanban-generator"`

### 2. Acceder a la carpeta del proyecto

Una vez clonado el repositorio, accede a la carpeta del proyecto desde la terminal:

`cd kanban-generator`

### 3. Ejecutar el proyecto

Inicia el servidor de desarrollo ejecutando:

`npm run dev`


Este comando inicia `json-server` y utiliza `db.json` como fuente de datos de la aplicación.

### 4. Abrir el proyecto

Una vez iniciado el servidor, la terminal proporcionará la dirección local desde la que se puede acceder a la aplicación.

Abre dicha dirección en un navegador web moderno para comenzar a utilizar DevBoard.

## 6. Estructura de directorios

La estructura principal del proyecto es la siguiente:

```
kanban-generator/
├── .gitignore
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── db.json
├── node_modules/
│   └── ...
└── src/
    ├── assets/
    │   └── logo.svg
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

### Descripción de los principales archivos y directorios
- `index.html` — Archivo principal de la aplicación y punto de entrada de la interfaz web.
- `db.json` — Archivo utilizado por json-server para almacenar los datos de las tareas y sus comentarios.
- `package.json` — Contiene la configuración del proyecto, los scripts disponibles y las dependencias necesarias para su ejecución.
- `package-lock.json` — Registra las versiones concretas de las dependencias instaladas.
- `gitignore` — Especifica los archivos y directorios que no deben incluirse en el control de versiones.
- `README.md` — Documentación del proyecto.
- `node_modules/` — Contiene las dependencias instaladas mediante npm. **Este directorio no se incluye en el repositorio**.
- `src/assets/` — Contiene los recursos gráficos utilizados por la aplicación, como el logotipo SVG.
- `src/css/style.css` — Contiene los estilos visuales y las reglas responsive de la aplicación.
- `src/js/app.js` — Contiene la lógica principal de la aplicación, incluyendo la gestión de tareas, comunicación con la API, búsqueda, comentarios y funcionalidad drag & drop.

## 7. Créditos
Este proyecto fue desarrollado por **José Caballero Stefañczyk** bajo supervisión de **Factoría F5** desde el curso **Desarrollo Web Full Stack** organizado por **Cruz Roja**.
