<script setup lang="ts">
import { ref } from 'vue'
import {
  VTextField,
  VTextarea,
  VBtn,
  VCard,
  VCardText,
  VCardActions
} from 'vuetify/components'


const props = defineProps<{
  initialData?: { title: string; description: string }
}>()


const title = ref(props.initialData?.title ?? '')
const description = ref(props.initialData?.description ?? '')


const emit = defineEmits<{
  (e: 'submit', p: { title: string; description: string }): void
}>()

function submitForm () {
  if (title.value.trim() && description.value.trim()) {
    emit('submit', { title: title.value, description: description.value })
    // Ryd kun felter hvis det er en *opret*-form
    if (!props.initialData) {
      title.value = ''
      description.value = ''
    }
  }
}
</script>

<template>
  <v-card class="pa-4 mb-4">
    <v-card-text>
      <v-text-field
        v-model="title"
        label="Titel"
        dense
        outlined
        required
      />
      <v-textarea
        v-model="description"
        label="Beskrivelse"
        dense
        outlined
        required
      />
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="submitForm">
        {{ props.initialData ? 'Gem' : 'Opret' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
