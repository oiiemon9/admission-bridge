'use client';
import React from 'react';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  GraduationCap,
  MapPin,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function UniversitieFilter() {
  const [universities, setUniversities] = useState([]);
  const [minFee, setMinFee] = useState(3000);
  const [maxFee, setMaxFee] = useState(30000);
  const [gpa, setGpa] = useState(3.0);
  const [ielts, setIelts] = useState(6.0);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/universities?min=${minFee}&max=${maxFee}&gpa=${gpa}&ielts=${ielts}&search=${search}`
      );
      const data = await res.json();
      setUniversities(data);
    };
    fetchData();
  }, [minFee, maxFee, gpa, ielts, search]);

  const handleCompare = (uni) => {
    const exists = compareList.find((u) => u.id === uni.id);

    if (exists) {
      setCompareList(compareList.filter((u) => u.id !== uni.id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, uni]);
      } else {
        alert('You can compare maximum 3 universities');
      }
    }
  };
  return (
    <div>
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-6 mb-12 -mt-52 relative border border-gray-300 backdrop-blur-sm"
        >
          <div className=" bg-white  p-4 rounded-xl ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Filter Universities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search University Name
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Harvard"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your GPA
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="4.0"
                  value={gpa}
                  onChange={(e) => setGpa(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="e.g. 3.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your IELTS Score
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="9.0"
                  value={ielts}
                  onChange={(e) => setIelts(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="e.g. 6.5"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Tuition Range:{' '}
                  <span className="font-semibold text-rose-600">
                    ${minFee.toLocaleString()} - ${maxFee.toLocaleString()}
                  </span>
                </label>

                <input
                  type="range"
                  min="3000"
                  max="50000"
                  value={maxFee}
                  onChange={(e) => setMaxFee(e.target.value)}
                  className="range range-error text-rose-600 w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {universities.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No universities match your criteria yet. Try adjusting the
              filters!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.map((u, index) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 relative flex flex-col"
              >
                <div className="flex justify-center absolute top-1 right-1">
                  {u.status === 'Not Eligible' ? (
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                      <X size={20} /> Not Eligible
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <Check size={20} /> Eligible
                    </span>
                  )}
                </div>
                <div className="h-52 w-full">
                  {u?.image ? (
                    <Image
                      height={300}
                      width={150}
                      src={u.image}
                      alt={u.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-[150px] h-[50px] bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {u.name}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 text-nowrap">
                      <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        <GraduationCap size={16} />
                        Min GPA: <strong>{u.min_gpa}</strong>
                      </span>
                      <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                        <BookOpenCheck size={16} /> Min IELTS:{' '}
                        <strong>{u.min_ielts}</strong>
                      </span>
                      <span className="flex items-center gap-1 bg-rose-50 text-rose-700 px-3 py-1 rounded-full">
                        <MapPin size={16} /> {u.country} • {u.degree}
                      </span>
                    </div>
                    <p className=" text-sm ">
                      Tuition:{' '}
                      <span className="text-xl font-bold text-rose-600">
                        ${u.tuition_fee.toLocaleString()}
                      </span>
                      /year
                    </p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input
                      type="checkbox"
                      checked={compareList.some((c) => c.id === u.id)}
                      onChange={() => handleCompare(u)}
                      className="checkbox text-white checked:bg-rose-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Compare this university
                    </span>
                  </label>
                </div>

                <div className="p-6">
                  <motion.div whileHover="hover" className="w-full">
                    <Link
                      href={`/apply/${u.id}`}
                      className="flex justify-center items-center gap-2 w-full text-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                      Apply Now
                      <motion.span
                        variants={{
                          initial: { x: 0 },
                          hover: { x: 8 },
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className=""
                      >
                        <ArrowRight />
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {compareList.length >= 2 && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => setShowCompare(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-indigo-700"
            >
              Compare Now ({compareList.length})
            </button>
          </div>
        )}
      </div>
      {showCompare && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-4xl w-full rounded-2xl p-8 relative">
            <button
              onClick={() => setShowCompare(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              University Comparison
            </h2>

            <div className="grid grid-cols-4 gap-4 text-sm text-center">
              <div className="font-semibold">Feature</div>
              {compareList.map((u) => (
                <div key={u.id} className="font-semibold">
                  {u.name}
                </div>
              ))}

              <div>GPA Requirement</div>
              {compareList.map((u) => (
                <div key={u.id}>{u.min_gpa}</div>
              ))}

              <div>IELTS Requirement</div>
              {compareList.map((u) => (
                <div key={u.id}>{u.min_ielts}</div>
              ))}

              <div>Total Tuition</div>
              {compareList.map((u) => (
                <div key={u.id}>${u.tuition_fee}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
