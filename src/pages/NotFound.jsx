import { Link } from '../router/Link';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="mono">404</p>
      <h1>Page not found</h1>
      <p className="prose">Whatever you were looking for isn&rsquo;t here.</p>
      <Link to="/" className="btn btn-primary">
        Back home →
      </Link>
    </div>
  );
}
