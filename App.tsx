
import React, { useState, useCallback } from 'react';
import { FoodItem } from './types';
import FoodCard from './components/FoodCard';
import { generateFoodDescription } from './services/geminiService';

const initialFoodItems: FoodItem[] = [
  { id: 1, name: 'Sizzling Steak', description: 'Click "AI Describe" to generate a mouth-watering description for this dish!', imageUrl: 'https://picsum.photos/seed/steak/800/600', generatingDescription: false },
  { id: 2, name: 'Gourmet Burger', description: 'Click "AI Describe" to generate a mouth-watering description for this dish!', imageUrl: 'https://picsum.photos/seed/burger/800/600', generatingDescription: false },
  { id: 3, name: 'Neapolitan Pizza', description: 'Click "AI Describe" to generate a mouth-watering description for this dish!', imageUrl: 'https://picsum.photos/seed/pizza/800/600', generatingDescription: false },
  { id: 4, name: 'Creamy Carbonara', description: 'Click "AI Describe" to generate a mouth-watering description for this dish!', imageUrl: 'https://picsum.photos/seed/pasta/800/600', generatingDescription: false },
  { id: 5, name: 'Decadent Chocolate Cake', description: 'Click "AI Describe" to generate a mouth-watering description for this dish!', imageUrl: 'https://picsum.photos/seed/cake/800/600', generatingDescription: false },
  { id: 6, name: 'Fresh Sushi Platter', description: 'Click "AI Describe" to generate a mouth-watering description for this dish!', imageUrl: 'https://picsum.photos/seed/sushi/800/600', generatingDescription: false },
];

const App = (): React.ReactNode => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);

  const handleGenerateDescription = useCallback(async (id: number, name: string) => {
    setFoodItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, generatingDescription: true } : item
      )
    );

    const newDescription = await generateFoodDescription(name);

    setFoodItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, description: newDescription, generatingDescription: false }
          : item
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Hero Section */}
      <header className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center p-4">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <img src="https://picsum.photos/seed/food-bg/1920/1080" alt="Delicious food background" className="absolute inset-0 w-full h-full object-cover z-[-1]" />
        <div className="z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Gourmet Gemini
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-200 drop-shadow-md">
            Discover culinary masterpieces. Described by AI, desired by you.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-red-400">Our Signature Dishes</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-400">
                Explore our curated selection. Let our AI chef paint a picture with words.
            </p>
        </div>

        {/* Food Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {foodItems.map(item => (
            <FoodCard
              key={item.id}
              item={item}
              onGenerateDescription={handleGenerateDescription}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Gourmet Gemini. All rights reserved.</p>
          <p className="mt-2 text-sm">Crafted with passion and a touch of AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
