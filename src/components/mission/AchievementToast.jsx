import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Bug } from "lucide-react";
import { useGameStore } from "../../store/gameStore";

function AchievementToast() {
  const notification = useGameStore((state) => state.notification);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          className="achievement-toast"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
        >
          {notification.type === "achievement" ? <BadgeCheck className="text-emerald-200" /> : <Bug className="text-red-200" />}
          <div>
            <strong>{notification.title}</strong>
            <p>{notification.detail}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AchievementToast;
