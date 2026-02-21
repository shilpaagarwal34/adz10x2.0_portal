# Society Portal Use Cases

This matrix is the master list of Society portal use cases.  
Status key:

- `Automated` -> covered in current Playwright suite
- `Planned` -> should be automated next
- `Manual` -> best validated manually (complex integrations/files/maps/payments)

## 1) Authentication and Session

- `AUTH-001` Login with valid Society credentials -> `Automated`
- `AUTH-002` Login with invalid password -> `Planned`
- `AUTH-003` Login with invalid email format -> `Planned`
- `AUTH-004` Forgot password flow -> `Planned`
- `AUTH-005` Logout clears session and redirects to login -> `Planned`
- `AUTH-006` Direct URL access to `/society/profile/edit` without token -> `Automated`
- `AUTH-007` Session persistence on refresh -> `Planned`
- `AUTH-008` Session expiry / token invalidation handling -> `Planned`

## 2) Dashboard

- `DASH-001` Dashboard loads for authenticated Society user -> `Automated`
- `DASH-002` Dashboard skeleton to data transition -> `Planned`
- `DASH-003` Relationship manager card visibility by KYC status -> `Planned`
- `DASH-004` Campaign lists render for live/pending/upcoming -> `Planned`

## 3) Profile View (Society)

- `PROF-V-001` Profile page loads in authenticated mode -> `Automated`
- `PROF-V-002` Draft mode renders when unauthenticated -> `Automated`
- `PROF-V-003` Society Information section visible -> `Automated`
- `PROF-V-004` Contact Information section visible -> `Automated`
- `PROF-V-005` Billing Details starts collapsed -> `Automated`
- `PROF-V-006` Billing Details expands/collapses correctly -> `Automated`
- `PROF-V-007` QR code link opens sample modal when QR exists -> `Planned`
- `PROF-V-008` WhatsApp fields not shown in profile view -> `Planned`

## 4) Profile Edit

- `PROF-E-001` Profile edit page loads for authenticated user -> `Automated`
- `PROF-E-002` Billing section is collapsible -> `Automated`
- `PROF-E-003` Society Photos section is collapsible -> `Automated`
- `PROF-E-004` Society Documents section is collapsible -> `Automated`
- `PROF-E-005` Billing QR code field visible in billing section -> `Automated`
- `PROF-E-006` Required field validation for core profile fields -> `Planned`
- `PROF-E-007` Successful profile update with mandatory-only data -> `Planned`
- `PROF-E-008` Profile reaches 100% without billing/docs/photos -> `Planned`
- `PROF-E-009` Upload profile image -> `Planned`
- `PROF-E-010` Upload/delete society photos -> `Manual`
- `PROF-E-011` Upload PAN/document files -> `Manual`
- `PROF-E-012` Location selection and map coordinates persist -> `Manual`

## 5) Media Management

- `MEDIA-001` Media management page loads -> `Automated`
- `MEDIA-002` Save as Draft button visible -> `Automated`
- `MEDIA-003` Submit Rates button visible -> `Automated`
- `MEDIA-004` Save draft succeeds for valid offered slot data -> `Planned`
- `MEDIA-005` Submit blocked when profile completion < 100 -> `Planned`
- `MEDIA-006` Submit incomplete profile popup -> Edit profile redirect -> `Planned`
- `MEDIA-007` Submit validates rate > 0 for offered slots -> `Planned`
- `MEDIA-008` WhatsApp media slot requires complete WhatsApp details at submit -> `Planned`
- `MEDIA-009` Society terms selection persists -> `Planned`
- `MEDIA-010` Rate calculations (society/platform/company) are correct -> `Planned`

## 6) Payments

- `PAY-001` Payments page loads in draft mode for unauthenticated -> `Automated`
- `PAY-002` Withdraw button visible -> `Automated`
- `PAY-003` Withdraw disabled when wallet amount <= 0 -> `Automated`
- `PAY-004` Withdraw guard popup when amount > 0 but billing/docs incomplete -> `Planned`
- `PAY-005` Withdraw guard "Yes" redirects to `/society/profile/edit` -> `Planned`
- `PAY-006` Withdraw modal opens when guard conditions are satisfied -> `Planned`
- `PAY-007` Pending/Paid tab switch works -> `Planned`
- `PAY-008` Search and pagination work in payments table -> `Planned`

## 7) Users

- `USER-001` Users page loads -> `Automated`
- `USER-002` Add User disabled for unauthenticated user -> `Automated`
- `USER-003` Add User blocked when profile completion < 100 -> `Automated`
- `USER-004` Incomplete profile modal "Yes" redirects to profile edit -> `Planned`
- `USER-005` Add User modal opens when profile completion is 100 -> `Automated`
- `USER-006` Add user validation (name/email/mobile/role/password) -> `Planned`
- `USER-007` Edit existing user flow -> `Planned`
- `USER-008` Users table search and pagination -> `Planned`

## 8) Notifications / Reports / Misc

- `MISC-001` Notifications page opens and list renders -> `Planned`
- `MISC-002` Clear all notifications -> `Planned`
- `MISC-003` Report pages render by type route -> `Planned`
- `MISC-004` Not found route handling -> `Planned`

## 9) Security / Access Control

- `SEC-001` Protected action route blocks non-authenticated profile edit -> `Automated`
- `SEC-002` Role-based route/menu restrictions for Society_User privileges -> `Planned`
- `SEC-003` Unauthorized API response handling (401/403) -> `Planned`
- `SEC-004` Cross-role navigation attempts (society user to company/admin routes) -> `Planned`

## 10) Compatibility / Stability

- `STAB-001` Smoke suite runs in Chromium CI headless -> `Automated`
- `STAB-002` Retry and trace capture on failure -> `Automated`
- `STAB-003` Video generated for every test run -> `Automated`
- `STAB-004` Date-wise test artifact archival -> `Automated`

---

## Current automated spec coverage

- `tests/e2e/society/public-access.spec.js`
- `tests/e2e/society/authenticated-flows.spec.js`
- `tests/e2e/utils/temporarySocietySession.js` (test-only temporary auth + API mocks)

Use this file as the backlog for growing automated coverage from smoke to full regression.
