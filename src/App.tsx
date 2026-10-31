import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { OdooServicesPage } from './pages/OdooServicesPage';
import { PythonServicesPage } from './pages/PythonServicesPage';
import { OdooEditionsAndHostingPage } from './pages/OdooEditionsAndHostingPage';
import { OdooFaqsPage } from './pages/OdooFaqsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/odoo-services':
        return <OdooServicesPage />;
      case '/python-development':
        return <PythonServicesPage />;
      case '/odoo-editions-and-hosting':
        return <OdooEditionsAndHostingPage />;
      case '/odoo-faqs':
        return <OdooFaqsPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="grow">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
