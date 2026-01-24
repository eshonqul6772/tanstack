import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/hooks';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMainHeader?: boolean;
  hideContent?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({ sidebarOpen, setSidebarOpen, isMainHeader = false, hideContent = false }) => {
  const { profile, methods } = useAuth();
  const { t } = useTranslation();

  if (isMainHeader) {
    return (
      <div className="h-16 flex items-center px-6 flex-1">
        <h1 className="text-2xl font-bold text-gray-900">Admin Cabinet</h1>

        <div className="flex-1 flex justify-end items-center gap-6">
          <input
            type="text"
            placeholder={t('search') || 'Search...'}
            className="w-64 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900 text-xl transition">🌐</button>
            <button className="text-gray-600 hover:text-gray-900 text-xl transition">🔔</button>
            <button className="text-gray-600 hover:text-gray-900 text-xl transition">⚙</button>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {profile?.firstName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{profile?.fullName || 'User'}</p>
              <button
                onClick={() => methods.logout()}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors"
              >
                {t('logout') || 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hideContent) {
    return (
      <div className="h-16 flex items-center px-4 shrink-0">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex flex-col gap-1.5 w-8 h-8 justify-center items-center hover:bg-gray-100 rounded transition-colors"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`} />
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-4">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="flex flex-col gap-1.5 w-8 h-8 justify-center items-center hover:bg-gray-100 rounded transition-colors"
        aria-label="Toggle sidebar"
        title="Toggle sidebar"
      >
        <span
          className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`} />
        <span
          className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </button>
    </header>
  );
};

export default Header;
