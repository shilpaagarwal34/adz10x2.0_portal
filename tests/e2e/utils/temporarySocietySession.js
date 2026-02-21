const TEMP_SOCIETY_CREDENTIALS = {
  email: "society.e2e.temp@adz10x.local",
  password: "Temp@123456",
};

function json(route, body, status = 200) {
  return route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

export async function seedTemporarySocietySession(
  page,
  { profileCompletion = 80, balanceAmount = 250 } = {}
) {
  const user = {
    id: 99991,
    name: "E2E Society Admin",
    email: TEMP_SOCIETY_CREDENTIALS.email,
    user_type: "Society_Admin",
    kyc_status: "approved",
    menu: {
      dashboard: true,
      profile: true,
      advertisement: true,
      wallet: true,
      payments: true,
      users: true,
      settings: true,
      report: true,
    },
    privileges: [
      "dashboard",
      "profile",
      "campaign",
      "wallet",
      "payments",
      "users",
      "settings",
      "report",
    ],
  };

  const token = "temp-e2e-auth-token";

  await page.addInitScript(
    ({ seededUser, seededToken }) => {
      localStorage.setItem("auth_token", seededToken);
      localStorage.setItem("user_data", JSON.stringify(seededUser));
      localStorage.setItem("user_type", seededUser.user_type);
    },
    { seededUser: user, seededToken: token }
  );

  await page.route("**/*", async (route) => {
    const requestUrl = new URL(route.request().url());
    const isApiHost =
      requestUrl.origin === "http://localhost:3000" ||
      requestUrl.origin === "http://127.0.0.1:3000";

    if (!isApiHost || !requestUrl.pathname.startsWith("/api")) {
      return route.continue();
    }

    const { pathname } = requestUrl;
    const method = route.request().method();

    if (pathname === "/api/login-users" && method === "POST") {
      return json(route, { status: 200, data: user });
    }

    if (pathname === "/api/visual-settings" && method === "GET") {
      return json(route, { status: 200, data: {} });
    }

    if (pathname === "/api/admin/general-settings" && method === "GET") {
      return json(route, { status: 200, data: { mobile_no: "9999999999" } });
    }

    if (pathname === "/api/all-cities" && method === "GET") {
      return json(route, {
        status: 200,
        data: [{ id: 1, city_name: "Mumbai" }],
      });
    }

    if (pathname === "/api/areas/1" && method === "GET") {
      return json(route, {
        status: 200,
        data: [{ id: 11, city_id: 1, area_name: "Andheri East" }],
      });
    }

    if (pathname === "/api/society-profile" && method === "POST") {
      return json(route, {
        status: 200,
        data: {
          profile_completion: profileCompletion,
          society_registration: {
            id: 101,
            society_name: "E2E Green Residency",
            society_profile_img_name: "",
            society_profile_img_path: "",
            address: "Andheri East, Mumbai",
            latitude: "19.1136",
            longitude: "72.8697",
            city_id: 1,
            area_id: 11,
            pincode: "400069",
            name: "Society Manager",
            mobile_number: "9999999999",
            email: TEMP_SOCIETY_CREDENTIALS.email,
            edit_permission: true,
            society_profile: {
              id: 501,
              number_of_flat: 250,
              society_email: "society.e2e@adz10x.local",
              address_line_1: "Wing A, Main Street",
              address_line_2: "",
              google_page_url: "https://maps.google.com",
              account_holder_name: "",
              account_no: "",
              bank_name: "",
              branch_name: "",
              bank_ifsc_code: "",
              billing_address_line_1: "",
              billing_address_line_2: "",
              billing_qr_code_path: "",
              pan_card_path: "",
              gst_certificate_path: "",
              other_document_path: "",
              society_profile_img_1_path: "",
              society_profile_img_2_path: "",
              society_profile_img_3_path: "",
              society_profile_img_4_path: "",
              society_profile_img_5_path: "",
            },
          },
        },
      });
    }

    if (pathname === "/api/society-dashboard" && method === "GET") {
      return json(route, {
        status: 200,
        data: {
          live_campaigns: [],
          pending_campaigns: [],
          upcoming_campaigns: [],
          counter: {},
          relationship_manager: {},
        },
      });
    }

    if (pathname === "/api/society-wallet-amount" && method === "GET") {
      return json(route, { status: 200, society_wallet_amount: balanceAmount });
    }

    if (pathname === "/api/society/withdrawal-payments-table" && method === "GET") {
      return json(route, {
        status: 200,
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        table_name: "withdrawal_payments",
        approvedCount: 0,
        pendingCount: 0,
      });
    }

    if (pathname === "/api/society/system-table" && method === "GET") {
      return json(route, {
        status: 200,
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        table_name: "society_users",
      });
    }

    if (pathname === "/api/admin-campaign-days" && method === "GET") {
      return json(route, {
        status: 200,
        data: [
          { day: "Monday", from_time: "09:00", to_time: "18:00", is_checked: true },
          { day: "Tuesday", from_time: "09:00", to_time: "18:00", is_checked: true },
        ],
      });
    }

    if (pathname === "/api/society-profile-ads" && method === "GET") {
      return json(route, { status: 200, data: [] });
    }

    if (pathname === "/api/society/media-rate-cards" && method === "GET") {
      return json(route, {
        status: 200,
        data: [],
        platforms: [],
        society_terms_options: [],
      });
    }

    if (pathname === "/api/society/media-rate-cards" && method === "POST") {
      return json(route, { status: 200, message: "Saved" });
    }

    return json(route, { status: 200, data: {} });
  });
}

export { TEMP_SOCIETY_CREDENTIALS };
