"use client"

import React, { useState, useEffect } from 'react';
import { Heart, Image, Video } from 'lucide-react';
import { SignedIn, UserButton, useClerk, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

// Skeleton Components
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const PostSkeleton = () => (
  <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden animate-pulse">
    <div className="w-full h-full bg-gray-300"></div>
  </div>
);

export default function MellavittaProfile() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<any[]>([])
  const [media, setMedia] = useState<any[]>([])
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const { user } = useUser()
  const email = user?.emailAddresses?.[0]?.emailAddress || ''

  const fullText = "I never expected to do this... but screw it, full sending it off the bat. I may not be the most experienced, but I'm definitely eager to learn and explore new things with you. Join me on this wild journey where inhibitions are left at the door and we can be our true authentic selves together.";

  const truncatedText = "I never expected to do this... but screw it, full sending it off the bat. I may";

  // Add this useEffect after your existing variable declarations
  useEffect(() => {
    const addUserToDatabase = async (email: string) => {
      try {
        const response = await fetch('/add-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();
        console.log('User add result:', result);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    if (isSignedIn && email) {
      addUserToDatabase(email);
    }
  }, [isSignedIn, email]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        return
      }

      try {
        const res = await fetch(`/user/${email}`)
        const data = await res.json()

        if (res.ok) {
          setIsSubscribed(data.subscribed)
        } else {
          console.error("Error from server:", data)
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      }
    }

    fetchUserData()
  }, [email])

  // Fetch Mella data
  useEffect(() => {
    const fetchMellaData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/mella")
        const data = await res.json()

        if (res.ok) {
          setPosts(data.posts)
          setMedia(data.media)
        } else {
          console.error("Error from server:", data)
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setIsLoading(false);
      }
    }

    fetchMellaData()
  }, [])

  const handleSubscribeClick = () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    window.location.href = `https://cravioai.lemonsqueezy.com/buy/5a6d4113-af96-4748-93f3-53b372ac30ea?checkout[email]=${encodeURIComponent(email)}&checkout%5Bdiscount_code%5D=MELLAVITTA50`;
  };

  const handleBundleClick = () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    window.location.href = `https://cravioai.lemonsqueezy.com/buy/ac6dffcf-4797-436c-bc3c-b036bc306a37?checkout[email]=${encodeURIComponent(email)}&checkout%5Bdiscount_code%5D=MELLAVITTA50`;
  };

  const handlePostsSubscribeClick = () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    window.location.href = `https://cravioai.lemonsqueezy.com/buy/ac6dffcf-4797-436c-bc3c-b036bc306a37?checkout[email]=${encodeURIComponent(email)}&checkout%5Bdiscount_code%5D=MELLAVITTA50`;
  };

  return (
    <div className="min-h-screen ">
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block w-64 min-h-screen  border-r border-gray-200 fixed left-0 top-0">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-[#B08D57] mb-8">Mella vitta</h1>
            <nav className="space-y-4">
              <div className="flex items-center space-x-3  hover:text-[#B08D57] cursor-pointer">
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <span>Profile</span>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Cover Image */}
          <div className="relative h-48 md:h-64">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop"
              alt="Cover"
              className="w-full h-full object-cover"
            />

            {/* Profile Image Overlapping Cover */}
            <div className="absolute -bottom-12 left-6">
              <img
                src="/Mella.png"
                alt="Mella Vitta"
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-black shadow-lg"
              />
            </div>

            {/* Desktop Header Info */}
            <div className=" absolute top-4 left-6">
              <div className="flex items-center space-x-3 ">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-white">Mella Vitta</span>
                  <img className='h-4 w-4' src="/verified.webp" alt="verified" />
                </div>
                <div className="flex items-center space-x-4 ml-8">
                  <div className="flex items-center space-x-1 text-white">
                    <Image />
                    <span className="text-sm">307</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white">
                    <Video />
                    <span className="text-sm">31</span>
                  </div>
                  <Heart className="w-5 h-5 text-white" />
                  <span className="text-sm text-white">1.00M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className=" px-4 lg:px-6 py-6 pt-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
              {/* Left Column - Profile Info */}
              <div className="flex-1">
                <div className="mb-4 ml-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <h1 className="text-xl lg:text-2xl font-bold ">Mella Vitta</h1>
                    <img className='w-4 h-4' src="/verified.webp" alt="verified" />
                  </div>
                  <p className=" text-sm mb-2">@mellavitta • Available now</p>
                </div>

                <div className="mb-6 ml-2">
                  <p className=" mb-2">where you see my NAUGHTY SIDE</p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className=" text-sm mb-3">
                      {isExpanded ? fullText : truncatedText}
                      {!isExpanded && "..."}
                    </p>
                  </motion.div>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#B08D57] text-sm font-medium"
                  >
                    {isExpanded ? "Show less" : "More info"}
                  </button>
                </div>
              </div>

              {/* Right Column - Subscription Box */}
              {!isSubscribed && (
                <div className="lg:w-80 rounded-lg p-6 border">
                  <h3 className="font-semibold  mb-2">SUBSCRIPTION</h3>
                  <h4 className="mb-4">Limited offer - 50% off for 31 days!</h4>

                  <div className="flex items-start space-x-3 mb-6">
                    <img
                      src="/Mella.png"
                      alt="Mella"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm ">
                        #1 on Mellavitta for a reason. Come see why and if you join RIGHT NOW dm me to see my first ever masturbation video (don't tell my mom pls)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSubscribeClick}
                    className="w-full bg-[#B08D57] hover:bg-[#B08D57] py-2 rounded-full mb-3 transition-colors"
                  >
                    SUBSCRIBE - $4.99 for 31 days
                  </button>

                  <p className="text-gray-500 text-sm text-center mb-4">Regular price $9.99 /month</p>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm ">SUBSCRIPTION BUNDLES</span>
                    </div>
                    <button
                      onClick={handleBundleClick}
                      className="w-full bg-[#B08D57] hover:bg-[#B08D57]   py-2 rounded-full mt-3 text-sm transition-colors"
                    >
                      3 MONTHS (15% off) - $25.47 total
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div> 

          {/* Content Tabs */}
          <div className=" border-t border-gray-200">
            <div className="px-4 lg:px-6">
              <div className="flex justify-center space-x-8 border-b border-gray-200">
                <button
                  className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'posts' ? 'border-gray-900 ' : 'border-transparent text-gray-500'}`}
                  onClick={() => setActiveTab('posts')}
                >
                  221 POSTS
                </button>
                <button
                  className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'media' ? 'border-gray-900 ' : 'border-transparent text-gray-500'}`}
                  onClick={() => setActiveTab('media')}
                >
                  338 MEDIA
                </button>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className=" px-4 lg:px-6 py-6 mb-7">
            {!isSubscribed ? (
              <div className="text-center py-12 relative h-47">  {/* Added h-96 */}
              <img
                className='w-full h-full absolute inset-0 object-cover'
                src="/mella.ec.png"
                alt="ec"
              />
              <div className="relative z-10 flex items-center justify-center h-full">
                <button
                  onClick={handlePostsSubscribeClick}
                  className="bg-[#B08D57] hover:bg-[#B08D57] py-2 px-8 rounded-full transition-colors"
                >
                  SUBSCRIBE TO SEE MELLA'S POSTS
                </button>
              </div>
            </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {isLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <PostSkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  activeTab === "posts" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
                      {posts.map((post) => (
                        <motion.div
                          key={post.id}
                          className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={post.preview}
                            alt="Post"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
                      {media.map((m) => (
                        <motion.div
                          key={m.id}
                          className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <video
                            src={m.preview}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0  border-t border-[#B08D57] px-4 py-2 bg-black z-50">
        <div className="flex justify-around">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}