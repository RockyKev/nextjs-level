import ApolloClient from "apollo-boost"; //help us gets running with apollo
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import { InMemoryCache } from "apollo-cache-inmemory";

//NOTES: This is to set up Server-side Rendering.

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  //determines serverside rendering
  WithApollo.getInitialProps = async context => {
    const { AppTree } = context;
    const apolloClient = (context.apolloClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(context);
    }

    //this is to check if it's a server
    if (typeof window === "undefined") {
      if (context.res && context.res.finished) {
        return pageProps;
      }

      try {
        //dynamic import - gets data before things are rendering. Server doesn't know when how long things will work.
        //Wait until the entire data is rendered. THEN load the files.
        const { getDataFromTree } = await import("@apollo/react-ssr");
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        );
      } catch (e) {
        console.error(e);
      }
      Head.rewind();
    }

    const apolloState = apolloClient.cache.extract();

    return {
      ...pageProps,
      apolloState
    };
  };

  return WithApollo;
}

const initApolloClient = (initialState = {}) => {
  //if it's on the server, it's TRUE. Else it's false.
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    ssrMode,
    uri: "http://localhost:8080/api/graphql",
    fetch,
    cache
  });

  return client;
};
