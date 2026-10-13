'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Lock, 
  Activity, 
  Users, 
  ShoppingCart, 
  Package, 
  RefreshCw, 
  LogOut, 
  Eye, 
  EyeOff, 
  Globe, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Shield,
  Radio
} from 'lucide-react';

interface Visitor {
  id: string;
  ip_hash: string;
  country: string;
  city: string;
  current_path: string;
  referrer: string;
  device: string;
  cart_count: number;
  last_active_at: number;
  created_at: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  total_amount: number;
  currency: string;
  payment_status: string;
  fulfillment_status: string;
  supplier_order_id?: string;
  tracking_number?: string;
  tracking_url?: string;
  created_at: string;
  items: string;
}

interface AdminData {
  stats: {
    onlineNow: number;
    totalToday: number;
    activeCarts: number;
    totalOrders: number;
  };
  visitors: Visitor[];
  orders: Order[];
  timestamp: number;
}

// Country code to Flag emoji mapping
function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function formatTimeAgo(timestamp: number, now: number): string {
  const diffSec = Math.floor((now - timestamp) / 1000);
  if (diffSec < 5) return 'Ką tik';
  if (diffSec < 60) return `prieš ${diffSec} s`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `prieš ${diffMin} min.`;
  const diffHours = Math.floor(diffMin / 60);
  return `prieš ${diffHours} val.`;
}

