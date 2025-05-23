import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Plan = {
  id: string;
  name: string;
  price: number;
  billing: "monthly" | "yearly";
  isMostPopular: boolean;
  features: string[];
  featureExplanations: Record<string, string>;
};

export default function Plans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [planType, setPlanType] = useState<"individual" | "corporate" | "student">("individual");

  // Individual plans
  const individualPlans: Plan[] = [
    {
      id: "basic",
      name: "Basic",
      price: billingCycle === "monthly" ? 299 : 2990,
      billing: billingCycle,
      isMostPopular: false,
      features: [
        "Unlimited rides",
        "Standard booking",
        "Basic customer support",
        "Standard security features",
        "Cashback 2%"
      ],
      featureExplanations: {
        "Unlimited rides": "Book as many rides as you want with no booking limitations.",
        "Standard booking": "Book rides up to 3 days in advance.",
        "Basic customer support": "Email support with 24-hour response time.",
        "Standard security features": "Basic driver verification and ride tracking.",
        "Cashback 2%": "Get 2% cashback on all your rides as ShareCab credits."
      }
    },
    {
      id: "premium",
      name: "Premium",
      price: billingCycle === "monthly" ? 599 : 5990,
      billing: billingCycle,
      isMostPopular: true,
      features: [
        "Unlimited rides",
        "Priority booking",
        "Premium customer support",
        "Advanced security features",
        "Cashback 5%",
        "Free ride cancellations",
        "Exclusive offers"
      ],
      featureExplanations: {
        "Unlimited rides": "Book as many rides as you want with no booking limitations.",
        "Priority booking": "Book rides up to 7 days in advance with priority matching.",
        "Premium customer support": "Priority email and phone support with 4-hour response time.",
        "Advanced security features": "Enhanced driver verification, live tracking, and emergency assistance.",
        "Cashback 5%": "Get 5% cashback on all your rides as ShareCab credits.",
        "Free ride cancellations": "Cancel rides up to 1 hour before departure with no penalty.",
        "Exclusive offers": "Access to exclusive partner discounts and special promotions."
      }
    },
    {
      id: "business",
      name: "Business",
      price: billingCycle === "monthly" ? 999 : 9990,
      billing: billingCycle,
      isMostPopular: false,
      features: [
        "Unlimited rides",
        "Premium booking",
        "Dedicated account manager",
        "Advanced security features",
        "Cashback 10%",
        "Free ride cancellations",
        "Exclusive offers",
        "Business reporting",
        "Multi-user accounts"
      ],
      featureExplanations: {
        "Unlimited rides": "Book as many rides as you want with no booking limitations.",
        "Premium booking": "Book rides up to 14 days in advance with highest priority matching.",
        "Dedicated account manager": "Personal account manager for all your queries and needs.",
        "Advanced security features": "Enhanced driver verification, live tracking, and emergency assistance.",
        "Cashback 10%": "Get 10% cashback on all your rides as ShareCab credits.",
        "Free ride cancellations": "Cancel rides up to 30 minutes before departure with no penalty.",
        "Exclusive offers": "Access to exclusive partner discounts and premium promotions.",
        "Business reporting": "Detailed monthly reports on usage and expenses.",
        "Multi-user accounts": "Add up to 5 users under one business account."
      }
    }
  ];

  // Corporate plans
  const corporatePlans: Plan[] = [
    {
      id: "corp-basic",
      name: "Corporate Basic",
      price: billingCycle === "monthly" ? 4999 : 49990,
      billing: billingCycle,
      isMostPopular: false,
      features: [
        "10 employee accounts",
        "15% off on all rides",
        "Centralized billing",
        "Basic expense reports",
        "Business hours support",
        "Company ride policies"
      ],
      featureExplanations: {
        "10 employee accounts": "Add up to 10 employees to your corporate plan.",
        "15% off on all rides": "Automatic discount on all corporate rides.",
        "Centralized billing": "Single consolidated bill for all corporate rides.",
        "Basic expense reports": "Monthly expense reports by employee.",
        "Business hours support": "Support available Mon-Fri, 9 AM - 6 PM.",
        "Company ride policies": "Set policies for ride bookings (time, budget, etc.)."
      }
    },
    {
      id: "corp-plus",
      name: "Corporate Plus",
      price: billingCycle === "monthly" ? 9999 : 99990,
      billing: billingCycle,
      isMostPopular: true,
      features: [
        "25 employee accounts",
        "20% off on all rides",
        "Centralized billing with GST",
        "Advanced expense tracking",
        "Priority support",
        "Custom ride policies",
        "Dedicated account manager",
        "API integration"
      ],
      featureExplanations: {
        "25 employee accounts": "Add up to 25 employees to your corporate plan.",
        "20% off on all rides": "Increased discount on all corporate rides.",
        "Centralized billing with GST": "GST-compliant invoice with department codes.",
        "Advanced expense tracking": "Detailed analytics and expense management tools.",
        "Priority support": "24/7 priority support for corporate clients.",
        "Custom ride policies": "Create custom policies for different departments.",
        "Dedicated account manager": "Personal account manager for your company.",
        "API integration": "Connect our system with your expense management software."
      }
    },
    {
      id: "corp-enterprise",
      name: "Corporate Enterprise",
      price: billingCycle === "monthly" ? 19999 : 199990,
      billing: billingCycle,
      isMostPopular: false,
      features: [
        "Unlimited employee accounts",
        "25% off on all rides",
        "Custom billing solutions",
        "Custom reporting & analytics",
        "24/7 dedicated support",
        "Advanced policy management",
        "Dedicated account team",
        "Full API access",
        "Employee shuttle service"
      ],
      featureExplanations: {
        "Unlimited employee accounts": "No limit on the number of employees.",
        "25% off on all rides": "Maximum discount on all corporate rides.",
        "Custom billing solutions": "Tailored billing cycle and payment options.",
        "Custom reporting & analytics": "Fully customizable reports and dashboards.",
        "24/7 dedicated support": "Exclusive support line for enterprise clients.",
        "Advanced policy management": "Granular control over ride policies and approvals.",
        "Dedicated account team": "Team of account managers for your company.",
        "Full API access": "Complete access to our API for custom integrations.",
        "Employee shuttle service": "Schedule regular pickup and drop services for employees."
      }
    }
  ];

  // Student plans
  const studentPlans: Plan[] = [
    {
      id: "student-basic",
      name: "Student Basic",
      price: billingCycle === "monthly" ? 199 : 1990,
      billing: billingCycle,
      isMostPopular: false,
      features: [
        "Valid student ID required",
        "10% off on all rides",
        "Basic support",
        "Standard security features",
        "Weekend special rides"
      ],
      featureExplanations: {
        "Valid student ID required": "Verification with college/university ID required.",
        "10% off on all rides": "Discount applied to all rides.",
        "Basic support": "Email support during business hours.",
        "Standard security features": "Regular safety features for all rides.",
        "Weekend special rides": "Additional discounts on weekend rides."
      }
    },
    {
      id: "student-plus",
      name: "Student Plus",
      price: billingCycle === "monthly" ? 349 : 3490,
      billing: billingCycle,
      isMostPopular: true,
      features: [
        "Valid student ID required",
        "15% off on all rides",
        "Priority support",
        "Advanced security features",
        "Free cancellations",
        "Campus special routes",
        "Group ride discounts"
      ],
      featureExplanations: {
        "Valid student ID required": "Verification with college/university ID required.",
        "15% off on all rides": "Higher discount rate for all rides.",
        "Priority support": "Faster response time for support requests.",
        "Advanced security features": "Enhanced safety features for student rides.",
        "Free cancellations": "Cancel rides up to 15 minutes before pickup.",
        "Campus special routes": "Fixed rates for common campus routes.",
        "Group ride discounts": "Additional discounts when booking with classmates."
      }
    },
    {
      id: "student-premium",
      name: "Student Premium",
      price: billingCycle === "monthly" ? 499 : 4990,
      billing: billingCycle,
      isMostPopular: false,
      features: [
        "Valid student ID required",
        "20% off on all rides",
        "24/7 support",
        "Premium security features",
        "Anytime cancellations",
        "Campus special routes",
        "Group ride discounts",
        "Late night rides",
        "Monthly ride pass"
      ],
      featureExplanations: {
        "Valid student ID required": "Verification with college/university ID required.",
        "20% off on all rides": "Maximum student discount on all rides.",
        "24/7 support": "Around-the-clock support for all issues.",
        "Premium security features": "Top-tier safety features and real-time tracking.",
        "Anytime cancellations": "Cancel rides anytime without penalty.",
        "Campus special routes": "Fixed rates for common campus routes.",
        "Group ride discounts": "Best rates for group bookings with classmates.",
        "Late night rides": "Priority allocation for late night campus rides.",
        "Monthly ride pass": "Set number of rides included at no extra cost."
      }
    }
  ];

  // Select plans based on plan type
  const getPlans = (): Plan[] => {
    switch (planType) {
      case "individual":
        return individualPlans;
      case "corporate":
        return corporatePlans;
      case "student":
        return studentPlans;
      default:
        return individualPlans;
    }
  };

  const getDiscountPercentage = () => {
    return billingCycle === "yearly" ? 15 : 0;
  };

  const handleSubscribe = (planId: string) => {
    // This would handle the subscription process in a real implementation
    alert(`Subscribing to ${planId} plan. In a real app, this would navigate to a payment screen.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-12 md:py-20 bg-gradient-to-br from-indigo-50 via-background to-indigo-50 dark:from-indigo-950 dark:via-background dark:to-indigo-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Perfect Plan</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get exclusive benefits, priority bookings, and special discounts with our subscription plans.
              </p>
              
              {/* Plan Type Selector */}
              <div className="flex justify-center mb-8">
                <div className="bg-card inline-flex p-1 rounded-lg shadow">
                  <button
                    className={`px-4 py-2 rounded-md transition ${
                      planType === "individual"
                        ? "bg-primary text-white"
                        : "hover:bg-muted/70"
                    }`}
                    onClick={() => setPlanType("individual")}
                  >
                    Individual
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md transition ${
                      planType === "corporate"
                        ? "bg-primary text-white"
                        : "hover:bg-muted/70"
                    }`}
                    onClick={() => setPlanType("corporate")}
                  >
                    Corporate
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md transition ${
                      planType === "student"
                        ? "bg-primary text-white"
                        : "hover:bg-muted/70"
                    }`}
                    onClick={() => setPlanType("student")}
                  >
                    Student
                  </button>
                </div>
              </div>
              
              {/* Plan Description */}
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {planType === "individual" && "Save on your daily commute with our individual plans. Perfect for regular travelers looking for convenience and savings."}
                {planType === "corporate" && "Streamline corporate travel with centralized billing and employee management. Ideal for businesses of all sizes."}
                {planType === "student" && "Special discounted plans for college and university students. Verify with your student ID and start saving today."}
              </p>
              
              {/* Billing toggle */}
              <div className="flex items-center justify-center mb-8">
                <span className={`mr-3 ${billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                  className="relative inline-flex h-6 w-12 items-center rounded-full bg-muted transition-colors focus:outline-none"
                  aria-label={`Switch to ${billingCycle === "monthly" ? "yearly" : "monthly"} billing`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className={`ml-3 flex items-center ${billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}`}>
                  Yearly
                  <span className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
                    Save {getDiscountPercentage()}%
                  </span>
                </span>
              </div>
            </div>
            
            {/* Plans grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {getPlans().map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-card rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl ${
                    plan.isMostPopular ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {plan.isMostPopular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-primary text-white text-xs px-3 py-1 font-medium rounded-bl-lg">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="my-4">
                      <span className="text-4xl font-bold">₹{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.billing === "monthly" ? "month" : "year"}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {planType === "individual" && 
                        (plan.id === "basic" 
                          ? "Perfect for occasional travelers" 
                          : plan.id === "premium"
                          ? "Ideal for regular commuters" 
                          : "Best for frequent travelers")}
                      {planType === "corporate" && 
                        (plan.id === "corp-basic" 
                          ? "Perfect for small businesses" 
                          : plan.id === "corp-plus"
                          ? "Ideal for growing companies" 
                          : "Best for large enterprises")}
                      {planType === "student" && 
                        (plan.id === "student-basic" 
                          ? "Perfect for weekend trips" 
                          : plan.id === "student-plus"
                          ? "Ideal for daily college commute" 
                          : "Best for frequent campus travelers")}
                    </p>
                    
                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      className={`w-full py-2 rounded-lg font-medium transition ${
                        plan.isMostPopular
                          ? "bg-primary text-white hover:bg-opacity-90"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      Subscribe Now
                    </button>
                  </div>
                  
                  <div className="p-6 bg-muted/50 dark:bg-muted/20">
                    <p className="font-medium mb-4">Features include:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start group relative">
                          <div className="flex-shrink-0 h-5 w-5 text-green-500">
                            <i className="ri-check-line"></i>
                          </div>
                          <span className="ml-2">{feature}</span>
                          
                          {/* Feature tooltip on hover */}
                          {plan.featureExplanations[feature] && (
                            <div className="absolute left-0 top-0 transform -translate-y-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10 w-64 bg-background border shadow-md rounded-lg p-3 text-sm">
                              {plan.featureExplanations[feature]}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Feature details */}
            <div className="max-w-3xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Plan Features Explained</h2>
              <div className="bg-card rounded-xl shadow-lg p-6">
                <div className="space-y-6">
                  {Object.entries(getPlans()[getPlans().findIndex(plan => plan.isMostPopular)].featureExplanations).map(([feature, explanation], index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-start">
                      <div className="sm:w-1/3 font-medium mb-1 sm:mb-0">{feature}</div>
                      <div className="sm:w-2/3 text-muted-foreground">{explanation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* FAQs */}
            <div className="max-w-3xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-card rounded-xl shadow p-4">
                  <h3 className="font-medium mb-2">Can I switch between plans?</h3>
                  <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, your new plan will take effect at the next billing cycle.</p>
                </div>
                
                {planType === "corporate" && (
                  <div className="bg-card rounded-xl shadow p-4">
                    <h3 className="font-medium mb-2">How do I add employees to my corporate account?</h3>
                    <p className="text-muted-foreground">After subscribing, you'll get access to a corporate dashboard where you can add employees by email. They'll receive an invitation to join the corporate account and can then book rides under your company's plan.</p>
                  </div>
                )}
                
                {planType === "student" && (
                  <div className="bg-card rounded-xl shadow p-4">
                    <h3 className="font-medium mb-2">How do I verify my student status?</h3>
                    <p className="text-muted-foreground">After subscribing, you'll need to upload a valid student ID and proof of enrollment. Our team will verify your documents within 24 hours, and your discounts will be applied once verified.</p>
                  </div>
                )}
                
                <div className="bg-card rounded-xl shadow p-4">
                  <h3 className="font-medium mb-2">Is there a refund policy?</h3>
                  <p className="text-muted-foreground">We offer a 7-day money-back guarantee for new subscriptions. After that, subscriptions are non-refundable but can be cancelled anytime to prevent future billing.</p>
                </div>
                
                <div className="bg-card rounded-xl shadow p-4">
                  <h3 className="font-medium mb-2">How is cashback credited?</h3>
                  <p className="text-muted-foreground">Cashback is automatically credited to your ShareCab wallet at the end of each ride. These credits can be used for future ride bookings on our platform.</p>
                </div>
                
                <div className="bg-card rounded-xl shadow p-4">
                  <h3 className="font-medium mb-2">Do I need a subscription to use ShareCab?</h3>
                  <p className="text-muted-foreground">No, you can use ShareCab without a subscription. However, subscribers get exclusive benefits, priority matching, and savings that enhance the experience.</p>
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