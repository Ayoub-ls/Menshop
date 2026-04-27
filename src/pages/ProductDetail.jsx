import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag, Heart, Minus, Plus, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState('composition');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProduct(data);
        
        // Fetch related products
        const relatedRes = await fetch(`/api/products?category=${data.category}`);
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          if (Array.isArray(relatedData)) {
            setRelatedProducts(relatedData.filter(p => p.id !== data.id).slice(0, 4));
          } else {
            setRelatedProducts([]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-900" size={48} />
      </div>
    );
  }

  if (!product) return <div className="min-h-screen flex items-center justify-center text-xl text-slate-500">Product not found</div>;

  const images = [
    product.image,
    `https://picsum.photos/seed/${product.id}-2/800/1000`,
    `https://picsum.photos/seed/${product.id}-3/800/1000`,
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  return (
    <div className="max-w-7xl mx-auto px-0 md:px-8 py-0 md:py-12 space-y-12 md:space-y-24 pb-32 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-16">
        {/* Product Gallery */}
        <div className="space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] md:aspect-[4/5] md:rounded-3xl overflow-hidden bg-slate-100 relative"
          >
            <img
              src={images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full text-slate-900 shadow-sm md:hidden">
              <Heart size={20} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 md:hidden">
              {images.map((_, idx) => (
                <div key={idx} className={`h-1.5 w-1.5 rounded-full ${activeImage === idx ? 'bg-white w-4' : 'bg-white/40'} transition-all`} />
              ))}
            </div>
          </motion.div>
          <div className="hidden md:grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === idx ? 'border-slate-900 scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-6 md:px-0 space-y-8 md:space-y-10 mt-8 md:mt-0">
          <div className="space-y-2 md:space-y-4">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Atelier Collection</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-tight uppercase">
              {product.name}
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-slate-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="bg-slate-50/50 p-6 md:p-0 rounded-3xl md:rounded-none">
            <p className="text-sm md:text-lg text-slate-500 leading-relaxed max-w-lg">
              A masterclass in architectural tailoring. This piece features a structured silhouette, hidden placket, and premium Italian virgin wool. Designed for a timeless look that transitions seamlessly from formal to elevated casual.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-900">Select Size</h3>
              <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2 md:flex md:flex-wrap md:gap-3">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`aspect-square md:w-14 md:h-14 rounded-xl text-xs md:text-sm font-bold transition-all border flex items-center justify-center ${
                    selectedSize === size
                      ? 'bg-slate-600 text-white border-slate-600 shadow-lg'
                      : 'bg-slate-100 text-slate-500 border-transparent hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Accordions */}
          <div className="space-y-0 border-t border-slate-100">
            {[
              { id: 'composition', title: 'Composition & Care' },
              { id: 'shipping', title: 'Shipping & Returns' }
            ].map((item) => (
              <div key={item.id} className="border-b border-slate-100">
                <button
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  className="w-full py-6 flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-900"
                >
                  {item.title}
                  {openAccordion === item.id ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                <AnimatePresence>
                  {openAccordion === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-xs text-slate-500 leading-relaxed">
                        Crafted from 100% premium Italian virgin wool. Dry clean only. Handle with care to maintain the architectural structure of the garment.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Add to Cart */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center bg-slate-50 rounded-2xl p-1 shadow-inner">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-slate-600 text-white py-5 rounded-2xl text-sm font-bold shadow-2xl hover:bg-slate-700 transition-all flex items-center justify-center space-x-3"
            >
              <ShoppingBag size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Add to Cart */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-slate-100 p-4 z-40">
        <button
          onClick={handleAddToCart}
          className="w-full bg-slate-600 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3"
        >
          <ShoppingBag size={16} />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Complete the Look */}
      <section className="px-6 md:px-0 space-y-8 md:space-y-12">
        <h2 className="text-lg md:text-3xl font-bold tracking-tight text-slate-900 uppercase">Complete the Look</h2>
        <div className="flex overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 gap-6 md:gap-8 no-scrollbar">
          {relatedProducts.map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
