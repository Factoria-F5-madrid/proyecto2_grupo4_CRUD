import Form from "../Forms/FormsAddNewPet";

const Modal = ({ onClose, userId  }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1f26] bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#1c1f26] hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#1c1f26]">Añade una mascota</h2>
        <Form onClose={onClose} userId={userId} />
      </div>
    </div>
  );
};

export default Modal;
