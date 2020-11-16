<template>
  <div class="ActiveBug container-fluid">
    <div class="row">
      <div class="col-6">
        <h1>
          {{ activeBug.title }}
        </h1>
        <p><b>Description: </b>{{ activeBug.description }}</p>
        <p>{{ activeBug.updatedAt }}</p>
        <form class="form-group" @submit.prevent="createNotes">
          <div>
            <textarea id="" cols="50" rows="5" placeholder="Enter New Note" v-model="state.note"></textarea>
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
      </div>
      <div class="col-6 mt-3">
        <form class="form-group" @submit.prevent="editBug" v-show="activeBug.closed == false">
          <div>
            <input class="my-3" type="text" placeholder="Edit Bug Title" v-model="state.activeBug.title">
          </div>
          <textarea v-model="state.activeBug.description"
                    name=""
                    id=""
                    cols="50"
                    rows="5"
                    placeholder="Edit Bug Description"
          ></textarea>
          <div>
            <button class="btn btn-primary" type="submit">
              Edit Bug
            </button>
          </div>
        </form>
      </div>
    </div>
    <button @click="deleteBug" v-show="!activeBug.closed">
      Close
    </button>
    <notes-component v-for="note in notes" :key="note" :notes-prop="note" />
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
  props: ['bugsProp'],

  setup(props) {
    const state = reactive({
      activeBug: {}
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
      },
      editBug() {
        bugsService.editBug(route.params.bugId, state.activeBug)
      },
      deleteBug() {
        bugsService.deleteBug(route.params.bugId)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
