"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Sparkles, Terminal, X, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const QuickActionsPanel = dynamic(() => import("./QuickActionsPanel"), { ssr: false });
const ChatbotPanel = dynamic(() => import("./ChatbotPanel"), { ssr: false });
const SandboxPanel = dynamic(() => import("./SandboxPanel"), { ssr: false });

type PanelId = "quick" | "chat" | "sandbox" | null;

const items = [
  {
    id: "sandbox" as const,
    icon: Terminal,
    label: "Playground",
    bg: "bg-emerald-600 hover:bg-emerald-500",
  },
  {
    id: "chat" as const,
    icon: Bot,
    label: "AI Assistant",
    bg: "bg-[#1e3a5f] hover:bg-[#1e3a5f]/80",
  },
  {
    id: "quick" as const,
    icon: Zap,
    label: "Quick Actions",
    bg: "bg-[#C9A227] hover:bg-[#E8C84A]",
  },
];

export default function FloatingHub() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<PanelId>(null);

  const handleItemClick = (id: PanelId) => {
    setPanel(id);
    setOpen(false);
  };

  return (
    <>
      {/* FAB + radial menu */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
        {/* Sub-items */}
        <AnimatePresence>
          {open &&
            items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ delay: i * 0.06, duration: 0.18, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <span className="text-xs font-medium bg-white shadow-lg rounded px-2.5 py-1 text-primary-text whitespace-nowrap border border-border-subtle">
                  {item.label}
                </span>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-11 h-11 rounded-full ${item.bg} shadow-lg flex items-center justify-center transition-transform hover:scale-110 text-white`}
                >
                  <item.icon size={17} />
                </button>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen((v) => !v)}
          className="w-14 h-14 rounded-full bg-accent shadow-xl flex items-center justify-center text-white hover:bg-accent/90 transition-colors"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.14 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="sp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.14 }}
              >
                <Sparkles size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Panels */}
      <AnimatePresence>
        {panel === "quick" && (
          <QuickActionsPanel key="quick" onClose={() => setPanel(null)} />
        )}
        {panel === "chat" && (
          <ChatbotPanel key="chat" onClose={() => setPanel(null)} />
        )}
        {panel === "sandbox" && (
          <SandboxPanel key="sandbox" onClose={() => setPanel(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
