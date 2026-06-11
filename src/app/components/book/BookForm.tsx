'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Mail, ShieldCheck, Zap } from 'lucide-react';

type OfferKey = 'call' | 'retainer';

const OFFERS: Record<OfferKey, { label: string; price: string; sub: string }> = {
  call: {
    label: 'AI SEO Strategy Call',
    price: '300,000 sats',
    sub: 'One 30-minute working session · paid on Lightning',
  },
  retainer: {
    label: 'AI Visibility Retainer',
    price: '1,000,000 sats/mo',
    sub: '3-month minimum · limited to 5 clients',
  },
};

export function BookForm({ offer = 'call' }: { offer?: OfferKey }) {
  const selected = OFFERS[offer] ?? OFFERS.call;
  // Mirrors the form into local state only to keep the submit button honest;
  // FormSubmit handles the actual POST + redirect to /thank-you.
  const [email, setEmail] = useState('');

  return (
    <section className="max-w-2xl mx-auto px-4 md:px-8 py-16 md:py-20">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 mb-5 glass-dark px-4 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest text-neon-cyan">
          <CalendarCheck className="w-4 h-4" aria-hidden="true" />
          Book your call
        </div>
        <h1 className="heading-display text-gradient-gold mb-4">
          Let&apos;s get your business found.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Drop your email and I&apos;ll send a calendar invite &mdash; usually within a
          day. We lock a time, talk through your AI and SEO, and you pay in sats on
          Lightning. New to Bitcoin? I&apos;ll walk you through it.
        </p>
      </motion.div>

      {/* Selected offer summary */}
      <motion.div
        className="glass rounded-2xl p-5 mb-6 border border-gold-500/25 flex items-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <span className="text-2xl" aria-hidden="true">📅</span>
        <div className="min-w-0">
          <p className="text-white font-semibold leading-tight">{selected.label}</p>
          <p className="text-gray-500 text-xs mt-0.5">{selected.sub}</p>
        </div>
        <span className="ml-auto text-gradient-gold font-bold whitespace-nowrap">
          {selected.price}
        </span>
      </motion.div>

      <motion.form
        action="https://formsubmit.co/chepenikconor@gmail.com"
        method="POST"
        className="glass rounded-3xl p-6 md:p-8 border border-gold-500/20 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gold-400 mb-2">
              Name <span className="text-laser">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              className="input-cyber"
            />
          </div>

          {/* Email — the one required channel */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gold-400 mb-2">
              Email <span className="text-laser">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@business.com"
                autoComplete="email"
                className="input-cyber !pl-9"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              Required &mdash; this is where I send your calendar invite.
            </p>
          </div>

          {/* Business website — optional but encouraged */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gold-400 mb-2">
              Business website <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="website"
              name="website"
              placeholder="yourbusiness.com"
              className="input-cyber"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Optional, but if you add it I&apos;ll review your site before we talk so we
              don&apos;t waste the call.
            </p>
          </div>

          {/* Phone — optional with reason */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gold-400 mb-2">
              Phone <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Only if you&apos;d rather I text the invite"
              className="input-cyber"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Optional &mdash; only if you&apos;d prefer a text over email.
            </p>
          </div>

          {/* Social — optional with reason */}
          <div>
            <label htmlFor="social" className="block text-sm font-medium text-gold-400 mb-2">
              Social handle <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="social"
              name="social"
              placeholder="@yourhandle on X, Nostr, IG…"
              className="input-cyber"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Optional &mdash; helps me recognize you and gives context.
            </p>
          </div>

          {/* What to focus on */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gold-400 mb-2">
              What do you want to get out of the call?{' '}
              <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <textarea
              id="goal"
              name="goal"
              rows={3}
              placeholder="e.g. 'I want to show up when people ask ChatGPT for a plumber in Austin.'"
              className="input-cyber resize-none"
            ></textarea>
          </div>
        </div>

        {/* Hidden / FormSubmit config */}
        <input type="hidden" name="offer" value={selected.label} />
        <input type="hidden" name="_subject" value={`New booking request — ${selected.label}`} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://binmucker.com/thank-you" />
        <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        <button type="submit" className="w-full btn-premium py-4 text-base font-bold mt-7">
          Request my calendar invite
        </button>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neon-green shrink-0" aria-hidden="true" />
            3 implementable fixes or you don&apos;t pay.
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
            Pay in sats on Lightning once we lock a time.
          </div>
        </div>
      </motion.form>
    </section>
  );
}
