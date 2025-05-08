import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginWithOtp, setLoginWithOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setError("");
    
    // Simulate API call for login
    setTimeout(() => {
      setLoggingIn(false);
      // For demo purposes, we'll consider login successful if email is non-empty
      if (formData.email && formData.password) {
        // Redirect to home page or dashboard
        window.location.href = "/";
      } else {
        setError("Invalid email or password");
      }
    }, 1500);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setError("");
    
    // Validate phone number (simple validation for Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid 10-digit Indian mobile number");
      setLoggingIn(false);
      return;
    }
    
    // Simulate API call for OTP
    setTimeout(() => {
      setLoggingIn(false);
      setOtpSent(true);
      // Success message would appear here
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setError("");
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoggingIn(false);
      // For demo, we'll accept any 4-6 digit OTP
      if (otp.length >= 4 && otp.length <= 6) {
        // Redirect to home page or dashboard
        window.location.href = "/";
      } else {
        setError("Invalid OTP");
      }
    }, 1500);
  };

  const toggleLoginMethod = () => {
    setLoginWithOtp(!loginWithOtp);
    setError("");
    setOtpSent(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-muted-foreground">Login to continue with ShareCab</p>
              </div>
              
              <div className="bg-card p-8 rounded-xl shadow-lg">
                {/* Toggle between Login methods */}
                <div className="flex mb-6 border-b">
                  <button
                    className={`px-4 py-2 font-medium ${
                      !loginWithOtp
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => loginWithOtp && toggleLoginMethod()}
                  >
                    Email & Password
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${
                      loginWithOtp
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => !loginWithOtp && toggleLoginMethod()}
                  >
                    Login with OTP
                  </button>
                </div>
                
                {/* Error message */}
                {error && (
                  <div className="mb-4 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                    <i className="ri-error-warning-line mr-1"></i> {error}
                  </div>
                )}
                
                {!loginWithOtp ? (
                  // Email & Password Login Form
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 bg-background border rounded-lg"
                          placeholder="example@email.com"
                          required
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <label htmlFor="password" className="block text-sm font-medium">Password</label>
                          <a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a>
                        </div>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full p-3 bg-background border rounded-lg"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600">
                          Remember me
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                        disabled={loggingIn}
                      >
                        {loggingIn ? (
                          <>
                            <i className="ri-loader-4-line animate-spin mr-2"></i> Logging in...
                          </>
                        ) : (
                          "Log In"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  // OTP Login Form
                  <>
                    {!otpSent ? (
                      // Phone number form
                      <form onSubmit={handleSendOtp}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
                            <div className="flex">
                              <div className="bg-muted flex items-center px-3 rounded-l-lg border border-r-0">
                                <span className="text-muted-foreground">+91</span>
                              </div>
                              <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                className="flex-1 p-3 bg-background border rounded-r-lg"
                                placeholder="9876543210"
                                maxLength={10}
                                required
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              We'll send you a one-time password to this number
                            </p>
                          </div>
                          <button
                            type="submit"
                            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                            disabled={loggingIn}
                          >
                            {loggingIn ? (
                              <>
                                <i className="ri-loader-4-line animate-spin mr-2"></i> Sending OTP...
                              </>
                            ) : (
                              "Send OTP"
                            )}
                          </button>
                        </div>
                      </form>
                    ) : (
                      // OTP verification form
                      <form onSubmit={handleVerifyOtp}>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <label htmlFor="otp" className="block text-sm font-medium">Enter OTP</label>
                              <button 
                                type="button" 
                                className="text-sm text-primary hover:underline"
                                onClick={() => setOtpSent(false)}
                              >
                                Change Number
                              </button>
                            </div>
                            <input
                              type="text"
                              id="otp"
                              value={otp}
                              onChange={handleOtpChange}
                              className="w-full p-3 bg-background border rounded-lg text-center tracking-widest font-medium"
                              placeholder="••••••"
                              maxLength={6}
                              required
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>OTP sent to +91 {phoneNumber}</span>
                              <button type="button" className="text-primary hover:underline">Resend OTP</button>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                            disabled={loggingIn}
                          >
                            {loggingIn ? (
                              <>
                                <i className="ri-loader-4-line animate-spin mr-2"></i> Verifying...
                              </>
                            ) : (
                              "Verify & Login"
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                )}
                
                {/* Social login options */}
                <div className="mt-6">
                  <div className="relative flex items-center justify-center">
                    <div className="border-t w-full"></div>
                    <div className="bg-card px-4 text-sm text-muted-foreground z-10">or continue with</div>
                    <div className="border-t w-full"></div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <button className="p-3 border rounded-lg flex items-center justify-center hover:bg-muted/50 transition">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-2" />
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                </div>
                
                {/* Sign up link */}
                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link href="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}