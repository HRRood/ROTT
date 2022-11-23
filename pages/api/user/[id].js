import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const [rows, columns] = await getUserById(req.query.id);

  if (rows.length <= 0) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(rows[0]);
}

export async function getUserById(id) {
  const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "CannondaleSystem6#",
    database: "Rottprototype",
  });

  return await db.query("SELECT * FROM User WHERE id = ?", [id]);
}
