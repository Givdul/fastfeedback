import { ReactElement, useState } from 'react';

export interface Product {
    id: number;
    image: string;
    name: string;
    brand: string;
}

interface ProductWrapperProps {
    product: Product;
    onRemove: (userFeedback: 'like' | 'dismiss') => void;
    isEven?: boolean;
    onInteraction: () => void; // New prop for reporting interaction
}

export function ProductWrapper({ product, onRemove, isEven, onInteraction }: ProductWrapperProps): ReactElement {
    const [isStarAnimating, setIsStarAnimating] = useState(false);

    const handleStarClick = () => {
        setIsStarAnimating(true);
        onInteraction(); // Report interaction
        // Allow animation to play before removing product
        setTimeout(() => {
            onRemove('like');
        }, 1000);
    };

    const handleDismiss = () => {
        onInteraction(); // Report interaction
        onRemove('dismiss');
    };

    return (
        <div className={`flex items-center p-3 ${isEven ? 'bg-gray-50' : ''}`}>
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base text-black">
                        <h3>{product.name}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                </div>
            </div>

            <div className="flex justify-items-center">
                <button
                    type="button"
                    onClick={handleStarClick}
                    className="relative p-2 text-yellow-400 hover:text-yellow-500 cursor-pointer rounded-md transition-colors"
                >
                    <i className={`fas fa-star text-xl ${isStarAnimating ? 'animate-star-click' : ''}`}></i>
                    {isStarAnimating && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="star-burst"></div>
                            <div className="star-rays"></div>
                            <div className="star-ring"></div>
                            <div className="sparkle sparkle-1"></div>
                            <div className="sparkle sparkle-2"></div>
                            <div className="sparkle sparkle-3"></div>
                            <div className="sparkle sparkle-4"></div>
                            <div className="sparkle sparkle-5"></div>
                            <div className="sparkle sparkle-6"></div>
                        </div>
                    )}
                </button>
                <button
                    type="button"
                    onClick={handleDismiss}
                    className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer rounded-full ml-2 transition-colors"
                >
                    <i className="fas fa-times text-xl"></i>
                </button>
            </div>
        </div>
    );
}