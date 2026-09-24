export interface NavItem {
  label: string;
  href: string;
  isSpecialPill?: boolean;
  avatarIcon?: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  role?: string;
  avatarUrl: string;
  unreadNotifications: number;
}
