import { useRef, useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  const startY = useRef(0);
  const lastY = useRef(0);
  const dragging = useRef(false);
  const velocity = useRef(0);
  const lastMoveTime = useRef(0);

  const threshold = 80;
  const velocityThreshold = 0.6;

  function closeModal() {
    const modal = modalRef.current;
    if (!modal) return;

    modal.style.transition = "transform 0.3s ease";
    modal.style.transform = "translateY(100%)";

    setTimeout(() => {
      onClose();
    }, 250);
  }

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;

    modal.style.transform = "translateY(0)";
    modal.style.transition = "transform 0.3s ease";

    const onTouchStart = (e) => {
      dragging.current = true;
      startY.current = e.touches[0].clientY;
      lastY.current = startY.current;
      lastMoveTime.current = Date.now();
      modal.style.transition = "none";
    };

    const onTouchMove = (e) => {
      if (!dragging.current) return;

      const y = e.touches[0].clientY;
      const diff = y - startY.current;

      const now = Date.now();
      const deltaT = now - lastMoveTime.current;
      velocity.current = (y - lastY.current) / deltaT;

      lastY.current = y;
      lastMoveTime.current = now;

      if (diff > 0) {
        modal.style.transform = `translateY(${diff}px)`;
      }
    };

    const onTouchEnd = () => {
      dragging.current = false;
      modal.style.transition = "transform 0.3s ease";

      const diff = lastY.current - startY.current;
      const fastSwipe = velocity.current > velocityThreshold;
      const longDrag = diff > threshold;

      if (fastSwipe || longDrag) {
        closeModal();
      } else {
        modal.style.transform = "translateY(0)";
      }
    };

    modal.addEventListener("touchstart", onTouchStart);
    modal.addEventListener("touchmove", onTouchMove);
    modal.addEventListener("touchend", onTouchEnd);

    return () => {
      modal.removeEventListener("touchstart", onTouchStart);
      modal.removeEventListener("touchmove", onTouchMove);
      modal.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closeModal} />
      <article ref={modalRef} className={styles.modal}>
        <img
          className={styles.swipe}
          src="../../swipe.png"
          alt="Swipe to close modal"
        />
        {/* <button className={styles.close} onClick={closeModal}>
          ×
        </button> */}
        {children}
      </article>
    </>
  );
}
