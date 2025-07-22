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
    <div className="flex justify-center items-center h-screen bg-blue-900">
      <Lottie
        animationData={spinnerAnimation}
        loop={true}
        className="w-102 h-102"
      />
    </div>
  );
};

export default Spinner;
