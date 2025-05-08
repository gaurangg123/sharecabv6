import { useState } from "react";

export default function Features() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // In a real implementation, this would trigger a video player
    alert("Video playback would start here in a real implementation");
  };

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">How ShareCab Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make ride-sharing simple, affordable, and safe for everyone involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-light rounded-2xl p-8 text-center transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="h-16 w-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-map-pin-line text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">Enter Destination</h3>
            <p className="text-gray-600">
              Choose your pickup and drop-off locations. Our platform instantly matches you with drivers heading your way.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-light rounded-2xl p-8 text-center transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="h-16 w-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-group-line text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">Match & Connect</h3>
            <p className="text-gray-600">
              Browse available rides and drivers. View profiles, ratings, and prices before booking your shared ride.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-light rounded-2xl p-8 text-center transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="h-16 w-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-car-line text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">Enjoy Your Ride</h3>
            <p className="text-gray-600">
              Meet at the pickup location, split the fare automatically, and enjoy a comfortable journey to your destination.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-20 bg-light rounded-3xl overflow-hidden shadow-xl relative">
          <div className="aspect-w-16 aspect-h-9 relative">
            {/* Video thumbnail with play button overlay */}
            <img 
              src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=720" 
              alt="People sharing a ride in car interior" 
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="h-20 w-20 bg-primary rounded-full flex items-center justify-center shadow-lg transform transition hover:scale-105"
                onClick={handlePlayVideo}
              >
                <i className="ri-play-fill text-white text-3xl"></i>
              </button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold">See ShareCab in Action</h3>
              <p className="text-lg opacity-90">Watch how our platform connects people going the same way</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
