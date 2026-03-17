// i18n configuration and utilities

export const languages = {
  en: 'English',
  el: 'Ελληνικά',
} as const;

export const defaultLang = 'en';

export type Lang = keyof typeof languages;

// UI translations for static text (navigation, buttons, etc.)
export const ui = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.tetrapos': 'Tetrapos',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Get Started',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.readMore': 'Read More',
    'common.contactUs': 'Contact Us',
    'common.requestDemo': 'Request a Demo',
    'common.viewFeatures': 'View Features',
    'common.contactSales': 'Contact Sales',
    
    // Homepage
    'home.caseStudies': 'Case Studies',
    'home.ourWork': 'Our Work',
    'home.services': 'Our Services',
    'home.stats': 'Our Impact',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive IT solutions tailored to your business needs',
    
    // About
    'about.title': 'About Us',
    'about.team': 'Our Team',
    'about.milestones': 'Our Journey',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.getInTouch': 'Get in Touch',
    'contact.sendMessage': 'Send Message',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  el: {
    // Navigation
    'nav.home': 'Αρχική',
    'nav.services': 'Υπηρεσίες',
    'nav.tetrapos': 'Tetrapos',
    'nav.about': 'Σχετικά',
    'nav.contact': 'Επικοινωνία',
    'nav.getStarted': 'Ξεκινήστε',
    
    // Common
    'common.learnMore': 'Μάθετε Περισσότερα',
    'common.viewAll': 'Δείτε Όλα',
    'common.readMore': 'Διαβάστε Περισσότερα',
    'common.contactUs': 'Επικοινωνήστε Μαζί Μας',
    'common.requestDemo': 'Ζητήστε Demo',
    'common.viewFeatures': 'Δείτε Χαρακτηριστικά',
    'common.contactSales': 'Επικοινωνία Πωλήσεων',
    
    // Homepage
    'home.caseStudies': 'Μελέτες Περιπτώσεων',
    'home.ourWork': 'Η Δουλειά Μας',
    'home.services': 'Οι Υπηρεσίες Μας',
    'home.stats': 'Ο Αντίκτυπός Μας',
    
    // Services
    'services.title': 'Οι Υπηρεσίες Μας',
    'services.subtitle': 'Ολοκληρωμένες λύσεις IT προσαρμοσμένες στις ανάγκες της επιχείρησής σας',
    
    // About
    'about.title': 'Σχετικά με Εμάς',
    'about.team': 'Η Ομάδα Μας',
    'about.milestones': 'Η Πορεία Μας',
    
    // Contact
    'contact.title': 'Επικοινωνία',
    'contact.getInTouch': 'Επικοινωνήστε',
    'contact.sendMessage': 'Αποστολή Μηνύματος',
    'contact.name': 'Όνομα',
    'contact.email': 'Email',
    'contact.phone': 'Τηλέφωνο',
    'contact.message': 'Μήνυμα',
    
    // Footer
    'footer.rights': 'Με επιφύλαξη παντός δικαιώματος',
    'footer.privacy': 'Πολιτική Απορρήτου',
    'footer.terms': 'Όροι Χρήσης',
  },
} as const;

// Get translation for a key
export function t(lang: Lang, key: keyof typeof ui.en): string {
  return ui[lang][key] || ui.en[key] || key;
}

// Get language from URL path
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

// Get localized path
export function getLocalizedPath(path: string, lang: Lang): string {
  // Remove leading slash for processing
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Check if path already has a language prefix
  const [firstSegment, ...rest] = cleanPath.split('/');
  if (firstSegment in languages) {
    // Replace existing language prefix
    if (lang === defaultLang) {
      return '/' + rest.join('/') || '/';
    }
    return `/${lang}/${rest.join('/')}`;
  }
  
  // Add language prefix (except for default language)
  if (lang === defaultLang) {
    return '/' + cleanPath || '/';
  }
  return `/${lang}/${cleanPath}`;
}

// Get alternate language URLs for language switcher
export function getAlternateUrls(currentUrl: URL): Record<Lang, string> {
  const pathname = currentUrl.pathname;
  const [, firstSegment, ...rest] = pathname.split('/');
  
  // Determine the base path without language prefix
  let basePath: string;
  if (firstSegment in languages) {
    basePath = '/' + rest.join('/') || '/';
  } else {
    basePath = pathname;
  }
  
  return {
    en: basePath === '/' ? '/' : basePath,
    el: basePath === '/' ? '/el' : `/el${basePath}`,
  };
}
