<template>
  <div class="home container-fluid">
    <div class="row my-3 justify-content-around">
      <div class="col-6">
        <h4>Submit A New Bug</h4>
        <form @submit.prevent="createBugs">
          <input class="form-control my-2" type="text" placeholder="New Bug Title" v-model="state.newBug.title">
          <input class="form-control my-2" type="text" placeholder="Bug Description" v-model="state.newBug.description">
          <input class="form-control my-2" type="text" placeholder="Reported By" v-model="state.newBug.reportedBy">
          <button type="submit" class="btn btn-primary">
            Submit bug
          </button>
        </form>
      </div>
    </div>
    <div class="row justify-content-around">
      <h1>Bugs</h1>
    </div>
    <div class="row justify-content-center">
      <bugs-component v-for="bug in bugs" :bugs-prop="bug" :key="bug" />
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
      title: '',
      description: '',
      reportedBy: ''
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      bugs: computed(() => AppState.bugs),
      createBugs() {
        bugsService.createBugs(state.newBug)
        state.newBug.title = ''
        state.newBug.description = ''
        state.newBug.reportedBy = ''
      }
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
