import React from 'react';

export default function ContactPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-300 to-teal-400 p-6">
      <form
        action="https://formsubmit.co/chepenikconor@gmail.com"
        method="POST"
        className="w-full max-w-lg space-y-6 bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold text-gray-900 text-center">Contact Me</h1>
        <p className="text-lg text-gray-800 text-center">
          Have a question, comment, or just want to connect? Fill out the form below, and I&apos;ll get back to you!
        </p>
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-1">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Your email"
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        <div>
          <label htmlFor="social-media" className="block text-sm font-semibold text-gray-900 mb-1">
            Social Media Handle <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="social-media"
            name="social_media"
            required
            placeholder="e.g., Twitter @yourhandle"
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        <div>
          <label htmlFor="platform" className="block text-sm font-semibold text-gray-900 mb-1">
            Social Media Platform <span className="text-red-600">*</span>
          </label>
          <select
            id="platform"
            name="platform"
            required
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="">Select Platform</option>
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="TikTok">TikTok</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="query" className="block text-sm font-semibold text-gray-900 mb-1">
            Query 
          </label>
          <textarea
            id="query"
            name="query"
            required
            rows={4}
            placeholder="What&apos;s on your mind?"
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          ></textarea>
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-semibold text-gray-900 mb-1">
            Please write in English <span className="text-red-600">*</span>
          </label>
          <p className="text-sm text-gray-600">
            Any text not in English will be ignored, including non-English social media handles.
          </p>
        </div>
        <div>
          <label htmlFor="how-found" className="block text-sm font-semibold text-gray-900 mb-1">
            How did you find me? (optional)
          </label>
          <input
            type="text"
            id="how-found"
            name="how_found"
            placeholder="e.g., Google, Twitter, Friend"
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        <input type="hidden" name="_subject" value="New Contact Submission" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://binmucker.com/thank-you" />
        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
