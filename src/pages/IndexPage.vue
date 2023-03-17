<script setup lang="ts"></script>

<template>
  <q-page class="index-page">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Incremental Game! v0.1</div>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-btn :to="{ path: '/game' }" flat>New Game</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style lang="scss">
.index-page {
  margin: 0 auto;
  margin-top: 20px;
  max-width: 400px;
}
</style>
