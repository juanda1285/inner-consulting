'use client';
// Componente generico para los campos del formulario  (DRY)
interface FormFieldProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    error?: string;
    type?: 'text' | 'number' | 'textarea' | 'select';
    options?: { id: number; name: string }[];
}

export default function FormField({ label, name, value, onChange, error, type = 'text', options }: FormFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            ) : type === 'select' ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="">Selecciona una opción</option>
                    {options?.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}