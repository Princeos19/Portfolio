export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  heroImage: string;
  overview: string;
  client: string;
  role: string;
  timeline: string;
  service: string;
  challenge: string[];
  solution: string[];
  solutionChecks: string[];
  galleryImages: { src: string; alt: string; span: number; height: string }[];
  features: { icon: string; title: string; description: string }[];
  impact: { stat: string; label: string }[];
  nextProject: { id: string; title: string } | null;
}

export const projectDetails: Record<string, ProjectDetail> = {
  salonplus: {
    id: 'salonplus',
    title: 'SalonPlus',
    subtitle: 'Luxury Booking Redefined.',
    tags: ['UI/UX Design', 'Mobile App', '2024'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAquPnTxe5IMku1-m9XLaTl09TQM2gNUcXAIKDXBdGeRVMNokreQRjEa94BXx6pgWMazj0NA8vAS-zyq-z500HLHlltvdSNbMpsuIU-w-HyVqdhrCURQW4_Uenml8_kAN1jkv4dnduh_Ks8YcJKihhhKcgGMqVnGErzHTAzNX6dWUhKtDHzg3CZGfHhR6olh2qU89BVpjBcGUEJjlQe7FqcLwrPUAC_EJnTGPCF5WwF5Akfs5LYWQLV4Xjh5og1AUV6Ornl0JBjE6E',
    overview: 'SalonPlus is a premium salon booking platform designed to streamline the appointment experience for both clients and stylists. We crafted a seamless flow from discovery to checkout, eliminating the friction of traditional phone-based booking systems.',
    client: 'SalonPlus Inc.',
    role: 'Lead Product Designer',
    timeline: '4 Months (2024)',
    service: 'End-to-End UX/UI',
    challenge: [
      'Traditional salon booking relies heavily on phone calls and walk-ins, leading to no-shows, double-bookings, and lost revenue.',
      'Existing digital solutions felt impersonal and failed to capture the premium experience that high-end salons offer their clients.'
    ],
    solution: [
      'We built a visually rich booking interface that showcases stylists\' portfolios, real-time availability, and personalized recommendations based on service history.',
      'The design language mirrors the luxury salon experience with rich imagery and smooth micro-interactions.'
    ],
    solutionChecks: [
      'Smart scheduling with conflict detection and buffer time management.',
      'Stylist portfolio showcase with before/after galleries.'
    ],
    galleryImages: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJB1XwZ0waDyuG0EnJMLHDz_uaRUGFsULaD024KBsyas2d_uB6wPpXGC6yEuzZkz8QfSjxQMsF1Yc7gJUQ1sT7xd7wtoAFnXmaWe8RG4Rji6KJr4lqsPt2Ye1Pludm5O6bcx730L4mRo18vPhkkCiLQwmg6g1wJsGRfFiR0qNdYqlnkIISZSQSIFl9g9ZBNxtvTxq-qzRseZVFfg9Sn-QquAVfjZZyH0ckY1cczrU1l6c0w8OacIi-kNueSS2ifX46LbMqNuRvewI', alt: 'Design System', span: 8, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy1fHKif2ksJ7ySeEDrRgygZ7DyYzEuQ3Yz031575ZLOhUtcX2krh4CMUrL1nTHGrg1_C6oWM0KstFdIUvMs90nf7V-lGT2hICo5Ak9eF1ejmTnmOb5xlDXDKdfHE0XR05_3z_L-ZEMTU_46cpevzXzEJ-GXA6v20p0Y2a6AwhgTDevs3HP7TwKorA3nfpsDX_Di0BdS090Vs6yDYws4xw3UrMhoppjpJMy5SeB2Ql6xYXcgA8znblOfEiVBBbHvbJNbF3cRfMbtI', alt: 'Mobile Screen', span: 4, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaz-MGsw2x1Ttn8p25mHkHPDxJA4Z5ABqg8TktTHn6y2N1y-jqusr6WiW_ctQtXKUHlybA5jp-PjLZzjH_uzvvS3thgsWwgZC669E2GurVYzsI4jjdR2nxzvLeV6xyO4bCdw_SSwsYBTvetM3wOiDswXztWKT0Q9mjJV24FZMofv7yhH1LO5T1kEJ7xyxELwjQuperkmbK0YcnYDqNxslHDdlWwmNcnCrYvJHscClNC-eId57bBfqRoyNklIDOIVvzTcyZu1gIGw4', alt: 'Booking Flow', span: 4, height: 'h-[500px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfRgTQ937Ac9ZYs8pCvzM7JAP2JcnXO7v4qZ0o-Pau6_XEWUj5biBqtTbNL2Ds8tLasVKJ6BNH2l-Zwi7ERbYV6IKIX5jqJ9wNQUckcdfu8K3H6hSANAJ4aMAuYfaeBtx3-NMjatfA0oGumieE3p3JHVI5CkW4STBJguLTXRJwZmkHB6TeV0qEJ7p7A9ojB110LaDgR_RSMauydylHR_FxgvtDTPWje2_37P7aMEhXC1pdsXeMbdw69VqYoeHs2bOkfTOYCH5N2o0', alt: 'User Journey', span: 8, height: 'h-[500px]' }
    ],
    features: [
      { icon: 'calendar_today', title: 'Smart Scheduling', description: 'AI-powered time slot suggestions based on stylist availability and client preferences.' },
      { icon: 'palette', title: 'Style Discovery', description: 'Visual inspiration board where clients can save and share looks with their stylist before the appointment.' },
      { icon: 'payments', title: 'Seamless Checkout', description: 'Integrated payment system with tipping, loyalty rewards, and automatic rebooking reminders.' }
    ],
    impact: [
      { stat: '65%', label: 'Reduction in no-shows' },
      { stat: '8k+', label: 'Monthly active bookings' },
      { stat: '4.8', label: 'Average App Store rating' }
    ],
    nextProject: { id: 'mindfit', title: 'MindFit: Wellness Reimagined' }
  },

  mindfit: {
    id: 'mindfit',
    title: 'MindFit',
    subtitle: 'Mental Health Reimagined.',
    tags: ['UI/UX Design', 'Mobile App', '2024'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT0VG_xJ6NTL4aPiIO52o2HHbVLLUFIMQj93JHJHMmWX1IP2GBrcgLTF0Uck8ODd1eGxyuOBtGXNdxHmQmQu8xwDKnxjeQAINGt2O1NOmcEgGOdeCUwMeopnBQFkJjh42Zy6qbhxn1rDvtqw8kfg_bEgOzetbC4fF65FMbb9nsx5hJixJpswwL4Y70IWsrNLag3h8vSFtIoI0x_-bHMDzzjMcXqbwYH6Nk1ru5Y5u2nQpFoPz9dOITR3eKWdbABLdryAxt_UYuLr0',
    overview: 'MindFit is a holistic mental wellness companion designed to bridge the gap between clinical therapy and daily self-care. We built an ecosystem that tracks emotional triggers in real-time, providing users with personalized interventions that actually work.',
    client: 'MindFit Wellness Inc.',
    role: 'Lead Product Designer',
    timeline: '6 Months (2024)',
    service: 'End-to-End UX/UI',
    challenge: [
      'Mental health apps often feel clinical, cold, or overwhelming. The primary challenge was to design a high-retention experience that felt supportive rather than burdensome.',
      'Data silos between user tracking and actionable insights meant most users abandoned traditional apps after just three days.'
    ],
    solution: [
      'We developed a "Low-Friction Pulse" check-in system that uses haptic feedback and minimalist visual cues. By leveraging an "Obsidian Cyan" dark-mode aesthetic, we reduced cognitive load and visual fatigue.',
    ],
    solutionChecks: [
      'Predictive mood analysis using wearable biometric data sync.',
      'Asymmetrical dashboard layout for natural thumb-scrolling.'
    ],
    galleryImages: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJB1XwZ0waDyuG0EnJMLHDz_uaRUGFsULaD024KBsyas2d_uB6wPpXGC6yEuzZkz8QfSjxQMsF1Yc7gJUQ1sT7xd7wtoAFnXmaWe8RG4Rji6KJr4lqsPt2Ye1Pludm5O6bcx730L4mRo18vPhkkCiLQwmg6g1wJsGRfFiR0qNdYqlnkIISZSQSIFl9g9ZBNxtvTxq-qzRseZVFfg9Sn-QquAVfjZZyH0ckY1cczrU1l6c0w8OacIi-kNueSS2ifX46LbMqNuRvewI', alt: 'Design System', span: 8, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy1fHKif2ksJ7ySeEDrRgygZ7DyYzEuQ3Yz031575ZLOhUtcX2krh4CMUrL1nTHGrg1_C6oWM0KstFdIUvMs90nf7V-lGT2hICo5Ak9eF1ejmTnmOb5xlDXDKdfHE0XR05_3z_L-ZEMTU_46cpevzXzEJ-GXA6v20p0Y2a6AwhgTDevs3HP7TwKorA3nfpsDX_Di0BdS090Vs6yDYws4xw3UrMhoppjpJMy5SeB2Ql6xYXcgA8znblOfEiVBBbHvbJNbF3cRfMbtI', alt: 'Mobile Screen 1', span: 4, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaz-MGsw2x1Ttn8p25mHkHPDxJA4Z5ABqg8TktTHn6y2N1y-jqusr6WiW_ctQtXKUHlybA5jp-PjLZzjH_uzvvS3thgsWwgZC669E2GurVYzsI4jjdR2nxzvLeV6xyO4bCdw_SSwsYBTvetM3wOiDswXztWKT0Q9mjJV24FZMofv7yhH1LO5T1kEJ7xyxELwjQuperkmbK0YcnYDqNxslHDdlWwmNcnCrYvJHscClNC-eId57bBfqRoyNklIDOIVvzTcyZu1gIGw4', alt: 'Mobile Screen 2', span: 4, height: 'h-[500px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfRgTQ937Ac9ZYs8pCvzM7JAP2JcnXO7v4qZ0o-Pau6_XEWUj5biBqtTbNL2Ds8tLasVKJ6BNH2l-Zwi7ERbYV6IKIX5jqJ9wNQUckcdfu8K3H6hSANAJ4aMAuYfaeBtx3-NMjatfA0oGumieE3p3JHVI5CkW4STBJguLTXRJwZmkHB6TeV0qEJ7p7A9ojB110LaDgR_RSMauydylHR_FxgvtDTPWje2_37P7aMEhXC1pdsXeMbdw69VqYoeHs2bOkfTOYCH5N2o0', alt: 'User Journey', span: 8, height: 'h-[500px]' }
    ],
    features: [
      { icon: 'auto_awesome', title: 'AI Insight Engine', description: 'Machine learning algorithms that predict emotional dips before they happen, suggesting preventive care.' },
      { icon: 'vital_signs', title: 'Biometric Sync', description: 'Seamless integration with Apple Health and Google Fit to monitor heart rate variability and sleep quality.' },
      { icon: 'encrypted', title: 'Zero-Knowledge', description: 'End-to-end encryption for all journaling and personal notes, ensuring total privacy and user trust.' }
    ],
    impact: [
      { stat: '42%', label: 'Increase in daily retention' },
      { stat: '12k+', label: 'Active premium users' },
      { stat: '4.9', label: 'Average App Store rating' }
    ],
    nextProject: { id: 'freelancer-dashboard', title: 'Freelancer Dashboard' }
  },

  'freelancer-dashboard': {
    id: 'freelancer-dashboard',
    title: 'Freelancer Dashboard',
    subtitle: 'SaaS Management Simplified.',
    tags: ['UI/UX Design', 'Web App', '2024'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRD06Hgz0uweNi28D7nwEB8bKVNS8Qk6V4vnLMrnCyFP-fCS3altIRynjAzj67mZVOCbx9KYV6MhwOgSCwOI2x3ISmXkFkhfIGVN_zKrQnLEuMbuj4J84SNeMLW5jN3IWOyz2VT6kTSoP58_gx_pC-iPlP9ciK_ImD4P5Q8tR3IqGPjfpSMmkfcDZVTyNvmElcKr_MSVKEHO9P3BSi6mpmTcBuC0I6vhittA9PJE5luqLnG6fxv0NjX9FhLoB-VlFrktXpYT1qz4Q',
    overview: 'A comprehensive SaaS management dashboard designed for freelancers to track projects, invoices, clients, and time — all in one unified workspace. The goal was to reduce context-switching and bring clarity to the chaos of independent work.',
    client: 'FreelanceOS',
    role: 'Product Designer',
    timeline: '5 Months (2024)',
    service: 'Dashboard UX/UI',
    challenge: [
      'Freelancers juggle multiple tools for invoicing, project management, and time tracking, leading to fragmented workflows and lost billable hours.',
      'Existing dashboards overwhelm users with data without providing actionable insights about their business health.'
    ],
    solution: [
      'We designed a modular dashboard with customizable widgets that surface only what matters. The information architecture was built around the freelancer\'s daily workflow rather than feature categories.',
    ],
    solutionChecks: [
      'Drag-and-drop widget system for personalized dashboard layouts.',
      'Automated invoice generation from tracked time entries.'
    ],
    galleryImages: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJB1XwZ0waDyuG0EnJMLHDz_uaRUGFsULaD024KBsyas2d_uB6wPpXGC6yEuzZkz8QfSjxQMsF1Yc7gJUQ1sT7xd7wtoAFnXmaWe8RG4Rji6KJr4lqsPt2Ye1Pludm5O6bcx730L4mRo18vPhkkCiLQwmg6g1wJsGRfFiR0qNdYqlnkIISZSQSIFl9g9ZBNxtvTxq-qzRseZVFfg9Sn-QquAVfjZZyH0ckY1cczrU1l6c0w8OacIi-kNueSS2ifX46LbMqNuRvewI', alt: 'Dashboard Overview', span: 8, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy1fHKif2ksJ7ySeEDrRgygZ7DyYzEuQ3Yz031575ZLOhUtcX2krh4CMUrL1nTHGrg1_C6oWM0KstFdIUvMs90nf7V-lGT2hICo5Ak9eF1ejmTnmOb5xlDXDKdfHE0XR05_3z_L-ZEMTU_46cpevzXzEJ-GXA6v20p0Y2a6AwhgTDevs3HP7TwKorA3nfpsDX_Di0BdS090Vs6yDYws4xw3UrMhoppjpJMy5SeB2Ql6xYXcgA8znblOfEiVBBbHvbJNbF3cRfMbtI', alt: 'Invoice Module', span: 4, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaz-MGsw2x1Ttn8p25mHkHPDxJA4Z5ABqg8TktTHn6y2N1y-jqusr6WiW_ctQtXKUHlybA5jp-PjLZzjH_uzvvS3thgsWwgZC669E2GurVYzsI4jjdR2nxzvLeV6xyO4bCdw_SSwsYBTvetM3wOiDswXztWKT0Q9mjJV24FZMofv7yhH1LO5T1kEJ7xyxELwjQuperkmbK0YcnYDqNxslHDdlWwmNcnCrYvJHscClNC-eId57bBfqRoyNklIDOIVvzTcyZu1gIGw4', alt: 'Time Tracker', span: 4, height: 'h-[500px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfRgTQ937Ac9ZYs8pCvzM7JAP2JcnXO7v4qZ0o-Pau6_XEWUj5biBqtTbNL2Ds8tLasVKJ6BNH2l-Zwi7ERbYV6IKIX5jqJ9wNQUckcdfu8K3H6hSANAJ4aMAuYfaeBtx3-NMjatfA0oGumieE3p3JHVI5CkW4STBJguLTXRJwZmkHB6TeV0qEJ7p7A9ojB110LaDgR_RSMauydylHR_FxgvtDTPWje2_37P7aMEhXC1pdsXeMbdw69VqYoeHs2bOkfTOYCH5N2o0', alt: 'Client Pipeline', span: 8, height: 'h-[500px]' }
    ],
    features: [
      { icon: 'widgets', title: 'Modular Widgets', description: 'Customizable dashboard blocks that adapt to each freelancer\'s unique workflow and priorities.' },
      { icon: 'receipt_long', title: 'Auto Invoicing', description: 'One-click invoice generation from tracked hours with support for multiple currencies and tax rules.' },
      { icon: 'insights', title: 'Business Insights', description: 'Revenue forecasting and client health scores to help freelancers make smarter business decisions.' }
    ],
    impact: [
      { stat: '3.5h', label: 'Saved per week on admin' },
      { stat: '5k+', label: 'Active freelancers' },
      { stat: '4.7', label: 'Average user rating' }
    ],
    nextProject: { id: 'quantum-wallet', title: 'Quantum Wallet' }
  },

  'quantum-wallet': {
    id: 'quantum-wallet',
    title: 'Quantum Wallet',
    subtitle: 'Crypto Transfers Evolved.',
    tags: ['UI/UX Design', 'Mobile App', '2024'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKCPEMEY-xpX7w7UAt5gZgj7XzWXgFf45JKnoSrc9rkzXpdb2AnLwPFnuYlQk_2iqeKeWxcdsCx1khnji8CB-n6lLFz59m0EfDHH3MwR2FbS53MniHr3mYvJPpSn9D8b_xJToKqPjGslv-Ow6SdENanDlOp0Oli0wZhKuC2PTJXPA6FfXD9EBGR4GqIne1LLq2whN3aUbSmOQ9279VR6pnNy8uTO_xmdut9qO5W0ptqshCE2NHbXwaD3Uiiq3jKoWLtOn2xd8994s',
    overview: 'Quantum Wallet is a biometric-first cryptocurrency wallet built for speed, security, and simplicity. We designed an experience that makes complex DeFi operations feel as intuitive as sending a text message.',
    client: 'Quantum Finance',
    role: 'Product Designer',
    timeline: '4 Months (2024)',
    service: 'Mobile UX/UI',
    challenge: [
      'Cryptocurrency wallets intimidate mainstream users with jargon-heavy interfaces, complex gas fee calculations, and anxiety-inducing transaction confirmations.',
      'Security features often create friction that drives users toward less secure custodial solutions.'
    ],
    solution: [
      'We introduced a "Trust Layer" — a visual confidence system that uses color-coded risk indicators and plain-language transaction summaries to demystify every interaction.',
    ],
    solutionChecks: [
      'Biometric confirmation with visual fingerprint animation feedback.',
      'Plain-language transaction summaries replacing hex addresses.'
    ],
    galleryImages: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJB1XwZ0waDyuG0EnJMLHDz_uaRUGFsULaD024KBsyas2d_uB6wPpXGC6yEuzZkz8QfSjxQMsF1Yc7gJUQ1sT7xd7wtoAFnXmaWe8RG4Rji6KJr4lqsPt2Ye1Pludm5O6bcx730L4mRo18vPhkkCiLQwmg6g1wJsGRfFiR0qNdYqlnkIISZSQSIFl9g9ZBNxtvTxq-qzRseZVFfg9Sn-QquAVfjZZyH0ckY1cczrU1l6c0w8OacIi-kNueSS2ifX46LbMqNuRvewI', alt: 'Wallet Overview', span: 8, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy1fHKif2ksJ7ySeEDrRgygZ7DyYzEuQ3Yz031575ZLOhUtcX2krh4CMUrL1nTHGrg1_C6oWM0KstFdIUvMs90nf7V-lGT2hICo5Ak9eF1ejmTnmOb5xlDXDKdfHE0XR05_3z_L-ZEMTU_46cpevzXzEJ-GXA6v20p0Y2a6AwhgTDevs3HP7TwKorA3nfpsDX_Di0BdS090Vs6yDYws4xw3UrMhoppjpJMy5SeB2Ql6xYXcgA8znblOfEiVBBbHvbJNbF3cRfMbtI', alt: 'Transaction Flow', span: 4, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaz-MGsw2x1Ttn8p25mHkHPDxJA4Z5ABqg8TktTHn6y2N1y-jqusr6WiW_ctQtXKUHlybA5jp-PjLZzjH_uzvvS3thgsWwgZC669E2GurVYzsI4jjdR2nxzvLeV6xyO4bCdw_SSwsYBTvetM3wOiDswXztWKT0Q9mjJV24FZMofv7yhH1LO5T1kEJ7xyxELwjQuperkmbK0YcnYDqNxslHDdlWwmNcnCrYvJHscClNC-eId57bBfqRoyNklIDOIVvzTcyZu1gIGw4', alt: 'Security Screen', span: 4, height: 'h-[500px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfRgTQ937Ac9ZYs8pCvzM7JAP2JcnXO7v4qZ0o-Pau6_XEWUj5biBqtTbNL2Ds8tLasVKJ6BNH2l-Zwi7ERbYV6IKIX5jqJ9wNQUckcdfu8K3H6hSANAJ4aMAuYfaeBtx3-NMjatfA0oGumieE3p3JHVI5CkW4STBJguLTXRJwZmkHB6TeV0qEJ7p7A9ojB110LaDgR_RSMauydylHR_FxgvtDTPWje2_37P7aMEhXC1pdsXeMbdw69VqYoeHs2bOkfTOYCH5N2o0', alt: 'Portfolio View', span: 8, height: 'h-[500px]' }
    ],
    features: [
      { icon: 'fingerprint', title: 'Biometric Auth', description: 'Face ID and fingerprint-first authentication that eliminates seed phrase anxiety for everyday transactions.' },
      { icon: 'swap_horiz', title: 'Instant Swaps', description: 'One-tap token swaps with real-time price comparison across multiple decentralized exchanges.' },
      { icon: 'shield', title: 'Trust Layer', description: 'Color-coded risk indicators and plain-language summaries for every transaction before confirmation.' }
    ],
    impact: [
      { stat: '89%', label: 'Task completion rate' },
      { stat: '25k+', label: 'Wallets created' },
      { stat: '4.6', label: 'Average App Store rating' }
    ],
    nextProject: { id: 'lumina-app', title: 'Lumina App' }
  },

  'lumina-app': {
    id: 'lumina-app',
    title: 'Lumina App',
    subtitle: 'Creative Photography Elevated.',
    tags: ['UI/UX Design', 'Website', '2024'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApB_aE-8Zipv4vBfwYGtIHbu94xSugNsih1ySIYkoPOwvusohG86gGRYGUu0kGC1WeME-9XvQgKVemQHCaJAsnJrUXQQyIM2JoPGUVIB1TmGtZrx5pfpK0sdK8dwKQQvPkMRxzm7Wrshz8nHUUotd2G5kkGCBDqRedWOQQDKcnu_WKRHGxtpije302jC4FW41vKHFO6Zan-CzW9OoYEfN7Toxgib4j7D0csf_HvJMSI3KU_YYWFwugm9KGY8Q1I4yH_XR2lxNEUd0',
    overview: 'Lumina is a high-end creative photography portal designed for professional photographers to showcase, sell, and license their work. The platform emphasizes visual storytelling with a gallery-first experience that lets the work speak for itself.',
    client: 'Lumina Creative',
    role: 'Lead Product Designer',
    timeline: '3 Months (2024)',
    service: 'Web UX/UI',
    challenge: [
      'Photography platforms either prioritize social features over commerce or focus on stock licensing at the expense of artistic presentation.',
      'Professional photographers needed a platform that felt like a personal gallery, not a marketplace.'
    ],
    solution: [
      'We designed an immersive, full-bleed gallery experience with subtle animations that draw attention to the photography itself. Commerce features are woven seamlessly into the viewing experience.',
    ],
    solutionChecks: [
      'Full-screen lightbox with EXIF data and licensing options overlay.',
      'Curator-style collection builder for client presentations.'
    ],
    galleryImages: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJB1XwZ0waDyuG0EnJMLHDz_uaRUGFsULaD024KBsyas2d_uB6wPpXGC6yEuzZkz8QfSjxQMsF1Yc7gJUQ1sT7xd7wtoAFnXmaWe8RG4Rji6KJr4lqsPt2Ye1Pludm5O6bcx730L4mRo18vPhkkCiLQwmg6g1wJsGRfFiR0qNdYqlnkIISZSQSIFl9g9ZBNxtvTxq-qzRseZVFfg9Sn-QquAVfjZZyH0ckY1cczrU1l6c0w8OacIi-kNueSS2ifX46LbMqNuRvewI', alt: 'Gallery View', span: 8, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy1fHKif2ksJ7ySeEDrRgygZ7DyYzEuQ3Yz031575ZLOhUtcX2krh4CMUrL1nTHGrg1_C6oWM0KstFdIUvMs90nf7V-lGT2hICo5Ak9eF1ejmTnmOb5xlDXDKdfHE0XR05_3z_L-ZEMTU_46cpevzXzEJ-GXA6v20p0Y2a6AwhgTDevs3HP7TwKorA3nfpsDX_Di0BdS090Vs6yDYws4xw3UrMhoppjpJMy5SeB2Ql6xYXcgA8znblOfEiVBBbHvbJNbF3cRfMbtI', alt: 'Photographer Profile', span: 4, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaz-MGsw2x1Ttn8p25mHkHPDxJA4Z5ABqg8TktTHn6y2N1y-jqusr6WiW_ctQtXKUHlybA5jp-PjLZzjH_uzvvS3thgsWwgZC669E2GurVYzsI4jjdR2nxzvLeV6xyO4bCdw_SSwsYBTvetM3wOiDswXztWKT0Q9mjJV24FZMofv7yhH1LO5T1kEJ7xyxELwjQuperkmbK0YcnYDqNxslHDdlWwmNcnCrYvJHscClNC-eId57bBfqRoyNklIDOIVvzTcyZu1gIGw4', alt: 'Licensing Flow', span: 4, height: 'h-[500px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfRgTQ937Ac9ZYs8pCvzM7JAP2JcnXO7v4qZ0o-Pau6_XEWUj5biBqtTbNL2Ds8tLasVKJ6BNH2l-Zwi7ERbYV6IKIX5jqJ9wNQUckcdfu8K3H6hSANAJ4aMAuYfaeBtx3-NMjatfA0oGumieE3p3JHVI5CkW4STBJguLTXRJwZmkHB6TeV0qEJ7p7A9ojB110LaDgR_RSMauydylHR_FxgvtDTPWje2_37P7aMEhXC1pdsXeMbdw69VqYoeHs2bOkfTOYCH5N2o0', alt: 'Collection Builder', span: 8, height: 'h-[500px]' }
    ],
    features: [
      { icon: 'photo_library', title: 'Immersive Gallery', description: 'Full-bleed, edge-to-edge image display with smooth transitions that showcase photography at its best.' },
      { icon: 'storefront', title: 'Built-in Commerce', description: 'Integrated print and digital licensing marketplace with automated delivery and rights management.' },
      { icon: 'group', title: 'Client Proofing', description: 'Private galleries with annotation tools for client feedback, selection, and approval workflows.' }
    ],
    impact: [
      { stat: '200+', label: 'Professional photographers' },
      { stat: '15k', label: 'Images licensed' },
      { stat: '4.8', label: 'Creator satisfaction score' }
    ],
    nextProject: { id: 'salonplus', title: 'SalonPlus: Luxury Booking' }
  },

  mummystar: {
    id: 'mummystar',
    title: "Mummy's Star",
    subtitle: 'E-Commerce with Heart.',
    tags: ['UI/UX Design', 'Website', '2024'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIK4R7tPr5PfMjZGMhlrHOgEkKrs232Qtms7kk43m629fvWXL5-Unc8UWx5WDspK3msq9NUsaqmB47xRtECGuGTSk11pTvHF0kVkXnIbRaBjVLOHEZ3cvZprQqjkr_Ycw8vnQYGfWj6Uqd_SVkonUtMwsSbWfrC8YW4nxWUdusoFqgdyr9qQpMhxpwD4NRcXHWSIMxPWxPyvouGgMpDn3QtbYjD4t85NkOsfpEnHX2D7uwi0nWWS77JQ5NAxQKuFTJ0kBzigZGxvI',
    overview: "Mummy's Star is an e-commerce platform with a mission — connecting conscious consumers with curated products while supporting families affected by cancer during pregnancy. We designed a shopping experience that balances commerce with compassion.",
    client: "Mummy's Star Foundation",
    role: 'Product Designer',
    timeline: '4 Months (2024)',
    service: 'E-Commerce UX/UI',
    challenge: [
      'Charity-driven e-commerce platforms often struggle to balance emotional storytelling with smooth commercial transactions.',
      'Users need to feel the mission without friction slowing their purchase journey.'
    ],
    solution: [
      'We wove the charity narrative into the shopping experience through "Impact Cards" — visual indicators showing how each purchase contributes to the foundation\'s mission.',
    ],
    solutionChecks: [
      'Impact visualization showing real donation tracking per purchase.',
      'Story-driven product pages that connect products to beneficiaries.'
    ],
    galleryImages: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJB1XwZ0waDyuG0EnJMLHDz_uaRUGFsULaD024KBsyas2d_uB6wPpXGC6yEuzZkz8QfSjxQMsF1Yc7gJUQ1sT7xd7wtoAFnXmaWe8RG4Rji6KJr4lqsPt2Ye1Pludm5O6bcx730L4mRo18vPhkkCiLQwmg6g1wJsGRfFiR0qNdYqlnkIISZSQSIFl9g9ZBNxtvTxq-qzRseZVFfg9Sn-QquAVfjZZyH0ckY1cczrU1l6c0w8OacIi-kNueSS2ifX46LbMqNuRvewI', alt: 'Store Homepage', span: 8, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy1fHKif2ksJ7ySeEDrRgygZ7DyYzEuQ3Yz031575ZLOhUtcX2krh4CMUrL1nTHGrg1_C6oWM0KstFdIUvMs90nf7V-lGT2hICo5Ak9eF1ejmTnmOb5xlDXDKdfHE0XR05_3z_L-ZEMTU_46cpevzXzEJ-GXA6v20p0Y2a6AwhgTDevs3HP7TwKorA3nfpsDX_Di0BdS090Vs6yDYws4xw3UrMhoppjpJMy5SeB2Ql6xYXcgA8znblOfEiVBBbHvbJNbF3cRfMbtI', alt: 'Product Page', span: 4, height: 'h-[600px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaz-MGsw2x1Ttn8p25mHkHPDxJA4Z5ABqg8TktTHn6y2N1y-jqusr6WiW_ctQtXKUHlybA5jp-PjLZzjH_uzvvS3thgsWwgZC669E2GurVYzsI4jjdR2nxzvLeV6xyO4bCdw_SSwsYBTvetM3wOiDswXztWKT0Q9mjJV24FZMofv7yhH1LO5T1kEJ7xyxELwjQuperkmbK0YcnYDqNxslHDdlWwmNcnCrYvJHscClNC-eId57bBfqRoyNklIDOIVvzTcyZu1gIGw4', alt: 'Impact Dashboard', span: 4, height: 'h-[500px]' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfRgTQ937Ac9ZYs8pCvzM7JAP2JcnXO7v4qZ0o-Pau6_XEWUj5biBqtTbNL2Ds8tLasVKJ6BNH2l-Zwi7ERbYV6IKIX5jqJ9wNQUckcdfu8K3H6hSANAJ4aMAuYfaeBtx3-NMjatfA0oGumieE3p3JHVI5CkW4STBJguLTXRJwZmkHB6TeV0qEJ7p7A9ojB110LaDgR_RSMauydylHR_FxgvtDTPWje2_37P7aMEhXC1pdsXeMbdw69VqYoeHs2bOkfTOYCH5N2o0', alt: 'Checkout Flow', span: 8, height: 'h-[500px]' }
    ],
    features: [
      { icon: 'volunteer_activism', title: 'Impact Cards', description: 'Visual donation tracking that shows customers exactly how their purchase supports families in need.' },
      { icon: 'shopping_bag', title: 'Curated Collections', description: 'Thoughtfully organized product categories with editorial-style layouts that tell each product\'s story.' },
      { icon: 'favorite', title: 'Community Hub', description: 'Integrated stories and updates from beneficiary families, creating an emotional connection with shoppers.' }
    ],
    impact: [
      { stat: '35%', label: 'Increase in conversions' },
      { stat: '£50k+', label: 'Raised for families' },
      { stat: '4.9', label: 'Customer satisfaction' }
    ],
    nextProject: { id: 'salonplus', title: 'SalonPlus: Luxury Booking' }
  }
};
