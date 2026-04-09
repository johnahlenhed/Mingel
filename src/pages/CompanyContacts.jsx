import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import NavigationButton from "../components/NavigationButton";
import { useState, useEffect, useRef } from "react";
import styles from "./CompanyContacts.module.css";
import { supabase } from "../lib/supabase.js";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../lib/useUser.js";

export default function CompanyContacts() {
  const user = useUser();
  const [rows, setRows] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();

  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!user) return;

    async function loadData() {
      const { data, error } = await supabase
        .from("connections")
        .select("*, users!connections_from_user_fkey(id, full_name, email, programme, link)")
        .eq("to_user", user.id)
        .eq("status", "accepted");

      if (error) {
        console.error(error)
      } else {
        setRows(data)
      }
    }
    loadData()
  }, [user])

  // Check which card is visible
  useEffect(() => {
    if (!rows.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 },
    );
    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rows]);

  // Scroll to card when clicking a dot
  const scrollToCard = (index) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  useEffect(() => {
    if (!rows.length) return;

    const index = rows.findIndex((r) => r.users.id === id);
    if (index !== -1) {
      scrollToCard(index);
    }
  }, [rows, id]);

  return (
    <main className={styles.layout}>
      <section className={styles.cardContainer} ref={containerRef}>
        {rows?.map((row, i) => (
          <div
            key={row.id}
            data-index={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className={styles.contactWrapper}
          >
            <div className={styles.upperContainer}>
              <UpperPiecePuzzle variant="darkBorderSolid">
                <div>
                  <p>{row.users.full_name}</p>
                  <p>{row.users.email}</p>
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
        ))}
      </section>

      {/* Dots */}
      <section className={styles.dots}>
        {rows.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ""}`}
            onClick={() => scrollToCard(i)}
          />
        ))}
      </section>

      <section className={styles.btnContainer}>
        <Link to="/company2">
          <NavigationButton>View all</NavigationButton>
        </Link>
      </section>
    </main>
  );
}
