import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Membership = () => {
  const initialFormData = {
    membershipTier: '',
    fullName: '',
    fathersName: '',
    batch: '',
    enrollmentNumber: '',
    programme: '',
    branch: '',
    year: '',
    semester: '',
    phone: '',
    email: '',
    experience: '',
    achievements: '',
    availability: '',
    futureGoals: '',
    acceptTerms: false
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      'membershipTier', 'fullName', 'phone', 'email', 'programme',
      'branch', 'availability'
    ];

    if (formData.membershipTier === 'Student') {
      requiredFields.push('fathersName', 'batch', 'enrollmentNumber', 'year', 'semester');
    }

    requiredFields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        newErrors[field] = `${getFieldLabel(field)} is required`;
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFieldLabel = (field) => {
    const labels = {
      membershipTier: 'Membership tier',
      fullName: 'Full name',
      fathersName: 'Father\'s name',
      batch: 'Batch',
      enrollmentNumber: 'Enrollment number',
      programme: 'Programme',
      branch: 'Branch',
      year: 'Year',
      semester: 'Semester',
      phone: 'Contact number',
      email: 'Email address',
      availability: 'Availability',
      acceptTerms: 'Terms and conditions'
    };
    return labels[field] || field;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started...');

    if (!validateForm()) {
      console.log('Validation failed:', errors);
      return;
    }

    setIsLoading(true);
    setErrors({}); // Clear any previous errors

    try {
      // Prepare submission data
      const submissionData = { ...formData };

      // Clean up data - trim strings and handle Professional membership
      Object.keys(submissionData).forEach(key => {
        if (typeof submissionData[key] === 'string') {
          submissionData[key] = submissionData[key].trim();
        }
      });

      if (submissionData.membershipTier === 'Professional') {
        submissionData.fathersName = 'Not Available';
        submissionData.batch = 'Not Available';
        submissionData.enrollmentNumber = 'Not Available';
        submissionData.year = 'Not Available';
        submissionData.semester = 'Not Available';
      }

      console.log('Sending data to server:', submissionData);

      const response = await fetch('https://aairosocity.in/ApI/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
        mode: 'cors', // Explicitly set CORS mode
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }

      // Try to parse response
      let responseData;
      try {
        responseData = await response.json();
        console.log('Success response:', responseData);
      } catch (parseError) {
        console.log('Response is not JSON, treating as success');
        responseData = { success: true };
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
      console.log('Form submitted successfully');

    } catch (error) {
      console.error('Error submitting form:', error);

      // More specific error handling
      let errorMessage = 'Failed to submit application. Please try again.';

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Server connection issue. Please contact support.';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message.includes('400')) {
        errorMessage = 'Invalid data submitted. Please check your information.';
      }

      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Membership Tiers Section */}
      <section className="py-16 mt-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Join Our Society</h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Become a member of AAIRO and unlock a world of opportunities in Artificial Intelligence and Robotics.
            Whether you're a student, researcher, professional, or alumni, we have a membership tier for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Membership */}
            <div className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-blue-500/40 transition-all">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Student Membership</h3>
              <p className="text-gray-300 mb-6">Perfect for students passionate about AI and Robotics.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Access to workshops & seminars</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Project collaboration opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Networking with peers & faculty</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Eligibility for competitions</span>
                </li>
              </ul>
              <a href="#membership-form" className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:opacity-90 transition-opacity">
                Apply Now
              </a>
            </div>

            {/* Alumni Partnership */}
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Alumni Partnership</h3>
              <p className="text-gray-300 mb-6">For alumni looking to stay connected and mentor.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Mentorship opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Industry networking events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Access to exclusive events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Featured in AAIRO publications</span>
                </li>
              </ul>
              <Link to="/contact" className="block w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:opacity-90 transition-opacity">
                Inquire Now
              </Link>
            </div>

            {/* Corporate Partnership */}
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Corporate Partnership</h3>
              <p className="text-gray-300 mb-6">For companies looking to collaborate and support.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Custom project collaborations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Branding & recruitment opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Featured in AAIRO publications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">Priority support & consultation</span>
                </li>
              </ul>
              <Link to="/contact" className="block w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:opacity-90 transition-opacity">
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Form Section */}
      <section id="membership-form" className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Membership Application Form</h2>
          <p className="text-lg text-gray-300 text-center mb-12">
            Please fill out the form below to apply for your desired membership tier.
          </p>

          {isSubmitted ? (
            <div className="bg-green-900/30 border border-green-500/20 rounded-xl p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Application Submitted Successfully!</h3>
              <p className="text-gray-300">Thank you for your application. We'll review your information and get back to you soon.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Membership Tier */}
              <div>
                <label htmlFor="membershipTier" className="block text-gray-300 mb-2">Desired Membership Tier: *</label>
                <select
                  id="membershipTier"
                  name="membershipTier"
                  value={formData.membershipTier}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select a tier</option>
                  <option value="Student">Student Membership</option>
                  {/* <option value="Professional">Faculty Membership</option> */}
                </select>
                {errors.membershipTier && <p className="mt-1 text-sm text-red-400">{errors.membershipTier}</p>}
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-gray-300 mb-2">Full Name: *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                </div>

                {/* Student-specific fields */}
                {formData.membershipTier === 'Student' && (
                  <div>
                    <label htmlFor="fathersName" className="block text-gray-300 mb-2">Father's Name: *</label>
                    <input
                      type="text"
                      id="fathersName"
                      name="fathersName"
                      value={formData.fathersName}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                    {errors.fathersName && <p className="mt-1 text-sm text-red-400">{errors.fathersName}</p>}
                  </div>
                )}
              </div>

              {formData.membershipTier === 'Student' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="batch" className="block text-gray-300 mb-2">Batch: *</label>
                    <input
                      type="text"
                      id="batch"
                      name="batch"
                      value={formData.batch}
                      onChange={handleChange}
                      placeholder="e.g., 2021-2025"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                    {errors.batch && <p className="mt-1 text-sm text-red-400">{errors.batch}</p>}
                  </div>
                  <div>
                    <label htmlFor="enrollmentNumber" className="block text-gray-300 mb-2">Enrollment Number: *</label>
                    <input
                      type="text"
                      id="enrollmentNumber"
                      name="enrollmentNumber"
                      value={formData.enrollmentNumber}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                    {errors.enrollmentNumber && <p className="mt-1 text-sm text-red-400">{errors.enrollmentNumber}</p>}
                  </div>
                </div>
              )}

              {/* Academic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="programme" className="block text-gray-300 mb-2">Programme: *</label>
                  <input
                    type="text"
                    id="programme"
                    name="programme"
                    value={formData.programme}
                    onChange={handleChange}
                    placeholder="e.g., B.Tech, M.Tech, PhD"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                  {errors.programme && <p className="mt-1 text-sm text-red-400">{errors.programme}</p>}
                </div>
                <div>
                  <label htmlFor="branch" className="block text-gray-300 mb-2">Branch: *</label>
                  <input
                    type="text"
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science, Electronics"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                  {errors.branch && <p className="mt-1 text-sm text-red-400">{errors.branch}</p>}
                </div>
              </div>

              {formData.membershipTier === 'Student' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="year" className="block text-gray-300 mb-2">Year: *</label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                      <option value="5th">5th Year</option>
                    </select>
                    {errors.year && <p className="mt-1 text-sm text-red-400">{errors.year}</p>}
                  </div>
                  <div>
                    <label htmlFor="semester" className="block text-gray-300 mb-2">Semester: *</label>
                    <select
                      id="semester"
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Semester</option>
                      <option value="1st">1st Semester</option>
                      <option value="2nd">2nd Semester</option>
                      <option value="3rd">3rd Semester</option>
                      <option value="4th">4th Semester</option>
                      <option value="5th">5th Semester</option>
                      <option value="6th">6th Semester</option>
                      <option value="7th">7th Semester</option>
                      <option value="8th">8th Semester</option>
                      <option value="9th">9th Semester</option>
                      <option value="10th">10th Semester</option>
                    </select>
                    {errors.semester && <p className="mt-1 text-sm text-red-400">{errors.semester}</p>}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-300 mb-2">Contact Number: *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10 digits"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email Address: *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
              </div>

              {/* Relevant Skills */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Relevant Skills</h3>
                <label htmlFor="experience" className="block text-gray-300 mb-2">
                  Briefly describe your Skills in AI, Robotics, IoT, and Automation (e.g., Python, C++):
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your technical skills, programming languages, frameworks, etc."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none resize-vertical"
                ></textarea>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
                <label htmlFor="achievements" className="block text-gray-300 mb-2">
                  List any awards, certifications, or notable accomplishments in any area:
                </label>
                <textarea
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Awards, certifications, competitions, publications, projects, etc."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none resize-vertical"
                ></textarea>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Availability *</h3>
                <label className="block text-gray-300 mb-2">
                  Are you available to contribute to society meetings and events?
                </label>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      value="Yes"
                      checked={formData.availability === 'Yes'}
                      onChange={handleChange}
                      className="text-blue-500 focus:ring-blue-500 focus:ring-2"
                      required
                    />
                    <span className="ml-2 text-gray-300">Yes</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      value="No"
                      checked={formData.availability === 'No'}
                      onChange={handleChange}
                      className="text-blue-500 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-gray-300">No</span>
                  </label>
                  {/* <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      value="Partially"
                      checked={formData.availability === 'Partially'}
                      onChange={handleChange}
                      className="text-blue-500 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-gray-300">Partially</span>
                  </label> */}
                </div>
                {errors.availability && <p className="mt-1 text-sm text-red-400">{errors.availability}</p>}
              </div>

              {/* Future Goals */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Future Goals</h3>
                <label htmlFor="futureGoals" className="block text-gray-300 mb-2">
                  What are your goals, and how can this society help you achieve them?
                </label>
                <textarea
                  id="futureGoals"
                  name="futureGoals"
                  value={formData.futureGoals}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Share your aspirations and how AAIRO can support your journey..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none resize-vertical"
                ></textarea>
              </div>

              {/* Terms and Conditions */}
              <div className="pt-4">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 text-blue-500 focus:ring-blue-500 focus:ring-2 rounded"
                    required
                  />
                  <span className="ml-2 text-gray-300">
                    I hereby declare that I have read, understood, and agree to abide by the Terms and Conditions of the AAIRO Society. *
                  </span>
                </label>
                {errors.acceptTerms && <p className="mt-1 text-sm text-red-400">{errors.acceptTerms}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Application...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
                {errors.submit && (
                  <div className="mt-2 p-3 bg-red-900/30 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400 text-center">{errors.submit}</p>
                  </div>
                )}
              </div>

              {/* Debug Information (remove in production) */}
              {/* {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-white mb-2">Debug Info:</h4>
                  <pre className="text-xs text-gray-300 overflow-auto">
                    {JSON.stringify({
                      formValid: Object.keys(errors).length === 0,
                      errors: errors,
                      formData: formData
                    }, null, 2)}
                  </pre>
                </div>
              )} */}
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Membership;


// // Make sure your backend allows CORS
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://yourdomain.com'], // Add your frontend domains
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Accept']
// }));


// // Ensure your backend can parse JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));