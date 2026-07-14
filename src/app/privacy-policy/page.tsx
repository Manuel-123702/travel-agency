import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Travel Agency",
  description: "Travel Agency Privacy Policy — how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20">
      <section className="gradient-bg py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
            Privacy <span className="text-gold">Policy</span>
          </h1>
          <p className="text-white/70">Last updated: June 28, 2026</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg max-w-none">
          <div className="space-y-10 text-gray-600 leading-relaxed">
            {[
              {
                title: "1. Information We Collect",
                content: `We collect information you provide directly to us, such as when you fill out our contact or evaluation forms. This may include your name, email address, phone number, country of residence, educational background, and immigration project details. We also collect technical data such as IP addresses, browser type, and usage data through cookies and analytics tools.`,
              },
              {
                title: "2. How We Use Your Information",
                content: `We use your information to: provide and improve our immigration consulting services; respond to your inquiries and communicate with you; send you relevant immigration news, updates, and service information (you may unsubscribe at any time); analyze usage patterns to improve our website; comply with legal obligations.`,
              },
              {
                title: "3. Information Sharing",
                content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with: trusted service providers who assist us in operating our website and conducting our business (under strict confidentiality agreements); immigration authorities when required to process your application (with your explicit consent); legal authorities when required by law.`,
              },
              {
                title: "4. Data Security",
                content: `We implement industry-standard security measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. All data is encrypted in transit using SSL/TLS protocols. Our systems are regularly audited for security vulnerabilities.`,
              },
              {
                title: "5. Cookies",
                content: `Our website uses cookies to enhance your experience. These include: essential cookies (required for website functionality), analytics cookies (to understand how visitors use our site), and marketing cookies (to show you relevant content). You may disable cookies through your browser settings, though this may affect website functionality.`,
              },
              {
                title: "6. Your Rights",
                content: `Depending on your location, you may have the right to: access the personal information we hold about you; correct inaccurate information; request deletion of your data; object to processing of your data; data portability. To exercise these rights, contact us at privacy@travelagency.com.`,
              },
              {
                title: "7. Data Retention",
                content: `We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Typically, client files are retained for 7 years following the conclusion of services.`,
              },
              {
                title: "8. Contact Us",
                content: `If you have questions about this Privacy Policy, please contact our Data Protection Officer at: privacy@travelagency.com | Travel Agency, 1000 De La Gauchetière St W, Suite 2400, Montreal, QC H3B 4W5, Canada.`,
              },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="font-heading font-bold text-xl text-navy mb-3">{title}</h2>
                <p>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
