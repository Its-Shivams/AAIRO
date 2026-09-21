import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "FingerPrint Sensing",
      description: "An intelligent fingerprint sensing system using advanced image processing techniques.",
      technologies: ["Python", "OpenCV", "Machine Learning"],
      status: "In Progress",
      img: "/notFound.png"
    },
    {
      id: 2,
      title: "Face Recognition System",
      description: "A system that uses deep learning for real-time face detection and recognition.",
      technologies: ["TensorFlow", "Keras", "OpenCV"],
      status: "In Progress",
      img: "/notFound.png"
    },
    {
      id: 3,
      title: "Plastic Recycling Machine",
      description: "IoT-based plastic recycling machine for efficient waste management.",
      technologies: ["Arduino", "IoT", "React Native"],
      status: "Completed",
      img: "/scrap.jpg"
    },
    {
      id: 4,
      title: "Smart Ring for Kids & Elderly People",
      description: "A wearable device that monitors student activity and health metrics, with an emergency SOS feature.",
      technologies: ["Python", "Scikit-learn", "Pandas"],
      status: "In Progress",
      img: "/notFound.png"
    },
     {
      id: 5,
      title: "Autonomous Delivery Arm Robot",
      description: "An autonomous robotic arm designed for efficient package delivery.",
      technologies: ["ROS", "SLAM", "Computer Vision"],
      status: "Completed",
      img: "/robo arm.jpeg"
    },
    {
      id: 6,
      title: "Floor Mopping Robot",
      description: "Autonomous robot designed for efficient floor cleaning and maintenance.",
      technologies: ["ROS", "SLAM", "Computer Vision"],
      status: "Planning",
      img: "/notFound.png"
    },
   
    
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Planning': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const ProjectCard = ({ project }) => (
    <div
      key={project.id}
      className="bg-gray-800/50 border  border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 group relative"
    >
      <div className="h-70 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10"></div>
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)} z-20`}>
          {project.status}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-xs font-medium tracking-wide border border-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-900 py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mt-10 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Innovative <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our cutting-edge projects in AI, robotics, and automation that push the boundaries of technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-6 text-lg">
            Interested in contributing or starting your own project?
          </p>
          <Link to="/membership">
            <button className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
              <span className="relative z-10">Join Our Team</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;