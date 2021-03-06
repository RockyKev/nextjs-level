import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_EVENT = gql`
  mutation addEvent($date: Date, $habitId: ID) {
    addEvent(date: $date, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID, $habitId: ID) {
    removeEvent(eventId: $eventId, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

//LAST PLACE: https://www.leveluptutorials.com/tutorials/fullstack-react-with-nextjs/error-states --> 416 on the clock

const HabitButton = ({ date, habitId }) => {
  const [addEvent] = useMutation(ADD_EVENT, {
    refetchQueries: ["getHabits"]
  });

  const [removeEvent] = useMutation(REMOTE_EVENT, {
    refetchQueries: ["getHabits"]
  });

  const found = false;

  return (
    <span>
      {date.getMonth() + 1}/{date.getDate()}
      {found ? (
        <button
          onClick={() =>
            removeEvent({
              variables: {
                habitId,
                eventId: "asdfdsasfsf"
              }
            })
          }
        >
          X
        </button>
      ) : (
        <button onClick={() => setComplete(!complete)}>O</button>
      )}
      <style jsx>
        {`
          span {
            display: flex;
            flex-direction: column;
          }
          span + span {
            margin-left: 10px;
          }
          button {
            margin-top: 1rem;
            border: none;
          }
        `}
      </style>
    </span>
  );
};

export default HabitButton;
