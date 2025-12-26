'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative">
      <div className="h-[500px]">
        <Image
          height={400}
          width={1600}
          src={
            'https://res.cloudinary.com/dzfrakxek/image/upload/v1766645764/pang-yuhao-_kd5cxwZOK4-unsplash_f5ulve.jpg'
          }
          alt=""
          className="h-full w-full object-cover"
        ></Image>
      </div>
      <div className="absolute top-0  h-full w-full flex justify-center pt-18 bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0.64)_100%)]">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className=" p-4 md:p-10 max-w-7xl mx-auto w-fit h-fit text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Find Your <span className="text-rose-600">Dream University</span>
          </h1>
          <p className=" md:text-xl text-white text-shadow-lg max-w-3xl mx-auto">
            Discover top universities worldwide that match your academic profile
            and budget. Start your journey today!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
