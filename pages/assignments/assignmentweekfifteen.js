import { AssignmentWeekFifteen } from "../../components/assignments/AssignmentWeekFifteen";
import { resetServerContext } from "react-beautiful-dnd";

export default function AssignmentWeekFifteenPage() {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: 'wrap', margin: '0 20px' }}>
      <AssignmentWeekFifteen />
    </div>
  );
}
export const getServerSideProps = async ({ query }) => {
  resetServerContext();

  return { props: { data: [] } };
};
