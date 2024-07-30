import ReactDOM from 'react-dom/client';
import './index.css';
import filter from 'leo-profanity';
import App from './components/App';
import reportWebVitals from './reportWebVitals.js';
import './i18next.js';

(filter as any).add((filter as any).getDictionary('ru'));
(filter as any).add((filter as any).getDictionary('en'));

const chatElement = document.getElementById('chat');
if (chatElement) {
  const root = ReactDOM.createRoot(chatElement);
  root.render(<App />);
} else {
  console.error('Element with id "chat" not found');
}

reportWebVitals();
