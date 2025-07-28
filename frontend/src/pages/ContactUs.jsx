import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import petImage from '../assets/petland-logo-letra-azul.png';
import mascotasImage from '../assets/mascotas.jpg';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  const form = useRef();
  const [formSuccess, setFormSuccess] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const validateForm = (name, email, message) => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
    };

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
      newErrors.name = 'El nombre solo debe contener letras y espacios (mínimo 2 caracteres).';
    }

    if (!emailRegex.test(email)) {
      newErrors.email = 'Correo electrónico no válido.';
    }

    if (message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
    }

    return newErrors;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.user_name.value.trim();
    const email = form.current.user_email.value.trim();
    const message = form.current.message.value.trim();

    const validationErrors = validateForm(name, email, message);
    const hasErrors = Object.values(validationErrors).some((error) => error !== '');

    if (hasErrors) {
      setErrors(validationErrors);
      setFormSuccess('');
      return;
    }

    setErrors({ name: '', email: '', message: '' });

    emailjs
      .sendForm(
        'service_a0br7l7',
        'template_60qy2ln',
        form.current,
        'u4pNSJNBDkNpwqp3O'
      )
      .then(
        (result) => {
          console.log('Email sent!', result.text);
          setFormSuccess('✅ Mensaje enviado correctamente');
          form.current.reset();
        },
        (error) => {
          console.error('Error:', error.text);
          setFormSuccess('❌ Hubo un error al enviar el mensaje');
        }
      );
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={petImage}
            alt="PetLand Logo"
            className="w-48 h-auto object-contain mx-auto mb-6"
          />

          <div className="bg-[#EEAD05] rounded-xl p-6 mb-8 shadow-lg text-white">
            <h1 className="text-4xl font-bold mb-3">Contacta con nosotros</h1>
            <p className="text-lg">
              Formulario de contacto 🐾, si tienes alguna pregunta o necesitas ayuda, 
              no dudes en contactarnos. Estamos aquí para ayudarte a cuidar de tus 
              mascotas con amor y dedicación.
            </p>
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Imagen a la izquierda */}
          <div className="flex justify-center items-center">
            <img
              src={mascotasImage}
              alt="Mascotas"
              className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un mensaje</h2>
            <form
              ref={form}
              onSubmit={sendEmail}
              noValidate
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  type="text"
                  name="user_name"
                  placeholder="Tu nombre completo"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  type="email"
                  name="user_email"
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EEAD05] focus:border-transparent resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  name="message"
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {formSuccess && (
                <div className={`p-3 rounded-lg ${
                  formSuccess.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {formSuccess}
                </div>
              )}

              <button
                className="w-full bg-[#EEAD05] hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                type="submit"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Síguenos en redes sociales</h3>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/tuPagina"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
              title="Facebook"
            >
              <FaFacebookF size={24} />
            </a>

            <a
              href="https://www.instagram.com/tuPerfil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-80 p-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
              title="Instagram"
            >
              <FaInstagram size={24} />
            </a>

            <a
              href="https://wa.me/34123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-green-500 hover:bg-green-600 p-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
              title="WhatsApp"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Contacto Madrid</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-400" />
                Oficina en Madrid Centro
              </p>
              <p className="ml-6">Calle Gran Vía 55</p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                +34 123 456 789
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                madrid@petland.com
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaMapMarkerAlt className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Contacto Internacional</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-400" />
                Oficina en New York
              </p>
              <p className="ml-6">Grand Canyon Plaza</p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                +1 123 456 789
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                newyork@petland.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;