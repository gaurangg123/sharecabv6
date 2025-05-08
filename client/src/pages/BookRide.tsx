import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookRide() {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    passengers: "1"
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Predefined popular Indian cities
  const popularCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"
  ];

  // Mock ride data - would come from API in real implementation
  const availableRides = [
    {
      id: 1,
      driver: {
        name: "Amit S.",
        rating: 4.8,
        trips: 283,
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      origin: "Mumbai",
      destination: "Pune",
      departureDate: "2023-06-15",
      departureTime: "08:00",
      vehicle: "Maruti Swift",
      price: 600,
      availableSeats: 3,
      amenities: ["AC", "Music", "Water"]
    },
    {
      id: 2,
      driver: {
        name: "Priya M.",
        rating: 4.9,
        trips: 176,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      origin: "Delhi",
      destination: "Chandigarh",
      departureDate: "2023-06-15",
      departureTime: "09:30",
      vehicle: "Hyundai i20",
      price: 750,
      availableSeats: 2,
      amenities: ["AC", "WiFi", "USB Charging"]
    },
    {
      id: 3,
      driver: {
        name: "Rajesh K.",
        rating: 4.7,
        trips: 142,
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      origin: "Bangalore",
      destination: "Mysore",
      departureDate: "2023-06-15",
      departureTime: "10:00",
      vehicle: "Toyota Innova",
      price: 900,
      availableSeats: 5,
      amenities: ["AC", "WiFi", "Water", "Snacks"]
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter rides based on search criteria
    const results = availableRides.filter(ride => 
      ride.origin.toLowerCase().includes(formData.origin.toLowerCase()) &&
      ride.destination.toLowerCase().includes(formData.destination.toLowerCase())
    );
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleSelectCity = (city: string, type: 'origin' | 'destination') => {
    setFormData({ ...formData, [type]: city });
  };

  const handleBookRide = (rideId: number) => {
    // This would handle the booking process in a real implementation
    alert(`Booking ride ${rideId}. In a real app, this would navigate to a payment screen.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12 bg-gradient-to-br from-indigo-50 via-background to-indigo-50 dark:from-indigo-950 dark:via-background dark:to-indigo-950">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Book Your Ride</h1>
            
            {/* Search Form */}
            <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-xl p-6 mb-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="origin" className="block text-sm font-medium mb-2">From</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="ri-map-pin-line text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                        placeholder="City or Town" 
                        required 
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {popularCities.slice(0, 5).map(city => (
                        <button
                          key={`from-${city}`}
                          type="button"
                          onClick={() => handleSelectCity(city, 'origin')}
                          className="text-xs bg-muted hover:bg-primary hover:text-white transition px-2 py-1 rounded-full"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium mb-2">To</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="ri-map-pin-line text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                        placeholder="City or Town" 
                        required 
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {popularCities.slice(5, 10).map(city => (
                        <button
                          key={`to-${city}`}
                          type="button"
                          onClick={() => handleSelectCity(city, 'destination')}
                          className="text-xs bg-muted hover:bg-primary hover:text-white transition px-2 py-1 rounded-full"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="ri-calendar-line text-gray-400"></i>
                      </div>
                      <input 
                        type="date" 
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="ri-time-line text-gray-400"></i>
                      </div>
                      <input 
                        type="time" 
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="passengers" className="block text-sm font-medium mb-2">Passengers</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="ri-user-line text-gray-400"></i>
                      </div>
                      <select
                        id="passengers"
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background"
                        required
                      >
                        <option value="1">1 passenger</option>
                        <option value="2">2 passengers</option>
                        <option value="3">3 passengers</option>
                        <option value="4">4 passengers</option>
                        <option value="5">5 passengers</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <button 
                      type="submit" 
                      className="w-full md:w-auto px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                    >
                      <i className="ri-search-line mr-2"></i> Find Rides
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Search Results */}
            {hasSearched && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Available Rides</h2>
                
                {searchResults.length === 0 ? (
                  <div className="bg-card shadow-md rounded-lg p-6 text-center">
                    <div className="mb-4 text-5xl text-gray-400">
                      <i className="ri-roadster-line"></i>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No rides found</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any rides matching your search criteria. Try adjusting your search or check back later!
                    </p>
                    <button 
                      onClick={() => {
                        setFormData({
                          origin: "",
                          destination: "",
                          date: "",
                          time: "",
                          passengers: "1"
                        });
                        setHasSearched(false);
                      }}
                      className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map(ride => (
                      <div key={ride.id} className="bg-card shadow-md rounded-lg p-4 transition-all hover:shadow-lg">
                        <div className="flex flex-col md:flex-row">
                          {/* Driver info */}
                          <div className="md:w-1/4 flex flex-row md:flex-col items-center md:border-r md:border-gray-200 md:pr-4 mb-4 md:mb-0">
                            <div className="h-14 w-14 rounded-full overflow-hidden mr-4 md:mr-0 md:mb-2">
                              <img 
                                src={ride.driver.avatar} 
                                alt={`${ride.driver.name} profile`} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="md:text-center">
                              <p className="font-medium">{ride.driver.name}</p>
                              <div className="flex items-center justify-center text-amber-400">
                                <i className="ri-star-fill mr-1"></i>
                                <span className="text-foreground">{ride.driver.rating}</span>
                                <span className="text-muted-foreground text-sm ml-1">({ride.driver.trips} trips)</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Ride details */}
                          <div className="md:w-2/4 md:px-4">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <i className="ri-map-pin-line"></i>
                              </div>
                              <div className="ml-2">
                                <p className="font-medium">{ride.origin}</p>
                                <p className="text-sm text-muted-foreground">{ride.departureTime}</p>
                              </div>
                            </div>
                            
                            <div className="w-0.5 h-6 bg-gray-200 ml-4"></div>
                            
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <i className="ri-map-pin-fill"></i>
                              </div>
                              <div className="ml-2">
                                <p className="font-medium">{ride.destination}</p>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="inline-flex items-center text-xs bg-muted px-2 py-1 rounded-full">
                                <i className="ri-car-line mr-1"></i> {ride.vehicle}
                              </span>
                              {ride.amenities.map((amenity, index) => (
                                <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Price and booking */}
                          <div className="md:w-1/4 flex flex-row md:flex-col justify-between items-center md:border-l md:border-gray-200 md:pl-4 mt-4 md:mt-0">
                            <div className="text-center">
                              <p className="text-2xl font-semibold text-primary">₹{ride.price}</p>
                              <p className="text-sm text-muted-foreground">{ride.availableSeats} seats left</p>
                            </div>
                            
                            <button 
                              onClick={() => handleBookRide(ride.id)}
                              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}