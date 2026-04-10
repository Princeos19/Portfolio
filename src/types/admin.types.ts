export interface AdminStats {
  totalProjects: number;
  totalInquiries: number;
  siteViews: number;
  unreadInquiries: number;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    profileImage: string;
  };
  sections: {
    title: string;
    description: string;
  }[];
  contact: {
    email: string;
    phone: string;
    socialLinks: SocialLink[];
  };
}

export interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'instagram' | 'dribbble' | 'behance';
  url: string;
  icon: string;
}

export interface AdminSettings {
  notifications: {
    email: boolean;
    browser: boolean;
  };
  security: {
    requireAuth: boolean;
    sessionTimeout: number;
  };
  profile: {
    name: string;
    email: string;
    avatar: string;
  };
}
