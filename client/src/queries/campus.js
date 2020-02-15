import { gql } from "apollo-boost";

export const GET_CAMPUSES = gql`
  query {
    getCampuses {
      _id
      campus
    }
  }
`;
