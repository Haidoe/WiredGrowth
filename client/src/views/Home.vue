<template>
  <v-content>
    <v-container>
      <h1>{{ sampleText }}</h1>
      <span v-if="campusLoading"> Loading ... </span>
      <ul v-else>
        <li v-for="campus in campuses" :key="campus._id">
          {{ campus.campus }}
        </li>
      </ul>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data: () => ({
    sampleText: "This is your Home!"
  }),
  computed: {
    ...mapGetters(["campuses", "campusLoading"])
  },
  methods: {
    ...mapActions(["getCampuses"])
  },
  created() {
    console.log("welcome home");
    this.getCampuses();
  }
};
</script>
