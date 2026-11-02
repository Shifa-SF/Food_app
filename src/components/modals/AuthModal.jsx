// src/components/modals/AuthModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, User, Phone, Mail, ArrowRight, LogOut, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, user, login, logout, showToast } = useApp();
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [name, setName] = useState('S. Sheik Almadeen');
  const [phone, setPhone] = useState('98402 12345');
  const [email, setEmail] = useState('sheik.almadeen@cravery.com');
  const [otp, setOtp] = useState(['4', '8', '2', '1']);

  if (!authModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setIsOtpStep(true);
    showToast('OTP sent to +91 ' + phone + ' (Code: 4821)', 'info');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const newUser = {
      name: name || 'Valued Foodie',
      phone: '+91 ' + phone,
      email: email || 'user@cravery.com',
      memberSince: 'October 2026',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      savedAddresses: [
        {
          id: 'addr-1',
          title: 'Home',
          tag: 'DEFAULT',
          address: 'Flat 402, Green Glen Orchid, Koramangala',
          city: 'Bengaluru, Karnataka 560034',
          phone: '+91 ' + phone
        }
      ]
    };
    login(newUser);
    setIsOtpStep(false);
  };

  const handleQuickDemoLogin = () => {
    login({
      name: 'S. Shifa fathima',
      phone: '+91 98402 12345',
      email: 'shifa@cravery.com',
      memberSince: 'October 2026',
      
      savedAddresses: [
        {
          id: 'addr-1',
          title: 'Home',
          tag: 'DEFAULT',
          address: 'Flat 402, Green Glen Orchid, Koramangala',
          city: 'Bengaluru, Karnataka 560034',
          phone: '+91 98402 12345'
        }
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-modal overflow-hidden border border-brand-lightGrey">
        {/* Header with vibrant food aesthetic */}
        <div className="relative bg-brand-charcoal text-white p-7 overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-brand-primary/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-2 text-brand-secondary text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Cravery FastPass &bull; Secure Auth</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            {user ? 'Your Profile' : isOtpStep ? 'Verify Phone' : 'Welcome to Cravery'}
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            {user
              ? 'Manage your orders, addresses & gourmet perks'
              : isOtpStep
              ? 'Enter the 4-digit verification code sent to your phone'
              : 'Taste the extraordinary with lightning delivery'}
          </p>
        </div>

        {/* Body */}
        <div className="p-7">
          {user ? (
            /* Logged In View */
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-cream border border-brand-primary/20">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-primary"
                />
                <div>
                  <h4 className="font-bold text-brand-charcoal text-base">{user.name}</h4>
                  <p className="text-xs text-stone-500">{user.phone}</p>
                  <p className="text-xs text-stone-400">{user.email}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Membership Tier</span>
                  <span className="font-bold text-brand-primary">Cravery Gourmet VIP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Member Since</span>
                  <span className="font-medium text-brand-charcoal">{user.memberSince}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    logout();
                    setAuthModalOpen(false);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
                <button
                  onClick={() => setAuthModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-brand-primary text-white hover:bg-[#e85b27] text-sm font-bold transition-colors shadow-accent"
                >
                  Done
                </button>
              </div>
            </div>
          ) : !isOtpStep ? (
            /* Phone Input View */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 bg-[#F7F5F0] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1.5">Phone Number</label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-stone-200 bg-stone-100 text-stone-600 text-sm font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full px-4 py-3 bg-[#F7F5F0] border border-stone-200 rounded-r-xl text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1.5">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#F7F5F0] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e85b27] transition-colors shadow-accent mt-2"
              >
                Continue to Verify
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200"></div>
                </div>
                <span className="relative bg-white px-3 text-[11px] font-bold text-stone-400 uppercase">
                  Quick Demo Access
                </span>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-3 bg-brand-cream border border-brand-primary/30 text-brand-primary rounded-xl text-xs font-bold hover:bg-brand-primary/10 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                1-Click Instant Demo Login
              </button>

              <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                By continuing, you agree to Cravery's Terms of Service and Privacy Policy.
              </p>
            </form>
          ) : (
            /* OTP View */
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <p className="text-xs text-stone-500">
                  Enter the code sent to <strong className="text-brand-charcoal">+91 {phone}</strong>
                </p>
                <div className="flex justify-center gap-3 my-5">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[idx] = e.target.value;
                        setOtp(newOtp);
                      }}
                      className="w-12 h-14 text-center text-xl font-black bg-[#F7F5F0] border-2 border-stone-200 focus:border-brand-primary rounded-xl focus:outline-none"
                    />
                  ))}
                </div>
                <p className="text-xs text-stone-400">
                  Didn't receive code?{' '}
                  <button
                    type="button"
                    onClick={() => showToast('New code sent: 4821', 'info')}
                    className="text-brand-primary font-bold hover:underline"
                  >
                    Resend Code
                  </button>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e85b27] transition-colors shadow-accent"
              >
                Verify & Log In
              </button>

              <button
                type="button"
                onClick={() => setIsOtpStep(false)}
                className="w-full text-xs font-bold text-stone-500 hover:text-stone-700 py-1"
              >
                &larr; Change Phone Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
