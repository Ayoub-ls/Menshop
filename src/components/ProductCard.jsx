import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {product.new && (
            <span className="absolute top-4 left-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              New In
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic
            }}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm"
          >
            <Heart size={18} />
          </button>
          
          <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl text-sm font-bold shadow-xl hover:bg-slate-800 transition-colors">
              View Details
            </button>
          </div>
        </div>
        
        <div className="mt-4 md:mt-6 space-y-1 px-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {product.category}
              </p>
              <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-slate-600 transition-colors uppercase tracking-tight">
                {product.name}
              </h3>
            </div>
            <p className="text-sm md:text-base font-medium text-slate-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
