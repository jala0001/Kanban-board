<template>
  <v-app>
    <v-main>
      <KanbanBoard />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { VApp, VMain } from 'vuetify/components'
import KanbanBoard from './components/KanbanBoard.vue'
</script>
