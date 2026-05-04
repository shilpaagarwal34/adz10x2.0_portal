import React from "react";
import PermissionRoute from "../../utils/PermissionRoute.jsx";

const RulesAndRegulations = () => {
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
            Guidelines & Standards
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
            Rules and Regulations
          </h1>
          <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>
            ADZ10X — A Brand of Ananta Consultancy &nbsp;·&nbsp; www.adz10x.com
          </p>
        </div>

        {/* Main Title */}
        <div style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <div style={{ padding: "20px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700, color: "#0f172a", textAlign: "center" }}>
              Generic Rules for Society Media (Adz10x Platform)
            </h2>
          </div>
        </div>

        {/* Section 1 */}
        <div style={{
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
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
              1. Society Rules for All Media Activities
            </h2>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 14, color: "#334155", lineHeight: 1.7 }}>
              These rules apply to all promotional activities conducted within the society premises.
            </p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#334155", lineHeight: 1.7 }}>
              <li style={{ marginBottom: 8 }}>All promotional activities must be carried out only in the area allocated by the society.</li>
              <li style={{ marginBottom: 8 }}>Door-to-door promotion is strictly prohibited unless specifically approved by the society committee.</li>
              <li style={{ marginBottom: 8 }}>The society does not guarantee any sales, leads, or conversions from the campaign.</li>
              <li style={{ marginBottom: 8 }}>Campaign execution must strictly follow the approved timing and duration.</li>
              <li style={{ marginBottom: 8 }}>Promotional staff must maintain polite and respectful behaviour with society residents and staff.</li>
              <li style={{ marginBottom: 8 }}>Residents' privacy must always be respected during any activity.</li>
              <li style={{ marginBottom: 8 }}>Loud music, disruptive behaviour, or nuisance to residents is not permitted.</li>
              <li style={{ marginBottom: 8 }}>Any damage to society property during the activity will be the responsibility of the company.</li>
              <li style={{ marginBottom: 8 }}>The activity area must be cleaned and restored to its original condition after completion.</li>
              <li style={{ marginBottom: 8 }}>All waste materials must be disposed of in designated dustbins.</li>
              <li style={{ marginBottom: 8 }}>Hazardous materials, inflammables, gas cylinders, or unsafe equipment are not allowed without prior approval.</li>
              <li>Society reserves the right to terminate the campaign immediately if rules are violated.</li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div style={{
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
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
              2. Adz10x Platform Rules for Societies
            </h2>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 14, color: "#334155", lineHeight: 1.7 }}>
              These rules ensure smooth campaign execution between societies and companies.
            </p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#334155", lineHeight: 1.7 }}>
              <li style={{ marginBottom: 8 }}>The society must approve or reject campaign requests within the specified time.</li>
              <li style={{ marginBottom: 8 }}>No additional or unofficial charges should be requested from the company beyond the agreed listing price.</li>
              <li style={{ marginBottom: 8 }}>The society must inform gate security and relevant staff in advance about the campaign for smooth entry of vendors.</li>
              <li style={{ marginBottom: 8 }}>The society should ensure the allocated media location has adequate visibility or resident footfall.</li>
              <li style={{ marginBottom: 8 }}>If promotional activities are scheduled, the society should inform residents through internal communication channels (like WhatsApp group).</li>
              <li style={{ marginBottom: 8 }}>Payments to societies will be processed only through the Adz10x platform, and societies must not request payments directly from brands.</li>
              <li style={{ marginBottom: 8 }}>If a campaign is terminated by the society without valid rule violation, the payment may not be processed.</li>
              <li style={{ marginBottom: 8 }}>The society should provide required support for installation, execution, and removal of media assets.</li>
              <li>Vendor vehicles must be allowed access for loading and unloading campaign materials.</li>
            </ul>
          </div>
        </div>

        {/* Agreement Link */}
        <div style={{
          background: "#f1f5f9",
          borderRadius: 10,
          padding: "16px 20px",
          marginTop: 28,
          fontSize: 14,
          color: "#475569",
          textAlign: "center",
        }}>
          <p style={{ margin: "0 0 8px", fontWeight: 600, color: "#0f172a" }}>Platform Agreement</p>
          <p style={{ margin: 0 }}>
            <a 
              href="/society/terms-and-conditions" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#0f4c75", textDecoration: "none", fontWeight: 600 }}
            >
              View Full Platform Agreement →
            </a>
          </p>
        </div>

      </div>
    </PermissionRoute>
  );
};

export default RulesAndRegulations;
