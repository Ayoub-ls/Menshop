import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'All Collections', path: '/shop' },
        { name: 'Shirts', path: '/shop?category=Shirts' },
        { name: 'Trousers', path: '/shop?category=Pants' },
        { name: 'Outerwear', path: '/shop?category=Jackets' },
      ],
    },
    {
      title: 'Assistance',
      links: [
        { name: 'Shipping', path: '#' },
        { name: 'Returns', path: '#' },
        { name: 'Sizing Guide', path: '#' },
        { name: 'Contact Us', path: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-slate-900">
              Demo Boutique
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Redefining the modern menswear experience through architectural precision and digital curation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-500 hover:text-slate-900 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900">
              Journal
            </h4>
            <p className="text-slate-500 text-sm">
              Join our atelier list for exclusive releases and editorial content.
            </p>
            <div className="flex bg-slate-50 rounded-2xl p-1 focus-within:ring-2 focus-within:ring-slate-900 transition-all">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-none focus:ring-0 w-full text-sm py-3 px-4"
              />
              <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-xs">
            © {currentYear} Demo Boutique. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-slate-400 hover:text-slate-900 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
