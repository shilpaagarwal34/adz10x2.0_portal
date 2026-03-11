import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfileData } from "../../store/Actions/Society/Profile/ProfileActions.js";
import PermissionRoute from "../../utils/PermissionRoute.jsx";
import "../Styles/RulesAndRegulations.css";

const T_C_SECTIONS = [
  {
    title: "Society Rules for All Media Activities",
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
    title: "Adz10x Platform Rules for Societies",
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
];

function TermsAndConditions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <PermissionRoute permission="profile">
      <div className="rules-page">
        <header className="rules-header">
          <div className="rules-header-icon" aria-hidden="true">
            ✓
          </div>
          <h1>Generic Rules for Society Media (Adz10x Platform)</h1>
          <p>The following rules and regulations are for reference. No acceptance is required.</p>
        </header>

        <div className="rules-sections-grid">
        {T_C_SECTIONS.map((section, sIdx) => (
          <section key={sIdx} className="rules-section-card">
            <div className="rules-section-header">
              <span className="rules-section-number">{sIdx + 1}</span>
              <div className="rules-section-title-wrap">
                <h2>{section.title}</h2>
                <p className="rules-section-intro">{section.intro}</p>
              </div>
            </div>
            <div className="rules-section-body">
              <ul className="rules-list">
                {section.points.map((point, pIdx) => (
                  <li key={pIdx}>
                    <span className="rules-list-icon" aria-hidden="true">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
        </div>
      </div>
    </PermissionRoute>
  );
}

export default TermsAndConditions;
