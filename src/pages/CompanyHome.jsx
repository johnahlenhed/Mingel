import { useState } from "react";
import styles from "./CompanyHome.module.css";
import LowerPiecePuzzle from "../components/application/LowerPiecePuzzle";
import DisplayDigit from "../components/application/DisplayDigit";
import NavigationButton from "../components/application/NavigationButton";
import UpperPiecePuzzle from "../components/application/UpperPiecePuzzle";
import Modal from "../components/application/Modal.jsx";
import { supabase } from "../lib/supabase.js";
import { useUser } from "../lib/useUser.js";
import { Link } from "react-router-dom";

export default function CompanyHome() {
  const user = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [confirmation, setConfirmation] = useState("");

  // Open modal
  function toggleModal() {
    setIsModalOpen((s) => !s);
  }

  //Update URL in database
  const handleSaveUrl = async () => {
    if (!user) return;

    if (!newUrl.trim()) {
      console.log("URL cannot be empty");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ link: newUrl })
      .eq("id", user.id);

    if (error) {
      // console.log(error);
      setConfirmation("Something went wrong");
    } else {
      // console.log("URL updated successfully");
      //setIsModalOpen(false);
      setConfirmation("URL updated successfully!");
      setTimeout(() => {
        setIsModalOpen(false);
        setConfirmation("");
        setNewUrl("");
      }, 2000);
    }
  };

  return (
    <main className={styles.layout}>
      <section className={styles.rotatedContainer}>
        <LowerPiecePuzzle variant="lightBorderDashed"></LowerPiecePuzzle>
      </section>

      <section>
        <article className={styles.codeContainer}>
          <DisplayDigit></DisplayDigit>
        </article>
      </section>

      <section className={styles.rotatedContainer}>
        <UpperPiecePuzzle variant="lightBorderDashed"></UpperPiecePuzzle>
      </section>

      <section className={styles.navigation}>
        <Link to="/company2">
          <NavigationButton>
            Connections <img src="../../arrow_right.svg" />
          </NavigationButton>
        </Link>
      </section>

      <div>
        <p className={styles.changeURL} onClick={toggleModal}>
          Change the URL you share
        </p>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <input
          className={styles.inputURL}
          type="url"
          placeholder={"Current: " + user?.link || "New URL"}
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        ></input>

        {confirmation && <p className={styles.confirmation}>{confirmation}</p>}

        <button className={styles.saveBtn} onClick={handleSaveUrl}>
          Save
        </button>
      </Modal>
    </main>
  );
}
