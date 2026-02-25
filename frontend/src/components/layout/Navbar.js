import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaExchangeAlt, FaBars, FaTimes, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useCompare } from '../../context/CompareContext';
import { useWishlist } from '../../context/WishlistContext';
import api from '../../utils/api';
import slugify from 'slugify';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { compareCount } = useCompare();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.slug}`);
    setSearchQuery('');
    setShowSuggestions(false);
    setSearchSuggestions([]);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    return baseUrl.replace('/api', '') + imageUrl;
  };

  // Debounced search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const { data } = await api.get(`/products/search/${encodeURIComponent(searchQuery)}`);
        const productsData = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        setSearchSuggestions(productsData.slice(0, 5)); // Limit to 5 suggestions
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSearchSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Handle clicks outside the search suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  // Map main category items to their category slugs
  const categoryMap = {
    'Serum': 'serum',
    'Toner': 'toner',
    'Sunscreen': 'sunscreen',
    'Moisturizing Cream': 'moisturizer',
    'Facial Washes': 'cleanser',
  };

  // Function to get link for menu items
  const getMenuItemLink = (item) => {
    // Check if it's a main category
    if (categoryMap[item]) {
      return `/category/${categoryMap[item]}`;
    }
    // Otherwise use subcategory filter
    return `/products?subcategory=${encodeURIComponent(item)}`;
  };

  const megaMenus = {
    brands: {
      items: [
        ['Anua', 'AXIS-Y', 'Beauty of Joseon'],
        ['Christian dean', 'COSRX', 'DABO'],
        ['Dot & Key', 'Dr.Althea', 'Glow Industry'],
        ['I\'M FROM', 'IUNIK', 'MARS Cosmetics'],
        ['Missha', 'Simple', 'SKIN 1004'],
        ['skinO', 'The Derma Co.', 'WishCare']
      ]
    },
    skincare: {
      sections: [
        {
          title: '💧 SERUM & TREATMENT',
          items: ['Serum', 'Ampoule', 'Essence', 'Blemish Treatment', 'Essential Oil']
        },
        {
          title: '💦 TONER & EXFOLIATOR',
          items: ['Toner', 'Exfoliator']
        },
        {
          title: '💼 MOISTURIZER',
          items: ['Moisturizing Cream', 'Face Oil', 'Night Cream', 'Whitening Cream', 'Anti Melasma', 'Soothing Gel']
        },
        {
          title: '🧴 CLEANSERS',
          items: ['Facial Washes', 'Makeup Removers', 'Cleansing Soap', 'Toner Pads']
        },
        {
          title: '💎 SKINCARE SET & KITS',
          items: ['Snail Kit', 'All Kit']
        },
        {
          title: '👁️ EYES',
          items: ['Eye Cream', 'Eye Serum']
        },
        {
          title: '☀️ SUN PROTECTION',
          items: ['Sunscreen', 'Sun Stick']
        },
        {
          title: '🎯 ACNE TREATMENT',
          items: ['Face Scrub', 'Sheet Masks', 'Pimple Patches', 'Clay Mask', 'Face Pack']
        },
        {
          title: '💋 LIP CARE',
          items: []
        }
      ]
    },
    makeup: {
      sections: [
        {
          title: '👁️ EYES MAKEUP',
          items: ['Eyeliner', 'Kajal', 'Mascara', 'Eye Brows', 'Eye Shadow']
        },
        {
          title: '😊 FACE MAKEUP',
          items: ['Concealers', 'Face Foundation', 'Blush', 'Contour', 'Face Primer', 'Highlighters', 'Setting Spray', 'BB & CC Cream', 'Compact Powder']
        },
        {
          title: '💄 LIPS',
          items: ['Lip Liner', 'Lipstick', 'Lip Tints', 'Lip Gloss']
        },
        {
          title: '🖌️ TOOLS & BRUSHES',
          items: ['Brush Sets', 'Eye Brush', 'Face Brush', 'Mirrors', 'Makeup Pouches', 'Sponges & Applicators']
        },
        {
          title: '🎨 MAKEUP KITS',
          items: ['Makeup Palette']
        }
      ]
    },
    haircare: {
      sections: [
        {
          title: '💆 HAIR TREATMENT',
          items: ['Hair Shampoo', 'Hair Oil', 'Hair Mask & Cream', 'Hair Serum - Treatment']
        },
        {
          title: '💇 HAIR STYLE',
          items: ['Hair Spray & Gel', 'Hair Straightening Cream', 'Hair Color']
        },
        {
          title: '🔧 HAIR TOOLS & ACCESSORIES',
          items: ['Hair Brush Comb', 'Hair Straightener', 'Hair Dryer']
        }
      ]
    },
    bodycare: {
      sections: [
        {
          title: '🛁 BATH & SHOWER',
          items: ['Body Scrub & Exfoliants', 'Shower Gels & Body Wash', 'Body Soaps']
        },
        {
          title: '🧴 BODY CARE',
          items: ['Body Lotion', 'Body Butter', 'Body Oil', 'Body Massage Oil', 'Talcum Powder', 'Body Sunscreen', 'Bath Salt']
        },
        {
          title: '✋ HAND & FOOT',
          items: ['Hand Cream', 'Hand Wash', 'Foot Cream', 'Foot Scrub']
        },
        {
          title: '💅 FEMININE HYGIENE & CARE',
          items: ['Body Razors', 'Face & Eyebrow Razors', 'Hair Removal Cream', 'Wax & Wax Strips', 'Breast Cream']
        },
        {
          title: '🌸 FRAGRANCE',
          items: ['Men\'s Fragrance - Body Mist & Body Sprays', 'Men\'s Fragrance - Deo & Roll Ons', 'Men Perfume', 'Women\'s Fragrances - Deo & Roll-ons', 'Women Perfume', 'Women\'s Fragrance - Body Mist & Body Sprays']
        }
      ]
    },
  };

  const categories = [
    { name: 'BRANDS', path: '/brands' },
    { name: '🟢 SKIN CARE', path: '/category/skin-care' },
    { name: 'MAKE UP', path: '/category/make-up' },
    { name: 'HAIR CARE', path: '/category/hair-care' },
    { name: 'BODY CARE', path: '/category/body-care' },
    { name: 'COMBO', path: '/category/combo' },
    { name: 'OFFERS', path: '/offers' },
  ];

  return (
    <nav className="sticky-header">
      {/* Top Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Mobile Menu Toggle - Left */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-2xl hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center w-10 h-10"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Logo - Center on mobile, Left on desktop */}
            <Link to="/" className="flex items-center md:flex-1">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <span className="ml-2 text-xl md:text-2xl font-bold text-primary-500">Glowiva</span>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search for products"
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-6 bg-primary-500 text-white rounded-r-lg hover:bg-primary-600"
                >
                  <FaSearch />
                </button>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchQuery.trim().length >= 2 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {loadingSuggestions ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                      </div>
                    ) : searchSuggestions.length > 0 ? (
                      <div>
                        {searchSuggestions.map((product) => (
                          <button
                            key={product._id}
                            type="button"
                            onClick={() => handleSuggestionClick(product)}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                          >
                            <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                              {product.images && product.images.length > 0 ? (
                                <img
                                  src={getImageUrl(product.images[0])}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <FaSearch size={16} />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 truncate">{product.name}</p>
                              <p className="text-sm text-gray-500">
                                ₹{product.discountPrice > 0 ? product.discountPrice : product.price}
                                {product.discountPrice > 0 && product.discountPrice < product.price && (
                                  <span className="ml-2 line-through text-gray-400">₹{product.price}</span>
                                )}
                              </p>
                            </div>
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={handleSearch}
                          className="w-full p-3 text-center text-primary-600 hover:bg-gray-50 font-medium"
                        >
                          See all results for "{searchQuery}"
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No products found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>

            {/* Right Icons */}
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Login/Register or User Menu - Desktop Only */}
              <div className="hidden md:block">
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 hover:text-primary-500"
                    >
                      <FaUser className="text-xl" />
                      <span className="hidden lg:block">{user?.name}</span>
                    </button>
                    
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center space-x-1 hover:text-primary-500">
                    <FaUser className="text-xl" />
                    <span className="hidden lg:block">LOGIN / REGISTER</span>
                  </Link>
                )}
              </div>

              {/* Wishlist - Mobile badge only */}
              <Link to="/wishlist" className="relative hover:text-primary-500 flex items-center justify-center w-10 h-10">
                <FaHeart className="text-2xl" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Compare - Desktop Only */}
              <Link to="/compare" className="relative hover:text-primary-500 hidden md:flex items-center justify-center w-10 h-10">
                <FaExchangeAlt className="text-2xl" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative hover:text-primary-500 flex items-center justify-center w-10 h-10">
                <FaShoppingCart className="text-2xl" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative" ref={mobileSearchRef}>
              <input
                type="text"
                placeholder="Search for products"
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-600 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-pink-600 text-white rounded-r-lg hover:bg-pink-700 transition-colors"
              >
                <FaSearch />
              </button>

              {/* Mobile Search Suggestions Dropdown */}
              {showSuggestions && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {loadingSuggestions ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                    </div>
                  ) : searchSuggestions.length > 0 ? (
                    <div>
                      {searchSuggestions.map((product) => (
                        <button
                          key={product._id}
                          type="button"
                          onClick={() => {
                            handleSuggestionClick(product);
                            setMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                        >
                          <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={getImageUrl(product.images[0])}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <FaSearch size={14} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 text-sm truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">
                              ₹{product.discountPrice > 0 ? product.discountPrice : product.price}
                              {product.discountPrice > 0 && product.discountPrice < product.price && (
                                <span className="ml-2 line-through text-gray-400">₹{product.price}</span>
                              )}
                            </p>
                          </div>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={(e) => {
                          handleSearch(e);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full p-3 text-center text-primary-600 hover:bg-gray-50 font-medium text-sm"
                      >
                        See all results for "{searchQuery}"
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-white border-b hidden md:block relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-3">
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('brands')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to="/brands"
                className="whitespace-nowrap text-sm font-medium hover:text-primary-500 transition-colors"
              >
                BRANDS
              </Link>
              
              {activeMegaMenu === 'brands' && (
                <div className="absolute left-0 top-full mt-0 w-screen max-w-4xl bg-white shadow-2xl z-50 p-8">
                  <div className="grid grid-cols-3 gap-8">
                    {megaMenus.brands.items.map((column, idx) => (
                      <div key={idx}>
                        {column.map((brand, bidx) => (
                          <Link
                            key={bidx}
                            to={`/brand/${slugify(brand, { lower: true, strict: true })}`}
                            className="block py-2 text-gray-700 hover:text-primary-500 hover:translate-x-1 transition-all"
                          >
                            {brand}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('skincare')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to="/category/skin-care"
                className="whitespace-nowrap text-sm font-medium hover:text-primary-500 transition-colors"
              >
                🟢 SKIN CARE
              </Link>
              
              {activeMegaMenu === 'skincare' && (
                <div className="absolute left-0 top-full mt-0 w-screen max-w-6xl bg-white shadow-2xl z-50 p-8">
                  <div className="grid grid-cols-4 gap-6">
                    {megaMenus.skincare.sections.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-gray-900 mb-3">{section.title}</h4>
                        {section.items.map((item, iidx) => (
                          <Link
                            key={iidx}
                            to={getMenuItemLink(item)}
                            className="block py-1 text-gray-600 hover:text-primary-500 text-sm hover:translate-x-1 transition-all"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('makeup')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to="/category/make-up"
                className="whitespace-nowrap text-sm font-medium hover:text-primary-500 transition-colors"
              >
                MAKE UP
              </Link>
              
              {activeMegaMenu === 'makeup' && (
                <div className="absolute left-0 top-full mt-0 w-screen max-w-5xl bg-white shadow-2xl z-50 p-8">
                  <div className="grid grid-cols-3 gap-8">
                    {megaMenus.makeup.sections.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-gray-900 mb-3">{section.title}</h4>
                        {section.items.map((item, iidx) => (
                          <Link
                            key={iidx}
                            to={getMenuItemLink(item)}
                            className="block py-1 text-gray-600 hover:text-primary-500 text-sm hover:translate-x-1 transition-all"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('haircare')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to="/category/hair-care"
                className="whitespace-nowrap text-sm font-medium hover:text-primary-500 transition-colors"
              >
                HAIR CARE
              </Link>
              
              {activeMegaMenu === 'haircare' && (
                <div className="absolute left-0 top-full mt-0 w-screen max-w-3xl bg-white shadow-2xl z-50 p-8">
                  <div className="grid grid-cols-3 gap-8">
                    {megaMenus.haircare.sections.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-gray-900 mb-3">{section.title}</h4>
                        {section.items.map((item, iidx) => (
                          <Link
                            key={iidx}
                            to={getMenuItemLink(item)}
                            className="block py-1 text-gray-600 hover:text-primary-500 text-sm hover:translate-x-1 transition-all"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('bodycare')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to="/category/body-care"
                className="whitespace-nowrap text-sm font-medium hover:text-primary-500 transition-colors"
              >
                BODY CARE
              </Link>
              
              {activeMegaMenu === 'bodycare' && (
                <div className="absolute left-0 top-full mt-0 w-screen max-w-5xl bg-white shadow-2xl z-50 p-8">
                  <div className="grid grid-cols-4 gap-6">
                    {megaMenus.bodycare.sections.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-gray-900 mb-3">{section.title}</h4>
                        {section.items.map((item, iidx) => (
                          <Link
                            key={iidx}
                            to={getMenuItemLink(item)}
                            className="block py-1 text-gray-600 hover:text-primary-500 text-sm hover:translate-x-1 transition-all"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/combo"
              className="whitespace-nowrap text-sm font-medium hover:text-primary-500 transition-colors"
            >
              COMBO
            </Link>
            
            <Link
              to="/offers"
              className="whitespace-nowrap text-sm font-medium hover:text-primary-500 transition-colors"
            >
              OFFERS
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="w-4/5 max-w-sm h-full bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-pink-600 font-bold text-xl">G</span>
                </div>
                <span className="ml-2 text-xl font-bold">Glowiva</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">
                <FaTimes />
              </button>
            </div>

            {/* User Info Section */}
            {isAuthenticated ? (
              <div className="bg-gray-50 p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 border-b">
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser />
                  <span>LOGIN / REGISTER</span>
                </Link>
              </div>
            )}

            {/* Menu Items */}
            <div className="py-2">
              {/* BRANDS */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'brands' ? null : 'brands')}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                >
                  <span>BRANDS</span>
                  {expandedMobileMenu === 'brands' ? <FaChevronDown /> : <FaChevronRight />}
                </button>
                {expandedMobileMenu === 'brands' && (
                  <div className="bg-gray-50 px-6 py-2">
                    {megaMenus.brands.items.flat().map((brand, idx) => (
                      <Link
                        key={idx}
                        to={`/brand/${slugify(brand, { lower: true, strict: true })}`}
                        className="block py-2 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* SKIN CARE */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'skincare' ? null : 'skincare')}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                >
                  <span>🟢 SKIN CARE</span>
                  {expandedMobileMenu === 'skincare' ? <FaChevronDown /> : <FaChevronRight />}
                </button>
                {expandedMobileMenu === 'skincare' && (
                  <div className="bg-gray-50 px-6 py-2">
                    {megaMenus.skincare.sections.map((section, idx) => (
                      <div key={idx} className="mb-3">
                        <h4 className="text-xs font-bold text-gray-800 mb-1">{section.title}</h4>
                        {section.items.map((item, iidx) => (
                          <Link
                            key={iidx}
                            to={getMenuItemLink(item)}
                            className="block py-1.5 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* MAKE UP */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'makeup' ? null : 'makeup')}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                >
                  <span>MAKE UP</span>
                  {expandedMobileMenu === 'makeup' ? <FaChevronDown /> : <FaChevronRight />}
                </button>
                {expandedMobileMenu === 'makeup' && (
                  <div className="bg-gray-50 px-6 py-2">
                    {megaMenus.makeup.sections.map((section, idx) => (
                      <div key={idx} className="mb-3">
                        <h4 className="text-xs font-bold text-gray-800 mb-1">{section.title}</h4>
                        {section.items.map((item, iidx) => (
                          <Link
                            key={iidx}
                            to={getMenuItemLink(item)}
                            className="block py-1.5 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* HAIR CARE */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'haircare' ? null : 'haircare')}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                >
                  <span>HAIR CARE</span>
                  {expandedMobileMenu === 'haircare' ? <FaChevronDown /> : <FaChevronRight />}
                </button>
                {expandedMobileMenu === 'haircare' && (
                  <div className="bg-gray-50 px-6 py-2">
                    {megaMenus.haircare.sections.map((section, idx) => (
                      <div key={idx} className="mb-3">
                        <h4 className="text-xs font-bold text-gray-800 mb-1">{section.title}</h4>
                        {section.items.map((item, iidx) => (
                          <Link
                            key={iidx}
                            to={getMenuItemLink(item)}
                            className="block py-1.5 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* BODY CARE */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'bodycare' ? null : 'bodycare')}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                >
                  <span>BODY CARE</span>
                  {expandedMobileMenu === 'bodycare' ? <FaChevronDown /> : <FaChevronRight />}
                </button>
                {expandedMobileMenu === 'bodycare' && (
                  <div className="bg-gray-50 px-6 py-2">
                    {megaMenus.bodycare.sections.map((section, idx) => (
                      <div key={idx} className="mb-3">
                        <h4 className="text-xs font-bold text-gray-800 mb-1">{section.title}</h4>
                        {section.items.map((item, iidx) => (
                          <Link
                            key={iidx}
                            to={getMenuItemLink(item)}
                            className="block py-1.5 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* MENS PRODUCT */}
              <Link
                to="/products?category=mens-product"
                className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                MENS PRODUCT
              </Link>

              {/* MOM & BABY */}
              <Link
                to="/products?category=mom-baby"
                className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                MOM & BABY
              </Link>

              {/* COMBO */}
              <Link
                to="/combo"
                className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                COMBO
              </Link>

              {/* OFFERS */}
              <Link
                to="/offers"
                className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                OFFERS
              </Link>

              {/* ACCESSORIES */}
              <Link
                to="/products?category=accessories"
                className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ACCESSORIES
              </Link>

              {/* WISHLIST */}
              <Link
                to="/wishlist"
                className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700 font-medium transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaHeart className="mr-2 text-pink-600" />
                WISHLIST
              </Link>

              {/* COMPARE */}
              <Link
                to="/compare"
                className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700 font-medium transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaExchangeAlt className="mr-2 text-gray-600" />
                COMPARE
              </Link>

              {/* MY ACCOUNT */}
              {isAuthenticated ? (
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'account' ? null : 'account')}
                    className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                  >
                    <span className="flex items-center">
                      <FaUser className="mr-2 text-gray-600" />
                      MY ACCOUNT
                    </span>
                    {expandedMobileMenu === 'account' ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                  {expandedMobileMenu === 'account' && (
                    <div className="bg-gray-50 px-6 py-2">
                      <Link
                        to="/profile"
                        className="block py-2 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block py-2 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block py-2 text-sm text-gray-600 hover:text-pink-600 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700 font-medium transition-colors flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser className="mr-2 text-gray-600" />
                  MY ACCOUNT
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
