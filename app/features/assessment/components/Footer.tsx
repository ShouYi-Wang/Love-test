interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Footer(props: FooterProps) {
  return (
    <footer className={props.className} style={props.style}>
      {/* Footer content */}
    </footer>
  );
} 