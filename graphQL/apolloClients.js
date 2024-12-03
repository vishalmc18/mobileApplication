import { ApolloClient,HttpLink,InMemoryCache,} from "@apollo/client";

let apolloClient;

const httpLink = new HttpLink({
  uri: "removing for the copy right purpose", ///
  credentials: "same-origin",
});

function createApolloClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo() {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}