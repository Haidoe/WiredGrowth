<template>
  <v-content>
    <v-container>
      <h1>{{ sampleText }}</h1>

      <ApolloQuery :query="getCampusesQuery">
        <template slot-scope="{ result: { loading, data } }">
          <span v-if="loading">Loading...</span>
          <ul v-else>
            <li v-for="campus in data.getCampuses" :key="campus._id">
              {{ campus.campus }}
            </li>
          </ul>
        </template>
      </ApolloQuery>
    </v-container>
  </v-content>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "Home",
  data: () => ({
    sampleText: "This is your Home!",
    getCampusesQuery: gql`
      query {
        getCampuses {
          _id
          campus
        }
      }
    `
  })
};
</script>
