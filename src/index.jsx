import React, { useState, useEffect } from 'react';

const App = () => {
  const [vendors, setVendors] = useState([
    { id: '1', name: 'Budi', service: 'Tukang Kebun', rating: 4.8, reviewCount: 120, price: 'Rp 60.000/jam', profilePic: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=BUDI' },
    { id: '2', name: 'Santi', service: 'House Cleaning', rating: 4.9, reviewCount: 250, price: 'Rp 75.000/jam', profilePic: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=SANTI' },
    { id: '3', name: 'Joko', service: 'Tukang Listrik', rating: 4.5, reviewCount: 85, price: 'Rp 80.000/jam', profilePic: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=JOKO' },
  ]);
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Memeriksa preferensi mode gelap dari sistem operasi
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Fungsi untuk beralih mode gelap
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <div className="relative text-center p-8 bg-white dark:bg-gray-800 rounded-b-3xl shadow-xl transition-colors duration-300">
              <button
                onClick={toggleDarkMode}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                Dibantuin
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Butuh sesuatu? Sini dibantuin.
              </p>
              <div className="relative mt-6 max-w-lg mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                  placeholder="Cari layanan..."
                  required
                />
              </div>
            </div>

            <main className="p-4 md:p-8">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kategori Layanan</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                  {['House Cleaning', 'Teknisi', 'Jasa Antar', 'Tukang Kebun', 'Tukar Air', 'Tukang Listrik'].map((category) => (
                    <div key={category} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer">
                      <span className="text-3xl mb-2 block">
                        {category === 'House Cleaning' && '🧹'}
                        {category === 'Teknisi' && '🔧'}
                        {category === 'Jasa Antar' && '🚚'}
                        {category === 'Tukang Kebun' && '🧑‍🌾'}
                        {category === 'Tukar Air' && '💧'}
                        {category === 'Tukang Listrik' && '⚡'}
                      </span>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vendor Pilihan</h2>
                {vendors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendors.map((vendor) => (
                      <div key={vendor.id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={vendor.profilePic} alt={vendor.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{vendor.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{vendor.service}</p>
                          <p className="text-base text-gray-800 dark:text-gray-200 font-semibold mt-1">{vendor.price}</p>
                          <div className="flex items-center text-yellow-400 text-sm mt-1">
                            <span>⭐ {vendor.rating}</span>
                            <span className="text-gray-500 text-xs ml-2">({vendor.reviewCount} ulasan)</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                      Belum ada vendor yang terdaftar. Anda bisa tambahkan vendor baru.
                    </p>
                  </div>
                )}
              </section>
              
              {/* Bagian Baru untuk Informasi Tentang Dibantuin */}
              <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-colors duration-300 border-2 border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tentang Dibantuin</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Dibantuin adalah platform inovatif yang dirancang untuk menghubungkan Anda dengan berbagai layanan profesional yang Anda butuhkan, mulai dari kebersihan rumah, perbaikan teknis, hingga perawatan taman. Kami berkomitmen untuk menyediakan layanan berkualitas tinggi dengan harga transparan dari vendor pilihan yang telah terverifikasi.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
                  Misi kami adalah menyederhanakan cara Anda menemukan bantuan, memastikan setiap transaksi aman, nyaman, dan memuaskan. Dengan Dibantuin, Anda bisa mendapatkan bantuan yang Anda butuhkan dengan mudah dan cepat, sehingga Anda memiliki lebih banyak waktu untuk hal-hal yang penting.
                </p>
              </section>
            </main>
            
            {/* Footer */}
            <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              <p>Crafted with ❤️ by Laniakea Digital // Naimy.</p>
            </footer>
          </>
        );
      case 'search':
        return <div className="p-4 text-center">Halaman Pencarian</div>;
      case 'likes':
        return <div className="p-4 text-center">Halaman Favorit</div>;
      case 'profile':
        return <div className="p-4 text-center">Halaman Profil</div>;
      default:
        return null;
    }
  };


  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto pb-20">
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-xl z-50 transition-colors duration-300">
        <ul className="flex justify-around items-center h-16 max-w-xl mx-auto">
          {['home', 'search', 'likes', 'profile'].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center p-3 rounded-xl transition-colors duration-300 ${activeTab === tab ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'}`}
              >
                {tab === 'home' && <span className="text-2xl">🏠</span>}
                {tab === 'search' && <span className="text-2xl">🔎</span>}
                {tab === 'likes' && <span className="text-2xl">❤️</span>}
                {tab === 'profile' && <span className="text-2xl">👤</span>}
                <span className="text-xs mt-1 capitalize">{tab}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default App;
