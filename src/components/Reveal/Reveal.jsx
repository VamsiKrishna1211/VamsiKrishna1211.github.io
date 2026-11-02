import { useInView } from '../../hooks/useInView';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useInView();
  return (
    <Tag ref={ref} className={className} style={{ '--fade-delay': `${delay}s`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
