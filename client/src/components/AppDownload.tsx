export default function AppDownload() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content */}
          <div className="md:w-1/2 z-10 mb-12 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get the ShareCab App</h2>
            <p className="text-lg opacity-90 mb-8 max-w-lg">
              Download our mobile app for a smoother experience. Find rides, chat with drivers, and manage your trips on the go.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="flex items-center bg-black rounded-xl px-5 py-3 hover:bg-opacity-80 transition">
                <i className="ri-apple-fill text-2xl mr-3"></i>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-medium">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center bg-black rounded-xl px-5 py-3 hover:bg-opacity-80 transition">
                <i className="ri-google-play-fill text-2xl mr-3"></i>
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-medium">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* App Screenshot */}
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800" 
              alt="ShareCab mobile app on smartphone" 
              className="rounded-3xl shadow-2xl border-8 border-white max-w-xs mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-1/3 -translate-x-1/3"></div>
    </section>
  );
}
