import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const [rows, columns] = await getUserById(req.query.id);

  if (rows.length <= 0) {
    return res.status(404).json({ message: "User not found" });
  }
  const user = {
    Id: rows[0].Id,
    Username: rows[0].Username,
    AssignmentStreak: rows[0].AssignmentStreak,
    LoginStreak: rows[0].LoginStreak,
    Points: rows[0].Points,
  };
  res.status(200).json(user);
}

export async function getUserById(id) {
  const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "SecretPassword1!",
    database: "rottprototype",
  });

  return await db.query("SELECT * FROM User WHERE id = ?", [id]);
}
