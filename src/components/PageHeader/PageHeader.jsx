import './PageHeader.css';

export default function PageHeader({ eyebrow, title, deck }) {
  return (
    <div className="page-header">
      {eyebrow && <p className="page-header-eyebrow mono">{eyebrow}</p>}
      <h1 className="page-header-title">{title}</h1>
      {deck && <p className="page-header-deck">{deck}</p>}
    </div>
  );
}
