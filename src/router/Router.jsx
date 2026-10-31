import { createContext, useContext, useSyncExternalStore, Children, cloneElement } from 'react';

const PathContext = createContext('/');

function normalize(path) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
}

function subscribe(callback) {
  window.addEventListener('popstate', callback);
  window.addEventListener('pushstate', callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener('pushstate', callback);
  };
}

function getSnapshot() {
  return normalize(window.location.pathname);
}

// eslint-disable-next-line react-refresh/only-export-components -- router module intentionally shares navigate/usePath alongside the Router component
export function navigate(to) {
  const target = normalize(to);
  if (target !== normalize(window.location.pathname)) {
    window.history.pushState(null, '', to);
    window.dispatchEvent(new Event('pushstate'));
  }
}

// eslint-disable-next-line react-refresh/only-export-components -- router module intentionally shares navigate/usePath alongside the Router component
export function usePath() {
  return useContext(PathContext);
}

export function Router({ children }) {
  const path = useSyncExternalStore(subscribe, getSnapshot);
  return <PathContext.Provider value={path}>{children}</PathContext.Provider>;
}

function matchPath(pattern, path) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i];
    if (part.startsWith(':')) {
      params[part.slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (part !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

export function Route() {
  return null;
}

export function Routes({ children }) {
  const path = usePath();
  const routes = Children.toArray(children);
  let fallback = null;

  for (const route of routes) {
    const { path: pattern, element } = route.props;
    if (pattern === '*') {
      fallback = element;
      continue;
    }
    const params = matchPath(pattern, path);
    if (params) return cloneElement(element, { params });
  }

  return fallback;
}
