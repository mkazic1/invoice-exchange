import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ROUTES from './constants/routes';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePage from './pages/WelcomePage';
import Providers from './providers';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
