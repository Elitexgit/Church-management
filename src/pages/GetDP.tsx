import { useState, useRef } from 'react';
import { Download, Camera, Palette, Share2, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useAuth } from '../contexts/AuthContext';

interface TemplateColor {
  name: string;
  from: string;
  to: string;
}

export default function GetDP() {
  const { profile } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [downloading, setDownloading] = useState(false);

  const templates: TemplateColor[] = [
    { name: 'Classic Blue', from: 'from-blue-500', to: 'to-blue-700' },
    { name: 'Royal Purple', from: 'from-purple-500', to: 'to-purple-700' },
    { name: 'Elegant Gold', from: 'from-yellow-500', to: 'to-yellow-700' },
    { name: 'Modern Green', from: 'from-green-500', to: 'to-green-700' },
    { name: 'Vibrant Red', from: 'from-red-500', to: 'to-red-700' },
    { name: 'Ocean Teal', from: 'from-teal-500', to: 'to-teal-700' },
  ];

  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    churchBranch: profile?.church_branch || '',
    uploadedImage: '',
    selectedTemplate: 0,
    frameStyle: 'circle',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          uploadedImage: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `DeepLife-DP-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;

        const file = new File([blob], 'dp.png', { type: 'image/png' });

        if (navigator.share) {
          navigator.share({
            files: [file],
            title: 'My Deeper Life Display Picture',
            text: 'Check out my profile picture for the Deeper Life event!',
          });
        } else {
          alert('Share not supported on this device. Please use download instead.');
        }
      });
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  const currentTemplate = templates[formData.selectedTemplate];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Generate Display Picture</h1>
        <p className="text-gray-600 text-lg">Create personalized profile pictures for the retreat</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Create Your DP</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Upload Photo</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Camera className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 mb-2 font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Church Branch</label>
              <input
                type="text"
                value={formData.churchBranch}
                onChange={(e) => setFormData({ ...formData, churchBranch: e.target.value })}
                placeholder="Enter your branch"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Template</label>
              <div className="grid grid-cols-3 gap-3">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setFormData({ ...formData, selectedTemplate: index })}
                    className={`relative aspect-square rounded-lg cursor-pointer transition-all ${
                      formData.selectedTemplate === index ? 'ring-2 ring-blue-500 scale-105' : ''
                    }`}
                  >
                    <div
                      className={`w-full h-full bg-gradient-to-br ${template.from} ${template.to} rounded-lg shadow-md hover:shadow-lg transition-shadow`}
                    ></div>
                    {formData.selectedTemplate === index && (
                      <div className="absolute inset-0 rounded-lg bg-white/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Frame Style</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormData({ ...formData, frameStyle: 'circle' })}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.frameStyle === 'circle'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
                >
                  Circle Frame
                </button>
                <button
                  onClick={() => setFormData({ ...formData, frameStyle: 'square' })}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.frameStyle === 'square'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
                >
                  Square Frame
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-gray-400">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview</h2>
            <div
              ref={previewRef}
              className={`aspect-square bg-gradient-to-br ${currentTemplate.from} ${currentTemplate.to} rounded-2xl flex items-center justify-center text-white relative overflow-hidden shadow-xl`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div
                  className={`mb-6 flex items-center justify-center border-4 border-white/30 ${
                    formData.frameStyle === 'circle'
                      ? 'w-48 h-48 rounded-full'
                      : 'w-48 h-48 rounded-3xl'
                  } bg-white/20 overflow-hidden`}
                >
                  {formData.uploadedImage ? (
                    <img
                      src={formData.uploadedImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-16 h-16 text-white/60" />
                  )}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-center">{formData.fullName || 'Your Name'}</h3>
                <p className="text-white/90 mb-6 text-center">{formData.churchBranch || 'Church Branch'}</p>
                <div className="bg-white/20 px-8 py-3 rounded-full backdrop-blur-sm text-center">
                  <p className="font-semibold text-lg">DEEPER LIFE OROZO</p>
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

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tips for Best Results</h2>
            <div className="space-y-3 text-sm text-gray-700">
              {[
                'Use a clear, front-facing photo for best results',
                'Ensure good lighting in your photo',
                'Choose a template that matches your style',
                'Download in high resolution for social media',
              ].map((tip, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs">
                    {index + 1}
                  </div>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
