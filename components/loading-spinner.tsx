"use client";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      <p className="mt-2">読み込み中...</p>
    </div>
  </div>
);

export default LoadingSpinner;
