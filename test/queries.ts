import gql from 'graphql-tag';

export const createUserMutation = gql`
  mutation {
    createUser(
      createUserData: { username: "user_32", displayName: "I am user 32" }
    ) {
      username
      displayName
    }
  }
`;

export const getUsersQuery = gql`
  query {
    getUsers {
      id
      username
      displayName
    }
  }
`;
