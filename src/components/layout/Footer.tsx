
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-construction-navy text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">ConstructPro</h3>
            <p className="mb-4">
              Building trust and delivering quality for over 15 years in residential and commercial construction projects.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="hover:text-construction-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="hover:text-construction-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="hover:text-construction-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="hover:text-construction-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-construction-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-construction-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-construction-gold transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-construction-gold transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-construction-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#residential" className="hover:text-construction-gold transition-colors">Residential Construction</Link>
              </li>
              <li>
                <Link to="/services#commercial" className="hover:text-construction-gold transition-colors">Commercial Building</Link>
              </li>
              <li>
                <Link to="/services#renovations" className="hover:text-construction-gold transition-colors">Renovations & Remodeling</Link>
              </li>
              <li>
                <Link to="/services#concrete" className="hover:text-construction-gold transition-colors">Concrete Work & Masonry</Link>
              </li>
              <li>
                <Link to="/services#management" className="hover:text-construction-gold transition-colors">Project Management</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-construction-gold mt-1 shrink-0" />
                <span>123 Construction Ave, Building City, ST 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-construction-gold shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-construction-gold shrink-0" />
                <span>info@constructpro.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} ConstructPro. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
