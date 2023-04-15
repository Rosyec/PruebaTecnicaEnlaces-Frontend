<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  pageCount: { type: Number, required: true },
  goToPage: { type: Function as PropType<(page: number) => void>, required: true },
  currentPage: { type: Number, required: true }
})
</script>

<template>
  <div class="paginator mt-5">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" :class="{ active: currentPage === 0 }" href="#" @click="goToPage(0)"> {{ 1 }} </a>
        </li>
        <li class="page-item" v-for="page in pageCount">
          <a class="page-link" :class="{ active: page === currentPage }" href="#" @click="goToPage(page)"> {{ page + 1 }} </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.paginator {
  width: 50vh;
}

.paginator > nav {
  overflow-x: scroll;
}

.active {
    background-color: dodgerblue;
}

</style>
