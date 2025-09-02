import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Home, Search, Heart, User, Plus } from 'lucide-react';

// Firebase Configuration & Initialization
// IMPORTANT: These variables are provided by the hosting environment.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Ensure Firebase is initialized only once
let app, auth, db, storage;
try {
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }
} catch (e) {
  console.error("Firebase initialization failed:", e);
}


const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [vendors, setVendors] = useState([]);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const setupFirebaseAndAuth = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
        setIsAuthReady(true);
      } catch (e) {
        console.error("Firebase Auth Error:", e);
        setIsAuthReady(true);
      }
    };
    setupFirebaseAndAuth();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'vendors'));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const vendorsList = [];
      for (const docSnapshot of querySnapshot.docs) {
        const vendor = { id: docSnapshot.id, ...docSnapshot.data() };
        // Fetch image URL from Firestore Storage
        if (vendor.imageUrl) {
          try {
            const imageRef = ref(storage, vendor.imageUrl);
            vendor.profilePic = await getDownloadURL(imageRef);
          } catch (error) {
            console.error("Error fetching image URL:", error);
            vendor.profilePic = 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=PIC';
          }
        } else {
          vendor.profilePic = 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=PIC';
        }
        vendorsList.push(vendor);
      }
      setVendors(vendorsList);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthReady, appId, db, storage]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-b-3xl shadow-xl border-b border-gray-200 dark:border-gray-700">
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
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      <span className="text-3xl mb-2 block">🧹</span>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vendor Pilihan</h2>
                {loading ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                  </div>
                ) : (
                  vendors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {vendors.map((vendor, index) => (
                        <div key={index} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                          <img src={vendor.profilePic} alt={vendor.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{vendor.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{vendor.service}</p>
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
                  )
                )}
              </section>
            </main>
          </>
        );
      case 'search':
        return <div className="p-4 text-center">Halaman Pencarian</div>;
      case 'add':
        return <div className="p-4 text-center">Halaman Tambah Layanan</div>;
      case 'likes':
        return <div className="p-4 text-center">Halaman Favorit</div>;
      case 'profile':
        return <div className="p-4 text-center">Halaman Profil</div>;
      default:
        return null;
    }
  };


  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto pb-20">
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-xl z-50">
        <ul className="flex justify-around items-center h-16 max-w-xl mx-auto">
          {['home', 'search', 'add', 'likes', 'profile'].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center text-gray-500 dark:text-gray-400 ${activeTab === tab ? 'text-blue-600 dark:text-blue-400' : ''}`}
              >
                {tab === 'home' && <Home size={24} />}
                {tab === 'search' && <Search size={24} />}
                {tab === 'add' && <Plus size={24} />}
                {tab === 'likes' && <Heart size={24} />}
                {tab === 'profile' && <User size={24} />}
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
