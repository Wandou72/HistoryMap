<template>
  <componentD/>
</template>

<script>
import componentD from './components/componentD.vue'
//import * as d3 from 'd3'
export default {
  name: 'App4',
  components: {
    componentD
  },
	data(){
		return {
			heightD:this.$store.state.height * 0.5,
			widthD:this.$store.state.width * 0.3
		}
	},
	mounted(){
		this.$store.commit({
			type : 'changeApp',
			app :'app4',
			width:this.widthD,
			height:this.heightD,
			top:this.$store.state.height * 0.5 + 25,
			left: 20
		})
		
		
		//.style("background-color","blue")
	}
}
</script>

<style>
#app4 {
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
