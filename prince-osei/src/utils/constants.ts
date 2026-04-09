export const APP_ROUTES = {
  HOME: '/',
  PORTFOLIO: '/portfolio',
  PORTFOLIO_DETAIL: '/portfolio/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_WEBSITE: '/admin/website',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_PORTFOLIO: '/admin/portfolio',
  ADMIN_PORTFOLIO_DETAIL: '/admin/portfolio/:id',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

export const SOCIAL_LINKS = {
  LINKEDIN: 'https://linkedin.com/in/princeosei',
  TWITTER: 'https://twitter.com/princeosei',
  DRIBBBLE: 'https://dribbble.com/princeosei',
  BEHANCE: 'https://behance.net/princeosei',
} as const;

export const PROJECT_CATEGORIES = [
  'UX Research',
  'UI/UX Design',
  'Graphic Design',
  'Product Design',
] as const;

export const PROJECT_TYPES = [
  'Mobile App',
  'Web App',
  'Website',
  'Dashboard',
  'Design System',
] as const;

export const INQUIRY_STATUS = {
  NEW: 'NEW',
  READ: 'READ',
  URGENT: 'URGENT',
  ARCHIVED: 'ARCHIVED',
} as const;

export const PROJECT_TYPES_INQUIRY = [
  'UI/UX Design',
  'Graphic Design',
  'Web Development',
  'Consultation',
  'Other',
] as const;
