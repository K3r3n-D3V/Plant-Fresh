import React, { useState, useRef } from 'react';
import { MapPin, Mail, Phone, Edit2, Save, X, Camera, ShoppingBag, Heart, CreditCard, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import Navbar from '../../components/common/Navbar';
import { useCart } from '../../context/CartContext';

export default function Profile() {
  const { user } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { getCartCount, addToCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const fileInputRef = useRef(null);

  const [editedUser, setEditedUser] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+1 (570) 123-4567',
    address: '896 Jaxlene Street',
    city: 'Boston',
    country: 'United States',
    state: 'Massachusetts',
    zip: '02116',
    dateOfBirth: '18 June 1990',
    gender: 'Female'
  });

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [newCard, setNewCard] = useState({
    type: 'VISA',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolder: '',
    isDefault: false
  });

  // Mock order history data
  const [orderHistory] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: [
        { name: 'All-Purpose Cleaner', quantity: 2, price: 12.99 },
        { name: 'Glass & Mirror Shine', quantity: 1, price: 9.99 }
      ],
      total: 35.97,
      status: 'Delivered'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: [
        { name: 'Disinfectant Spray', quantity: 1, price: 13.99 },
        { name: 'Toilet Bowl Cleaner', quantity: 1, price: 8.99 }
      ],
      total: 22.98,
      status: 'Shipped'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      items: [
        { name: 'Laundry Detergent Pods', quantity: 1, price: 19.99 }
      ],
      total: 19.99,
      status: 'Processing'
    }
  ]);

  const handleSave = () => {
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: '+1 (570) 123-4567',
      address: '896 Jaxlene Street',
      city: 'Boston',
      country: 'United States',
      state: 'Massachusetts',
      zip: '02116',
      dateOfBirth: '18 June 1990',
      gender: 'Female'
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddToCartFromWishlist = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleNewCardChange = (field, value) => {
    setNewCard(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCard = () => {
    if (newCard.cardNumber && newCard.expiry && newCard.cvv && newCard.cardHolder) {
      const card = {
        ...newCard,
        id: Date.now(),
        balance: 0.00
      };
      
      if (newCard.isDefault) {
        setPaymentMethods(prev => 
          prev.map(card => ({ ...card, isDefault: false }))
            .concat([card])
        );
      } else {
        setPaymentMethods(prev => [...prev, card]);
      }
      
      setNewCard({
        type: 'VISA',
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardHolder: '',
        isDefault: false
      });
      setShowAddCard(false);
    }
  };

  const handleRemoveCard = (cardId) => {
    setPaymentMethods(prev => prev.filter(card => card.id !== cardId));
  };

  const handleSetDefault = (cardId) => {
    setPaymentMethods(prev => 
      prev.map(card => ({
        ...card,
        isDefault: card.id === cardId
      }))
    );
  };

  const getCardGradient = (type) => {
    switch (type) {
      case 'VISA':
        return 'from-emerald-500 via-green-500 to-teal-500';
      case 'MASTERCARD':
        return 'from-green-500 via-emerald-500 to-teal-500';
      case 'AMEX':
        return 'from-teal-500 via-emerald-500 to-green-500';
      default:
        return 'from-gray-500 via-gray-600 to-gray-700';
    }
  };

  const getCardLogo = (type) => {
    switch (type) {
      case 'VISA':
        return 'VISA';
      case 'MASTERCARD':
        return 'MC';
      case 'AMEX':
        return 'AMEX';
      default:
        return 'CARD';
    }
  };

  const formatCardNumber = (number) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Account Details */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Account Details</h3>
          {isEditing ? (
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300"
              >
                <Save size={20} />
              </button>
              <button 
                onClick={handleCancel}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 flex items-center gap-2"
            >
              <Edit2 size={16} />
              Edit
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {isEditing ? (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={editedUser.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value={editedUser.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">Date of Birth</label>
                <input
                  type="text"
                  value={editedUser.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">Gender</label>
                <select
                  value={editedUser.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">First Name</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.firstName}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">Last Name</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.lastName}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">Email</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.email}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">Phone</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.phone}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">Date of Birth</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">Gender</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.gender}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Shipping Address</h3>
          {isEditing ? (
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300"
              >
                <Save size={20} />
              </button>
              <button 
                onClick={handleCancel}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 flex items-center gap-2"
            >
              <Edit2 size={16} />
              Edit
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {isEditing ? (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">Address</label>
                <input
                  type="text"
                  value={editedUser.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">City</label>
                <input
                  type="text"
                  value={editedUser.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">Country</label>
                <input
                  type="text"
                  value={editedUser.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">State</label>
                <input
                  type="text"
                  value={editedUser.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-sm font-medium">Zip Code</label>
                <input
                  type="text"
                  value={editedUser.zip}
                  onChange={(e) => handleInputChange('zip', e.target.value)}
                  className="border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">Address</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.address}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">City</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.city}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">Country</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.country}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">State</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.state}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-green-50">
                <span className="text-gray-600 text-sm">Zip</span>
                <span className="text-gray-800 font-semibold text-sm">{editedUser.zip}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Payment Methods</h3>
          <button 
            onClick={() => setShowAddCard(true)}
            className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Card
          </button>
        </div>

        {showAddCard && (
          <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-100">
            <h4 className="font-bold text-gray-800 mb-4">Add New Card</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 text-sm font-medium mb-2 block">Card Type</label>
                <select
                  value={newCard.type}
                  onChange={(e) => handleNewCardChange('type', e.target.value)}
                  className="w-full border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                >
                  <option value="VISA">VISA</option>
                  <option value="MASTERCARD">MasterCard</option>
                  <option value="AMEX">American Express</option>
                </select>
              </div>
              <div>
                <label className="text-gray-600 text-sm font-medium mb-2 block">Card Holder</label>
                <input
                  type="text"
                  value={newCard.cardHolder}
                  onChange={(e) => handleNewCardChange('cardHolder', e.target.value)}
                  placeholder="Full Name"
                  className="w-full border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="text-gray-600 text-sm font-medium mb-2 block">Card Number</label>
                <input
                  type="text"
                  value={newCard.cardNumber}
                  onChange={(e) => handleNewCardChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-600 text-sm font-medium mb-2 block">Expiry</label>
                  <input
                    type="text"
                    value={newCard.expiry}
                    onChange={(e) => handleNewCardChange('expiry', e.target.value)}
                    placeholder="MM/YY"
                    className="w-full border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-medium mb-2 block">CVV</label>
                  <input
                    type="text"
                    value={newCard.cvv}
                    onChange={(e) => handleNewCardChange('cvv', e.target.value)}
                    placeholder="123"
                    className="w-full border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newCard.isDefault}
                  onChange={(e) => handleNewCardChange('isDefault', e.target.checked)}
                  className="rounded border-green-300 text-emerald-500 focus:ring-emerald-500"
                />
                <label className="text-gray-600 text-sm font-medium">Set as default card</label>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleAddCard}
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-medium"
              >
                Save Card
              </button>
              <button 
                onClick={() => setShowAddCard(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {paymentMethods.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No payment methods added</p>
              <p className="text-gray-400">Add a card to make checkout faster!</p>
            </div>
          ) : (
            paymentMethods.map((card) => (
              <div key={card.id} className="border border-green-100 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5">
                    <div className={`bg-gradient-to-br ${getCardGradient(card.type)} rounded-2xl p-6 text-white shadow-lg h-52 flex flex-col justify-between`}>
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-10 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-md opacity-90"></div>
                        <div className="text-2xl font-bold tracking-wider">{getCardLogo(card.type)}</div>
                      </div>
                      <div className="text-2xl tracking-widest font-medium">
                        {formatCardNumber(card.cardNumber)}
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-80 uppercase tracking-wide mb-1">Valid Thru</div>
                          <div className="text-sm font-medium">{card.expiry}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-80 uppercase tracking-wide mb-1">Card Holder</div>
                          <div className="text-sm font-medium">{card.cardHolder}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-green-100">
                        <span className="text-gray-600 text-sm font-medium">Card Type</span>
                        <span className="text-gray-800 font-semibold text-sm">{card.type}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-green-100">
                        <span className="text-gray-600 text-sm font-medium">Card Holder</span>
                        <span className="text-gray-800 font-semibold text-sm">{card.cardHolder}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-green-100">
                        <span className="text-gray-600 text-sm font-medium">Card Number</span>
                        <span className="text-gray-800 font-semibold text-sm">{formatCardNumber(card.cardNumber)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-green-100">
                        <span className="text-gray-600 text-sm font-medium">Balance</span>
                        <span className="text-emerald-600 font-bold text-sm">R{card.balance.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-green-100">
                        <span className="text-gray-600 text-sm font-medium">Status</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          card.isDefault ? 'bg-emerald-100 text-emerald-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {card.isDefault ? 'Default' : 'Active'}
                        </span>
                      </div>
                      <div className="flex gap-3 pt-4">
                        {!card.isDefault && (
                          <button 
                            onClick={() => handleSetDefault(card.id)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold hover:underline"
                          >
                            Set as Default
                          </button>
                        )}
                        <button 
                          onClick={() => handleRemoveCard(card.id)}
                          className="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1 hover:underline"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderWishlistTab = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-50">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-gray-800">My Wishlist</h3>
        <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
          {wishlistItems.length} items
        </span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-green-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">Your wishlist is empty</p>
          <p className="text-gray-400">Start adding products you love!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border border-green-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-white">
              <div className="w-full h-40 bg-green-50 rounded-lg mb-3 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
              <p className="text-emerald-600 font-bold text-lg mb-2">R{item.price}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAddToCartFromWishlist(item)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOrdersTab = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-50">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingBag className="w-6 h-6 text-emerald-500" />
        <h3 className="text-xl font-bold text-gray-800">Order History</h3>
      </div>

      {orderHistory.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-green-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No orders yet</p>
          <p className="text-gray-400">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orderHistory.map((order) => (
            <div key={order.id} className="border border-green-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-800">Order {order.id}</h4>
                  <p className="text-gray-500 text-sm">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl text-emerald-600">R{order.total.toFixed(2)}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-green-100 pt-4">
                <h5 className="font-semibold text-gray-700 mb-2">Items:</h5>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-1">
                      <span className="text-gray-600">{item.quantity}x {item.name}</span>
                      <span className="text-emerald-600 font-semibold">R{(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navbar cartItemCount={getCartCount()} />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Account</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-6 border border-green-50">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden shadow-lg">
                      {profileImage ? (
                        <img 
                          src={profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials()
                      )}
                    </div>
                    <button 
                      onClick={triggerFileInput}
                      className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-green-50 transition-all duration-300 border border-green-100"
                    >
                      <Camera size={16} className="text-emerald-600" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {user?.name || 'User'}
                  </h2>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg mb-6 flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                  </button>
                </div>

                {/* Navigation Tabs */}
                <div className="border-t border-green-100 pt-6 space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                      activeTab === 'profile' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                        : 'text-gray-600 hover:bg-green-50 hover:text-emerald-600'
                    }`}
                  >
                    Profile Information
                  </button>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                      activeTab === 'wishlist' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                        : 'text-gray-600 hover:bg-green-50 hover:text-emerald-600'
                    }`}
                  >
                    My Wishlist
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                      activeTab === 'orders' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                        : 'text-gray-600 hover:bg-green-50 hover:text-emerald-600'
                    }`}
                  >
                    Order History
                  </button>
                </div>

                <div className="border-t border-green-100 pt-6 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <MapPin size={18} className="text-emerald-500" />
                    <span>Hong Kong, China</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Mail size={18} className="text-emerald-500" />
                    <span>{user?.email || 'No email'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Phone size={18} className="text-emerald-500" />
                    <span>{editedUser.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'wishlist' && renderWishlistTab()}
              {activeTab === 'orders' && renderOrdersTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}