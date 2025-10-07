import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const reviews = [
  {
    rating: 4.5,
    text: "Finally, a modern and convenient coding platform.",
  },
  {
    rating: 5,
    text: "Great variety of problems, clean interface.",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} />
      ))}
      {hasHalfStar && <StarHalfIcon />}
    </div>
  );
};

export const ReviewsSection = () => {
  return (
    <div className="flex space-x-8 mb-6">
      {reviews.map((review, index) => (
        <div key={index}>
          <StarRating rating={review.rating} />
          <p className="mt-2 text-subtext-light dark:text-subtext-dark">
            "{review.text}"
          </p>
        </div>
      ))}
    </div>
  );
};
