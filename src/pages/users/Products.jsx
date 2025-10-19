import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Heart, Sparkles, Droplet, Wind, Shield, Leaf, Menu, X, User } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToWishlist, removeFromWishlist, isInWishlist, getWishlistCount } = useWishlist();
  const { addToCart, getCartCount } = useCart();
  
  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showNotification(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist(product);
      showNotification(`${product.name} added to wishlist!`);
    }
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: '🧼' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍽️' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
    { id: 'floor', name: 'Floor Care', icon: '🏠' },
    { id: 'laundry', name: 'Laundry', icon: '👕' },
    { id: 'specialty', name: 'Specialty', icon: '✨' }
  ];

  const heroSlides = [
    {
      title: "Premium Cleaning Products",
      subtitle: "Discover our range of eco-friendly, powerful cleaning solutions",
      gradient: "from-emerald-600/90 via-green-500/90 to-teal-500/90",
      image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1920&h=1080&fit=crop"
    },
    {
      title: "Eco-Friendly & Effective",
      subtitle: "Safe for your family, tough on dirt and grime",
      gradient: "from-green-600/90 via-emerald-500/90 to-cyan-500/90",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1920&h=1080&fit=crop"
    },
    {
      title: "Professional Grade Results",
      subtitle: "Transform your home with our premium formulations",
      gradient: "from-teal-600/90 via-green-500/90 to-emerald-500/90",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&h=1080&fit=crop"
    }
  ];

  const products = [
    {
      id: 1,
      name: 'All-Purpose Cleaner',
      category: 'kitchen',
      price: '12.99',
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
      badge: 'Best Seller',
      badgeColor: 'bg-yellow-400',
      features: ['Eco-friendly', 'Multi-surface', 'Fresh scent'],
      description: 'Perfect for all your cleaning needs'
    },
    {
      id: 2,
      name: 'Glass & Mirror Shine',
      category: 'bathroom',
      price: '9.99',
      rating: 4.9,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1600857062243-32359783e749?w=400&h=400&fit=crop',
      badge: 'Top Rated',
      badgeColor: 'bg-blue-400',
      features: ['Streak-free', 'Quick-dry', 'No ammonia'],
      description: 'Crystal clear shine every time'
    },
    {
      id: 3,
      name: 'Heavy Duty Degreaser',
      category: 'kitchen',
      price: '15.99',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1585417791023-6631670d14d8?w=400&h=400&fit=crop',
      badge: 'New',
      badgeColor: 'bg-green-400',
      features: ['Industrial strength', 'Fast-acting', 'Biodegradable'],
      description: 'Tackles the toughest grease'
    },
    {
      id: 4,
      name: 'Disinfectant Spray',
      category: 'bathroom',
      price: '13.99',
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
      badge: 'Best Seller',
      badgeColor: 'bg-yellow-400',
      features: ['Kills 99.9% germs', 'Hospital grade', 'Safe formula'],
      description: 'Protection you can trust'
    },
    {
      id: 5,
      name: 'Wood Floor Polish',
      category: 'floor',
      price: '18.99',
      rating: 4.8,
      reviews: 143,
      image: 'https://images.unsplash.com/photo-1586023492125-27d5d33845e5?w=400&h=400&fit=crop',
      badge: null,
      features: ['Natural shine', 'No residue', 'Long-lasting'],
      description: 'Brings out natural beauty'
    },
    {
      id: 6,
      name: 'Fabric Softener',
      category: 'laundry',
      price: '11.99',
      rating: 4.6,
      reviews: 278,
      image: 'https://images.unsplash.com/photo-1600857062243-32359783e749?w=400&h=400&fit=crop',
      badge: null,
      features: ['Extra soft', 'Fresh scent', 'Gentle on fabrics'],
      description: 'Soft and fresh laundry'
    },
    {
      id: 7,
      name: 'Stainless Steel Cleaner',
      category: 'specialty',
      price: '14.99',
      rating: 4.7,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1585417791023-6631670d14d8?w=400&h=400&fit=crop',
      badge: 'Top Rated',
      badgeColor: 'bg-blue-400',
      features: ['Fingerprint-free', 'Protective coating', 'Professional grade'],
      description: 'Showroom shine at home'
    },
    {
      id: 8,
      name: 'Carpet Stain Remover',
      category: 'floor',
      price: '16.99',
      rating: 4.8,
      reviews: 201,
      image: 'https://images.unsplash.com/photo-1586023492125-27d5d33845e5?w=400&h=400&fit=crop',
      badge: 'New',
      badgeColor: 'bg-green-400',
      features: ['Deep cleaning', 'Odor eliminator', 'Fast action'],
      description: 'Say goodbye to stains'
    },
    {
      id: 9,
      name: 'Toilet Bowl Cleaner',
      category: 'bathroom',
      price: '8.99',
      rating: 4.9,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
      badge: 'Best Seller',
      badgeColor: 'bg-yellow-400',
      features: ['Clinging formula', 'Fresh scent', 'Powerful clean'],
      description: 'Deep clean and fresh'
    },
    {
      id: 10,
      name: 'Granite & Stone Cleaner',
      category: 'specialty',
      price: '13.99',
      rating: 4.7,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
      badge: null,
      features: ['pH balanced', 'Shine enhancer', 'Seal safe'],
      description: 'Perfect for natural stone'
    },
    {
      id: 11,
      name: 'Laundry Detergent Pods',
      category: 'laundry',
      price: '19.99',
      rating: 4.8,
      reviews: 523,
      image: 'https://images.unsplash.com/photo-1600857062243-32359783e749?w=400&h=400&fit=crop',
      badge: 'Best Seller',
      badgeColor: 'bg-yellow-400',
      features: ['Pre-measured', 'Cold water formula', 'Concentrated power'],
      description: 'Convenient and effective'
    },
    {
      id: 12,
      name: 'Oven & Grill Cleaner',
      category: 'kitchen',
      price: '17.99',
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1585417791023-6631670d14d8?w=400&h=400&fit=crop',
      badge: null,
      features: ['Heavy duty', 'Fume-free', 'Fast-acting'],
      description: 'Cuts through baked-on grease'
    },
    {
      id: 13,
      name: 'Bathroom Mold Remover',
      category: 'bathroom',
      price: '14.99',
      rating: 4.7,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
      badge: null,
      features: ['Prevents regrowth', 'No bleach', 'Fresh scent'],
      description: 'Eliminates mold and mildew'
    },
    {
      id: 14,
      name: 'Hardwood Floor Cleaner',
      category: 'floor',
      price: '16.99',
      rating: 4.8,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1586023492125-27d5d33845e5?w=400&h=400&fit=crop',
      badge: 'Top Rated',
      badgeColor: 'bg-blue-400',
      features: ['Gentle formula', 'Enhances shine', 'Quick dry'],
      description: 'Safe for all wood floors'
    },
    {
      id: 15,
      name: 'Stain Remover Pen',
      category: 'laundry',
      price: '7.99',
      rating: 4.5,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1600857062243-32359783e749?w=400&h=400&fit=crop',
      badge: null,
      features: ['Portable', 'Instant action', 'Works on most fabrics'],
      description: 'On-the-go stain solution'
    },
    {
      id: 16,
      name: 'Marble Surface Cleaner',
      category: 'specialty',
      price: '21.99',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
      badge: 'Premium',
      badgeColor: 'bg-purple-400',
      features: ['pH neutral', 'Streak-free', 'Protects finish'],
      description: 'Luxury care for marble surfaces'
    },
    {
      id: 17,
      name: 'Dish Soap Concentrate',
      category: 'kitchen',
      price: '6.99',
      rating: 4.7,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1585417791023-6631670d14d8?w=400&h=400&fit=crop',
      badge: 'Best Seller',
      badgeColor: 'bg-yellow-400',
      features: ['Tough on grease', 'Gentle on hands', 'Biodegradable'],
      description: 'Powerful cleaning for dishes'
    },
    {
      id: 18,
      name: 'Air Freshener Spray',
      category: 'specialty',
      price: '8.99',
      rating: 4.4,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
      badge: null,
      features: ['Long-lasting', 'Natural scents', 'Eliminates odors'],
      description: 'Fresh scent throughout your home'
    },
    {
      id: 19,
      name: 'Grout Whitener',
      category: 'bathroom',
      price: '12.99',
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
      badge: null,
      features: ['Restores color', 'Prevents mold', 'Easy application'],
      description: 'Brightens and protects grout'
    },
    {
      id: 20,
      name: 'Upholstery Cleaner',
      category: 'floor',
      price: '15.99',
      rating: 4.7,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1586023492125-27d5d33845e5?w=400&h=400&fit=crop',
      badge: 'New',
      badgeColor: 'bg-green-400',
      features: ['Safe for fabrics', 'No residue', 'Quick drying'],
      description: 'Revitalizes furniture and carpets'
    },
    {
      id: 21,
      name: 'Lime Scale Remover',
      category: 'bathroom',
      price: '11.99',
      rating: 4.8,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
      badge: null,
      features: ['Dissolves scale', 'Prevents buildup', 'Works on chrome'],
      description: 'Eliminates tough water stains'
    },
    {
      id: 22,
      name: 'Antibacterial Wipes',
      category: 'kitchen',
      price: '5.99',
      rating: 4.5,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
      badge: null,
      features: ['Disposable', 'Kills germs', 'Fresh scent'],
      description: 'Quick and convenient cleaning'
    },
    {
      id: 23,
      name: 'Leather Cleaner & Conditioner',
      category: 'specialty',
      price: '24.99',
      rating: 4.9,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1585417791023-6631670d14d8?w=400&h=400&fit=crop',
      badge: 'Premium',
      badgeColor: 'bg-purple-400',
      features: ['Cleans & conditions', 'UV protection', 'Restores shine'],
      description: 'Professional leather care'
    },
    {
      id: 24,
      name: 'Drain Unclogger',
      category: 'bathroom',
      price: '9.99',
      rating: 4.3,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
      badge: null,
      features: ['Fast acting', 'Safe for pipes', 'Prevents future clogs'],
      description: 'Clears blocked drains quickly'
    },
    {
      id: 25,
      name: 'Window Cleaner Concentrate',
      category: 'specialty',
      price: '14.99',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1600857062243-32359783e749?w=400&h=400&fit=crop',
      badge: 'Eco Choice',
      badgeColor: 'bg-green-400',
      features: ['Streak-free', 'Concentrated', 'Environmentally friendly'],
      description: 'Professional window cleaning results'
    },
    {
      id: 26,
      name: 'Pet Stain & Odor Remover',
      category: 'specialty',
      price: '16.99',
      rating: 4.7,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1586023492125-27d5d33845e5?w=400&h=400&fit=crop',
      badge: 'Pet Safe',
      badgeColor: 'bg-blue-400',
      features: ['Enzyme formula', 'Eliminates odors', 'Safe for pets'],
      description: 'Specifically for pet accidents'
    },
    {
      id: 27,
      name: 'Copper Cleaner',
      category: 'specialty',
      price: '18.99',
      rating: 4.6,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1585417791023-6631670d14d8?w=400&h=400&fit=crop',
      badge: null,
      features: ['Restores shine', 'Protective coating', 'Easy to use'],
      description: 'Brings copper back to life'
    },
    {
      id: 28,
      name: 'Rust Remover Gel',
      category: 'specialty',
      price: '13.99',
      rating: 4.4,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
      badge: null,
      features: ['Clings to surfaces', 'No scrubbing', 'Works in minutes'],
      description: 'Easy rust removal solution'
    },
    {
      id: 29,
      name: 'Granite Sealer',
      category: 'specialty',
      price: '22.99',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
      badge: 'Premium',
      badgeColor: 'bg-purple-400',
      features: ['Long protection', 'Enhances color', 'Stain resistant'],
      description: 'Professional-grade stone protection'
    },
    {
      id: 30,
      name: 'All-Natural Citrus Cleaner',
      category: 'kitchen',
      price: '10.99',
      rating: 4.7,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1585417791023-6631670d14d8?w=400&h=400&fit=crop',
      badge: 'Eco Choice',
      badgeColor: 'bg-green-400',
      features: ['100% natural', 'Citrus scent', 'Biodegradable'],
      description: 'Powerful cleaning from nature'
    },
    {
      id: 31,
      name: 'Electronic Screen Cleaner',
      category: 'specialty',
      price: '8.99',
      rating: 4.6,
      reviews: 223,
      image: 'https://images.unsplash.com/photo-1600857062243-32359783e749?w=400&h=400&fit=crop',
      badge: null,
      features: ['Streak-free', 'Anti-static', 'Safe for all screens'],
      description: 'Crystal clear screens'
    },
    {
      id: 32,
      name: 'Grill Cleaner Spray',
      category: 'kitchen',
      price: '12.99',
      rating: 4.5,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1585417791023-6631670d14d8?w=400&h=400&fit=crop',
      badge: null,
      features: ['Cuts through grease', 'Food safe', 'Easy spray'],
      description: 'Perfect for outdoor grills'
    },
    {
      id: 33,
      name: 'Jewelry Cleaning Solution',
      category: 'specialty',
      price: '15.99',
      rating: 4.8,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
      badge: 'Premium',
      badgeColor: 'bg-purple-400',
      features: ['Safe for all metals', 'Restores shine', 'Quick soak'],
      description: 'Professional jewelry cleaning'
    },
    {
      id: 34,
      name: 'Concrete Cleaner',
      category: 'specialty',
      price: '19.99',
      rating: 4.4,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1586023492125-27d5d33845e5?w=400&h=400&fit=crop',
      badge: null,
      features: ['Heavy duty', 'Removes oil stains', 'Outdoor safe'],
      description: 'Cleans driveways and patios'
    },
    {
      id: 35,
      name: 'Baby Safe Cleaner',
      category: 'specialty',
      price: '11.99',
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1600857062243-32359783e749?w=400&h=400&fit=crop',
      badge: 'Family Safe',
      badgeColor: 'bg-blue-400',
      features: ['Non-toxic', 'Hypoallergenic', 'Gentle formula'],
      description: 'Safe for homes with children'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar cartItemCount={getCartCount()} wishlistCount={getWishlistCount()} />
      
      {/* Hero Section with Swiper */}
      <div className="relative overflow-hidden">
        <div className="relative h-[500px] sm:h-[600px]">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="h-full relative overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 h-full flex flex-col justify-center text-white">
                  <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white max-w-2xl mx-auto mb-8 drop-shadow-md">
                      {slide.subtitle}
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-emerald-500" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 text-lg transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 animate-slide-up ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-xl">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4 animate-bounce">🔍</div>
            <p className="text-xl text-gray-600">No products found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              const inWishlist = isInWishlist(product.id);
              
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Product Image */}
                  <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 p-8 flex items-center justify-center h-48 overflow-hidden">
                    {product.badge && (
                      <div className={`absolute top-3 left-3 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse z-10`}>
                        {product.badge}
                      </div>
                    )}
                    
                    {/* Wishlist Button */}
                    <button 
                      onClick={() => handleWishlistToggle(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
                        inWishlist 
                          ? 'bg-red-500 text-white shadow-lg' 
                          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent transition-all duration-500"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full hover:bg-green-100 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-semibold text-gray-900">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-2xl font-bold text-emerald-600">
                        R{product.price}
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-3 rounded-full hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 py-16 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="text-5xl mb-6 animate-bounce">💬</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-white mb-8">
            Our cleaning experts are here to help you find the perfect products
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Products;