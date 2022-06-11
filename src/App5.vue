<template>
	<!-- <graph v-show = 'graphBtn'></graph>
	<graph2 v-show = 'graphBtn'></graph2> -->
  <graphNew v-show = 'graphBtn'></graphNew>
  <storyText v-if = 'graphBtn && this.$store.state.story.btn'></storyText>
</template>

<script>
//import * as d3 from 'd3'
/* import graph from './components/graph.vue'
import graph2 from './components/graph2.vue' */
import graphNew from './components/graphNew.vue'
import storyText from './components/storyText.vue'
export default {
  name: 'App5',
  components: {
    graphNew,storyText
  },
	data(){
		return {
			height:this.$store.state.height * 0.9 ,
			width:this.$store.state.width * 0.9
		}
	},
	mounted(){
		
	},
	computed:{
		graphBtn(){
			return this.$store.state.graphBtn
		}
	}
}
</script>

<style >
#app5 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
 
  
  display:inline-block;
  
}
</style>
