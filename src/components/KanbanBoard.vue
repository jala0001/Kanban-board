<script setup lang="ts">
import { reactive } from 'vue'
import { VContainer, VRow, VCol } from 'vuetify/components'
import KanbanColumn from './KanbanColumn.vue'

/* ------------ typer ------------ */
interface Card {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
}

/* ------------ central state pr. kolonne ------------- */
const columns = reactive({
  todo:       [] as Card[],
  inProgress: [] as Card[],
  done:       [] as Card[]
})

/* ------------ modtag nyt kort fra en kolonne -------- */
function addCard (payload: { title: string; description: string; status: string }) {
  const newCard: Card = {
    id: crypto.randomUUID(),
    title: payload.title,
    description: payload.description,
    status: payload.status as Card['status']
  }

  if (payload.status === 'todo') {
    columns.todo.push(newCard)
  } else if (payload.status === 'in-progress') {
    columns.inProgress.push(newCard)
  } else {
    columns.done.push(newCard)
  }
}
</script>

<template>
  <!-- vandret scroll hvis der ikke er plads -->
  <v-container fluid class="pa-4" style="overflow-x:auto;">
    <v-row class="flex-nowrap" align="stretch">
      <v-col cols="auto" class="d-flex justify-center">
        <KanbanColumn
          title="To Do"
          status="todo"
          :cards="columns.todo"
          @add-card="addCard"
        />
      </v-col>

      <v-col cols="auto" class="d-flex justify-center">
        <KanbanColumn
          title="In Progress"
          status="in-progress"
          :cards="columns.inProgress"
          @add-card="addCard"
        />
      </v-col>

      <v-col cols="auto" class="d-flex justify-center">
        <KanbanColumn
          title="Done"
          status="done"
          :cards="columns.done"
          @add-card="addCard"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
