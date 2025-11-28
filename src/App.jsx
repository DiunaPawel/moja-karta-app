import React, { useState, useEffect } from 'react';
import { CreditCard, Gift, BarChart3, User, QrCode, Star, TrendingUp, Calendar, RefreshCw } from 'lucide-react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyA-JqDIQLl29MqzafmdcAg3NOZ_jO99CDk",
  authDomain: "moja-karta-system-87f5b.firebaseapp.com",
  projectId: "moja-karta-system-87f5b",
  storageBucket: "moja-karta-system-87f5b.firebasestorage.app",
  messagingSenderId: "874314316562",
  appId: "1:874314316562:web:bc19303bdd9d348962d1cb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function LoyaltyCardApp() {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('card');
  const [brightness, setBrightness] = useState(100);
  const [slideDirection, setSlideDirection] = useState('');

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');

    if (!clientId) {
      setError('Brak ID klienta w linku');
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, 'clients', clientId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setCustomerData(docSnap.data());
      } else {
        setError('Nie znaleziono karty');
      }
    } catch (err) {
      setError('Błąd ładowania danych');
      console.error(err);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCustomerData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const changeTab = (tab) => {
    const tabs = ['card', 'rewards', 'history', 'profile'];
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = tabs.indexOf(tab);
    setSlideDirection(newIndex > currentIndex ? 'slide-left' : 'slide-right');
    setActiveTab(tab);
    setTimeout(() => setSlideDirection(''), 300);
  };

  const generateBarcodeImage = (code) => {
    const bars = code.split('').map(digit => {
      const patterns = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
      return patterns[parseInt(digit)];
    }).join('');
    return (
      <svg width="100%" height="80" viewBox="0 0 300 80" className="mx-auto">
        {bars.split('').map((bar, i) => bar === '1' && <rect key={i} x={i * 2} y="0" width="2" height="60" fill="black" />)}
        <text x="150" y="75" textAnchor="middle" fontSize="12" fill="black" fontFamily="monospace">{code}</text>
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (error || !customerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center transform transition-all">
          <div className="text-6xl mb-6 animate-bounce">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Nie znaleziono karty</h1>
          <p className="text-gray-600 mb-6">{error || 'Skontaktuj się z obsługą'}</p>
          <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all">
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  const transactions = [
    { id: 1, date: '2024-11-20', shop: 'Sklep Centrum', amount: 156.50, points: 15 },
    { id: 2, date: '2024-11-15', shop: 'Sklep Galeria', amount: 89.20, points: 8 },
    { id: 3, date: '2024-11-10', shop: 'Sklep Rataje', amount: 234.80, points: 23 },
  ];

  const rewards = [
    { id: 1, name: '10 zł rabatu', points: 500, icon: '💰', desc: 'Użyj przy następnym zakupie' },
    { id: 2, name: 'Darmowa dostawa', points: 300, icon: '🚚', desc: 'Bezpłatna wysyłka' },
    { id: 3, name: '15% zniżki', points: 800, icon: '🎁', desc: 'Na wszystkie produkty' },
    { id: 4, name: 'Darmowy produkt', points: 1000, icon: '🎉', desc: 'Wybierz z katalogu' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pb-20">
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .slide-left { animation: slideInLeft 0.3s ease-out; }
        .slide-right { animation: slideInRight 0.3s ease-out; }
        .card-enter { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header with pull to refresh */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">Moja Karta</h1>
              <p className="text-purple-100 text-sm">Program lojalnościowy</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-1">{customerData.points}</div>
              <div className="text-xs text-purple-100 uppercase tracking-wider">punktów</div>
            </div>
            <button onClick={handleRefresh} disabled={refreshing} className="ml-4 p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all active:scale-95">
              <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Content with animations */}
      <div className={`max-w-4xl mx-auto px-4 py-6 ${slideDirection}`}>
        {activeTab === 'card' && (
          <div className="space-y-6 card-enter">
            {/* Premium Card */}
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-transform">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-24 -mt-24"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-20 -mb-20"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <Star className="text-yellow-300" size={28} fill="currentColor" />
                    <span className="font-bold text-xl">{customerData.level}</span>
                  </div>
                  <CreditCard size={36} />
                </div>
                <div className="mb-8">
                  <div className="text-sm opacity-90 mb-2">Numer karty</div>
                  <div className="text-3xl font-bold tracking-widest">{customerData.cardNumber}</div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Właściciel</div>
                    <div className="font-semibold text-xl">{customerData.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90 mb-1">Członek od</div>
                    <div className="font-semibold text-lg">{new Date(customerData.memberSince).toLocaleDateString('pl-PL', {month: 'short', year: 'numeric'})}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Barcode Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 card-enter">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Kod do skanowania</h2>
                <p className="text-gray-600">Pokaż ten kod przy kasie</p>
              </div>
              <div className="bg-white border-4 border-gray-200 rounded-2xl p-6 mb-6 shadow-inner" style={{ filter: `brightness(${brightness}%)` }}>
                {generateBarcodeImage(customerData.barcode)}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Jasność kodu</span>
                  <span className="font-medium">{brightness}%</span>
                </div>
                <input type="range" min="80" max="150" value={brightness} onChange={(e) => setBrightness(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 mt-6">
                <div className="flex items-center gap-4">
                  <QrCode className="text-purple-600" size={24} />
                  <span className="text-gray-700 font-medium">Zbieraj punkty przy każdym zakupie!</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-lg p-5 card-enter transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <TrendingUp className="text-purple-600" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-800">{transactions.length}</div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Transakcje</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-5 card-enter transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-pink-100 p-3 rounded-xl">
                    <Calendar className="text-pink-600" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-800">{Math.floor((Date.now() - new Date(customerData.memberSince)) / (1000 * 60 * 60 * 24 * 30))}</div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Miesięcy</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-5 card-enter">
            {/* Points Progress */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Twoje punkty</h2>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{customerData.points}</span>
                <span className="text-gray-600 text-lg">punktów</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(customerData.points % 1000) / 10}%` }}></div>
              </div>
              <p className="text-sm text-gray-600">Do następnego poziomu: <span className="font-bold text-purple-600">{1000 - (customerData.points % 1000)} pkt</span></p>
            </div>

            <h3 className="text-xl font-bold text-gray-800 px-2 mt-6 mb-3">Dostępne nagrody</h3>
            {rewards.map((reward, index) => (
              <div key={reward.id} className="bg-white rounded-2xl shadow-lg p-5 card-enter hover:shadow-xl transition-shadow" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-5xl">{reward.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-800 mb-1">{reward.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{reward.desc}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 font-bold">{reward.points}</span>
                        <span className="text-gray-500 text-sm">punktów</span>
                      </div>
                    </div>
                  </div>
                  <button disabled={customerData.points < reward.points} className={`px-6 py-3 rounded-xl font-medium transition-all active:scale-95 ${customerData.points >= reward.points ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}>
                    {customerData.points >= reward.points ? 'Odbierz' : 'Zablokowane'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4 card-enter">
            <h2 className="text-2xl font-bold text-gray-800 px-2 mb-4">Historia zakupów</h2>
            {transactions.map((transaction, index) => (
              <div key={transaction.id} className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-800 mb-1">{transaction.shop}</h4>
                    <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl text-gray-800 mb-1">{transaction.amount.toFixed(2)} zł</div>
                    <div className="text-sm text-purple-600 font-bold">+{transaction.points} pkt</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-5 card-enter">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {customerData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{customerData.name}</h2>
                  <p className="text-gray-600">{customerData.email}</p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="text-sm text-gray-600 block mb-2 font-medium">Numer karty</label>
                  <div className="font-mono font-bold text-lg text-gray-800">{customerData.cardNumber}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="text-sm text-gray-600 block mb-2 font-medium">Status</label>
                  <div className="flex items-center gap-3">
                    <Star className="text-yellow-500" size={24} fill="currentColor" />
                    <span className="font-bold text-lg text-gray-800">{customerData.level} Member</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="text-sm text-gray-600 block mb-2 font-medium">Członek od</label>
                  <div className="font-bold text-lg text-gray-800">{new Date(customerData.memberSince).toLocaleDateString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto px-2 py-2">
          <div className="flex justify-around">
            {[
              { id: 'card', icon: CreditCard, label: 'Karta' },
              { id: 'rewards', icon: Gift, label: 'Nagrody' },
              { id: 'history', icon: BarChart3, label: 'Historia' },
              { id: 'profile', icon: User, label: 'Profil' }
            ].map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => changeTab(id)} className={`flex flex-col items-center py-3 px-5 rounded-2xl transition-all active:scale-95 ${activeTab === id ? 'text-purple-600 bg-purple-50' : 'text-gray-400'}`}>
                <Icon size={26} className="mb-1" />
                <span className="text-xs font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
