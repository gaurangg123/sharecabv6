import { useState } from "react";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How does ShareCab ensure safety?",
      answer: "ShareCab prioritizes safety by verifying all users through ID checks, implementing a comprehensive rating system, and offering in-app emergency assistance. All rides are tracked in real-time, and we have a 24/7 support team available. Additionally, our insurance policy covers all rides booked through our platform."
    },
    {
      id: 2,
      question: "How do payments work?",
      answer: "Payments are handled securely through our app. When you book a ride, the payment is authorized but not charged until the ride is completed. Drivers set their prices based on distance and expenses, and we add a small service fee. We support various payment methods including credit cards, PayPal, and mobile payment solutions."
    },
    {
      id: 3,
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking, but our cancellation policy varies depending on timing. Cancellations made more than 24 hours before departure are free. Those made within 24 hours may incur a 50% fee, and cancellations within 3 hours of departure or no-shows are charged the full amount. These policies ensure fairness to drivers who have reserved space for you."
    },
    {
      id: 4,
      question: "How do I become a driver?",
      answer: "To become a driver, you need to create an account, verify your identity, upload your driver's license, vehicle registration, and insurance documents. We'll review your application within 48 hours. Once approved, you can start listing your planned journeys and setting your prices. Drivers must maintain a rating of at least 4.0 to continue using the platform."
    },
    {
      id: 5,
      question: "Is ShareCab available internationally?",
      answer: "Currently, ShareCab is available in the United States and Canada, with limited service in major European cities. We're actively expanding to new markets and plan to be available in most major global cities by the end of the year. You can check our website or app for the most up-to-date information on service areas."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about using ShareCab.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div key={faq.id} className={`mb-6 border-b border-gray-200 pb-6 ${faq.id === faqs.length ? 'border-b-0' : ''}`}>
              <button 
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleFaq(faq.id)}
              >
                <h3 className="text-xl font-medium text-dark">{faq.question}</h3>
                <i className={`ri-arrow-down-s-line text-2xl text-primary transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`mt-3 text-gray-600 ${openFaq === faq.id ? 'block' : 'hidden'}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Questions CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions? We're here to help.</p>
          <a href="#" className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-opacity-90 transition shadow-sm">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
