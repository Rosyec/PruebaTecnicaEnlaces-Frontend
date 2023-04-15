<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { getAllGenres } from '../services/api.service'
import type { MusicBrainzDta } from '@/helpers/data.interface'

let pageSize: number = 10;
let totalCount: number = 0;
let currentPage: number = 0;
let pageCount: Ref<number> = ref(0);
const pageOptions: number[] = [10, 20, 50, 100];
let genres: Ref<MusicBrainzDta> = ref({ 'genre-count': 0, 'genre-offset': 0, genres: [] });

onMounted(() => {
  getGenres()
})

const getGenres = async () => {
  const offset = currentPage * pageSize;
  const response = await getAllGenres(pageSize, offset)
  totalCount = response['genre-count'];
  genres.value = response
  setPageCount()
}

const setCurrentRegistersByPage = () => {
  getGenres()
}

const setPageCount = () => {
  pageCount.value = Math.ceil(totalCount / pageSize);
}

const goToPage = ( page: number ) => {
  currentPage = page;
  getGenres()
}
</script>

<template>
  <div class="content">
    <div class="selector mt-5">
      <h3>Registros por página</h3>
      <select class="form-select" aria-label="Default select example" v-model="pageSize" @change="setCurrentRegistersByPage">
        <option v-for="page in pageOptions"> {{ page }} </option>
      </select>
    </div>
    <div class="paginator mt-5">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" @click="goToPage(0)"> {{ 1 }} </a>
          </li>
          <li class="page-item" v-for="page in pageCount">
            <a class="page-link" href="#" @click="goToPage(page)"> {{ page + 1 }} </a>
          </li>
        </ul>
      </nav>
    </div>
    <table class="table table-striped mt-5">
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Disambiguation</th>
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
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.paginator {
  width: 120vh;
}

.paginator > nav {
  overflow-x: scroll;
}
</style>
