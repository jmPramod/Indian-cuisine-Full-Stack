
import { createRoot } from 'react-dom/client'
import './index.css'
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <FluentProvider theme={webLightTheme}>
    <BrowserRouter>
    
  <App />
    </BrowserRouter>
</FluentProvider>,
)
