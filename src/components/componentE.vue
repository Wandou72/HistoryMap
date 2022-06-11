<template>
	
    <svg id = "svgF" >
		
	</svg>

</template>

<script>
import * as d3 from "d3"

import axios from 'axios'

export default {
	name: 'componentC',
	data(){
		return {
			heightF:this.$store.state.height * 0.6,
			widthF:this.$store.state.width * 0.3,
			hovered:'',
			nodesLength:0,
			
		}
	},
	mounted(){
		this.$store.commit({
			type :"appendLine",
			id :'lineA',
			svg :'svgA',
			width:this.widthA,
			height:this.heightA * 2 / 3 - 20,
			color: 'mediumseagreen',
			stroke:1
		});
		
		d3.select("#svgF")
		.attr("width",this.widthF)
		.attr("height",this.heightF);
		
		
	},
	computed:{
		
	},
	methods:{
		
	},
	watch:{
		
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
rect{
	height:20px;
	width:50px;
	fill:#42B983
}
</style>
