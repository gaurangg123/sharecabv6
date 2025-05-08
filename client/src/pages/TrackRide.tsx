import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TrackRide() {
  const [trackingId, setTrackingId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock ride data - would come from API in real implementation
  const mockRideData = {
    id: "SC-123456",
    status: "in-progress",
    origin: "Bangalore",
    destination: "Mysore",
    departureTime: "09:30 AM",
    estimatedArrival: "11:45 AM",
    currentLocation: "Ramanagara",
    distanceCovered: 45,
    totalDistance: 143,
    driver: {
      name: "Rajesh Kumar",
      phone: "+91-9876543210",
      rating: 4.7,
      vehicle: "Toyota Innova - KA 01 AB 1234",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    stops: [
      { name: "Bangalore", time: "09:30 AM", status: "completed" },
      { name: "Ramanagara", time: "10:15 AM", status: "current" },
      { name: "Channapatna", time: "10:45 AM", status: "upcoming" },
      { name: "Mandya", time: "11:15 AM", status: "upcoming" },
      { name: "Mysore", time: "11:45 AM", status: "upcoming" }
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call with timeout
    setTimeout(() => {
      if (trackingId.toUpperCase() === mockRideData.id) {
        setTrackingInfo(mockRideData);
        setError("");
      } else {
        setTrackingInfo(null);
        setError("No ride found with this tracking ID. Please check and try again.");
      }
      setLoading(false);
    }, 1500);
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (!trackingInfo) return 0;
    return Math.round((trackingInfo.distanceCovered / trackingInfo.totalDistance) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12 bg-gradient-to-br from-indigo-50 via-background to-indigo-50 dark:from-indigo-950 dark:via-background dark:to-indigo-950">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Track Your Ride</h1>
            
            {/* Tracking Form */}
            <div className="max-w-md mx-auto bg-card shadow-lg rounded-xl p-6 mb-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="trackingId" className="block text-sm font-medium mb-2">Enter Tracking ID</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="ri-search-line text-gray-400"></i>
                    </div>
                    <input 
                      type="text" 
                      id="trackingId"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-background" 
                      placeholder="e.g. SC-123456" 
                      required 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hint: Use SC-123456 for demo
                  </p>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i> Tracking...
                    </>
                  ) : (
                    <>
                      <i className="ri-road-map-line mr-2"></i> Track Now
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-8">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-2xl mr-2"></i>
                  <p>{error}</p>
                </div>
              </div>
            )}
            
            {/* Tracking Result */}
            {trackingInfo && (
              <div className="max-w-3xl mx-auto bg-card shadow-lg rounded-xl overflow-hidden mb-8">
                {/* Header with status badge */}
                <div className="bg-muted p-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-muted-foreground">Tracking ID</span>
                    <h2 className="text-xl font-semibold">{trackingInfo.id}</h2>
                  </div>
                  <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {trackingInfo.status.replace('-', ' ')}
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="p-4 border-b">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Journey Progress</span>
                    <span>{getProgressPercentage()}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>{trackingInfo.origin}</span>
                    <span>{trackingInfo.destination}</span>
                  </div>
                </div>
                
                {/* Trip details */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-4">Trip Details</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <i className="ri-map-pin-line w-5 text-primary"></i>
                        <div className="ml-2">
                          <p className="text-sm text-muted-foreground">From</p>
                          <p>{trackingInfo.origin}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <i className="ri-map-pin-fill w-5 text-primary"></i>
                        <div className="ml-2">
                          <p className="text-sm text-muted-foreground">To</p>
                          <p>{trackingInfo.destination}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <i className="ri-time-line w-5 text-primary"></i>
                        <div className="ml-2">
                          <p className="text-sm text-muted-foreground">Departure Time</p>
                          <p>{trackingInfo.departureTime}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <i className="ri-time-fill w-5 text-primary"></i>
                        <div className="ml-2">
                          <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                          <p>{trackingInfo.estimatedArrival}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <i className="ri-navigation-line w-5 text-primary"></i>
                        <div className="ml-2">
                          <p className="text-sm text-muted-foreground">Current Location</p>
                          <p>{trackingInfo.currentLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Driver details */}
                  <div>
                    <h3 className="font-medium mb-4">Driver Details</h3>
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                        <img 
                          src={trackingInfo.driver.photo} 
                          alt={trackingInfo.driver.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{trackingInfo.driver.name}</p>
                        <div className="flex items-center text-amber-400">
                          <i className="ri-star-fill text-sm"></i>
                          <span className="text-foreground text-sm ml-1">{trackingInfo.driver.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex">
                        <i className="ri-phone-line w-5 text-primary"></i>
                        <div className="ml-2">
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p>{trackingInfo.driver.phone}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <i className="ri-car-line w-5 text-primary"></i>
                        <div className="ml-2">
                          <p className="text-sm text-muted-foreground">Vehicle</p>
                          <p>{trackingInfo.driver.vehicle}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center">
                        <i className="ri-phone-line mr-1"></i> Call
                      </button>
                      <button className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition flex items-center justify-center">
                        <i className="ri-message-2-line mr-1"></i> Message
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Journey Timeline */}
                <div className="p-4 border-t">
                  <h3 className="font-medium mb-4">Journey Timeline</h3>
                  <div className="space-y-4">
                    {trackingInfo.stops.map((stop: any, index: number) => (
                      <div key={index} className="flex">
                        <div className="relative flex flex-col items-center mr-4">
                          <div className={`w-4 h-4 rounded-full ${
                            stop.status === 'completed' ? 'bg-green-500' : 
                            stop.status === 'current' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                          }`}></div>
                          {index < trackingInfo.stops.length - 1 && (
                            <div className={`h-full w-0.5 ${
                              stop.status === 'completed' ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                            }`}></div>
                          )}
                        </div>
                        <div className={`pb-4 ${
                          stop.status === 'current' ? 'font-medium' : ''
                        }`}>
                          <p className="flex items-center">
                            {stop.name}
                            {stop.status === 'current' && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-white">
                                Current
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">{stop.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick help section */}
            {!trackingInfo && !loading && (
              <div className="max-w-2xl mx-auto bg-card shadow rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <i className="ri-question-line"></i>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Where can I find my tracking ID?</p>
                      <p className="text-sm text-muted-foreground">Your tracking ID was sent to your email and phone after booking. It also appears in your booking confirmation.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <i className="ri-error-warning-line"></i>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">My ride doesn't appear on tracking</p>
                      <p className="text-sm text-muted-foreground">If your ride is scheduled more than 24 hours from now, it may not be trackable yet. Active and upcoming rides within 24 hours can be tracked.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <i className="ri-customer-service-2-line"></i>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Contact customer support</p>
                      <p className="text-sm text-muted-foreground">Need immediate assistance? Call our 24/7 helpline at <span className="font-medium">1800-123-4567</span> or email <span className="font-medium">support@sharecab.in</span></p>
                    </div>
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