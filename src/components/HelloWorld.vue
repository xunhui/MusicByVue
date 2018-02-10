<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>MethodOne:{{ $store.state.count }}</p>
    <p>MethodTwo:{{ localCompute }}</p>
    <p>MethodThree:{{ initialCount }}</p>
    <p>
      <button @click="add(3)">Add</button>
      <button @click="reduce">Reduce</button>
    </p>
  </div>
</template>

<script>
import store from '@/components/vuexLearn/vuexStore'
import { mapState, mapMutations } from 'vuex' //mapState、mapMutations輔助函數
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Vuex',
    }
  },
  computed: {
    localCompute () {
      return this.$store.state.count;
    },
    //使用对象展開运算符将此对象混入到外部对象中
    ...mapState({
      initialCount: state => state.count
    })
  },
  methods: mapMutations([
    'add', //将 `this.add(n)` 映射为 `this.$store.commit('add',n)`
    'reduce'// 将 `this.reduce()` 映射为 `this.$store.commit('reduce')`
  ]),
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,h2 {
  font-weight: normal;
}
</style>
