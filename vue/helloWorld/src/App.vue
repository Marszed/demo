<template>
    <div class="container">
        <h1>Hello World</h1>
        <h5>Today: {{ date }}</h5>
        <div>
            <button>自减</button><span>{{ count }}</span><button>自增</button>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'App',
      data() {
        return {
          count: 0,
          date: new Date().toISOString()
        }
      },
    }
</script>

<style scoped>
    .container {
        background-color: #bfbfbf;
    }
</style>
