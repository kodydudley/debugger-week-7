<template>
  <div class="ActiveBug container-fluid">
    <div class="col-10">
      <h1>
        {{ activeBug.title }}
      </h1>
      <p><b>Description: </b>{{ activeBug.description }}</p>
      <p>{{ activeBug.updatedAt }}</p>
      <form class="form-group" @submit.prevent="createNotes">
        <div>
          <textarea id="" cols="30" rows="5" placeholder="Enter New Note" v-model="state.note"></textarea>
        </div>
        <div>
          <input type="text" placeholder="Name" v-model="state.reportedBy">
        </div>
        <div>
          <button type="submit" class="btn btn-primary">
            Add Note
          </button>
        </div>
      </form>
      <notes-component v-for="note in notes" :key="note" :notes-prop="note" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { notesService } from '../services/NotesService'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'ActiveBug',
  setup(props) {
    const state = reactive({
      props: ['bugsProp']

    })
    const route = useRoute()
    onMounted(() => {
      bugsService.getActiveBug(route.params.bugId)
      notesService.getNotes(route.params.bugId)
    })
    return {
      state,
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      createNotes() {
        const newNote = {
          note: state.note,
          bug: route.params.bugId,
          reportedBy: state.reportedBy
        }
        notesService.createNotes(newNote)
        state.note = ''
        state.reportedBy = ''
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
