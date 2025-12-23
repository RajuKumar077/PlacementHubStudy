'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { api } from '@/lib/api';

interface LearningPath {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  totalDuration: number;
}

export default function Home() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const response = await api.get('/api/learning-paths');
        setPaths(response.data);
      } catch (error) {
        console.error('Error fetching paths:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaths();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to PlacementHubStudy</h1>
          <p className="text-xl mb-8">Bridge the gap between academic learning and industry expectations</p>
          {!user && (
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/auth/login')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/auth/register')}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PlacementHubStudy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Structured Learning', desc: 'Organized learning paths from basics to advanced' },
              { title: 'Hands-on Projects', desc: 'Real-world project experience for portfolio building' },
              { title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed analytics' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Learning Paths</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paths.slice(0, 6).map((path) => (
                <div key={path._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32 p-4 text-white">
                    <h3 className="text-xl font-bold">{path.title}</h3>
                    <p className="text-sm mt-2">{path.category}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-4 text-sm">{path.description.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{path.difficulty}</span>
                      <span className="text-xs text-gray-500">{path.totalDuration} mins</span>
                    </div>
                    <button
                      onClick={() => router.push(`/learning-paths/${path._id}`)}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                      View Path
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
