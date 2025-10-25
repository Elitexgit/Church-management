import { Download, Camera, Palette, Image as ImageIcon } from 'lucide-react';

export default function GetDP() {
  const templates = [
    {
      name: 'Classic Blue',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      popular: true,
    },
    {
      name: 'Royal Purple',
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
      popular: false,
    },
    {
      name: 'Elegant Gold',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
      popular: true,
    },
    {
      name: 'Modern Green',
      color: 'bg-gradient-to-br from-green-500 to-green-700',
      popular: false,
    },
    {
      name: 'Vibrant Red',
      color: 'bg-gradient-to-br from-red-500 to-red-700',
      popular: false,
    },
    {
      name: 'Ocean Teal',
      color: 'bg-gradient-to-br from-teal-500 to-teal-700',
      popular: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Generate Display Picture</h1>
        <p className="text-gray-600">Create personalized profile pictures and flyers for the retreat</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your DP</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Upload Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Camera className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Church Branch</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select your branch</option>
                <option>Lagos Headquarters</option>
                <option>Abuja</option>
                <option>Port Harcourt</option>
                <option>Ibadan</option>
                <option>Enugu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Template</label>
              <div className="grid grid-cols-3 gap-3">
                {templates.slice(0, 6).map((template, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`${template.color} aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform border-2 border-transparent hover:border-blue-500`}
                    ></div>
                    {template.popular && (
                      <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Popular
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Frame Style</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-3 border-2 border-blue-500 bg-blue-50 text-blue-700 rounded-lg font-medium">
                  Circle Frame
                </button>
                <button className="px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                  Square Frame
                </button>
              </div>
            </div>

            <button className="w-full px-6 py-4 bg-[#2c4f87] text-white rounded-lg hover:bg-[#1e3a5f] transition-colors font-medium text-lg flex items-center justify-center gap-2">
              <Palette className="w-5 h-5" />
              Generate DP
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview</h2>
            <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center mb-6 border-4 border-white/30">
                  <Camera className="w-16 h-16 text-white/60" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Your Name</h3>
                <p className="text-white/90 mb-4">Church Branch</p>
                <div className="bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm">
                  <p className="font-semibold">DECEMBER RETREAT 2024</p>
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-red-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold">DEEPER LIFE</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Share
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Tips</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <p>Use a clear, front-facing photo for best results</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <p>Ensure good lighting in your photo</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <p>Choose a template that matches your style</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <p>Download in high resolution for social media</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gallery</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden group cursor-pointer relative">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Need a Custom Design?</h2>
            <p className="text-gray-700 mb-4">
              Our design team can create personalized flyers, banners, and promotional materials for your specific needs.
            </p>
            <button className="px-6 py-3 bg-[#2c4f87] text-white rounded-lg hover:bg-[#1e3a5f] transition-colors font-medium">
              Request Custom Design
            </button>
          </div>
          <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
            <Palette className="w-20 h-20 text-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
