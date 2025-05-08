import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const validateStep1 = () => {
    if (!formData.fullName) return "Full name is required";
    if (!formData.email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email address";
    if (!formData.phone) return "Phone number is required";
    
    // Validate Indian phone number (simple 10-digit validation)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) return "Please enter a valid 10-digit Indian mobile number";
    
    return "";
  };

  const validateStep2 = () => {
    if (!formData.password) return "Password is required";
    if (formData.password.length < 8) return "Password must be at least 8 characters long";
    if (!formData.confirmPassword) return "Please confirm your password";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    if (!formData.agreeTerms) return "You must agree to the Terms and Privacy Policy";
    return "";
  };

  const handleNextStep = () => {
    const error = validateStep1();
    if (error) {
      setError(error);
      return;
    }
    
    setError("");
    setStep(2);
  };

  const handlePreviousStep = () => {
    setError("");
    setStep(1);
  };

  const handleSendVerification = () => {
    setIsSubmitting(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setPhoneVerificationSent(true);
      // Success message would appear here
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setIsSubmitting(true);
    setError("");
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsSubmitting(false);
      // For demo, we'll accept any 4-6 digit OTP
      if (otp.length >= 4 && otp.length <= 6) {
        // Move to password step
        setStep(2);
        setPhoneVerificationSent(false);
      } else {
        setError("Invalid OTP");
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep2();
    if (error) {
      setError(error);
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to login or onboarding page
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
                <p className="text-muted-foreground">Join ShareCab and start carpooling today</p>
              </div>
              
              <div className="bg-card p-8 rounded-xl shadow-lg">
                {/* Step progress */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                      1
                    </div>
                    <div className={`h-1 w-8 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                      2
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Step {step} of 2
                  </div>
                </div>
                
                {/* Error message */}
                {error && (
                  <div className="mb-6 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                    <i className="ri-error-warning-line mr-1"></i> {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full p-3 bg-background border rounded-lg"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 bg-background border rounded-lg"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                        <div className="flex">
                          <div className="bg-muted flex items-center px-3 rounded-l-lg border border-r-0">
                            <span className="text-muted-foreground">+91</span>
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="flex-1 p-3 bg-background border rounded-r-lg"
                            placeholder="9876543210"
                            maxLength={10}
                            required
                          />
                        </div>
                      </div>
                      
                      {!phoneVerificationSent ? (
                        <button
                          type="button"
                          className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                          onClick={handleSendVerification}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="ri-loader-4-line animate-spin mr-2"></i> Sending OTP...
                            </>
                          ) : (
                            "Verify Phone Number"
                          )}
                        </button>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="otp" className="block text-sm font-medium mb-1">Enter OTP</label>
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
                              <span>OTP sent to +91 {formData.phone}</span>
                              <button type="button" className="text-primary hover:underline">Resend OTP</button>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                            onClick={handleVerifyOtp}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <i className="ri-loader-4-line animate-spin mr-2"></i> Verifying...
                              </>
                            ) : (
                              "Verify OTP & Continue"
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Step 2: Password and Terms */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
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
                        <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long</p>
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full p-3 bg-background border rounded-lg"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div className="flex items-start mb-4">
                        <div className="flex items-center h-5">
                          <input
                            id="agreeTerms"
                            name="agreeTerms"
                            type="checkbox"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="agreeTerms" className="text-muted-foreground">
                            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                          </label>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          className="flex-1 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition"
                          onClick={handlePreviousStep}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm flex items-center justify-center"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="ri-loader-4-line animate-spin mr-2"></i> Creating Account...
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
                
                {/* Social signup options */}
                <div className="mt-6">
                  <div className="relative flex items-center justify-center">
                    <div className="border-t w-full"></div>
                    <div className="bg-card px-4 text-sm text-muted-foreground z-10">or sign up with</div>
                    <div className="border-t w-full"></div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <button className="p-3 border rounded-lg flex items-center justify-center hover:bg-muted/50 transition">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-2" />
                      <span>Sign up with Google</span>
                    </button>
                  </div>
                </div>
                
                {/* Login link */}
                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link href="/login" className="text-primary font-medium hover:underline">Log in</Link>
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