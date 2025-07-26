import Form from "../Forms/FormsAddNewPet";

const Modal = ({ onClose, userId }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1f26] bg-opacity-50 p-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded shadow-lg relative overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-2 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-[#1c1f26] hover:text-gray-700 text-xl z-20"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold text-center text-[#1c1f26] pr-8">
            Añade una mascota
          </h2>
        </div>
        
        <div className="px-6 pb-6">
          <Form onClose={onClose} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Modal;