<script setup lang="ts">
import { reactive } from 'vue'
import { VContainer, VRow, VCol } from 'vuetify/components'
import KanbanColumn from './KanbanColumn.vue'


interface Card {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
}


const columns = reactive({
  todo:       [] as Card[],
  inProgress: [] as Card[],
  done:       [] as Card[]
})


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
  <!-- Hvid “canvas” med max‑bredde og centreret margin -->
  <v-container
    fluid
    class="pa-6"
    style="
      background: white;
      max-width: 1200px;
      margin: 2rem auto;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      overflow-x: auto;
    "
  >
    <!-- Flex‑row med justify‑center og jævn gap -->
    <v-row
      class="flex-nowrap justify-center"
      align="stretch"
      style="gap: 1.5rem;"
    >
      <v-col cols="auto">
        <KanbanColumn
          title="To Do"
          status="todo"
          :cards="columns.todo"
          @add-card="addCard"
        />
      </v-col>

      <v-col cols="auto">
        <KanbanColumn
          title="In Progress"
          status="in-progress"
          :cards="columns.inProgress"
          @add-card="addCard"
        />
      </v-col>

      <v-col cols="auto">
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
