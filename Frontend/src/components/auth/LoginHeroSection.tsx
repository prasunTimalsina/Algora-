import { TestimonialCard } from "./TestimonialCard";

/**
 * LoginHeroSection Component
 *
 * Right-side hero section with background pattern and testimonials
 * Hidden on mobile, visible on large screens
 */
export const LoginHeroSection = () => {
  const testimonials = [
    {
      quote: "Algora helped me land my dream job.",
      author: "@sarah_codes",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b589?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      quote: "The best platform for interview prep.",
      author: "@dev_davis",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <div className="relative hidden w-0 flex-3 lg:block">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 h-full w-full bg-background-light dark:bg-background-dark"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #d4d4d8 1px, transparent 0)",
          backgroundSize: "2rem 2rem",
        }}
      />

      {/* Content */}
      <div className="flex flex-col justify-center items-start h-full px-20 relative z-10 ">
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark sm:text-5xl md:text-6xl font-display">
          <span className="block">Welcome back to the</span>
          <span className="block text-primary">arena.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-lg text-xl text-subtext-light dark:text-subtext-dark ">
          Login to continue your journey, tackle new challenges, and climb the
          leaderboards. Your next coding breakthrough awaits.
        </p>

        {/* Testimonials */}
        <div className="mt-12 space-y-8 w-full max-w-md">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
