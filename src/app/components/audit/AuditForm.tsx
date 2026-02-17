'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BUSINESS_TYPES } from '@/lib/audit-constants';
import type { AuditFormData } from '@/types/audit';

interface AuditFormProps {
  onSubmit: (data: AuditFormData) => void;
}

export function AuditForm({ onSubmit }: AuditFormProps) {
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');

  const isValid = businessName.trim() && city.trim() && businessType;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      businessName: businessName.trim(),
      city: city.trim(),
      businessType,
      websiteUrl: websiteUrl.trim() || undefined,
      additionalContext: additionalContext.trim() || undefined,
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto glass rounded-2xl p-8 border border-gold-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-5">
        {/* Business Name */}
        <div>
          <label htmlFor="audit-business-name" className="block text-sm font-medium text-gold-400 mb-2">
            Business Name <span className="text-laser">*</span>
          </label>
          <input
            type="text"
            id="audit-business-name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g., Joe's Pizza"
            className="input-cyber"
            required
            maxLength={100}
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="audit-city" className="block text-sm font-medium text-gold-400 mb-2">
            City / Location <span className="text-laser">*</span>
          </label>
          <input
            type="text"
            id="audit-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Austin, TX"
            className="input-cyber"
            required
            maxLength={100}
          />
        </div>

        {/* Business Type */}
        <div>
          <label htmlFor="audit-business-type" className="block text-sm font-medium text-gold-400 mb-2">
            Business Type <span className="text-laser">*</span>
          </label>
          <select
            id="audit-business-type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="input-cyber"
            required
          >
            <option value="">Select business type</option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Website URL */}
        <div>
          <label htmlFor="audit-website" className="block text-sm font-medium text-gold-400 mb-2">
            Website URL <span className="text-gray-600">(optional)</span>
          </label>
          <input
            type="url"
            id="audit-website"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://www.example.com"
            className="input-cyber"
            maxLength={200}
          />
        </div>

        {/* Additional Context */}
        <div>
          <label htmlFor="audit-context" className="block text-sm font-medium text-gold-400 mb-2">
            Additional Context <span className="text-gray-600">(optional)</span>
          </label>
          <textarea
            id="audit-context"
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            rows={3}
            placeholder="Any details about your business, goals, or challenges..."
            className="input-cyber resize-none"
            maxLength={1000}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full btn-neon py-4 text-lg font-bold mt-6 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
      >
        Run Free Audit
      </button>

      <p className="text-xs text-gray-600 text-center mt-3">
        Powered by AI &middot; Results in ~90-120 seconds &middot; No signup required
      </p>
    </motion.form>
  );
}
