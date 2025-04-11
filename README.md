
Built by https://www.blackbox.ai

---

```markdown
# Sistema de Votación - Colegio Calatrava

## Project Overview
El Sistema de Votación del Colegio Calatrava es una plataforma digital diseñada para facilitar las elecciones escolares. Los estudiantes pueden ingresar mediante su correo institucional y votar por sus candidatos favoritos. Además, el sistema permite visualizar en tiempo real los resultados de las votaciones.

## Installation
Para ejecutar el sistema de votación, necesitarás tener Python instalado en tu máquina. Luego, debes seguir estos pasos:

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd [nombre_del_directorio_clonado]
   ```

2. **Iniciar el servidor**
   ```bash
   python server.py
   ```
   El servidor se iniciará en el puerto 8000, y podrás acceder al sistema a través de tu navegador web en `http://localhost:8000`.

## Usage
1. Accede a `index.html` en tu navegador.
2. Ingresa tu correo institucional (debe ser del dominio `@colegiocalatrava.edu.co`).
3. Una vez autenticado, podrás acceder al sistema y participar en la votación.
4. Después de votar, puedes visualizar los resultados en tiempo real en `results.html`.

## Features
- **Autenticación de usuario:** Verificación de usuarios mediante correo institucional.
- **Votación:** Los estudiantes pueden seleccionar a sus candidatos y confirmar su voto.
- **Resultados en tiempo real:** Visualización de estadísticas y gráficos sobre la votación y la participación.
- **Interfaz amigable:** Diseñado con Tailwind CSS para una experiencia de usuario óptima.

## Dependencies
El proyecto incluye las siguientes dependencias principales que se utilizan:

- [Firebase](https://firebase.google.com/docs/web/setup): Para la autenticación y almacenamiento de datos.
- [Chart.js](https://www.chartjs.org/): Para la visualización de gráficos en los resultados de la votación.
- [Tailwind CSS](https://tailwindcss.com/): Framework CSS para estilos responsivos y personalizables.
  
No hay un archivo `package.json` presente, ya que el proyecto no utiliza Node.js.

## Project Structure
La estructura del proyecto es la siguiente:

```
├── index.html          # Página principal de inicio y autenticación
├── vote.html           # Página para votar
├── results.html        # Página para visualizar resultados
├── server.py           # Servidor simple en Python para servir los archivos
├── js/                 # Carpeta donde se encuentran los scripts JavaScript
│   ├── auth.js         # Código para la autenticación de usuarios
│   ├── vote.js         # Manejo de la lógica de votación
│   └── results.js      # Lógica para mostrar resultados
├── firebase.js         # Configuración y manejo de Firebase
└── css/                # Estilos CSS personalizados (opcional si se adicional)
```

## Contributing
Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request.

## License
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

---

**Desarrollado por el equipo del Colegio Calatrava.**
```