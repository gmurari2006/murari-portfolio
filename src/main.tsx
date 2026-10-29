import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { director } from './engine/director';

if (typeof window !== 'undefined') {
  (window as any).__director = director;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
