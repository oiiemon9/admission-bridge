'use client';
import Lottie from 'lottie-react';
import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center py-10">
      <Lottie
        className="h-20 w-20"
        animationData={require('../../../public/loadingAnimation.json')}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}
