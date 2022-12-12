import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { useEffect } from "react";
import { useUserContext } from "../../context/user";
import { getUserById, mapUserData } from "../api/user/[id]";
import isUserLoggedIn from "../../utils/is-user-logged-in";

export default function Assignments({ userData }) {
  const [user, setUser] = useUserContext();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return <h1>Assignments</h1>;
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  if (!isUserLoggedIn(req)) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        userData: { isLoggedIn: false, login: "", avatarUrl: "" },
      },
    };
  }

  const response = await getUserById(req.session.user.Id);

  if (!response.success) {
    return {
      props: {
        userData: { isLoggedIn: false, login: "", avatarUrl: "" },
      },
    };
  }

  const userMapped = mapUserData(response.data);
  return {
    props: { userData: { ...req.session.user, ...userMapped } },
  };
},
sessionOptions);
