<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue';
import { getAllGenres } from '../services/api.service'
import type { MusicBrainzDta } from '@/helpers/data.interface';

let allGenres: Ref<MusicBrainzDta> = ref({"genre-count": 0, "genre-offset": 0, genres: []});

  onMounted(()=> {
    getGenres();
  });


  const getGenres = async () => {
    const response = await getAllGenres(50, 10);
    allGenres.value = response
  }


</script>

<template>
  <table class="table table-striped mt-5">
    <thead>
      <th>ID</th>
      <th>Name</th>
      <th>Disambiguation</th>
    </thead>
    <tbody>
      <tr v-for="genre in allGenres.genres">
        <td> {{ genre.id }} </td>
        <td> {{ genre.name }} </td>
        <td> {{ genre.disambiguation }} </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
