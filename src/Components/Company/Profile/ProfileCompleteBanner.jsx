import React from "react";

export default function ProfileCompleteBanner({ percentage }) {
  if (percentage < 100) return null;

  return (
    <div className="card border-0 mt-4 rounded-4 overflow-hidden shadow-sm" style={{ backgroundColor: "#f8fdfa", border: '1px solid #e0ebd9' }}>
      <div className="d-flex flex-column flex-md-row">
        {/* Left Side Illustration */}
        <div className="d-none d-md-flex align-items-center justify-content-center p-3" style={{ width: "220px", flexShrink: 0 }}>
          <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="30" width="120" height="150" rx="8" fill="#D9F1DF"/>
            <path d="M70 20H130V40H70V20Z" fill="#8AC79B" rx="4"/>
            <rect x="60" y="60" width="80" height="8" rx="4" fill="#A8DAB7"/>
            <rect x="60" y="80" width="60" height="8" rx="4" fill="#A8DAB7"/>
            <rect x="60" y="100" width="70" height="8" rx="4" fill="#A8DAB7"/>
            <rect x="60" y="120" width="40" height="8" rx="4" fill="#A8DAB7"/>
            
            <circle cx="160" cy="140" r="30" fill="#1BAE5C"/>
            <path d="M148 140L156 148L172 132" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            
            <rect x="20" y="140" width="40" height="40" rx="4" fill="#4B8C65" transform="rotate(-15 20 140)"/>
            <rect x="10" y="160" width="30" height="30" rx="4" fill="#A8DAB7" transform="rotate(-5 10 160)"/>
          </svg>
        </div>

        {/* Right Side Content */}
        <div className="p-4 flex-grow-1">
          <h5 className="fw-bold mb-1 text-dark" style={{fontSize: '18px'}}>Your Company Profile is Complete!</h5>
          <p className="text-muted mb-4" style={{fontSize: '13px'}}>Great job! All your information is verified and up to date.</p>

          <div className="d-flex flex-wrap gap-4 align-items-center">
            {/* Item 1 */}
            <div className="d-flex align-items-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "32px", height: "32px", backgroundColor: "#eaf6ed" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-success" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.86" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="fw-bold mb-0 text-success" style={{fontSize: '13px'}}>Verified Business</p>
                <p className="text-muted mb-0" style={{fontSize: '11px'}}>All documents verified</p>
              </div>
            </div>

            {/* Divider */}
            <div className="d-none d-lg-block" style={{ width: '1px', height: '40px', backgroundColor: '#d0d0d0' }}></div>

            {/* Item 2 */}
            <div className="d-flex align-items-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "32px", height: "32px", backgroundColor: "#eaf6ed" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-success" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="fw-bold mb-0 text-success" style={{fontSize: '13px'}}>Active Account</p>
                <p className="text-muted mb-0" style={{fontSize: '11px'}}>Account is active</p>
              </div>
            </div>

            {/* Divider */}
            <div className="d-none d-lg-block" style={{ width: '1px', height: '40px', backgroundColor: '#d0d0d0' }}></div>

            {/* Item 3 */}
            <div className="d-flex align-items-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "32px", height: "32px", backgroundColor: "#eaf6ed" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-success" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11L12 14L22 4" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V12" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="fw-bold mb-0 text-success" style={{fontSize: '13px'}}>Complete Profile</p>
                <p className="text-muted mb-0" style={{fontSize: '11px'}}>100% information provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
