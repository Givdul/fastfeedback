// src/components/FeedbackToast.tsx
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
                    products.map((product) => (
                        <ProductWrapper
                            key={product.id}
                            product={product}
                            onRemove={(userFeedback) => onRemoveProduct(product.id, userFeedback)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 mt-4">No more products to review.</p>
                )}
            </div>
        </div>
    );
}