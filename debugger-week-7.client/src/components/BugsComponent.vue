<template>
  <div class="BugsComponent my-3">
    <div class="row">
      <h1>
        {{ bugs.title }}
      </h1>
    </div>
    <div class="row">
      <h1>
        {{ bugs.description }}
      </h1>
    </div>
    <div class="row">
      <h1>
        {{ bugs.updatedAt }}
      </h1>
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
