import { Groups, Description, AssignmentInd } from '@mui/icons-material';
import ROUTES from './routes';

const MENU_OPTIONS = [
  {
    title: 'Invoices',
    icon: <Description />,
    navigation: ROUTES.INVOICES,
  },
  {
    title: 'Sellers',
    icon: <AssignmentInd />,
    navigation: ROUTES.SELLERS,
  },
  {
    title: 'Customers',
    icon: <Groups />,
    navigation: ROUTES.CUSTOMERS,
  },
];

export default MENU_OPTIONS;
