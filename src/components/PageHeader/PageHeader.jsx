import './PageHeader.css';

export default function PageHeader({ title, deck, children }) {
  return (
    <div className="page-header">
      <h1 className="page-header-title">{title}</h1>
      {deck && <p className="page-header-deck">{deck}</p>}
      {children}
    </div>
  );
}
