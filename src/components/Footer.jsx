import * as LucideIcons from 'lucide-react';
import socialLinksJson from '../data/SocialLinks.json';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">

        {/* Social Icons */}
        <div className="flex gap-4">
          {socialLinksJson.map(({ name, url, icon }, i) => {
            const Icon = LucideIcons[icon];
            return (
              Icon && (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  title={name}
                >
                  <Icon size={20} strokeWidth={1.6} />
                </a>
              )
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()}{' '}
          <span className="font-medium text-black dark:text-white">Neel Desai</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
