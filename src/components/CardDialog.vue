<script setup lang="ts">
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VSpacer, VBtn } from 'vuetify/components'
import CardForm from './CardForm.vue'


const props = defineProps<{
  card: { id:string; title:string; description:string }
  open: boolean                      
}>()

const emit = defineEmits<{
  (e:'update:open', v:boolean):void
  (e:'update-card', p:{ id:string; title:string; description:string }):void
  (e:'delete-card', id:string):void
}>()

function submit (p:{ title:string; description:string }) {
  emit('update-card', { id:props.card.id, ...p })
  emit('update:open', false)
}
function del () {
  emit('delete-card', props.card.id)
  emit('update:open', false)
}
</script>

<template>
  <VDialog v-model="props.open" max-width="500">
    <VCard>
      <VCardTitle>Redigér kort</VCardTitle>

      <VCardText>
        <!-- giver initialData -->
        <CardForm
          :initialData="{ title: card.title, description: card.description }"
          @submit="submit"
        />
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn color="error" @click="del">Slet</VBtn>
        <VBtn text @click="emit('update:open', false)">Luk</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
