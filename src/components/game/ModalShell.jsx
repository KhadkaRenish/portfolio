import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useGameStore } from "../../store/gameStore";

function ModalShell({ modalId, kicker, title, children }) {
  const activeModal = useGameStore((state) => state.activeModal);
  const closeModal = useGameStore((state) => state.closeModal);

  if (activeModal !== modalId) return null;

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-card game-modal" initial={{ y: 20, scale: 0.96 }} animate={{ y: 0, scale: 1 }}>
        <button className="icon-button" type="button" onClick={closeModal} aria-label="Close modal">
          <X size={20} />
        </button>
        <p className="section-kicker">{kicker}</p>
        <h3>{title}</h3>
        <div className="mt-5">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export default ModalShell;
