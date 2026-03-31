import UpperPiecePuzzle from "../components/UpperPiecePuzzle";
import LowerPiecePuzzle from "../components/LowerPiecePuzzle";
import { useState, useEffect, useRef } from "react";
import styles from "./Contacts.module.css";
import { supabase } from "../lib/supabase.js";

export default function Connections() {
  const [rows, setRows] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from("users").select("*");
      setRows(data);

      console.log("Supabase data:", data);
      console.log("Supabase error:", error);

      if (error) {
        console.error(error);
      } else {
        setRows(data);
      }
    }

    loadData();
  }, []);

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
              <UpperPiecePuzzle />
            </div>
            <div className={styles.lowerContainer}>
              <LowerPiecePuzzle />
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

      <button className={styles.backButton}>Back</button>
    </main>
  );
}
