"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ReactElement, useState } from 'react';
import { Product } from '@/components/ProductWrapper';
import { FeedbackToast } from '@/components/FeedbackToast';

interface Feedback {
    productId: number;
    feedback: 'like' | 'dismiss';
}

// Mock product data
const initialProducts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Smartest Watch",
        brand: "Pear"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "SASLDKJFJOIJE23443234",
        brand: "Sony"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Wireless Headphones",
        brand: "Beats by Dwight"
    }
];

export default function Home(): ReactElement {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleRemoveProduct = (id: number, userFeedback: 'like' | 'dismiss') => {
        setProducts(products.filter(product => product.id !== id));
        setFeedback([...feedback, { productId: id, feedback: userFeedback }]);
        setHasInteracted(true);
    };

    return (
        <div className="max-w-prose m-auto flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">Fast Feedback</h1>
                <p className="mb-3">Low effort product recommendations based on users&#39; actual purchased products.</p>

                <div className="border-l-4 border-gray-300 pl-4 py-2 mb-4">
                    <p className="mb-2">The concept for Fast Feedback is to give users a low effort way to recommend a product. This will benefit us in two ways:</p>
                    <ol className="list-decimal ml-6 mb-3">
                        <li>We get data from the customers that have purchased a product</li>
                        <li>We can display engaging metrics for customers that are thinking about purchasing a specific product</li>
                    </ol>
                    <p className="mb-2">It should display based on these conditions:</p>
                    <ol className="list-decimal ml-6 mb-3">
                        <li>The customer has purchased the product</li>
                        <li>It has been delivered and received</li>
                        <li>It has not been returned</li>
                        <li>Its not eligible for return</li>
                    </ol>
                </div>
            </div>
            <h2 className={`font-bold text-xl transition-opacity duration-500 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}>
                Try it out, recommend some products!
            </h2>
            <FeedbackToast
                products={products}
                onRemoveProduct={handleRemoveProduct}
            />
        </div>
    );
}