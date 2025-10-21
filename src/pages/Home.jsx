import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Sparkles, Shield, Leaf, Heart, TrendingUp, Award, ShoppingCart, Check } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
// import image from '../assets/troy-bridges-nF4Xl7SD9vw-unsplash.jpg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [roomSlide, setRoomSlide] = useState(0);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1920&h=1080&fit=crop",
      title: "Eco-Friendly Cleaning",
      description: "Powerful cleaning that's kind to the planet and your home.",
      buttonText: "Shop Now",
      link: "/products"
    },
    {
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1920&h=1080&fit=crop",
      title: "Sparkling Results",
      description: "Achieve a spotless home without harsh chemicals.",
      buttonText: "Learn More",
      link: "/about"
    },
    {
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&h=1080&fit=crop",
      title: "Professional Grade",
      description: "Commercial strength formulas for residential use.",
      buttonText: "View Products",
      link: "/products"
    }
  ];

  // Faster auto-advance carousel (3 seconds instead of 5)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  // Auto-advance room carousel (4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setRoomSlide((prev) => (prev + 1) % categories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setAddedToCart({ ...addedToCart, [product.id]: true });
    
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const featuredProducts = [
    {
      id: 1,
      name: "All-Purpose Cleaner",
      description: "Versatile cleaner for all surfaces",
      price: "R12.99",
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Glass & Mirror Cleaner",
      description: "Streak-free shine for glass surfaces",
      price: "R10.99",
      image: 'https://images.unsplash.com/photo-1550963295-019d8a8a61c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
      badge: "New"
    },
    {
      id: 3,
      name: "Bathroom Cleaner",
      description: "Powerful formula for tough bathroom stains",
      price: "R14.99",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop",
      badge: "Popular"
    },
    {
      id: 4,
      name: "Floor Cleaner",
      description: "Gentle on floors, tough on dirt",
      price: "R16.99",
      image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop",
      badge: "Eco+"
    }
  ];

  const benefits = [
    {
      icon: <Leaf className="w-10 h-10" />,
      title: "100% Natural",
      description: "Plant-based ingredients"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Non-Toxic",
      description: "Safe for kids & pets"
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "Powerful Clean",
      description: "Professional results"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Cruelty Free",
      description: "Never tested on animals"
    }
  ];

  const categories = [
    {
      name: "Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop",
      count: "12 Products"
    },
    {
      name: "Bathroom",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
      count: "15 Products"
    },
    {
      name: "Living Spaces",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop",
      count: "20 Products"
    },
    {
      name: "Outdoor",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop",
      count: "8 Products"
    }
  ];

  const nextRoom = () => {
    setRoomSlide((prev) => (prev + 1) % categories.length);
  };

  const prevRoom = () => {
    setRoomSlide((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      
      {/* Hero Carousel Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>
            
            <div className="absolute inset-0 flex items-center z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div className={`transform transition-all duration-1000 ${
                    index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}>
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex gap-4">
                      <Link 
                        to={slide.link}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
                      >
                        {slide.buttonText}
                      </Link>
                      <Link 
                        to="/about"
                        className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 border-2 border-white/50"
                      >
                        Our Story
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-12 h-3 bg-white' 
                  : 'w-3 h-3 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Introduction */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-2 rounded-full mb-6 font-semibold">
            <Award className="w-5 h-5" />
            <span>Award-Winning Formula</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Clean Your Home,
            <span className="text-green-600"> Love Your Planet</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect balance of powerful cleaning and environmental responsibility. 
            Our innovative formulas deliver exceptional results while keeping your home safe and healthy.
          </p>
        </div>

        {/* Benefits Cards - New Modern Layout */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-2xl mb-4 shadow-lg">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shop by Room - Gallery Carousel */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold text-gray-900">Shop by Room</h2>
            <Link 
              to="/products"
              className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 group"
            >
              View All
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${roomSlide * 100}%)` }}
              >
                {categories.map((category, index) => (
                  <div 
                    key={index}
                    className="min-w-full relative h-96"
                  >
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                      <h3 className="text-5xl font-bold mb-3">{category.name}</h3>
                      <p className="text-xl text-gray-200 mb-6">{category.count}</p>
                      <Link 
                        to="/products"
                        className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-green-500 hover:text-white transition-all duration-300"
                      >
                        Shop {category.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevRoom}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous room"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextRoom}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next room"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setRoomSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === roomSlide 
                      ? 'w-12 h-3 bg-green-500' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to ${categories[index].name}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Best Sellers with Add to Cart */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Sellers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Customer favorites that deliver outstanding results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className={`${
                        addedToCart[product.id]
                          ? 'bg-green-600'
                          : 'bg-green-500 hover:bg-green-600'
                      } text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2`}
                    >
                      {addedToCart[product.id] ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-16 text-center text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="relative z-10">
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join 50,000+ Happy Customers
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-green-50">
              Start your journey to a cleaner, greener home today. Free shipping on orders over $50!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg inline-block"
              >
                Shop Now
              </Link>
              <Link 
                to="/about"
                className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/50 text-lg inline-block"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>

      </div>

      <Footer/>
    </div>
  );
};

export default Home;