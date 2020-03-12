import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../lib/apollo";

import HabitList from "../components/HabitList";
import HabitForm from "../components/HabitForm";
import Layout from "../components/Layout";

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

// const REDDIT_QUERY = gql`
//   query HelloQuery {
//     reddit {
//       subreddit(name: "bboy") {
//         subscribers
//       }
//     }
//   }
// `;

const Home = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  const [habits, setHabits] = useState(["Do the dishes"]);

  if (loading) return <div />;

  console.log(data);

  return (
    <Layout>
      <div className="hero">
        <h1 className="title">Data Tracker App</h1>
        {/* <h1 className="title">{data.reddit.subreddit.subscribers}</h1> */}
        <div className="list"></div>

        <HabitForm setHabits={setHabits} />

        <HabitList habits={habits} />
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          padding: 0px 200px;
          color: #333;
        }
        .title {
          margin-top: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }

        button {
          border: 2px solid black;
        }

        .list {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </Layout>
  );
};

export default withApollo(Home);
