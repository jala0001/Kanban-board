<script setup lang="ts">
import { ref, watch } from 'vue'
import { VCard, VCardTitle, VBtn, VIcon } from 'vuetify/components'
import CardForm   from './CardForm.vue'
import KanbanCard from './KanbanCard.vue'
import CardDialog from './CardDialog.vue'
import Draggable  from 'vuedraggable'
import { defineProps, defineEmits } from 'vue'

/* props */
const props = defineProps<{
  title:  string
  status: 'todo' | 'in-progress' | 'done'
  cards:  { id:string; title:string; description:string; status:string }[]
}>()

/* emit ved oprettelse */
const emit = defineEmits<{
  (e:'add-card', p:{ title:string; description:string; status:string }):void
}>()

/* opret‑form */
const showForm = ref(false)
function add (p:{ title:string; description:string }) {
  emit('add-card', { ...p, status: props.status })
  showForm.value = false
}

/* dialog */
const dialogOpen   = ref(false)
const selectedCard = ref<{ id:string; title:string; description:string } | null>(null)

function openDialog (card:any) {
  selectedCard.value = { ...card }
  dialogOpen.value   = true
}
function updateCard (p:{ id:string; title:string; description:string }) {
  const c = props.cards.find(c => c.id === p.id)
  if (c) { c.title = p.title; c.description = p.description }
}
function deleteCard (id:string) {
  const i = props.cards.findIndex(c => c.id === id)
  if (i !== -1) props.cards.splice(i,1)
}

/* justér status når kort droppes i kolonnen */
watch(
  () => props.cards,
  () => props.cards.forEach(c => (c.status = props.status))
)
</script>

<template>
  <VCard
    class="pa-4 d-flex flex-column"
    color="grey-lighten-3"
    style="width:320px; min-height:500px;"
    elevation="2"
  >
    <VCardTitle class="d-flex align-center justify-space-between pr-2">
      <span class="text-h6">{{ title }}</span>
      <VBtn icon size="small" color="primary" @click="showForm = !showForm">
        <VIcon>mdi-plus</VIcon>
      </VBtn>
    </VCardTitle>

    <CardForm v-if="showForm" @submit="add" />

    <!-- DRAGGABLE‑liste -->
    <Draggable
  :list="props.cards"
- group="kanban"
+ :group="{ name: 'kanban', pull: true, put: true }"
  item-key="id"
  :animation="150"
  :fallbackOnBody="true"
  :forceFallback="true"
  :swapThreshold="0.65"
  class="flex-grow-1 d-flex flex-column"
>

      <template #item="{ element }">
        <KanbanCard
          :title="element.title"
          :description="element.description"
          @edit="openDialog(element)"
        />
      </template>
    </Draggable>
  </VCard>

  <CardDialog
    v-if="selectedCard"
    :open="dialogOpen"
    :card="selectedCard!"
    @update:open="dialogOpen = $event"
    @update-card="updateCard"
    @delete-card="deleteCard"
  />
</template>
