import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ROUTES from './constants-data/routes';
import Providers from './providers';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import Invoices from './pages/invoices/Invoices';
import Sellers from './pages/sellers/Sellers';
import Customers from './pages/customers/Customers';
import Layout from './components/Layout';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
          <Route path="/" element={<WelcomePage />} />
          <Route element={<Layout />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.INVOICES} element={<Invoices />} />
            <Route path={ROUTES.SELLERS} element={<Sellers />} />
            <Route path={ROUTES.CUSTOMERS} element={<Customers />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
