import { useState } from "react";

import styles from "../styles/pages/Login.module.css";
import Button from "../components/Button";
import { Block } from "../components/content/Block";
import { Column } from "../components/content/Column";
import { Row } from "../components/content/Row";
import Input from "../components/form/Input";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import Router from "next/router";
import { useUserContext } from "../context/user";

export default function Login() {
  const [user, setUser] = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    setError("");

    const body = {
      username,
      password,
    };

    if (!username || !password) {
      return;
    }

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.userData && data.userData.isLoggedIn) {
          setUser(data.userData);
          Router.push("/");
        } else {
          setError("Gebruikersnaam of wachtwoord is onjuist");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className={styles.container}>
      <Block style={{ height: "fit-content", width: "500px", maxWidth: "90vw" }} classname={styles.block}>
        <p className={styles.title}>Login</p>
        <p>Login in in het studenten portaal om je punten te verdienen</p>

        <Row>
          <Column width={100}>
            <Input
              label="Username"
              type="text"
              id="username"
              name="username"
              placeholder=" "
              value={username}
              required={true}
              onChange={(e) => {
                setError("");
                setUsername(e.target.value);
              }}
            />
          </Column>
          <Column width={100}>
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder=" "
              value={password}
              required={true}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
            />
            {error && <p className={styles.error}>{error}</p>}
          </Column>

          <Column width={100}>
            <Button onClick={formSubmit} text="Login" style={{ float: "right" }} />
          </Column>
        </Row>
      </Block>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  if (user && user.isLoggedIn) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user,
      },
    };
  }

  return {
    props: { isLoggedIn: false, login: "", avatarUrl: "" },
  };
}, sessionOptions);
