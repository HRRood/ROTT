import { AssignmentWeekFifteen } from "../../components/assignments/AssignmentWeekFifteen";
import { resetServerContext } from "react-beautiful-dnd";
import { Row } from "../../components/content/Row";
import { Column } from "../../components/content/Column";

export default function AssignmentWeekFifteenPage() {
  return (
    <div>
      <Row>
        <Column width={100} smWidth={100} lgWidth={100}>
          <div style={{ textAlign: "center" }}>
            <h1>Prioriteiten stellen</h1>
          </div>
        </Column>
      </Row>
      <Row>
        <Column width={100} smWidth={100} lgWidth={100}>
          <p>
            Voor school ben je druk bezig met een groot project. Je zit met je
            groep in de afrondende fase, en maandag over een week is de
            deadline. Aankomende week heb je nog de tijd om alles tot een mooi
            resultaat te brengen. Naar verwachting zal dit je nog 20 uur aan
            huiswerk kosten.
          </p>
          <p>
            Behalve het schoolwerk heb je natuurlijk nog meer bezigheden
            gedurende de week. Natuurlijk moet je overdag naar school. Verder
            kun je denken aan huishoudelijke taken, boodschappen doen, de hond
            uitlaten als je die hebt, met vrienden afspreken, sporten,
            enzovoort. In deze opdracht wordt je gevraagd om je week zo in te
            delen, dat je de deadline haalt.
          </p>
          <p>
            In onderstaand schema kun je activiteiten plaatsen. Je hoeft de
            standaard activiteiten zoals slapen, douchen en eten niet in te
            delen. In deze oefening zijn die iedere dag hetzelfde, dus daar hoef
            je geen aandacht aan te besteden. Er blijft 12 uur per dag over om
            in te delen. Als je een activiteit plaatst, kun je de tijd instellen
            die je eraan denkt te besteden. Ook kun je de activiteiten in een
            voor jou handige volgorde zetten.
          </p>
          <ol>
            <li>
              Vul eerst je dagelijkse verplichtingen in. Denk aan school, de
              reis er naartoe, werk, enzovoort. Wees zo realistisch mogelijk.
            </li>
            <li>
              Vul vervolgens het schema aan met de andere activiteiten die je
              deze week nog graag wilt doen. Ga je uit? Wil je nog sporten? Of
              gewoon een paar uur niks doen?
            </li>
            <li>
              Nadat je de hele week gevuld hebt, zal blijken of je voldoende
              tijd voor opdracht hebt gereserveerd. Ook zul je zien hoeveel tijd
              andere activiteiten in kunnen nemen in de week.
            </li>
          </ol>
        </Column>
      </Row>
      <div style={{ display: "flex", gap: "5px" }}>
        <AssignmentWeekFifteen />
      </div>
    </div>
  );
}
export const getServerSideProps = async ({ query }) => {
  resetServerContext();

  return { props: { data: [] } };
};
