import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import UpperPiecePuzzle from "../components/application/UpperPiecePuzzle.jsx";
import DigitInput from "../components/application/DigitInput.jsx";
import LowerPiecePuzzle from "../components/application/LowerPiecePuzzle.jsx";
import NavigationButton from "../components/application/NavigationButton.jsx";
import Modal from "../components/application/Modal.jsx";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { useUser } from "../lib/useUser.js";
import ConnectionRequest from "../components/ConnectionRequest.jsx";
import { Navigate } from "react-router-dom";

export default function Home() {
  const user = useUser();
  const [code, setCode] = useState("");
  const [reset, setReset] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [confirmation, setConfirmation] = useState("");

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

  useEffect(() => {
    if (!connectionStatus) return;

    const timer = setTimeout(() => {
      setConnectionStatus(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [connectionStatus]);

  // Open modal
  function toggleModal() {
    setIsModalOpen((s) => !s);
  }

  // Update URL in database
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
      setConfirmation("Something went wrong");
      // console.log(error);
    } else {
      setConfirmation("URL updated successfully!");
      setTimeout(() => {
        setIsModalOpen(false);
        setConfirmation("");
        setNewUrl("");
      }, 2000);
    }
  };

  return (
    <main className={styles.main}>
      {/* <ConnectionRequest /> */}
      <section className={styles.layout}>
        <div className={styles.upperContainer}>
          <UpperPiecePuzzle variant="lightBorderDashed" />
        </div>

        <article className={styles.form}>
          <DigitInput
            onComplete={setCode}
            onChangeCode={setCode}
            reset={reset}
          />
          {connectionStatus && <p>{connectionStatus}</p>}
          <div className={styles.addBtnContainer}>
            <button
              className={styles.addBtn}
              onClick={() => {
                handleConnect(code);
                setReset((prev) => !prev);
              }}
              disabled={code.length !== 4}
            >
              Add +
            </button>
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
