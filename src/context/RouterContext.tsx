import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type RoutePath =
  | '/'
  | '/odoo-services'
  | '/python-development'
  | '/odoo-editions-and-hosting'
  | '/odoo-faqs'
  | '/about'
  | '/contact';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string, hash?: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string, hash?: string) => {
    const targetUrl = hash ? `${path}${hash}` : path;
    if (window.location.pathname !== path || (hash && window.location.hash !== hash)) {
      window.history.pushState({}, '', targetUrl);
      setCurrentPath(path);
      
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Update dynamic document title and meta tag based on page
  useEffect(() => {
    const path = currentPath;
    let title = 'Karnexus Software – Odoo Consulting & Python Development';
    let desc = 'Karnexus Software provides Odoo implementation, migration, customization, custom modules, integrations, and Python backend development built around your business.';

    if (path === '/odoo-services') {
      title = 'Odoo ERP Services & Consulting – Karnexus Software';
      desc = 'Comprehensive Odoo services: Implementation, version migration, workflow customization, custom module development, third-party integrations, support, and Docker deployment.';
    } else if (path === '/python-development') {
      title = 'Python Backend & API Development – Karnexus Software';
      desc = 'Robust Python, FastAPI, and Django backend development, REST API integrations, asynchronous automation workers, and data synchronization workflows.';
    } else if (path === '/odoo-editions-and-hosting') {
      title = 'Odoo Editions & Hosting Guide: Community vs Enterprise – Karnexus Software';
      desc = 'Complete breakdown of Odoo Community vs Enterprise editions and hosting options (Odoo Online, Odoo.sh, Self-Hosted Docker VPS, On-Premise).';
    } else if (path === '/odoo-faqs') {
      title = 'Odoo ERP FAQs: Implementation, Customization & Upgrades – Karnexus Software';
      desc = 'Comprehensive Odoo questions and answers covering licensing, implementation timelines, custom module upgrade safety, hosting, and third-party APIs.';
    } else if (path === '/about') {
      title = 'About Karnexus Software – Independent Freelance Engineering';
      desc = 'Learn about Karnexus Software, an independent freelance software engineering practice specializing in Odoo and Python backend systems.';
    } else if (path === '/contact') {
      title = 'Contact & Project Enquiry – Karnexus Software';
      desc = 'Discuss your Odoo ERP implementation or Python backend project with Karnexus Software. Send an enquiry or get in touch directly.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, className, children, onClick, ...props }) => {
  const { navigate, currentPath } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Allow default behavior for external links, target="_blank", or modifier keys
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      props.target === '_blank' ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    e.preventDefault();

    // Check for hash
    const [pathPart, hashPart] = href.split('#');
    const targetPath = pathPart || currentPath;
    const targetHash = hashPart ? `#${hashPart}` : undefined;

    navigate(targetPath, targetHash);
  };

  const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};
