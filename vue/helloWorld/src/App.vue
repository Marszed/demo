<template>
    <div class="container">
        <h1>Hello World</h1>
        <h5>Today: {{ date }}</h5>
        <div>
            <button @click="del">自减</button><span>{{ count }}</span><button @click="add">自增</button>
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
      methods: {
        del() {
          this.count -= 1
        },
        add() {
          this.count += 1
        },
      },
    }
</script>

<style scoped>
    .container {
        background-color: #bfbfbf;
    }
</style>
