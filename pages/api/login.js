// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from "mysql2/promise";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

async function handler(req, res) {
  const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "CannondaleSystem6#",
    database: "Rottprototype",
  });
  const { username, password } = req.body;
  const { method } = req;

  if (method === "POST") {
    try {
      const [rows, fields] = await db.query("SELECT * FROM User WHERE username = ? AND password = ?", [username, password]);
      if (rows.length > 0) {
        const user = {
          Id: rows[0].Id,
          Username: rows[0].Username,
          AssignmentStreak: rows[0].AssignmentStreak,
          LoginStreak: rows[0].LoginStreak,
          Points: rows[0].Points,
        };

        const userData = { isLoggedIn: true, ...user };
        req.session.user = userData;
        await req.session.save();
        return res.status(200).json({ message: "Login successful", userData });
      } else {
        return res.status(200).json({ message: "Login failed" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  } else {
    return res.status(200).json({ name: "John Doe" });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
