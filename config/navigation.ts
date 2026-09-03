export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
];
