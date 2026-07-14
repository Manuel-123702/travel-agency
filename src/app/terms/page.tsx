import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Travel Agency",
  description: "Terms and conditions for Travel Agency immigration consulting services.",
};

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="gradient-bg py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
            Terms & <span className="text-gold">Conditions</span>
          </h1>
          <p className="text-white/70">Last updated: June 28, 2026</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-10 text-gray-600 leading-relaxed">
            {[
              {
                title: "1. Acceptance of Terms",
                content: "By accessing or using Travel Agency's website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
              },
              {
                title: "2. Services Description",
                content: "Travel Agency provides immigration consulting services including but not limited to: profile evaluation, document preparation, visa application assistance, interview preparation, and post-arrival support. We are not a law firm and do not provide legal advice. Our services are those of registered immigration consultants.",
              },
              {
                title: "3. No Guarantee of Outcome",
                content: "While we maintain an industry-leading 97% success rate, we cannot and do not guarantee visa approval or any specific immigration outcome. The final decision rests with the relevant immigration authority. We will always provide an honest assessment of your chances before proceeding.",
              },
              {
                title: "4. Fees and Payment",
                content: "Our service fees are outlined in your individual service agreement. Fees are due as specified in your agreement. Government filing fees are separate and are the client's responsibility. Refund policies are detailed in your individual service contract.",
              },
              {
                title: "5. Client Responsibilities",
                content: "Clients are responsible for providing accurate, truthful, and complete information. Providing false information on immigration applications is illegal and may result in permanent bans. Travel Agency is not liable for consequences arising from false information provided by clients.",
              },
              {
                title: "6. Confidentiality",
                content: "All client information is treated with strict confidentiality and is protected under our Privacy Policy. We will not disclose your information to third parties without your explicit consent, except as required by law.",
              },
              {
                title: "7. Limitation of Liability",
                content: "Travel Agency's liability is limited to the fees paid for services. We are not liable for indirect, incidental, or consequential damages arising from visa refusals, processing delays, or policy changes by immigration authorities.",
              },
              {
                title: "8. Governing Law",
                content: "These Terms are governed by the laws of the Province of Quebec, Canada. Any disputes will be resolved through binding arbitration in Montreal, Quebec.",
              },
              {
                title: "9. Contact",
                content: "For questions about these Terms, contact us at: legal@travelagency.com | +1 (514) 000-0000.",
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
