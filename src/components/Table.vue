<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { getAllGenres } from '../services/api.service'
import type { MusicBrainzDta } from '@/helpers/data.interface'
import Paginator from './Paginator.vue'

let pageSize: number = 10
let totalCount: number = 0
let currentPage: number = 0
let pageCount: Ref<number> = ref(0)
const pageOptions: number[] = [10, 20, 50, 100]
let genres: Ref<MusicBrainzDta> = ref({ 'genre-count': 0, 'genre-offset': 0, genres: [] })

onMounted(() => {
  getGenres()
})

const onChangeSelector = () => {
  currentPage = 0
  getGenres()
}

const goToPage = (page: number) => {
  currentPage = page
  getGenres()
}

const getGenres = async () => {
  const offset = currentPage * pageSize
  const response = await getAllGenres(pageSize, offset)
  totalCount = response['genre-count']
  genres.value = response
  setPageCount()
}

const setPageCount = () => {
  pageCount.value = Math.floor(totalCount / pageSize)
}
</script>

<template>
  <div class="container">
    <div class="row">
      <Paginator :page-count="pageCount" :go-to-page="goToPage" :current-page="currentPage" />
    </div>
    <div class="row">
      <div class="selector mt-5">
        <h3>Registros por página</h3>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="pageSize"
          @change="onChangeSelector">
          <option v-for="page in pageOptions">{{ page }}</option>
        </select>
      </div>
    </div>
    <div class="table-responsive-md table-responsive-sm">
      <table class="table table-striped mt-5">
        <thead>
          <th class="p-2">ID</th>
          <th class="p-2">Name</th>
          <th class="p-2">Disambiguation</th>
        </thead>
        <tbody>
          <tr v-for="genre in genres.genres">
            <td>{{ genre.id }}</td>
            <td>{{ genre.name }}</td>
            <td>{{ genre.disambiguation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
