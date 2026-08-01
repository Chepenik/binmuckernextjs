import React from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="site-page">
      <Header />
      <main>
        <div className="site-shell route-main route-main-narrow">
          <header className="route-hero">
            <p className="route-eyebrow">Legal · plain language</p>
            <h1 className="route-title route-title-compact">Privacy Policy</h1>
            <p className="route-lede">Last updated February 15, 2026. How Binmucker handles information, browser-local data, external services, and payments.</p>
          </header>

          <div className="legal-body">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We collect minimal information. The site does not operate a contact or booking form,
              so we do not receive your name, email, or message content through it.
            </p>
            <p>
              We do not require account creation, and we do not collect passwords, payment card
              information, or personally identifiable information beyond what you voluntarily provide.
            </p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>
              We do not sell, rent, or share your personal information with third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2>3. Third-Party Services</h2>
            <p>Our site uses the following third-party services:</p>
            <ul>
              <li><strong>Vercel</strong> — Hosting and deployment. Subject to Vercel&apos;s privacy policy.</li>
              <li><strong>Strike.me</strong> — Bitcoin Lightning payments. Subject to Strike&apos;s privacy policy.</li>
              <li><strong>Affiliate Partners</strong> — Links to Venice AI, CrowdHealth, Gemini, and Hostinger include referral codes. These partners may use cookies on their own sites.</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies</h2>
            <p>
              This site uses minimal cookies. We do not use advertising cookies or third-party
              tracking scripts. Vercel may set essential cookies for hosting functionality. Affiliate
              partner sites may set their own cookies when you click referral links.
            </p>
          </section>

          <section>
            <h2>5. Browser-Local Features</h2>
            <p>
              Breathe Better and the Daily Desk run in your browser. Daily habit state, private idea
              notes, onboarding preferences, and breathing-session state are not submitted to Binmucker.
            </p>
          </section>

          <section>
            <h2>6. Bitcoin Payments</h2>
            <p>
              Bitcoin transactions are processed on the Bitcoin network and are publicly visible on
              the blockchain. Lightning Network payments via Strike are subject to Strike&apos;s privacy
              policy. We do not collect or store your wallet information.
            </p>
          </section>

          <section>
            <h2>7. External Links</h2>
            <p>
              This site contains links to external websites and services. We are not responsible for
              the privacy practices or content of those sites. We encourage you to review the privacy
              policies of any external site you visit.
            </p>
          </section>

          <section>
            <h2>8. Children&apos;s Privacy</h2>
            <p>
              This site is not directed at children under 13. We do not knowingly collect personal
              information from children. If you believe a child has provided us with personal
              information, please contact us so we can remove it.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated revision date. Your continued use of the site after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please email{' '}
              <a href="mailto:binmucker@proton.me">
                binmucker@proton.me
              </a>.
            </p>
          </section>

          <section>
            <p>
              Binmucker LLC &middot; Florida &middot; This policy is provided for informational
              purposes and does not constitute legal advice.
            </p>
          </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
