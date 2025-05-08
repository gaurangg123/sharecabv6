import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the email to a backend service
    console.log("Newsletter signup:", email);
    setIsSubmitted(true);
    setEmail("");
    
    // Reset submission state after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for travel tips, new routes, and exclusive promotions.
          </p>
          
          {isSubmitted ? (
            <div className="text-primary font-medium py-3 animate-fadeIn">
              Thanks for subscribing! We'll be in touch soon.
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
              <input 
                type="email" 
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary" 
                placeholder="Your email address" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm"
              >
                Subscribe
              </button>
            </form>
          )}
          
          <p className="text-gray-500 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
