import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Booking = {
  id: string;
  status: "upcoming" | "active" | "completed" | "cancelled";
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  seats: number;
  driver: {
    name: string;
    rating: number;
    vehicle: string;
    vehicleType: string;
    photo: string;
    phone?: string;
  };
  rideType: "solo" | "carpool";
  estimatedDistance?: number;
  estimatedArrival?: string;
  currentLocation?: {
    area: string;
    coordinates: [number, number];
    lastUpdated: string;
  };
  stops?: Array<{
    name: string;
    time: string;
    status: "completed" | "current" | "upcoming";
  }>;
  distanceCovered?: number;
  totalDistance?: number;
};

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "active" | "completed" | "cancelled">("active");
  const [expandedRide, setExpandedRide] = useState<string | null>(null);
  const [isTrackingActive, setIsTrackingActive] = useState(false);
  
  // Mock bookings data - would come from API in real implementation
  const bookings: Booking[] = [
    {
      id: "SC-123456",
      status: "active",
      origin: "Indiranagar",
      destination: "Electronic City",
      date: "Today",
      time: "09:30 AM",
      price: 280,
      seats: 1,
      rideType: "solo",
      driver: {
        name: "Amit S.",
        rating: 4.8,
        vehicle: "Maruti Swift Dzire",
        vehicleType: "sedan",
        photo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        phone: "+91 98765 43210"
      },
      estimatedDistance: 15,
      estimatedArrival: "10:15 AM",
      currentLocation: {
        area: "Koramangala",
        coordinates: [12.9352, 77.6245],
        lastUpdated: "2 mins ago"
      },
      stops: [
        { name: "Indiranagar", time: "09:30 AM", status: "completed" },
        { name: "Koramangala", time: "09:45 AM", status: "current" },
        { name: "HSR Layout", time: "10:00 AM", status: "upcoming" },
        { name: "Electronic City", time: "10:15 AM", status: "upcoming" }
      ],
      distanceCovered: 5,
      totalDistance: 15
    },
    {
      id: "SC-123457",
      status: "upcoming",
      origin: "MG Road",
      destination: "Whitefield",
      date: "Tomorrow",
      time: "10:00 AM",
      price: 200,
      seats: 2,
      rideType: "carpool",
      driver: {
        name: "Rajesh K.",
        rating: 4.7,
        vehicle: "Toyota Innova",
        vehicleType: "suv",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    },
    {
      id: "SC-123458",
      status: "completed",
      origin: "HSR Layout",
      destination: "MG Road",
      date: "Yesterday",
      time: "08:00 AM",
      price: 180,
      seats: 1,
      rideType: "solo",
      driver: {
        name: "Priya M.",
        rating: 4.9,
        vehicle: "Hyundai i20",
        vehicleType: "sedan",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    },
    {
      id: "SC-123459",
      status: "completed",
      origin: "Jayanagar",
      destination: "Airport",
      date: "20 May 2023",
      time: "11:00 AM",
      price: 450,
      seats: 2,
      rideType: "solo",
      driver: {
        name: "Karthik R.",
        rating: 4.6,
        vehicle: "Honda City",
        vehicleType: "sedan",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    },
    {
      id: "SC-123460",
      status: "cancelled",
      origin: "Koramangala",
      destination: "Marathahalli",
      date: "1 Jun 2023",
      time: "02:00 PM",
      price: 150,
      seats: 1,
      rideType: "carpool",
      driver: {
        name: "Ravi T.",
        rating: 4.5,
        vehicle: "Tata Nexon",
        vehicleType: "suv",
        photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    }
  ];

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    return booking.status === activeTab;
  });

  // Find active ride for tracking (first active ride)
  const activeRide = bookings.find(booking => booking.status === "active");

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "active":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "completed":
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
      case "cancelled":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  // Get vehicle icon based on vehicle type
  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case "2-wheeler":
        return "ri-motorbike-fill";
      case "auto":
        return "ri-taxi-wifi-fill";
      case "sedan":
        return "ri-taxi-line";
      case "suv":
        return "ri-car-line";
      default:
        return "ri-car-line";
    }
  };

  // Get progress percentage for active ride
  const getProgressPercentage = (ride: Booking): number => {
    if (!ride.distanceCovered || !ride.totalDistance) return 0;
    return Math.round((ride.distanceCovered / ride.totalDistance) * 100);
  };

  // Toggle ride tracking view
  const toggleTracking = () => {
    setIsTrackingActive(!isTrackingActive);
  };

  // Handle SOS emergency call
  const handleEmergency = () => {
    alert("Emergency alert sent. Our support team will contact you shortly.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">My Rides</h1>
            
            {/* Active Ride Tracking */}
            {activeRide && (
              <div className="mb-8">
                <div className="bg-card shadow-lg rounded-xl overflow-hidden">
                  <div className="p-4 md:p-6 border-b flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                          Active
                        </span>
                        <h2 className="text-xl font-bold">Current Ride</h2>
                      </div>
                      <p className="text-muted-foreground mt-1">
                        {activeRide.origin} to {activeRide.destination}
                      </p>
                    </div>
                    <button
                      onClick={toggleTracking}
                      className="px-4 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition text-sm flex items-center"
                    >
                      {isTrackingActive ? (
                        <>
                          <i className="ri-eye-off-line mr-1"></i> Hide Tracking
                        </>
                      ) : (
                        <>
                          <i className="ri-road-map-line mr-1"></i> Track Ride
                        </>
                      )}
                    </button>
                  </div>

                  {isTrackingActive && activeRide.currentLocation && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">
                      {/* Map View */}
                      <div className="lg:col-span-2 bg-muted/50 rounded-xl overflow-hidden h-[300px] relative">
                        {/* Mock map display */}
                        <img 
                          src="https://maps.googleapis.com/maps/api/staticmap?center=Bangalore,India&zoom=14&size=600x300&maptype=roadmap&key=YOUR_API_KEY_HERE" 
                          alt="Map showing ride progress"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Driver location marker */}
                        <div className="absolute top-3 left-3 bg-card p-2 rounded-lg shadow-sm text-sm">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                              <img 
                                src={activeRide.driver.photo} 
                                alt={activeRide.driver.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{activeRide.driver.name}</p>
                              <p className="text-xs text-muted-foreground">{activeRide.currentLocation.area}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Route progress info */}
                        <div className="absolute bottom-3 left-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress: {getProgressPercentage(activeRide)}%</span>
                            <span>{activeRide.distanceCovered} of {activeRide.totalDistance} km</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${getProgressPercentage(activeRide)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>{activeRide.origin}</span>
                            <span>{activeRide.destination}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Ride Details */}
                      <div className="space-y-6">
                        {/* ETA */}
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Estimated Time of Arrival</h3>
                          <p className="text-2xl font-bold">{activeRide.estimatedArrival}</p>
                        </div>
                        
                        {/* Journey Timeline */}
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Route Stops</h3>
                          <div className="space-y-3">
                            {activeRide.stops?.map((stop, index) => (
                              <div key={index} className="flex">
                                <div className="relative flex flex-col items-center mr-3">
                                  <div className={`w-3 h-3 rounded-full ${
                                    stop.status === 'completed' ? 'bg-green-500' : 
                                    stop.status === 'current' ? 'bg-primary animate-pulse' : 'bg-gray-300 dark:bg-gray-600'
                                  }`}></div>
                                  {index < (activeRide.stops?.length || 0) - 1 && (
                                    <div className={`h-full w-0.5 my-1 ${
                                      stop.status === 'completed' ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                                    }`}></div>
                                  )}
                                </div>
                                <div className={`text-sm pb-3 ${
                                  stop.status === 'current' ? 'font-medium' : ''
                                }`}>
                                  <p>{stop.name}</p>
                                  <p className="text-xs text-muted-foreground">{stop.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Driver Contact */}
                        <div className="flex space-x-2">
                          <a 
                            href={`tel:${activeRide.driver.phone}`}
                            className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center text-sm"
                          >
                            <i className="ri-phone-line mr-1"></i> Call Driver
                          </a>
                          <button 
                            onClick={handleEmergency}
                            className="flex-1 px-3 py-2 bg-destructive/90 text-white rounded-lg hover:bg-destructive transition flex items-center justify-center text-sm"
                          >
                            <i className="ri-alarm-warning-line mr-1"></i> SOS
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ride Quick Info */}
                  {!isTrackingActive && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                          <i className={getVehicleIcon(activeRide.driver.vehicleType)}></i>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Vehicle</p>
                          <p className="font-medium">{activeRide.driver.vehicle}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                          <i className="ri-time-line"></i>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ETA</p>
                          <p className="font-medium">{activeRide.estimatedArrival}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                          <i className="ri-money-rupee-circle-line"></i>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fare</p>
                          <p className="font-medium">₹{activeRide.price}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Tabs */}
            <div className="flex mb-6 border-b overflow-x-auto no-scrollbar">
              <button
                className={`px-4 py-2 font-medium whitespace-nowrap ${
                  activeTab === "active"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button
                className={`px-4 py-2 font-medium whitespace-nowrap ${
                  activeTab === "upcoming"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`px-4 py-2 font-medium whitespace-nowrap ${
                  activeTab === "completed"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
              <button
                className={`px-4 py-2 font-medium whitespace-nowrap ${
                  activeTab === "cancelled"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("cancelled")}
              >
                Cancelled
              </button>
            </div>
            
            {/* Bookings list */}
            {filteredBookings.length === 0 ? (
              <div className="bg-card shadow-md rounded-lg p-8 text-center">
                <div className="mb-4 text-5xl text-muted-foreground">
                  <i className="ri-taxi-line"></i>
                </div>
                <h3 className="text-xl font-medium mb-2">No {activeTab} rides found</h3>
                <p className="text-muted-foreground mb-6">
                  {activeTab === "active"
                    ? "You don't have any active rides at the moment."
                    : activeTab === "upcoming"
                    ? "You don't have any upcoming rides scheduled. Book a ride now!"
                    : activeTab === "completed"
                    ? "You haven't completed any rides yet."
                    : "You don't have any cancelled rides."}
                </p>
                {(activeTab === "upcoming" || activeTab === "active") && (
                  <Link href="/book-ride" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition">
                    <i className="ri-taxi-line mr-2"></i> Book a Ride
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-card shadow-md rounded-lg p-4 transition-all hover:shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Left side - Ride info */}
                      <div className="md:w-3/5 flex flex-col md:border-r md:border-gray-200 md:pr-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status}
                            </span>
                            <span className="ml-2 px-2 py-0.5 bg-muted/70 rounded-full text-xs">
                              {booking.rideType === "solo" ? "Solo Ride" : "Carpool"}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {booking.id}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <i className="ri-map-pin-line"></i>
                          </div>
                          <div className="ml-2">
                            <p className="font-medium">{booking.origin}</p>
                          </div>
                        </div>
                        
                        <div className="w-0.5 h-6 bg-gray-200 ml-4"></div>
                        
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <i className="ri-map-pin-fill"></i>
                          </div>
                          <div className="ml-2">
                            <p className="font-medium">{booking.destination}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p>{booking.date}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Time</p>
                            <p>{booking.time}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p>₹{booking.price}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Seats</p>
                            <p>{booking.seats} {booking.seats === 1 ? 'seat' : 'seats'}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right side - Driver info & actions */}
                      <div className="md:w-2/5 md:pl-4 mt-4 md:mt-0">
                        <div className="flex items-center mb-4">
                          <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                            <img 
                              src={booking.driver.photo} 
                              alt={booking.driver.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{booking.driver.name}</p>
                            <div className="flex items-center text-amber-400">
                              <i className="ri-star-fill text-sm"></i>
                              <span className="text-foreground text-sm ml-1">{booking.driver.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 rounded-full bg-muted/70 flex items-center justify-center mr-2">
                            <i className={`${getVehicleIcon(booking.driver.vehicleType)}`}></i>
                          </div>
                          <div>
                            <p>{booking.driver.vehicle}</p>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-2">
                          {booking.status === "upcoming" && (
                            <>
                              <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center text-sm">
                                <i className="ri-calendar-event-line mr-1"></i> Reschedule
                              </button>
                              <button className="flex-1 px-3 py-2 bg-destructive text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center text-sm">
                                <i className="ri-close-circle-line mr-1"></i> Cancel
                              </button>
                            </>
                          )}
                          
                          {booking.status === "active" && (
                            <button 
                              onClick={toggleTracking}
                              className="w-full px-3 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center text-sm"
                            >
                              <i className="ri-road-map-line mr-1"></i> Track Ride
                            </button>
                          )}
                          
                          {booking.status === "completed" && (
                            <>
                              <button className="flex-1 px-3 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary transition flex items-center justify-center text-sm">
                                <i className="ri-star-line mr-1"></i> Rate Ride
                              </button>
                              <button className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition flex items-center justify-center text-sm">
                                <i className="ri-file-list-3-line mr-1"></i> Receipt
                              </button>
                            </>
                          )}
                          
                          {booking.status === "cancelled" && (
                            <Link href="/book-ride" className="w-full px-3 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center text-sm">
                              <i className="ri-refresh-line mr-1"></i> Rebook Similar
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}