'use client';

import { useEffect, useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import { Product } from './types/types';
import { getProducts } from './utils/apis';
import FormModal from './components/FormModal';

//Pagina principal

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    //Obtenemos 4 productos para agregar a la interfaz principal 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.slice(0, 4)); // Limitar a 4 productos
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4">
                <h2 className="text-2xl font-bold text-center my-6">Productos Destacados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Lista de productos en su respectivo card */}
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {/* Componente con el botón para abrir el modal de los Steps */}
                <div className="flex justify-center mt-8">
                    <FormModal />
                </div>
            </main>
            <Footer />
        </div>
    );
}