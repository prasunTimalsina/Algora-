import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}
export default App;
