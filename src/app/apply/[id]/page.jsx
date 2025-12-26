'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '@/Components/Loading/Loading';

export default function ApplyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [university, setUniversity] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUniversity = async () => {
      setLoading(true);
      const res = await fetch(`/api/universities/${id}`);
      if (res.ok) {
        const data = await res.json();
        setUniversity(data);
      }
      setLoading(false);
    };
    fetchUniversity();
  }, [id]);

  const handelApplication = async (data) => {
    if (!data.name || !data.email || !data.gpa || !data.ielts) {
      toast.error('Please fill in all fields.');
      return;
    }
    const info = data;
    info.university_id = id;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to apply to this university?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.post('/api/applications', info);
        if (res.data.success) {
          Swal.fire({
            title: 'Success',
            text: 'Application Submitted Successfully!',
            icon: 'success',
          });
          router.push('/');
        } else {
          Swal.fire({
            title: 'Cancelled',
            text: res.data.message,
            icon: 'error',
          });
        }
      }
    });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        {university && (
          <div className="bg-white rounded-3xl overflow-hidden mb-12 border border-slate-200">
            <div className="bg-linear-to-br from-rose-600 to-rose-800 px-8 py-12 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {university.name}
              </h1>
              <p className="text-indigo-100 text-lg">
                Complete your application
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                  {university.image ? (
                    <Image
                      src={university.image}
                      alt={university.name}
                      height={300}
                      width={400}
                      className="object-cover h-full w-full hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-semibold">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-6">
                  <div className="bg-rose-50 rounded-xl p-6 border border-slate-200 hover:border-rose-300 transition-colors">
                    <p className="text-sm font-semibold text-slate-600 mb-2">
                      Location
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {university.country}
                    </p>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-6 border border-slate-200 hover:border-rose-300 transition-colors">
                    <p className="text-sm font-semibold text-slate-600 mb-2">
                      Degree Level
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {university.degree}
                    </p>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-6 border border-slate-200 hover:border-rose-300 transition-colors">
                    <p className="text-sm font-semibold text-slate-600 mb-2">
                      Tuition Fee
                    </p>
                    <p className="text-2xl font-bold text-rose-600">
                      ${university.tuition_fee.toLocaleString()}/yr
                    </p>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-6 border border-slate-200 hover:border-rose-300 transition-colors">
                    <p className="text-sm font-semibold text-slate-600 mb-2">
                      Min. GPA
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {university.min_gpa}
                    </p>
                  </div>
                  <div className="col-span-2 bg-rose-50 rounded-xl p-6 border border-slate-200 hover:border-rose-300 transition-colors">
                    <p className="text-sm font-semibold text-slate-600 mb-2">
                      Min. IELTS Score
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {university.min_ielts}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 border-t border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Application Form
              </h2>
              <p className="text-slate-600 mb-8">
                Fill in your details to complete your application
              </p>

              <form onSubmit={handleSubmit(handelApplication)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register('name')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register('email')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      GPA *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="5"
                      placeholder="3.50"
                      {...register('gpa')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      IELTS Score *
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="9"
                      placeholder="7.0"
                      {...register('ielts')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-8 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="px-8 py-3 rounded-xl text-slate-700 font-semibold border border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
