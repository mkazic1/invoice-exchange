import { Outlet } from 'react-router-dom';
import MenuBar from './MenuBar';
import NavigationBar from './NavigationBar';

const Layout = () => (
  <div>
    <NavigationBar />
    <MenuBar />
    <Outlet />
  </div>
);

export default Layout;
