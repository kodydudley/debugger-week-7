<template>
  <div class="BugsComponent my-3 col-4">
    <div class="card text-left pl-2">
      <router-link :to="{name: 'ActiveBug', params: {bugId: bugs._id}}">
        <h3 class="text-dark">
          <b>Title:</b>
          {{ bugs.title }}
        </h3>
      </router-link>
      <div>
        <h6>
          <b>Description:</b>
          {{ bugs.description }}
        </h6>
      </div>
      <div>
        <h6>
          <b>Last Updated:</b>
          {{ bugs.updatedAt }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'BugsComponent',
  props: ['bugsProp'],
  setup(props) {
    return {
      profile: computed(() => AppState.profile),
      bugs: computed(() => props.bugsProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
