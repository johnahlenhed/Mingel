import { useState, useRef, useEffect } from "react";
import styles from "./Home.module.css";
import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import DigitInput from "../components/DigitInput";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import NavigationButton from "../components/NavigationButton";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { useUser } from "../lib/useUser.js";
import ConnectionRequest from "../components/ConnectionRequest.jsx";
import { Navigate } from "react-router-dom";

export default function Home() {
  const user = useUser();
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const startY = useRef(0);
  const lastY = useRef(0);
  const dragging = useRef(false);
  const velocity = useRef(0);
  const lastMoveTime = useRef(0);

  const threshold = 80; //px needed to close modal
  const velocityThreshold = 0.6;

  if (user?.role === "company") {
    return <Navigate to="/company1" />;
  }

  const handleConnect = async (code) => {
    setConnectionStatus(null);

    const { data: targetUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("code", code)
      .single();

    if (userError || !targetUser) {
      setConnectionStatus("User not found");
      return;
    }

    if (targetUser.id === user.id) {
      setConnectionStatus("You cannot connect with yourself");
      return;
    }

    const { data: existing } = await supabase
      .from("connections")
      .select("*")
      .or(
        `and(from_user.eq.${user.id},to_user.eq.${targetUser.id}),and(from_user.eq.${targetUser.id},to_user.eq.${user.id})`,
      )
      .in("status", ["pending", "accepted"])
      .maybeSingle();

    if (existing) {
      if (existing.status === "pending") {
        setConnectionStatus(
          "Connection request already pending with this user",
        );
      } else {
        setConnectionStatus("You are already connected with this user");
      }
      return;
    }

    // Create connection
    const { error: connectionError } = await supabase
      .from("connections")
      .insert({
        from_user: user.id,
        to_user: targetUser.id,
        status: "pending",
      });

    if (connectionError) {
      if (connectionError.code === "23505") {
        // Unique violation
        setConnectionStatus("Already connected with this user");
      } else {
        setConnectionStatus("Something went wrong");
      }
      return;
    }

    setConnectionStatus("Connection request sent!");
  };

  // Modal
  function closeModal() {
    const modal = modalRef.current;
    if (!modal) return;

    modal.style.transition = "transform 0.3s ease";
    modal.style.transform = "translateY(100%)";

    setTimeout(() => {
      setIsModalOpen(false);
    }, 250);
  }

  useEffect(() => {
    if (!isModalOpen) return;

    const modal = modalRef.current;

    // Reset transform when modal opens
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

      // Calculate velocity
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
  }, [isModalOpen]);

  // Toggle modal
  function toggleModal() {
    setIsModalOpen((s) => !s);
  }

  return (
    <main className={styles.main}>
      {/* <ConnectionRequest /> */}
      <section className={styles.layout}>
        <div className={styles.upperContainer}>
          <UpperPiecePuzzle variant="lightBorderDashed" />
        </div>

        <article className={styles.form}>
          <DigitInput onComplete={handleConnect} />
          {connectionStatus && <p>{connectionStatus}</p>}
          <div className={styles.addBtnContainer}>
            <button className={styles.addBtn}>Add +</button>
          </div>
        </article>

        <div className={styles.lowerContainer}>
          <LowerPiecePuzzle variant="lightBorderDashed">
            <div className={styles.lowerContent}>
              {user ? (
                <>
                  <p>{user.full_name}</p>
                  <p>{user.programme}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </LowerPiecePuzzle>
        </div>

        <article className={styles.linksContainer}>
          <div className={styles.myConnectionsContainer}>
            <Link to="/connections">
              <NavigationButton>
                <div className={styles.navContent}>
                  <span>Connections</span>
                  <img
                    className={styles.arrowIcon}
                    src="../../arrow_right.svg"
                  />
                </div>
              </NavigationButton>
            </Link>
          </div>
          <div>
            <p className={styles.changeURL} onClick={toggleModal}>
              Change the URL you share
            </p>
          </div>
        </article>
      </section>

      <section className={styles.modalContainer}>
        <article
          ref={modalRef}
          className={`${styles.modalContent} ${isModalOpen ? styles.showModal : ""}`}
        >
          <input
            className={styles.inputURL}
            type="url"
            placeholder="New URL"
          ></input>

          <button className={styles.saveBtn}>Save</button>

          <button
            className={styles.modalClose}
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>
        </article>
        {isModalOpen && (
          <div
            className={styles.modalOverlay}
            onClick={closeModal}
            aria-hidden="true"
          />
        )}
      </section>
    </main>
  );
}
