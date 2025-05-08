import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ProfileTab = "account" | "preferences" | "payments" | "security" | "notifications";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("account");
  const [profileData, setProfileData] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    gender: "male",
    address: "123 Main Street, Indiranagar, Bangalore 560038",
    profilePhoto: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
  });
  
  // Notification preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailRideUpdates: true,
    emailPromotions: false,
    smsRideUpdates: true,
    smsPromotions: false,
    pushRideUpdates: true,
    pushPromotions: true,
  });
  
  // Payment methods
  const savedPaymentMethods = [
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 24,
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "upi",
      vpa: "rahul@upi",
      isDefault: false,
    }
  ];
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    femaleOnlyVerified: false,
  });
  
  const handleToggleNotification = (key: keyof typeof notificationPrefs) => {
    setNotificationPrefs({
      ...notificationPrefs,
      [key]: !notificationPrefs[key],
    });
  };
  
  const handleToggleTwoFactor = () => {
    setSecuritySettings({
      ...securitySettings,
      twoFactorEnabled: !securitySettings.twoFactorEnabled,
    });
  };
  
  const handleToggleFemaleOnlyVerification = () => {
    setSecuritySettings({
      ...securitySettings,
      femaleOnlyVerified: !securitySettings.femaleOnlyVerified,
    });
  };
  
  const handleSetDefaultPayment = (id: string) => {
    // Would implement the logic to update default payment method in a real app
    alert(`Setting payment method ${id} as default`);
  };
  
  const handleRemovePayment = (id: string) => {
    // Would implement the logic to remove payment method in a real app
    alert(`Removing payment method ${id}`);
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Would implement the profile update logic in a real app
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-8">My Profile</h1>
              
              <div className="bg-card shadow-lg rounded-xl overflow-hidden">
                <div className="md:flex">
                  {/* Tabs sidebar */}
                  <div className="md:w-64 bg-muted/50 dark:bg-muted/20 p-4 md:p-6">
                    <div className="flex items-center mb-6">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                        <img 
                          src={profileData.profilePhoto} 
                          alt="Profile" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{profileData.name}</p>
                        <p className="text-sm text-muted-foreground">Premium Member</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <button
                        onClick={() => setActiveTab("account")}
                        className={`w-full px-3 py-2 text-left rounded-lg transition ${
                          activeTab === "account"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/80"
                        }`}
                      >
                        <i className="ri-user-line mr-2"></i> Account
                      </button>
                      <button
                        onClick={() => setActiveTab("preferences")}
                        className={`w-full px-3 py-2 text-left rounded-lg transition ${
                          activeTab === "preferences"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/80"
                        }`}
                      >
                        <i className="ri-settings-3-line mr-2"></i> Preferences
                      </button>
                      <button
                        onClick={() => setActiveTab("payments")}
                        className={`w-full px-3 py-2 text-left rounded-lg transition ${
                          activeTab === "payments"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/80"
                        }`}
                      >
                        <i className="ri-bank-card-line mr-2"></i> Payments
                      </button>
                      <button
                        onClick={() => setActiveTab("security")}
                        className={`w-full px-3 py-2 text-left rounded-lg transition ${
                          activeTab === "security"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/80"
                        }`}
                      >
                        <i className="ri-shield-keyhole-line mr-2"></i> Security
                      </button>
                      <button
                        onClick={() => setActiveTab("notifications")}
                        className={`w-full px-3 py-2 text-left rounded-lg transition ${
                          activeTab === "notifications"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/80"
                        }`}
                      >
                        <i className="ri-notification-3-line mr-2"></i> Notifications
                      </button>
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="p-4 md:p-6 md:flex-1">
                    {/* Account tab */}
                    {activeTab === "account" && (
                      <div>
                        <h2 className="text-2xl font-bold mb-6">Account Information</h2>
                        <form onSubmit={handleUpdateProfile}>
                          <div className="mb-8">
                            <div className="flex flex-col sm:flex-row items-center">
                              <div className="h-24 w-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                                <img 
                                  src={profileData.profilePhoto} 
                                  alt="Profile" 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <button type="button" className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg mb-2 w-full sm:w-auto transition">
                                  <i className="ri-upload-2-line mr-2"></i> Change Photo
                                </button>
                                <p className="text-sm text-muted-foreground">
                                  JPG, GIF or PNG. Max size 2MB.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                              <input 
                                type="text" 
                                id="name" 
                                className="w-full p-3 border rounded-lg bg-background"
                                value={profileData.name}
                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                              <input 
                                type="email" 
                                id="email" 
                                className="w-full p-3 border rounded-lg bg-background"
                                value={profileData.email}
                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              />
                            </div>
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                              <input 
                                type="tel" 
                                id="phone" 
                                className="w-full p-3 border rounded-lg bg-background"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              />
                            </div>
                            <div>
                              <label htmlFor="gender" className="block text-sm font-medium mb-2">Gender</label>
                              <select
                                id="gender"
                                className="w-full p-3 border rounded-lg bg-background"
                                value={profileData.gender}
                                onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                              >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
                              <textarea 
                                id="address" 
                                className="w-full p-3 border rounded-lg bg-background"
                                rows={3}
                                value={profileData.address}
                                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                              ></textarea>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition">
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                    
                    {/* Preferences tab */}
                    {activeTab === "preferences" && (
                      <div>
                        <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                        
                        <div className="mb-8">
                          <h3 className="text-lg font-medium mb-4">Communication Language</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <div className="border rounded-lg p-3 bg-primary/5 border-primary">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">English</span>
                                <i className="ri-check-line text-primary"></i>
                              </div>
                            </div>
                            <div className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition">
                              <span>Hindi</span>
                            </div>
                            <div className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition">
                              <span>Tamil</span>
                            </div>
                            <div className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition">
                              <span>Telugu</span>
                            </div>
                            <div className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition">
                              <span>Kannada</span>
                            </div>
                            <div className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition">
                              <span>Malayalam</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-8">
                          <h3 className="text-lg font-medium mb-4">Display Currency</h3>
                          <div className="flex items-center space-x-3">
                            <div className="border rounded-lg p-3 bg-primary/5 border-primary">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">INR (₹)</span>
                                <i className="ri-check-line text-primary ml-2"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">App Preferences</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4">
                              <div>
                                <p className="font-medium">Default Search Radius</p>
                                <p className="text-sm text-muted-foreground">Set the default radius for finding rides</p>
                              </div>
                              <select className="p-2 border rounded-lg bg-background" defaultValue="15 km">
                                <option value="5 km">5 km</option>
                                <option value="10 km">10 km</option>
                                <option value="15 km">15 km</option>
                                <option value="25 km">25 km</option>
                                <option value="50 km">50 km</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4">
                              <div>
                                <p className="font-medium">Show Only Verified Drivers</p>
                                <p className="text-sm text-muted-foreground">Only display rides from verified drivers</p>
                              </div>
                              <button
                                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${true ? 'bg-primary' : 'bg-muted'}`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    true ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                ></span>
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Allow Sharing My Contact</p>
                                <p className="text-sm text-muted-foreground">Share your contact info with co-passengers</p>
                              </div>
                              <button
                                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${false ? 'bg-primary' : 'bg-muted'}`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    false ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                ></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Payments tab */}
                    {activeTab === "payments" && (
                      <div>
                        <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
                        
                        <div className="mb-8">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Saved Payment Methods</h3>
                            <button className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-opacity-90 transition text-sm">
                              <i className="ri-add-line mr-1"></i> Add New
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            {savedPaymentMethods.map((method) => (
                              <div key={method.id} className="border rounded-lg p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  {method.type === "card" ? (
                                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xl mr-3">
                                      <i className={`ri-${method.brand === "visa" ? "visa" : "mastercard"}-line`}></i>
                                    </div>
                                  ) : (
                                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xl mr-3">
                                      <i className="ri-bank-line"></i>
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium">
                                      {method.type === "card" && method.brand
                                        ? `${method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• ${method.last4}` 
                                        : method.type === "upi" ? `UPI - ${method.vpa}` : "Payment Method"}
                                    </p>
                                    {method.type === "card" && (
                                      <p className="text-sm text-muted-foreground">
                                        Expires {method.expiryMonth}/{method.expiryYear}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {method.isDefault ? (
                                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">Default</span>
                                  ) : (
                                    <button 
                                      onClick={() => handleSetDefaultPayment(method.id)}
                                      className="text-sm text-primary hover:underline"
                                    >
                                      Set Default
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => handleRemovePayment(method.id)}
                                    className="text-sm text-destructive hover:underline"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Wallet Balance</h3>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-muted-foreground">Available Credits</p>
                                <p className="text-3xl font-bold">₹450.00</p>
                              </div>
                              <button className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-opacity-90 transition text-sm">
                                Add Money
                              </button>
                            </div>
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm font-medium mb-2">Recent Transactions</p>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <p>Ride: Mumbai to Pune</p>
                                  <p className="text-destructive">-₹550.00</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <p>Cashback: Referral</p>
                                  <p className="text-green-600">+₹200.00</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <p>Wallet Topup</p>
                                  <p className="text-green-600">+₹1000.00</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Security tab */}
                    {activeTab === "security" && (
                      <div>
                        <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                        
                        <div className="space-y-6">
                          <div className="border-b pb-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-lg font-medium">Password</h3>
                              <button className="text-primary hover:underline">
                                Change
                              </button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Last changed 3 months ago
                            </p>
                          </div>
                          
                          <div className="border-b pb-4">
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                                <p className="text-sm text-muted-foreground">
                                  Add an extra layer of security to your account
                                </p>
                              </div>
                              <button
                                onClick={handleToggleTwoFactor}
                                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${securitySettings.twoFactorEnabled ? 'bg-primary' : 'bg-muted'}`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                ></span>
                              </button>
                            </div>
                            {securitySettings.twoFactorEnabled && (
                              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                                Two-factor authentication is enabled. You'll receive a verification code on your phone when signing in from a new device.
                              </div>
                            )}
                          </div>
                          
                          <div className="border-b pb-4">
                            <h3 className="text-lg font-medium mb-2">Login Sessions</h3>
                            <div className="space-y-4">
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="flex justify-between">
                                  <div>
                                    <p className="font-medium">Current Session</p>
                                    <p className="text-sm text-muted-foreground">Chrome on Windows • Bangalore, India</p>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                                    <span className="text-xs">Active Now</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="flex justify-between">
                                  <div>
                                    <p className="font-medium">iPhone 13</p>
                                    <p className="text-sm text-muted-foreground">ShareCab App • Mumbai, India</p>
                                  </div>
                                  <button className="text-destructive text-sm hover:underline">Sign Out</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Emergency Contacts</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              These contacts will be notified during emergencies and can track your rides for safety.
                            </p>
                            <div className="flex justify-between items-center p-3 border rounded-lg mb-2">
                              <div>
                                <p className="font-medium">Ananya Sharma</p>
                                <p className="text-sm text-muted-foreground">+91 87654 32109</p>
                              </div>
                              <button className="text-destructive text-sm hover:underline">
                                Remove
                              </button>
                            </div>
                            <button className="flex items-center text-primary hover:underline">
                              <i className="ri-add-line mr-1"></i> Add Emergency Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Notifications tab */}
                    {activeTab === "notifications" && (
                      <div>
                        <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Ride Updates</p>
                                  <p className="text-sm text-muted-foreground">Booking confirmations, ride status & receipts</p>
                                </div>
                                <button
                                  onClick={() => handleToggleNotification('emailRideUpdates')}
                                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${notificationPrefs.emailRideUpdates ? 'bg-primary' : 'bg-muted'}`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      notificationPrefs.emailRideUpdates ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  ></span>
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Promotions & Offers</p>
                                  <p className="text-sm text-muted-foreground">Discounts, deals & special offers</p>
                                </div>
                                <button
                                  onClick={() => handleToggleNotification('emailPromotions')}
                                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${notificationPrefs.emailPromotions ? 'bg-primary' : 'bg-muted'}`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      notificationPrefs.emailPromotions ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  ></span>
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Ride Updates</p>
                                  <p className="text-sm text-muted-foreground">Ride confirmations & OTP verifications</p>
                                </div>
                                <button
                                  onClick={() => handleToggleNotification('smsRideUpdates')}
                                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${notificationPrefs.smsRideUpdates ? 'bg-primary' : 'bg-muted'}`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      notificationPrefs.smsRideUpdates ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  ></span>
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Promotions & Offers</p>
                                  <p className="text-sm text-muted-foreground">Discounts & special offers</p>
                                </div>
                                <button
                                  onClick={() => handleToggleNotification('smsPromotions')}
                                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${notificationPrefs.smsPromotions ? 'bg-primary' : 'bg-muted'}`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      notificationPrefs.smsPromotions ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  ></span>
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Ride Updates</p>
                                  <p className="text-sm text-muted-foreground">Driver arrival, ride status & emergency alerts</p>
                                </div>
                                <button
                                  onClick={() => handleToggleNotification('pushRideUpdates')}
                                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${notificationPrefs.pushRideUpdates ? 'bg-primary' : 'bg-muted'}`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      notificationPrefs.pushRideUpdates ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  ></span>
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Promotions & Offers</p>
                                  <p className="text-sm text-muted-foreground">Discounts, deals & special offers</p>
                                </div>
                                <button
                                  onClick={() => handleToggleNotification('pushPromotions')}
                                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${notificationPrefs.pushPromotions ? 'bg-primary' : 'bg-muted'}`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      notificationPrefs.pushPromotions ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  ></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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