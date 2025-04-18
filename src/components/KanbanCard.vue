<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import {
  VCard,
  VCardTitle,
  VCardText
} from 'vuetify/components'

/* Props – titel og beskrivelse */
const props = defineProps<{
  title: string
  description: string
}>()

/* Emit ‘edit’ når der dobbelt‑klikkes på kortet */
const emit = defineEmits<{ (e: 'edit'): void }>()
</script>

<template>
  <VCard
    class="mb-2"
    color="blue-grey-lighten-5"
    style="cursor: pointer;"
    @dblclick="emit('edit')"
  >
    <VCardTitle class="text-h6">{{ props.title }}</VCardTitle>
    <VCardText>{{ props.description }}</VCardText>
  </VCard>
</template>
