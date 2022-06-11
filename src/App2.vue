<template >
  <componentB />

</template>

<script>
import componentB from './components/componentB.vue'
export default {
  name: 'App2',
  components: {
    componentB
  },
	data(){
		return {
			heightB:this.$store.state.height * 1+10,
			widthB:this.$store.state.width * 0.4
		}
	},
	mounted(){
		this.$store.commit({
			type : 'changeApp',
			app :'app2',
			width:this.widthB,
			height:this.heightB,
			top:15,
			left:this.$store.state.width * 0.3 + 30 
		})
	}
}
</script>

<style>
#app2 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
  border:1px solid mediumseagreen;
  display:inline-block;
  position:absolute
}
</style>
