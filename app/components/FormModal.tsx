'use client';

import { useState } from 'react';
import Modal from './Modal';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useFormContext } from '../context/FormContext';

import { Product } from '../types/types';
import { createProduct } from '../utils/apis';

export default function FormModal() {
    const { formData, resetForm, currentStep, setCurrentStep, validateStep } = useFormContext();
    const [isOpen, setIsOpen] = useState(false);

    //Handler del modal
    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        resetForm();
    };

    //Validación para el siguiente Step del form
    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    //Step anterior del form
    const handlePrev = () => setCurrentStep((prev) => prev - 1);

    const handleConfirm = async () => {
        if (validateStep(currentStep)) {
            try {
                const createdProduct = await createProduct(formData as Product);
                console.log('Producto creado:', createdProduct);
                alert('Producto creado exitosamente');
                resetForm(); // Limpiamos localStorage y el Context
                closeModal();
            } catch (error) {
                console.error('Error al crear el producto:', error);
                alert('Error al crear el producto');
            }
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
                Crear Nuevo Producto
            </button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <h2 className="text-2xl font-bold mb-4">Crear Producto</h2>
                {/* Cambiamos el contenido del modal dependiendo el step */}
                {currentStep === 1 && <Step1 />}
                {currentStep === 2 && <Step2 />}
                {currentStep === 3 && <Step3 />}

                {/* BOTONES */}
                <div className="flex justify-between mt-6">
                    {currentStep > 1 && (
                        <button
                            onClick={handlePrev}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
                        >
                            Anterior
                        </button>
                    )}
                    {currentStep < 3 ? (
                        <button
                            onClick={handleNext}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                        >
                            Siguiente
                        </button>
                    ) : (
                        <button
                            onClick={handleConfirm}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
                        >
                            Confirmar
                        </button>
                    )}
                </div>
            </Modal>
        </>
    );
}