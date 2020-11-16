<template>
  <div class="home container-fluid">
    <div class="row my-3 justify-content-around">
      <div class="col-6">
        <h4>Submit A New Bug</h4>
        <form @submit.prevent="createBugs">
          <input class="form-control my-2" type="text" placeholder="New Bug Title" v-model="state.newBug.title">
          <textarea placeholder="Bug Description"
                    name=""
                    id=""
                    cols="83"
                    rows="5"
                    v-model="state.newBug.description"
          ></textarea>
          <input class="form-control my-2" type="text" placeholder="Reported By" v-model="state.newBug.reportedBy">
          <!-- <label for="checkbox">Is this bug still open? </label>
          <input type="checkbox" id="checkbox" v-model="checked"> -->
          <div>
            <button type="submit" class="btn btn-primary">
              Submit bug
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-around">
      <h1>Bugs</h1>
    </div>
    <div class="col-10 offset-1">
      <div class="row justify-content-around">
        <bugs-component v-for="bug in bugs" :bugs-prop="bug" :key="bug" />
      </div>
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
