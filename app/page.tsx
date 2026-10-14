"use client";

import { useState, useRef } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setProgress(0);
    
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        const increment = prev < 50 ? Math.floor(Math.random() * 8) + 2 : Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + increment, 95);
      });
    }, 1500);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/restore", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        setResult(URL.createObjectURL(blob));
        setProgress(100);
      } else {
        alert("Gagal memproses gambar. Periksa terminal backend Anda.");
        setProgress(0);
      }
    } catch (error) {
      console.error(error);
      alert("Pastikan server FastAPI berjalan di port 8000.");
      setProgress(0);
    } finally {
      if (progressInterval.current) clearInterval(progressInterval.current);
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 font-sans flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-8">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">AI Photo Restoration</h1>
          <p className="text-gray-400">Tingkatkan resolusi dan perbaiki wajah pada foto lama Anda menggunakan Deep Learning.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl flex flex-col items-center gap-6">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />

          {loading && (
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm text-gray-300 font-medium">
                <span>Memproses dengan AI...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button 
            onClick={handleUpload} 
            disabled={!file || loading}
            className="w-full py-3 px-4 bg-white text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            {loading ? "Harap Tunggu..." : "Mulai Restorasi"}
          </button>
        </div>

        {/* Area Tampilan Hasil & Tombol Unduh */}
        <div className="w-full flex flex-col items-center mt-8 space-y-4">
          {result && preview ? (
            <>
              <div className="border border-gray-700 rounded-lg overflow-hidden shadow-2xl w-full">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={preview} alt="Foto Asli" />}
                  itemTwo={<ReactCompareSliderImage src={result} alt="Foto Hasil AI" />}
                  className="w-full max-h-125"
                />
                <p className="text-center text-sm text-gray-400 p-2 bg-gray-900">Geser untuk melihat perbedaan</p>
              </div>

              {/* Tombol Unduh Hasil */}
              <a 
                href={result} 
                download="restored-photo.jpg"
                className="py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"
              >
                📥 Unduh Foto Hasil Restorasi
              </a>
            </>
          ) : (
            preview && (
              <img src={preview} alt="Preview" className="max-w-md rounded-lg shadow-lg opacity-70" />
            )
          )}
        </div>

      </div>
    </main>
  );
}