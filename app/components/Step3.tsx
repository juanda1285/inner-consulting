'use client';

import { useFormContext } from '../context/FormContext';

export default function Step3() {
    const { formData } = useFormContext();

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Paso 3/3: Confirmación</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <p className="p-2 bg-gray-100 rounded">{formData.title}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <p className="p-2 bg-gray-100 rounded">{formData.description}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                    <p className="p-2 bg-gray-100 rounded">${formData.price}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <p className="p-2 bg-gray-100 rounded">{formData.category?.name}</p>
                </div>
            </div>
        </div>
    );
}