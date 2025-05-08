import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type VehicleType = "2-wheeler" | "auto" | "sedan" | "suv";

export default function BookRide() {
  const [location] = useLocation();
  const [rideType, setRideType] = useState<"solo" | "carpool">("carpool");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>("sedan");
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: "1",
    femaleOnly: false
  });

  const [fare, setFare] = useState({
    base: 0,
    distance: 0,
    totalSolo: 0,
    totalPool: 0,
    estimatedDistance: 0,
    estimatedTime: ""
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Predefined popular Indian areas in a city (assuming Bangalore)
  const popularAreas = [
    "Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "MG Road", 
    "Electronic City", "Marathahalli", "Jayanagar", "JP Nagar", "BTM Layout"
  ];

  // Vehicle types with price multipliers
  const vehicleTypes = [
    { id: "2-wheeler", name: "2-Wheeler", icon: "ri-motorbike-fill", multiplier: 0.8, description: "Bike Taxi" },
    { id: "auto", name: "Auto Rickshaw", icon: "ri-taxi-wifi-fill", multiplier: 1.0, description: "Auto Rickshaw" },
    { id: "sedan", name: "Sedan", icon: "ri-taxi-line", multiplier: 1.2, description: "Car (4 Seater)" },
    { id: "suv", name: "SUV", icon: "ri-car-line", multiplier: 1.5, description: "SUV (6 Seater)" }
  ];

  // Mock ride data for carpooling - would come from API in real implementation
  const availablePoolRides = [
    {
      id: 1,
      driver: {
        name: "Amit S.",
        rating: 4.8,
        trips: 283,
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      origin: "Indiranagar",
      destination: "Electronic City",
      departureDate: "2023-06-15",
      departureTime: "08:00",
      vehicle: "Maruti Swift",
      type: "sedan",
      price: 225,
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
      origin: "Koramangala",
      destination: "Whitefield",
      departureDate: "2023-06-15",
      departureTime: "09:30",
      vehicle: "Hyundai i20",
      type: "sedan",
      price: 200,
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
      origin: "MG Road",
      destination: "HSR Layout",
      departureDate: "2023-06-15",
      departureTime: "10:00",
      vehicle: "Toyota Innova",
      type: "suv",
      price: 180,
      availableSeats: 5,
      amenities: ["AC", "WiFi", "Water", "Snacks"]
    }
  ];

  // Mock data for currently available drivers
  const availableDrivers = [
    {
      id: 101,
      name: "Suresh V.",
      rating: 4.7,
      vehicle: "Honda Activa",
      type: "2-wheeler",
      eta: "3 mins",
      photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      id: 102,
      name: "Ravi K.",
      rating: 4.6,
      vehicle: "Bajaj Auto",
      type: "auto",
      eta: "5 mins",
      photo: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      id: 103,
      name: "Deepika R.",
      rating: 4.9,
      vehicle: "Maruti Swift Dzire",
      type: "sedan",
      eta: "4 mins",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      id: 104,
      name: "Krishna M.",
      rating: 4.8,
      vehicle: "Toyota Innova",
      type: "suv",
      eta: "7 mins",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
  ];

  // Parse URL parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get('type');
    if (type === 'solo' || type === 'carpool') {
      setRideType(type);
    }
    
    // Initialize Google Maps (mock implementation)
    initializeMap();
  }, []);
  
  // Mock function to initialize Google Maps
  const initializeMap = () => {
    // In a real app, this would initialize Google Maps
    console.log("Initializing Google Maps...");
    setTimeout(() => {
      setMapLoaded(true);
      // Calculate initial fare estimate
      calculateFare();
    }, 1000);
  };

  const calculateFare = () => {
    // This would use Google Maps Distance Matrix API in a real implementation
    // For now, we'll use mock data
    const distanceKm = Math.floor(Math.random() * 10) + 5; // 5-15 km
    const timeMinutes = distanceKm * 3; // Approx 3 min per km
    const basePrice = 50; // Base fare in ₹
    const perKmRate = 12; // ₹ per km
    
    const distancePrice = distanceKm * perKmRate;
    const totalSolo = Math.round(basePrice + distancePrice);
    const totalPool = Math.round(totalSolo * 0.65); // 35% cheaper
    
    setFare({
      base: basePrice,
      distance: distancePrice,
      totalSolo: totalSolo,
      totalPool: totalPool,
      estimatedDistance: distanceKm,
      estimatedTime: `${timeMinutes} min`
    });
  };

  // Calculate price based on selected vehicle type
  const getVehiclePrice = (basePrice: number, type: VehicleType): number => {
    const vehicle = vehicleTypes.find(v => v.id === type);
    return Math.round(basePrice * (vehicle?.multiplier || 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : false;
    
    setFormData(prev => {
      const updated = { 
        ...prev, 
        [name]: isCheckbox ? checked : value 
      };
      // In a real app, we would recalculate the fare when pickup/dropoff changes
      if (name === 'pickup' || name === 'dropoff') {
        setTimeout(calculateFare, 500);
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rideType === 'carpool') {
      // Filter rides based on search criteria
      const results = availablePoolRides.filter(ride => 
        ride.origin.toLowerCase().includes(formData.pickup.toLowerCase()) ||
        ride.destination.toLowerCase().includes(formData.dropoff.toLowerCase())
      );
      setSearchResults(results);
      setHasSearched(true);
    } else {
      // For solo rides, we would book directly, but for demo, show the driver options
      setHasSearched(true);
      setSearchResults([]);
    }
  };

  const handleSelectArea = (area: string, type: 'pickup' | 'dropoff') => {
    setFormData({ ...formData, [type]: area });
    // In a real app, recalculate fare when locations change
    setTimeout(calculateFare, 500);
  };

  const handleVehicleSelect = (type: VehicleType) => {
    setSelectedVehicle(type);
  };

  const handleRideTypeChange = (type: "solo" | "carpool") => {
    setRideType(type);
    setHasSearched(false);
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
            
            {/* Ride Type Toggle */}
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-card flex p-1 rounded-lg shadow-sm w-full sm:w-fit mx-auto">
                <button
                  className={`px-4 py-2 rounded-md flex-1 sm:flex-initial transition ${
                    rideType === "solo"
                      ? "bg-primary text-white shadow-sm"
                      : "hover:bg-muted/70"
                  }`}
                  onClick={() => handleRideTypeChange("solo")}
                >
                  <i className="ri-taxi-line mr-2"></i>
                  Solo Ride
                </button>
                <button
                  className={`px-4 py-2 rounded-md flex-1 sm:flex-initial transition ${
                    rideType === "carpool"
                      ? "bg-primary text-white shadow-sm"
                      : "hover:bg-muted/70"
                  }`}
                  onClick={() => handleRideTypeChange("carpool")}
                >
                  <i className="ri-group-line mr-2"></i>
                  Car Pool
                </button>
              </div>
            </div>
            
            {/* Map and Search Form */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Map View (Left) */}
              <div className="lg:col-span-2 bg-card rounded-xl shadow-lg overflow-hidden h-[400px] md:h-[500px] flex items-center justify-center relative">
                {!mapLoaded ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-primary mb-2"></div>
                    <p>Loading map...</p>
                  </div>
                ) : (
                  <>
                    {/* Mock map display */}
                    <img 
                      src="https://maps.googleapis.com/maps/api/staticmap?center=Bangalore,India&zoom=13&size=600x500&maptype=roadmap&key=YOUR_API_KEY_HERE" 
                      alt="Map of Bangalore"
                      className="w-full h-full object-cover"
                    />
                    {/* Map overlay with route info */}
                    {formData.pickup && formData.dropoff && (
                      <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-muted-foreground">Estimated Distance</div>
                            <div className="font-medium">{fare.estimatedDistance} km</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Estimated Time</div>
                            <div className="font-medium">{fare.estimatedTime}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Estimated Fare</div>
                            <div className="font-medium text-primary">
                              ₹{rideType === 'solo' 
                                ? getVehiclePrice(fare.totalSolo, selectedVehicle) 
                                : fare.totalPool}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Search Form (Right) */}
              <div className="bg-card shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {rideType === 'solo' ? 'Book Solo Ride' : 'Find Shared Rides'}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="pickup" className="block text-sm font-medium mb-2">Pickup Location</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <i className="ri-map-pin-line text-gray-400"></i>
                        </div>
                        <input 
                          type="text" 
                          id="pickup"
                          name="pickup"
                          value={formData.pickup}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                          placeholder="Enter pickup location" 
                          required 
                        />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {popularAreas.slice(0, 3).map(area => (
                          <button
                            key={`from-${area}`}
                            type="button"
                            onClick={() => handleSelectArea(area, 'pickup')}
                            className="text-xs bg-muted hover:bg-primary hover:text-white transition px-2 py-1 rounded-full"
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="dropoff" className="block text-sm font-medium mb-2">Drop Location</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <i className="ri-map-pin-line text-gray-400"></i>
                        </div>
                        <input 
                          type="text" 
                          id="dropoff"
                          name="dropoff"
                          value={formData.dropoff}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                          placeholder="Enter drop location" 
                          required 
                        />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {popularAreas.slice(3, 6).map(area => (
                          <button
                            key={`to-${area}`}
                            type="button"
                            onClick={() => handleSelectArea(area, 'dropoff')}
                            className="text-xs bg-muted hover:bg-primary hover:text-white transition px-2 py-1 rounded-full"
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                    
                    {rideType === 'carpool' && (
                      <>
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
                            </select>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 bg-card/50 p-3 rounded-lg border border-muted">
                          <div className="flex items-center h-5">
                            <input
                              id="femaleOnly"
                              name="femaleOnly"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label htmlFor="femaleOnly" className="font-medium">Female passengers only</label>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              For safety, you'll need to verify your profile gender information
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {rideType === 'solo' && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                        <div className="grid grid-cols-2 gap-2">
                          {vehicleTypes.map(vehicle => (
                            <button
                              key={vehicle.id}
                              type="button"
                              onClick={() => handleVehicleSelect(vehicle.id as VehicleType)}
                              className={`p-3 border rounded-lg transition flex flex-col items-center justify-center ${
                                selectedVehicle === vehicle.id 
                                  ? 'border-primary bg-primary/5' 
                                  : 'hover:bg-muted/70'
                              }`}
                            >
                              <i className={`${vehicle.icon} text-2xl ${selectedVehicle === vehicle.id ? 'text-primary' : ''}`}></i>
                              <span className="text-sm font-medium mt-1">{vehicle.name}</span>
                              <span className="text-xs text-muted-foreground">{vehicle.description}</span>
                              {fare.totalSolo > 0 && (
                                <span className={`text-sm mt-1 ${selectedVehicle === vehicle.id ? 'text-primary font-medium' : ''}`}>
                                  ₹{getVehiclePrice(fare.totalSolo, vehicle.id as VehicleType)}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <button 
                      type="submit" 
                      className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                    >
                      {rideType === 'solo' ? (
                        <>
                          <i className="ri-taxi-line mr-2"></i> Book Solo Ride
                        </>
                      ) : (
                        <>
                          <i className="ri-search-line mr-2"></i> Find Shared Rides
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Search Results - For Carpooling */}
            {rideType === 'carpool' && hasSearched && (
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Available Shared Rides</h2>
                
                {searchResults.length === 0 ? (
                  <div className="bg-card shadow-md rounded-lg p-6 text-center">
                    <div className="mb-4 text-5xl text-gray-400">
                      <i className="ri-user-shared-line"></i>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No shared rides found</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any shared rides matching your criteria. Try adjusting your search or book a solo ride instead.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        onClick={() => {
                          setFormData({
                            pickup: "",
                            dropoff: "",
                            date: "",
                            time: "",
                            passengers: "1",
                            femaleOnly: false
                          });
                          setHasSearched(false);
                        }}
                        className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition"
                      >
                        Clear Search
                      </button>
                      <button 
                        onClick={() => setRideType("solo")}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
                      >
                        Switch to Solo Ride
                      </button>
                    </div>
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
                              {ride.amenities.map((amenity: string, index: number) => (
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
            
            {/* Solo Ride Driver Options */}
            {rideType === 'solo' && hasSearched && (
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Available Drivers Near You</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {availableDrivers
                    .filter(driver => driver.type === selectedVehicle)
                    .map(driver => (
                      <div key={driver.id} className="bg-card shadow-md rounded-lg p-4 transition-all hover:shadow-lg">
                        <div className="flex items-center mb-3">
                          <div className="h-14 w-14 rounded-full overflow-hidden mr-3">
                            <img 
                              src={driver.photo} 
                              alt={`${driver.name} photo`} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <div className="flex items-center text-amber-400">
                              <i className="ri-star-fill text-sm"></i>
                              <span className="text-foreground text-sm ml-1">{driver.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <i className="ri-taxi-line w-5 text-primary"></i>
                              <span className="text-sm">{driver.vehicle}</span>
                            </div>
                            <span className="text-xs bg-muted px-2 py-1 rounded-full">
                              {driver.eta}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <i className="ri-wallet-3-line w-5 text-primary"></i>
                              <span className="text-sm">Fare</span>
                            </div>
                            <span className="font-medium text-primary">
                              ₹{getVehiclePrice(fare.totalSolo, driver.type as VehicleType)}
                            </span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleBookRide(driver.id)}
                          className="w-full py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center"
                        >
                          Book Now
                        </button>
                      </div>
                    ))}
                </div>
                
                {availableDrivers.filter(driver => driver.type === selectedVehicle).length === 0 && (
                  <div className="bg-card shadow-md rounded-lg p-6 text-center">
                    <div className="mb-4 text-5xl text-gray-400">
                      <i className={vehicleTypes.find(v => v.id === selectedVehicle)?.icon || "ri-taxi-line"}></i>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No drivers available</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any {vehicleTypes.find(v => v.id === selectedVehicle)?.name} drivers near your location. Try another vehicle type.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {vehicleTypes
                        .filter(v => v.id !== selectedVehicle)
                        .map(vehicle => (
                          <button
                            key={vehicle.id}
                            onClick={() => handleVehicleSelect(vehicle.id as VehicleType)}
                            className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition flex items-center"
                          >
                            <i className={`${vehicle.icon} mr-2`}></i> 
                            Try {vehicle.name}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Ride Benefits */}
            {!hasSearched && (
              <div className="max-w-5xl mx-auto mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card rounded-lg p-5 shadow-sm">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <i className="ri-shield-check-line text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Safety First</h3>
                    <p className="text-muted-foreground">
                      All our drivers are verified and trained. Real-time ride tracking and emergency assistance available 24/7.
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-5 shadow-sm">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <i className="ri-wallet-3-line text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Affordable Prices</h3>
                    <p className="text-muted-foreground">
                      Competitive rates and carpooling options to save up to 35% on your daily commute. Multiple payment options available.
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-5 shadow-sm">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <i className="ri-earth-line text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Eco-Friendly</h3>
                    <p className="text-muted-foreground">
                      Carpooling reduces congestion and emissions. Join us in making Indian cities greener and more sustainable.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}