import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import api_routes from "../../config/api";
import "./SupportChatbot.css";

const quickQuestions = [
  "How do I edit profile?",
  "I cannot find media management",
  "Where can I see reports?",
  "I have navigation issue",
];

const routeTitles = {
  "/society": "Society Dashboard",
  "/society/profile": "Society Profile",
  "/society/media-management": "Media Management",
  "/society/advertisement": "Society Advertisement",
  "/society/wallet": "Society Wallet",
  "/society/payment": "Society Payments",
  "/society/users": "Society Users",
  "/company": "Company Dashboard",
  "/company/profile": "Company Profile",
  "/company/campaign": "Company Campaigns",
  "/company/payments": "Company Payments",
  "/company/users": "Company Users",
  "/company/wallet": "Company Wallet",
};

function findCurrentSection(pathname) {
  const path = (pathname || "").toLowerCase();
  const key = Object.keys(routeTitles).find(
    (k) => path === k || path.startsWith(`${k}/`)
  );
  return routeTitles[key] || "Portal";
}

function getPortalReply(message, pathname) {
  const q = (message || "").toLowerCase().trim();
  const section = findCurrentSection(pathname);

  if (!q) {
    return "Please type your question. I can help with profile, navigation, reports, campaigns and media management.";
  }

  if (q.includes("profile") || q.includes("edit profile")) {
    return "Go to the left sidebar and open `Profile`. Use edit/update actions there to complete or update details.";
  }

  if (q.includes("media") || q.includes("rate card")) {
    return "Use `Media Management` from the sidebar (Society panel). There you can set rates, terms, and WhatsApp promotional details.";
  }

  if (q.includes("report") || q.includes("reports")) {
    return "Open the `Report` section in sidebar. It includes payment, performance, payout and log reports based on your role.";
  }

  if (
    q.includes("navigation") ||
    q.includes("not found") ||
    q.includes("cannot find") ||
    q.includes("where is")
  ) {
    return `You are currently in: ${section}. Use the left sidebar to switch sections. If a page looks broken, refresh once and check your role permissions.`;
  }

  if (q.includes("campaign") || q.includes("advertisement")) {
    return "Campaign and advertisement sections are available from the sidebar. Company users manage campaigns; Society users manage advertisement actions.";
  }

  if (q.includes("payment") || q.includes("wallet")) {
    return "Use `Wallet` for balance/history and `Payments` for transactions/withdrawals depending on your role.";
  }

  if (q.includes("user") || q.includes("permission")) {
    return "Use `Users` in sidebar for user management. Access visibility depends on your role and assigned permissions.";
  }

  return "I can help with navigation, profile completion, media management, reports, campaigns, wallet/payments, and permissions. Try a short specific question.";
}

const SupportChatbot = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I am your Portal Assistant. Ask me about flow, navigation or where to find features.",
    },
  ]);

  const sectionName = useMemo(
    () => findCurrentSection(location.pathname),
    [location.pathname]
  );

  const getUserType = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
      return userData?.user_type || localStorage.getItem("user_type") || "";
    } catch (error) {
      return localStorage.getItem("user_type") || "";
    }
  };

  const sendMessage = async (rawMessage) => {
    const message = (rawMessage ?? input).trim();
    if (!message || isThinking) return;
    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setInput("");
    setIsThinking(true);

    let reply = getPortalReply(message, location.pathname);
    try {
      const response = await axiosInstance.post(api_routes.common.chatbot_query, {
        message,
        context: {
          route: location.pathname,
          section_name: sectionName,
          user_type: getUserType(),
          app: "portal",
        },
      });
      const apiReply = response?.data?.reply?.toString().trim();
      if (apiReply) reply = apiReply;
    } catch (error) {
      // Keep local fallback response when API is unavailable.
    } finally {
      setIsThinking(false);
    }

    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
  };

  return (
    <div className="portal-chatbot">
      {open ? (
        <div className="portal-chatbot-panel">
          <div className="portal-chatbot-header">
            <div>
              <div className="portal-chatbot-title">Portal Help Assistant</div>
              <div className="portal-chatbot-subtitle">{sectionName}</div>
            </div>
            <button
              type="button"
              className="portal-chatbot-close"
              onClick={() => setOpen(false)}
            >
              x
            </button>
          </div>

          <div className="portal-chatbot-quick">
            {quickQuestions.map((q) => (
              <button
                key={q}
                type="button"
                className="portal-chatbot-quick-btn"
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="portal-chatbot-body">
            {messages.map((m, idx) => (
              <div
                key={`${m.from}-${idx}`}
                className={`portal-chatbot-msg ${
                  m.from === "user"
                    ? "portal-chatbot-msg-user"
                    : "portal-chatbot-msg-bot"
                }`}
              >
                {m.text}
              </div>
            ))}
            {isThinking && (
              <div className="portal-chatbot-msg portal-chatbot-msg-bot">
                Thinking...
              </div>
            )}
          </div>

          <div className="portal-chatbot-input-row">
            <input
              type="text"
              className="portal-chatbot-input"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              type="button"
              className="portal-chatbot-send"
              onClick={() => sendMessage()}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="portal-chatbot-fab"
          onClick={() => setOpen(true)}
        >
          Chat Help
        </button>
      )}
    </div>
  );
};

export default SupportChatbot;
