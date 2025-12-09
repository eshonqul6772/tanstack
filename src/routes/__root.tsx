// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';

// Loading komponenti
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// Error komponenti
const ErrorComponent = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-red-500 text-xl">Xatolik yuz berdi</div>
  </div>
);

// Head komponenti (SEO uchun)
const Head = () => (
  <>
    <title>My App</title>
    <meta name="description" content="My application description" />
  </>
);

export const rootRoute = createRootRoute({
  head: Head,
  component: RootComponent,
  pendingComponent: Loading,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-2xl font-bold text-gray-900">My App</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li><a href="/" className="text-gray-700 hover:text-gray-900">Home</a></li>
                  <li><a href="/about" className="text-gray-700 hover:text-gray-900">About</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-500">© 2024 My App. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Suspense>
  );
}