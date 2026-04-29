import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData } from "../../store/Actions/Society/Profile/ProfileActions.js";
import axiosInstance from "../../utils/axiosInstance.js";
import api_routes from "../../config/api.js";
import PermissionRoute from "../../utils/PermissionRoute.jsx";
import { toast } from "react-toastify";

const AGREEMENT_SECTIONS = [
  {
    title: "PREAMBLE",
    content: `This Agreement is entered into electronically through the ADZ10X Platform (www.adz10x.com), by and between:

PARTY A: ADZ10X, a brand of Ananta Consultancy, registered at 305, Nyati Enthral, Kharadi Bypass Road, Pune, Maharashtra, India (the "Platform", including its successors, assigns, and affiliates);

AND

PARTY B: The Co-operative Housing Society / RWA (the "Society", including its office bearers, managing committee, authorized signatories, and successors), being the entity that registers on the Platform and consents to this Agreement.

The Platform operates a community advertising marketplace connecting brand partners with residential societies for campaign deployment across multiple media assets. The Society desires to monetize its community media assets under the terms herein.`,
  },
  {
    title: "1. ELECTRONIC CONSENT AND LEGAL VALIDITY",
    points: [
      "1.1 Execution: This Agreement is executed electronically during registration. Acceptance is signified by: (a) completing the registration form; (b) reviewing this Agreement; (c) checking the mandatory consent checkbox; and (d) clicking 'I Agree & Register.'",
      "1.2 Legal Validity: This Agreement constitutes a valid, binding, and enforceable contract under the Information Technology Act, 2000, the Indian Contract Act, 1872, and the Indian Evidence Act, 1872 (Section 65B), with the same legal effect as a handwritten signature.",
      "1.3 Record Retention: The Platform shall maintain a tamper-proof record of consent (timestamp in IST, IP address, representative identity) retained for eight (8) years from termination and admissible as evidence.",
      "1.4 Authority: The consenting individual warrants: (a) duly authorized by the Society's Managing Committee or General Body; (b) authorization in force; (c) no conflict with bye-laws or law; and (d) all necessary approvals obtained under the Maharashtra Co-operative Societies Act, 1960 (or equivalent) for monetizing community assets.",
    ],
  },
  {
    title: "2. DEFINITIONS",
    content: `"Media Assets" means advertising-eligible touchpoints within the Society's premises and communication channels, including but not limited to:`,
    points: [
      "WhatsApp Group Promotion – brand campaigns shared through the Society's official WhatsApp community group(s)",
      "Lift Branding Panels – physical branding panels, posters, or wraps installed inside or outside lifts within Society premises",
      "Notice Board Advertising – print or poster placements on physical notice boards in common areas, lobbies, clubhouses, and parking zones",
      "Main Gate Branding – branding at the Society's entry/exit gates, including gate panels, boom barrier wraps, and security cabin displays",
      "Society Kiosk Activities – on-ground promotional stalls, kiosks, product sampling counters, or interactive brand booths in common areas",
      "Society Event Sponsorship – brand sponsorship of Society-organized events including banner placements, stage branding, and collateral distribution",
      `"Campaign" means a specific advertising initiative proposed by a brand partner through the Platform`,
      `"Platform Dashboard" means the web/mobile interface through which Societies manage accounts, review Campaigns, request payments, and access reports`,
      `"Authorized Representative" means the individual(s) designated by the Society's Managing Committee to manage the Society's account on the Platform`,
    ],
  },
  {
    title: "3. SCOPE OF COLLABORATION",
    points: [
      "3.1 Media Partnership: The Society agrees to partner with the Platform across its available Media Assets as onboarded through the Dashboard.",
      "3.2 Media Asset Registration: The Society shall declare available Media Assets during onboarding. The Platform shall verify and approve each category. New Media Assets may be added at any time.",
      "3.3 Campaign Facilitation: The Platform shall source, verify, and onboard brand partners; publish Campaign briefs; present Campaigns for Society approval; deliver creatives and instructions; and process payments upon completion and verification.",
      "3.4 Approval Rights: The Society retains the absolute right to approve or reject each Campaign without explanation. Once accepted, the Society is bound to execute per agreed specifications.",
      "3.5 No Exclusivity: Unless separately agreed in writing, this Agreement does not grant exclusive rights over the Society's Media Assets.",
      "3.6 No Guarantee of Campaigns or Revenue: The Platform does not guarantee any minimum number of Campaigns, revenue, or earnings to the Society. Campaign availability depends on brand partner demand and market conditions.",
    ],
  },
  {
    title: "4. REVENUE, PAYMENTS, AND TAXATION",
    points: [
      "4.1 Revenue and Pricing: The Society shall set its permission cost for each registered Media Asset via the Dashboard. The Platform shall add its service fee to determine the total Campaign price for brand partners.",
      "4.2 Revenue Calculation: Revenue shall be calculated on the basis of Campaigns approved by the Society and confirmed as executed by the brand partner.",
      "4.3 Execution Proof: For WhatsApp Group Promotion Campaigns, the Society shall submit Execution Proof (photographs, screenshots, time-stamped images) through the Dashboard within the stipulated timeline.",
      "4.4 Payment Processing: Payments shall be credited to the Society's registered bank account within seven (7) working days of successful completion and verification.",
      "4.5 Finality of Platform Decisions: The Platform's decision on Campaign verification, approval, and payout shall be final and binding.",
      "4.6 Taxation: Each party is responsible for its own applicable taxes (GST, income tax, and other levies). If TDS is required, the Platform shall deduct and issue a valid TDS certificate.",
      "4.7 Payment Disputes: Payout disputes must be raised through the Dashboard within fifteen (15) calendar days of receipt.",
    ],
  },
  {
    title: "5. PLATFORM RIGHTS AND RESPONSIBILITIES",
    points: [
      "5.1 The Platform may onboard, approve, modify, pause, or reject any Campaign or brand partner at its sole discretion.",
      "5.2 The Platform shall verify brand partners, maintain transparency in execution and payouts, and implement reasonable measures to protect Society data.",
      "5.3 The Platform may suspend or discontinue any Campaign or the Society's account in cases of non-compliance, misrepresentation, or violation of this Agreement.",
      "5.4 All intellectual property, technology, platform architecture, and branding related to ADZ10X remain the exclusive property of Ananta Consultancy.",
      "5.5 Intermediary Disclaimer: The Platform acts solely as an intermediary and shall not be responsible for the accuracy, legality, or quality of any Campaign content provided by brand partners.",
    ],
  },
  {
    title: "6. SOCIETY OBLIGATIONS",
    points: [
      "6.1 Accurate Information: The Society shall maintain accurate Onboarding Information on the Dashboard. Changes must be updated within seven (7) working days.",
      "6.2 Campaign Execution: Once a Campaign is accepted, the Society shall not alter, remove, or tamper with Campaign materials without prior Platform consent.",
      "6.3 Minimum Display Durations: WhatsApp messages shall remain posted for minimum twenty-four (24) hours; all physical placements shall remain for the full Campaign period.",
      "6.4 Internal Compliance: The Society shall obtain any required internal consent from members or General Body for monetization of community assets.",
      "6.5 Continuity: Changes in the Managing Committee shall not affect this Agreement. The incoming body shall honour these terms until validly terminated.",
      "6.6 Non-Circumvention: The Society shall not, during this Agreement or for twelve (12) months after termination, engage any brand partner introduced through the Platform for advertising services, bypassing the Platform.",
    ],
  },
  {
    title: "7. DATA PROTECTION AND CONFIDENTIALITY",
    points: [
      "7.1 Compliance: Both parties shall comply with applicable data protection laws, including the DPDP Act, 2023.",
      "7.2 Data Use: The Platform shall collect and process Society data solely for Campaign approvals, payment processing, and Platform operations.",
      "7.3 Non-Disclosure: Neither party shall share, sell, or disclose personal or proprietary information to third parties except with written consent, as required by law, or to authorized service providers.",
      "7.4 Data Breach: In the event of a data breach affecting Society data, the Platform shall notify the Society within seventy-two (72) hours.",
      "7.5 Survival: Obligations under this clause survive termination for three (3) years.",
    ],
  },
  {
    title: "8. TERMINATION",
    points: [
      "8.1 Termination for Convenience: Either party may terminate with fifteen (15) calendar days' written notice via the Dashboard or registered email.",
      "8.2 Termination for Cause: Immediate termination is permitted if the other party commits a material breach, violates applicable law, engages in fraud, becomes insolvent, or in the Society's case, loses cooperative registration.",
      "8.3 Effect: Upon termination: verified pending payments released within thirty (30) days; ongoing Campaigns completed unless mutually agreed otherwise; Society removes active materials within forty-eight (48) hours.",
    ],
  },
  {
    title: "9. INDEMNITY",
    points: [
      "9.1 Society Indemnity: The Society shall indemnify the Platform against all claims arising from breach of this Agreement, unauthorized modification of Campaign materials, inaccurate information, or violation of applicable laws.",
      "9.2 Platform Indemnity: The Platform shall indemnify the Society against claims arising from breach of data protection obligations or failure to fulfill its contractual obligations to brand partners affecting the Society.",
      "9.3 Brand Partner Content Liability: The Platform acts solely as an intermediary and shall not be responsible for the accuracy, legality, or claims made in any Campaign content provided by brand partners.",
    ],
  },
  {
    title: "10. LIMITATION OF LIABILITY",
    points: [
      "10.1 Neither party shall be liable for indirect, incidental, consequential, special, or punitive damages, including loss of profits, business, goodwill, or data.",
      "10.2 The Platform's aggregate liability shall not exceed the total amounts paid to the Society in the twelve (12) months preceding the event giving rise to the claim.",
    ],
  },
  {
    title: "11. DISPUTE RESOLUTION AND JURISDICTION",
    points: [
      "11.1 Disputes shall first be resolved amicably within thirty (30) days of notice.",
      "11.2 Unresolved disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, before a sole arbitrator mutually appointed. Seat and venue: Pune, Maharashtra.",
      "11.3 Either party may approach a competent court for interim relief pending arbitration.",
      "11.4 This Agreement is governed by the laws of India. Subject to this clause, courts at Pune, Maharashtra have exclusive jurisdiction.",
    ],
  },
  {
    title: "12. GENERAL PROVISIONS",
    points: [
      "12.1 Force Majeure: Neither party is liable for failure caused by circumstances beyond reasonable control (natural disasters, pandemics, government orders, war, internet outages). If the event continues for sixty (60) days, either party may terminate without liability.",
      "12.2 Amendments: The Platform may amend this Agreement with thirty (30) days' notice via Dashboard and/or email. Continued use constitutes acceptance.",
      "12.3 Entire Agreement: This Agreement with any schedules constitutes the entire agreement and supersedes all prior discussions.",
      "12.4 Severability: If any provision is held invalid, the remaining provisions continue in full force.",
      "12.5 Relationship: Nothing herein creates a partnership, joint venture, agency, or employment relationship. Each party is an independent contractor.",
    ],
  },
  {
    title: "13. ELECTRONIC ACCEPTANCE AND ACKNOWLEDGEMENT",
    content: "By accepting this Agreement, the Authorized Representative confirms:",
    points: [
      "They have read, understood, and agree to all terms of this Agreement",
      "They are duly authorized by the Society's Managing Committee or General Body",
      "This electronic acceptance is a valid and binding agreement under the IT Act, 2000 and all applicable laws",
      "They consent to the Platform maintaining a digital record (timestamp, IP address, device information) for legal and audit purposes",
      "This Agreement governs the partnership across all registered Media Assets",
      "The Platform does not guarantee any minimum Campaigns or revenue",
      "Breach of material terms may result in suspension, termination, or forfeiture of pending payouts",
    ],
  },
];

