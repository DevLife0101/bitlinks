"use client";
import React, { useState } from "react";

const Contact = () => {
  // 1. Added phone and subject to state
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    subject: "",
    message: "" 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        // Reset form completely
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

        // Hide success message after 4 seconds
        setTimeout(() => setSuccess(false), 4000);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black px-6 py-20">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 text-white">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        
        <p className="text-gray-300 text-center mb-10">
          Have a question, feedback, or need support? We're here to help.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Grid layout for Name, Email, and Phone to save space */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400"
              />
            </div>

            {/* Subject Dropdown */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 text-white [&>option]:text-black"
              >
                <option value="" disabled>Select a topic</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Billing & Sales">Billing & Sales</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="How can we help you today?"
              className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              "Send Message ✉️"
            )}
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div className="mt-6 text-center text-green-400 font-semibold animate-bounce">
            ✅ Message sent successfully! We'll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;