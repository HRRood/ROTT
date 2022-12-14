import { AssignmentWeekFifteen } from "../../components/assignments/AssignmentWeekFifteen";
import { Block } from "../../components/content/Block";
import { Row } from "../../components/content/Row";
import { Column } from "../../components/content/Column";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { useEffect } from "react";
import { useUserContext } from "../../context/user";
import { getUserById, mapUserData } from "../api/user/[id]";
import isUserLoggedIn from "../../utils/is-user-logged-in";
import { AssignmentCollection } from "../../components/Progress/Data";
import { AssignmentChapterFoldOut } from "../../components/content/AssignmentChapterFoldOut";
import sealImg from "../../images/profile/seal.png";
import Image from "next/image";

export default function AssignmentWeekFifteenPage({ userData }) {
  const [user, setUser] = useUserContext();
  const chapters = FillChapterList();

  useEffect(() => {
    setUser(userData);
  }, [userData]);
  return (
    <div>
      <Row>
        <Column width={100} smWidth={30} lgWidth={20}>
          <Block>
            <h2>Opdrachten</h2>
            <div>{chapters}</div>
          </Block>
        </Column>
        <Column width={100} smWidth={70} lgWidth={80}>
          <Row>
            <Column width={80} smWidth={80} lgWidth={80}>
              <div style={{ textAlign: "center" }}>
                <h1>Prioriteiten stellen</h1>
              </div>
            </Column>
            <Column width={20} smWidth={20} lgWidth={20}>
              <div style={{ padding: "30px" }}>
                <a
                  href="/assignments/assignmentweekfifteen/edumundo"
                  target="_blank"
                  style={{
                    backgroundColor: "var(--adsai-medium-blue)",
                    padding: "20px",
                    marginTop: "20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  Open Edubook
                </a>
              </div>
            </Column>
          </Row>
          <Row>
            <Column width={100} smWidth={100} lgWidth={70}>
              <p>
                Voor school ben je druk bezig met een groot project. Je zit met
                je groep in de afrondende fase, en maandag over een week is de
                deadline. Aankomende week heb je nog de tijd om alles tot een
                mooi resultaat te brengen. Naar verwachting zal dit je nog 20
                uur aan huiswerk kosten.
              </p>
              <p>
                Behalve het schoolwerk heb je natuurlijk nog meer bezigheden
                gedurende de week. Natuurlijk moet je overdag naar school.
                Verder kun je denken aan huishoudelijke taken, boodschappen
                doen, de hond uitlaten als je die hebt, met vrienden afspreken,
                sporten, enzovoort. In deze opdracht wordt je gevraagd om je
                week zo in te delen, dat je de deadline haalt.
              </p>
              <p>
                In onderstaand schema kun je activiteiten plaatsen. Je hoeft de
                standaard activiteiten zoals slapen, douchen en eten niet in te
                delen. In deze oefening zijn die iedere dag hetzelfde, dus daar
                hoef je geen aandacht aan te besteden. Er blijft 10 uur per dag
                over om in te delen. Als je een activiteit plaatst, kun je de
                tijd instellen die je eraan denkt te besteden. Ook kun je de
                activiteiten in een voor jou handige volgorde zetten. Je begint
                met 10 punten. Sommige activiteiten leveren punten op, tenzij je
                er te veel uren in steekt. Andere activiteiten leveren geen
                punten op, en weer andere leveren sowieso een puntenaftrek op.
                Als je na afloop 10 of meer punten hebt gehaald, heb je de
                oefening met succes afgerond.
              </p>
              <ol>
                <li>
                  Vul eerst je dagelijkse verplichtingen in. Denk aan school, de
                  reis er naartoe, werk, enzovoort. Wees zo realistisch
                  mogelijk.
                </li>
                <li>
                  Vul vervolgens het schema aan met de andere activiteiten die
                  je deze week nog graag wilt doen. Ga je uit? Wil je nog
                  sporten? Of gewoon een paar uur niks doen?
                </li>
                <li>
                  Nadat je de hele week gevuld hebt, zal blijken of je voldoende
                  tijd voor opdracht hebt gereserveerd. Ook zul je zien hoeveel
                  tijd andere activiteiten in kunnen nemen in de week.
                </li>
              </ol>
            </Column>
            <Column width={100} smWidth={100} lgWidth={30}>
              <Image src={sealImg} priority={1} width={300} />
            </Column>
          </Row>

          <AssignmentWeekFifteen />
        </Column>
      </Row>
    </div>
  );
}

function FillChapterList() {
  const data = AssignmentCollection;
  let chapters = [];

  for (let i = 0; i < 7; i++) {
    const assignment = data.AssignmentList[i];
    const chapterFoldoutKey = `chapterFoldoutKey_${assignment.Id}`;
    const chapter = (
      <AssignmentChapterFoldOut
        key={chapterFoldoutKey}
        assignment={assignment}
      ></AssignmentChapterFoldOut>
    );
    chapters.push(chapter);
  }

  return chapters;
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
