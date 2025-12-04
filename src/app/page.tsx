'use client';
import React , { useState, useEffect } from 'react';
import { ShoppingCart, MessageSquare, 
  Lock, Upload, Sparkles, Clock } from 'lucide-react';

interface Product {
  id: number;
  item_code: string;
  name: string;
  price: string;
  sizes: string[];
  image_url: string | null;
}

export default function 
CustomerWorkspace() {

  // --- SESSION TIMER LOGIC ---
  const [sessionTime, setSessionTime] = useState(0);

  // Simple timer logic to match the "00:10" in my sketch
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // --- LOGIC MOCKUP ---
  // In production, these come from your "auth.ts" and "prisma" database calls

  const [UserStats] = useState({
    receiptsCount: 2, //User has uploaded 2 receipts (Less than 5)
    paymentConfirmed: false // User has not paid for current session
  });

  //Logic: Coupon is LOCKED if receipts < 5
  const isCouponLocked =
  UserStats.receiptsCount < 5;

  //Logic: WhatsApp is LOCKED until payment is confirmed
  const isWhatsAppLocked =
  !UserStats.paymentConfirmed;

  // --- DATA FETCHING LOGIC ---
  const [activeCategory, setActiveCategory] = useState('essential');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch when category changes
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/products?category=${activeCategory}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) { 
        console.error('Failed to load shop items', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory]);
  
  return (
    
    // 1. THE PERSPECTIVE BACKGROUND (The "Desk" or "Distance" view)
    <div 
    className="min-h-screen w-full 
    bg-slate-100 flex items-center 
    justify-center p-4">
      
      {/* 2. THE APP CONTAINER (Mobile Optimized Frame) This represents the box drawn in my sketch */}
      <main 
      className="relative 
      w-full max-w-[400px] h-[85vh] 
      bg-white shadow-2xl rounded-3xl 
      overflow-hidden border-4 
      border-slate-200 ring-1 
      ring-slate-900/5 flex flex-col">

        {/* --- ZONE A: GENDER SPLIT (Top 1/3) ---*/}
        <div 
        className="h-[35%]
        w-full flex border-b
        border-slate-200">
          {/* WOMEN */}
          <button
          onClick={() => setActiveCategory('women')}
          className="flex-1
          bg-white hover:bg-rose-50
          transition-colors flex flex-col
          items-center justify-center gap-2
          border-r border-slate-100 group">
            <div 
            className="w-14
            h-14 roounded-full bg-rose-100
            flex items-center justify-center 
            text-rose-500 group-hover:scale-110
            transition-transform">
              <svg 
              width="28" height="28" viewBox="0 0 24 24"
              fill="none" stroke='currentColor'
              strokeWidth="2" strokeLinecap="round" 
              strokeLinejoin="round">
                <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12"/> 
                <path d="M12 15v7" />
                <path d="M9 19h6"/>
              </svg>
            </div>
            <span 
            className="font-bold text-slate-700
            tracking-widest text-sm">
              WOMEN
            </span>
          </button>

          {/* MEN */}
          <button 
          onClick={() => setActiveCategory('men')}
          className="flex-1
          bg-white hover:bg-sky-50
          transition-colors flex flex-col
          items-center justify-center gap-2
          group">
            <div 
            className="w-14 h-14 rounded-full
            bg-sky-100 flex items-center
            justify-center text-sky-500
            group-hover:scale-110
            transition-transform">
              <svg 
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round">
              <path d="M16 3h5v5"/>
              <path d="M21 3L13.5 10.5"/>
              <path d="M15.5 13.5a6.5 6.5 
              0 1 1-9.1-9.1 6.5 6.5 0 0 1 9.1 9.1z" /></svg>

            </div>
            <span 
            className="font-bold text-slate-700
            tracking-widest text-sm">MEN</span>
          </button>
        </div>

        {/* --- ZONE B: ESSENTIALS BAR --- */}
        <div
        onClick={() => setActiveCategory('essential')}
        className="w-full h-14
        bg-slate-900 flex items-center
        justify-between px-6 shadow-md 
        z-10 cursor-pointer hover:bg-slate-800
        transition-colors">
          <div 
          className="flex
          items-center gap-2">
            <Sparkles 
            className="w-4
            h-4 text-yellow-400 fill-current" />
            <span 
            className="text-white font-bold
            tracking-widest uppercase
            text-sm">Essentials
            </span>
          </div>
          <span 
          className="text-slate-400
          text-xs">View All &rarr;</span>
        </div>

        {/* --- ZONE C: SCROLLABLE CONTENT --- */}
        <div 
        className="flex-1 
        overflow-y-auto 
        p-6 pb-24
        bg-slate-50">
          {/* LOYALTY SECTION (Coupon Upload) */}
          <div 
          className="mb-6">
            <div 
            className={`relative 
            w-full h-14 rounded-xl 
            border-2 border-dashed
            flex items-center justify-between 
            px-4 transition-all 
            ${isCouponLocked ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'bg-whit border-indigo-300 cursor-pointer hover:border-indigo-500'}`}>
              <div 
              className="flex
              items-center gap-3">
                <div 
                className={`
                  p-1.5 rounded-full 
                  ${isCouponLocked ? 'bg-gray-200' : 'bg-indigo-100'}`}>
                  {isCouponLocked ? <Lock 
                  className="w-4 h-4 text-gray-400" /> : <Upload 
                  className="w-4 h-4 text-indigo-500" />}
                </div>
                <span 
                className={`text-xs font-bold 
                uppercase tracking-wide
                ${isCouponLocked ? 'text-gray-400' : 'text-slate-600'}`}>
                  {isCouponLocked ? 'Loyalty Locked (2/5)' : 'Upload Coupon'}
                </span>
              </div>
            </div>
          </div>
          {/* PRODUCT FEED*/}
          <div className="space-y-3">
            {isLoading ? (
              <div
              className="text-center text-slate-400
              py-10 text-xs tracking-wider">Loading inventory...
              </div>
              ) : (
                products.map((product) => (
                <div
                key={product.id} 
                className="h-24
                bg-white rounded-xl shadow-sm border
                border-slate-100 flex items-center
                p-3 gap-4">
                  {/* Image Placeholder */}
                  <div 
                  className="w-16 h-16 
                  bg-slate-100 rounded-lg 
                  shrink-0 overflow-hidden 
                  relative border border-slate-100">
                    {/* Next Image */}
                    <div 
                    className="absolute inset-0 flex
                    items-center justify-center text-[10px]
                    text-slate-300 
                    font-bold">
                      IMG
                    </div>
                    </div>
                    <div 
                    className="flex-1">
                      <div 
                      className="flex justify-between 
                      items-start">
                        <h3 
                        className="font-bold text-slate-700
                        text-sm">{product.name}</h3>
                        <span 
                        className="text-[10px] font-mono 
                        bg-slate-100 text-slate-500 px-1.5 
                        py-0.5 rounded">{product.item_code}</span>
                      </div>
                      <p 
                      className="text-slate-500 text-[10px]
                      mt-1">Sizes: {product.sizes.join(',')}</p>
                      <p 
                      className="font-bold text-slate-900
                      mt-1">${product.price}</p>
                    </div>
              </div>
              ))
            )}
          </div>
        </div>

        {/* --- ZONE D: BOTTOM FLOATING ELEMENTS --- */}

        {/* 1. SESSION TIMER (Bottom Left) */}
        <div 
        className="absolute 
        top-6 left-6 z-50">
          <div 
          className="bg-white/90
          backdrop-blur border
          border-slate-200 text-slate-900 px-3 
          py-1.5 rounded-lg text-xs 
          font-mono font-bold
          shadow-lg flex items-center gap-2">
            <Clock 
            className="w-3 h-3 
            text-slate-500" />

            {formatTime(sessionTime)}
          </div>
        </div>
        {/* 2. TOOLS (Bottom Right) */}
        <div 
        className="absolute bottom-6 
        right-6 z-50 flex flex-col
        items-end gap-3">
          {/* Locked WhatsApp */}
          <button 
          disabled ={isWhatsAppLocked}
          className={`flex
          items-center justify-center 
          w-12 h-12 rounded-full shadow-xl transition-all
          ${isWhatsAppLocked ? 'bg-gray-200 grayscale cursor-not-allowed' : 'bg-green-500 text-white'}`}
          >
            <MessageSquare 
            className="w-5 h-5
            text-current" />
          </button>

          {/* Shopping List */}
          <button 
          className="flex
          items-center justify-center w-14 h-14
          rounded-full bg-slate-900 text-white
          shadow-2xl">
            <ShoppingCart 
            className="w-6 h-6" />
          </button>
        </div>

      </main>
    </div>
  );
}