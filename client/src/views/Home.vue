<template>
  <v-content>
    <v-container>
      <h1>{{ sampleText }}</h1>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    sampleText: "This is your Home!"
  })
};
</script>
