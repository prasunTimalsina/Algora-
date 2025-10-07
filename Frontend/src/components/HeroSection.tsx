import { ReviewsSection } from "./ui/ReviewsSection";
import { HeroContent } from "./ui/HeroContent";
import { UpdatesBadge } from "./ui/UpdatesBadge";
import { CodeEditorMockup } from "./ui/CodeEditorMockup";
import { TrustSection } from "./ui/TrustSection";

export const HeroSection = () => {
  return (
    <main className="flex-grow container mx-auto px-6 pt-16 pb-8 overflow-visible">
      {/* Updates Badge */}
      <UpdatesBadge />

      {/* Main Hero Grid */}
      <div className="grid lg:grid-cols-2 gap-x-12 items-start overflow-visible">
        {/* Left Column: Reviews + Hero Content */}
        <div className="flex flex-col pt-8 lg:max-w-lg">
          <ReviewsSection />
          <HeroContent />
        </div>

        {/* Right Column: Code Editor Mockup */}
        <div className="overflow-visible">
          <CodeEditorMockup />
        </div>
      </div>

      {/* Trust Section */}
      <TrustSection />
    </main>
  );
};
