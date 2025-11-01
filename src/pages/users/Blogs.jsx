import { useState, useEffect } from 'react';
import { Calendar, Clock, User, ChevronRight, TrendingUp, Bookmark, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/common/Navbar';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'tips', name: 'Cleaning Tips', count: 12 },
    { id: 'guides', name: 'How-To Guides', count: 8 },
    { id: 'eco', name: 'Eco Living', count: 6 },
    { id: 'reviews', name: 'Product Reviews', count: 5 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "10 Game-Changing Cleaning Hacks You Need to Know",
      excerpt: "Discover professional secrets that will transform your cleaning routine and save you hours every week.",
      image: "🎯",
      category: "Tips",
      author: "Sarah Johnson",
      date: "Oct 15, 2024",
      readTime: "5 min read",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "The Ultimate Guide to Spring Cleaning Your Home",
      excerpt: "Step-by-step instructions for a complete home refresh that will leave every room sparkling.",
      image: "🌸",
      category: "Guides",
      author: "Michael Chen",
      date: "Oct 12, 2024",
      readTime: "8 min read",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Why Eco-Friendly Cleaning Products Actually Work Better",
      excerpt: "Science-backed reasons why natural cleaning products are more effective than you think.",
      image: "🌿",
      category: "Eco Living",
      author: "Emily Rodriguez",
      date: "Oct 10, 2024",
      readTime: "6 min read",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const blogPosts = [
    {
      id: 4,
      title: "How to Deep Clean Your Kitchen in Under 2 Hours",
      excerpt: "A time-tested method that professional cleaners use to tackle even the messiest kitchens efficiently.",
      image: "🍽️",
      category: "guides",
      author: "David Lee",
      date: "Oct 8, 2024",
      readTime: "7 min read",
      trending: true
    },
    {
      id: 5,
      title: "5 Common Cleaning Mistakes That Are Damaging Your Home",
      excerpt: "Are you making these costly errors? Learn what to avoid and protect your investment.",
      image: "⚠️",
      category: "tips",
      author: "Lisa Wong",
      date: "Oct 5, 2024",
      readTime: "4 min read",
      trending: true
    },
    {
      id: 6,
      title: "Natural vs Chemical: What Science Says About Cleaning Products",
      excerpt: "An in-depth look at the effectiveness and safety of different cleaning product formulations.",
      image: "🔬",
      category: "eco",
      author: "Dr. James Parker",
      date: "Oct 3, 2024",
      readTime: "10 min read",
      trending: false
    },
    {
      id: 7,
      title: "The 15-Minute Daily Cleaning Routine That Changed My Life",
      excerpt: "Maintain a spotless home without spending hours cleaning. Here's my simple system.",
      image: "⏰",
      category: "tips",
      author: "Amanda Foster",
      date: "Oct 1, 2024",
      readTime: "5 min read",
      trending: true
    },
    {
      id: 8,
      title: "Best Products for Pet Owners: A Complete Review",
      excerpt: "Tested and rated: the cleaning products that actually work for homes with furry friends.",
      image: "🐾",
      category: "reviews",
      author: "Mark Stevens",
      date: "Sep 28, 2024",
      readTime: "6 min read",
      trending: false
    },
    {
      id: 9,
      title: "How to Remove Every Type of Stain: The Ultimate Guide",
      excerpt: "From wine to grease to ink, master the art of stain removal with these proven techniques.",
      image: "✨",
      category: "guides",
      author: "Rachel Green",
      date: "Sep 25, 2024",
      readTime: "12 min read",
      trending: false
    },
    {
      id: 10,
      title: "Creating a Non-Toxic Home: Where to Start",
      excerpt: "Simple swaps and changes that will make your home healthier for your family.",
      image: "🏡",
      category: "eco",
      author: "Jennifer Adams",
      date: "Sep 22, 2024",
      readTime: "8 min read",
      trending: false
    },
    {
      id: 11,
      title: "Organizing Your Cleaning Supplies Like a Pro",
      excerpt: "Storage solutions and organization tips that will streamline your cleaning routine.",
      image: "📦",
      category: "tips",
      author: "Tom Wilson",
      date: "Sep 20, 2024",
      readTime: "5 min read",
      trending: false
    },
    {
      id: 12,
      title: "Bathroom Deep Clean: Professional Methods Revealed",
      excerpt: "Hotel housekeepers share their secrets for achieving that luxury bathroom sparkle.",
      image: "🚿",
      category: "guides",
      author: "Maria Santos",
      date: "Sep 18, 2024",
      readTime: "9 min read",
      trending: false
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Cleaning Wisdom & Tips
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Expert advice, how-to guides, and inspiration for a cleaner, healthier home
            </p>
          </div>
        </div>
      </div>

      {/* Featured Posts Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-96 sm:h-[500px]">
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentFeatured ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`h-full bg-gradient-to-br ${post.gradient} p-8 sm:p-12 flex flex-col justify-end relative overflow-hidden`}>
                  <div className="absolute top-8 right-8 text-9xl opacity-20">
                    {post.image}
                  </div>
                  
                  <div className="relative z-10 text-white max-w-3xl">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      {post.category}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-lg sm:text-xl text-white/90 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <button className="mt-6 bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                      Read More <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 py-6 bg-white">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeatured(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentFeatured === index ? 'bg-green-600 w-8' : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
            >
              {/* Post Image/Icon */}
              <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 h-48 flex items-center justify-center">
                {post.trending && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-green-50 transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
                <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {post.image}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                  {categories.find(cat => cat.id === post.category)?.name || 'Article'}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between pt-4 border-t text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <button className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  Read Article <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Never Miss a Cleaning Tip
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Subscribe to our newsletter for weekly cleaning hacks and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300"
            />
            <button className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;