import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import spinnerAnimation from "../assets/PetSpinner.json";

const Spinner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#1c1f26]">
      <Lottie
        animationData={spinnerAnimation}
        loop={true}
        className="w-84 h-84"
      />
      <p className="mt-6 text-white text-xl font-semibold animate-pulse">
        LOADING
      </p>
    </div>
  );
};

export default Spinner;
