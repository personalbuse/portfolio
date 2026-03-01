# Portafolio Profesional - Sergio David Burbano Mariño

Este es un portafolio web de alto rendimiento y estética minimalista, diseñado para destacar habilidades técnicas, proyectos y experiencia profesional.

## 🚀 Tecnologías

- **Frontend:** React + Vite
- **Estilos:** TailwindCSS (Escala de grises)
- **Animaciones:** GSAP (ScrollTrigger, Text animations)
- **Iconos:** Lucide-React
- **SEO:** React Helmet Async + JSON-LD (Schema.org)
- **API:** GitHub API (Repositorios dinámicos)

## 🛠️ Instalación y Configuración

Siga estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd personal_portfolio
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🌐 Despliegue (Vercel / Netlify)

Este proyecto está listo para ser desplegado en plataformas modernas de hosting:

### Vercel
1. Instala el CLI de Vercel: `npm i -g vercel`
2. Ejecuta `vercel` en la raíz del proyecto.
3. Configura la "Output Directory" como `dist`.

### Netlify
1. Sube el código a GitHub.
2. Conecta el repositorio en el panel de Netlify.
3. Configure el comando de build como `npm run build` y el directorio de publicación como `dist`.

## 📁 Estructura del Proyecto

```text
src/
├── components/
│   ├── common/      # SEO, Cursor, etc.
│   ├── layout/      # Navbar, Footer
│   └── sections/    # Hero, About, Projects...
├── hooks/           # useGitHub, etc.
├── styles/          # index.css
└── App.jsx          # Componente principal
```

## 📄 Notas

- El cursor personalizado se desactiva automáticamente en elementos táctiles (mejorado por CSS).
- El formulario de contacto es una plantilla visual funcional lista para integrar con servicios como Formspree o EmailJS.
- Los proyectos se cargan automáticamente desde la API de GitHub usando el nombre de usuario configurado en `Projects.jsx`.
