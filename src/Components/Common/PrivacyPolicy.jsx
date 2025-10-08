import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SectionTitle = ({ title }) => (
  <h4 className="mt-4 mb-2 text-dark fw-semibold border-bottom pb-2">
    {title}
  </h4>
);

const ListItem = ({ text }) => (
  <li className="mb-2 d-flex align-items-start">
    <FaCheckCircle className="text-success me-2 mt-1" />
    <span>{text}</span>
  </li>
);

const Privacy_Policy = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h1 className="text-center text-gradient fw-bold mb-4">
          Privacy Policy
        </h1>
        <p className="fs-5 text-muted">
          We at <strong>Adz10x.com</strong> value your privacy and are committed
          to protecting your personal data. We collect minimal information
          necessary to provide our services, including society and company
          details, contact information, and ad campaign preferences.
        </p>

        <SectionTitle title="Information We Collect" />
        <ul className="list-unstyled">
          <ListItem text="Personal information such as name, email, phone number, and address." />
          <ListItem text="Business or society-related details for onboarding and campaign targeting." />
          <ListItem text="Usage data including browser type, pages visited, and access times." />
        </ul>

        <SectionTitle title="How We Use Your Information" />
        <ul className="list-unstyled">
          <ListItem text="To provide and improve our services and platform experience." />
          <ListItem text="To communicate with you regarding campaigns, updates, and support." />
          <ListItem text="To generate reports, invoices, and analytics for business use." />
        </ul>

        <SectionTitle title="Sharing of Information" />
        <p>
          We do <strong>not</strong> sell or rent your personal information.
          Your data may be shared only with:
        </p>
        <ul className="list-unstyled">
          <ListItem text="Internal departments and agents working on your campaigns." />
          <ListItem text="Third-party service providers for technical infrastructure and analytics." />
          <ListItem text="Legal authorities if required by law or in the case of fraud." />
        </ul>

        <SectionTitle title="Cookies & Tracking Technologies" />
        <p>
          Our platform uses cookies to enhance user experience, gather usage
          data, and personalize content. You can choose to disable cookies in
          your browser settings.
        </p>

        <SectionTitle title="Data Security" />
        <ul className="list-unstyled">
          <ListItem text="We use SSL encryption and secure servers to protect your data." />
          <ListItem text="Access to your data is restricted to authorized personnel only." />
          <ListItem text="Regular security audits are conducted to safeguard platform integrity." />
        </ul>

        <SectionTitle title="User Rights & Control" />
        <ul className="list-unstyled">
          <ListItem text="You can request access, correction, or deletion of your personal data." />
          <ListItem text="You can unsubscribe from marketing emails at any time." />
          <ListItem text="You can raise privacy-related concerns with our support team." />
        </ul>

        <SectionTitle title="Data Retention" />
        <p>
          We retain your information for as long as your account is active, or
          as needed to comply with legal obligations and resolve disputes.
        </p>

        <SectionTitle title="Third-Party Links" />
        <p>
          Our platform may contain links to external websites. We are not
          responsible for the privacy practices or content of such sites. Please
          review their privacy policies separately.
        </p>

        <SectionTitle title="Children's Privacy" />
        <p>
          Our services are not intended for users under the age of 18. We do not
          knowingly collect data from minors.
        </p>

        <SectionTitle title="Policy Updates" />
        <p>
          This policy may be updated periodically. Users will be notified of
          significant changes, and continued use of the platform implies
          acceptance.
        </p>

        <SectionTitle title="Contact Information" />
        <p>
          For questions or concerns regarding this policy, contact us at{" "}
          <a href="mailto:support@adz10x.com" className="text-primary">
            support@adz10x.com
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Privacy_Policy;
