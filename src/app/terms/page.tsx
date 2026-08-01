import React from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export default function TermsOfService() {
  return (
    <div className="site-page">
      <Header />
      <main>
        <div className="site-shell route-main route-main-narrow">
          <header className="route-hero">
            <p className="route-eyebrow">Legal · plain language</p>
            <h1 className="route-title route-title-compact">Terms of Service</h1>
            <p className="route-lede">Last updated February 15, 2026. The terms for using Binmucker’s tools, writing, games, and external links.</p>
          </header>

          <div className="legal-body">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using binmucker.com (&quot;the Site&quot;), you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not use the Site.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Binmucker is a digital portfolio and project hub operated by Conor Chepenik. The Site
              provides access to various tools, games, educational resources, blog content, and links
              to external projects and services. Some features are free to use; others may link to
              paid third-party products or services.
            </p>
          </section>

          <section>
            <h2>3. Intellectual Property</h2>
            <p>
              All original content on this Site — including text, graphics, code, and design — is
              the property of Binmucker LLC or its creator, Conor Chepenik, unless otherwise noted.
              You may not reproduce, distribute, or create derivative works from this content without
              prior written permission.
            </p>
          </section>

          <section>
            <h2>4. User Conduct</h2>
            <p>When using the Site, you agree not to:</p>
            <ul>
              <li>Use the Site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Site</li>
              <li>Interfere with or disrupt the Site&apos;s functionality</li>
              <li>Submit false or misleading information through any interactive tool</li>
              <li>Use automated tools to scrape or crawl the Site beyond what robots.txt permits</li>
            </ul>
          </section>

          <section>
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              The Site and all content are provided &quot;as is&quot; and &quot;as available&quot; without warranties of
              any kind, either express or implied. We do not warrant that the Site will be
              uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Binmucker LLC and Conor Chepenik shall not
              be liable for any indirect, incidental, special, consequential, or punitive damages
              arising from your use of or inability to use the Site, including any tools, games, or
              calculators provided.
            </p>
          </section>

          <section>
            <h2>7. Third-Party &amp; Affiliate Links</h2>
            <p>
              The Site contains links to third-party websites and services, some of which are
              affiliate links. We may earn a commission if you make a purchase through these links
              at no additional cost to you. We are not responsible for the content, accuracy, or
              practices of third-party sites. Affiliate relationships do not influence our
              recommendations — we only share products and services we genuinely use or believe in.
            </p>
          </section>

          <section>
            <h2>8. Bitcoin &amp; Cryptocurrency Disclaimer</h2>
            <p>
              Nothing on this Site constitutes financial advice. Bitcoin and cryptocurrency
              investments carry significant risk, including the potential loss of your entire
              investment. Tools like the Sound Money Mortgage Calculator and Saylorscope are for
              educational and informational purposes only. Always do your own research and consult
              a qualified financial advisor before making investment decisions.
            </p>
          </section>

          <section>
            <h2>9. Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this
              page with an updated date. Your continued use of the Site after modifications
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              the State of Florida, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2>11. Contact</h2>
            <p>
              If you have questions about these Terms, please email{' '}
              <a href="mailto:binmucker@proton.me">
                binmucker@proton.me
              </a>.
            </p>
          </section>

          <section>
            <p>
              Binmucker LLC &middot; Florida &middot; These terms are provided for informational
              purposes and do not constitute legal advice.
            </p>
          </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
