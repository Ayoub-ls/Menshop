import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else {
          setProducts([]);
        }
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-900" size={48} />
      </div>
    );
  }

  const featuredProducts = products.filter(p => p.featured).slice(0, 7);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-screen min-h-[600px] md:min-h-[800px] flex items-center overflow-hidden mx-4 md:mx-0 mt-4 md:mt-0 rounded-3xl md:rounded-none">
        <div className="absolute inset-0 z-0">
          <div className='bg-gradient-to-r from-black via-black/50 to-white z-10 h-full w-full'>
            <img
              src="./hero-min.jpeg"
              alt="Hero"
              className="h-full w-full object-cover scale-105 animate-slow-zoom"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto md:mx-0 space-y-6 md:space-y-8"
          >
            <div className="space-y-4">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white">
                Editorial FW24
              </p>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] uppercase">
                The New <br className="hidden md:block" /> Minimal
              </h1>
              <p className="text-sm md:text-xl text-slate-100 leading-relaxed max-w-xs md:max-w-lg mx-auto md:mx-0">
                Sculptural silhouettes and refined textures for the modern avant-garde.
              </p>
            </div>

            <div className="flex justify-center md:justify-start">
              <Link
                to="/shop"
                className="bg-white text-slate-900 px-10 py-5 rounded-2xl text-xs md:text-sm font-bold shadow-2xl hover:bg-slate-100 transition-all hover:scale-105 uppercase tracking-widest"
              >
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Browse Collections */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-8 md:mb-12 space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Browse Collections</h2>
          <div className="h-1 w-12 bg-slate-900 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Mobile Collection Cards */}
          <div className="md:hidden space-y-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${cat.name}`}
                className="flex bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50 h-32"
              >
                <div className="flex-1 p-6 flex flex-col justify-center space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{cat.name}</h3>
                  <p className="text-[10px] text-slate-400 font-medium">24 Items</p>
                  <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 pt-2">
                    Shop Now <ArrowRight size={12} className="ml-2" />
                  </div>
                </div>
                <div className="w-1/2 relative">
                  <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop Collection Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 col-span-3 auto-rows-[400px]">
            {categories.map((cat, idx) => (
              <CategoryCard key={cat.name} category={cat} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Atelier Pieces */}
      <section className="bg-slate-50/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-end mb-10 md:mb-16">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">Atelier Pieces</h2>
              <p className="text-slate-500 text-xs md:text-sm">Limited runs, handcrafted quality.</p>
            </div>
            <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 underline">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] max-w-4/5 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="./craft-min.jpeg"
                alt="Craftsmanship"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 right-10 bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-xs border border-slate-100"
            >
              <div className="space-y-4">
                <div className="text-4xl font-bold text-slate-900">100%</div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Traceable materials sourced from the finest global mills.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                The Modern Standard of Craftsmanship.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                We believe in the longevity of design. Our atelier focuses on creating a cohesive digital experience that translates into physical perfection—where every stitch is intentional and every fabric is selected for its soul.
              </p>
            </div>
            <button className="group flex items-center text-slate-900 font-bold uppercase tracking-widest text-sm">
              Explore the Collection
              <span className="ml-4 p-3 bg-slate-900 text-white rounded-full group-hover:translate-x-2 transition-transform">
                <ArrowRight size={18} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
