class GraphQLClient {
  constructor(host) {
    this.uri = `${host}/graphql`
    this.jwt = undefined
  }

  authenticate = () => {
  }

  clearAuth = () => {
    this.jwt = undefined
  }

  query = (graphQLQuery, variables) =>
    fetch(this.uri, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.jwt,
      }),
      body: JSON.stringify({
        query: graphQLQuery,
        variables,
      }),
    })

}

const host = 'https://ardent-api-next.ardentlabs.io'
const client = new GraphQLClient(host);

export const query = client.query
export const authenticate = client.authenticate
export const clearAuth = client.clearAuth