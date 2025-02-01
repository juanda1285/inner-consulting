/* eslint-disable @next/next/no-img-element */
import { Product } from '../types/types';
import '../favicon.ico'


interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // Reemplazar la imagen con la de respaldo
        event.currentTarget.src = '../favicon.ico';
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
                src={product.images?.[0] || '../favicon.ico'}  //hice esto porque la mayoria de imagenes de la api no funcionan
                alt={product.title}
                className="w-full h-32 object-cover"
                onError={handleImageError}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 line-clamp-2 mb-4"> {/* Limitar a 2 líneas */}
                    {product.description}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${product.price}</span>
                </div>
            </div>
        </div>
    );
}