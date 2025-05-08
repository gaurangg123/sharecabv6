import { useState, useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${scrolled ? 'shadow' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <i className="ri-taxi-line text-3xl text-primary"></i>
            <span className="text-xl font-bold text-dark">ShareCab</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="font-medium text-dark hover:text-primary transition">Home</a>
            <a href="#how-it-works" className="font-medium text-dark hover:text-primary transition">How it works</a>
            <a href="#destinations" className="font-medium text-dark hover:text-primary transition">Destinations</a>
            <a href="#about" className="font-medium text-dark hover:text-primary transition">About</a>
            <a href="#" className="px-5 py-2 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition shadow-sm">Book Now</a>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-dark focus:outline-none" onClick={toggleMenu}>
            {isOpen ? (
              <i className="ri-close-line text-2xl"></i>
            ) : (
              <i className="ri-menu-line text-2xl"></i>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-white shadow-lg rounded-b-lg absolute top-full left-0 right-0 z-50 transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <a href="#home" className="font-medium text-dark hover:text-primary transition py-2 border-b border-gray-100" onClick={closeMenu}>Home</a>
          <a href="#how-it-works" className="font-medium text-dark hover:text-primary transition py-2 border-b border-gray-100" onClick={closeMenu}>How it works</a>
          <a href="#destinations" className="font-medium text-dark hover:text-primary transition py-2 border-b border-gray-100" onClick={closeMenu}>Destinations</a>
          <a href="#about" className="font-medium text-dark hover:text-primary transition py-2 border-b border-gray-100" onClick={closeMenu}>About</a>
          <a href="#" className="px-5 py-2 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition shadow-sm text-center" onClick={closeMenu}>Book Now</a>
        </div>
      </div>
    </header>
  );
}
