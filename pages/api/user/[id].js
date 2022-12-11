import { closeConnection, getConnection } from "../../../utils/db-connection";

export default async function handler(req, res) {
  const response = await getUserById(req.query.id);

  if (!response.success) {
    return res.status(404).json({ success: false, message: response.message });
  }
  const user = mapUserData(response.data);
  return res.status(200).json({ success: true, data: user });
}

export async function getUserById(id) {
  const db = await getConnection();

  const [rows] = await db.query("SELECT * FROM User WHERE id = ?", [id]);

  if (rows.length <= 0) {
    return { success: false, message: "User not found" };
  }

  closeConnection(db);
  return { success: true, data: rows[0] };
}

export function mapUserData(user) {
  if (!user) {
    return null;
  }
  return {
    Id: user.Id,
    Username: user.Username,
    AssignmentStreak: user.AssignmentStreak,
    LoginStreak: user.LoginStreak,
    Points: user.Points,
  };
}
