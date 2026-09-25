import React, { useState } from "react";
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaTag, 
  FaChevronRight,
  FaFilter,
  FaTimes,
  FaExternalLinkAlt,
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaEye
} from "react-icons/fa";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [viewCounts] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const newsData = [
    {
      id: 1,
      title: "Annual General Meeting 2024",
      type: "Notice",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      description: "All members are requested to attend the Annual General Meeting scheduled for next month. Important decisions regarding future projects and budget allocation will be discussed.",
      typeClass: "bg-pink-500/20 text-pink-400 border-pink-500/50",
      category: "Notice",
      featured: true
    },
    {
      id: 2,
      title: "Special Recruitment Drive",
      type: "Recruitment",
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      description: "We are opening applications for core team positions including Technical Lead, Event Coordinator, and Design Head. Apply now to be part of our innovative team.",
      typeClass: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      category: "Recruitment",
      featured: true
    },
    {
      id: 3,
      title: "New AI Workshop Series Launched",
      type: "Update",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      description: "Exciting news! We're launching a comprehensive AI and Machine Learning workshop series starting next week. Registration is now open for all interested members.",
      typeClass: "bg-green-500/20 text-green-400 border-green-500/50",
      category: "Update"
    },
    {
      id: 4,
      title: "Code of Conduct Update",
      type: "Memorandum",
      date: "2024-01-08",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      description: "Please review the updated Code of Conduct document. All members must familiarize themselves with the new guidelines to ensure a respectful and inclusive environment.",
      typeClass: "bg-purple-500/20 text-purple-400 border-purple-500/50",
      category: "Memorandum"
    },
    {
      id: 5,
      title: "Hackathon Registration Opens",
      type: "Update",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      description: "Get ready for our biggest hackathon yet! Registration is now open. Form your teams and prepare to showcase your innovative solutions.",
      typeClass: "bg-orange-500/20 text-orange-400 border-orange-500/50",
      category: "Update"
    },
    {
      id: 6,
      title: "Membership Renewal Notice",
      type: "Notice",
      date: "2024-01-03",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
      description: "Annual membership renewal is due by the end of this month. Please complete the renewal process to continue enjoying all society benefits.",
      typeClass: "bg-red-500/20 text-red-400 border-red-500/50",
      category: "Notice"
    }
  ];

  const categories = ["All", "Notice", "Recruitment", "Update", "Memorandum"];

  // Filter and sort news
  const filteredNews = newsData
    .filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          news.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || news.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  const toggleBookmark = (id) => {
    const newBookmarks = new Set(bookmarkedItems);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    setBookmarkedItems(newBookmarks);
  };


  const shareNews = async (news) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${news.title} - ${news.description}`);
      alert('News link copied to clipboard!');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--aairo-news-bg)] overflow-hidden font-rajdhani">
    
        <div className="relative z-10  mt-15 py-12">
          {/* Header */}
          <div className="text-center mb-12 transition-all duration-700 opacity-100 translate-y-0">
            <h1 className="font-orbitron text-4xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              NEWS & ANNOUNCEMENTS
            </h1>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full mb-4"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest notices, recruitments, and important
              updates from our society
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12 transition-all duration-700 delay-200 opacity-100 translate-y-0">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl shadow-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex w-full rounded-xl border border-white/20 bg-white/5 px-3 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pl-12 transition-all duration-300"
                    placeholder="Search news and announcements..."
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex gap-3">
                  {/* <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium border border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 px-4 py-2 transition-all duration-300 hover:border-pink-500"
                  >
                    <FaFilter className="h-4 w-4" />
                    Filters
                  </button> */}
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl border border-white/20 bg-black text-white h-12 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Filter Panel */}
              {isFilterOpen && (
                <div className="p-4 border border-white/10 rounded-xl bg-black/20 mb-4 animate-fadeIn">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-semibold">Filter by Category</h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`inline-flex items-center rounded-full border py-2 px-4 font-semibold transition-all duration-300 cursor-pointer ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent shadow-lg shadow-pink-500/25"
                            : "border-white/20 text-gray-300 hover:border-pink-500 hover:text-white"
                        }`}
                      >
                        <FaTag className="mr-2 h-3 w-3" />
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Chips */}
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`inline-flex items-center rounded-full border py-2 px-4 font-semibold transition-all duration-300 cursor-pointer ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent shadow-lg shadow-pink-500/25"
                        : "border-white/20 text-gray-300 hover:border-pink-500 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <FaTag className="mr-2 h-3 w-3" />
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing {filteredNews.length} of {newsData.length} news items
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news, index) => (
              <div
                key={news.id}
                className="transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="rounded-2xl border border-white/10 text-card-foreground shadow-2xl group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-500 h-full flex flex-col">
                  
                  {/* Featured Badge */}
                  {news.featured && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        FEATURED
                      </span>
                    </div>
                  )}

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(news.id)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300"
                  >
                    {bookmarkedItems.has(news.id) ? (
                      <FaBookmark className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <FaRegBookmark className="h-4 w-4 text-white" />
                    )}
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col p-6 relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center rounded-full border font-semibold transition-colors ${news.typeClass} font-orbitron text-xs px-3 py-1`}>
                        {news.type}
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <FaCalendarAlt className="h-3 w-3 mr-1" />
                        {news.date}
                      </div>
                    </div>
                    <h3 className="font-orbitron font-bold text-xl text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {news.title}
                    </h3>
                  </div>

                  <div className="p-6 pt-0 relative z-10 flex-grow">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {news.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between p-6 pt-0 relative z-10">
                  
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => shareNews(news)}
                        className="p-2 rounded-lg border border-white/20 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300"
                        title="Share"
                      >
                        <FaShare className="h-4 w-4 text-gray-400 hover:text-green-400" />
                      </button>
                      
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <FaEye className="h-3 w-3" />
                        <span>{viewCounts[news.id] || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Glow Effects */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-cyan-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No news found matching your criteria</div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
              >
                <FaTimes className="h-4 w-4" />
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default News;