import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { fetchProfileData } from "../../store/Actions/Society/Profile/ProfileActions.js";
import PermissionRoute from "../../utils/PermissionRoute.jsx";

const T_C_SECTIONS = [
  {
    title: "1. Society Rules for All Media Activities",
    intro: "These rules apply to all promotional activities conducted within the society premises.",
    points: [
      "All promotional activities must be carried out only in the area allocated by the society.",
      "Door-to-door promotion is strictly prohibited unless specifically approved by the society committee.",
      "The society does not guarantee any sales, leads, or conversions from the campaign.",
      "Campaign execution must strictly follow the approved timing and duration.",
      "Promotional staff must maintain polite and respectful behaviour with society residents and staff.",
      "Residents' privacy must always be respected during any activity.",
      "Loud music, disruptive behaviour, or nuisance to residents is not permitted.",
      "Any damage to society property during the activity will be the responsibility of the company.",
      "The activity area must be cleaned and restored to its original condition after completion.",
      "All waste materials must be disposed of in designated dustbins.",
      "Hazardous materials, inflammables, gas cylinders, or unsafe equipment are not allowed without prior approval.",
      "Society reserves the right to terminate the campaign immediately if rules are violated.",
    ],
  },
  {
    title: "2. Adz10x Platform Rules for Societies",
    intro: "These rules ensure smooth campaign execution between societies and companies.",
    points: [
      "The society must approve or reject campaign requests within the specified time.",
      "No additional or unofficial charges should be requested from the company beyond the agreed listing price.",
      "The society must inform gate security and relevant staff in advance about the campaign for smooth entry of vendors.",
      "The society should ensure the allocated media location has adequate visibility or resident footfall.",
      "If promotional activities are scheduled, the society should inform residents through internal communication channels (e.g. WhatsApp group).",
      "Payments to societies will be processed only through the Adz10x platform, and societies must not request payments directly from brands.",
      "If a campaign is terminated by the society without valid rule violation, the payment may not be processed.",
      "The society should provide required support for installation, execution, and removal of media assets.",
      "Vendor vehicles must be allowed access for loading and unloading campaign materials.",
    ],
  },
  {
    title: "3. Adz10x Platform Rules for Companies / Advertisers",
    intro: "These rules apply to all companies using the Adz10x platform.",
    points: [
      "Companies must follow all society rules and guidelines during campaign execution.",
      "Promotional staff must behave professionally and respectfully with residents and society staff.",
      "Door-to-door marketing or entry into residential buildings is not permitted without explicit approval.",
      "Companies must not force or pressure residents to purchase any product or service.",
      "All campaign payments must be completed through the Adz10x platform before execution.",
      "Any damage caused during the activity must be compensated by the company.",
      "Adz10x does not guarantee sales or business outcomes from campaigns.",
      "If the campaign cannot be executed due to company-side delays, no additional time or refund may be granted.",
      "Violation of society rules may lead to immediate termination of the campaign without refund.",
    ],
  },
  {
    title: "4. Standard Deliverables for Campaign Execution",
    intro: "For every booked media activity, the following deliverables will be provided:",
    points: [
      "Official permission confirmation through Adz10x platform",
      "Payment receipt issued by Adz10x",
      "Proof of campaign execution (photos/videos) if execution partner is Adz10x Team",
    ],
  },
];

function TermsAndConditions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <PermissionRoute permission="profile">
      <div
        className="p-3 p-sm-4 bg-white rounded shadow-sm d-flex flex-column"
        style={{
          maxWidth: 720,
          margin: "0 auto",
          minHeight: "calc(100vh - 140px)",
          boxSizing: "border-box",
        }}
      >
        <h4 className="fw-bold mb-2">Generic Rules for Society Media (Adz10x Platform)</h4>
        <p className="text-secondary small mb-3">
          The following rules and regulations are for reference. No acceptance is required.
        </p>
        <div
          className="overflow-auto mb-3"
          style={{ flex: "1 1 0", minHeight: 0 }}
        >
          {T_C_SECTIONS.map((section, sIdx) => (
            <div key={sIdx} className="mb-4">
              <h6 className="fw-bold text-dark mb-2">{section.title}</h6>
              <p className="small text-secondary mb-2">{section.intro}</p>
              <ul className="list-unstyled mb-0">
                {section.points.map((point, pIdx) => (
                  <li key={pIdx} className="d-flex align-items-start gap-2 mb-2">
                    <span className="text-primary" style={{ minWidth: "0.4rem" }}>•</span>
                    <span className="small text-body">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="d-flex gap-2 flex-wrap flex-shrink-0">
          <Button
            variant="outlined"
            onClick={() => navigate("/society/profile")}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Back to Profile
          </Button>
        </div>
      </div>
    </PermissionRoute>
  );
}

export default TermsAndConditions;
