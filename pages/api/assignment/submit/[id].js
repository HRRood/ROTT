// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../../lib/session";
import { closeConnection, getConnection } from "../../../../utils/db-connection";

async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.query;
    const user = req.session.user;

    if (!user) {
      return res.status(200).json({ success: false, message: "Not authorized" });
    }
    const { assignmentAnswer, poinstGiven } = req.body;

    const db = await getConnection();
    //insert into User_Assignment the User_id, Assignment_Id, achieved and answer
    const [rows] = await db.query("INSERT INTO User_Assignment (User_id, Assignment_id, Achieved, answer) VALUES (?, ?, ?, ?)", [
      user.Id,
      id,
      0,
      JSON.stringify(assignmentAnswer),
    ]);

    //update userpoints
    const [rows2] = await db.query("UPDATE User SET Points = Points + ? WHERE Id = ?", [poinstGiven, user.Id]);
    console.log(rows2);
    closeConnection(db);

    return res.status(200).json({ success: true, message: "Assignment submitted" });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
