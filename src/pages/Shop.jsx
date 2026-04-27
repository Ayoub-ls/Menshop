import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Search, ArrowRight, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'All Products';
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('Latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ['All Products', 'Shirts', 'Pants', 'Jackets', 'Accessories'];
  const sizes = ['S', 'M', 'L', 'XL'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = categoryFilter === 'All Products' || product.category === categoryFilter;
      const matchesPrice = product.price <= priceRange;
      return matchesCategory && matchesPrice;
    });
  }, [categoryFilter, priceRange, products]);

  const handleCategoryChange = (cat) => {
    setSearchParams({ category: cat });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-900" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 space-y-4 md:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900">New Arrivals</h1>
          <p className="text-slate-500 text-xs md:text-sm">Showing {filteredProducts.length} products</p>
        </div>

        <div className="flex md:hidden items-center space-x-3 w-full">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Filter size={14} />
            <span>Filters</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm">
            <ArrowRight size={14} className="rotate-90" />
            <span>Sort By</span>
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search collection..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-slate-900 transition-all"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <AnimatePresence>
          {(isFilterOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full lg:w-64 space-y-12 overflow-hidden lg:overflow-visible"
            >
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">Category</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`flex justify-between items-center w-full text-sm font-medium transition-colors ${categoryFilter === cat ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                      {cat}
                      <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-400">
                        {cat === 'All Products' ? products.length : products.filter(p => p.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>$0</span>
                    <span>$1,000+</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900">Up to ${priceRange}</p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-1 space-y-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of {products.length} items
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border-none rounded-xl text-sm font-bold py-2 pl-4 pr-10 focus:ring-2 focus:ring-slate-900"
              >
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
