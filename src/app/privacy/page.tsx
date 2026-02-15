import React from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="heading-display text-[#E6EEF3] mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: February 15, 2026</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              We collect minimal information. When you use our contact form, we receive your name,
              email address, and message content. This data is processed by{' '}
              <a href="https://formsubmit.co/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">
                FormSubmit.co
              </a>{' '}
              and delivered to our email. We do not store form submissions in a database.
            </p>
            <p>
              We do not require account creation, and we do not collect passwords, payment card
              information, or personally identifiable information beyond what you voluntarily provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>
              Information submitted through the contact form is used solely to respond to your
              inquiry. We do not sell, rent, or share your personal information with third parties
              for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Third-Party Services</h2>
            <p className="mb-3">Our site uses the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-white">Vercel</strong> — Hosting and deployment. Subject to Vercel&apos;s privacy policy.</li>
              <li><strong className="text-white">FormSubmit.co</strong> — Contact form processing. Your form data passes through their servers.</li>
              <li><strong className="text-white">Strike.me</strong> — Bitcoin Lightning payments. Subject to Strike&apos;s privacy policy.</li>
              <li><strong className="text-white">Affiliate Partners</strong> — Links to CrowdHealth, Gemini, and Hostinger include referral codes. These partners may use cookies on their own sites.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Cookies</h2>
            <p>
              This site uses minimal cookies. We do not use advertising cookies or third-party
              tracking scripts. Vercel may set essential cookies for hosting functionality. Affiliate
              partner sites may set their own cookies when you click referral links.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Breathing App</h2>
            <p>
              The Breathe Better app runs entirely in your browser. No breathing session data,
              preferences, or usage statistics are collected or transmitted to any server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Bitcoin Payments</h2>
            <p>
              Bitcoin transactions are processed on the Bitcoin network and are publicly visible on
              the blockchain. Lightning Network payments via Strike are subject to Strike&apos;s privacy
              policy. We do not collect or store your wallet information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. External Links</h2>
            <p>
              This site contains links to external websites and services. We are not responsible for
              the privacy practices or content of those sites. We encourage you to review the privacy
              policies of any external site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Children&apos;s Privacy</h2>
            <p>
              This site is not directed at children under 13. We do not knowingly collect personal
              information from children. If you believe a child has provided us with personal
              information, please contact us so we can remove it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated revision date. Your continued use of the site after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please reach out via our{' '}
              <a href="/contact" className="text-neon-cyan hover:underline">contact form</a> or email{' '}
              <a href="mailto:binmucker@proton.me" className="text-neon-cyan hover:underline">
                binmucker@proton.me
              </a>.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <p className="text-gray-500 text-sm">
              Binmucker&apos;s LLC &middot; Florida &middot; This policy is provided for informational
              purposes and does not constitute legal advice.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
