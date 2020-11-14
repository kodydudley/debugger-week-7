<template>
  <div class="home ">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            Title
          </th>
          <th scope="col">
            Reported By
          </th>
          <th scope="col">
            Status
          </th>
          <th scope="col">
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            1
          </th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">
            <bugs-component v-for="bug in bugs" :bugs-props="bug" :key="bug" />
          </th>
        </tr>
      </tbody>
    </table>
    <div class="row">
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import BugsComponent from '../components/BugsComponent.vue'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'

export default {
  components: { BugsComponent },
  name: 'Home',
  setup() {
    onMounted(() => { bugsService.getBugs() })
    const state = reactive({
      newBug: {},
      title: ''
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
