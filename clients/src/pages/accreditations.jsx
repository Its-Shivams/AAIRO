import React, { useState } from 'react';
import { FaFilePdf, FaUniversity, FaCheckCircle, FaIndustry, FaBriefcase, FaChalkboardTeacher, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Accreditations = () => {
    const [showImage, setShowImage] = useState(false);
    
    const closeLightbox = () => {
        setShowImage(false);
    };

    return (
        <div className="font-['Segoe_UI',_Tahoma,_Geneva,_Verdana,_sans-serif] bg-[#0a0e1a] text-white leading-relaxed overflow-x-hidden">
            {/* Lightbox Modal */}
            {showImage && (
                <div className="fixed pt-30 inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-5xl w-full">
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>
                        
                        {/* Image */}
                        <img
                            src={"/accrediation.jpg"}
                            alt={"accrediation Image"}
                            className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                        />        
                    </div>
                </div>
            )}
            
            {/* Page Header */}
            <section className="py-32 pt-[8rem] pb-[4rem] bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
                        Accreditations & Approvals
                    </h1>
                    <p className="text-xl text-[#94a3b8] max-w-[600px] mx-auto">
                        Our certifications, partnerships, and recognition in the academic community
                    </p>
                </div>
            </section>

            {/* Accreditations Section */}
            <section className="py-16 bg-[#0a0e1a]">
                <div className="container mx-auto px-4">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-8 text-[#f1f5f9] text-center">Official Recognition</h2>
                        <p className="text-[#94a3b8] text-center max-w-3xl mx-auto">
                            AAIRO is a recognized student society under ADGIPS with approvals from the institution's faculty council and academic committee.
                        </p>
                        <div className="text-center mt-8">
                            <button
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold no-underline cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-lg shadow-[rgba(59,130,246,0.3)] hover:translate-y-[-3px] hover:shadow-xl hover:shadow-[rgba(59,130,246,0.4)]"
                                onClick={() => setShowImage(true)}
                            >
                                <FaFilePdf /> View Official Document
                            </button>
                           
                        </div>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-8 text-[#f1f5f9] text-center">Partnerships & Collaborations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-[rgba(30,41,59,0.3)] border border-[rgba(59,130,246,0.2)] rounded-2xl p-8 text-center transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:border-[#3b82f6]">
                                <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl text-white">
                                    <FaUniversity />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-[#f1f5f9]">ADGIPS Institution</h3>
                                <p className="text-[#94a3b8] mb-4 leading-relaxed">
                                    Fully supported and recognized by Dr. Akhilesh Das Gupta Institute of Professional Studies.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[#64748b] text-sm">
                                        <FaCheckCircle className="text-[#3b82f6]" /> Faculty Council Approved
                                    </div>
                                    <div className="flex items-center gap-2 text-[#64748b] text-sm">
                                        <FaCheckCircle className="text-[#3b82f6]" /> Academic Committee Endorsed
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[rgba(30,41,59,0.3)] border border-[rgba(59,130,246,0.2)] rounded-2xl p-8 text-center transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:border-[#3b82f6]">
                                <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl text-white">
                                    <FaIndustry />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-[#f1f5f9]">Industry Partners</h3>
                                <p className="text-[#94a3b8] mb-4 leading-relaxed">
                                    Collaborations with leading tech companies for internships, workshops, and project mentorship.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[#64748b] text-sm">
                                        <FaBriefcase /> Internship Opportunities
                                    </div>
                                    <div className="flex items-center gap-2 text-[#64748b] text-sm">
                                        <FaChalkboardTeacher /> Expert Workshops
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Further to be added */}
                    {/* <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-8 text-[#f1f5f9] text-center">Achievements & Recognition</h2>
                        <div className="grid gap-4">
                            <div className="bg-[rgba(30,41,59,0.3)] border border-[rgba(59,130,246,0.2)] rounded-2xl p-6 flex items-center gap-6 transition-all duration-300 ease-in-out hover:border-[#3b82f6] hover:translate-x-[10px]">
                                <div className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
                                    1st
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2 text-[#f1f5f9]">National Robotics Championship 2024</h4>
                                    <p className="text-[#94a3b8] text-sm">
                                        Secured first place in the national competition for autonomous navigation.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-[rgba(30,41,59,0.3)] border border-[rgba(59,130,246,0.2)] rounded-2xl p-6 flex items-center gap-6 transition-all duration-300 ease-in-out hover:border-[#3b82f6] hover:translate-x-[10px]">
                                <div className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
                                    Top 5
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2 text-[#f1f5f9]">AI Hackathon 2023</h4>
                                    <p className="text-[#94a3b8] text-sm">
                                        Recognized among the top 5 teams for innovative AI solutions in healthcare.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-[rgba(30,41,59,0.3)] border border-[rgba(59,130,246,0.2)] rounded-2xl p-6 flex items-center gap-6 transition-all duration-300 ease-in-out hover:border-[#3b82f6] hover:translate-x-[10px]">
                                <div className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
                                    Award
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2 text-[#f1f5f9]">Institution's Best Student Society</h4>
                                    <p className="text-[#94a3b8] text-sm">
                                        Awarded for outstanding contributions to student development and innovation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
        </div>
    );
};

export default Accreditations;