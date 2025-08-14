
import React from 'react';
import { FoodItem } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface FoodCardProps {
  item: FoodItem;
  onGenerateDescription: (id: number, name: string) => void;
}

const FoodCard = ({ item, onGenerateDescription }: FoodCardProps): React.ReactNode => {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-slate-800 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white w-full">
        <h3 className="text-2xl font-bold tracking-tight text-white mb-2">{item.name}</h3>
        <p className="text-slate-300 h-24 text-sm overflow-hidden">{item.description}</p>
        <button
          onClick={() => onGenerateDescription(item.id, item.name)}
          disabled={item.generatingDescription}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-500 disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          {item.generatingDescription ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="h-4 w-4" />
              AI Describe
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
