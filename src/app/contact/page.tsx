import React from 'react';

export default function ContactPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white p-6">
      <form
        action="https://formsubmit.co/chepenikconor@gmail.com"
        method="POST"
        className="w-full max-w-lg space-y-6 bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold text-gray-900 text-center">Contact Me</h1>
        <p className="text-lg text-gray-800 text-center">
          Have a specific question or project idea? Fill out the form below with details, and I&apos;ll get back to you!
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
            placeholder="Your full name"
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
            placeholder="Your email address"
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
            <option value="Nostr">Nostr</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="purpose" className="block text-sm font-semibold text-gray-900 mb-1">
            Purpose of Contact <span className="text-red-600">*</span>
          </label>
          <select
            id="purpose"
            name="purpose"
            required
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="">Select Purpose</option>
            <option value="Project Collaboration">Project Collaboration</option>
            <option value="Technical Question">Technical Question</option>
            <option value="Business Inquiry">Business Inquiry</option>
            <option value="Feedback">Feedback on Projects</option>
            <option value="Other">Other (Please specify in message)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="query" className="block text-sm font-semibold text-gray-900 mb-1">
            Specific Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="query"
            name="query"
            required
            rows={4}
            placeholder="Please provide specific details about your inquiry. Generic messages like &quot;what&apos;s your price&quot; will be ignored."
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="verification" className="block text-sm font-semibold text-gray-900 mb-1">
            Human Verification <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="verification"
            name="verification"
            required
            placeholder="What is 7+3? (Please answer with a number)"
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        
        <div>
          <label htmlFor="language" className="block text-sm font-semibold text-gray-900 mb-1">
            Language Requirements <span className="text-red-600">*</span>
          </label>
          <p className="text-sm text-gray-600">
            Please write in English only. Any text not in English will be ignored, including non-English social media handles.
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
            placeholder="e.g., Google, Twitter, Friend, Project"
            className="block w-full p-3 rounded-lg border border-gray-400 shadow-sm placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        
        <input type="hidden" name="_subject" value="New Contact Submission" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://binmucker.com/thank-you" />
        <input type="text" name="_honey" style={{ display: 'none' }} />
        
        <div className="text-sm text-gray-600 mb-4">
          <p>Note: Generic inquiries like &quot;what&apos;s your price&quot; without specific project details will not receive a response.</p>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gray-700 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
