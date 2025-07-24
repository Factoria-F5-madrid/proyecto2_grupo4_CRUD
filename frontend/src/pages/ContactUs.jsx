import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import perritosImage from '../assets/PetHome.svg';
import petImage from '../assets/petLand-logo-letra-azul.png';
import Modal from '../components/Nav/Modal';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_a0br7l7',      // ⚠️ Reemplaza con tu Service ID
        'template_60qy2ln',     // ⚠️ Reemplaza con tu Template ID
        form.current,
        'u4pNSJNBDkNpwqp3O'       // ⚠️ Reemplaza con tu Public Key
      )
      .then(
        (result) => {
          console.log('Email sent!', result.text);
          alert('Mensaje enviado correctamente');
          form.current.reset(); // Limpiar el formulario después de enviar
        },
        (error) => {
          console.error('Error:', error.text);
          alert('Hubo un error al enviar el mensaje');
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 w-full max-w-md mx-auto text-left">
      <label>Nombre</label>
      <input className="border p-2 rounded" type="text" name="user_name" required />

      <label>Email</label>
      <input className="border p-2 rounded" type="email" name="user_email" required />

      <label>Mensaje</label>
      <textarea className="border p-2 rounded" name="message" required />

      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition" type="submit">
        Enviar
      </button>
    </form>
  );
};

const ContactUs = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#ffffff] px-4 text-center">
      <img
        src={petImage}
        alt="PetImage"
        className="w-55 h-15 object-contain mb-4"
      />

      <h1 className="text-[#1c1f26] text-md mb-6">
        Formulario de contacto 🐾, si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte a cuidar de tus mascotas con amor y dedicación.
      </h1>

      <ContactForm />

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ContactUs;
