'use client';

import React, { useState } from 'react';
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
    <form
      onSubmit={handleSubmit}
      className="audit-form ui-card"
    >
      <div className="space-y-5">
        {/* Business Name */}
        <div>
          <label htmlFor="audit-business-name" className="ui-label">
            Business name <span>Required</span>
          </label>
          <input
            type="text"
            id="audit-business-name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g., Joe's Pizza"
            className="ui-field"
            required
            maxLength={100}
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="audit-city" className="ui-label">
            City or location <span>Required</span>
          </label>
          <input
            type="text"
            id="audit-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Austin, TX"
            className="ui-field"
            required
            maxLength={100}
          />
        </div>

        {/* Business Type */}
        <div>
          <label htmlFor="audit-business-type" className="ui-label">
            Business type <span>Required</span>
          </label>
          <select
            id="audit-business-type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="ui-field"
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
          <label htmlFor="audit-website" className="ui-label">
            Website URL <span>Optional</span>
          </label>
          <input
            type="url"
            id="audit-website"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://www.example.com"
            className="ui-field"
            maxLength={200}
          />
        </div>

        {/* Additional Context */}
        <div>
          <label htmlFor="audit-context" className="ui-label">
            Additional context <span>Optional</span>
          </label>
          <textarea
            id="audit-context"
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            rows={3}
            placeholder="Any details about your business, goals, or challenges..."
            className="ui-field"
            maxLength={1000}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="ui-button audit-submit"
      >
        Run Free Audit
      </button>

      <p className="audit-form-note">
        Powered by AI &middot; Results in ~90-120 seconds &middot; No signup required
      </p>
    </form>
  );
}
