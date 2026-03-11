import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
];

function TermsAndConditions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <PermissionRoute permission="profile">
      <div className="p-2 p-sm-3 pt-2 pb-5">
        <h4 className="fw-bold mb-2">Generic Rules for Society Media (Adz10x Platform)</h4>
        <p className="text-secondary small mb-4">
          The following rules and regulations are for reference. No acceptance is required.
        </p>
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
    </PermissionRoute>
  );
}

export default TermsAndConditions;
