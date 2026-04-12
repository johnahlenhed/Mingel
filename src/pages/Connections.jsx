import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
// import NavigationButton from "../components/NavigationButton";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Connections.module.css";
import { supabase } from "../lib/supabase.js";
import { useUser } from "../lib/useUser.js";

export default function Connections() {
  const user = useUser();
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  const startY = useRef(0);
  const lastY = useRef(0);
  const dragging = useRef(false);
  const velocity = useRef(0);
  const lastMoveTime = useRef(0);

  const threshold = 80;
  const velocityThreshold = 0.6;

  useEffect(() => {
    if (!user) return;

    // Function to load connections data for the current user
    async function loadData() {
      const { data, error } = await supabase
        .from("connections")
        .select(
          "*, users!connections_to_user_fkey(id, full_name, company, programme)",
        )
        .eq("from_user", user.id)
        .eq("status", "accepted");

      if (error) {
        console.error(error);
      } else {
        setRows(data);
      }
    }
    loadData();

    // Subscribe to changes in connections where current user is the sender
    const subscription = supabase
      .channel("accepted-connections")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "connections",
          filter: `from_user=eq.${user.id}`,
        },
        () => loadData(),
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [user]);

  function toggleModal() {
    setIsModalOpen((s) => !s);
  }

  function closeModal() {
    const modal = modalRef.current;
    if (!modal) return;

    modal.style.transition = "transform 0.3s ease";
    modal.style.transform = "translateY(100%)";

    setTimeout(() => {
      setIsModalOpen(false);
    }, 250);
  }

  function showSmallPuzzle() {
    // Determine which small puzzle image to show based on number of connections (rows)
    const count = Array.isArray(rows) ? rows.length : 0;
    // bound progress so any value >=4 shows the finished image
    const progress = Math.min(count, 3);

    switch (progress) {
      case 0:
        return (
          <article className={styles.smallPuzzleContainer}>
            <img
              className={styles.smallPuzzleImg}
              src="../../left-piece-hollow-blue.png"
            />
            <img
              className={styles.smallPuzzleImg}
              src="../../middle-piece-hollow-blue.png"
            />
            <img
              className={styles.smallPuzzleImg}
              src="../../right-piece-hollow-blue.png"
            />
          </article>
        );
      case 1:
        return (
          <article className={styles.smallPuzzleContainer}>
            <img
              className={styles.smallPuzzleImg}
              src="../../left-piece-solid.png"
            />
            <img
              className={styles.smallPuzzleImg}
              src="../../middle-piece-hollow-grey.png"
            />
            <img
              className={styles.smallPuzzleImg}
              src="../../right-piece-hollow-grey.png"
            />
          </article>
        );
      case 2:
        return (
          <article className={styles.smallPuzzleContainer}>
            <img
              className={styles.smallPuzzleImg}
              src="../../left-piece-solid.png"
            />
            <img
              className={styles.smallPuzzleImg}
              src="../../middle-piece-solid.png"
            />
            <img
              className={styles.smallPuzzleImg}
              src="../../right-piece-hollow-grey.png"
            />
          </article>
        );
      case 3:
        return (
          <article className={styles.smallPuzzleContainer}>
            <img
              className={`${styles.smallPuzzleImg} ${styles.animateLeft}`}
              src="../../left-piece-solid.png"
            />
            <img
              className={`${styles.smallPuzzleImg} ${styles.animateMiddle}`}
              src="../../middle-piece-solid.png"
            />
            <img
              className={`${styles.smallPuzzleImg} ${styles.animateRight}`}
              src="../../right-piece-solid.png"
            />
          </article>
        );
      default:
        return "../../3PuzzleNone.png";
    }
  }

  // NUMBER OF HOLLOW CONTAINERS
  function hollowContainers() {
    function renderHollowPieces(count) {
      const arr = [];
      for (let i = 0; i < count; i++) {
        arr.push(
          <div key={i} className={styles.hollowContainer}>
            <div className={styles.upperContainer}>
              <UpperPiecePuzzle variant="lightBorderSolid" />
            </div>
            <div className={styles.lowerContainer}>
              <LowerPiecePuzzle variant="lightBorderSolid" />
            </div>
          </div>,
        );
      }
      return arr;
    }

    const count = Array.isArray(rows) ? rows.length : 0;
    const progress = Math.min(count, 3);

    switch (progress) {
      case 0:
        return <>{renderHollowPieces(3)}</>;
      case 1:
        return <>{renderHollowPieces(2)}</>;
      case 2:
        return <>{renderHollowPieces(1)}</>;

      default:
        return <></>;
    }
  }

  // MODAL
  useEffect(() => {
    if (!isModalOpen) return;

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
  }, [isModalOpen]);

  return (
    <main className={styles.layout}>
      <section className={styles.smallPuzzleContainer}>
        {showSmallPuzzle()}
      </section>
      <section className={styles.gridContainer}>
        {rows?.map((row) => (
          <Link key={row.id} to={`/contacts/${row.users.id}`}>
            <div key={row.id} className={styles.puzzleWrapper}>
              <div className={styles.upperContainer}>
                <UpperPiecePuzzle variant="darkBorderSolid">
                  <div>
                    <p>{row.users.full_name}</p>
                    <p>{row.users.company}</p>
                  </div>
                </UpperPiecePuzzle>
              </div>
              <div className={styles.lowerContainer}>
                <LowerPiecePuzzle variant="blue">
                  <div className={styles.lowerContent}>
                    <div className={styles.lowerText}>
                      <span>View</span>
                      <img src="../../arrow_right.svg" />
                    </div>
                  </div>
                </LowerPiecePuzzle>
              </div>
            </div>
          </Link>
        ))}

        {hollowContainers()}

        {/* ADD container */}
        <div className={styles.emptyContainer}>
          <Link to="/">
            <div className={`${styles.upperContainer} ${styles.upperEmpty}`}>
              <UpperPiecePuzzle variant="darkBorderDashed">
                <div>
                  <p>
                    Add new <br />+
                  </p>
                </div>
              </UpperPiecePuzzle>
            </div>
            <div className={styles.lowerContainer}>
              <LowerPiecePuzzle variant="darkBorderSolid"></LowerPiecePuzzle>
            </div>
          </Link>
        </div>
      </section>

      <img
        onClick={toggleModal}
        className={styles.helpBtn}
        src="../../StudentHelp.png"
        alt="Question mark button for help"
      />

      <section className={styles.modalContainer}>
        <article
          ref={modalRef}
          className={`${styles.modalContent} ${isModalOpen ? styles.showModal : ""}`}
        >
          <h3>How does it work?</h3>
          <p>
            Create connections by entering a company's code, collecting piece in
            your personal puzzle. Complete three to see it join a larger piece
            live on screen.
          </p>
          <p>Keep goging and make the most of the people around you!</p>
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
