// src/components/ProductWrapper.tsx
import { ReactElement, useState } from 'react';

export interface Product {
    id: number;
    image: string;
    name: string;
    brand: string;
}

interface ProductWrapperProps {
    product: Product;
    onRemove: (feedback: 'like' | 'dismiss') => void;
}

export function ProductWrapper({ product, onRemove }: ProductWrapperProps): ReactElement {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = (feedback: 'like' | 'dismiss') => {
        setIsRemoving(true);
        setTimeout(() => onRemove(feedback), 300); // Match the duration of the fade-out animation
    };

    return (
        <div className={`flex flex-row justify-between items-center gap-4 mt-4 text-black transition-opacity duration-300 ${isRemoving ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex flex-row gap-8">
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-md w-15 h-15 object-cover border"
                />
                <div className="flex flex-col">
                    <p>{product.name}</p>
                    <p>{product.brand}</p>
                </div>
            </div>
            {/* Like and Dismiss buttons */}
            <div className="flex gap-2">
                <button
                    className="cursor-pointer rounded-md w-10 h-10 flex items-center justify-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                    onClick={() => handleRemove('like')}
                >
                    <i className="fas fa-thumbs-up"></i>
                </button>
                <button
                    className="cursor-pointer rounded-md w-10 h-10 flex items-center justify-center border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition-colors"
                    onClick={() => handleRemove('dismiss')}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
}