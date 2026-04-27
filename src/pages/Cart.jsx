import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, ArrowRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, subtotal, shipping, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-32 text-center space-y-8">
        <div className="mx-auto w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
          <ShoppingBag size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900">Your Shopping Bag is Empty</h1>
          <p className="text-slate-500 text-sm">Review your selections before heading to checkout.</p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center bg-slate-900 text-white px-10 py-5 rounded-2xl text-sm font-bold shadow-2xl hover:bg-slate-800 transition-all hover:scale-105"
        >
          Continue Browsing the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12 pb-40 md:pb-12">
      <div className="mb-8 md:mb-12 space-y-1 md:space-y-2">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900">Your Cart</h1>
        <p className="text-slate-500 text-xs md:text-sm">{cart.length} items selected</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center p-4 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-sm"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0 w-24 md:w-32 h-32 md:h-40 rounded-2xl overflow-hidden bg-slate-50">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </Link>
                
                <div className="ml-6 md:ml-10 flex-1 flex flex-col justify-between h-full space-y-4 md:space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-base md:text-xl font-bold text-slate-900 uppercase tracking-tight">{item.name}</h3>
                      <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">Midnight / Size {item.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center bg-slate-50 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-xs text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-base md:text-xl font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="bg-white md:bg-slate-50 p-6 md:p-10 rounded-3xl space-y-6 md:space-y-8 shadow-sm md:shadow-none border border-slate-50 md:border-none">
            <h2 className="hidden md:block text-2xl font-bold tracking-tight text-slate-900">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-xs md:text-sm font-medium text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm font-medium text-slate-500">
                <span>Shipping</span>
                <span className="text-slate-900">{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-base md:text-lg font-bold text-slate-900">Total</span>
                <span className="text-xl md:text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="hidden md:flex w-full bg-slate-600 text-white py-5 rounded-2xl text-sm font-bold shadow-2xl hover:bg-slate-700 transition-all items-center justify-center group"
            >
              Proceed to Checkout
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Checkout */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-slate-100 p-6 z-40">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Subtotal</p>
            <p className="text-sm font-bold text-slate-900">${subtotal.toFixed(2)}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Shipping</p>
            <p className="text-sm font-bold text-slate-900">Complimentary</p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-50">
          <span className="text-lg font-bold text-slate-900">Total</span>
          <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-slate-600 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
