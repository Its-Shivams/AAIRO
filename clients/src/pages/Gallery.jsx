import React, { useState } from 'react'
import { Filter, Heart, Share2, Download, X, ChevronLeft, ChevronRight } from 'lucide-react'
import galleryData from '../api/gallery.json'

const Gallery = () => {
  const [viewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [favorites, setFavorites] = useState(new Set())
 
  // Sample gallery data with high-quality placeholder images
  
  const galleryItems = galleryData





  const categories = ['Interaction Day', 'FDP Event', 'Exhibition Day', 'Training Session', 'Internal Discussion', 'CodeCanvas 1.0', 'Inkfluence 1.0']
  // Filter items based on search and category
  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const openLightbox = (item) => {
    setSelectedImage(item)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction) => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id)
    let newIndex
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    }
    setSelectedImage(filteredItems[newIndex])
  }

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-white text-lg font-medium">Loading Gallery...</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    // <div className="min-h-screen bg-gradient-to-br mt-20 from-slate-900 via-blue-900 to-slate-900">
    <div className="min-h-screen bg-gradient-to-br mt-16 bg-slate-900">
      {/* Header */}
      <div className="backdrop-blur-md bg-black/20 border-b border-white/10 top-0 z-10">
      {/* <div className="backdrop-blur-md bg-black/20 border-b border-white/10 sticky top-0 z-10"> */}
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col gap-6 pt-2">
            {/* Top Controls */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Search */}
                {/* <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full transition-all duration-300"
        />
      </div> */}

                {/* View Mode Toggle */}
                {/* <div className="flex bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-2 transition-all duration-300 ${
            viewMode === 'grid'
              ? 'bg-purple-500 text-white'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 transition-all duration-300 ${
            viewMode === 'list'
              ? 'bg-purple-500 text-white'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <List className="w-5 h-5" />
        </button>
      </div> */}
              </div>
            </div>

            {/* Bubble Category Layout */}
            <div
              className="flex flex-wrap justify-center gap-4 md:gap-6 "
              style={{
                rowGap: '1rem',
                columnGap: '1.5rem',
              }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    transform: `scale(${1 + (Math.random() * 0.2 - 0.1)}) rotate(${Math.random() * 4 - 2}deg)`,
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-110 ${selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>


          {/* Category Filter */}
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No images found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={`transition-all duration-500 ${viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-6'
            }`}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group cursor-pointer transition-all duration-500 transform hover:scale-105 ${viewMode === 'list' ? 'flex bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden' : 'block'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(item)}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'aspect-square rounded-2xl'
                  }`}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${viewMode === 'grid' ? 'rounded-2xl' : ''
                      }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ${viewMode === 'grid' ? 'rounded-2xl' : ''
                    }`} />

                  {/* Overlay Controls */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(item.id)
                      }}
                      className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${favorites.has(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-black/30 text-white hover:bg-black/50'
                        }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(item.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-md transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className={`${viewMode === 'list' ? 'flex-1 p-6' : 'p-4'}`}>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
              <h2 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-gray-300 mb-3">{selectedImage.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {selectedImage.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-500/30 text-purple-200 text-sm rounded-full border border-purple-500/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleFavorite(selectedImage.id)}
                    className={`p-2 rounded-full transition-all duration-300 ${favorites.has(selectedImage.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.has(selectedImage.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery