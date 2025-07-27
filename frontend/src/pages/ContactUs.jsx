import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import petImage from '../assets/petLand-logo-letra-azul.png';
import pet from '../assets/mascotas.jpg';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';


const ContactForm = () => {
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
    <div className="w-full px-4 py-8">
      <div className="text-center mb-6">

        <img
          src={petImage}
          alt="PetImage"
          className="w-48 h-auto object-contain mx-auto mb-4"
        />
            

        <div className="bg-[#edad06] rounded-xl p-6 mb-6 shadow-md text-white">
        <h1 className="text-4xl font-bold mb-1">Contacta con nosotros</h1>
        
        <p className="text-sm">Formulario de contacto 🐾, si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte a cuidar de tus mascotas con amor y dedicación. </p>
      </div>

      </div>

      {/* Contenedor responsivo */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
        {/* Imagen a la izquierda */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={pet}
            alt="Pet"
            className="w-84 h-auto object-contain"
          />
        </div>

        {/* Formulario */}
        <form
          ref={form}
          onSubmit={sendEmail}
          noValidate
          className="flex flex-col gap-4 w-full md:w-1/2 text-left text-[#1c1f26]"
        >
          <label>Nombre</label>
          <input
            className={`border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            type="text"
            name="user_name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <label>Email</label>
          <input
            className={`border p-2 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            type="email"
            name="user_email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <label>Mensaje</label>
          <textarea
            className={`border p-2 rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            name="message"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

          {formSuccess && <p className="text-green-600 text-sm">{formSuccess}</p>}

          <button
            className="bg-[#edad06] hover:bg-yellow-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"
            type="submit"
          >
            Enviar
          </button>
        </form>
   
        
      </div>

      

      {/*botones redes sociales*/}

       <div className="mt-6 flex justify-center gap-6 w-full">
  <a
    href="https://www.facebook.com/tuPagina"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition"
    title="Facebook"
  >
    <FaFacebookF size={20} />
  </a>

  <a
    href="https://www.instagram.com/tuPerfil"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-80 p-3 rounded-full transition"
    title="Instagram"
  >
    <FaInstagram size={20} />
  </a>

  <a
    href="https://wa.me/34123456789"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white bg-green-500 hover:bg-green-600 p-3 rounded-full transition"
    title="WhatsApp"
  >
    <FaWhatsapp size={20} />
  </a>

  {/* Contacto dirreciones */}



</div>


  <div className="flex flex-col md:flex-row gap-6 mb-6">
  <div className="bg-[#efede8] rounded-xl p-6 shadow-md text-[#1c1f26] w-full md:w-1/2">
    <h1 className="text-4xl font-bold mb-1">Contacto Madrid</h1>
    <p className="text-sm">Officina en Madrid Centro </p>
    <p className="text-sm">Calle Gran Via 55 </p>
    <p className="text-sm">telefono: +34123456789</p>
  </div>

  <div className="bg-[#efede8] rounded-xl p-6 shadow-md text-[#1c1f26] w-full md:w-1/2">
    <h1 className="text-4xl font-bold mb-1">Contacta Internacional</h1>
    <p className="text-sm">Officina en New York </p>
    <p className="text-sm">Grand Cannon </p>
    <p className="text-sm">telefono: +1123456789</p>
  </div>
</div>


    </div>
  );
};

export default ContactForm;
