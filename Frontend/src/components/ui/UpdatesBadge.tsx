import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const UpdatesBadge = () => {
  return (
    <div className="text-center mb-8">
      <a
        className="inline-flex items-center bg-orange-100 dark:bg-orange-900/50 text-primary px-4 py-1 rounded-full text-sm font-medium"
        href="#"
      >
        Updates
        <span className="mx-2 text-subtext-light dark:text-subtext-dark">
          Access our new problem sets
        </span>
        <ArrowForwardIcon className="text-primary" fontSize="small" />
      </a>
    </div>
  );
};
