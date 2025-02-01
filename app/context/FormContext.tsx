'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { FormData } from '../types/types';

//Datos que manejaremos en el contexto
interface FormContextType {
    formData: FormData;
    setFormData: (data: FormData) => void;
    currentStep: number;
    setCurrentStep: (step: number | ((prev: number) => number)) => void;
    resetForm: () => void; // Función para reiniciar el formulario
    errors: { [key: string]: string }; // Nuevo estado para errores
    validateStep: (step: number) => boolean; // Función para validar el paso actual
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Función para validar el paso actual y errores
    const validateStep = (step: number): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (step === 1) {
            if (!formData.title.trim()) newErrors.title = 'El nombre del producto es requerido.';
            if (!formData.description.trim()) newErrors.description = 'La descripción es requerida.';
        }

        if (step === 2) {
            if (formData.price <= 0) newErrors.price = 'El precio debe ser mayor que 0.';
            if (!formData.category.id) newErrors.category = 'Debes seleccionar una categoría.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    //objeto vacio del producto que vamos a crear
    const initialFormData: FormData = {
        title: '',
        description: '',
        price: 0,
        category: { id: 0, name: '', image: '' },
        images: [],
    };

    // Cargar el estado inicial desde localStorage
    const [formData, setFormData] = useState<FormData>(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem('formData');
            return savedData ? JSON.parse(savedData) : initialFormData;
        }
        return initialFormData;
    });

    const [currentStep, setCurrentStep] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedStep = localStorage.getItem('currentStep');
            return savedStep ? parseInt(savedStep) : 1;
        }
        return 1;
    });

    // Guardar el estado en localStorage cuando cambie
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('formData', JSON.stringify(formData));
        }
    }, [formData]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentStep', currentStep.toString());
        }
    }, [currentStep]);

    // Función para reiniciar el formulario , la llamamos al crear un nuevo producto
    const resetForm = () => {
        setFormData(initialFormData);
        setCurrentStep(1);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('formData');
            localStorage.removeItem('currentStep');
        }
    };

    return (
        <FormContext.Provider value={{ formData, setFormData, currentStep, setCurrentStep, resetForm, errors, validateStep }}>
            {children}
        </FormContext.Provider>
    );
};

//export del context
export const useFormContext = () => {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};