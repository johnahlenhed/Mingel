import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import NavigationButton from "../components/NavigationButton";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./CompanyConnections.module.css";
import { supabase } from "../lib/supabase.js";
import { useUser } from "../lib/useUser.js";

export default function Connections() {
  const user = useUser();
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function loadData() {
      const { data, error } = await supabase
        .from("connections")
        .select("*, users!connections_from_user_fkey(id, full_name, programme)")
        .eq("to_user", user.id)
        .eq("status", "accepted");

      if (error) {
        console.error(error);
      } else {
        setRows(data);
      }
    }

    loadData();

    const subscription = supabase
      .channel("company-accepted-connections")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "connections",
          filter: `to_user=eq.${user.id}`,
        },
        () => loadData(),
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [user]);

  function toggleModal() {
    setIsModalOpen((s) => !s);
  }

  return (
    <main className={styles.layout}>
      <section className={styles.gridContainer}>
        {rows?.map((row) => (
          <Link key={row.id} to={`/company-contacts/${row.users.id}`}>
            <div key={row.id} className={styles.puzzleWrapper}>
              <div className={styles.upperContainer}>
                <UpperPiecePuzzle variant="darkBorderSolid">
                  <div>
                    <p>{row.users.full_name}</p>
                    <p>{row.users.programme}</p>
                  </div>
                </UpperPiecePuzzle>
              </div>
              <div className={styles.lowerContainer}>
                <LowerPiecePuzzle variant="blue">
                  <div>
                    <p className={styles.lowerContent}>{row.users.full_name}</p>
                  </div>
                </LowerPiecePuzzle>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className={styles.navbar}>
        <Link to="/company1">
          <NavigationButton>
            <div className={styles.navContent}>
              <span>Show code</span>
              <img
                className={styles.arrowIcon}
                src="../../arrow_right.svg"
                alt="Arrow pointing right"
              />
            </div>
          </NavigationButton>
        </Link>

        <img
          onClick={toggleModal}
          className={styles.helpBtn}
          src="../../StudentHelp.png"
          alt="Question mark button for help"
        />

        <section className={styles.modalContainer}>
          <article
            className={`${styles.modalContent} ${isModalOpen ? styles.showModal : ""}`}
          >
            <h3>How does it work?</h3>
            <p>
              Meet students and grow your network by sharing your unique code.
            </p>
            <p>
              Every connection is collected in your library, and after the event
              you can highlight promising candidates using the handshake icon.
            </p>
            <button
              className={styles.modalClose}
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </article>
          {isModalOpen && (
            <div
              className={styles.modalOverlay}
              onClick={() => setIsModalOpen(false)}
              aria-hidden="true"
            />
          )}
        </section>
      </section>
    </main>
  );
}
