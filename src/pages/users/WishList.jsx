import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, moveToCart, clearWishlist, getWishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    moveToCart(product, { addToCart });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8">Start adding products you love to your wishlist!</p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{getWishlistCount()} items in your wishlist</p>
          </div>
          <button
            onClick={clearWishlist}
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-all duration-300"
          >
            Clear All
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col h-full">
                {/* Product Image */}
                <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-green-600 mb-4">
                    ${item.price}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-3 text-red-500 hover:text-red-600 transition-colors border border-red-200 hover:border-red-300 rounded-xl"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg flex items-center gap-2 mx-auto"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;