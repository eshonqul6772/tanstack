import type React from 'react';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="px-6">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>
            Copyright © 2026 <span className="font-semibold">Ecme</span> All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-gray-700 transition">
              Term & Conditions
            </a>
            <a href="/privacy" className="hover:text-gray-700 transition">
              Privacy & Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
