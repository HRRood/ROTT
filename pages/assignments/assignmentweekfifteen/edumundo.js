import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { useEffect } from "react";
import { useUserContext } from "../../../context/user";
import { getUserById, mapUserData } from "../../api/user/[id]";
import isUserLoggedIn from "../../../utils/is-user-logged-in";
import image1 from "../../../images/edumundo/Afbeelding1.png";
import image2 from "../../../images/edumundo/Afbeelding2.png";
import image3 from "../../../images/edumundo/Afbeelding3.png";
import image4 from "../../../images/edumundo/Afbeelding4.png";
import image5 from "../../../images/edumundo/Afbeelding5.png";
import image6 from "../../../images/edumundo/Afbeelding6.png";
import image7 from "../../../images/edumundo/Afbeelding7.png";
import image8 from "../../../images/edumundo/Afbeelding8.png";
import image9 from "../../../images/edumundo/Afbeelding9.png";
import image10 from "../../../images/edumundo/Afbeelding10.png";
import image11 from "../../../images/edumundo/Afbeelding11.png";
import image12 from "../../../images/edumundo/Afbeelding12.png";
import image13 from "../../../images/edumundo/Afbeelding13.png";
import image14 from "../../../images/edumundo/Afbeelding14.png";
import Image from "next/image";

export default function edumundo({ userData }) {
  const [user, setUser] = useUserContext();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <div>
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <div>
          <Image src={image1} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image2} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image3} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image4} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image5} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image6} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image7} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image8} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image9} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image10} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image11} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image12} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image13} priority={1} width={1024} alt="edumundo_image" />
        </div>
        <div>
          <Image src={image14} priority={1} width={1024} alt="edumundo_image" />
        </div>
      </div>
    </div>
  );
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
