<template>
  <componentF/>
</template>

<script>
import componentF from './components/componentF.vue'
export default {
  name: 'App6',
  components: {
    componentF
  },
	data(){
		return {
			heightF:this.$store.state.height * 0.6 ,
			widthF:this.$store.state.width * 0.3
		}
	},
	mounted(){
		this.$store.commit({
			type : 'changeApp',
			app :'app6',
			width:this.widthF,
			height:this.heightF,
			top:25 +this.$store.state.height * 0.4,
			left:this.$store.state.width * 0.7 + 30 +10
		})
	}
}
</script>

<style>
#app6{
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
