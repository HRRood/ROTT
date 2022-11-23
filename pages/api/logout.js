import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

function handler(req, res) {
  req.session.destroy();
  res.json({ success: true });
}

export default withIronSessionApiRoute(handler, sessionOptions);
