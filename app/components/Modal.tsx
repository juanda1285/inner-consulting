'use client';

import { ReactNode } from 'react';

//Interface de los parametros que vienen del FormModal
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}