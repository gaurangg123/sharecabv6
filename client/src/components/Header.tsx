import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

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
    <header className={`fixed top-0 left-0 right-0 bg-background z-50 transition-all duration-300 ${scrolled ? 'shadow' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-taxi-line text-3xl text-primary"></i>
            <span className="text-xl font-bold">ShareCab</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`font-medium hover:text-primary transition ${location === '/' ? 'text-primary' : 'text-foreground'}`}>Home</Link>
            <Link href="/book-ride" className={`font-medium hover:text-primary transition ${location === '/book-ride' ? 'text-primary' : 'text-foreground'}`}>Book Ride</Link>
            <Link href="/my-bookings" className={`font-medium hover:text-primary transition ${location === '/my-bookings' ? 'text-primary' : 'text-foreground'}`}>My Rides</Link>
            <Link href="/plans" className={`font-medium hover:text-primary transition ${location === '/plans' ? 'text-primary' : 'text-foreground'}`}>Plans</Link>
            <Link href="/community" className={`font-medium hover:text-primary transition ${location === '/community' ? 'text-primary' : 'text-foreground'}`}>Community</Link>
            <div className="flex items-center space-x-2">
              <Link href="/login" className={`px-4 py-1.5 border border-primary rounded-full font-medium hover:bg-primary/10 transition ${location === '/login' ? 'text-primary' : 'text-foreground'}`}>Login</Link>
              <Link href="/signup" className={`px-4 py-1.5 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition shadow-sm`}>Sign Up</Link>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="text-foreground focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <i className="ri-close-line text-2xl"></i>
              ) : (
                <i className="ri-menu-line text-2xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background shadow-lg rounded-b-lg absolute top-full left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <Link href="/" className={`font-medium hover:text-primary transition py-2 border-b border-gray-100 ${location === '/' ? 'text-primary' : 'text-foreground'}`} onClick={closeMenu}>Home</Link>
            <Link href="/book-ride" className={`font-medium hover:text-primary transition py-2 border-b border-gray-100 ${location === '/book-ride' ? 'text-primary' : 'text-foreground'}`} onClick={closeMenu}>Book Ride</Link>
            <Link href="/my-bookings" className={`font-medium hover:text-primary transition py-2 border-b border-gray-100 ${location === '/my-bookings' ? 'text-primary' : 'text-foreground'}`} onClick={closeMenu}>My Rides</Link>
            <Link href="/plans" className={`font-medium hover:text-primary transition py-2 border-b border-gray-100 ${location === '/plans' ? 'text-primary' : 'text-foreground'}`} onClick={closeMenu}>Plans</Link>
            <Link href="/community" className={`font-medium hover:text-primary transition py-2 border-b border-gray-100 ${location === '/community' ? 'text-primary' : 'text-foreground'}`} onClick={closeMenu}>Community</Link>
            <div className="flex space-x-2 pt-2">
              <Link href="/login" className="flex-1 py-2 border border-primary text-primary rounded-lg font-medium text-center" onClick={closeMenu}>Login</Link>
              <Link href="/signup" className="flex-1 py-2 bg-primary text-white rounded-lg font-medium text-center" onClick={closeMenu}>Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
