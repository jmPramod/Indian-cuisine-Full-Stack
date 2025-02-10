# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Project Images
Home Page
![image](https://github.com/user-attachments/assets/fbea7719-e48d-4ceb-8756-9b6b5eafc7fd)
![image](https://github.com/user-attachments/assets/3b9fbf7a-0c29-4313-b7ea-7aeb7a6644dc)

Login Page

![image](https://github.com/user-attachments/assets/5aed85b0-958e-45e4-89b1-ec4354c98455)
![image](https://github.com/user-attachments/assets/2bd93eb2-8541-4045-9e20-d1b1eb3539d6)

Filter Options
![image](https://github.com/user-attachments/assets/4e5e00ec-d428-48db-9eda-ef73e13d96c4)

Individual Food
![image](https://github.com/user-attachments/assets/b4f9d0b4-499b-4d8e-ac24-aeca803a541f)

Profile Page
![image](https://github.com/user-attachments/assets/b5b29d05-39c7-4c9c-a816-4c26a9d007a9)
 
Admin Can Create new Food
![image](https://github.com/user-attachments/assets/a914ef99-2ac6-4e1d-a190-95395297f66a)




