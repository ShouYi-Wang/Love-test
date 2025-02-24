export interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  navigation?: {
    main: Array<{ name: string; href: string }>;
    social: Array<{
      name: string;
      href: string;
      icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    }>;
  };
} 