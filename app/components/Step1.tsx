'use client';

import { useFormContext } from '../context/FormContext';
import FormField from './FormField';

export default function Step1() {
    const { formData, setFormData, errors } = useFormContext();

    //handle para la actualización de los campos 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Paso 1/3: Información Básica</h3>
            <div className="space-y-4">
                <FormField
                    label="Nombre"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={errors.title}
                />
                <FormField
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    type="textarea"
                    error={errors.description}
                />
            </div>
        </div>
    );
}