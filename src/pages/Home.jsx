import { useState } from "react";
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

  if (user?.role === 'company') {
    return <Navigate to="/company1" />
  }

  const handleConnect = async (code) => {
    setConnectionStatus(null)

    const { data: targetUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq('code', code)
      .single()

    if (userError || !targetUser) {
      setConnectionStatus("User not found")
      return
    }

    if (targetUser.id === user.id) {
      setConnectionStatus("You cannot connect with yourself")
      return
    }

    const { data: existing } = await supabase
      .from('connections')
      .select('*')
      .or(`and(from_user.eq.${user.id},to_user.eq.${targetUser.id}),and(from_user.eq.${targetUser.id},to_user.eq.${user.id})`)
      .in('status', ['pending', 'accepted'])
      .maybeSingle()

    if (existing) {
      if (existing.status === 'pending') {
        setConnectionStatus("Connection request already pending with this user")
      } else {
        setConnectionStatus("You are already connected with this user")
      }
      return
    }

    // Create connection
    const { error: connectionError } = await supabase
      .from('connections')
      .insert({
        from_user: user.id,
        to_user: targetUser.id,
        status: 'pending'
      })

    if (connectionError) {
      if (connectionError.code === '23505') { // Unique violation
        setConnectionStatus('Already connected with this user')
      } else {
        setConnectionStatus('Something went wrong')
      }
      return
    }

    setConnectionStatus("Connection request sent!")
  }

  return (
    <main className={styles.main}>
      <ConnectionRequest />
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
            <a>Change the URL you share</a>
          </div>
        </article>
      </section>
    </main>
  );
}
