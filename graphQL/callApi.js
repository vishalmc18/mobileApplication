import { initializeApollo } from "./apolloClients";

export async function CallApi(operation, query, variables) {
  
  const client = initializeApollo();
  let resultData = {};
  
  if(operation === "query")
  {
    await client
    .query({
      query: query,
      variables: variables,
      fetchPolicy: "no-cache",
    })
    .then((data) => {
      resultData = data;
    })
    .catch((err) => {
      resultData =  null;
    });
  } else{
    await client
    .mutate({
      mutation: query,
      variables: variables
    })
    .then((data) => {
      resultData = data;
    })
    .catch((err) => {
      resultData = null;
    });
  }


  return resultData;
}
