import { ReactElement, useState, useEffect } from 'react';
import { Product, ProductWrapper } from './ProductWrapper';

interface FeedbackToastProps {
    products: Product[];
    onRemoveProduct: (id: number, userFeedback: 'like' | 'dismiss') => void;
}

export function FeedbackToast({ products, onRemoveProduct }: FeedbackToastProps): ReactElement {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (products.length === 0) {
            // Delay hiding to allow animation to complete
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [products.length]);


    return (
        <div className="relative w-full max-w-2xl">
            {/* Add the styles directly in the component */}
            <style jsx global>{`
                @keyframes star-pulse {
                    0% {
                        transform: scale(1) rotate(0deg);
                        color: #f59e0b;
                    }
                    25% {
                        transform: scale(1.5) rotate(15deg);
                        color: #fcd34d;
                    }
                    50% {
                        transform: scale(1.2) rotate(-10deg);
                        color: #fbbf24;
                        text-shadow: 0 0 15px rgba(251, 191, 36, 0.8);
                    }
                    75% {
                        transform: scale(1.5) rotate(5deg);
                        color: #f59e0b;
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        color: #f59e0b;
                    }
                }

                @keyframes star-burst {
                    0% {
                        transform: scale(0);
                        opacity: 0.8;
                    }
                    50% {
                        opacity: 0.9;
                    }
                    100% {
                        transform: scale(3);
                        opacity: 0;
                    }
                }

                @keyframes star-rays {
                    0% {
                        transform: scale(0.2);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }

                @keyframes star-ring {
                    0% {
                        transform: scale(0.2);
                        opacity: 0;
                        border-width: 1px;
                    }
                    50% {
                        opacity: 1;
                        border-width: 3px;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                        border-width: 1px;
                    }
                }

                @keyframes sparkle-animation {
                    0% {
                        transform: translate(0, 0) scale(0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--tx), var(--ty)) scale(0.5);
                        opacity: 0;
                    }
                }

                @keyframes rotation {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .animate-star-click {
                    animation: star-pulse 0.8s ease-in-out;
                    filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.7));
                }

                .star-burst {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0) 70%);
                    animation: star-burst 0.8s ease-out forwards;
                }

                .star-rays {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-image:
                            repeating-conic-gradient(
                                    from 0deg,
                                    rgba(251, 191, 36, 0) 0deg,
                                    rgba(251, 191, 36, 0) 10deg,
                                    rgba(251, 191, 36, 0.8) 15deg,
                                    rgba(251, 191, 36, 0) 20deg
                            );
                    border-radius: 50%;
                    animation: star-rays 0.8s ease-out forwards, rotation 4s linear infinite;
                }

                .star-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid rgba(251, 191, 36, 0.8);
                    box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
                    animation: star-ring 0.8s ease-out forwards;
                }

                .sparkle {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background-color: #fef3c7;
                    border-radius: 50%;
                    box-shadow: 0 0 5px 2px rgba(251, 191, 36, 0.7);
                    opacity: 0;
                }

                .sparkle-1 {
                    --tx: 30px;
                    --ty: -20px;
                    animation: sparkle-animation 0.6s ease-out 0.1s forwards;
                }

                .sparkle-2 {
                    --tx: -25px;
                    --ty: 20px;
                    animation: sparkle-animation 0.6s ease-out 0.2s forwards;
                }

                .sparkle-3 {
                    --tx: 25px;
                    --ty: 25px;
                    animation: sparkle-animation 0.6s ease-out 0.15s forwards;
                }

                .sparkle-4 {
                    --tx: -30px;
                    --ty: -15px;
                    animation: sparkle-animation 0.6s ease-out 0.3s forwards;
                }

                .sparkle-5 {
                    --tx: 0px;
                    --ty: -30px;
                    animation: sparkle-animation 0.6s ease-out 0.25s forwards;
                }

                .sparkle-6 {
                    --tx: 0px;
                    --ty: 30px;
                    animation: sparkle-animation 0.6s ease-out 0.2s forwards;
                }
            `}</style>

            {/* Thank you message underneath */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
                 style={{ opacity: isVisible ? 0 : 1 }}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Thank you for taking the time!</h2>
                    <p>Your feedback helps us improve our product recommendations.</p>
                </div>
            </div>

            {/* Toast wrapper */}
            <div className={`bg-white rounded-md p-8 w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <h2 className="text-2xl text-black font-bold">Do you recommend these products?</h2>
                <div className="relative inline-block mt-1 mb-3">
                    <span className="text-xs text-gray-400 cursor-help underline flex items-center gap-1 group">
                        Why am I seeing this? <i className="fas fa-question-circle text-gray-400"></i>
                        <div className="invisible group-hover:visible absolute left-0 top-full z-10 bg-gray-800 text-white text-xs rounded p-2 w-64 transition-opacity duration-300">
                            You are seeing this because you have recently purchased and own these products and we would like to know if you like them!
                        </div>
                    </span>
                </div>

                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductWrapper
                            key={product.id}
                            product={product}
                            isEven={index % 2 === 0}
                            onRemove={(userFeedback) => onRemoveProduct(product.id, userFeedback)}
                            onInteraction={() => {}} // Empty function to fix the error
                        />
                    ))
                ) : (
                    <p className="text-gray-500 mt-4">No more products to review.</p>
                )}
            </div>
        </div>
    );
}