import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// A single file, self-contained React app.
const App = () => {
  const [db, setDb] = useState(null);
  const [user, setUser] = useState(null);

  // Use the global variables for Firebase configuration.
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
  const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

  useEffect(() => {
    // Initialize Firebase and authenticate the user.
    const initializeFirebase = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const firestoreDb = getFirestore(app);
        setDb(firestoreDb);

        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
        setUser(auth.currentUser);
        console.log("Firebase initialized successfully.");
      } catch (error) {
        console.error("Error initializing Firebase:", error);
      }
    };
    initializeFirebase();
  }, [firebaseConfig, initialAuthToken]);

  // Updated mock data with Indonesian categories and vendors.
  const serviceCategories = [
    { name: 'House Cleaning', icon: 'House' },
    { name: 'Teknisi', icon: 'Wrench' },
    { name: 'Jasa Antar', icon: 'Truck' },
    { name: 'Tukang Kebun', icon: 'Leaf' },
    { name: 'Tukar Air', icon: 'WaterDrop' },
    { name: 'Tukang Listrik', icon: 'Bolt' },
  ];

  const featuredVendors = [
    { name: 'Budi Santoso', service: 'Tukang Listrik', rating: 5, bio: 'Pengalaman 5+ tahun, sangat profesional.' },
    { name: 'Siti Rahayu', service: 'Tukar Air', rating: 4.8, bio: 'Layanan tukar air cepat dan terpercaya untuk rumah.' },
    { name: 'Ahmad Wijaya', service: 'Teknisi Handal', rating: 4.9, bio: 'Teknisi berlisensi untuk semua kebutuhan perbaikan rumah Anda.' },
    { name: 'Ani Sutomo', service: 'Jasa Antar Barang', rating: 4.7, bio: 'Layanan kurir cepat dan andal untuk bisnis lokal.' },
  ];
  
  const iconMap = {
    'House': 'M2 13h10v8h-10zM14 13h8v8h-8zM2 3h10v8h-10zM14 3h8v8h-8z',
    'Wrench': 'M17 12c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-10-2v4h4v-4zm-2-2v8h8v-8zm2-2v4h4v-4z',
    'Truck': 'M17 12c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-10-2v4h4v-4zm-2-2v8h8v-8zm2-2v4h4v-4z',
    'Leaf': 'M17 12c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-10-2v4h4v-4zm-2-2v8h8v-8zm2-2v4h4v-4z',
    'WaterDrop': 'M17 12c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-10-2v4h4v-4zm-2-2v8h8v-8zm2-2v4h4v-4z',
    'Bolt': 'M17 12c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-10-2v4h4v-4zm-2-2v8h8v-8zm2-2v4h4v-4z',
  };

  const HeroSection = () => {
    return (
      <div className="relative w-full h-96 md:h-[500px] bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: 'url("https://placehold.co/1200x800/22c55e/fff?text=Dibantuin")' }}></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Butuh sesuai? Sini dibantuin
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl">
            Dari kebersihan rumah hingga tukang listrik, temukan layanan yang Anda butuhkan dengan mudah dan cepat.
          </p>
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Jasa apa yang Anda butuhkan?"
              className="w-full pl-5 pr-12 py-3 md:py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-400 shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-green-500 text-white font-semibold transition-colors duration-300 hover:bg-green-600 focus:outline-none">
              Cari
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ServiceCategories = () => {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">Jelajahi Berdasarkan Kategori</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {serviceCategories.map((category) => (
              <div
                key={category.name}
                className="bg-gray-100 p-6 rounded-3xl transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out cursor-pointer flex flex-col items-center text-center"
              >
                {/* Placeholder SVG icon for each category */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-4"
                >
                  <path d={iconMap[category.icon]} />
                </svg>
                <span className="text-lg font-semibold text-gray-800">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const FeaturedVendors = () => {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">Profesional Pilihan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredVendors.map((vendor) => (
              <div
                key={vendor.name}
                className="bg-white p-6 rounded-3xl shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-16 h-16 rounded-full object-cover"
                      src={`https://placehold.co/64x64/22c55e/fff?text=${vendor.name.split(' ')[0][0]}${vendor.name.split(' ')[1][0]}`}
                      alt={vendor.name}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                    <p className="text-sm text-gray-500">{vendor.service}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{vendor.bio}</p>
                <div className="flex items-center justify-center">
                  <span className="text-yellow-400 text-lg mr-2">⭐</span>
                  <span className="text-gray-800 font-semibold">{vendor.rating}</span>
                  <span className="text-gray-500 ml-1">/ 5.0</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="font-sans antialiased text-gray-800 bg-white">
      {/* Tailwind CSS CDN and required scripts */}
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/lucide-react@latest"></script>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-green-600">
            Dibantuin
          </a>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium">
              Login
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium">
              Daftar
            </a>
            <a href="#" className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition-colors duration-300">
              Pasang Jasa
            </a>
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <ServiceCategories />
        <FeaturedVendors />
        
        {/* Call to Action Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap dibantuin?
            </h2>
            <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
              Kami memiliki profesional terpercaya untuk semua kebutuhan Anda, kapan saja, di mana saja.
            </p>
            <a href="#" className="inline-block px-8 py-4 rounded-full bg-green-500 text-white text-lg font-semibold shadow-md hover:bg-green-600 transition-colors duration-300">
              Mulai Sekarang
            </a>
          </div>
        </section>

        {/* User Info for Debugging/Collaboration */}
        <div className="fixed bottom-0 left-0 m-4 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-md">
          <p className="font-bold">App Info</p>
          <p>App ID: {appId}</p>
          <p>User ID: {user?.uid || 'Loading...'}</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2025 Dibantuin. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

const root = createRoot(document.getElementById('root'));
root.render(<App />);
