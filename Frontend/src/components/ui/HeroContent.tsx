import { Link } from "react-router-dom";

const ctaButtons = [
  {
    text: "Sign up",
    href: "signup",
    className:
      "w-full sm:w-auto text-center bg-primary text-white px-10 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg",
  },
  {
    text: "Log in",
    href: "login",
    className:
      "w-full sm:w-auto text-center bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark px-10 py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-lg",
  },
];

export const HeroContent = () => {
  return (
    <>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-text-light dark:text-text-dark mb-6">
        Sharpen Your Coding Skills
      </h1>

      <p className="text-lg text-subtext-light dark:text-subtext-dark mb-8 max-w-xl">
        Designed for developers who want to excel. Practice with a vast
        collection of problems, prepare for interviews, and compete with a
        global community.
      </p>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-start">
        {ctaButtons.map((button, index) => (
          <Link key={index} className={button.className} to={button.href}>
            {button.text}
          </Link>
        ))}
      </div>

      <p className="text-sm text-subtext-light dark:text-subtext-dark mt-4">
        Get a free 7-day trial of premium features | No credit card required
      </p>
    </>
  );
};
