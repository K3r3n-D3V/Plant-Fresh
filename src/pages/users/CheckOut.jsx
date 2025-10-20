import React, { useState } from 'react';
import { CreditCard, ShoppingBag, Lock, Truck, ChevronRight, User, Shield, ArrowLeft, Package, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    savePayment: true
  });
  
  const cartItems = [
    { 
      id: 1, 
      name: 'All-Purpose Cleaner', 
      price: 12.99, 
      quantity: 2, 
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Disinfectant Spray', 
      price: 13.99, 
      quantity: 1, 
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Laundry Detergent Pods', 
      price: 19.99, 
      quantity: 3, 
      image: 'https://images.unsplash.com/photo-1600857062243-32359783e749?w=400&h=400&fit=crop' 
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Cart</span>
                  <ChevronRight size={14} />
                  <span>Information</span>
                  <ChevronRight size={14} />
                  <span className="text-emerald-600 font-semibold">Payment</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-emerald-200 shadow-sm">
              <User size={18} className="text-emerald-600" />
              <span className="font-semibold text-gray-800 text-sm">John Doe</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                  <User className="text-white" size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                  <Truck className="text-white" size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                  <input 
                    type="text" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                  <CreditCard className="text-white" size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Method</h2>
              </div>

              {/* Payment Options */}
              <div className="space-y-3 mb-6">
                <div 
                  onClick={() => setSelectedPayment('card')}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === 'card' 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPayment === 'card' ? 'border-emerald-500' : 'border-gray-300'
                  }`}>
                    {selectedPayment === 'card' && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                  </div>
                  <CreditCard size={22} className="text-gray-600" />
                  <span className="font-semibold text-gray-800">Credit Card</span>
                </div>

                <div 
                  onClick={() => setSelectedPayment('paypal')}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === 'paypal' 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPayment === 'paypal' ? 'border-emerald-500' : 'border-gray-300'
                  }`}>
                    {selectedPayment === 'paypal' && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                  </div>
                  <span className="text-2xl">💳</span>
                  <span className="font-semibold text-gray-800">PayPal</span>
                </div>
              </div>

              {/* Card Details */}
              {selectedPayment === 'card' && (
                <div className="space-y-4 border-t pt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                      <input 
                        type="text" 
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      name="savePayment"
                      checked={formData.savePayment}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300 cursor-pointer"
                    />
                    <label className="text-sm font-medium text-gray-700 cursor-pointer">Save payment method for future purchases</label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 sticky top-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900 text-sm">
                        R{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">R{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Tax (8%)</span>
                  <span className="font-semibold">R{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-emerald-600">R{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ChevronRight size={20} />
                  </>
                )}
              </button>

              <button className="w-full text-emerald-600 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-all">
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <Lock size={24} className="mx-auto text-emerald-600 mb-2" />
                  <p className="text-xs font-semibold text-gray-700">Secure Payment</p>
                </div>
                <div className="text-center">
                  <Package size={24} className="mx-auto text-emerald-600 mb-2" />
                  <p className="text-xs font-semibold text-gray-700">Free Returns</p>
                </div>
                <div className="text-center">
                  <CheckCircle size={24} className="mx-auto text-emerald-600 mb-2" />
                  <p className="text-xs font-semibold text-gray-700">Quality Guaranteed</p>
                </div>
                <div className="text-center">
                  <Truck size={24} className="mx-auto text-emerald-600 mb-2" />
                  <p className="text-xs font-semibold text-gray-700">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}