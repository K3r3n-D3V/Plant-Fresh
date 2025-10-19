import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactCards = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      primary: "+1 (555) 123-4567",
      secondary: "Mon-Fri, 9am-6pm EST",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      primary: "support@cleanspark.com",
      secondary: "24hr response time",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      primary: "Chat with us now",
      secondary: "Available 24/7",
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Visit Us",
      primary: "123 Clean Street",
      secondary: "New York, NY 10001",
      color: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white overflow-hidden py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Have questions? We're here to help you find the perfect cleaning solutions
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className={`inline-flex p-4 rounded-2xl ${card.iconBg} ${card.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-900 font-semibold mb-1 text-sm">{card.primary}</p>
              <p className="text-gray-500 text-sm">{card.secondary}</p>
              <div className={`mt-4 h-1 bg-gradient-to-r ${card.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('form')}
                  className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                    activeTab === 'form'
                      ? 'bg-green-50 text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Send Message
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                    activeTab === 'faq'
                      ? 'bg-green-50 text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Quick Answers
                </button>
              </div>

              <div className="p-8 sm:p-10">
                {activeTab === 'form' ? (
                  submitted ? (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                      <p className="text-gray-600 text-lg">We'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Get In Touch</h2>
                      <p className="text-gray-600 mb-8">Fill out the form below and our team will respond shortly</p>

                      <div className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-gray-300"
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-gray-300"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-gray-300"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Subject *
                            </label>
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-gray-300"
                            >
                              <option value="">Select a topic</option>
                              <option value="general">General Inquiry</option>
                              <option value="product">Product Question</option>
                              <option value="order">Order Support</option>
                              <option value="feedback">Feedback</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Your Message *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="6"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-gray-300 resize-none"
                            placeholder="How can we help you today?"
                          ></textarea>
                        </div>

                        <button
                          onClick={handleSubmit}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1"
                        >
                          <Send className="w-5 h-5" />
                          Send Message
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
                    <p className="text-gray-600 mb-8">Quick answers to common questions</p>

                    <div className="space-y-4">
                      {[
                        {
                          q: "What are your shipping times?",
                          a: "We ship within 1-2 business days. Standard delivery takes 3-5 business days, with express options available."
                        },
                        {
                          q: "Do you offer bulk discounts?",
                          a: "Yes! Contact us for special pricing on orders of 50+ items or wholesale inquiries."
                        },
                        {
                          q: "Are your products eco-friendly?",
                          a: "Absolutely! All our products are biodegradable, use sustainable ingredients, and come in recyclable packaging."
                        },
                        {
                          q: "What's your return policy?",
                          a: "We offer a 30-day money-back guarantee on all products. If you're not satisfied, we'll provide a full refund."
                        },
                        {
                          q: "Do you ship internationally?",
                          a: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location."
                        }
                      ].map((faq, index) => (
                        <details
                          key={index}
                          className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 cursor-pointer hover:shadow-md transition-all duration-300"
                        >
                          <summary className="font-bold text-gray-900 list-none flex items-center justify-between">
                            <span className="text-lg">{faq.q}</span>
                            <span className="text-green-600 group-open:rotate-180 transition-transform duration-300 text-2xl">
                              ›
                            </span>
                          </summary>
                          <p className="mt-4 text-gray-600 leading-relaxed pl-2 border-l-4 border-green-500">
                            {faq.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Takes up 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Hours */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Business Hours</h3>
              </div>
              <div className="space-y-4">
                {[
                  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', time: 'Closed' }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-white/20 last:border-0">
                    <span className="font-semibold">{schedule.day}</span>
                    <span className="text-green-100">{schedule.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <p className="text-sm leading-relaxed">
                  <span className="font-bold">24/7 Support:</span> Our live chat is always available for urgent inquiries!
                </p>
              </div>
            </div>

            {/* Visit Us Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Showroom</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">123 Clean Street, Suite 100</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">+1 (555) 123-4567</p>
                    <p className="text-gray-600">Call for directions</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;