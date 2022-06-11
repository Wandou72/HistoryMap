<template>
  
  <div id = 'test' >
 
    <template v-for = '(d,i) in story'
    :key = 'i'>
      <p class = 'main'>{{d.main}} </p>
      <template v-for = '(j,k) in d.sub'
      :key = 'k'>
        <template v-if = 'j.desc'>
         <img :src = 'img64[j.id]'/>
         <span :class = 'k&1 == 1? "left":"right"'>{{j.desc}}</span>
        </template>
      </template>
   
    
    </template>
    
  </div>
</template>

<script>
  //import * as d3 from 'd3'
  export default{
    name:'storyText',
    
    data(){
      return {
        count:0
      }
    },
    computed:{
      img64(){
        console.log("screenShots",this.$store.state.screenShot[0])
        return this.$store.state.screenShot
      },
      story(){
        return this.$store.state.story.text
      }
    },
    methods:{
      
     
    }
    
    
  }
  
</script>

<style>
  #test{
    height:700px;
    width:800px;
    background-color: #ffffff;
    position:absolute;
    
    left:200px;
    
    top:150px;
    box-shadow: 5px 5px 10px rgb(255, 255, 255);
    border-radius: 20px;
    overflow:auto;
    padding:20;
    border: 1px solid rgba(0, 0, 0, 1);
    
  }
  p.main{
    font-weight:bold;
    margin: 0 auto;
    font-size:24px;
    padding:40px;
    white-space: pre-line;
  }
  span.left{
    float:left;
    margin-top:120px;
    font-weight:bold;
    margin-left: 0px;
    width:350px;
    font-size:20px;
    padding:20px;
    white-space: pre-line;
  }
  span.right{
     float:right;
    margin-top:150px;
    font-weight:bold;
    margin-left: 0px;
    width:350px;
    font-size:20px;
    padding:20px;
    white-space: pre-line;
  }
  img{
    margin-left:20px;
    display: inline-block;
    height:350px;
    width:350px;
    border:3px solid rgba(124, 187, 87, 0.973);
    border-radius: 25px;
  }
</style>
