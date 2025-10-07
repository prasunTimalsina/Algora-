import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Grid Background - Exactly like HTML */}
      <div className="absolute inset-x-0 top-0 h-1/2 grid-background z-0 animate-grid-pan"></div>

      {/* Content with higher z-index - Exactly like HTML */}
      <div className="relative z-10 bg-transparent">
        <Navbar />
        <HeroSection />
        {/* Hero Content */}
      </div>
    </div>
  );
};
