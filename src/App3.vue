<template>
   <componentC />
</template>

<script>
import componentC from './components/componentC.vue'

export default {
  name: 'App3',
  components: {
    componentC
  },
	data(){
		return {
			heightC:this.$store.state.height * 0.4 ,
			widthC:this.$store.state.width * 0.3
		}
	},
	mounted(){
		this.$store.commit({
			type : 'changeApp',
			app :'app3',
			width:this.widthC,
			height:this.heightC,
			top:15,
			left:this.$store.state.width * 0.7 + 30 +10
		})
	}
}
</script>

<style>
#app3 {
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
