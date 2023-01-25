import { Outlet } from 'react-router-dom';
import MenuBar from './MenuBar';
import NavigationBar from './NavigationBar';

function Layout() {
  return (
    <div>
      <NavigationBar />
      <MenuBar />
      <Outlet />
    </div>
  );
}

export default Layout;
