import React, { useState, useEffect, useMemo } from 'react';
import {
  FaNewspaper,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaFilter,
  FaBookmark,
  FaBookOpen,
  FaEye,
  FaHeart,
  FaShare
} from 'react-icons/fa';

const BLOG_DATA = [
  {
    id: 1,
    title: "More Than Just Code: The Fundamental Pillars of AAIRO",
    excerpt: "The world of Artificial Intelligence and Robotics is exhilarating. We see new breakthroughs every day—humanoid robots performing complex logistics, AI systems revolutionizing healthcare, and autonomous vehicles promising to reshape our cities. It's a field defined by rapid change and boundless innovation.",
    author: "Siddhi Sharma",
    profileImg: "/siddhi.png",
    date: "March 15, 2024",
    readTime: "8 min read",
    tags: ["AI", "Society", "Machine Learning"],
    views: 1247,
    likes: 89,
    category: "Technology",
    featured: true,
    fullContent: `The world of Artificial Intelligence and Robotics is exhilarating. We see new breakthroughs every day—humanoid robots performing complex logistics, AI systems revolutionizing healthcare, and autonomous vehicles promising to reshape our cities. It's a field defined by rapid change and boundless innovation.

At AAIRO, we believe that to truly contribute to this future, it's not enough to just learn a programming language or understand a single algorithm. Our society is built on a foundation of core principles that go far beyond the syntax of code. We are not just a group of students; we are a community dedicated to a deeper, more holistic approach to AI and Robotics.

Here are the fundamental pillars that define the AAIRO experience:

1. The Power of "Hands-On"

Theory is crucial, but it's the application that makes knowledge stick. Our society is a living laboratory where ideas are transformed into reality. From the "Pick and Place Robot" demonstrating industrial automation to the "Plastic Recycling Machine" tackling real-world sustainability issues, our projects are the heart of our learning. We don't just teach you about microcontrollers; we give you the components and the challenge to build something new. We don't just talk about computer vision; we guide you in creating a system that can see and understand. This hands-on approach is the single most effective way to bridge the gap between academic knowledge and real-world application.

2. The Spark of Collaboration

AI and Robotics are not solo sports. The most groundbreaking innovations are born from diverse perspectives and collaborative efforts. AAIRO provides a vibrant, supportive environment where students from different branches and years can come together, share ideas, and build projects. Whether you're a beginner learning Python or an expert in machine learning, there's a place for you to contribute. This collaborative spirit fosters teamwork, leadership, and the ability to solve complex problems with collective intelligence. We believe in learning from each other as much as learning with each other.

3. The Commitment to Ethical Awareness

As we build a smarter future, we must also build a more responsible one. The ethical implications of AI and Robotics are not an afterthought; they are a central part of our mission. From the development of a biometric system like our "Fingerprint Sensing Machine" to a surveillance project like the "Face Recognition System," we constantly engage in discussions about data privacy, bias in algorithms, and the societal impact of our creations. We encourage a mindset that questions not just what we can build, but also what we should build.

4. The Drive for Innovation

AAIRO is a hub for the curious and the ambitious. We are always looking forward, pushing the boundaries of what is possible. Our projects, from upcoming biometric and computer vision systems to the long-term vision of a "Humanoid Robot," are a testament to our commitment to innovation. We provide a platform for you to experiment with cutting-edge technologies and explore new ideas. We believe that a student society should not just replicate what's been done, but propose and prototype what could be.

Joining AAIRO means becoming a part of something bigger. It means moving beyond the classroom to a space where you can experiment, fail, learn, and grow. It's about developing the technical skills, the collaborative spirit, and the ethical foresight needed to not just participate in the future, but to build it. We invite you to be a part of our journey.`
  },
  {
    id: 2,
    title: "CMW 42: Solar Tree with Water Harvesting",
    excerpt: "Cities today are grappling with a perfect storm of challenges: groundwater depletion, rising electricity demand, shrinking land availability, congested rooftops, and the urgent need for EV infrastructure. Instead of tackling these issues separately, what if one innovation could address them all?",
    author: "Prof. Yashpal Chopra",
    date: "March 10, 2024",
    profileImg: "/yashpal.jpg",
    readTime: "6 min read",
    tags: ["Robotics", "Automation", "Manufacturing"],
    views: 892,
    likes: 156,
    category: "Innovation",
    featured: false,
    fullContent: `One Visionary Structure. Multiple Urban Solutions.

Cities today are grappling with a perfect storm of challenges: groundwater depletion, rising electricity demand, shrinking land availability, congested rooftops, and the urgent need for EV infrastructure. Instead of tackling these issues separately, what if one innovation could address them all?

Enter the Solar Tree—a vertical marvel designed to generate clean energy, harvest rainwater, and optimize urban space.

🌞 Design & Functionality
The Solar Tree stands tall like a natural tree, with a sleek stem and a wide, concave canopy. This canopy is embedded with solar panels that capture sunlight efficiently throughout the day. The energy generated can either be fed into the local grid or directly power nearby EV charging stations.

During the rainy season, the concave shape doubles as a water collector. Rainwater is funneled through internal channels and directed into the ground, supporting water table recharge through smart harvesting techniques.

🌆 Urban Integration
Its vertical design makes it ideal for space-constrained environments. Whether placed in parking lots, public parks, institutional campuses, or roadside medians, the Solar Tree blends functionality with futuristic aesthetics. It doesn't require large horizontal space, making it perfect for cities where every square foot counts.

🌱 Impact
This single structure contributes to energy sustainability, water conservation, urban beautification, and green mobility—all while inspiring a culture of innovation. It's not just a product; it's a statement of what future-ready cities can look like.

--- "Rooted in Innovation, Powered by Nature"--`
  },
  {
    id: 3,
    title: "🌍 CMW 41: Recognition Revolution – A Tech-Driven Acknowledgement System",
    excerpt: "In today's world, the majority of the population is employed across diverse organizations. Yet, countless employees who consistently deliver exceptional work remain unseen, uncelebrated, and unrewarded.",
    author: "Prof. Yashpal Chopra",
    date: "March 8, 2024",
    profileImg: "/yashpal.jpg",
    readTime: "12 min read",
    tags: ["Machine Learning", "Algorithms", "Data Science"],
    views: 1534,
    likes: 203,
    category: "Innovation",
    featured: true,
    fullContent: `In today's world, the majority of the population is employed across diverse organizations. Yet, countless employees who consistently deliver exceptional work remain unseen, uncelebrated, and unrewarded.

It's time for the tech industry to step up and build a transformative solution: 
A smart software system that monitors daily work routines, evaluates performance, and assigns credit points based on real contributions—not just KPIs or manager bias.

These points would feed into a transparent Acknowledgement Framework, unlocking tangible rewards such as:
- 🌟 Promotions based on merit 
- 💰 Salary hikes aligned with consistent excellence 
- ✈️ Sponsored holiday trips as motivational incentives 
- 🏆 Public recognition within and beyond the organization 

🔧 Affordability for All 
To ensure inclusivity, this software must be designed with scalable pricing models—so that startups, SMEs, and large enterprises alike can integrate it into their work culture without financial strain. Recognition should never be a luxury—it should be a norm.

This isn't just software—it's a movement to restore dignity, boost morale, and create a culture where every effort counts.`
  },
  {
    id: 4,
    title: "🌟 CMW40: The Classroom Modernization Wave",
    excerpt: "In a world where 70% of classrooms still rely on traditional teaching methods, it's time for a generational shift. Imagine a smart wearable device—sleek, portable, and multifunctional—designed by innovators and tech companies to empower educators and honor teachers.",
    author: "Prof. Yashpal Chopra",
    profileImg: "/yashpal.jpg",
    date: "March 5, 2024",
    readTime: "10 min read",
    tags: ["Education", "Technology", "Innovation"],
    views: 967,
    likes: 124,
    category: "Education",
    featured: false,
    fullContent: `🔧 Proposed Device Features
This futuristic tool could be called EduPulse or TeachBeam:
- 📽️ Mini Projector: Built-in high-lumen projector to display lessons, videos, and interactive content directly from the wrist or handheld device. 
- 🔊 Mini PA System: Integrated Bluetooth speaker with noise-canceling mic support for clear classroom communication. (E.g. ahuja PA system)
- 📱 Smartphone-like Interface: Touchscreen, app integration, cloud sync, and voice commands.
- 🎙️ Bluetooth Mic Compatibility: Teachers wear a mic, and the device amplifies their voice across the room.
- 🧠 AI Assistant: Real-time translation, student engagement analytics, and lesson planning support.

🎁 Gratitude for Teachers
Let's go beyond utility—this device becomes a symbol of respect. A limited edition wearable to educators.`
  },
  {
    id: 5,
    title: "🌟 CMW 39: Smart Duster - From dust to dignity",
    excerpt: "Despite the digital wave, nearly 70% of classrooms across India still rely on chalk and duster—a testament to affordability and accessibility. Yet, this traditional tool comes with a silent cost: chalk dust, which affects air quality, teacher health, and classroom cleanliness.",
    author: "Prof. Yashpal Chopra",
    profileImg: "/yashpal.jpg",
    date: "March 1, 2024",
    readTime: "9 min read",
    tags: ["Education", "Innovation", "Design"],
    views: 743,
    likes: 87,
    category: "Education",
    featured: false,
    fullContent: `Despite the digital wave, nearly 70% of classrooms across India still rely on chalk and duster—a testament to affordability and accessibility. Yet, this traditional tool comes with a silent cost: chalk dust, which affects air quality, teacher health, and classroom cleanliness.

Vision: 
Can the modern engineering fraternity rise to the occasion and offer a technological tribute to our teachers? A Guru Dakshina not in words, but in design.

---

🧠 Concept: The Smart Duster

Core Features:

- Dust Absorption Chamber: 
 As the teacher wipes the board, the duster automatically absorbs chalk dust into an internal filter—minimizing airborne particles.

- Self-Cleaning Dispenser Dock: 
 After class, the duster is placed into a compact dispenser unit that:
 - Cleans the duster bristles using a vacuum or brush mechanism.
 - Collects and seals chalk residue for safe disposal.
 - Charges the unit if battery-powered.

- Eco-Inspired Engineering: 
 Inspired by mop buckets that squeeze and recycle water, this system sucks chalk dust like a mop wringer—cleaning without mess.

💡 Why It Matters

- Healthier Classrooms: Reduces respiratory risks for teachers and students.
- Symbolic Innovation: A low-cost, high-impact gesture from engineers to educators.
- Scalable Design: Can be manufactured using recycled plastics, low-power motors, and modular parts—keeping costs low.

🔧 Engineering Challenge:
Can we build this under ₹500? 
With frugal innovation, open-source design, and student-led prototyping, the answer could be a resounding yes.`
  },
  {
    id: 6,
    title: "🌬️ CMW 37: Smart Fan – From Passive Cooling to Intelligent Climate Response",
    excerpt: "Yesterday's fan relied on switches and regulators. Today's fan responds to remotes and sensors. Tomorrow's fan will think, learn, and adapt—powered by machine learning, thermal sensing, and environmental intelligence.",
    author: "Prof. Yashpal Chopra",
    profileImg: "/yashpal.jpg",
    date: "February 28, 2024",
    readTime: "7 min read",
    tags: ["IoT", "AI", "Smart Home"],
    views: 654,
    likes: 92,
    category: "Technology",
    featured: false,
    fullContent: `The Smart Fan of the future will detect room temperature, humidity, and human presence using thermal imaging and image processing. It will analyze this data in real time, adjusting its speed and airflow dynamically—no manual input required. It becomes a responsive climate companion, optimizing comfort while conserving energy.

✨ Key Applications

- Automatic Speed Regulation: Adjusts airflow based on temperature, humidity, and occupancy.
- Humidity-Aware Cooling: Maintains comfort by responding to moisture levels in the air.
- AC Integration: Circulates air intelligently based on human density and preset cooling levels.

🔮 Visionary Impact

This isn't just a fan—it's a leap toward ambient intelligence. In homes, it offers effortless comfort. In offices, it enhances energy efficiency. In public spaces, it adapts to dynamic human activity. It's a symbol of how everyday appliances can evolve into smart, sustainable systems.

"It does not just move air, it moves with purpose."`
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const postsPerPage = 6;

  // Get unique tags and categories
  const allTags = [...new Set(BLOG_DATA.flatMap(post => post.tags))];
  const allCategories = [...new Set(BLOG_DATA.map(post => post.category))];

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    return BLOG_DATA.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesCategory = !selectedCategory || post.category === selectedCategory;

      return matchesSearch && matchesTag && matchesCategory;
    });
  }, [searchTerm, selectedTag, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Featured posts
  const featuredPosts = BLOG_DATA.filter(post => post.featured).slice(0, 2);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  const toggleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const toggleBookmark = (postId) => {
    const newBookmarkedPosts = new Set(bookmarkedPosts);
    if (bookmarkedPosts.has(postId)) {
      newBookmarkedPosts.delete(postId);
    } else {
      newBookmarkedPosts.add(postId);
    }
    setBookmarkedPosts(newBookmarkedPosts);
  };

  const openPost = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  const sharePost = async (post) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('Sharing failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href + '?post=' + post.id);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTag, selectedCategory]);

  const BlogCard = ({ post, featured = false }) => (
    <div
      className={`bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${featured ? 'border border-blue-500/30' : ''
        } h-full flex flex-col`}
    >
      {featured && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-t-lg font-semibold">
          FEATURED
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        {/* Author Profile */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm">
           <img src={post.profileImg} alt={post.author} className="rounded-full" />
          </div>
          {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {post.author.split(' ').map(n => n[0]).join('')}
          </div> */}
          <div className="ml-3">
            <p className="text-white text-sm font-medium">{post.author}</p>
            <div className="flex items-center text-gray-400 text-xs space-x-3">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-xs" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="text-xs" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="text-blue-400 text-2xl mb-4">
          <FaNewspaper />
        </div>

        <h3 className="text-blue-400 text-xl font-bold mb-3 hover:text-blue-300 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-300 mb-4 leading-relaxed flex-1">
          {post.excerpt.length > 150 ? `${post.excerpt.substring(0, 150)}...` : post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTag(tag);
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <FaEye className="text-xs" /> {post.views}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart className="text-xs" /> {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(post.id);
              }}
              className={`p-2 rounded-full transition-colors ${likedPosts.has(post.id)
                  ? 'text-red-500 hover:text-red-400'
                  : 'text-gray-400 hover:text-red-500'
                }`}
            >
              <FaHeart className="text-sm" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(post.id);
              }}
              className={`p-2 rounded-full transition-colors ${bookmarkedPosts.has(post.id)
                  ? 'text-yellow-500 hover:text-yellow-400'
                  : 'text-gray-400 hover:text-yellow-500'
                }`}
            >
              <FaBookmark className="text-sm" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                sharePost(post);
              }}
              className="p-2 rounded-full text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaShare className="text-sm" />
            </button>
            <button
              onClick={() => openPost(post)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <FaBookOpen className="text-xs" />
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PostModal = ({ post, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-white font-semibold">{post.author}</h2>
              <div className="flex items-center text-gray-400 text-sm space-x-3">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          <h1 className="text-2xl font-bold text-blue-400 mb-4">{post.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none">
            {post.fullContent.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-300 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="flex items-center gap-1">
              <FaEye /> {post.views}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart /> {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleLike(post.id)}
              className={`p-2 rounded-full transition-colors ${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
            >
              <FaHeart />
            </button>
            <button
              onClick={() => toggleBookmark(post.id)}
              className={`p-2 rounded-full transition-colors ${bookmarkedPosts.has(post.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                }`}
            >
              <FaBookmark />
            </button>
            <button
              onClick={() => sharePost(post)}
              className="p-2 rounded-full text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaShare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-7 bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AAIRO Blog
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Discover insights, innovations, and stories from the cutting edge of AI and Robotics
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles, authors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-full px-6 py-4 pl-14 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && !searchTerm && !selectedTag && !selectedCategory && (
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-yellow-500">⭐</span>
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="py-8 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaFilter />
              Filters {(selectedTag || selectedCategory) && '(Active)'}
            </button>

            <div className="flex items-center gap-4 text-gray-400">
              <span>{filteredPosts.length} articles found</span>
              {(searchTerm || selectedTag || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                      All
                    </button>
                    {allCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    <button
                      onClick={() => setSelectedTag('')}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${!selectedTag ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                      All Tags
                    </button>
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTag === tag ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl text-gray-600 mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-12 space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                  >
                    <FaArrowLeft className="text-sm" />
                    Previous
                  </button>

                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition-colors ${currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                  >
                    Next
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Post Modal */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={closePost} />
      )}
    </div>
  );
};

export default Blog;