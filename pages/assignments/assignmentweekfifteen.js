import { AssignmentWeekFifteen } from "../../components/assignments/AssignmentWeekFifteen";
import { resetServerContext } from "react-beautiful-dnd";

export default function AssignmentWeekFifteenPage() {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <AssignmentWeekFifteen />
    </div>
  );
}
export const getServerSideProps = async ({ query }) => {
  resetServerContext();

  return { props: { data: [] } };
};
