"use client";
import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeDisplay = ({ url }) => {
  const qrRef = useRef();

  // Function to handle downloading the QR code as a PNG
  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "bitlinks-qr.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl w-full max-w-sm mx-auto">
      <h3 className="text-xl font-bold text-white mb-4">Your QR Code</h3>
      
      {/* The white background is necessary so the QR code is scannable on dark themes */}
      <div 
        ref={qrRef} 
        className="bg-white p-4 rounded-2xl shadow-inner mb-6"
      >
        <QRCodeCanvas 
          value={url} 
          size={200} 
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"} // High error correction so it scans easily
          includeMargin={false}
        />
      </div>

      <button
        onClick={downloadQR}
        className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        Download PNG
      </button>
    </div>
  );
};

export default QRCodeDisplay;