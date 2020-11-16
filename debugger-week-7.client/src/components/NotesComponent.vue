<template>
  <div class="NotesComponent">
    <!-- <h1>hello</h1> -->
    <div class="card my-3 text-left pl-2">
      <h5 class="text-dark">
        <b>Reported By:</b>
        {{ notes.reportedBy }}
      </h5>
      <div>
        <h6>
          <b>Note:</b>
          {{ notes.note }}
        </h6>
      </div>
      <button @click="deleteNote" class="btn btn-danger btn-sm float-left">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { notesService } from '../services/NotesService'
export default {
  name: 'NotesComponent',
  props: ['notesProp'],
  setup(props) {
    return {
      notes: computed(() => props.notesProp),
      deleteNote() {
        notesService.deleteNote(props.notesProp._id, props.notesProp.bug)
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
