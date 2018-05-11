class GraphQLClient {
  constructor(host) {
    this.uri = `${host}/graphql`;
    this.jwt = undefined;
  }

  authenticate = () => {};

  clearAuth = () => {
    this.jwt = undefined;
  };

  query = async (graphQLQuery, variables) => {
    try {
      const res = await fetch(this.uri, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.jwt,
        }),
        body: JSON.stringify({
          query: graphQLQuery,
          variables,
        }),
      });
      return res.json();
    } catch (err) {
      console.log(err);
    }
  };
}

const host = 'http://localhost:3000';
const client = new GraphQLClient(host);

export const query = client.query;
export const authenticate = client.authenticate;
export const clearAuth = client.clearAuth;
