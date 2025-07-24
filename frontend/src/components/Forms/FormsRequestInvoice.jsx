import { useState } from "react";
import { getInvoiceByID } from "../../services/invoiceServices";

const Form = ({ onClose, userId}) => {
    const [formData, setFormData] = useState ({
        name: "",
        invoice_id: "",
    });

    const [errors, setErrors] = useState({});

    const regex = {
        name: /^[A-Za-zÁÉÍÓÚáéíóúüÑñ ]{2,30}$/,
        invoice_id: /^[0-9]+$/,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData ((prev) => ({...prev, [name]: value }));
        setErrors ((prev) => ({ ...prev, [name]: ""})); //Limpia error al escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!regex.name.test(formData.name)) {
            newErrors.name = "Falta el nombre";
        }
        
        if (!regex.invoice_id.test(formData.invoice_id)) {
            newErrors.invoice_id = "ID inválido";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return
        }

        const medicalHistoryData = {
        ...formData,
        user_id: userId,
        };


        console.log("Solicitud de factura enviada", invoiceData);
        onClose(); // cerrar modal
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder={errors.name || "name"}
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded ${
                    errors.name ? "border-red-500 placeholder-red-500" : ""
                }`}
            />
            <input
                type="text"
                name="invoice_id"
                placeholder="invoice ID"
                value={formData.invoice_id}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded ${
                    errors.visit_date ? "border-red-500 text-red-500" : ""
                }`}
            />
            <div className="flex justify-between items-center">
                <button
                    onClick={getInvoiceByID}
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