function cleanPathName(path: string): string {
  if (!path || path === '/' || path === '/lt' || path === '/en') return 'Pradinis puslapis';
  if (path.includes('#')) {
    const slug = path.split('#')[1];
    return 'Prekė / Skiltis: #' + slug;
  }
  return path;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [data, setData] = useState<AdminData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSyncingFulfillment, setIsSyncingFulfillment] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState<'visitors' | 'orders' | 'system'>('visitors');
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Check login and fetch initial data
  const fetchData = useCallback(async () => {
    try {
      setIsLoadingData(true);
      const res = await fetch('/api/admin/data');
      if (res.status === 401) {
        setIsAuthenticated(false);
        setData(null);
        return;
      }
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setIsAuthenticated(true);
        setCurrentTime(Date.now());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const handleSyncFulfillment = async () => {
    try {
      setIsSyncingFulfillment(true);
      await fetch('/api/sync-fulfillment', { method: 'POST' });
      await fetchData();
    } catch (err) {
      console.error('Failed to sync fulfillment:', err);
    } finally {
      setIsSyncingFulfillment(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Live auto-refresh every 5 seconds
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, fetchData]);

  // Update relative time clock every 3 seconds
  useEffect(() => {
    const clock = setInterval(() => setCurrentTime(Date.now()), 3000);
    return () => clearInterval(clock);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthenticated(true);
        setPassword('');
        fetchData();
      } else {
        setLoginError(json.error || 'Neteisingas slaptažodis');
      }
    } catch {
      setLoginError('Ryšio klaida, bandykite vėliau');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setData(null);
  };

  // Loading state while checking session
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#121211] flex items-center justify-center text-stone-400">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-[#f5cb5c]" />
          <span>Kraunama valdymo konsolė...</span>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121211] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1a1a19] border border-[#2e2e2c] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f5cb5c]/10 border border-[#f5cb5c]/30 text-[#f5cb5c] mb-4 shadow-inner">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">LaserSupply Valdymas</h1>
            <p className="text-stone-400 text-sm mt-1">Įveskite administratoriaus slaptažodį</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Slaptažodis
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#121211] border border-[#333330] rounded-xl px-4 py-3.5 text-white placeholder-stone-600 focus:outline-none focus:border-[#f5cb5c] transition-colors pr-11 font-mono text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-2.5 rounded-xl text-xs font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#f5cb5c] hover:bg-[#eab308] text-[#1c1c1b] font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#f5cb5c]/20 hover:shadow-[#f5cb5c]/35 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Tikrinama...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Prisijungti</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  const visitors = data?.visitors || [];
  const orders = data?.orders || [];
  const stats = data?.stats || { onlineNow: 0, totalToday: 0, activeCarts: 0, totalOrders: 0 };

  return (
    <div className="min-h-screen bg-[#121211] text-stone-200 font-sans pb-16">
      {/* Top Header */}
      <header className="bg-[#181817] border-b border-[#262624] sticky top-0 z-30 backdrop-blur-md bg-[#181817]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f5cb5c]/10 border border-[#f5cb5c]/30 flex items-center justify-center text-[#f5cb5c]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-white text-base tracking-tight">LaserSupply Valdymo Pultas</h1>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Gyvas radaras
                </span>
              </div>
              <p className="text-xs text-stone-400">Realaus laiko lankytojų ir užsakymų stebėjimas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
                autoRefresh
                  ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300'
                  : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>{autoRefresh ? 'Auto-atnaujinimas (5s)' : 'Pristabdyta'}</span>
            </button>

            <button
              onClick={fetchData}
              disabled={isLoadingData}
              className="p-2 bg-[#222220] hover:bg-[#2b2b28] border border-[#333330] rounded-lg text-stone-300 transition-colors"
              title="Atnaujinti dabar"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin text-[#f5cb5c]' : ''}`} />
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 bg-[#222220] hover:bg-[#2b2b28] border border-[#333330] rounded-lg text-stone-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Atidaryti parduotuvę</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 rounded-lg text-red-300 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Atsijungti</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Online Now */}
          <div className="bg-[#181817] border border-[#2b2b29] rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Naršo šią sekundę</span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-emerald-400">{stats.onlineNow}</span>
              <span className="text-xs text-stone-400 font-medium">lankytojai gyvai</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">Aktyvūs per paskutines 90 sekundžių</p>
          </div>

          {/* Card 2: Today's Total */}
          <div className="bg-[#181817] border border-[#2b2b29] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Šiandien iš viso</span>
              <Users className="w-4 h-4 text-stone-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">{stats.totalToday}</span>
              <span className="text-xs text-stone-400 font-medium">unikalios sesijos</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">Nuo šiandien 00:00</p>
          </div>

          {/* Card 3: Active Carts */}
          <div className="bg-[#181817] border border-[#2b2b29] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Krepšeliai su prekėmis</span>
              <ShoppingCart className="w-4 h-4 text-[#f5cb5c]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#f5cb5c]">{stats.activeCarts}</span>
              <span className="text-xs text-stone-400 font-medium">aktyvūs</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">Lankytojai, turintys bent 1 prekę</p>
          </div>

          {/* Card 4: Orders */}
          <div className="bg-[#181817] border border-[#2b2b29] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Užsakymai</span>
              <Package className="w-4 h-4 text-sky-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-sky-400">{stats.totalOrders}</span>
              <span className="text-xs text-stone-400 font-medium">duomenų bazėje</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">Stripe & D1 sinchronizacija</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-[#262624] pb-4">
          <button
            onClick={() => setActiveTab('visitors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'visitors'
                ? 'bg-[#f5cb5c] text-[#1c1c1b] shadow-lg shadow-[#f5cb5c]/20'
                : 'bg-[#1a1a19] text-stone-400 hover:text-white border border-[#2e2e2c]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Gyvas lankytojų radaras ({visitors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#f5cb5c] text-[#1c1c1b] shadow-lg shadow-[#f5cb5c]/20'
                : 'bg-[#1a1a19] text-stone-400 hover:text-white border border-[#2e2e2c]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gauti užsakymai ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'system'
                ? 'bg-[#f5cb5c] text-[#1c1c1b] shadow-lg shadow-[#f5cb5c]/20'
                : 'bg-[#1a1a19] text-stone-400 hover:text-white border border-[#2e2e2c]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Sistemos būsena (API & Ryšiai)</span>
          </button>
        </div>

        {/* Tab 1: Live Visitors Radar */}
        {activeTab === 'visitors' && (
          <div className="bg-[#181817] border border-[#262624] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#262624] flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white text-sm">Aktyvūs ir neseniai apsilankę lankytojai</h2>
                <p className="text-xs text-stone-400">Atnaujinama realiu laiku per Cloudflare kraštinį tinklą</p>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                Paskutinis atnaujinimas: {new Date(currentTime).toLocaleTimeString('lt-LT')}
              </span>
            </div>

            {visitors.length === 0 ? (
              <div className="p-12 text-center text-stone-500">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium">Lankytojų istorija dar renkama...</p>
                <p className="text-xs mt-1">Apsilankykite parduotuvėje kitoje naršyklės kortelėje ir iškart pamatysite save čia!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#141413] text-stone-400 border-b border-[#242422] uppercase tracking-wider font-semibold text-[11px]">
                      <th className="py-3 px-4">Būsena</th>
                      <th className="py-3 px-4">Šalis & Miestas</th>
                      <th className="py-3 px-4">Žiūrimas puslapis / Prekė</th>
                      <th className="py-3 px-4">Krepšelis</th>
                      <th className="py-3 px-4">Įrenginys</th>
                      <th className="py-3 px-4">Paskutinis veiksmas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222220]">
                    {visitors.map((v) => {
                      const isOnline = currentTime - v.last_active_at < 90000;
                      const isRecent = currentTime - v.last_active_at < 300000;

                      return (
                        <tr
                          key={v.id}
                          className={`hover:bg-[#1f1f1d] transition-colors ${
                            isOnline ? 'bg-emerald-950/20' : ''
                          }`}
                        >
                          {/* Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {isOnline ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold text-[11px]">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                <span>Online dabar</span>
                              </span>
                            ) : isRecent ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium text-[11px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                <span>Prieš kelias min.</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 text-[11px]">
                                <Clock className="w-3 h-3" />
                                <span>Neaktyvus</span>
                              </span>
                            )}
                          </td>

                          {/* Country & City */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-base" title={v.country}>
                                {getCountryFlag(v.country)}
                              </span>
                              <div>
                                <span className="font-semibold text-white">
                                  {v.country || 'EU'}
                                </span>
                                {v.city && (
                                  <span className="text-stone-400 text-[11px] block">
                                    {v.city}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Page / Product */}
                          <td className="py-3.5 px-4">
                            <div className="max-w-xs truncate">
                              <span className="text-stone-200 font-mono text-xs bg-[#242422] px-2 py-1 rounded border border-[#333330]">
                                {cleanPathName(v.current_path)}
                              </span>
                            </div>
                          </td>

                          {/* Cart */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {v.cart_count > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f5cb5c]/15 border border-[#f5cb5c]/40 text-[#f5cb5c] font-bold">
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>{v.cart_count} vnt.</span>
                              </span>
                            ) : (
                              <span className="text-stone-500 text-[11px]">Tuščias (0)</span>
                            )}
                          </td>

                          {/* Device */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-stone-400">
                              {v.device === 'mobile' ? (
                                <>
                                  <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                                  <span>Telefonas</span>
                                </>
                              ) : (
                                <>
                                  <Monitor className="w-3.5 h-3.5 text-stone-300" />
                                  <span>Kompiuteris</span>
                                </>
                              )}
                            </div>
                          </td>

                          {/* Time Ago */}
                          <td className="py-3.5 px-4 whitespace-nowrap text-stone-400 font-mono text-[11px]">
                            {formatTimeAgo(v.last_active_at, currentTime)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders List */}
        {activeTab === 'orders' && (
          <div className="bg-[#181817] border border-[#262624] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#262624] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-white text-sm">Gauti užsakymai (D1 Duomenų Bazė)</h2>
                <p className="text-xs text-stone-400">Sinchronizuota su Stripe Checkout ir AliExpress Dropshipping</p>
              </div>
              <button
                onClick={handleSyncFulfillment}
                disabled={isSyncingFulfillment}
                className="inline-flex items-center gap-2 bg-[#262624] hover:bg-[#333330] border border-[#3a3a37] text-[#f5cb5c] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingFulfillment ? 'animate-spin' : ''}`} />
                <span>{isSyncingFulfillment ? 'Tikrinama AliExpress...' : 'Atnaujinti siuntų statusus'}</span>
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center text-stone-500">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium">Užsakymų dar nėra.</p>
                <p className="text-xs mt-1">Kai klientas atliks mokėjimą, užsakymas iškart atsiras čia.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#141413] text-stone-400 border-b border-[#242422] uppercase tracking-wider font-semibold text-[11px]">
                      <th className="py-3 px-4">Užsakymo ID</th>
                      <th className="py-3 px-4">Klientas</th>
                      <th className="py-3 px-4">Suma</th>
                      <th className="py-3 px-4">Mokėjimas</th>
                      <th className="py-3 px-4">Tiekėjo statusas</th>
                      <th className="py-3 px-4">Siuntos sekimas</th>
                      <th className="py-3 px-4">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222220]">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-[#1f1f1d] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#f5cb5c] whitespace-nowrap">
                          #{o.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-white">{o.customer_name || 'Klientas'}</p>
                          <p className="text-stone-400 text-[11px]">{o.customer_email}</p>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-400 whitespace-nowrap">
                          €{Number(o.total_amount).toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                            {o.payment_status || 'Apmokėta'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {o.fulfillment_status === 'fulfilled' ? (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3" />
                              Išsiųsta (Fulfilled)
                            </span>
                          ) : o.fulfillment_status === 'simulated_test' ? (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/60 border border-amber-500/30 text-amber-300">
                              Simuliacinis testas
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-stone-800 border border-stone-700 text-stone-300">
                              {o.fulfillment_status || 'Vykdoma'}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {o.tracking_number ? (
                            <a
                              href={o.tracking_url || `https://t.17track.net/en#nums=${o.tracking_number}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#f5cb5c] hover:underline bg-[#f5cb5c]/10 px-2 py-1 rounded border border-[#f5cb5c]/20"
                            >
                              <span>{o.tracking_number}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-stone-500 text-[11px]">Ruošiama siunta</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-stone-400 font-mono text-[11px]">
                          {new Date(o.created_at).toLocaleString('lt-LT')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: System Status */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#181817] border border-[#262624] rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#f5cb5c]" />
                <span>AliExpress Dropshipping Ryšys</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[#262624]">
                  <span className="text-stone-400">AppKey</span>
                  <span className="font-mono text-white font-bold">552890</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#262624]">
                  <span className="text-stone-400">Paskyros būsena</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Patvirtinta (Completed)
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#262624]">
                  <span className="text-stone-400">Access Token</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Aktyvus (30 dienų)
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-stone-400">Refresh Token</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Aktyvus (60 dienų)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#181817] border border-[#262624] rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>Mokėjimai & Pranešimai</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[#262624]">
                  <span className="text-stone-400">Stripe Live Checkout</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Aktyvus (Live Keys)
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#262624]">
                  <span className="text-stone-400">Brevo El. paštas</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Aktyvus (akdarbas@gmail.com)
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#262624]">
                  <span className="text-stone-400">D1 Duomenų bazė</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Prijungta (lasersupply-db)
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-stone-400">Prekių katalogas</span>
                  <span className="text-white font-bold">133 profesionalios prekės</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
