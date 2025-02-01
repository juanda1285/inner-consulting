'use client';

import { useFormContext } from '../context/FormContext';
import { useEffect, useState } from 'react';

import { Category } from '../types/types';
import FormField from './FormField';
import { getCategories } from '../utils/apis';

export default function Step2() {
    const { formData, setFormData, errors } = useFormContext();
    const [categories, setCategories] = useState<Category[]>([]);

    //Traer todas las categorias
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        //Funcionalidad del Select de las categorias , agregar al formdata
        if (name === 'category') {
            const selectedCategory = categories.find((cat) => cat.id === parseInt(value));
            if (selectedCategory) {
                setFormData({ ...formData, category: selectedCategory });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Paso 2/3: Detalles Adicionales</h3>
            <div className="space-y-4">
                <FormField
                    label="Precio"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    error={errors.price}
                />
                <FormField
                    label="Categoría"
                    name="category"
                    value={formData.category?.id || ''}
                    onChange={handleChange}
                    type="select"
                    options={categories}
                    error={errors.category}
                />
            </div>
        </div>
    );
}