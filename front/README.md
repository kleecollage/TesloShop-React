# TesloShop

## Backend

1. Clonar el repositorio
2. Copiar el contenido de la rama Feat-BackNest en otra carpeta
3. Renombrar el archivo `.env.template` a `.env`
4. Ejecutar `npm install` para instalar las dependencias
5. Ejecutar `npm run dev` para iniciar el servidor de desarrollo
6. Ejecutar el comando `docker-compose up -d` para incializar el contenedor
7. Desde postman plantar el seed con la ruta GET /api/seed

## Frontend

1. Clonar el repositorio
2. Renombrar el archivo `.env.template` a `.env`
3. Ejecutar `npm install` para instalar las dependencias
4. Verificar que el backend esta corriendo en el 3000
5. Ejecutar `npm run dev` para iniciar el servidor de desarrollo

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
