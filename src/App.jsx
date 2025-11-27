import React, { useState } from 'react';
import { CreditCard, Gift, BarChart3, User, QrCode, Star, TrendingUp, Calendar } from 'lucide-react';

export default function LoyaltyCardApp() {
  const [activeTab, setActiveTab] = useState('card');
  const [points, setPoints] = useState(1247);
  const [level, setLevel] = useState('Gold');
  const [brightness, setBrightness] = useState(100);
  
  const customerData = {
    name: 'Jan Kowalski',
    cardNumber: '5428 9012 3456 7890',
    barcode: '5428901234567890',
    memberSince: '2022-03-15',
    email: 'jan.kowalski@example.com'
  };

  const transactions = [
    { id: 1, date: '2024-11-20', shop: 'Sklep Centrum', amount: 156.50, points: 15 },
    { id: 2, date: '2024-11-15', shop: 'Sklep Galeria', amount: 89.20, points: 8 },
    { id: 3, date: '2024-11-10', shop: 'Sklep Rataje', amount: 234.80, points: 23 },
    { id: 4, date: '2024-11-05', shop: 'Sklep Centrum', amount: 67.40, points: 6 },
  ];

  const rewards = [
    { id: 1, name: '10 zł rabatu', points: 500, icon: '💰' },
    { id: 2, name: 'Darmowa dostawa', points: 300, icon: '🚚' },
    { id: 3, name: '15% zniżki', points: 800, icon: '🎁' },
    { id: 4, name: 'Darmowy produkt', points: 1000, icon: '🎉' },
  ];

  const generateBarcode = (code) => {
    const bars = code.split('').map(digit => {
      const patterns = ['0001101', '0011001', '0010011', '0111101', '0100011', 
                       '0110001', '0101111', '0111011', '0110111', '0001011'];
      return patterns[parseInt(digit)];
    }).join('');

    return (
      <svg width="100%" height="80" viewBox="0 0 300 80" className="mx-auto">
        {bars.split('').map((bar, i) => (
          bar === '1' && (
            <rect key={i} x={i * 2} y="0" width="2" height="60" fill="black" />
          )
        ))}
        <text x="150" y="75" textAnchor="middle" fontSize="12" fill="black" fontFamily="monospace">
          {code}
        </text>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Moja Karta</h1>
              <p className="text-purple-100 text-sm">Program lojalnościowy</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{points}</div>
              <div className="text-xs text-purple-100">punktów</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {activeTab === 'card' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-300" size={24} fill="currentColor" />
                    <span className="font-bold text-lg">{level} Member</span>
                  </div>
                  <CreditCard size={32} />
                </div>
                
                <div className="mb-6">
                  <div className="text-sm opacity-80 mb-1">Numer karty</div>
                  <div className="text-2xl font-bold tracking-wider">{customerData.cardNumber}</div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-sm opacity-80 mb-1">Właściciel</div>
                    <div className="font-semibold text-lg">{customerData.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-80 mb-1">Członek od</div>
                    <div className="font-semibold">{new Date(customerData.memberSince).toLocaleDateString('pl-PL')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Kod do skanowania</h2>
                <p className="text-sm text-gray-600">Pokaż ten kod przy kasie</p>
              </div>
              
              <div 
                className="bg-white border-4 border-gray-200 rounded-xl p-6 mb-4"
                style={{ filter: `brightness(${brightness}%)` }}
              >
                {generateBarcode(customerData.barcode)}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-600">Jasność:</span>
                <input
                  type="range"
                  min="80"
                  max="150"
                  value={brightness}
                  onChange={(e) => setBrightness(e.target.value)}
                  className="flex-1"
                />
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3 text-sm">
                  <QrCode className="text-purple-600" size={20} />
                  <span className="text-gray-700">Zbierz punkty przy każdym zakupie!</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <TrendingUp className="text-purple-600" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{transactions.length}</div>
                </div>
                <div className="text-sm text-gray-600">Transakcje</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Calendar className="text-pink-600" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {Math.floor((Date.now() - new Date(customerData.memberSince)) / (1000 * 60 * 60 * 24 * 30))}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Miesięcy</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Twoje punkty</h2>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-purple-600">{points}</span>
                <span className="text-gray-600">punktów</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                  style={{ width: `${(points % 1000) / 10}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Do następnego poziomu: {1000 - (points % 1000)} pkt</p>
            </div>

            <h3 className="text-lg font-bold text-gray-800 px-2">Dostępne nagrody</h3>
            {rewards.map(reward => (
              <div key={reward.id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{reward.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">{reward.name}</h4>
                      <p className="text-sm text-gray-600">{reward.points} punktów</p>
                    </div>
                  </div>
                  <button
                    disabled={points < reward.points}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      points >= reward.points
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {points >= reward.points ? 'Odbierz' : 'Zablokowane'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 px-2">Historia zakupów</h2>
            {transactions.map(transaction => (
              <div key={transaction.id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{transaction.shop}</h4>
                    <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString('pl-PL')}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{transaction.amount.toFixed(2)} zł</div>
                    <div className="text-sm text-purple-600">+{transaction.points} pkt</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {customerData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{customerData.name}</h2>
                  <p className="text-gray-600">{customerData.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Numer karty</label>
                  <div className="font-mono font-bold text-gray-800">{customerData.cardNumber}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Status</label>
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500" size={20} fill="currentColor" />
                    <span className="font-bold text-gray-800">{level} Member</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('card')}
              className={`flex flex-col items-center py-2 px-4 ${
                activeTab === 'card' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <CreditCard size={24} />
              <span className="text-xs mt-1">Karta</span>
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`flex flex-col items-center py-2 px-4 ${
                activeTab === 'rewards' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <Gift size={24} />
              <span className="text-xs mt-1">Nagrody</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex flex-col items-center py-2 px-4 ${
                activeTab === 'history' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <BarChart3 size={24} />
              <span className="text-xs mt-1">Historia</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center py-2 px-4 ${
                activeTab === 'profile' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <User size={24} />
              <span className="text-xs mt-1">Profil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
