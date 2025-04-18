<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import {
  VCard,
  VCardTitle,
  VCardText,
  VIcon
} from 'vuetify/components'

const props = defineProps<{ title: string; description: string }>()
const emit  = defineEmits<{ (e: 'edit'): void }>()
</script>

<template>
  <VCard
    class="mb-2 position-relative"
    color="blue-grey-lighten-5"
    style="cursor: pointer;"
    @click="emit('edit')"
  >
   
    <VIcon
      class="drag-handle"
      style="position: absolute; top: 4px; right: 4px; cursor: move;"
    >
      mdi-drag
    </VIcon>

    <VCardTitle class="text-h6">{{ props.title }}</VCardTitle>
    <VCardText>{{ props.description }}</VCardText>
  </VCard>
</template>
