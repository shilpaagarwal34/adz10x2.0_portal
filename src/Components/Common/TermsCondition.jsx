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

const Terms_conditions = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h1 className="text-center text-gradient fw-bold mb-4">
          Terms and Conditions
        </h1>
        <p className="fs-5 text-muted">
          Welcome to <strong>adz10x.com</strong>. By signing up and using our
          platform, you agree to abide by the following terms and conditions.
          Please read them carefully before proceeding.
        </p>

        <SectionTitle title="Acceptance of Terms" />
        <p>
          By accessing or using any part of the ADZ10X platform, you accept and
          agree to be bound by these Terms & Conditions. If you do not agree,
          you may not access the platform.
        </p>

        <SectionTitle title="Eligibility & User Types" />
        <p>Our platform is intended for use by:</p>
        <ul className="list-unstyled">
          <ListItem text="Authorized representatives of residential or commercial societies." />
          <ListItem text="Verified companies, agencies, or brand representatives." />
          <ListItem text="Internal platform users such as onboarding agents, sales teams, and admins." />
        </ul>
        <p>
          Users must be 18 years of age or older and have the authority to act
          on behalf of their society or company.
        </p>

        <SectionTitle title="Campaign Compliance" />
        <ul className="list-unstyled">
          <ListItem text="All ad campaigns must adhere to ADZ10X’s ad content guidelines, which prohibit misleading, harmful, offensive, or unverified material." />
          <ListItem text="The platform team reserves the right to reject, remove, or request modifications for any submitted creative or content." />
        </ul>

        <SectionTitle title="Society Rights & Responsibilities" />
        <ul className="list-unstyled">
          <ListItem text="Societies have full control over approving or rejecting campaigns targeted to them." />
          <ListItem text="They are responsible for reviewing ad content before granting approval." />
          <ListItem text="Societies will receive earnings as per the revenue share agreement defined in each campaign." />
        </ul>

        <SectionTitle title="Company Responsibilities" />
        <ul className="list-unstyled">
          <ListItem text="Companies must maintain a sufficient wallet balance to initiate and run campaigns." />
          <ListItem text="Campaigns will not go live without adequate funds and prior approval from both the platform and targeted societies." />
          <ListItem text="Uploaded creatives must be original or properly licensed." />
        </ul>

        <SectionTitle title="Wallet, Billing & Receipts" />
        <ul className="list-unstyled">
          <ListItem text="All wallet top-ups are non-refundable, except in cases of technical error or duplicate charges (as outlined in our Refund Policy)." />
          <ListItem text="Campaign-related receipts will be auto-generated and accessible via the platform dashboard." />
          <ListItem text="Societies may raise withdrawal requests; payouts will follow platform processing timelines." />
        </ul>

        <SectionTitle title="Account Suspension & Violations" />
        <p>
          ADZ10X reserves the right to suspend or terminate user accounts if:
        </p>
        <ul className="list-unstyled">
          <ListItem text="The account is found misusing the platform." />
          <ListItem text="Content violates campaign guidelines." />
          <ListItem text="Misrepresentation or fraudulent activity is detected." />
        </ul>

        <SectionTitle title="Intellectual Property" />
        <p>
          All content, code, designs, branding, and platform architecture are
          the exclusive property of ADZ10X. Unauthorized copying, resale, or
          reproduction is strictly prohibited.
        </p>

        <SectionTitle title="Platform Modifications & Updates" />
        <p>
          We reserve the right to modify or update these terms and the
          platform's features at any time. Continued use of the platform after
          changes implies acceptance of the revised terms.
        </p>

        <SectionTitle title="Data Usage & Privacy" />
        <p>
          User data is handled in accordance with our Privacy Policy. We do not
          sell, share, or misuse data of societies, companies, or their members.
        </p>

        <SectionTitle title="Jurisdiction" />
        <p>
          These terms are governed by the laws of India, and any disputes shall
          be subject to the jurisdiction of courts located in Pune.
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

export default Terms_conditions;
