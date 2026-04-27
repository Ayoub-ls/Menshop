import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, CreditCard, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

const wilayas = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna",
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira",
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
  "16 - Algiers", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - El M'Ghair", "50 - El Meniaa",
  "51 - Ouled Djellal", "52 - Bordj Baji Mokhtar", "53 - Béni Abbès", "54 - Timimoun",
  "55 - Touggourt", "56 - Djanet", "57 - In Salah", "58 - In Guezzam"
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal, shipping, tax, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    state: '',
    address: '',
    shippingMethod: 'standard'
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setLoading(true);
    try {
      const orderData = {
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          state: formData.state
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        financials: {
          subtotal,
          tax,
          shippingCost: formData.shippingMethod === 'express' ? 25 : 0,
          total: total + (formData.shippingMethod === 'express' ? 25 : 0),
          shippingMethod: formData.shippingMethod
        }
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        clearCart();
        alert('Order placed successfully! We will contact you soon.');
        navigate('/');
      } else {
        const data = await res.json();
        alert(`Failed to place order: ${data.message}`);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("An error occurred while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Checkout Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="p-3 bg-white rounded-full shadow-sm border border-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Checkout</h1>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 space-y-10"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Shipping Information</h2>
                <p className="text-slate-500 text-sm">Review your curated selection and provide delivery details.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Full Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    placeholder="Foulan Foulan"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 placeholder:text-slate-300 focus:ring-2 focus:ring-slate-200 transition-all text-sm font-medium"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="+213 (000) 00-00-00"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 placeholder:text-slate-300 focus:ring-2 focus:ring-slate-200 transition-all text-sm font-medium"
                  />
                </div>

                {/* State (Algerian Wilayas) */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Wilaya (State)</label>
                  <div className="relative">
                    <select
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 appearance-none focus:ring-2 focus:ring-slate-200 transition-all text-sm font-medium pr-12"
                    >
                      <option value="" disabled>Select State</option>
                      {wilayas.map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                {/* Shipping Method (Visualized as selectable cards) */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Shipping Method</label>
                  <div className="space-y-4">
                    <label className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all cursor-pointer ${formData.shippingMethod === 'standard' ? 'border-slate-900 bg-slate-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.shippingMethod === 'standard' ? 'border-slate-900' : 'border-slate-200'}`}>
                          {formData.shippingMethod === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900">Standard Shipping</p>
                          <p className="text-xs text-slate-500">3-5 Business Days</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-900">Complimentary</span>
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        className="hidden"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all cursor-pointer ${formData.shippingMethod === 'express' ? 'border-slate-900 bg-slate-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.shippingMethod === 'express' ? 'border-slate-900' : 'border-slate-200'}`}>
                          {formData.shippingMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900">Express Delivery</p>
                          <p className="text-xs text-slate-500">24-48 Hours</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-900">$25.00</span>
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        className="hidden"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                </div>
              </form>
            </motion.section>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-100/50 p-6 rounded-3xl border border-slate-100 flex items-start space-x-4"
            >
              <div className="bg-white p-2 rounded-xl text-slate-400">
                <ShieldCheck size={20} />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                By proceeding with this transaction, you agree to our <Link to="#" className="text-slate-900 font-bold underline">Terms of Service</Link>. Your data is processed securely through our encrypted gateway.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 sticky top-8"
            >
              <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-8">Order Summary</h2>

              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-24 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900 uppercase tracking-tight line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Size {item.size} / Qty {item.quantity}</p>
                        <p className="text-sm font-bold text-slate-900 md:hidden mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="hidden md:block text-sm font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-50">
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Shipping</span>
                  <span className="text-slate-900 font-bold">{formData.shippingMethod === 'express' ? '$25.00' : 'Complimentary'}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Estimated Tax</span>
                  <span className="text-slate-900 font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-6">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900">
                    ${(total + (formData.shippingMethod === 'express' ? 25 : 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-slate-600 text-white py-5 rounded-2xl text-sm font-bold shadow-2xl hover:bg-slate-700 transition-all items-center justify-center group flex mt-10 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Complete Purchase'}
                {!loading && <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />}
              </button>

              <div className="flex items-center justify-center space-x-2 mt-6 text-slate-400">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted SSL Secure Checkout</span>
              </div>
            </motion.div>

            {/* Member Perk Card (Inspired by second image bottom section) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-4 overflow-hidden relative"
            >
              <div className="relative z-10 flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                  <CreditCard size={24} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Atelier Member Perk</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Earn 4.5 points per $1</p>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
