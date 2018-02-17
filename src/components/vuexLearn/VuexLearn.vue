<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>directState:{{ $store.state.count }}</p>
    <p>computedMethod:{{ localCompute }}</p>
    <p>mapStateMethod:{{ initialCount }}</p>
    <p>mapStateArrayParamMethod:{{ count }}</p>
    <p>gettersMul:{{ countGetters }}</p>
    <p>gettersDivide: {{ divideGetters }}</p>
    <!-- <p>module: {{ module }}</p> -->
    <p>
      <button @click="add(2)">Add</button>
      <button @click="reduce">Reduce</button>
      <button @click="addAction">AddAction</button>
      <button @click="reduceAction">ReduceAction</button>
      <button @click="asynAction">AsynAction</button>
    </p>
  </div>
</template>

<script>
import store from '@/components/vuexLearn/vuexStore'
import { mapState, mapMutations,mapGetters,mapActions } from 'vuex' //mapState、mapMutations輔助函數
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
    }),
    ...mapState(['count']),
    countGetters () {
      return this.$store.getters.mulOperation
    },
    //将this.divide映射为`this.$store.getters.divideOperation`
    ...mapGetters({
      divideGetters: "divideOperation"
    })
    // module () {
    //   return this.$store.state.A.count
    // }
  },
  methods: { 
    add (n) {
      this.$store.commit('add',n)
    },
    ...mapMutations([
      'reduce'// 将 `this.reduce()` 映射为 `this.$store.commit('reduce')`
    ]),
    addAction () {
      this.$store.dispatch('addAction')
    },
    ...mapActions(["reduceAction", "asynAction"]),
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,h2 {
  font-weight: normal;
}
</style>
