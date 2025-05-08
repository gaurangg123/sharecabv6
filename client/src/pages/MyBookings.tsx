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
    photo: string;
  };
};

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  
  // Mock bookings data - would come from API in real implementation
  const bookings: Booking[] = [
    {
      id: "SC-123456",
      status: "upcoming",
      origin: "Mumbai",
      destination: "Pune",
      date: "15 Jun 2023",
      time: "09:30 AM",
      price: 550,
      seats: 2,
      driver: {
        name: "Amit S.",
        rating: 4.8,
        vehicle: "Maruti Swift",
        photo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    },
    {
      id: "SC-123457",
      status: "active",
      origin: "Bangalore",
      destination: "Mysore",
      date: "10 Jun 2023",
      time: "10:00 AM",
      price: 900,
      seats: 1,
      driver: {
        name: "Rajesh K.",
        rating: 4.7,
        vehicle: "Toyota Innova",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    },
    {
      id: "SC-123458",
      status: "completed",
      origin: "Delhi",
      destination: "Chandigarh",
      date: "2 Jun 2023",
      time: "08:00 AM",
      price: 1200,
      seats: 1,
      driver: {
        name: "Priya M.",
        rating: 4.9,
        vehicle: "Hyundai i20",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    },
    {
      id: "SC-123459",
      status: "completed",
      origin: "Chennai",
      destination: "Pondicherry",
      date: "25 May 2023",
      time: "11:00 AM",
      price: 850,
      seats: 2,
      driver: {
        name: "Karthik R.",
        rating: 4.6,
        vehicle: "Honda City",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    },
    {
      id: "SC-123460",
      status: "cancelled",
      origin: "Hyderabad",
      destination: "Warangal",
      date: "1 Jun 2023",
      time: "02:00 PM",
      price: 700,
      seats: 1,
      driver: {
        name: "Ravi T.",
        rating: 4.5,
        vehicle: "Tata Nexon",
        photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    }
  ];

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    if (activeTab === "upcoming") return booking.status === "upcoming" || booking.status === "active";
    return booking.status === activeTab;
  });

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">My Bookings</h1>
            
            {/* Tabs */}
            <div className="flex mb-6 border-b">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "upcoming"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming & Active
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "completed"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
              <button
                className={`px-4 py-2 font-medium ${
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
                  <i className="ri-ticket-line"></i>
                </div>
                <h3 className="text-xl font-medium mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-6">
                  {activeTab === "upcoming"
                    ? "You don't have any upcoming rides. Book a ride now!"
                    : activeTab === "completed"
                    ? "You haven't completed any rides yet."
                    : "You don't have any cancelled bookings."}
                </p>
                {activeTab === "upcoming" && (
                  <Link href="/book-ride">
                    <a className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition">
                      <i className="ri-car-line mr-2"></i> Book a Ride
                    </a>
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
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Booking ID: {booking.id}
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
                        
                        <p className="text-muted-foreground text-sm mb-2">Vehicle</p>
                        <p className="mb-4">{booking.driver.vehicle}</p>
                        
                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-2">
                          {(booking.status === "upcoming" || booking.status === "active") && (
                            <>
                              <Link href={`/track-ride?id=${booking.id}`} className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center text-sm">
                                <i className="ri-road-map-line mr-1"></i> Track
                              </Link>
                              <button className="flex-1 px-3 py-2 bg-destructive text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center text-sm">
                                <i className="ri-close-circle-line mr-1"></i> Cancel
                              </button>
                            </>
                          )}
                          
                          {booking.status === "completed" && (
                            <button className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition flex items-center justify-center text-sm">
                              <i className="ri-star-line mr-1"></i> Rate Driver
                            </button>
                          )}
                          
                          <button className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition flex items-center justify-center text-sm">
                            <i className="ri-file-list-3-line mr-1"></i> Details
                          </button>
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