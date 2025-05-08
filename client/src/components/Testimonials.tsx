export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "ShareCab saved me so much money on my daily commute to work. I've met great people and now carpool regularly with a group I met through the app.",
      author: "Sarah J.",
      role: "Daily Commuter",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id:
2,
      text: "As a college student, ShareCab has been a lifesaver for weekend trips home. It's safer than hitchhiking and cheaper than taking the bus or train.",
      author: "Michael T.",
      role: "College Student",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 3,
      text: "I drive from Boston to New York twice a month. ShareCab helps me find passengers to split gas costs, and I've made the trip much more enjoyable with company.",
      author: "Jessica R.",
      role: "Regular Driver",
      rating: 4.7,
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thousands of travelers use ShareCab every day. Here's what they have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-light rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-amber-400 flex">
                  {Array(Math.floor(testimonial.rating)).fill(null).map((_, i) => (
                    <i key={i} className="ri-star-fill"></i>
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <i className="ri-star-half-fill"></i>
                  )}
                </div>
                <span className="ml-2 text-gray-600">{testimonial.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600 mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.author} profile picture`} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
