import ApolloClient from "apollo-boost"; //help us gets running with apollo
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";

export function withApollo(PageComponent) {
  const WithApollo = props => {
    const client = new ApolloClient({
      uri: "http://localhost:8080/api/graphql",
      fetch
    });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    );
  };

  return WithApollo;
}
