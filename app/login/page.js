"use client";

import { useState } from "react";
import Button from "../../components/Button";
import { Block } from "../../components/content/Block";
import { Column } from "../../components/content/Column";
import { Row } from "../../components/content/Row";
import Input from "../../components/form/Input";
import styles from "../../styles/pages/Login.module.css";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.container}>
      <Block style={{ height: "fit-content", width: "500px", maxWidth: "90vw" }} classname={styles.block}>
        <p className={styles.title}>Login</p>
        <p>Login in in het studenten portaal om je punten te verdienen</p>
        <form>
          <Row>
            <Column width={100}>
              <Input
                label="Username"
                type="text"
                id="username"
                name="username"
                placeholder=" "
                value={username}
                onChange={(e) => {
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Column>

            <Column width={100}>
              <Button text="Login" style={{ float: "right" }} />
            </Column>
          </Row>
        </form>
      </Block>
    </div>
  );
}
