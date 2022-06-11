<template>
  <componentA />
  
  
</template>

<script>
import componentA from './components/componentA.vue'

//import * as d3 from 'd3'
export default {
	name: 'App',
	components: {
		componentA,
	},
		data(){
			return {
				heightA:this.$store.state.height * 0.5,
				widthA:this.$store.state.width * 0.3
			}
		},
		mounted(){
			this.$store.commit({
				type : 'changeApp',
				app :'app',
				width:this.widthA,
				height:this.heightA,
				top:15,
				left:20
			})
		},
		
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  top: 15px;
  left:20px;
  border:1px solid mediumseagreen;
  display:inline-block;
  position:absolute
}
</style>
