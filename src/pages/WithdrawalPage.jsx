import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { DollarSign, Phone, User, CreditCard, Globe, CircleAlert, LogOut, X } from "lucide-react";
import { Auth } from "firebase/auth";

const MEANINGFUL_MIN_WITHDRAW = 5; // example rule

/** Example mock withdrawal history (later from backend /api/withdrawal/user) */
function mockWithdrawals() {
  return [
    {
      id: 1,
      method: "bKash",
      number: "01XXXXXXXX",
      amount: 15.5,
      currency: "AED",
      status: "pending",
      requestedAt: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
      id: 2,
      method: "paypal",
      email: "user@example.com",
      amount: 20.0,
      currency: "AED",
      status: "approved",
      requestedAt: new Date(Date.now() - 12 * 3600000), // 12 hours ago
    },
    {
      id: 3,
      method: "nagad",
      number: "01XXXXXXXX",
      amount: 10.0,
      currency: "AED",
      status: "paid",
      requestedAt: new Date(Date.now() - 36 * 3600000), // 1.5 days ago
    },
  ];
}

// Status badge color
const statusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-amber-500/20 text-amber-500 border-amber-500/30";
    case "approved":
      return "bg-emerald-500/20 text-emerald-500 border-emerald-500/30";
    case "paid":
      return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    case "rejected":
      return "bg-red-500/20 text-red-500 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-500 border-gray-500/30";
  }
};

