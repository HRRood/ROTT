// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { closeConnection, getConnection } from "../../../utils/db-connection";

async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const user = req.session.user;

    if (!user) {
      return res.status(200).json({ success: false, message: "Not authorized" });
    }

    const db = await getConnection();
    // get the assignment from the database User_Assignment
    const [rows] = await db.query("SELECT * FROM User_Assignment WHERE User_id = ? AND Assignment_Id = ?", [user.Id, id]);
    closeConnection(db);

    return res.status(200).json({ success: true, data: rows[0] });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
