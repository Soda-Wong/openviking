import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import PhilosophyCards from "@/components/PhilosophyCards";
import QuickStart from "@/components/QuickStart";
import BestPractice from "@/components/BestPractice";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeatureCards />
      <PhilosophyCards />
      <QuickStart />
      <BestPractice />
      <Footer />
    </div>
  );
};

export default Index;