export default function WithdrawalPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [balance] = useState(45); // from backend in future
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({
    bKash: { number: "", name: "", amount: "" },
    nagad: { number: "", name: "", amount: "" },
    paypal: { email: "", amount: "" },
    binance: { id: "", currency: "AED", amount: "" },
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState([]); // mock withdrawal history
  const [showModal, setShowModal] = useState(false); // show history popup

  const logout = async () => {
    await Auth.signOut();
    navigate("/login", { replace: true });
  };

  const startWithdraw = (method) => {
    setSelectedMethod(method);
    setErrors({});
  };

  const updateField = (method, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [method]: { ...prev[method], [key]: value },
    }));
  };

  const validate = (method) => {
    const data = formData[method];
    const errs = {};

    if (!data.amount || Number(data.amount) <= 0)
      errs.amount = "Amount must be positive";
    else if (Number(data.amount) < MEANINGFUL_MIN_WITHDRAW)
      errs.amount = `Minimum ${MEANINGFUL_MIN_WITHDRAW} AED`;

    if (!data.name || data.name.length < 2)
      errs.accountName = "Full name required";

    switch (method) {
      case "bKash":
        if (!data.number || data.number.length < 10)
          errs.number = "Enter valid bKash number";
        break;
      case "nagad":
        if (!data.number || data.number.length < 10)
          errs.number = "Enter valid Nagad number";
        break;
      case "paypal":
        if (!data.email || !data.email.includes("@"))
          errs.email = "Enter valid PayPal email";
        break;
      case "binance":
        if (!data.id || data.id.length < 4)
          errs.id = "Enter Binance UID";
        break;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (method) => {
    if (!validate(method)) return;

    setSubmitting(true);
    try {
      // simulate API call:
      // await fetch('/api/withdrawal/request', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     method,
      //     accountDetails: formData[method],
      //     uid: user.uid,
      //     email: user.email,
      //     currentBalance: balance,
      //     requestedAmount: Number(formData[method].amount),
      //     currency: "AED"
      //   })
      // })

      const now = new Date();
      const newWithdrawal = {
        id: Date.now(), // temp
        method,
        amount: Number(formData[method].amount),
        currency: "AED",
        status: "pending",
        requestedAt: now,
        accountDetails: formData[method],
      };

      setHistory((prev) => [newWithdrawal, ...prev]);

      // simulate admin notification: (you'll handle this on backend)
      console.log(
        `[Admin Panel Mock Notification]
` +
          `User UID: ${user.uid}
` +
          `Name: ${user.displayName || "User"}
` +
          `Email: ${user.email}
` +
          `Method: ${method}
` +
          `Amount: ${newWithdrawal.amount} AED
` +
          `Balance Before: ${balance} AED`
      );

      // reset form
      setFormData({
        bKash: { number: "", name: "", amount: "" },
        nagad: { number: "", name: "", amount: "" },
        paypal: { email: "", amount: "" },
        binance: { id: "", currency: "AED", amount: "" },
      });

      alert(`Withdrawal request sent. Admin will review your request.
Method: ${method}, Amount: ${newWithdrawal.amount} AED`);
      setSelectedMethod(null);
    } catch (err) {
      setErrors({ global: "Withdrawal request failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  // Simulate fetch history on load
  useEffect(() => {
    setHistory(mockWithdrawals());
  }, []);

  if (loading) {
    return (
      <div className="container p-8 text-center text-[#9ca3af]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.08),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.08),transparent_60%),#0b0f1a]">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-lg font-semibold">Withdrawal</h1>
              <p className="text-sm text-[#9ca3af]">
                Choose your preferred method and request your earnings.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#9ca3af]">Your balance</div>
              <div className="text-xl font-semibold text-white">
                {balance.toFixed(2)} AED
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              {
                label: "bKash",
                value: "bKash",
                icon: Phone,
                color: "#06b6d4",
                description: "Bangladesh mobile wallet",
              },
              {
                label: "Nagad",
                value: "nagad",
                icon: Phone,
                color: "#3b82f6",
                description: "Nagad mobile banking",
              },
              {
                label: "PayPal",
                value: "paypal",
                icon: CreditCard,
                color: "#0ea5e9",
                description: "International transfers",
              },
              {
                label: "Binance",
                value: "binance",
                icon: Globe,
                color: "#f59e0b",
                description: "Crypto exchange",
              },
            ].map(({ label, value, icon: Icon, color, description }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.03 }}
                onClick={() => startWithdraw(value)}
                className="w-full card p-4 flex flex-col gap-2 text-left border border-[rgba(255,255,255,0.1)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}, rgba(var(${color.replace("#", "var(--color-")}), 0.6))`,
                    }}
                  >
                    <Icon size={18} strokeWidth={2.2} color="#ffffff" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{label}</div>
                    <div className="text-xs text-[#9ca3af]">{description}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* =============== History section =============== */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} strokeWidth={2} className="text-[#9ca3af]" />
              <span className="font-medium text-sm text-[#e5e7eb]">
                Withdrawal History
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="ml-auto text-xs text-[#06b6d4] hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-2">
              {history.slice(0, 3).map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="p-3 rounded-xl border border-[rgba(255,255,255,0.1)] flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      <span className="font-semibold">
                        {item.method}
                      </span>{" "}
                      ({item.currency})
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border ${statusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#9ca3af]">
                    {item.amount.toFixed(2)} AED •{" "}
                    {item.requestedAt.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* =============== History modal (popup) =============== */}
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.75)" }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                layout
                className="max-w-lg w-full card p-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold">Withdrawal History</h2>
                    <p className="text-xs text-[#9ca3af]">
                      Your past and pending requests.
                    </p>
                  </div>
                  <X
                    className="w-6 h-6 cursor-pointer text-[#9ca3af]"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                {history.length === 0 ? (
                  <div className="text-center text-[#9ca3af] p-4">
                    No withdrawal history yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl border border-[rgba(255,255,255,0.1)] flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            <span className="font-semibold">
                              {item.method}
                            </span>{" "}
                            ({item.currency})
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs border ${statusStyle(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#9ca3af]">
                          {item.amount.toFixed(2)} AED •{" "}
                          {item.requestedAt.toLocaleString()}
                        </div>
                        {item.status === "pending" && (
                          <div className="text-xs text-amber-500">
                            🕒 Awaiting admin review. You will receive AED via your chosen method after approval.
                          </div>
                        )}
                        {item.status === "approved" && (
                          <div className="text-xs text-emerald-500">
                            ✅ Admin approved your request.
                          </div>
                        )}
                        {item.status === "paid" && (
                          <div className="text-xs text-blue-500">
                            💸 Payment has been sent.
                          </div>
                        )}
                        {item.status === "rejected" && (
                          <div className="text-xs text-red-500">
                            ❌ Request rejected by admin.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* =============== bKash Modal ==================== */}
        {selectedMethod === "bKash" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)" }}
          >
            <motion.div
              layout
              className="max-w-lg w-full card p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#06b6d4]"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
                  }}
                >
                  <Phone size={20} strokeWidth={2.2} color="#ffffff" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">bKash Withdrawal</h2>
                  <p className="text-xs text-[#9ca3af]">
                    Enter your bKash details and amount.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#9ca3af]">bKash Number</label>
                  <input
                    value={formData.bKash.number}
                    onChange={(e) =>
                      updateField("bKash", "number", e.target.value)
                    }
                    type="text"
                    placeholder="01XXXXXXX"
                    className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4 text-sm"
                  />
                  {errors.number && (
                    <div className="text-xs text-red-500">{errors.number}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#9ca3af]">
                    Account Holder Name
                  </label>
                  <input
                    value={formData.bKash.name}
                    onChange={(e) =>
                      updateField("bKash", "name", e.target.value)
                    }
                    type="text"
                    placeholder="Your full name"
                    className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4 text-sm"
                  />
                  {errors.accountName && (
                    <div className="text-xs text-red-500">
                      {errors.accountName}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#9ca3af]">
                    Amount (AED)
                  </label>
                  <input
                    value={formData.bKash.amount}
                    onChange={(e) =>
                      updateField("bKash", "amount", e.target.value)
                    }
                    type="number"
                    step="0.01"
                    min={MEANINGFUL_MIN_WITHDRAW}
                    max={balance}
                    placeholder="Amount"
                    className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4 text-sm"
                  />
                  {errors.amount && (
                    <div className="text-xs text-red-500">{errors.amount}</div>
                  )}
                </div>

                {errors.global && (
                  <div className="text-xs text-red-500 bg-red-500/10 p-2 rounded-lg">
                    {errors.global}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedMethod(null)}
                    disabled={submitting}
                    className="flex-1 btn border border-[rgba(255,255,255,0.15)]
                      bg-transparent text-white text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSubmit("bKash")}
                    disabled={submitting}
                    className="flex-1 btn btn-primary text-sm"
                  >
                    {submitting ? "Submitting..." : "Submit Withdrawal Request"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* =============== Nagad Modal ==================== */}
        {selectedMethod === "nagad" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)" }}
          >
            <motion.div
              layout
              className="max-w-lg w-full card p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#3
