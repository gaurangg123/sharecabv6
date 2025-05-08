import { useState } from "react";

export default function Hero() {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
  };

  return (
    <section id="home" className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 pt-16 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4 leading-tight">
              Share Your Ride, <span className="text-primary">Save Money</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Connect with travelers going your way. Split costs, reduce emissions, and make new friends along the journey.
            </p>

            {/* Search Form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto md:mx-0">
              <h3 className="text-xl font-semibold mb-4">Find a ride</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="ri-map-pin-line text-gray-400"></i>
                    </div>
                    <input 
                      type="text" 
                      name="departure"
                      value={formData.departure}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" 
                      placeholder="From" 
                      required 
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="ri-map-pin-line text-gray-400"></i>
                    </div>
                    <input 
                      type="text" 
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" 
                      placeholder="To" 
                      required 
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="ri-calendar-line text-gray-400"></i>
                    </div>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" 
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                  >
                    <i className="ri-search-line mr-2"></i> Find Rides
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1532726635173-491a5d9d2973?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="People sharing a ride in a modern car" 
              className="w-full h-auto rounded-2xl shadow-xl"
            />

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg flex space-x-6 w-4/5 justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">250K+</p>
                <p className="text-gray-600">Monthly Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-gray-600">Daily Rides</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-gray-600">Cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Car Animation */}
      <div className="car-animation w-full absolute bottom-0 left-0">
        <div className="car flex items-center">
          <i className="ri-taxi-line text-4xl text-primary"></i>
          <div className="ml-1 bg-primary h-1 w-32 rounded-full opacity-10"></div>
        </div>
      </div>
    </section>
  );
}
