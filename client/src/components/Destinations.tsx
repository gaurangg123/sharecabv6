import { useRef } from "react";

export default function Destinations() {
  const destinations = [
    {
      id: 1,
      name: "New York City",
      price: "$25-45",
      rides: "350+ daily rides",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      id: 2,
      name: "Boston",
      price: "$15-30",
      rides: "215+ daily rides",
      image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      id: 3,
      name: "Chicago",
      price: "$20-35",
      rides: "180+ daily rides",
      image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      id: 4,
      name: "San Francisco",
      price: "$30-50",
      rides: "250+ daily rides",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      id: 5,
      name: "Los Angeles",
      price: "$25-45",
      rides: "320+ daily rides",
      image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    }
  ];

  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <section id="destinations" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Popular Destinations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most frequented routes with reliable rides available every day.
          </p>
        </div>

        {/* Destination Cards Slider */}
        <div className="relative">
          <div className="overflow-x-auto no-scrollbar pb-4">
            <div className="flex space-x-4 w-max" ref={sliderRef}>
              {destinations.map((destination) => (
                <div 
                  key={destination.id}
                  className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
                >
                  <img 
                    src={destination.image} 
                    alt={`${destination.name} cityscape`} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{destination.name}</h3>
                      <span className="text-primary font-medium">{destination.price}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <i className="ri-road-map-line mr-1"></i>
                      <span>{destination.rides}</span>
                    </div>
                    <a href="#" className="text-primary font-medium hover:underline flex items-center">
                      Find rides <i className="ri-arrow-right-line ml-1"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            <button className="h-2 w-8 bg-primary rounded-full" aria-label="Slide 1"></button>
            <button className="h-2 w-2 bg-gray-300 rounded-full" aria-label="Slide 2"></button>
            <button className="h-2 w-2 bg-gray-300 rounded-full" aria-label="Slide 3"></button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a href="#" className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-opacity-90 transition shadow-sm">
            View All Destinations
          </a>
        </div>
      </div>
    </section>
  );
}
