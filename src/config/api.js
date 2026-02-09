// const api_url = "http://192.168.0.217:2000/api";
// const base_url = "http://192.168.0.217:2000";

// const api_url = "http://157.119.40.164:3000/api"; //stagging server url
// const base_url = "http://157.119.40.164:3000";

// const api_url = "https://test-api.m-staging.in/api";
// const base_url = "https://test-api.m-staging.in";

const api_url = "https://api.adz10x.com/api";
const base_url = "https://api.adz10x.com"

const api_routes = {
  society: {
    fetch_society_list: `/all-society`,   

    email_exist: `${api_url}/check-email-exist`, // Using template literal to concatenate
    mobile_exist: `${api_url}/check-mobile-exist`,
    post_register: `${api_url}/society-register`,
    get_dashboard_data: `${api_url}/society-dashboard`,
    post_profile_data: `/society-profile`,
    put_profile_data: `${api_url}/society-profile-update`,
    delete_society_image: `${api_url}/delete-society-profile-image`,
    resend_otp: `${api_url}/resend-otp`,

    // Campaign
    get_campaign_days: `${api_url}/admin-campaign-days`,
    post_campaign_ads_setting: `/society-profile-update`,

    // user routes
    get_users: `${api_url}/society/system-table`,
    post_create_user: `${api_url}/society/system-users`,
    post_logout_user: `/society/logout`,

    // society change password
    post_change_password: `/society/change-password`,
    post_delete_society_admin_account: `/society/delete-account `,

    // campaign
    fetch_campaign_datatable: `/society/advertisement-datatable`,
    fetch_ad_by_id: `/society/advertisement-view`,
    fetch_time_slots: `/society/advertisement-profile-ads`,
    post_pending_ad_status: `/society/advertisement-approved-status`,
    post_live_campaign_data: `/society/advertisement-ads`,

    // payments
    fetch_society_payments_balance: `/society-wallet-amount`,
    fetch_society_payment_datatable: `/society/withdrawal-payments-table`,
    post_withdrawl_request: `/society-add-withdrawal`,
    view_payment_detail: `/society/withdrawa-view`,

    // wallet
    fetch_society_wallet_datatable: `/society/wallet-payments-table`,

    // notfication
    fetch_notification: `/society/notification`,
    clear_notification: `/society/notification-clear-all`,

    //reports
    get_ad_performance_report: `/society/report-ads-performance-table`,
    get_payout_report: `/society/report-payout-summary-table`,
    get_ads_approval_log_report: `/society/report-approval-table`,
    get_ads_payment_report: `/society/report-ads-payments-table`,
  },
  common: {
    otp_verify: `${api_url}/verify-otp`,
    post_login: `${api_url}/login`,
    post_forget_password: `${api_url}/forgot-password`,
    post_change_password: `${api_url}/change-password`,
    get_cities: `${api_url}/all-cities`,
    get_areas: `${api_url}/areas`,
    get_company_list: `/all-company`,
  },
  company: {
    check_mobile_exisit: `${api_url}/check-mobile-exist`,
    check_email_exists: `${api_url}/check-email-exist`,
    post_company_register: `${api_url}/company-register`,
    verify_otp: `${api_url}/verify-otp`,
    get_profile_data: `${api_url}/comapny-profile`,
    post_profile_data: `${api_url}/company-profile-update`,
    get_sectors: `${api_url}/sectors`,
    get_dashboard_data: `${api_url}/comapny-dashboard`,

    // system users
    get_system_users: `/company/system-table`,
    post_system_users: `/company/system-users`,

    // general setting
    post_change_password: `/company/change-password `,
    post_delete_account: `company/delete-account`,

    // wallet
    get_company_wallet: `/wallet-datatable`,
    post_add_wallet_fund: `/wallet`,
    get_wallet_amount: `/wallet-amount`,

    // payments
    get_payments: `/payments-datatable`,

    // campaigns
    get_campaign_type: `/get-campaign-type`,
    get_campaign: `/company/campaign/view`,
    post_create_campaign: `/create-company-campaign`,
    // post_create_campaign: `/create-company-campaign-text`,

    get_campagin_list: `/company/campaign-datatable`,
    get_campaign_days_for_calendar: `/admin-all-campaign-days`,
    get_ad_by_id: `/company/ads-view`,

    fetch_notification: `/company/notification`,
    clear_notification: `/company/notification-clear-all`,

    // reports
    get_spend_report: `/company/report-spend-table`,
    get_campaign_status_report: `/company/report-campaign-reach-table`,
    get_wallet_history_report: `/company/report-wallet-history-table`,
    get_campaign_society_list_report: `/company/report-society-list-table`,
    get_user_access_report: `/company/report-user-table`,
  },
  admin: {
    post_login: `/admin-login`,

    //dashboard
    get_dashboard_data: `/admin/dashboard`,
    get_live_campaign_datatable: `/admin/live-datatable`,

    // master
    get_city: `/admin/citys-table`,
    post_city: `/admin/city`,
    post_common_delete: `/common-delete`,
    post_common_status_change: `/change-status`,
    get_area: `/admin/areas-table`,
    post_area_create: `/admin/area`,
    get_sector_data: `/admin/sectors-table`,
    post_sector_data: `/admin/sectors`,
    get_campaign_configuration: `/admin/campaign-configuration`,
    post_campaign_configuration: `/admin/campaign-configuration`,

    // Master dropdown API
    get_all_cities: `/admin/city`,
    get_all_areas: `/admin/areas`,

    // Society
    get_societies: `/admin/societies-table`,
    get_society_by_id: `/admin/societie`,

    // Company
    get_companies: `/admin/companys-table`,
    get_company_by_id: `/admin/company`,

    // System User
    get_system_users: `/admin/system-table`,
    post_system_user: `/admin/system-user`,
    get_user_by_id: `/admin/system-user`,

    get_relationship_manager: `/admin/rel-manager`,

    // Society KYC Status
    get_society_comission: `/admin/society-commission`,
    post_update_kyc_status: `/admin/assign-manager-society`,

    // Company KYC STATUS
    get_company_comission: `/admin/company-commission`,
    post_update_company_kyc_status: `/admin/assign-manager-company`,

    // Campaign
    get_campaign_data_table: `/admin/campaign-datatable`,
    get_campaign_details: `/admin/campaign/view`,
    get_time_slot: `/admin/society-profile-ads`,
    get_ad_by_id: `/admin/ads-society/view`,

    post_change_society_campaign_status: `/admin/ads-society-approved`,
    post_change_status_for_campaign: `/admin/campaign/all-advertisement-approved-status`,
    post_live_campaign: `/admin/society/advertisement-ads`,

    // Payments
    fetch_company_payment_datatable: `/admin/company-payments-table`,
    fetch_company_table_wallet_amount: `/admin/company-all-wallet-amount`,
    fetch_wallet_datatable: `/admin/company-wallets-table`,
    fetch_society_datatable: `/admin/society/withdrawal-payments-table`,
    view_society_payment: `/admin/withdrawa-view`,
    update_transaction_details: `/admin/society-add-withdrawal-update`,

    // Settings
    change_admin_password: `/admin/change-password`,
    get_post_general_settings: `/admin/general-settings`,
    // post_general_setting: `/admin/general-settings`,

    get_post_visual_settings: `/visual-settings`,
    // post_visual_settings: `/admin/visual-settings`,

    post_change_society_status_to_pending: `/admin/society-move-pending`,
    post_change_company_status_to_pending: `/admin/comapny-move-pending`,

    post_society_edit_profile: `/admin/society-all-edit`,
    post_company_edit_profile: `/admin/comapny-all-edit`,

    fetch_notification: `/admin/notification`,
    clear_notification: `/admin/notification-clear-all`,

    // reports
    get_total_societies_report: `/admin/society/total-report-table`,
    get_total_companies_report: `/admin/company-total-report-table`,
    get_total_ads_report: `/admin/total-ads-report-table`,
    get_society_payments_report: `/admin/total-society-payments-table`,
    get_company_payments_report: `/admin/total-company-payments-table`,
    get_system_user_logs: `/admin/total-user-report-table`,
    export_city_names: `admin-city/export`,
    export_area_names: `admin-area/export`,
    get_platform_earning_report: `/admin/total-platform-earning-report-table`,

    //forget-password
    post_forget_password: `/admin-forgot-password`,
    post_change_password: `/admin-changes-password`
  },
};

export { base_url };

export default api_routes; // Use default export
