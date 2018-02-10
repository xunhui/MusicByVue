<template>
  <div class="recommend">
	{{ name }}
	<test place="daye"></test>
  </div>
</template>

<script>
import test from './test'
export default {
  name: 'app',
  data () {
  	return {
  		name: 'recommend'
  	}
  },
  components: {
  	test
  }
}
</script>

<style lang="scss">
$maincolor: #2c3e50;
</style>
