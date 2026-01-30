import type React from 'react';
import { Link, useLocation } from '@tanstack/react-router';

interface IconSidebarItem {
  icon: string;
  path: string;
  label: string;
}

const iconItems: IconSidebarItem[] = [
  { icon: '🛍', path: '/dashboard', label: 'Ecommerce' },
  { icon: '🔔', path: '/notifications', label: 'Notifications' },
  { icon: '📋', path: '/project', label: 'Project' },
  { icon: '📊', path: '/analytic', label: 'Analytics' },
  { icon: '⚙', path: '/settings', label: 'Settings' },
  { icon: '🖥', path: '/presentation', label: 'Presentation' },
  { icon: '👥', path: '/users', label: 'Users' },
  { icon: '📦', path: '/products', label: 'Products' },
  { icon: '🛒', path: '/orders', label: 'Orders' },
  { icon: '👤', path: '/account', label: 'Account' },
  { icon: '❓', path: '/help', label: 'Help' },
  { icon: '📅', path: '/calendar', label: 'Calendar' },
  { icon: '📁', path: '/files', label: 'Files' },
  { icon: '✉', path: '/mail', label: 'Mail' },
  { icon: '💬', path: '/chat', label: 'Chat' }
];

const IconSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-20 bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col items-center py-4 gap-4">
      <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg mb-2">
        E
      </div>

      {/* Icon Navigation */}
      <nav className="flex-1 flex flex-col gap-3 w-full px-2">
        {iconItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600 shadow-md scale-110'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={item.label}
          >
            <span className="text-xl">{item.icon}</span>
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-3 w-full px-2 pt-4 border-t border-gray-200">
        <button
          type="button"
          className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
          title="More"
        >
          <span className="text-xl">⋮</span>
        </button>
      </div>
    </aside>
  );
};

export default IconSidebar;
