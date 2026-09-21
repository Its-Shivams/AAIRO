import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eventsData from "../api/events.json";
import {
  User,
  Mail,
  Phone,
  Users,
  GraduationCap,
  Hash,
  CreditCard,
  Upload,
  Calendar,
  Trophy,
  Cpu,
  Sparkles,
  ChevronRight,
  CheckCircle,
  X,
  Smartphone,
  HelpCircle,
  ExternalLink,
  ArrowRight,
  Globe,
  Code,
  Zap,
  Shield,
  Plus,
  Trash2,
  BookOpen,
} from "lucide-react";

const Events = () => {
  const [formData, setFormData] = useState({
    event: "",
    fullName: "",
    branch: "",
    contactNumber: "",
    email: "",
    participationType: "solo",
    teamMembers: [{ name: "", email: ""
    }],
    paymentReferenceId: "",
    paymentProof: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationId, setRegistrationId] = useState("");

  const branches = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Artificial Intelligence",
    "Data Science",
    "Other",
  ];

  const events = eventsData;

  const eventIcons = {
    code: <Code className="w-8 h-8" />,
    zap: <Zap className="w-8 h-8" />,
    "graduation-cap": <GraduationCap className="w-8 h-8" />,
  };

  const hasInternalRegistration = events.some(
    (event) => event.registrationOpen && !event.externalRegistrationUrl
  );

  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const pastEvents = events.filter((event) => event.status === "past");

  useEffect(() => {
    const generateRegistrationId = () => {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substr(2, 6).toUpperCase();
      return `AAIRO-${timestamp}-${random}`;
    };

    if (!registrationId) {
      setRegistrationId(generateRegistrationId());
    }
  }, [registrationId]);

  useEffect(() => {
    const totalFields = 9;
    const filledFields = Object.entries(formData).filter(([key, value]) => {
      if (key === "teamMembers" && formData.participationType === "team") {
        return (
          value.length > 0 &&
          value[0].name !== "" &&
          value[0].email !== ""
        );
      }
      return value !== "" && value !== null;
    }).length;

    setProgress(Math.round((filledFields / totalFields) * 100));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index] = {
      ...newTeamMembers[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      teamMembers: newTeamMembers,
    }));

    if (errors[`teamMember${field}${index}`]) {
      setErrors((prev) => ({ ...prev, [`teamMember${field}${index}`]: "" }));
    }
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 4) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [
          ...prev.teamMembers,
          { name: "", email: ""
          },
        ],
      }));
    }
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length > 1) {
      const newTeamMembers = [...formData.teamMembers];
      newTeamMembers.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        teamMembers: newTeamMembers,
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFormData((prev) => ({ ...prev, paymentProof: file }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.event) newErrors.event = "Please select an event";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.branch) newErrors.branch = "Please select your branch";
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Enter a valid 10-digit number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (formData.participationType === "team") {
      if (formData.teamMembers.length === 0) {
        newErrors.teamMembers = "At least one team member is required";
      } else {
        formData.teamMembers.forEach((member, index) => {
          if (!member.name.trim()) {
            newErrors[`teamMemberName${index}`] =
              `Team member ${index + 1} name is required`;
          }
          if (!member.email.trim()) {
            newErrors[`teamMemberEmail${index}`] =
              `Team member ${index + 1} email is required`;
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
            newErrors[`teamMemberEmail${index}`] =
              `Enter a valid email for member ${index + 1}`;
          }
        });
      }
    }

    if (!formData.paymentReferenceId.trim()) {
      newErrors.paymentReferenceId = "Payment reference ID is required";
    }

    return newErrors;
  };

  const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const teamDetails =
        formData.participationType === "team"
          ? formData.teamMembers
              .map((m) => `${m.name} (${m.email})
               `
              )
              .join(" | ")
          : "Solo Participant";
      const formPayload = new FormData();

      formPayload.append("Registration ID", registrationId);
      formPayload.append("Timestamp", new Date().toISOString());
      formPayload.append(
        "Event",
        events.find((e) => e.id === formData.event)?.title || "",
      );
      formPayload.append("Full Name", formData.fullName);
      formPayload.append("Branch", formData.branch);
      formPayload.append("Contact Number", formData.contactNumber);
      formPayload.append("Email", formData.email);
      formPayload.append(
        "Participation Type",
        formData.participationType === "team" ? "Team" : "Solo",
      );
      formPayload.append(
        "Team Size",
        formData.participationType === "team"
          ? formData.teamMembers.length.toString()
          : "1",
      );
      formPayload.append("Team Details", teamDetails);

      formPayload.append("Payment Reference ID", formData.paymentReferenceId);

      formPayload.append("Payment Amount", "100");

      if (formData.paymentProof) {

  const base64 = await convertToBase64(formData.paymentProof);

  formPayload.append("paymentProof", base64);
  formPayload.append("mimeType", formData.paymentProof.type);
}

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzQ30-V6s3-HDbl1iIdyqQorN7_yDforcgB-zzhu75qD3o08eKIfc5cgQgRPZhExANc/exec",
        {
          method: "POST",
          body: formPayload,
        },
      );

      const result = await response.text();
      console.log(result);

      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        const generateNewId = () => {
          const timestamp = Date.now().toString(36).toUpperCase();
          const random = Math.random().toString(36).substr(2, 6).toUpperCase();
          return `AAIRO-${timestamp}-${random}`;
        };

        setFormData({
          event: "",
          fullName: "",
          branch: "",
          contactNumber: "",
          email: "",
          participationType: "solo",
          teamMembers: [{ name: "", email: ""
            }],
          paymentReferenceId: "",
          paymentProof: null,
        });

        setUploadedFile(null);
        setErrors({});
        setRegistrationId(generateNewId());
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("Error submitting form. Please try again.");
    }
  };

  const FloatingBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{ y: 0, x: Math.random() * 100 }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--aairo-bg)] to-[var(--aairo-bg-dark)] text-white font-sans overflow-x-hidden">
      <FloatingBackground />

      {hasInternalRegistration && (
        <div className="relative z-20 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-b border-cyan-500/30">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-cyan-500/20">
                  <Hash className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm text-gray-300">
                  Your Registration ID:
                </span>
              </div>
              <div className="font-mono text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {registrationId}
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="relative z-10 pt-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-[#fe7f42] to-[var(--aairo-red)] backdrop-blur-sm rounded-full border border-cyan-500/30">
            <Sparkles className="w-4 h-4 text-[#fffb97]" />
            <span className="text-sm font-medium text-[#fffb97]">
              AAIRO SOCIETY PRESENTS
            </span>
          </div>

          

          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            AAIRO Events
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Explore upcoming and past events by AAIRO
          </p>

          {hasInternalRegistration && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="max-w-2xl mx-auto h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-12"
            >
              <div className="h-full bg-gradient-to-r from-[#fffb97] to-[#fe7f42] rounded-full transition-all duration-300"></div>
            </motion.div>
          )}
        </motion.div>
      </header>

      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Upcoming Events
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="relative p-8 rounded-2xl backdrop-blur-xl border border-gray-700/50 bg-gradient-to-br from-gray-900/30 to-gray-900/10"
                >
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 mb-4">
                    {eventIcons[event.icon]}
                  </div>

                  <span className="inline-block mb-3 text-sm uppercase tracking-wide text-cyan-400">
                    Upcoming
                  </span>

                  <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                  <p className="text-gray-300 mb-6">{event.description}</p>

                  <div className="space-y-2 text-sm text-gray-400">
                    <p>
                      <Calendar className="w-4 h-4 inline mr-2" />
                      {event.startDate} to {event.endDate}
                    </p>

                    {event.venue && (
                      <p>
                        <Globe className="w-4 h-4 inline mr-2" />
                        {event.venue}
                      </p>
                    )}
                  </div>

                  {event.externalRegistrationUrl && event.registrationOpen ? (
                    <a
                      href={event.externalRegistrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 font-semibold"
                    >
                      Register on ATAL Portal
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : event.registrationOpen ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEvent(event.id);
                        setFormData((prev) => ({ ...prev, event: event.id }));
                      }}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 font-semibold"
                    >
                      Register
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </section>

          {pastEvents.length > 0 && (
            <section className="mb-16 border-t border-gray-700/50 pt-12">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Past Events
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {pastEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-8 rounded-2xl backdrop-blur-xl border border-gray-700/50 bg-gradient-to-br from-gray-900/30 to-gray-900/10"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 mb-4">
                      {eventIcons[event.icon]}
                    </div>

                    <span className="inline-block mb-3 text-sm uppercase tracking-wide text-gray-500">
                      Past Event
                    </span>

                    <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                    <p className="text-gray-300 mb-6">{event.description}</p>

                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{event.startDate}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {hasInternalRegistration && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="backdrop-blur-xl bg-gradient-to-br from-gray-900/40 to-gray-900/20 border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">Registration Form</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Calendar className="w-5 h-5" />
                    Select Event
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {events.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => {
                          setSelectedEvent(event.id);
                          setFormData((prev) => ({ ...prev, event: event.id }));
                        }}
                        className={`p-4 rounded-xl border transition-all ${
                          selectedEvent === event.id
                            ? "border-cyan-500 bg-cyan-500/10"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {eventIcons[event.icon]}
                          <span className="font-medium">{event.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.event && (
                    <p className="mt-2 text-red-400 text-sm">{errors.event}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-lg font-semibold mb-2">
                      <User className="w-5 h-5" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-red-400 text-sm">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  

                  <div>
                    <label className="flex items-center gap-2 text-lg font-semibold mb-2">
                      <GraduationCap className="w-5 h-5" />
                      Branch *
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    >
                      <option value="">Select your branch</option>
                      {branches.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                    {errors.branch && (
                      <p className="mt-2 text-red-400 text-sm">
                        {errors.branch}
                      </p>
                    )}
                  </div>

                  

                  <div>
                    <label className="flex items-center gap-2 text-lg font-semibold mb-2">
                      <Phone className="w-5 h-5" />
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="10-digit mobile number"
                    />
                    {errors.contactNumber && (
                      <p className="mt-2 text-red-400 text-sm">
                        {errors.contactNumber}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-lg font-semibold mb-2">
                      <Mail className="w-5 h-5" />
                      Email ID *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="your.email@university.edu"
                    />
                    {errors.email && (
                      <p className="mt-2 text-red-400 text-sm">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Users className="w-5 h-5" />
                    Participation Type
                  </label>
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    {["solo", "team"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          const newType = type;
                          const newTeamMembers =
                            newType === "team"
                              ? [{ name: "", email: "",
                                 }]
                              : [];
                          setFormData((prev) => ({
                            ...prev,
                            participationType: newType,
                            teamMembers: newTeamMembers,
                          }));
                        }}
                        className={`p-4 rounded-xl border transition-all ${
                          formData.participationType === type
                            ? "border-cyan-500 bg-cyan-500/10"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-3 justify-center">
                          <Users className="w-5 h-5" />
                          <span className="font-medium capitalize">{type}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {formData.participationType === "team" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-lg font-semibold">
                          <Users className="w-5 h-5" />
                          Team Members (Max 4 including you)
                        </label>
                        {formData.teamMembers.length < 4 && (
                          <motion.button
                            type="button"
                            onClick={addTeamMember}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm font-medium"
                          >
                            <Plus className="w-4 h-4" />
                            Add Member
                          </motion.button>
                        )}
                      </div>

                      {errors.teamMembers && (
                        <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-xl">
                          {errors.teamMembers}
                        </p>
                      )}

                      <div className="space-y-6">
                        {formData.teamMembers.map((member, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="p-6 rounded-xl bg-gradient-to-br from-gray-900/30 to-gray-900/10 border border-gray-700/50"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                  <User className="w-4 h-4 text-purple-400" />
                                </div>
                                <span className="font-semibold">
                                  {index === 0
                                    ? "Team Lead (You)"
                                    : `Team Member ${index + 1}`}
                                </span>
                              </div>

                              {index > 0 && (
                                <motion.button
                                  type="button"
                                  onClick={() => removeTeamMember(index)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30"
                                >
                                  <Trash2 className="w-4 h-4 text-red-400" />
                                </motion.button>
                              )}
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                  Full Name *
                                </label>
                                <input
                                  type="text"
                                  value={member.name}
                                  onChange={(e) =>
                                    handleTeamMemberChange(
                                      index,
                                      "name",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                  placeholder={`Enter full name`}
                                />
                                {errors[`teamMemberName${index}`] && (
                                  <p className="mt-2 text-red-400 text-sm">
                                    {errors[`teamMemberName${index}`]}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                  Email ID *
                                </label>
                                <input
                                  type="email"
                                  value={member.email}
                                  onChange={(e) =>
                                    handleTeamMemberChange(
                                      index,
                                      "email",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                  placeholder={`email@example.com`}
                                />
                                {errors[`teamMemberEmail${index}`] && (
                                  <p className="mt-2 text-red-400 text-sm">
                                    {errors[`teamMemberEmail${index}`]}
                                  </p>
                                )}
                              </div>

                              
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400 p-4 rounded-xl bg-gray-900/30">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span>
                          {4 - formData.teamMembers.length} slot(s) remaining
                          for team members
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-8 border-t border-gray-700/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Payment Details</h3>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-700/50">
                        <h4 className="font-semibold mb-4 text-lg">
                          Scan to Pay Total Amount: ₹100
                        </h4>
                        
                        <div>
                          <img src="/payQr.jpeg" alt="payment-QrCode" />
                        </div>
                        <p className="text-sm text-gray-400 mt-4 text-center">
                          Total Amount: ₹100
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="flex items-center gap-2 text-lg font-semibold mb-2">
                          <Hash className="w-5 h-5" />
                          Payment Reference ID *
                        </label>
                        <input
                          type="text"
                          name="paymentReferenceId"
                          value={formData.paymentReferenceId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                          placeholder="UPI Transaction ID"
                        />
                        {errors.paymentReferenceId && (
                          <p className="mt-2 text-red-400 text-sm">
                            {errors.paymentReferenceId}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-lg font-semibold mb-2">
                          <Upload className="w-5 h-5" />
                          Upload Payment Proof
                        </label>
                        <div
                          onClick={() =>
                            document.getElementById("payment-proof").click()
                          }
                          className={`w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                            uploadedFile
                              ? "border-green-500 bg-green-500/5"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          <input
                            type="file"
                            id="payment-proof"
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <div className="text-center">
                            <Upload
                              className={`w-12 h-12 mx-auto mb-4 ${
                                uploadedFile
                                  ? "text-green-500"
                                  : "text-gray-400"
                              }`}
                            />
                            {uploadedFile ? (
                              <>
                                <p className="font-medium text-green-400">
                                  ✓ {uploadedFile.name}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                  Click to change file
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium">
                                  Drag & drop or click to upload
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                  Screenshot or PDF of payment confirmation
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 bg-gradient-to-r from-[var(--aairo-red)] to-[#fe7f42] hover:from-[var(--aairo-red)] hover:to-[#fe7f42] disabled:opacity-50 rounded-xl text-xl font-bold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        Processing Registration...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        Complete Registration
                        <ArrowRight className="w-6 h-6" />
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>

              <div className="mt-12 pt-8 border-t border-gray-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold">Need Help?</h3>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-gray-900/30 to-gray-900/10 border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                      <Smartphone className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Contact Support</p>
                      <p className="text-lg font-semibold">Pranav Kaushik</p>
                    </div>
                  </div>
                  <a
                    href="tel:95522155658"
                    className="sm:ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 border border-cyan-500/30 rounded-xl transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>98212 13075</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </section>
          )}
        </div>
      </main>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-3">
                  Registration Successful!
                </h3>
                <p className="text-gray-300 mb-6">
                  Thank you for registering Please save your Registration ID for
                  future reference !
                </p>

                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 mb-6">
                  <p className="text-sm text-gray-400 mb-2">Registration ID</p>
                  <p className="font-mono text-lg font-bold">
                    {registrationId}
                  </p>
                </div>

                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5" />
            <span>AAIRO Society © 2024 • All Rights Reserved</span>
          </div>
          <p className="text-gray-600">
            Powered by AI Innovation • Building the Future Together
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Events;
