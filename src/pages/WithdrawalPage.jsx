import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { DollarSign, Phone, User, CreditCard, Globe, CircleAlert, LogOut } from "lucide-react";
import { Auth } from "firebase/auth";

const MEANINGFUL_MIN_WITHDRAW = 5; // example rule

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

    if (!data.accountName || data.accountName.length < 2)
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
      // In real backend you'll do:
      // 1. API call to /api/withdrawal
      // 2. payload: {
      //      method,
      //      accountDetails: formData[method],
      //      uid: user.uid,
      //      email: user.email,
      //      currentBalance: balance,
      //      requestedAmount: Number(formData[method].amount),
      //      currency: "AED"
      //    }
      // 3. Wait for 200 / success

      // Since we don't have backend yet, just simulate:
      alert(
        `[Simulated]
User UID: ${user.uid}
Requested ${method} withdrawal: ${formData[method].amount} AED
Admin should now see notification.`
      );
      setSelectedMethod(null);
      setFormData({
        bKash: { number: "", name: "", amount: "" },
        nagad: { number: "", name: "", amount: "" },
        paypal: { email: "", amount: "" },
        binance: { id: "", currency: "AED", amount: "" },
      });
    } catch (err) {
      setErrors({ global: "Withdrawal request failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

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
                Choose your preferred withdrawal method and request your earnings.
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
                description: "USD/International",
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
        </motion.div>

        {/* ==================== bKash Modal ==================== */}
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

        {/* ==================== Nagad Modal ==================== */}
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#3b82f6]"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                  }}
                >
                  <Phone size={20} strokeWidth={2.2} color="#ffffff" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Nagad Withdrawal</h2>
                  <p className="text-xs text-[#9ca3af]">
                    Enter your Nagad details and amount.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#9ca3af]">Nagad Number</label>
                  <input
                    value={formData.nagad.number}
                    onChange={(e) =>
                      updateField("nagad", "number", e.target.value)
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
                    value={formData.nagad.name}
                    onChange={(e) =>
                      updateField("nagad", "name", e.target.value)
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
                    value={formData.nagad.amount}
                    onChange={(e) =>
                      updateField("nagad", "amount", e.target.value)
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
                    onClick={() => handleSubmit("nagad")}
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

        {/* ==================== PayPal Modal ==================== */}
        {selectedMethod === "paypal" && (
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                  }}
                >
                  <CreditCard size={20} strokeWidth={2.2} color="#ffffff" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">PayPal Withdrawal</h2>
                  <p className="text-xs text-[#9ca3af]">
                    Enter your PayPal email and amount.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#9ca3af]">PayPal Email</label>
                  <input
                    value={formData.paypal.email}
                    onChange={(e) =>
                      updateField("paypal", "email", e.target.value)
                    }
                    type="email"
                    placeholder="you@example.com"
                    className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4 text-sm"
                  />
                  {errors.email && (
                    <div className="text-xs text-red-500">{errors.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#9ca3af]">
                    Amount (AED)
                  </label>
                  <input
                    value={formData.paypal.amount}
                    onChange={(e) =>
                      updateField("paypal", "amount", e.target.value)
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
                    onClick={() => handleSubmit("paypal")}
                    disabled={submitting}
                    className="flex-1 btn btn-primary text-sm"
                  >
                    {submitting ? "Submitting..." : "Submit Withdrawal Request"}
                  </button>
                </div>
              </div>
                
