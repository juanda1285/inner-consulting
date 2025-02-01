import { Category, Product } from '../types/types';
//Api productos
const ProductsURL = 'https://api.escuelajs.co/api/v1/products'

//obtener categorias
export const getCategories = async (): Promise<Category[]> => {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
};

//Obtener productos
export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(ProductsURL);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

//Crear producto
export const createProduct = async (productData: Product): Promise<Product> => {
    const response = await fetch(ProductsURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: productData.title,
            price: productData.price,
            description: productData.description,
            categoryId: productData.category.id, // Solo el ID de la categoría
            images: [productData.category.image], // Imágenes del producto , estoy enviando la de la categoria para no subir imagenes
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return response.json();
};