function TermsAndConditions() {
  const dispatch = useDispatch();
  const [accepting, setAccepting] = useState(false);
  const profileData = useSelector((state) => state.society?.profile?.profileData);
  const isAlreadyAccepted = profileData?.is_agree_terms_condition === true;

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  const handleAccept = async () => {
    setAccepting(true);
    try {
      await axiosInstance.post(api_routes.society.post_accept_agreement);
      toast.success("Agreement accepted! Your profile is now 100% complete.");
      dispatch(fetchProfileData());
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to accept agreement. Please try again.");
    } finally {
      setAccepting(false);
    }
  };

  return (
    <PermissionRoute permission="profile">
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px 60px" }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #0f4c75 0%, #1b6ca8 100%)",
          borderRadius: 12,
          padding: "28px 32px",
          marginBottom: 28,
          color: "#fff",
        }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", opacity: 0.8, margin: "0 0 6px" }}>
            Electronic Consent Agreement
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
            Terms of Service for Society Media Partnership
          </h1>
          <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>
            ADZ10X — A Brand of Ananta Consultancy &nbsp;·&nbsp; www.adz10x.com
          </p>
        </div>

        {/* Acceptance banner */}
        {isAlreadyAccepted ? (
          <div style={{
            background: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: 10,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: "#15803d", fontSize: 14 }}>
                Agreement Accepted
              </p>
              <p style={{ margin: 0, color: "#166534", fontSize: 13 }}>
                You have already accepted this agreement. Your profile is 100% complete.
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            background: "#fffbeb",
            border: "1px solid #fcd34d",
            borderRadius: 10,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: "#92400e", fontSize: 14 }}>
                Agreement Pending
              </p>
              <p style={{ margin: 0, color: "#78350f", fontSize: 13 }}>
                Please read and accept this agreement to complete your profile (last 5%).
              </p>
            </div>
          </div>
        )}

        {/* Agreement sections */}
        {AGREEMENT_SECTIONS.map((section, idx) => (
          <div key={idx} style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            marginBottom: 16,
            overflow: "hidden",
          }}>
            <div style={{
              background: "#f8fafc",
              padding: "12px 20px",
              borderBottom: "1px solid #e2e8f0",
            }}>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
                {section.title}
              </h2>
            </div>
            <div style={{ padding: "16px 20px" }}>
              {section.content && (
                <p style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7, margin: section.points ? "0 0 12px" : 0, whiteSpace: "pre-line" }}>
                  {section.content}
                </p>
              )}
              {section.points && (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {section.points.map((point, pIdx) => (
                    <li key={pIdx} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7, marginBottom: 6 }}>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        {/* Platform details */}
        <div style={{
          background: "#f1f5f9",
          borderRadius: 10,
          padding: "16px 20px",
          marginBottom: 28,
          fontSize: 13,
          color: "#475569",
        }}>
          <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#0f172a" }}>Electronic Consent Record</p>
          <p style={{ margin: "0 0 2px" }}><strong>Platform:</strong> ADZ10X, a brand of Ananta Consultancy</p>
          <p style={{ margin: "0 0 2px" }}><strong>Platform Address:</strong> 305, Nyati Enthral, Kharadi Bypass Road, Pune, Maharashtra, India</p>
          <p style={{ margin: "0 0 2px" }}><strong>Society Name:</strong> {profileData?.society_name || "[Auto-populated from registration]"}</p>
          <p style={{ margin: 0 }}><strong>Consent Timestamp:</strong> {isAlreadyAccepted ? "Already recorded" : "[Will be recorded upon acceptance]"}</p>
        </div>

        {/* Accept button */}
        {!isAlreadyAccepted && (
          <div style={{
            position: "sticky",
            bottom: 20,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
            gap: 16,
            flexWrap: "wrap",
          }}>
            <p style={{ margin: 0, fontSize: 13, color: "#475569", flex: 1 }}>
              By clicking <strong>"I Accept This Agreement"</strong>, you confirm you are duly authorized by your Society's Managing Committee and agree to all terms above.
            </p>
            <button
              onClick={handleAccept}
              disabled={accepting}
              style={{
                background: accepting ? "#94a3b8" : "#0f4c75",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 28px",
                fontSize: 14,
                fontWeight: 600,
                cursor: accepting ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {accepting ? "Accepting..." : "✓ I Accept This Agreement"}
            </button>
          </div>
        )}
      </div>
    </PermissionRoute>
  );
}

export default TermsAndConditions;
