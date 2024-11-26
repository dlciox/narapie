import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';


const Footer = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF className="w-5 h-5" />,
      url: 'https://facebook.com/yourpage',
      label: 'Facebook'
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      url: 'https://instagram.com/yourpage',
      label: 'Instagram'
    },
    {
      icon: <FaTiktok className="w-5 h-5" />,
      url: 'https://tiktok.com/@yourpage',
      label: 'TikTok'
    }
  ];

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 mt-auto w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Reklama
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  Praca
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Polityka prywatności
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Kontakt</h3>
            <div className="space-y-2">
              <p>Email: kontakt@narapie.pl</p>
              <p>Telefon: 123 456 789</p>
              <p>Adres: ul. Warszawska 123, 00-000 Warszawa</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} NaRapie. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 