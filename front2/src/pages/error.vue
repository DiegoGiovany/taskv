<script>
export default {
  props: {
    code: Number,
    message: String
  }
}
</script>


<template>
  <div class="min-h-full flex-1">

    <div class=" mt-20 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div>
          <h2 class="mt-6 text-5xl font-extrabold text-gray-900">Erro {{ code }}  </h2>
          <h2 class="mt-6 text-2xl font-extralight text-gray-600">{{ message }} </h2>
        </div>
    </div>
  </div>
</template>


<style scoped>
a {
  color: #42b983;
}
</style>
