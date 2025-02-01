//Interfaces

export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

export interface FormData {
    id?: number;
    title: string;
    description: string;
    price: number;
    category: Category;
    images: string[];
}