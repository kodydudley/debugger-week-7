<template>
  <div class="BugsComponent">
    <td>
      Hello
    </td>
    <!-- <h1>
      {{ bugs.title }}
    </h1> -->
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
