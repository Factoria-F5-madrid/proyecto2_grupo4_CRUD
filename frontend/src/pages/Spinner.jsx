import petHome from "../assets/PetHome.svg";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1c1f26]">
      <img
        src={petHome}
        alt="PetLand F5"
        className="w-64 h-auto"
      />
    </div>
  );
};

export default Spinner;
