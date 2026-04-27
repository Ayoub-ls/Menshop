import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category, index }) => {
  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative group overflow-hidden rounded-3xl bg-slate-100 ${
        isLarge ? 'md:col-span-2' : 'md:col-span-1'
      } aspect-[16/9] md:aspect-auto h-80 md:h-auto`}
    >
      <Link to={`/shop?category=${category.name}`} className="block h-full">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {category.name}
            </h3>
            <p className="text-slate-200 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {category.description}
            </p>
            <div className="flex items-center text-white text-xs font-bold uppercase tracking-widest pt-4 group-hover:translate-x-2 transition-transform duration-500">
              Explore Collection <ArrowRight size={14} className="ml-2" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
