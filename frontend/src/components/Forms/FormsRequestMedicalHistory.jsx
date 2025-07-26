import { useState } from "react";
import { getMedicalHistoryByID } from "../../services/medicalHistoryServices";

const Form = ({ onClose, userId }) => {
    const [formData, setFormData] = useState({
        medical_history_id: "",
    });

    const [errors, setErrors] = useState({});

    const regex = {
        medical_history_id: /^[0-9]+$/,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!regex.medical_history_id.test(formData.medical_history_id)) {
            newErrors.medical_history_id = "ID inválido";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const medicalHistoryData = {
            medical_history_id: formData.medical_history_id,
            user_id: userId,
        };

        try {
            await getMedicalHistoryByID(medicalHistoryData);
            console.log("Solicitud de historial enviada", medicalHistoryData);
            setFormData({
                medical_history_id: "",
            });
            setErrors({});
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrors({ submit: "Error al enviar el formulario" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && (
                <p className="text-red-500 text-sm">{errors.submit}</p>
            )}
            <input
                type="text"
                name="medical_history_id"
                placeholder={errors.medical_history_id || "medical history ID"}
                value={formData.medical_history_id}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded ${
                    errors.medical_history_id ? "border-red-500 placeholder-red-500" : ""
                }`}
            />
            <div className="flex justify-between items-center">
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default Form;



// import { useState } from "react";
// import { getMedicalHistoryByID } from "../../services/medicalHistoryServices";

// const Form = ({ onClose, userId }) => {
//     const [formData, setFormData] = useState({
//         name: "",
//         medical_history_id: "",
//     });

//     const [errors, setErrors] = useState({});

//     const regex = {
//         name: /^[A-Za-zÁÉÍÓÚáéíóúüÑñ ]{2,30}$/,
//         medical_history_id: /^[0-9]+$/,
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input change
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const newErrors = {};

//         if (!regex.name.test(formData.name)) {
//             newErrors.name = "Falta el nombre";
//         }

//         if (!regex.medical_history_id.test(formData.medical_history_id)) {
//             newErrors.medical_history_id = "ID inválido";
//         }

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         const medicalHistoryData = {
//             ...formData,
//             user_id: userId,
//         };

//         try {
//             // Assuming getMedicalHistoryByID is used to fetch or save data
//             await getMedicalHistoryByID(medicalHistoryData);
//             console.log("Solicitud de historial enviada", medicalHistoryData);
            
//             // Clear form fields after successful submission
//             setFormData({
//                 name: "",
//                 medical_history_id: "",
//             });
//             setErrors({}); // Clear any existing errors
//             onClose(); // Close modal
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             setErrors({ submit: "Error al enviar el formulario" });
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//                 type="text"
//                 name="name"
//                 placeholder={errors.name || "name"}
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded ${
//                     errors.name ? "border-red-500 placeholder-red-500" : ""
//                 }`}
//             />
//             <input
//                 type="text"
//                 name="medical_history_id"
//                 placeholder={errors.medical_history_id || "medical history ID"}
//                 value={formData.medical_history_id}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded ${
//                     errors.medical_history_id ? "border-red-500 placeholder-red-500" : ""
//                 }`}
//             />
//             <div className="flex justify-between items-center">
//                 <button
//                     type="submit"
//                     className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//                 >
//                     Save
//                 </button>
//                 <button
//                     type="button"
//                     onClick={onClose}
//                     className="text-gray-500 hover:text-gray-700"
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default Form;