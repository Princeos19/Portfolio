import HomePage from '../pages/public/home/page';
import PortfolioPage from '../pages/public/portfolio/page';
import PortfolioDetailPage from '../pages/public/portfolio/[id]/page';
import AboutPage from '../pages/public/about/page';
import ContactPage from '../pages/public/contact/page';

export const publicRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/portfolio', element: <PortfolioPage /> },
  { path: '/portfolio/:id', element: <PortfolioDetailPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
];
