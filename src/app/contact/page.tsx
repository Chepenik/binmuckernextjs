'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cyber-black bg-mesh-gradient bg-cyber-grid p-6">
      {/* Back button */}
      <Link
        href="/"
        className="fixed top-6 left-6 text-gray-400 hover:text-gold-400 transition-colors
                   flex items-center gap-2 z-10"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back</span>
      </Link>

      <motion.form
        action="https://formsubmit.co/chepenikconor@gmail.com"
        method="POST"
        className="w-full max-w-lg glass rounded-3xl p-8 border border-gold-500/20 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-gradient-gold mb-2">
            Contact Me
          </h1>
          <p className="text-gray-400">
            Have a specific question or project idea? Fill out the form below.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gold-400 mb-2">
              Name <span className="text-laser">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your full name"
              className="input-cyber"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gold-400 mb-2">
              Email <span className="text-laser">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Your email address"
              className="input-cyber"
            />
          </div>

          <div>
            <label htmlFor="social-media" className="block text-sm font-medium text-gold-400 mb-2">
              Social Media Handle <span className="text-laser">*</span>
            </label>
            <input
              type="text"
              id="social-media"
              name="social_media"
              required
              placeholder="e.g., Twitter @yourhandle"
              className="input-cyber"
            />
          </div>

          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gold-400 mb-2">
              Social Media Platform <span className="text-laser">*</span>
            </label>
            <select
              id="platform"
              name="platform"
              required
              className="input-cyber"
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
            <label htmlFor="purpose" className="block text-sm font-medium text-gold-400 mb-2">
              Purpose of Contact <span className="text-laser">*</span>
            </label>
            <select
              id="purpose"
              name="purpose"
              required
              className="input-cyber"
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
            <label htmlFor="query" className="block text-sm font-medium text-gold-400 mb-2">
              Specific Message <span className="text-laser">*</span>
            </label>
            <textarea
              id="query"
              name="query"
              required
              rows={4}
              placeholder="Please provide specific details about your inquiry."
              className="input-cyber resize-none"
            ></textarea>
          </div>

          <div>
            <label htmlFor="verification" className="block text-sm font-medium text-gold-400 mb-2">
              Human Verification <span className="text-laser">*</span>
            </label>
            <input
              type="text"
              id="verification"
              name="verification"
              required
              placeholder="What is 7+3? (Answer with a number)"
              className="input-cyber"
            />
          </div>

          <div className="text-sm text-gray-500">
            <p>Please write in English only. Non-English text will be ignored.</p>
          </div>

          <div>
            <label htmlFor="how-found" className="block text-sm font-medium text-gold-400 mb-2">
              How did you find me? (optional)
            </label>
            <input
              type="text"
              id="how-found"
              name="how_found"
              placeholder="e.g., Google, Twitter, Friend"
              className="input-cyber"
            />
          </div>
        </div>

        {/* Hidden fields */}
        <input type="hidden" name="_subject" value="New Contact Submission" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://binmucker.com/thank-you" />
        <input type="text" name="_honey" style={{ display: 'none' }} />

        <div className="text-xs text-gray-500 mt-6 mb-4">
          <p>Note: Generic inquiries without specific details will not receive a response.</p>
        </div>

        <button
          type="submit"
          className="w-full btn-premium py-4 text-lg font-bold"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
}
