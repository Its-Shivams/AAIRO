import React, { useState } from "react";
import {
  FaFilePdf,
  FaUniversity,
  FaCheckCircle,
  FaIndustry,
  FaBriefcase,
  FaChalkboardTeacher,
  FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Accreditations = () => {
  const [showImage, setShowImage] = useState(false);

  const closeLightbox = () => {
    setShowImage(false);
  };

  return (
    <div className="font-['Segoe_UI',_Tahoma,_Geneva,_Verdana,_sans-serif] bg-[var(--aairo-surface)] text-white leading-relaxed overflow-x-hidden">
      {showImage && (
        <div className="fixed pt-30 inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            <img
              src="/accrediation.jpg"
              alt="accrediation Image"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      <section className="py-32 pt-[8rem] pb-[4rem] bg-gradient-to-br from-[var(--aairo-surface-light)] to-[var(--aairo-surface-dark)] text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--aairo-info)] to-[var(--aairo-purple)] bg-clip-text text-transparent">
            Accreditations & Approvals
          </h1>

          <p className="text-xl text-[var(--aairo-text-secondary)] max-w-[600px] mx-auto">
            Our certifications, partnerships, and recognition in the academic community
          </p>
        </div>
      </section>

      <section className="py-16 bg-[var(--aairo-surface)]">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-[var(--aairo-text-primary)] text-center">
              Official Recognition
            </h2>

            <p className="text-[var(--aairo-text-secondary)] text-center max-w-3xl mx-auto">
              AAIRO is a recognized student society under ADGIPS with approvals from the institution's faculty council and academic committee.
            </p>

            <div className="text-center mt-8">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold no-underline cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-r from-[var(--aairo-info)] to-[var(--aairo-purple)] text-white shadow-lg shadow-[var(--aairo-info-30)] hover:translate-y-[-3px] hover:shadow-xl hover:shadow-[var(--aairo-info-40)]"
                onClick={() => setShowImage(true)}
              >
                <FaFilePdf />
                View Official Document
              </button>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-[var(--aairo-text-primary)] text-center">
              Partnerships & Collaborations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-[var(--aairo-surface-light-30)] border border-[var(--aairo-info-20)] rounded-2xl p-8 text-center transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:border-[var(--aairo-info)]">
                <div className="w-16 h-16 bg-gradient-to-r from-[var(--aairo-info)] to-[var(--aairo-purple)] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl text-white">
                  <FaUniversity />
                </div>

                <h3 className="text-xl font-semibold mb-4 text-[var(--aairo-text-primary)]">
                  ADGIPS Institution
                </h3>

                <p className="text-[var(--aairo-text-secondary)] mb-4 leading-relaxed">
                  Fully supported and recognized by Dr. Akhilesh Das Gupta Institute of Professional Studies.
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[var(--aairo-text-subtle)] text-sm">
                    <FaCheckCircle className="text-[var(--aairo-info)]" />
                    Faculty Council Approved
                  </div>

                  <div className="flex items-center gap-2 text-[var(--aairo-text-subtle)] text-sm">
                    <FaCheckCircle className="text-[var(--aairo-info)]" />
                    Academic Committee Endorsed
                  </div>
                </div>
              </div>

              <div className="bg-[var(--aairo-surface-light-30)] border border-[var(--aairo-info-20)] rounded-2xl p-8 text-center transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:border-[var(--aairo-info)]">
                <div className="w-16 h-16 bg-gradient-to-r from-[var(--aairo-info)] to-[var(--aairo-purple)] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl text-white">
                  <FaIndustry />
                </div>

                <h3 className="text-xl font-semibold mb-4 text-[var(--aairo-text-primary)]">
                  Industry Partners
                </h3>

                <p className="text-[var(--aairo-text-secondary)] mb-4 leading-relaxed">
                  Collaborations with leading tech companies for internships, workshops, and project mentorship.
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[var(--aairo-text-subtle)] text-sm">
                    <FaBriefcase />
                    Internship Opportunities
                  </div>

                  <div className="flex items-center gap-2 text-[var(--aairo-text-subtle)] text-sm">
                    <FaChalkboardTeacher />
                    Expert Workshops
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accreditations;