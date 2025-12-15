import React, { useState } from 'react';
import QRCodeGenerator from './QRCodeGenerator';

const HomePage = ({ userInfo, onNavigateToMenu }) => {
  const [showQR, setShowQR] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-8 max-w-md">
          {/* Animated Café Icon */}
          <div className="relative">
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-orange-400 via-orange-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-6xl"><img src="coffee-cup.png" alt="" /></div>
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full animate-bounce delay-400 flex items-center justify-center text-2xl">
              <img src="burger.png" alt="" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full animate-bounce delay-400 flex items-center justify-center text-xl">
              <img src="cup.png" alt="" />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to<br />
              <span className="bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
                NextGen Café
              </span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              Experience premium dining at Table {userInfo.tableId}.<br />
              Discover our exquisite menu crafted with love.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-teal-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Order Now Button */}
          <button
            onClick={onNavigateToMenu}
            className="group relative w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-2xl font-bold text-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center justify-center space-x-3">
              <span>Order Now</span>
              <span className="text-2xl group-hover:animate-ping">🍽️</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {/* 5-Star Experience Card with Modal */}
            <button
              className="bg-white rounded-xl p-4 shadow-sm cursor-pointer w-full"
              onClick={() => setShowReviewsModal(true)}
            >
              <div className="text-2xl mb-2">🏆</div>
              <p className="text-sm font-medium text-gray-700">5-Star Experience</p>
            </button>
            {/* Quick Service Card with Modal */}
            <button
              className="bg-white rounded-xl p-4 shadow-sm cursor-pointer w-full"
              onClick={() => setShowContactModal(true)}
            >
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm font-medium text-gray-700">Quick Service</p>
            </button>
            {/* Reviews Modal */}
            {showReviewsModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl relative animate-fade-in">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                    onClick={() => setShowReviewsModal(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <div className="font-semibold mb-2 text-gray-800 text-lg">Recent Positive Reviews</div>
                  <ul className="text-base text-gray-600 space-y-3 max-h-80 overflow-y-auto pr-1">
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">👩‍🍳</span>
                        <span className="font-semibold text-gray-800">Priya S.</span>
                      </div>
                      <div className="ml-10">"Amazing food and ambiance! ⭐⭐⭐⭐⭐"</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-lg">👨‍💼</span>
                        <span className="font-semibold text-gray-800">Rahul M.</span>
                      </div>
                      <div className="ml-10">"Service was quick and staff were friendly."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-lg">👩‍🎓</span>
                        <span className="font-semibold text-gray-800">Ayesha K.</span>
                      </div>
                      <div className="ml-10">"Loved the desserts! Will come again."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg">👨‍🍳</span>
                        <span className="font-semibold text-gray-800">Siddharth P.</span>
                      </div>
                      <div className="ml-10">"Best café experience in town."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-lg">👩‍💼</span>
                        <span className="font-semibold text-gray-800">Meera D.</span>
                      </div>
                      <div className="ml-10">"The coffee is top-notch!"</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-lg">👨‍🎓</span>
                        <span className="font-semibold text-gray-800">Arjun V.</span>
                      </div>
                      <div className="ml-10">"Clean, cozy, and delicious menu."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-lg">👩‍🍳</span>
                        <span className="font-semibold text-gray-800">Sneha T.</span>
                      </div>
                      <div className="ml-10">"Perfect for family outings."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">👨‍💼</span>
                        <span className="font-semibold text-gray-800">Vikram S.</span>
                      </div>
                      <div className="ml-10">"Great value for money."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-lg">👩‍🎓</span>
                        <span className="font-semibold text-gray-800">Fatima Z.</span>
                      </div>
                      <div className="ml-10">"Staff went above and beyond."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-lg">👨‍🍳</span>
                        <span className="font-semibold text-gray-800">Rohan G.</span>
                      </div>
                      <div className="ml-10">"Loved the digital menu and QR ordering."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg">👩‍💼</span>
                        <span className="font-semibold text-gray-800">Neha J.</span>
                      </div>
                      <div className="ml-10">"Fresh ingredients, tasty food."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-lg">👨‍🎓</span>
                        <span className="font-semibold text-gray-800">Aman K.</span>
                      </div>
                      <div className="ml-10">"Super fast service!"</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-lg">👩‍🍳</span>
                        <span className="font-semibold text-gray-800">Divya R.</span>
                      </div>
                      <div className="ml-10">"Beautiful interior and vibe."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-lg">👨‍💼</span>
                        <span className="font-semibold text-gray-800">Karan S.</span>
                      </div>
                      <div className="ml-10">"Highly recommend the breakfast platter."</div>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">👩‍🎓</span>
                        <span className="font-semibold text-gray-800">Simran P.</span>
                      </div>
                      <div className="ml-10">"Will definitely visit again!"</div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Contact Modal */}
            {showContactModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                    onClick={() => setShowContactModal(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <div className="font-semibold mb-2 text-gray-800 text-lg">Find Us & Contact</div>
                  <div className="mb-2">
                    <iframe
                      title="Restaurant Map"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=73.1237%2C22.2994%2C73.1237%2C22.2994&amp;layer=mapnik&marker=22.2994,73.1237"
                      className="w-full h-28 rounded-md border"
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div><span className="font-semibold">Address:</span> Parul University, P.O. Limda, Ta. Waghodia, Dist. Vadodara – 391760, Gujarat, India</div>
                    <div><span className="font-semibold">Phone:</span> <a href="tel:+912345678900" className="text-blue-600 hover:underline">+91 23456 78900</a></div>
                    <div><span className="font-semibold">Email:</span> <a href="mailto:info@nextgencafe.com" className="text-blue-600 hover:underline">info@nextgencafe.com</a></div>
                  </div>
                </div>
              </div>
            )}
            {/* Table QR Card */}
            <button
              onClick={() => setShowQR(true)}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">📱</div>
              <p className="text-sm font-medium text-gray-700">Table QR</p>
            </button>
          </div>

          {/* QR Code Modal */}
          {showQR && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative animate-fade-in">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                  onClick={() => setShowQR(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="font-semibold mb-3 text-gray-800 text-lg text-center">Table {userInfo.tableId} QR</div>
                <div className="flex items-center justify-center">
                  <QRCodeGenerator tableId={userInfo.tableId} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;