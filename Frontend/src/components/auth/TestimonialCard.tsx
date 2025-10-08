interface TestimonialCardProps {
  quote: string;
  author: string;
  avatar: string;
}

/**
 * TestimonialCard Component
 *
 * Reusable card component for displaying user testimonials
 * Features avatar, quote, and author information
 */
export const TestimonialCard = ({
  quote,
  author,
  avatar,
}: TestimonialCardProps) => {
  return (
    <div className="bg-background-light dark:bg-editor-bg p-6 rounded-lg shadow-lg border border-border-light dark:border-border-dark transition-all hover:shadow-xl hover:border-primary/20">
      <div className="flex items-start">
        <img
          alt={`Avatar for ${author}`}
          className="h-12 w-12 rounded-full object-cover"
          src={avatar}
        />
        <div className="ml-4">
          <p className="font-semibold text-text-light dark:text-text-dark">
            "{quote}"
          </p>
          <p className="text-sm text-subtext-light dark:text-subtext-dark mt-1">
            {author}
          </p>
        </div>
      </div>
    </div>
  );
};
