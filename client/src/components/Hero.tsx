import { useState } from "react";
import { Link } from "wouter";

export default function Hero() {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: ""
  });

  // Popular Indian cities for quick selection
  const popularCities = [
    { name: "Mumbai", isPopular: true },
    { name: "Delhi", isPopular: true },
    { name: "Bangalore", isPopular: true },
    { name: "Hyderabad", isPopular: true },
    { name: "Chennai", isPopular: true },
    { name: "Kolkata", isPopular: false },
    { name: "Pune", isPopular: false },
    { name: "Ahmedabad", isPopular: false },
    { name: "Jaipur", isPopular: false },
    { name: "Lucknow", isPopular: false }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityClick = (cityName: string, fieldName: "departure" | "destination") => {
    setFormData({ ...formData, [fieldName]: cityName });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Navigate to book-ride page in a real implementation
    window.location.href = "/book-ride";
  };

  return (
    <section id="home" className="bg-gradient-to-br from-indigo-50 via-background to-indigo-50 dark:from-indigo-950 dark:via-background dark:to-indigo-950 pt-16 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              India's Favorite <span className="text-primary">Ride-Sharing</span> Platform
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Connect with travelers across India, split costs, reduce your carbon footprint, and make new connections on your journeys.
            </p>

            {/* Search Form */}
            <div className="bg-card p-6 rounded-2xl shadow-lg max-w-md mx-auto md:mx-0">
              <h3 className="text-xl font-semibold mb-4">Find a ride</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="ri-map-pin-line text-muted-foreground"></i>
                      </div>
                      <input 
                        type="text" 
                        name="departure"
                        value={formData.departure}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                        placeholder="From" 
                        required 
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularCities.filter(city => city.isPopular).map((city, index) => (
                        <button 
                          key={`from-${index}`}
                          type="button"
                          className="text-xs bg-muted hover:bg-primary hover:text-white px-2 py-1 rounded-full transition"
                          onClick={() => handleCityClick(city.name, "departure")}
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="ri-map-pin-line text-muted-foreground"></i>
                      </div>
                      <input 
                        type="text" 
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                        placeholder="To" 
                        required 
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularCities.filter(city => city.isPopular).map((city, index) => (
                        <button
                          key={`to-${index}`}
                          type="button"
                          className="text-xs bg-muted hover:bg-primary hover:text-white px-2 py-1 rounded-full transition"
                          onClick={() => handleCityClick(city.name, "destination")}
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="ri-calendar-line text-muted-foreground"></i>
                    </div>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                  >
                    <i className="ri-search-line mr-2"></i> Find Rides
                  </button>
                  
                  <div className="flex items-center justify-center text-sm text-muted-foreground mt-2">
                    <i className="ri-shield-check-line mr-1"></i> Safe, secure and verified drivers
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Indian travelers sharing a ride" 
              className="w-full h-auto rounded-2xl shadow-xl"
            />

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-card p-4 rounded-xl shadow-lg flex space-x-6 w-4/5 justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">500K+</p>
                <p className="text-muted-foreground">Monthly Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">15K+</p>
                <p className="text-muted-foreground">Daily Rides</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-muted-foreground">Indian Cities</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular routes banner */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-4">Popular routes across India</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/book-ride" className="bg-card hover:bg-muted px-4 py-2 rounded-full text-sm flex items-center transition shadow-sm">
              <span>Delhi - Chandigarh</span>
              <span className="ml-2 bg-muted rounded-full text-xs px-2">₹800</span>
            </Link>
            <Link href="/book-ride" className="bg-card hover:bg-muted px-4 py-2 rounded-full text-sm flex items-center transition shadow-sm">
              <span>Mumbai - Pune</span>
              <span className="ml-2 bg-muted rounded-full text-xs px-2">₹600</span>
            </Link>
            <Link href="/book-ride" className="bg-card hover:bg-muted px-4 py-2 rounded-full text-sm flex items-center transition shadow-sm">
              <span>Bangalore - Mysore</span>
              <span className="ml-2 bg-muted rounded-full text-xs px-2">₹450</span>
            </Link>
            <Link href="/book-ride" className="bg-card hover:bg-muted px-4 py-2 rounded-full text-sm flex items-center transition shadow-sm">
              <span>Chennai - Pondicherry</span>
              <span className="ml-2 bg-muted rounded-full text-xs px-2">₹500</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Auto Animation (with Indian car model) */}
      <div className="car-animation w-full absolute bottom-0 left-0">
        <div className="car flex items-center">
          <i className="ri-taxi-line text-4xl text-primary"></i>
          <div className="ml-1 bg-primary h-1 w-32 rounded-full opacity-10"></div>
        </div>
      </div>
    </section>
  );
}
