import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Award, Users, Heart, ArrowLeft, Menu, X, ShoppingCart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const AboutUs = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Owner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      text: "These products have transformed my cleaning routine! My home has never been cleaner, and I love that they're eco-friendly.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Restaurant Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      text: "We switched to these cleaning products for our restaurant and couldn't be happier. Powerful yet safe for our kitchen staff.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Professional Cleaner",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      text: "As a professional, I need products I can trust. These deliver exceptional results every single time!",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Office Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      text: "Our office sparkles! The entire team notices the difference. Great products at reasonable prices.",
      rating: 5
    }
  ];

  const values = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Quality First",
      description: "We never compromise on the quality of our products. Every formula is tested rigorously to ensure it meets our high standards.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Eco-Conscious",
      description: "Protecting our planet is at the heart of everything we do. Our products are biodegradable and use sustainable ingredients.",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Care",
      description: "Your satisfaction is our priority. We're here to support you with exceptional service and reliable products.",
      color: "from-teal-400 to-cyan-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Innovation",
      description: "We constantly innovate to bring you better, more effective cleaning solutions that make your life easier.",
      color: "from-lime-400 to-green-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "100+", label: "Products" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleShopNow = () => {
    navigate('/home'); // Navigate to home page
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200">
    <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              About Plant Fresh
            </h1>
            <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto">
              A premium cleaning products company committed to sustainability, customer satisfaction, and cutting-edge formulations.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-5xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm sm:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>
                Plant Fresh is revolutionizing traditional cleaning by fusing natural effectiveness with high-end, eco-conscious practices. We're committed to creating powerful cleaning solutions that not only meet today's needs but preserve tomorrow's possibilities.
              </p>
              <p>
                Our mission extends beyond cleaning – we're empowering households and businesses through safe, effective products and transparent education, creating a ripple effect of positive change in our communities.
              </p>
              <p>
                Every product we create reflects our commitment to environmental responsibility, customer satisfaction, and exceptional quality.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Plant Fresh?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                <span className="text-gray-700">Sustainable ingredients and eco-friendly practices</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                <span className="text-gray-700">Customer-focused product development approach</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                <span className="text-gray-700">Premium quality with cutting-edge formulations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                <span className="text-gray-700">Safe for families and environmentally responsible</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                <span className="text-gray-700">Transparent communication and quality assurance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide our product development and shape our commitment to sustainable cleaning solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${value.color} text-white`}>
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          What Our Customers Say
        </h2>
        
        <div className="relative max-w-4xl mx-auto px-12 sm:px-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-green-100 text-9xl font-serif leading-none">"</div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-emerald-200"
                />
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>
              </div>
              
              <p className="text-xl text-gray-700 text-center mb-8 italic leading-relaxed">
                {testimonials[currentTestimonial].text}
              </p>
              
              <div className="text-center">
                <div className="font-bold text-gray-900 text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-emerald-600">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-xl hover:bg-green-50 transition-all duration-300 hover:scale-110 z-20"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-xl hover:bg-green-50 transition-all duration-300 hover:scale-110 z-20"
            >
              <ChevronRight className="w-6 h-6 text-emerald-600" />
            </button>
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-emerald-600 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-white mb-8">
            Join thousands of satisfied customers who've made the switch to cleaner, greener cleaning.
          </p>
          <button 
            onClick={handleShopNow}
            className="bg-white text-emerald-600 px-10 py-4 font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl rounded-full hover:cursor-pointer hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;