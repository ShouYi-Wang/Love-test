export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface TestimonialItem {
  content: string;
  author: string;
  role?: string;
  avatar?: string;
}

export interface StatItem {
  value: string;
  label: string;
} 