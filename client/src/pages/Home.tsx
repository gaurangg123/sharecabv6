import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Destinations from "@/components/Destinations";
import Testimonials from "@/components/Testimonials";
import AppDownload from "@/components/AppDownload";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-dark bg-white">
      <Header />
      <main className="pt-16">
        <Hero />
        <Features />
        <Destinations />
        <Testimonials />
        <AppDownload />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
