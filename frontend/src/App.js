import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import BrandPage from './pages/BrandPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import ComparePage from './pages/ComparePage';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';
import ComboPage from './pages/ComboPage';
import OffersPage from './pages/OffersPage';
import AboutPage from './pages/AboutPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import TrackOrderPage from './pages/TrackOrderPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBrands from './pages/admin/AdminBrands';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminBanners from './pages/admin/AdminBanners';
import AdminTestimonials from './pages/admin/AdminTestimonials';

// Components
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';
import MessengerChatButton from './components/MessengerChatButton';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/brand/:brandName" element={<BrandPage />} />
          <Route path="/brands" element={<ProductsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/combo" element={<ComboPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />

          {/* Private Routes */}
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
          <Route path="/order/:id" element={<PrivateRoute><OrderDetailPage /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
          <Route path="/wishlist" element={<PrivateRoute><WishlistPage /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/orders/:id" element={<AdminRoute><AdminOrderDetail /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
          <Route path="/admin/brands" element={<AdminRoute><AdminBrands /></AdminRoute>} />
          <Route path="/admin/coupons" element={<AdminRoute><AdminCoupons /></AdminRoute>} />
          <Route path="/admin/banners" element={<AdminRoute><AdminBanners /></AdminRoute>} />
          <Route path="/admin/testimonials" element={<AdminRoute><AdminTestimonials /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
      {/* Show Bottom Navigation only on non-admin pages */}
      {!isAdminPage && <BottomNav />}
      {/* Messenger Chat Button */}
      <MessengerChatButton />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
