<template>
	
    <svg id = "svgB" >
		<!-- <rect @click = 'ale()'></rect> -->
		<!-- <text id = 'txt23' >click to show</text> -->
		<!-- <rect @click = 'ale()'></rect> -->
		<rect
	x = 0
	:y = 'heightB - 50'
	height = 50
	width = 60
	fill = 'orange'>
	</rect>
	<text
	dx = 30
	:dy = 'heightB - 17'
	text-anchor = 'middle'
	fill = 'white'
	font-size = 25
	font-weight = 'bold'
	>C
	</text>
	</svg>
	<svg id = 'svgB2'>
		
	</svg>

</template>

<script>
import * as d3 from "d3"

//import axios from 'axios'

export default {
	name: 'componentB',
	data(){
		return {
			heightB:this.$store.state.height * 0.85,
			widthB:this.$store.state.width * 0.4,
			heightB2:this.$store.state.height * 0.15+5,
			reportFlag:false,
			
				storyFlag:false,
				storyIndex:0,
				story:{
					
				list:['a1','is','a','a2','semiconductor','display','enterprise,',
						'with','a','total','of','a3','patents ','in','the','semiconductor',
						'display','industry.','The','main','secondary','industry','of','a1',
						'is','a4',',','with','a5','patents.','Its','overall','industrial',
						'distribution','involves','a6','secondary','industries','and','a7','leaf',
						'industries,','of','which','a8','has','the','largest','number','of','patents',
						'reaching','a9','patents.']
			}
		}
	},
	mounted(){
		this.$store.commit({
			type:'appendBtn',
			svgID:'svgB2',
			btnID:'Bbtn',
			width:this.widthB,
			text:'next'
		})
		d3.select("#Bbtn")
		.style("display",'none')
		.attr("transform",'translate('+[this.widthB-70,3]+')')
		.on("click",()=>{
			
			this.storyIndex==1? this.storyIndex = 2:this.storyIndex = 1
		})
		
		
		d3.select("#svgB")
		.attr("width",this.widthB)
		.attr("height",this.heightB)
		d3.select("#svgB2")
		.attr("width",this.widthB)
		.attr("height",this.heightB2)
		d3.select("#svgB2").append("g").attr("id",'storyText')
		this.$store.commit({
			type :"appendLine",
			id :'lineB',
			svg :'svgB2',
			width:this.widthB,
			height:1,
			color: 'mediumseagreen',
			stroke:1
		});
		//.attr("margin-left",this.$store.state.width * 0.3)
		d3.select("#svgB").append("g").attr("id","gDia")
		d3.select("#svgB").append("g").attr("id","gLinks1")
		d3.select("#svgB").append("g").attr("id",'gCircles1')
		d3.select("#svgB").append("g").attr("id","gLinks2")
		d3.select("#svgB").append("g").attr("id",'gCircles2')
		d3.select("#svgB").append("g").attr("id",'gTag1')
		d3.select("#svgB").append("g").attr("id",'gTag2')
		d3.select("#svgB").append("g").attr("id","report")
		.attr("transform",'translate('+[0,20]+')')
		
		d3.select("#svgB").append('g').attr("id",'splitBtn')
		.style("cursor",'pointer')
		.style("display",'none')
		.on("click",()=>{
			// here
			this.$store.commit('objBSplitFlag')
		})
		.attr("transform","translate("+ [this.widthB/7 * 5 - 45,0] +")");
		d3.select("#splitBtn").append("rect").attr("height",30).attr("width",55)
		.attr("x",30)
		.attr("y",30)
		.attr("rx",15)
		.style("fill","#939393");
		d3.select("#splitBtn").append("circle")
		.attr("cx",45)
		.attr("cy",45)
		.attr("r",13)
		.style("fill","white");
		d3.select("#splitBtn").append("text")
		.attr("text-anchor",'middle')
		.attr("dx",57.5)
		.attr("dy",26)
		.attr("font-family", "sans-serif")
		.attr("font-size", "14px")
		.attr("font-weight", "bold")
		.text("split")
		
		d3.select("#svgB").append('g').attr("id",'reportBtn')
		.style("cursor",'pointer')
		.style("display",'none')
		.on("click",()=>{
			
			if(this.reportFlag){
				this.reportFlag = false
				/*
				this.$store.commit({
					type:'userClick',
					view:'viewB',
					width:this.widthB,
					height:this.heightB,
					obj:'report(button)',
					name:this.treeData[0] +'vs'+this.treeData[1],
					value:'report:false',
          data:{
            industry:'',
            company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
            province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
            attribute:'comparison'
          }
          
					
				})*/
			}
			else{
				this.reportFlag = true
				/*
				this.$store.commit({
					type:'userClick',
					view:'viewB',
					width:this.widthB,
					height:this.heightB,
					obj:'report(button)',
					name:this.treeData[0] +'vs'+this.treeData[1],
					value:'report:true',
          data:{
            industry:'',
            company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
            province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
            attribute:'comparison'
          }
				})*/
			}
		})
		.attr("transform","translate("+ [this.widthB/7 * 5 +50,0] +")");
		d3.select("#reportBtn").append("rect").attr("height",30).attr("width",55)
		.attr("x",30)
		.attr("y",30)
		.attr("rx",15)
		.style("fill","#939393");
		d3.select("#reportBtn").append("circle")
		.attr("cx",45)
		.attr("cy",45)
		.attr("r",13)
		.style("fill","white");
		
		d3.select("#reportBtn").append("text")
		.attr("text-anchor",'middle')
		.attr("dx",57.5)
		.attr("dy",26)
		.attr("font-family", "sans-serif")
		.attr("font-size", "14px")
		.attr("font-weight", "bold")
		.text("report")
		
		d3.select("#svgB").append("text").attr("id","Btitle")
		.attr("dx","24px")
		.attr("dy","36px")
		.attr("font-family", "sans-serif")
		.attr("font-size", "24px")
		.attr("font-weight", "bold")
		.style("fill","black")
		.attr("text-anchor","start")
		.text(this.rootName + '产业树对比图')
		//.text("半导体显示产业树对比图")
		.style("display","none");
		
		d3.select("#svgB").append("text").attr("id","Bleft")
		.attr("dx",20)
		.attr("text-anchor","start")
		.attr("dy",this.heightB/8)
		.attr("font-family", "sans-serif")
		.attr("font-size", "13px")
		.attr("font-weight", "bold")
		.style("fill","#000000")
		.style("cursor","pointer")
		.on("click",()=>{
			
		this.$store.commit({
			type :'delTreeData',
			index:'left'
		})
		this.$store.commit('synTreeData')
			////////console.log(this.treeData)
		})
		//.text("江苏三月科技有限公司")
		
		d3.select("#svgB").append("text").attr("id","Bright")
		.attr("dx",this.widthB - 50)
		.attr("text-anchor","end")
		.attr("dy",this.heightB/8)
		.attr("font-family", "sans-serif")
		.attr("font-size", "13px")
		.attr("font-weight", "bold")
		.style("fill","#000000")
		.style("cursor","pointer")
		.on("click",()=>{
			
		this.$store.commit({
			type :'delTreeData',
			index:'right'
        })
		this.$store.commit('synTreeData')
		
		})
		
		//.text("浙江工业大学")
		
		d3.select("#svgB").select("#txt23")
		.attr("dy",60)
		.style("display",'inline')
		
		.on("click",()=>{
			//////console.log(this.asd)
		})
	},
	computed:{
		asd(){
			return this.$store.state.user.actionList
		},
		story_text(){
			let a = d3.select("#storyText")
			return a
		},
		treeD(){
			return this.treeData +'1'
		},
		showBtn(){
			if(this.treeData.length == 2){
				return true
			}
			else{
				return false
			}
		},
		treeTypeFlag(){
			return this.$store.state.treeTypeFlag
		},
		B_nodes1(){
			if(this.treeData[0]){
				let tempDatat = [];
				for(let i = 0;i<this.data_overall.length;i++){
					if(this.treeTypeFlag == 'company'){
						if(this.data_overall[i].comp_name == this.treeData[0] &&
						this.data_overall[i]['name'+(this.depth+1)] == this.rootName){
							tempDatat.push(this.data_overall[i]);
						}
					}
					else if(this.treeTypeFlag == 'province'){
						if(this.data_overall[i].province.substring(0,2) == this.treeData[0].substring(0,2) &&
						this.data_overall[i]['name'+(this.depth+1)] == this.rootName){
							tempDatat.push(this.data_overall[i]);
						}
					}
				}
				let a = this.dataToFlare(tempDatat);
				let B_tree1 = d3.layout.tree()
					.size([(this.heightB *4/5),(this.widthB *4/5 )]);
					
				let b = B_tree1.nodes(a);
				for(let i = 0;i<b.length;i++){
					b[i].x += this.heightB/6;
					b[i].y += this.widthB/20
				}
				return b
			}
			else{
				return []
			}
		},
		B_nodes2(){
			if(this.treeData[1]){
				let tempDatat2 = [];
				for(let i = 0;i<this.data_overall.length;i++){
					if(this.treeTypeFlag == 'company'){
						if(this.data_overall[i].comp_name == this.treeData[1] &&
						this.data_overall[i]['name'+(this.depth+1)] == this.rootName){
							tempDatat2.push(this.data_overall[i]);
						}
					}
					else if(this.treeTypeFlag == 'province'){
						if(this.data_overall[i].province.substring(0,2) == this.treeData[1].substring(0,2) &&
						this.data_overall[i]['name'+(this.depth+1)] == this.rootName){
							tempDatat2.push(this.data_overall[i]);
						}
					}
				}
				let a = this.dataToFlare(tempDatat2);
				let B_tree1 = d3.layout.tree()
					.size([(this.heightB *4/5),(this.widthB *4/5 )]);
				let b = B_tree1.nodes(a);
				return b
			}
			else{
				return []
			}
		},
		B_nodes3(){
			if(this.treeData[1]){
				let tempDatat3 = [];
				for(let i = 0;i<this.data_overall.length;i++){
					if(this.treeTypeFlag =='company'){
						if(this.data_overall[i]['name'+(this.depth+1)] == this.rootName&&(this.data_overall[i].comp_name == this.treeData[0] || this.data_overall[i].comp_name == this.treeData[1])){
							tempDatat3.push(this.data_overall[i]);
						}
					}
					else if (this.treeTypeFlag == 'province'){
						if(this.data_overall[i]['name'+(this.depth+1)] == this.rootName&&(this.data_overall[i].province.substring(0,2) == this.treeData[0].substring(0,2) || this.data_overall[i].province.substring(0,2) == this.treeData[1].substring(0,2))){
							tempDatat3.push(this.data_overall[i]);
						}
					}
				}
				let a = this.dataToFlare(tempDatat3);
				for(let i = 0;i<this.depth;i++){
						a = a.children[0];
				}
				let B_tree1 = d3.layout.tree()
				.size([(this.heightB *4/5),(this.widthB *4/5 )]);
				let b = B_tree1.nodes(a);
				for(let i = 0;i<b.length;i++){
								b[i].x += this.heightB/6;
								b[i].y += this.widthB/20
				}
				//////console.log(b)
				return b
			}
			else {
				return []
			}
		},
		B_nodes4(){
			if(this.treeData[1]){
				let tempDatat3 = [];
				for(let i = 0;i<this.data_overall.length;i++){
					if(this.treeTypeFlag =='company'){
						if(this.data_overall[i]['name'+(this.depth+1)] == this.rootName&&(this.data_overall[i].comp_name == this.treeData[0] || this.data_overall[i].comp_name == this.treeData[1])){
							tempDatat3.push(this.data_overall[i]);
						}
					}
					else if (this.treeTypeFlag == 'province'){
						if(this.data_overall[i]['name'+(this.depth+1)] == this.rootName&&(this.data_overall[i].province.substring(0,2) == this.treeData[0].substring(0,2) || this.data_overall[i].province.substring(0,2) == this.treeData[1].substring(0,2))){
							tempDatat3.push(this.data_overall[i]);
						}
					}
				}
				let a = this.dataToFlare(tempDatat3);
				for(let i = 0;i<this.depth;i++){
						a = a.children[0];
				}
				let B_tree2 = d3.layout.tree()
				.size([(this.heightB *4/5), - (this.widthB*2/5 )]);
				let b = B_tree2.nodes(a);
				for(let i = 0;i<b.length;i++){
								b[i].x += this.heightB/6;
								b[i].y += this.widthB/20
				}
				return b
			}
			else {
				return []
			}
		},
		B_nodes31(){
			let tempdatat = [];
			for(let i = 0;i<this.B_nodes3.length;i++){
				if(this.D1.indexOf(this.B_nodes3[i].name) != -1){
					tempdatat.push(this.B_nodes3[i])
				}
			}
			for(let i = 0;i<tempdatat.length;i++){
				tempdatat[i].y = tempdatat[i].y - (tempdatat[i].y - tempdatat[0].y)/2 
			}
			return tempdatat
			
		},
		B_nodes32(){
			let tempdatat = [];
			for(let i = 0;i<this.B_nodes4.length;i++){
				if(this.D2.indexOf(this.B_nodes4[i].name ) != -1){
					tempdatat.push(this.B_nodes4[i])
				}
			}
			for(let i = 0;i<tempdatat.length;i++){
				tempdatat[i].y  += this.widthB - 80
			
			}
			return tempdatat
			
		},
		
		data_overall(){
			return this.$store.state.data_overall
		},
		rootName(){
			return this.$store.state.objB.rootName
		},
		depth(){
			return this.$store.state.objB.depth
		},
		splited(){
			return this.$store.state.objB.splited
		},
		treeData(){
			return this.$store.state.objB.treeData
		},
		treeDataLength(){
			return this.treeData.length
		},
		flare0(){
			return this.$store.state.objB.flare0
		},
		flare1(){
			return this.$store.state.objB.flare1
		},
		flareSum(){
			return this.$store.state.objB.flareSum
		},
		flareSum2(){
			return this.$store.state.objB.flareSum2
		},
		flareSum3(){
			return this.$store.state.objB.flareSum3
		},
		D1(){
			let tempDatat=[];
			for(let i = 0;i<this.B_nodes1.length;i++){
				tempDatat.push(this.B_nodes1[i].name);
			}
			return tempDatat
		},
		D2(){
			let tempDatat=[];
			for(let i = 0;i<this.B_nodes2.length;i++){
				tempDatat.push(this.B_nodes2[i].name);
			}
			return tempDatat
		},
		D3(){
			let tempDatat=[];

				for(let i = 0;i<this.B_nodes3.length;i++){

						tempDatat.push(this.B_nodes3[i].name);
					
				}
			
			return tempDatat
		}
	},
	methods:{
		appendStory(container,nodeData,storyColor,indexInfo,list,posX,posY,width,fontsize,fontfamily,ref,index,nodeData2){
			let story1 = nodeData;
			let svgB = d3.select("#svgB")
			var a8 = (flag,node,splited,node2,index)=>{
				if(flag == 'create'){
					if(!splited){
						d3.select("#gCircles"+1).selectAll("circle")
						.data(node)
						.filter(d=>d.name == getText('a8'))
						.style("stroke",storyColor)
						.style('stroke-width',2)
						index ==1? hoverTip(getText('a8'),node,this.B_nodes1):hoverTip(getText('a8'),node,this.B_nodes2)
					}
					else if(splited){
						d3.select("#gCircles"+index).selectAll("circle")
						.data(node2)
						.filter(d=>d.name == getText('a8'))
						.style("stroke",storyColor)
						.style('stroke-width',2)
						
						index ==1? hoverTip(getText('a8'),node2,this.B_nodes1):hoverTip(getText('a8'),node2,this.B_nodes2)
						
						
					}
				}
				else if (flag == 'remove'){
					svgB.select("#gCircles1").selectAll("circle")
					.style("stroke-width",1)
					.style("stroke",'black')
					
					svgB.select("#gCircles2").selectAll("circle")
					.style("stroke-width",1)
					.style("stroke",'black')
					
					this.B_TipRemove()
				}
			}
			
			var a6All =(flag,type,node,ref,splited,node2,index)=>{
				let nameL = ['OLED','QLED','应刷显示','TFT-LCD','MiniLED','MicroLED']
				let list1 = [];
				function judgeIn(x,judgeType){
					let flag1 = false;
					if(judgeType == 'secondary'){
						for(let i = 0;i<nameL.length;i++){
							if (nameL[i] == x.name){
								flag1 = true
								list1.push(x.name)
								break
							}
						}
						return flag1
					}
					else if (judgeType == 'leaf'){
						if(!x.children){
							flag1 = true
							list1.push(x.name)
						}
						return flag1
					}
				}
				if(flag == 'create'){
					if(!splited){
						d3.select("#gCircles1").selectAll("circle")
						.data(node)
						.filter(d=>judgeIn(d,type)&&ref.indexOf(d.name)!=-1)
						.style("stroke",storyColor)
						.style("stroke-width",2)
						
						if(list1.length<9){
							for(let i = 0;i<list1.length;i++){
								if(ref.indexOf(list1[i])!=-1){
									index ==1? hoverTip(list1[i],this.B_nodes3,this.B_nodes1):hoverTip(list1[i],this.B_nodes3,this.B_nodes2)
								}
							}
						}
						
					}
					else if(splited){
						d3.select("#gCircles"+index).selectAll("circle")
						.data(node2)
						.filter(d=>judgeIn(d,type)&&ref.indexOf(d.name)!=-1)
						.style("stroke",storyColor)
						.style("stroke-width",2)
						
						if(list1.length<9){
							for(let i = 0;i<list1.length;i++){
								if(ref.indexOf(list1[i]!=-1)){
									index ==1? hoverTip(list1[i],this.B_nodes31,this.B_nodes1):hoverTip(list1[i],this.B_nodes32,this.B_nodes2)
								}
							}
						}
						
					}
					
					
				}
				else if (flag == 'remove'){
					svgB.select("#gCircles1").selectAll("circle")
					.style("stroke-width",1)
					.style("stroke",'black')
					
					svgB.select("#gCircles2").selectAll("circle")
					.style("stroke-width",1)
					.style("stroke",'black')
					
					
					this.B_TipRemove()
				}
			}
			
			var secondary = (node,splited,index,node2,ref)=>{
				let B_tree1 = d3.layout.tree()
					.size([(this.heightB *4/5),(this.widthB *4/5 )]);
				let B_tree2 = d3.layout.tree()
					.size([(this.heightB *4/5),(this.widthB * (-2/5) )]);
				let links;
				if(!splited){
					links = B_tree1.links(node)
					
					svgB.select('#gLinks'+1).selectAll("path")
					.data(links)
					.filter(d=>getParent(d.source,a3Name))
					.style("stroke",storyColor)
					.style("stroke-opacity",0.5)
					//.transition()
					.style("stroke-width",3)
					
					index==1?hoverTip(getSecondary(nodeData,'name'),node,this.B_nodes1):hoverTip(getSecondary(nodeData,'name'),node,this.B_nodes2)
				}
				else if (splited){
					links = B_tree2.links(node2)
					
					links = links.filter(d=>{
							if(ref.indexOf(d.target.name) != -1){
								return d
							}
					})
					
					svgB.select('#gLinks'+index).selectAll("path")
					.data(links)
					.filter(d=>getParent(d.source,a3Name))
					.style("stroke",storyColor)
					.style("stroke-opacity",0.5)
					//.transition()
					.style("stroke-width",3)
					
					index == 1?hoverTip(getSecondary(nodeData,'name'),node2,this.B_nodes1):hoverTip(getSecondary(nodeData,'name'),node2,this.B_nodes2)
				}
				
				

				
				
				
			}
			// eslint-disable-next-line
			var getParent =(x,name)=>{
				let judgeList = [];
				function traverse(node){
					judgeList.push(node);
					if (node.children){
						for(let i = 0;i<node.children.length;i++){
							traverse(node.children[i])
						}
					}
				}
				traverse(this.$store.state.flare)
				
				for(let i = 0;i<judgeList.length;i++){
					if(x.name == judgeList[i].name && judgeList[i].name == name){
						
							return true
						}
						else if (x.name == judgeList[i].name && judgeList[i].parent){
							
							return getParent(judgeList[i].parent,name)
						}
						
					
				}
				
				
			}
			
			var hoverTip=(name,data,data2)=>{
				let pos ;
				let d ;
				for(let i = 0;i<data.length;i++){
					if(data[i].name == name){
						this.splited||name=='半导体显示'? pos={x:data[i].y + 10,y:data[i].x }:pos={x:data[i].y + 50,y:data[i].x +50  };
						d = data[i];
					}
				}
				
				this.B_createTip(d,0,data2,pos)
			}
			
			function getScale(x){
				if(x[0].patent_num<200){
					return 'small-scale'
				}
				else if (x[0].patent_num<1000){
					return 'middle-scale'
				}
				else {
					return 'large-scale'
				}
			}
			
			function getText(x){
				if(x == 'a1'){
					return indexInfo
				}
				else if(x=='a2'){
					return getScale(nodeData)
				}
				else if(x=='a3'){
					return nodeData[0].patent_num
				}
				else if(x == 'a4'){
					return getSecondary(story1,'name')
				}
				else if(x == 'a5'){
					return getSecondary(story1,'max')
				}
				else if(x == 'a6'){
					return getSecondary(story1,'count')
				}
				else if(x == 'a7'){
					return getLeaf(story1,'count')
				}
				else if(x == 'a8'){
					return getLeaf(story1,'name')
				}
				else if(x == 'a9'){
					return getLeaf(story1,'max')
				}
				else {
					return x
				}
			}
			
			function getColor(x){
				if (x=='a1'||x=='a2'||x=='a3'||x=='a4'||x=='a5'||x=='a6'
				||x=='a7'||x=='a8'||x=='a9'){
					return storyColor
				}
				else {
					return '#000000'
				}
			}
			
			function getSecondary(x,flag){
				let sol;
				let max = 0;
				let count = 0;
				for(let i = 0;i<x.length;i++){
					if(judgeSecondary(x[i]) && x[i].patent_num>max ){
						max = x[i].patent_num;
						sol = x[i].name
					}
				}
				
				for(let i = 0;i<x.length;i++){
					if(judgeSecondary(x[i])){
						count++
						
					}
				}
				
				if(flag == 'name'){
					return sol
				}
				else if (flag == 'max'){
					return max
				}
				else if (flag == 'count'){
					return count
				}
			}
			var judgeSecondary=(x)=>{
				let nameL = ['OLED','QLED','应刷显示','TFT-LCD','MiniLED','MicroLED']
				function inNameL(x){
					for(let i = 0;i<nameL.length;i++){
						if (nameL[i] == x){
							return true
							
						}
					}
				}
				let judgeList = [];
				let traverse =(node)=>{
					judgeList.push(node);
					if (node.children){
						for(let i = 0;i<node.children.length;i++){
							traverse(node.children[i])
						}
					}
				}
				
				traverse(this.$store.state.flare)
				
				for(let i = 0;i<judgeList.length;i++){
					if (x.name == judgeList[i].name && inNameL(judgeList[i].name)){
						
						return true
						
					}
				}
			}
			
			function getLeaf(x,flag){
				let sol;
				let max = 0;
				let count = 0;
				for(let i = 0;i<x.length;i++){
					if(!x[i].children && x[i].patent_num>max){
						max = x[i].patent_num;
						sol = x[i].name
					}
				}
				
				for(let i = 0;i<x.length;i++){
					if(!x[i].children){
						count++
					}
				}
				
				if(flag == 'name'){
					return sol
				}
				else if (flag == 'max'){
					return max
				}
				else if (flag == 'count'){
					return count
				}
			}
			
			
			
			if(arguments.length<9){
				fontsize = 14;
			}
			if(arguments.length<10){
				fontfamily = 'simsun, arial'
			}
			let a3Name = getSecondary(nodeData,'name')
			let positionStart = [{x:0,y:0}];
			let startX = 0,startY = 0;
			
			for(let i = 1;i<list.length;i++){
			
				if(list[i-1] == 'a1'){
					if(startX +getText('a1').length * fontsize + list[i].length/2 * fontsize <width){
						startX +=    15+indexInfo.length * fontsize  
						//////console.log(startX)
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
				else if(list[i-1] == 'a2'){
					if(startX +getText('a2').length * fontsize/2 + list[i].length/2 * fontsize <width){
						startX +=    15+getScale(nodeData).length* fontsize/2  
						
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
				else if(list[i-1] == 'a3'){
					
					if(startX +getText('a3').toString().length * fontsize/2 + list[i].length/2 * fontsize <width){
						startX +=    15+nodeData[0].patent_num.toString().length* fontsize/2  
						
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
				else if(list[i-1] == 'a4'){
					//////console.log(judgeSecondary(story1[3]))
					if(startX +getText('a4').toString().length * fontsize + list[i].length/2 * fontsize <width){
						
						startX += 15+getSecondary(nodeData,'name').toString().length * fontsize
						
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
				
				else if(list[i-1] == 'a5'){
					if(startX +getText('a5').toString().length * fontsize/2 + list[i].length/2 * fontsize <width){
						startX +=    15+getSecondary(nodeData,'max').toString().length * fontsize/2
						
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
				else if(list[i-1] == 'a6'){
					if(startX +getText('a6').toString().length * fontsize/2 + list[i].length/2 * fontsize <width){
						startX +=    15+getSecondary(nodeData,'count').toString().length * fontsize/2
						
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
				else if(list[i-1] == 'a7'){
					if(startX +getText('a7').toString().length * fontsize/2 + list[i].length/2 * fontsize <width){
						startX +=    15+getLeaf(nodeData,'count').toString().length * fontsize/2
						
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
				else if(list[i-1] == 'a8'){
					if(startX +getText('a8').toString().length * fontsize + list[i].length/2 * fontsize <width){
						startX +=    15+getLeaf(nodeData,'name').toString().length * fontsize
						
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
				
				else if(list[i-1] == 'a9'){
					if(startX +getText('a9').toString().length * fontsize/2 + list[i].length/2 * fontsize <width){
						startX +=    15+getLeaf(nodeData,'max').toString().length * fontsize/2
						
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
				else {
					if(startX +list[i-1].length * fontsize/2+ list[i].length/2 * fontsize <width){
						startX +=   list[i-1].length>12? fontsize+list[i-1].length * fontsize  /2 + 3:fontsize/2+list[i-1].length * fontsize  /2 + 7
						positionStart.push({x:startX,y:startY})
					}
					else{
						startX = 0;
						startY += fontsize + 5;
						positionStart.push({x:startX,y:startY})
					}
				}
			}
			
			container.selectAll(".storyText")
			.data(list)
			.enter()
			.append("text")
			.attr("class",'storyText')
			.attr('dx',(d,i)=>positionStart[i].x +posX)
			.attr('dy',(d,i)=>positionStart[i].y + posY)
			.style('font-size',fontsize)
		
			.style('fill',d=>getColor(d))
			.style("font-weight",'bold')
			.text(d=>getText(d))
			
			container.selectAll(".storyText")
			.data(list)
			.transition()
			.attr('dx',(d,i)=>positionStart[i].x +posX)
			.attr('dy',(d,i)=>positionStart[i].y + posY)
			.style('font-size',fontsize)
			.style("font-family",fontfamily)
			.style('fill',d=>getColor(d))
			.text(d=>getText(d))
			
			container.selectAll(".storyText")
			.data(list)
			.exit()
			.remove()
			
			container.selectAll(".storyText")
			.data(list)
			.filter(d=>d =='a3'||d=='a1'||d=='a2')
			.on("mouseover",()=>{
				this.$store.commit({
					type:'userMouseover',
				})
				this.splited? hoverTip('半导体显示',nodeData2,nodeData):hoverTip('半导体显示',this.B_nodes3,nodeData)})
			.on("mouseout",()=>{
				/*
				this.$store.commit({
					type:'userMouseout',
					view:'viewB',
					obj:'tips(text)',
					name:getText('a1')+':overall',
					value:getText('a3'),
					width:this.widthB,
					height:this.heightB,
          data:{
            industry:'',
            company:this.treeTypeFlag == 'company'?[getText('a1')]:[],
            province:this.treeTypeFlag == 'province'?[getText('a1')]:[],
            attribute:'overall'
          }
				})*/
				//this.shot('app2')
				this.B_TipRemove()})
			
			container.selectAll(".storyText")
			.data(list)
			.filter((d)=> d == 'a4'|| d== 'a5')
			.on("mouseover",()=>{
				this.$store.commit({
					type:'userMouseover',
				})
				secondary(this.B_nodes3,this.splited,index,nodeData2,ref)})
			.on("mouseout",()=>{
				svgB.selectAll("path")
				.style("stroke",'black')
				.style("stroke-opacity",0.5)
				.style("stroke-width",1);
				/*
				this.$store.commit({
					type:'userMouseout',
					view:'viewB',
					obj:'tips(text)',
					name:getText('a1') + ':main',
					value:getText('a5'),
					width:this.widthB,
					height:this.heightB,
          data:{
            industry:getText('a4'),
            company:this.treeTypeFlag == 'company'?[getText('a1')]:[],
            province:this.treeTypeFlag == 'province'?[getText('a1')]:[],
            attribute:'patent_num'
          }
				})*/
				//this.shot('app2')
				this.B_TipRemove()
			})
			container.selectAll(".storyText")
			.data(list)
			.filter(d=>d =='a6')
			.on("mouseover",()=>{
				this.$store.commit({
					type:'userMouseover',
				})
				a6All('create','secondary',this.B_nodes3,ref,this.splited,nodeData2,index)})
			.on("mouseout",()=>{
				//this.shot('app2')
				/*
				this.$store.commit({
					type:'userMouseout',
					view:'viewB',
					obj:'tips(text)',
					name:getText('a1') + ':secondary',
					value:getText('a6'),
					width:this.widthB,
					height:this.heightB,
          data:{
            industry:'',
            company:this.treeTypeFlag == 'company'?[getText('a1')]:[],
            province:this.treeTypeFlag == 'province'?[getText('a1')]:[],
            attribute:'overall'
          }
				})
				*/
				a6All('remove','secondary')})
			
			container.selectAll(".storyText")
			.data(list)
			.filter(d=>d =='a7')
			.on("mouseover",()=>{
				this.$store.commit({
					type:'userMouseover',
				})
				a6All('create','leaf',this.B_nodes3,ref,this.splited,nodeData2,index)}
				)
			.on("mouseout",()=>{
				//this.shot('app2')
				/*
				this.$store.commit({
					type:'userMouseout',
					view:'viewB',
					obj:'tips(text)',
					name:getText('a1') + ':leaf',
					value:getText("a7"),
					width:this.widthB,
					height:this.heightB,
          data:{
            industry:'',
            company:this.treeTypeFlag == 'company'?[getText('a1')]:[],
            province:this.treeTypeFlag == 'province'?[getText('a1')]:[],
            attribute:'overall'
          }
				})
				*/
			a6All('remove','leaf',this.B_nodes3,ref,this.splited,nodeData2,index)})
			
			container.selectAll(".storyText")
			.data(list)
			.filter(d=>d =='a8' || d == 'a9')
			.on('mouseover',()=>{
				this.$store.commit({
					type:'userMouseover',
				})
				a8('create',this.B_nodes3,this.splited,nodeData2,index)})
			.on('mouseout',()=>{
				/*
				this.$store.commit({
					
					type:'userMouseout',
					view:'viewB',
					obj:'tips(text)',
					name:getText('a1') + ':largest leaf',
					value:getText('a8') + ':' + getText('a9'),
					width:this.widthB,
					height:this.heightB,
          data:{
            industry:getText('a8'),
            company:this.treeTypeFlag == 'company'?[getText('a1')]:[],
            province:this.treeTypeFlag == 'province'?[getText('a1')]:[],
            attribute:'patent_num'
          }
				})
				*/
			a8('remove')})
			
		},
		B_report(){
			function B_createTip2(dataset,i){
				function mouseXY(e){
								e=e||window.event;
								return { "x": e.offsetX, "y": e.offsetY };
							}
				let XY = mouseXY(event);
				
				d3.select("#svgB").append("rect")
				.attr("id","tipBack")
				.attr("class","tips2")
				.attr("x", XY.x+10)
				.attr("y",XY.y-30)
				.style("width",150)
				.attr("rx",20);
				
				d3.select("#svgB").append("text")
				.attr("class","tips2")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y-5)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text(dataset[0].children[i].name)
				
				d3.select("#svgB").append("text")
				.attr("class","tips2")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y+15)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text('专利数:' + dataset[0].children[i].patent_num)
			}
			function B_TipRemove2(){
				d3.select("#svgB").selectAll(".tips2").remove()
			}
			let widthB = this.widthB
			function renderPie(a,b,dx,dy,group,name,title){
				if(a+b != 0){
					let fill = ["#5975ff","#4cde71"]
					let data = [
						{startAngle:0,endAngle:a/(a+b) * 2 * Math.PI},
						{startAngle:a/(a+b)*2*Math.PI,endAngle:2 * Math.PI}
					];
					
					let arc = d3.svg.arc().outerRadius(widthB/15)
					.innerRadius(widthB/18)
					
					group.selectAll("."+name)
					.data(data)
					.enter()
					.append("path")
					.attr("transform","translate("+[dx,dy]+")")
					.attr("class",name)
					.classed("tips",true)
					.attr("fill",(d,i)=>fill[i])
					.transition().duration(1000)
					.attrTween("d",function(d){
						var start = {startAngle : 0 , endAngle : 0};
						var interpolate = d3.interpolate(start,d);
						return function(t){return arc(interpolate(t));};
					})
					
					
					group.append("g")
					.attr("class","tips")
					.attr("transform","translate("+[dx,dy]+")")
					.selectAll("."+name)
					.data(data)
					.enter()
					.append("text")
					.attr("class","tips")
					.attr("dx",(d,i)=>i==0? 13:-13)
					.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
					.attr("font-family", "sans-serif")
					.attr("font-size", "16px")
					.attr("font-weight", "bold")
					.attr("text-anchor","middle")
					.style("fill","white")
					.transition().delay(1000)
					.text(function(d,i) { if(d.endAngle - d.startAngle != 0){
						return i == 0? a:b
					} });
					
					group.append("text")
					.attr("dx",dx )
					.attr("dy",dy + widthB/12 + 20)
					.attr("class","tips")
					.attr("font-family", "sans-serif")
					.attr("font-size", "14px")
					.attr("font-weight", "bold")
					.attr("text-anchor","middle")
					.style("fill","white")
					.text(title)
				
				
				}
				
			}
			let backWidth = this.widthB*3/4,backHeight = this.heightB*3/4 + 100;
			let report = d3.select("#svgB").select("#report")
			report.append("rect")
			.attr("id","tipBack")
			.attr("class","tips")
			.attr("x",30)
			.attr("y",30)
			.style("height",backHeight)
			.style("width",backWidth)
			.attr("rx",20)
			//.on("click",reportNext);
			let report_stack = report.append("g").attr("transform","translate("+[50,80]+")");
			let report_title = report.append("g").attr("transform","translate("+[30+this.widthB*3/8,60]+")")
			let report_pie = report.append("g");
			let pie_lgd = report.append("g");
			let stack_scale = d3.scale.linear().domain([0,Math.max(this.B_nodes1[0].patent_num,this.B_nodes2[0].patent_num)]).range([0,this.widthB/2])
			let color_scale = d3.scale.category20c()
			let stack_data1 = [],stack_data2 = [];
			this.B_nodes1[0].children.forEach(function(d,i){
				if(i == 0){
					stack_data1.push({x0:0,x1:d.patent_num})
				}
				else{
					stack_data1.push({x0:stack_data1[i-1].x0+stack_data1[i-1].x1,x1:d.patent_num})
				}
			});
			
			this.B_nodes2[0].children.forEach(function(d,i){
				if(i == 0){
					stack_data2.push({x0:0,x1:d.patent_num})
				}
				else{
					stack_data2.push({x0:stack_data2[i-1].x0+stack_data2[i-1].x1,x1:d.patent_num})
				}
			})
			
			report_title.append("text")
			.attr("id","reportTitle")
			.attr("class","tips")
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("font-weight", "bold")
			.attr("text-anchor","middle")
			.style("fill","white")
			.text(this.rootName + "产业对比分析")
			
			report_stack.append("text")
			.attr("id","stackName1")
			.attr("class","tips")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("text-anchor","start")
			.attr("dx",20)
			.attr("dy",30)
			.style("fill","white")
			.text(this.treeData[0]);
			report_stack.append("text")
			.attr("id","stackName2")
			.attr("class","tips")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("text-anchor","start")
			.attr("dx",20)
			.attr("dy",80)
			.style("fill","white")
			.text(this.treeData[1])
			
			report_stack.append("text")
			.attr("id","stackTag1")
			.attr("class","tips")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("text-anchor","start")
			.attr("dx",()=>stack_scale(this.B_nodes1[0].patent_num) + 25)
			.attr("dy",55)
			.style("fill","white")
			.transition().delay(1500)
			.text(this.B_nodes1[0].patent_num);
			
			report_stack.append("text")
			.attr("id","stackTag2")
			.attr("class","tips")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("text-anchor","start")
			.attr("dx",()=>stack_scale(this.B_nodes2[0].patent_num) + 25)
			.attr("dy",105)
			.style("fill","white")
			.transition().delay(1500)
			.text(this.B_nodes2[0].patent_num);
			
			let B_nodes1 = this.B_nodes1;
			
			report_stack.selectAll(".rect1")
			.data(stack_data1)
			.enter()
			.append("rect")
			.attr("class","rect1 tips")
			.attr("x",x=>stack_scale(x.x0)+20)
			.attr("y",40)
			.attr("width",0)
			.attr("height",20)
			.style("fill",(d,i)=>color_scale(this.B_nodes1[0].children[i].name))
			.on("mouseover",function(d,i){
				d3.select(this)
				.style("stroke","white")
				.style("stroke-width",1)
				B_createTip2(B_nodes1,i)
			})
			.on("mousemove",(d,i)=>{
				B_TipRemove2();
				B_createTip2(this.B_nodes1,i)
			})
			.on("mouseout",function(){
				d3.select(this)
				.style("stroke-width",0)
				B_TipRemove2();
			})
			.transition().duration(500).delay((d,i)=>500*i)
			.attr("width",x=>stack_scale(x.x1));
			
			let B_nodes2 = this.B_nodes2
			
			report_stack.selectAll(".rect2")
			.data(stack_data2)
			.enter()
			.append("rect")
			.attr("class","rect2 tips")
			.attr("x",x=>stack_scale(x.x0)+20)
			.attr("y",90)
			.attr("width",0)
			.attr("height",20)
			.style("fill",(d,i)=>color_scale(this.B_nodes2[0].children[i].name))
			.on("mouseover",function(d,i){
				d3.select(this)
				.style("stroke","white")
				.style("stroke-width",1)
				B_createTip2(B_nodes2,i)
			})
			.on("mousemove",function(d,i){
				B_TipRemove2();
				B_createTip2(B_nodes2,i)
			})
			.on("mouseout",function(){
				d3.select(this)
				.style("stroke-width",0)
				B_TipRemove2();
			})
			.transition().duration(500).delay((d,i)=>500*i)
			.attr("width",x=>stack_scale(x.x1));
			
			//总体优势产业饼图
			let a1 = 0,b1 = 0,a2 = 0,b2 = 0,a3= 0 ,b3 = 0,a4 = 0,a5= 0,b4 = 0,b5 = 0,a6=0,b6=0;
			B_nodes1.forEach((d)=>{
				if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,B_nodes1)>this.B_getPat(d.name,0,this.B_nodes2)){
										a1 ++
				}
				else if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,B_nodes1)<this.B_getPat(d.name,0,this.B_nodes2)){
										b1 ++
				}
			})
			
			B_nodes1.forEach((d)=>{
				if(d.children){
					if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,B_nodes1)>this.B_getPat(d.name,0,this.B_nodes2)){
											a2 ++
					}
					else if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,B_nodes1)<this.B_getPat(d.name,0,this.B_nodes2)){
											b2 ++
					}
				}
			})
			
			B_nodes1.forEach((d)=>{
				if(!d.children){
					if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,B_nodes1)>this.B_getPat(d.name,0,this.B_nodes2)){
											a3 ++
					}
					else if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,B_nodes1)<this.B_getPat(d.name,0,this.B_nodes2)){
											b3 ++
					}
				}
			})
			
			renderPie(a1,b1,130,280,report_pie,"pie1","总体优势产业数")
			renderPie(a2,b2,backWidth/2 +30,280,report_pie,"pie2","非叶优势产业数")
			renderPie(a3,b3,backWidth - 70,280,report_pie,"pie3","叶优势产业数")
			
			B_nodes1.forEach((d)=>{
					if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) == -1 ){
											a6 ++
					}
					
				
			})
			this.B_nodes2.forEach((d)=>{
					if( this.D1.indexOf(d.name) == -1 && this.D2.indexOf(d.name) != -1 ){
											b6 ++
					}
					
				
			})
			
			B_nodes1.forEach((d)=>{
				if(d.children){
					if(  this.D2.indexOf(d.name) == -1 ){
											a4 ++
					}
					
				}
			})
			
			this.B_nodes2.forEach((d)=>{
				if(d.children){
					if( this.D1.indexOf(d.name) == -1){
											b4 ++
					}
					
				}
			})
			B_nodes1.forEach((d)=>{
				if(!d.children){
					if(   this.D2.indexOf(d.name) == -1 ){
											a5 ++
					}
					
				}
			})
			
			this.B_nodes2.forEach((d)=>{
				if(!d.children){
					if( this.D1.indexOf(d.name) == -1  ){
											b5 ++
					}
					
				}
			})
			renderPie(a6,b6,130,450,report_pie,"pie4",'总体特有产业数')
			
			renderPie(a4,b4,backWidth/2+30,450,report_pie,"pie5",'非叶特有产业数')
			renderPie(a5,b5,backWidth - 70,450,report_pie,"pie6","叶特有产业数");
			
			pie_lgd.append("rect")
			.attr("class","tips")
			.attr("height",15)
			.attr("width",15)
			.style("fill","#5975ff")
			.attr("rx",3)
			.attr("x",backWidth/2 + 30 -160)
			.attr("y",450 +this.widthB/12 +50)
			
			pie_lgd.append("text")
			.attr("class","tips")
			.attr("dx",backWidth/2 + 30 - 140)
			.attr("dy",450+this.widthB/12 + 65)
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("text-anchor","start")
			.style("fill","white")
			.text(this.treeData[0])
			
			pie_lgd.append("rect")
			.attr("class","tips")
			.attr("height",15)
			.attr("width",15)
			.style("fill","#4cde71")
			.attr("rx",3)
			.attr("x",backWidth/2 + 30 -160)
			.attr("y",450 +this.widthB/12 +75)
			
			pie_lgd.append("text")
			.attr("class","tips")
			.attr("dx",backWidth/2 + 30 - 140)
			.attr("dy",450+this.widthB/12 + 90)
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("text-anchor","start")
			.style("fill","white")
			.text(this.treeData[1])
			
			
			
		},
		B_TipRemove(){
			d3.select("#svgB").selectAll(".tips").remove()
		},
		B_createTip(d,index,data,pos){
			this.reportFlag=false
			let XY;
			function mouseXY(e){
							e=e||window.event;
							return { "x": e.offsetX, "y": e.offsetY };
						}
			if(arguments.length<4){
				XY = mouseXY(event);
			}
			else if (arguments.length == 4){
				XY = pos;
			}
			let svgB = d3.select("#svgB")
			let tempWidth = d.name.length>8? d.name.length *15 +10 :120
				
			
				if(XY.x>0 && XY.x < this.widthB - tempWidth){
					svgB.append("rect")
					.attr("id","tipBack")
					.attr("class","tips")
					.attr("x", XY.x+10)
					.attr("y",XY.y-30)
					.style("width",tempWidth)
					.attr("rx",20);
					
					svgB.append("text")
					.attr("class","tips")
					.attr("dx",XY.x+20)
					.attr("dy",XY.y-5)
					.attr("text-anchor","start")
					.attr("font-family", "sans-serif")
					.attr("font-size", "14px")
					.attr("font-weight", "bold")
					.attr("fill", "white")
					.text(d.name)
					
					
					svgB.append("text")
					.attr("class","tips")
					.attr("dx",XY.x+20)
					.attr("dy",XY.y+15)
					.attr("text-anchor","start")
					.attr("font-family", "sans-serif")
					.attr("font-size", "14px")
					.attr("font-weight", "bold")
					.attr("fill", "white")
					.text('专利数:'+this.B_getPat(d.name,index,data))
				}
				else{
					svgB.append("rect")
					.attr("id","tipBack")
					.attr("class","tips")
					.attr("x", XY.x-10 -tempWidth)
					.attr("y",XY.y-30)
					.style("width",tempWidth)
					.attr("rx",20);
					
					svgB.append("text")
					.attr("class","tips")
					.attr("dx",XY.x-tempWidth)
					.attr("dy",XY.y-5)
					.attr("text-anchor","start")
					.attr("font-family", "sans-serif")
					.attr("font-size", "14px")
					.attr("font-weight", "bold")
					.attr("fill", "white")
					.text(d.name)
					
					
					svgB.append("text")
					.attr("class","tips")
					.attr("dx",XY.x-tempWidth)
					.attr("dy",XY.y+15)
					.attr("text-anchor","start")
					.attr("font-family", "sans-serif")
					.attr("font-size", "14px")
					.attr("font-weight", "bold")
					.attr("fill", "white")
					.text('专利数:'+this.B_getPat(d.name,index,data))
				}
		},
		B_createTipBar(d,data1,data2){
			
			this.reportFlag=false
			function mouseXY(e){
							e=e||window.event;
							return { "x": e.offsetX, "y": e.offsetY };
						}
			let XY = mouseXY(event);
			let tempWidth = Math.max(d.name.length,this.treeData[0].length,this.treeData[1].length)>8?
				Math.max(d.name.length,this.treeData[0].length,this.treeData[1].length) *15 +10 :120
				
			let scale = d3.scale.linear().domain([0,Math.max(this.B_getPat(d.name,0,data1),this.B_getPat(d.name,0,data2))])
			.range([20,(Math.max(d.name.length,this.treeData[0].length,this.treeData[1].length)>8?
			Math.max(d.name.length,this.treeData[0].length,this.treeData[1].length) *15 -40 :40)
			]);
			let svgB = d3.select("#svgB")
			if(XY.x>0&&XY.x<this.widthB-tempWidth &&XY.y>0&&XY.y<this.widthB-130){
				svgB.append("rect")
				.attr("id","tipBack")
				.attr("class","tips")
				.style("height",160)
				.attr("x", XY.x+10)
				.attr("y",XY.y-30)
				.style("width",tempWidth)
				.attr("rx",20);
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y-5)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				//.text(d.name)
				.text('company ***')
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y+15)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				//.text(this.treeData[0]);
				.text('company X')
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y+35)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text('专利数:'+this.B_getPat(d.name,0,data1))
				
				svgB.append("rect")
				.attr("class","tips")
				.attr("x",XY.x+20)
				.attr("y",XY.y+42)
				.attr("width",0)
				.attr("height",14)
				.attr("rx",5)
				.style("fill","#5975ff")
				.transition()
				.attr("width",scale(this.B_getPat(d.name,0,data1)));
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y+75)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				//.text(this.treeData[1]);
				.text('company Y')
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y+95)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text('专利数:'+this.B_getPat(d.name,0,data2))
				
				svgB.append("rect")
				.attr("class","tips")
				.attr("x",XY.x+20)
				.attr("y",XY.y+102)
				.attr("width",0)
				.attr("height",14)
				.attr("rx",5)
				.style("fill","#4cde71")
				.transition()
				.attr("width",scale(this.B_getPat(d.name,0,data2)))
				
			}
			else if(XY.x>this.widthB-tempWidth && XY.y>0 && XY.y<this.heightB-130){
				svgB.append("rect")
				.attr("id","tipBack")
				.attr("class","tips")
				.style("height",160)
				.attr("x", this.widthB - tempWidth)
				.attr("y",XY.y+10)
				.style("width",tempWidth)
				.attr("rx",20);
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB- tempWidth+10)
				.attr("dy",XY.y+35)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text(d.name)
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB - tempWidth+10)
				.attr("dy",XY.y+55)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				//.text(this.treeData[0] );
				.text('company X')
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB- tempWidth+10)
				.attr("dy",XY.y+75)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text('专利数:'+this.B_getPat(d.name,0,data1))
				
				svgB.append("rect")
				.attr("class","tips")
				.attr("x",this.widthB - tempWidth+10)
				.attr("y",XY.y+82)
				.attr("width",0)
				.attr("height",14)
				.attr("rx",5)
				.style("fill","#5975ff")
				.transition()
				.attr("width",scale(this.B_getPat(d.name,0,data1)));
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB - tempWidth+10)
				.attr("dy",XY.y+115)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				//.text(this.treeData[1]);
				.text('company Y')
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB- tempWidth+10)
				.attr("dy",XY.y+135)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text('专利数:'+this.B_getPat(d.name,0,data2))
				
				svgB.append("rect")
				.attr("class","tips")
				.attr("x",this.widthB- tempWidth+10)
				.attr("y",XY.y+142)
				.attr("width",0)
				.attr("height",14)
				.attr("rx",5)
				.style("fill","#4cde71")
				.transition()
				.attr("width",scale(this.B_getPat(d.name,0,data2)))
			}
			
			else if(XY.x>0 &&XY.x<this.widthB-tempWidth&&XY.y>this.widthB-130){
				
				svgB.append("rect")
				.attr("id","tipBack")
				.attr("class","tips")
				.style("height",160)
				.attr("x", XY.x+10)
				.attr("y",XY.y-130)
				.style("width",tempWidth)
				.attr("rx",20);
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y-105)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text(d.name)
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y-85)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				//.text(this.treeData[0]);
				.text('company X')
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y-65)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text('专利数:'+this.B_getPat(d.name,0,data1))
				
				svgB.append("rect")
				.attr("class","tips")
				.attr("x",XY.x+20)
				.attr("y",XY.y-58)
				.attr("width",0)
				.attr("height",14)
				.attr("rx",5)
				.style("fill","#5975ff")
				.transition()
				.attr("width",scale(this.B_getPat(d.name,0,data1)));
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y-25)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				//.text(this.treeData[1]);
				.text('company Y')
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y-5)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text('专利数:'+this.B_getPat(d.name,0,data2))
				
				svgB.append("rect")
				.attr("class","tips")
				.attr("x",XY.x+20)
				.attr("y",XY.y+2)
				.attr("width",0)
				.attr("height",14)
				.attr("rx",5)
				.style("fill","#4cde71")
				.transition()
				.attr("width",scale(this.B_getPat(d.name,0,data2)))
			}
			else if(XY.x>this.widthB-tempWidth && XY.y>this.heightB-130){
				svgB.append("rect")
				.attr("id","tipBack")
				.attr("class","tips")
				.style("height",160)
				.attr("x", this.widthB - tempWidth)
				.attr("y",XY.y-170)
				.style("width",tempWidth)
				.attr("rx",20);
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB - tempWidth+10)
				.attr("dy",XY.y-145)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text(d.name)
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB - tempWidth+10)
				.attr("dy",XY.y-125)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				//.text(this.treeData[0]);
				.text('company X')
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB- tempWidth+10)
				.attr("dy",XY.y-105)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text('专利数:'+this.B_getPat(d.name,0,data1))
				
				svgB.append("rect")
				.attr("class","tips")
				.attr("x",this.widthB- tempWidth+10)
				.attr("y",XY.y-98)
				.attr("width",0)
				.attr("height",14)
				.attr("rx",5)
				.style("fill","#5975ff")
				.transition()
				.attr("width",scale(this.B_getPat(d.name,0,data1)));
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB- tempWidth+10)
				.attr("dy",XY.y-65)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				//.text(this.treeData[1]);
				.text('company Y')
				
				svgB.append("text")
				.attr("class","tips")
				.attr("dx",this.widthB- tempWidth+10)
				.attr("dy",XY.y-45)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text('专利数:'+this.B_getPat(d.name,0,data2))
				
				svgB.append("rect")
				.attr("class","tips")
				.attr("x",this.widthB- tempWidth+10)
				.attr("y",XY.y-38)
				.attr("width",0)
				.attr("height",14)
				.attr("rx",5)
				.style("fill","#4cde71")
				.transition()
				.attr("width",scale(this.B_getPat(d.name,0,data2)))
				
			}
						
			
		},
		dataToFlare(x){
			var data8 = [];
				var data81 = [];
				for(let i = 0;i<x.length;i++){
					if(x[i].name8){
						data8.push({name:x[i].name8,parent:x[i].name7})
					}
				}
				for(let i = 0;i<data8.length;i++){
					if(i==0){
						data81.push(data8[i])
					}
					else if(data8[i].name!=data8[i-1].name){
						data81.push(data8[i])
					}
				}
				for(let i = 0;i < data81.length;i++){
					let a = 0;
					for(let j = 0;j<x.length;j++){
						if(data81[i].name == x[j].name8){
							a += parseInt(x[j].patent_num)
						}
					}
					data81[i].patent_num = a
				}
				
				var data7 = [];
				var data71 = [];
				for(let i = 0;i<x.length;i++){
					if(x[i].name7){
						data7.push({name:x[i].name7,parent:x[i].name6})
					}
				}
				
				for(let i = 0;i<data7.length;i++){
					if(i==0){
						data71.push(data7[i])
					}
					else if(data7[i].name!=data7[i-1].name){
						data71.push(data7[i])
					}
				}
				for(let i = 0;i < data71.length;i++){
					let a = 0;
					for(let j = 0;j<x.length;j++){
						if(data71[i].name == x[j].name7){
							a += parseInt(x[j].patent_num)
						}
					}
					data71[i].patent_num = a
				}
				//6
				var data6 = [];
				var data61 = [];
				for(let i = 0;i<x.length;i++){
					if(x[i].name6){
						data6.push({name:x[i].name6,parent:x[i].name5})
					}
				}
				for(let i = 0;i<data6.length;i++){
					if(i==0){
						data61.push(data6[i])
					}
					else if(data6[i].name!=data6[i-1].name){
						data61.push(data6[i])
					}	
				}
				for(let i = 0;i < data61.length;i++){
					let a = 0;
					for(let j = 0;j<x.length;j++){
						if(data61[i].name == x[j].name6){
							a += parseInt(x[j].patent_num)
						}
					}
					data61[i].patent_num = a
				}
				//5
				var data5 = [];
				var data51 = [];
				for(let i = 0;i<x.length;i++){
					if(x[i].name5){
						data5.push({name:x[i].name5,parent:x[i].name4})
					}
				}
				for(let i = 0;i<data5.length;i++){
					if(i==0){
						data51.push(data5[i])
					}
					else if(data5[i].name!=data5[i-1].name){
						data51.push(data5[i])
					}
				}
				for(let i = 0;i < data51.length;i++){
					let a = 0;
					for(let j = 0;j<x.length;j++){
						if(data51[i].name == x[j].name5){
							a += parseInt(x[j].patent_num)
						}
					}
					data51[i].patent_num = a
				}
				//4
				var data4 = [];
				var data41 = [];
				for(let i = 0;i<x.length;i++){
					if(x[i].name4){
						data4.push({name:x[i].name4,parent:x[i].name3})
					}
				}
				for(let i = 0;i<data4.length;i++){
					if(i==0){
						data41.push(data4[i])
					}
					else if(data4[i].name!=data4[i-1].name){
						data41.push(data4[i])
					}
				}
				for(let i = 0;i < data41.length;i++){
					let a = 0;
					for(let j = 0;j<x.length;j++){
						if(data41[i].name == x[j].name4){
							a += parseInt(x[j].patent_num)
						}
					}
					data41[i].patent_num = a
				}
				//3
				var data3 = [];
				var data31 = [];
				for(let i = 0;i<x.length;i++){
					if(x[i].name3){
						data3.push({name:x[i].name3,parent:x[i].name2})
					}
				}
				for(let i = 0;i<data3.length;i++){
					if(i==0){
						data31.push(data3[i])
					}
					else if(data3[i].name!=data3[i-1].name){
						data31.push(data3[i])
					}
				}
				for(let i = 0;i < data31.length;i++){
					let a = 0;
					for(let j = 0;j<x.length;j++){
						if(data31[i].name == x[j].name3){
							a += parseInt(x[j].patent_num)
						}
					}
					data31[i].patent_num = a
				}
				//2
				var data2 = [];
				var data21 = [];
				for(let i = 0;i<x.length;i++){
					if(x[i].name2){
						data2.push({name:x[i].name2,parent:x[i].name1})
					}
				}
				for(let i = 0;i<data2.length;i++){
					if(i==0){
						data21.push(data2[i])
					}
					else if(data2[i].name!=data2[i-1].name){
						data21.push(data2[i])
					}
				}
				for(let i = 0;i < data21.length;i++){
					let a = 0;
					for(let j = 0;j<x.length;j++){
						if(data21[i].name == x[j].name2){
							a += parseInt(x[j].patent_num)
						}
					}
					data21[i].patent_num = a
				}
		
				var d1=[],
				d2=[],
				d3=[],
				d4=[],
				d5=[],
				d6=[],
				d7=[];
				//7
				for(let i = 0;i<data71.length;i++){
					let children = [];
					for(let j = 0;j<data81.length;j++){
						if(data71[i].name == data81[j].parent){
							children.push(data81[j])
						}
					}
					if(children.length>0){
					d7.push({name:data71[i].name,children:children,patent_num:data71[i].patent_num})
						}
						else{d7.push({name:data71[i].name,patent_num:data71[i].patent_num})}
				}
				//6
				for(let i = 0;i<data61.length;i++){
					let children = [];
					for(let j = 0;j<d7.length;j++){
						if(data61[i].name == data71[j].parent){
							children.push(d7[j])
						}
					}
					if(children.length>0){
						d6.push({name:data61[i].name,children:children,patent_num:data61[i].patent_num})
							}
							else{d6.push({name:data61[i].name,patent_num:data61[i].patent_num})}
					}
				//5
				for(let i = 0;i<data51.length;i++){
					let children = [];
					for(let j = 0;j<data61.length;j++){
						if(data51[i].name == data61[j].parent){
							children.push(d6[j])
						}
					}
					if(children.length>0){
						d5.push({name:data51[i].name,children:children,patent_num:data51[i].patent_num})
							}
							else{d5.push({name:data51[i].name,patent_num:data51[i].patent_num})}
					}
				//4
				for(let i = 0;i<data41.length;i++){
					let children = [];
					for(let j = 0;j<data51.length;j++){
						if(data41[i].name == data51[j].parent){
							children.push(d5[j])
						}
					}
					if(children.length>0){
						d4.push({name:data41[i].name,children:children,patent_num:data41[i].patent_num})
							}
							else{d4.push({name:data41[i].name,patent_num:data41[i].patent_num})}
					}
				//3
				for(let i = 0;i<data31.length;i++){
					let children = [];
					for(let j = 0;j<data41.length;j++){
						if(data31[i].name == data41[j].parent){
							children.push(d4[j])
						}
					}
					if(children.length>0){
						d3.push({name:data31[i].name,children:children,patent_num:data31[i].patent_num})
							}
							else{d3.push({name:data31[i].name,patent_num:data31[i].patent_num})}
					}
				//2
				for(let i = 0;i<data21.length;i++){
					let children = [];
					for(let j = 0;j<data31.length;j++){
						if(data21[i].name == data31[j].parent){
							children.push(d3[j])
						}
					}
					if(children.length>0){
						d2.push({name:data21[i].name,children:children,patent_num:data21[i].patent_num})
							}
							else{d2.push({name:data21[i].name,patent_num:data21[i].patent_num})}
					}
		
				let t_sum = 0;
				for(let i = 0;i<d2.length;i++){
					t_sum += d2[i].patent_num
				}
				d1={name:"半导体显示",children:d2,patent_num:t_sum};
				
					return d1;
		},
		createNewTree(){
			//////console.log(this.treeDataLength);
			////////console.log(this.flare0)
			if(this.treeData.length == 0){
				this.$store.commit("objBclear")
				// 这里！！
			}
			else if(this.treeData.length == 1){
				let B_tree1 = d3.layout.tree()
					.size([(this.heightB *4/5),(this.widthB *4/5 )]);
				
				let B_links1 = B_tree1.links(this.B_nodes1);
		
				
				let B_diagonal1 = d3.svg.diagonal()
				.projection(function(d){
					return [d.y +10 , d.x ];
				});
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links1)
				.enter()
				.append("path")
				.attr("class","links1")
				.style("fill","none")
				.style("stroke","black")
				.style("stroke-opacity",0.5)
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links1)
				.attr("d",function(d){return B_diagonal1(d);})
				.style("stroke-width",0)
				.transition()
				.style("stroke-width",1)
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links1)
				.exit()
				.remove();
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes1)
				.enter()
				.append("circle")
				.attr("class","circles1")
				.append("title")
				.text(d=>d.name)
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes1)
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x )
				.style("fill","white")
				.style("stroke","black")
				.attr("r",0)
				.on("mouseover",(d)=>{
								this.B_TipRemove();
								d3.select("#gCircles1").selectAll("circle")
								.data(this.B_nodes1)
								.filter(data=>data==d)
								.style("stroke","red");
								this.B_createTip(d,1,this.B_nodes1)
								
								this.$store.commit({
									type:'userMouseover',
								})
				})
				.on("mousemove",(d)=>{
						this.B_TipRemove();
						this.B_createTip(d,1,this.B_nodes1)
				})
				.on("mouseout",(d)=>{
						d3.select("#gCircles1").selectAll("circle")
						.data(this.B_nodes1)
						.filter(data=>data==d)
						.style("stroke","black");
						setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						
						
						this.$store.commit({
							type:'userMouseout',
							view:'viewB',
							obj:'tips(tree nodes)',
							name:this.treeData[0] + ':'+d.name,
							value:d.patent_num,
							width:this.widthB,
							height:this.heightB,
							desc0: 'hover:' + this.treeData[0] + 'in' + d.name,
							desc:'the patent number of ' + this.treeData[0] + ' in ' +d.name + ' is ' + d.patent_num,
							data:{
							industry:d.name,
							company:this.treeTypeFlag == 'company'?[this.treeData[0]]:[],
							province:this.treeTypeFlag == 'province'?[this.treeData[0]]:[],
							attribute:'patent_num'
							}
						})
						this.$store.commit('OutRecordState')
				})
				.transition()
				.attr("r",4);
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes1)
				.exit()
				.remove();
			}
			else if(this.treeData.length == 2){
				
				let B_tree = d3.layout.tree()
				.size([(this.heightB *4/5),(this.widthB*4/5 )]);
			
				let B_links3 = B_tree.links(this.B_nodes3);
				
				let B_diagonal1 = d3.svg.diagonal()
				.projection(function(d){
					return [d.y +10 , d.x ];
				});
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.enter()
				.append("path")
				.attr("class","links1")
				.style("fill","none")
				.style("stroke","black")
				.style("stroke-opacity",0.5)
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.transition()
				.attr("d",function(d){return B_diagonal1(d);})
				.style("stroke-width",1)
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.exit()
				.remove();
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.enter()
				.append("circle")
				.attr("class","circles1")
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.on("click",d=>{
					this.roam(d.name,d.depth)
				})
				.on("mouseover",(d)=>{
								d3.select("#gCircles1").selectAll("circle")
								.data(this.B_nodes3)
								.filter(data=>data==d)
								.style("stroke","red");
								this.B_TipRemove()
								this.B_createTip(d,1,this.B_nodes3)
								
								this.$store.commit({
									type:'userMouseover',
								})
				})
				.on("mousemove",(d)=>{
						this.B_TipRemove();
						this.B_createTip(d,1,this.B_nodes3)
				})
				.on("mouseout",(d)=>{
						d3.select("#gCircles1").selectAll("circle")
						.data(this.B_nodes3)
						.filter(data=>data==d)
						.style("stroke","black");
						setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						let v1 = this.B_getPat(d.name,0,this.B_nodes1)
					let v2 = this.B_getPat(d.name,0,this.B_nodes2)
						this.$store.commit({
							type:'userMouseout',
							view:'viewB',
							obj:'tips(tree nodes)',
							name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
							value:d.patent_num,
							width:this.widthB,
							height:this.heightB,
							desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
							desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
							+ v1 + ' and ' + v2 +' respectively',
							data:{
                industry:d.name,
                company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
                province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
                attribute:'comparison'
							}
						})
						this.$store.commit('OutRecordState')
				})
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.style("fill","white")
				.style("stroke","black")
				.attr("r",0)
				.transition()
				.attr("r",4)
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x );
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(d=>{
					if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) == -1){
						return d
					}
				})
				.transition()
				.style("fill","#5975ff")
				.attr("r",7)
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x );
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(d=>{
					if( this.D1.indexOf(d.name) == -1 && this.D2.indexOf(d.name) != -1){
						return d
					}
				})
				.transition()
				.style("fill","#4cde71")
				.attr("r",7)
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x )
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(d=>{
					if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1){
						return d
					}
				})
				.on("mouseover",d=>{
					d3.select("#gCircles1").selectAll("circle")
					.data(this.B_nodes3)
					.filter(data=>data==d)
					.style("stroke","red");
					this.B_TipRemove()
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
					
					this.$store.commit({
						type:'userMouseover',
					})
					
				})
				.on("mousemove",(d)=>{
						
					this.B_TipRemove();
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
				})
				.on("mouseout",(d)=>{
					d3.select("#gCircles1").selectAll("circle")
					.data(this.B_nodes3)
					.filter(data=>data==d)
					.style("stroke","black");
					setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
					let v1 = this.B_getPat(d.name,0,this.B_nodes1)
					let v2 = this.B_getPat(d.name,0,this.B_nodes2)
					this.$store.commit({
						type:'userMouseout',
						view:'viewB',
						obj:'tips(tree nodes)',
						width:this.widthB,
					height:this.heightB,
						name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
						value:v1 + ' vs ' + v2,
						desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
						desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
            data:{
              industry:d.name,
              company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
              province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
              attribute:'comparison'
            }
					})
					this.$store.commit('OutRecordState')
				})
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.exit()
				.remove();
				////////console.log('!!!!!',this.B_nodes3)
				
			}
		},
		split(){
			////////console.log(this.B_nodes31,this.B_nodes32)
				
				let B_tree1 = d3.layout.tree()
				.size([(this.heightB *4/5),(this.widthB *4/5 )]);
				
				let B_links3 = B_tree1.links(this.B_nodes31);
				B_links3 = B_links3.filter(d=>{
						if(this.D1.indexOf(d.target.name) != -1){
							return d
						}
				})
				let B_links32 = B_tree1.links(this.B_nodes32);
				B_links32 = B_links32.filter(d=>{
						if(this.D2.indexOf(d.target.name) != -1){
							return d
						}
				})
				
				let B_diagonal1 = d3.svg.diagonal()
				.projection(function(d){
					return [d.y +10 , d.x ];
				});
				
				let B_diagonal2 = d3.svg.diagonal()
				.projection(function(d){
					return [d.y  , d.x ];
				});
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.enter()
				.append("circle")
				.attr("class","circles31")
				.style("fill",'white')
				
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.style("fill",'white')
				.attr("r",4)
				.on("click",()=>{})
				.on("mouseover",(d)=>{
								d3.select("#gCircles1").selectAll("circle")
								.data(this.B_nodes31)
								.filter(data=>data==d)
								.style("stroke","red");
								this.B_TipRemove()
								this.B_createTip(d,1,this.B_nodes31)
								this.$store.commit({
									type:'userMouseover',
								})
				})
				.on("mousemove",(d)=>{
						this.B_TipRemove();
						this.B_createTip(d,1,this.B_nodes31)
				})
				.on("mouseout",(d)=>{
						d3.select("#gCircles1").selectAll("circle")
						.data(this.B_nodes31)
						.filter(data=>data==d)
						.style("stroke","black");
						setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						this.$store.commit({
							type:'userMouseout',
							view:'viewB',
							obj:'tips(tree nodes)',
							name:this.treeData[0]+':' +d.name,
							value:d.patent_num,
							width:this.widthB,
							height:this.heightB,
							desc0: 'hover:' + this.treeData[0] + 'in' + d.name,
							desc:'the patent number of ' + this.treeData[0] + ' in ' +d.name + ' is ' + d.patent_num,
							data:{
                  industry:d.name,
                  company:this.treeTypeFlag == 'company'?[this.treeData[0]]:[],
                  province:this.treeTypeFlag == 'province'?[this.treeData[0]]:[],
                  attribute:'patent_num'
							}
						})
						this.$store.commit('OutRecordState')
				})
				.transition()
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x )
				
				
	
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
								if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) == -1){
									return true
								}
				})
				.transition()
				.style("fill","#5975ff")
				.attr("r",7)
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x );
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
								if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,this.B_nodes1)>this.B_getPat(d.name,0,this.B_nodes2)){
									return true
								}
				})
				.attr("r",6)
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
					if(this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1){
						return true
					}
				})
				.on("mouseover",d=>{
					d3.select("#gCircles1").selectAll("circle")
					.data(this.B_nodes31)
					.filter(data=>data==d)
					.style("stroke","red");
					this.B_TipRemove()
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
					this.$store.commit({
						type:'userMouseover',
					})
				})
				.on("mousemove",(d)=>{
						
					this.B_TipRemove();
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
				})
				.on("mouseout",(d)=>{
					d3.select("#gCircles1").selectAll("circle")
					.data(this.B_nodes31)
					.filter(data=>data==d)
					.style("stroke","black");
					setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						let v1 = this.B_getPat(d.name,0,this.B_nodes1)
						let v2 = this.B_getPat(d.name,0,this.B_nodes2)
					this.$store.commit({
						
						type:'userMouseout',
						view:'viewB',
						width:this.widthB,
						height:this.heightB,
						obj:'tips(tree nodes)',
						name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
						value:v1 + ' vs ' +v2 ,
						desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
						desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
            data:{
              industry:d.name,
              company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
              province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
              attribute:'comparison'
            }
					})
					this.$store.commit('OutRecordState')
				})
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
								if(d.name!="半导体显示"&& d.children && (this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1)  ){
									return d
								}
				})
				.on("click",d=>{
							this.roam(d.name,d.depth);
				});
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
								if(!d.parent && d.name!="半导体显示"){
											return d
								}
				})
				.on("click",()=>{
					// 这里！
						this.$store.commit({
							type:'objBDepth',
							flag:0,
							depth:0,
							rootName:'半导体显示'
						})
						this.roam("半导体显示",0);
				})
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.exit()
				.remove();
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.enter()
				.append("path")
				.attr("class","links1")
				.style("fill","none")
				.style("stroke","black")
				.style("stroke-width",0.5)
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.transition()
				.attr("d",function(d){return B_diagonal1(d);});
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.exit()
				.remove();
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.enter()
				.append("circle")
				.attr("class","circles32")
				.style("fill",'white')
				.style("stroke","black")
				.append("title")
				.text(d=>d.name);
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.style("fill",'white')
				.attr("r",4)
				.attr("cx",this.widthB/2 )
				.attr("cy",this.heightB/2 )
				.on("mouseover",(d)=>{
								d3.select("#gCircles2").selectAll("circle")
								.data(this.B_nodes32)
								.filter(data=>data==d)
								.style("stroke","red");
								this.B_TipRemove()
								this.B_createTip(d,1,this.B_nodes32)
								this.$store.commit({
									type:'userMouseover',
								})
				})
				.on("mousemove",(d)=>{
						this.B_TipRemove();
						this.B_createTip(d,1,this.B_nodes32)
				})
				.on("mouseout",(d)=>{
						d3.select("#gCircles2").selectAll("circle")
						.data(this.B_nodes32)
						.filter(data=>data==d)
						.style("stroke","black");
						setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						this.$store.commit({
							type:'userMouseout',
							view:'viewB',
							width:this.widthB,
							height:this.heightB,
							obj:'tips(tree nodes)',
							name: this.treeData[1] + ':' +d.name,
							value:d.patent_num,
							desc:'the patent number of ' + this.treeData[1] + ' in ' +d.name + ' is ' + d.patent_num,
							desc0: 'hover:' + this.treeData[1] + 'in' + d.name,
							data:{
                  industry:d.name,
                  company:this.treeTypeFlag == 'company'?[this.treeData[1]]:[],
                  province:this.treeTypeFlag == 'province'?[this.treeData[1]]:[],
                  attribute:'patent_num'
							}
						})
						this.$store.commit('OutRecordState')
				})
				.transition()
				
				.attr("cx",d=>d.y )
				.attr("cy",d=>d.x )
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
								if( this.D2.indexOf(d.name) != -1 && this.D1.indexOf(d.name) == -1){
									return d
								}
				})
				.transition()
				.style("fill","#4cde71")
				.attr("r",7)
				.attr("cx",d=>d.y )
				.attr("cy",d=>d.x );
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
								if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,this.B_nodes2)>this.B_getPat(d.name,0,this.B_nodes1)){
									return true
								}
				})
				.attr("r",6)
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
					if(this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1){
						return true
					}
				})
				.on("mouseover",d=>{
					d3.select("#gCircles2").selectAll("circle")
					.data(this.B_nodes32)
					.filter(data=>data==d)
					.style("stroke","red");
					this.B_TipRemove()
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
					this.$store.commit({
						type:'userMouseover',
					})
				})
				.on("mousemove",(d)=>{
						
					this.B_TipRemove();
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
				})
				.on("mouseout",(d)=>{
					d3.select("#gCircles2").selectAll("circle")
					.data(this.B_nodes32)
					.filter(data=>data==d)
					.style("stroke","black");
					setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						let v1 = this.B_getPat(d.name,0,this.B_nodes1)
						let v2 = this.B_getPat(d.name,0,this.B_nodes2)
					this.$store.commit({
						type:'userMouseout',
						view:'viewB',
						width:this.widthB,
					height:this.heightB,
						obj:'tips(tree nodes)',
						name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
						value: v1+ ' vs ' +v2 ,
						desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
						desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
            data:{
                industry:d.name,
                company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
                province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
                attribute:'comparison'
            }
					})
					this.$store.commit('OutRecordState')
				})
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
								if(d.name!="半导体显示"&& d.children && (this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1)  ){
										return d
								}
				})
				.on("click",d=>{
							this.roam(d.name,d.depth);
				});
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
								if(!d.parent && d.name!="半导体显示"){
											return d
								}
				})
				.on("click",()=>{
					// zheli !!!
						this.$store.commit({
							type:'objBDepth',
							flag:0,
							depth:0,
							rootName:'半导体显示'
						})
						this.roam("半导体显示",0);
				})
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.exit()
				.remove();
				
				d3.select("#gLinks2").selectAll("path")
				.data(B_links32)
				.enter()
				.append("path")
				.attr("class","links2")
				.style("fill","none")
				.style("stroke","black")
				
				
				d3.select("#gLinks2").selectAll("path")
				.data(B_links32)
				.style("stroke-width",0)
				.transition()
				.attr("d",function(d){return B_diagonal2(d);})
				.style("stroke-width",0.5)
				d3.select("#gLinks2").selectAll("path")
				.data(B_links32)
				.exit()
				.remove();
				this.createDia();
				
				let B_tag1 = d3.select("#gTag1")
				let B_tag2 = d3.select("#gTag2")
				
				B_tag1.selectAll(".text1")
				.data(this.B_nodes31)
				.enter()
				.append("text")
				.attr("class","text1")
				.attr("dx",20)
				.attr("dy",this.heightB/2)
				.attr("font-family", "sans-serif")
				.attr("font-size", "10px")
				.attr("font-weight", "bold")
				.style("fill","black")
				.attr("text-anchor","start")
				
				
				B_tag1.selectAll(".text1")
				.data(this.B_nodes31)
				.filter(d=>{
								if( this.B_nodes31.length<100&&!d.children&&this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) == -1){
									return d
								}
				})
				.transition()
				.attr("dx",d=>d.y +20)
				.attr("dy",d=>d.x +5)
				.text(d=>d.name);
				
				B_tag1.selectAll(".text1")
				.data(this.B_nodes31)
				.exit()
				.remove();
				
				B_tag2.selectAll(".text2")
				.data(this.B_nodes32)
				.enter()
				.append("text")
				.attr("class","text2")
				.attr("dx",20)
				.attr("dy",this.heightB/2)
				.attr("font-family", "sans-serif")
				.attr("font-size", "10px")
				.attr("font-weight", "bold")
				.style("fill","black")
				.attr("text-anchor","end")
				
				B_tag2.selectAll(".text2")
				.data(this.B_nodes32)
				.filter(d=>{
								if( this.B_nodes32.length<100&&!d.children&&this.D1.indexOf(d.name) == -1 && this.D2.indexOf(d.name) != -1){
									return d
								}
				})
				.transition()
				.attr("dx",d=>d.y -10)
				.attr("dy",d=>d.x +5)
				.text(d=>d.name);
				
				B_tag2.selectAll(".text2")
				.data(this.B_nodes32)
				.exit()
				.remove();
				
				
			},
			B_getPat(name,index,data){
				for(let i = 0;i<data.length;i++){
					if(name == data[i].name){
						return data[i].patent_num;
						
					}
				}
			},
			createDia(){
				d3.select("#svgB").selectAll("linearGradient").remove();
				let diaData = [];
				let diaTemp = [];
				for(let i = 0;i<this.B_nodes31.length;i++){
					for(let j = 0;j<this.B_nodes32.length;j++){
						if((!this.B_nodes31[i].children) && this.B_nodes31[i].name == this.B_nodes32[j].name){
							diaData.push({a:this.B_nodes31[i],b:this.B_nodes32[j],pat_numA:this.B_getPat(this.B_nodes31[i].name,0,this.B_nodes1),pat_numB:this.B_getPat(this.B_nodes31[i].name,0,this.B_nodes2)});
							diaTemp.push(this.B_nodes31[i].name)
						}
					}
				}
				
				d3.select("#gDia").selectAll(".dia")
				.data(diaData)
				.enter()
				.append("line")
				.attr("class","dia")
				.style("fill",'none')
				.style("stroke","black")
				.style("stroke-width",3)
				.attr("x1",this.widthB/2)
				.attr("y1",this.heightB/2)
				.attr("x2",this.widthB/2)
				.attr("y2",this.heightB/2);
				
				diaData.forEach(function(d,i){
					let defs = d3.select("#svgB").append("defs");
					let p =d.pat_numA/(d.pat_numA + d.pat_numB);
					
					let linearGradients = defs.append("linearGradient")
											.attr("id","contrastColor"+i)
											.attr("x1","0%")
											.attr("y1","0%")
											.attr("x2","100%")
											.attr("y2","0%");
					// eslint-disable-next-line
					let stop1 = linearGradients.append("stop")
									.attr("offset",p)
									.style("stop-color","#5975ff");
					// eslint-disable-next-line
					let stop2 = linearGradients.append("stop")
									.attr("offset",p)
									.style("stop-color","#4cde71");
				})
				
				d3.select("#gDia").selectAll(".dia")
				.data(diaData)
				.transition()
				.style("stroke",(d,i)=>{
					return "url(#contrastColor" + i +")"
				})
				//.style("stroke","url(#linearColor)")
				.style("stroke-width",3)
				.attr("x1",d=>d.a.y + 14)
				.attr("y1",d=>d.a.x)
				.attr("x2",d=>d.b.y-4)
				.attr("y2",d=>d.b.x +0.01);
				
				d3.select("#gDia").selectAll(".dia")
				.data(diaData)
				.exit()
				.remove();
				
				
				
			},
		merge(){
			d3.select("#gCircles2").selectAll('circle').remove()
			d3.select("#gLinks2").selectAll("path").remove()
			d3.select("#gDia").selectAll("line").remove()
			
			let tempDatat3 = [];
			for(let i = 0;i<this.data_overall.length;i++){
				if(this.treeTypeFlag =='company'){
					if(this.data_overall[i]['name'+(this.depth+1)] == this.rootName&&(this.data_overall[i].comp_name == this.treeData[0] || this.data_overall[i].comp_name == this.treeData[1])){
						tempDatat3.push(this.data_overall[i]);
					}
				}
				else if (this.treeTypeFlag == 'province'){
					if(this.data_overall[i]['name'+(this.depth+1)] == this.rootName&&(this.data_overall[i].province.substring(0,2) == this.treeData[0].substring(0,2) || this.data_overall[i].province.substring(0,2) == this.treeData[1].substring(0,2))){
						tempDatat3.push(this.data_overall[i]);
					}
				}
			}
			let a = this.dataToFlare(tempDatat3);
			for(let i = 0;i<this.depth;i++){
					a = a.children[0];
			}
			let B_tree1 = d3.layout.tree()
			.size([(this.heightB *4/5),(this.widthB *4/5 )]);
			let b = B_tree1.nodes(a);
			for(let i = 0;i<b.length;i++){
							b[i].x += this.heightB/6;
							b[i].y += this.widthB/20
			}
			
			
	
			let B_tree = d3.layout.tree()
			.size([(this.heightB *4/5),(this.widthB*4/5 )]);
			let B_links3 = B_tree.links(b);
			
			let B_diagonal1 = d3.svg.diagonal()
			.projection(function(d){
				return [d.y +10 , d.x ];
			});
			d3.select("#gLinks1").selectAll("path")
			.data(B_links3)
			.enter()
			.append("path")
			.attr("class","links1")
			.attr("d",[this.heightB/2])
			.style("fill","none")
			.style("stroke","black")
			.style("stroke-opacity",0.5)
			
			d3.select("#gLinks1").selectAll("path")
			.data(B_links3)
			.style("stroke","black")
			.style("stroke-opacity",0.5)
			.transition()
			.attr("d",function(d){return B_diagonal1(d);})
			.style("stroke-width",1)
			
			d3.select("#gLinks1").selectAll("path")
			.data(B_links3)
			.exit()
			.remove();
			
			d3.select("#gCircles1").selectAll("circle")
			.data(b)
			.enter()
			.append("circle")
			.attr("class","circles1")
			
			d3.select("#gCircles1").selectAll("circle")
			.data(b)
			.on("click",d=>{
				this.roam(d.name,d.depth)
			})
			.on("mouseover",(d)=>{
							d3.select("#gCircles1").selectAll("circle")
							.data(this.B_nodes3)
							.filter(data=>data==d)
							.style("stroke","red");
							this.B_TipRemove()
							this.B_createTip(d,1,this.B_nodes3)
							this.$store.commit({
								type:'userMouseover',
							})
			})
			.on("mousemove",(d)=>{
					this.B_TipRemove();
					this.B_createTip(d,1,this.B_nodes3)
			})
			.on("mouseout",(d)=>{
					d3.select("#gCircles1").selectAll("circle")
					.data(this.B_nodes3)
					.filter(data=>data==d)
					.style("stroke","black");
					setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						let v1 = this.B_getPat(d.name,0,this.B_nodes1)
					let v2 = this.B_getPat(d.name,0,this.B_nodes2)
					this.$store.commit({
						type:'userMouseout',
						view:'viewB',
						width:this.widthB,
					height:this.heightB,
						obj:'tips(tree nodes)',
						name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
						value:d.patent_num,
						desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
						desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
						data:{
                industry:d.name,
                company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
                province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
                attribute:'comparison'
						}
					})
					this.$store.commit('OutRecordState')
			})
			
			d3.select("#gCircles1").selectAll("circle")
			.data(b)
			.style("fill","white")
			.style("stroke","black")
			.attr("r",0)
			.transition()
			.attr("r",4)
			.attr("cx",d=>d.y +10 )
			.attr("cy",d=>d.x );
			
			d3.select("#gCircles1").selectAll("circle")
			.data(b)
			.filter(d=>{
				if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) == -1){
					return d
				}
			})
			.transition()
			.style("fill","#5975ff")
			.attr("r",7)
			.attr("cx",d=>d.y +10 )
			.attr("cy",d=>d.x );
			
			d3.select("#gCircles1").selectAll("circle")
			.data(b)
			.filter(d=>{
				if( this.D1.indexOf(d.name) == -1 && this.D2.indexOf(d.name) != -1){
					return d
				}
			})
			.transition()
			.style("fill","#4cde71")
			.attr("r",7)
			.attr("cx",d=>d.y +10 )
			.attr("cy",d=>d.x )
			
			d3.select("#gCircles1").selectAll("circle")
			.data(this.B_nodes3)
			.filter(d=>{
				if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1){
					return d
				}
			})
			.on("mouseover",d=>{
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(data=>data==d)
				.style("stroke","red");
				this.B_TipRemove()
				this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
				this.$store.commit({
					type:'userMouseover',
				})
			})
			.on("mousemove",(d)=>{
					
				this.B_TipRemove();
				this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
			})
			.on("mouseout",(d)=>{
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(data=>data==d)
				.style("stroke","black");
				setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
				let v1 = this.B_getPat(d.name,0,this.B_nodes1)
				let v2 = this.B_getPat(d.name,0,this.B_nodes2)
				this.$store.commit({
					type:'userMouseout',
					view:'viewB',
					width:this.widthB,
					height:this.heightB,
					obj:'tips(tree nodes)',
					name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
					value: v1 + ' vs ' + v2,
					desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
					desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
          data:{
            industry:d.name,
            company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
            province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
            attribute:'comparison'
          }
				})
				this.$store.commit('OutRecordState')
			})
			
			d3.select("#gCircles1").selectAll("circle")
			.data(b)
			.exit()
			.remove();
			
			
		},
		ale(){
		
			
			this.$store.commit('objBSplitFlag')
			
		},
		roam(name,depth){
			setTimeout(() => {
				this.B_TipRemove();
			}, 1600);
			// 这里！！！
			this.$store.commit({
				type:'objBDepth',
				depth:depth,
				flag:depth,
				rootName:name
				
			})
			let v1 = this.B_getPat(name,0,this.B_nodes1)
					let v2 = this.B_getPat(name,0,this.B_nodes2)
			this.$store.commit({
				type:'userClick',
				view:'viewB',
				width:this.widthB,
					height:this.heightB,
				obj:'zoom(tree nodes)',
				name:this.treeData[0] + ' vs '+ this.treeData[1],
				value:name,
				desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + name,
				desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
				visualKeys:{},
        data:{
          industry:name,
          company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
          province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
          attribute:'comparison'
        }
			})

			this.$store.commit('ClickRecordState')
		
			let B_tree1 = d3.layout.tree()
			.size([(this.heightB *4/5),(this.widthB *4/5 )]);
			
		
			let B_diagonal1 = d3.svg.diagonal()
			.projection(function(d){
				return [d.y +10 , d.x ];
			});
			
			
		
			let B_links3 = B_tree1.links(this.B_nodes3);
			if(!this.splited){
				
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.enter()
				.append("path")
				.attr("class","links1");
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				
				.transition()
				.style("fill","none")
				.style("stroke","black")
				.style("stroke-opacity",0.5)
				.attr("d",function(d){return B_diagonal1(d);});
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.exit()
				.remove();
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.enter()
				.append("circle")
				.attr("class","circles1")
				.style("stroke","black")
				
				
				
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.on("mouseover",(d)=>{
								d3.select("#gCircles1").selectAll("circle")
								.data(this.B_nodes3)
								.filter(data=>data==d)
								.style("stroke","red");
								this.B_TipRemove()
								this.B_createTip(d,1,this.B_nodes3)
								this.$store.commit({
									type:'userMouseover',
								})
				})
				.on("mousemove",(d)=>{
						this.B_TipRemove();
						this.B_createTip(d,1,this.B_nodes3)
				})
				.on("mouseout",(d)=>{
						d3.select("#gCircles1").selectAll("circle")
						.data(this.B_nodes3)
						.filter(data=>data==d)
						.style("stroke","black");
						setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						let v1 = this.B_getPat(d.name,0,this.B_nodes1)
					let v2 = this.B_getPat(d.name,0,this.B_nodes2)
						this.$store.commit({
							type:'userMouseout',
							view:'viewB',
							width:this.widthB,
					height:this.heightB,
							obj:'tips(tree nodes)',
							name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
							value:d.patent_num,
							desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
							desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
							data:{
                  industry:d.name,
                  company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
                  province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
                  attribute:'comparison'
							}
						})
						this.$store.commit('OutRecordState')
				})
				
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.on("click",()=>{})
				.style("fill",'white')
				.attr("r",4)
				.transition()
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x );
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(d=>{
					if(d.name!="半导体显示"&& d.children && (this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1)  ){
													return d
					}
				})
				.on("click",d=>{
							this.roam(d.name,d.depth);
				});
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(d=>{
								if(!d.parent && d.name!="半导体显示"){
												return d
								}
				})
				.on("click",()=>{
							this.$store.commit({
								type:'objBDepth',
								flag:0,
								depth:0,
								rootName:'半导体显示'
							})
							this.roam("半导体显示",0);
				})
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(d=>{
					if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) == -1){
						return d
					}
				})
				.transition()
				.style("fill","#5975ff")
				.attr("r",7)
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x );
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(d=>{
					if( this.D1.indexOf(d.name) == -1 && this.D2.indexOf(d.name) != -1){
						return d
					}
				})
				.transition()
				.style("fill","#4cde71")
				.attr("r",7)
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x )
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.filter(d=>{
					if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1){
						return d
					}
				})
				.on("mouseover",d=>{
					d3.select("#gCircles1").selectAll("circle")
					.data(this.B_nodes3)
					.filter(data=>data==d)
					.style("stroke","red");
					this.B_TipRemove()
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
					this.$store.commit({
						type:'userMouseover',
					})
				})
				.on("mousemove",(d)=>{
						
					this.B_TipRemove();
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
				})
				.on("mouseout",(d)=>{
					d3.select("#gCircles1").selectAll("circle")
					.data(this.B_nodes3)
					.filter(data=>data==d)
					.style("stroke","black");
					setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
					let v1 = this.B_getPat(d.name,0,this.B_nodes1)
					let v2 = this.B_getPat(d.name,0,this.B_nodes2)
					this.$store.commit({
						type:'userMouseout',
						view:'viewB',
						width:this.widthB,
					height:this.heightB,
						obj:'tips(tree nodes)',
						name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
						value: v1+ ' vs ' + v2,
						desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
						desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
            data:{
              industry:d.name,
              company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
              province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
              attribute:'comparison'
            }
					})
					this.$store.commit('OutRecordState')
				})
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes3)
				.exit()
				.remove();
				d3.select("#gCircles2").selectAll("circle").remove();
				d3.select("#gLinks2").selectAll("path").remove();
				d3.select("#gDia").selectAll("line").remove();
				
				
			}
			else{
			
				B_links3 = B_links3.filter(d=>{
					if(this.D1.indexOf(d.target.name) != -1){
					return d
					}
				})
				// eslint-disable-next-line
				let B_links32 = B_tree1.links(this.B_nodes32);
				// eslint-disable-next-line
				B_links32 = B_links32.filter(d=>{
						if(this.D2.indexOf(d.target.name) != -1){
							return d
						}
				})
				// eslint-disable-next-line
				let B_diagonal2 = d3.svg.diagonal()
				.projection(function(d){
					return [d.y  , d.x ];
				});
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.enter()
				.append("circle")
				.attr("class","circles1")
				.style("stroke","black")
				

				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.style("fill","white")
				.attr("r",4)
				.on("click",()=>{})
				.on("mouseover",(d)=>{
								d3.select("#gCircles1").selectAll("circle")
								.data(this.B_nodes31)
								.filter(data=>data==d)
								.style("stroke","red");
								this.B_TipRemove()
								this.B_createTip(d,1,this.B_nodes31)
								this.$store.commit({
									type:'userMouseover',
								})
				})
				.on("mousemove",(d)=>{
						this.B_TipRemove();
						this.B_createTip(d,1,this.B_nodes31)
				})
				.on("mouseout",(d)=>{
						d3.select("#gCircles1").selectAll("circle")
						.data(this.B_nodes31)
						.filter(data=>data==d)
						.style("stroke","black");
						setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						this.$store.commit({
							type:'userMouseout',
							view:'viewB',
							width:this.widthB,
					height:this.heightB,
							obj:'tips(tree nodes)',
							name:this.treeData[0] + ':' +d.name,
							value:d.patent_num,
							desc0: 'hover:' + this.treeData[0] + 'in' + d.name,
							desc:'the patent number of ' + this.treeData[0] + ' in ' +d.name + ' is ' + d.patent_num,
							data:{
                  industry:d.name,
                  company:this.treeTypeFlag == 'company'?[this.treeData[0]]:[],
                  province:this.treeTypeFlag == 'province'?[this.treeData[0]]:[],
                  attribute:'patent_num'
							}
						})
						this.$store.commit('OutRecordState')
				})
				.transition()
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x )
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
								if(d.name!="半导体显示"&& d.children && (this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1)  ){
									return d
								}
				})
				.on("click",d=>{
							this.roam(d.name,d.depth);
				});
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
								if(!d.parent && d.name!="半导体显示"){
											return d
								}
				})
				.on("click",()=>{
						this.$store.commit({
							type:'objBDepth',
							flag:0,
							depth:0,
							rootName:'半导体显示'
						})
						this.roam("半导体显示",0);
				})
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
							if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) == -1){
								return d
							}
				})
				.transition()
				.style("fill","#5975ff")
				.attr("r",7)
				.attr("cx",d=>d.y +10 )
				.attr("cy",d=>d.x );
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
								if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,this.B_nodes1)>this.B_getPat(d.name,0,this.B_nodes2)){
									return true
								}
				})
				.attr("r",6)
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.filter(d=>{
					if(this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1){
						return true
					}
				})
				.on("mouseover",d=>{
					d3.select("#gCircles1").selectAll("circle")
					.data(this.B_nodes31)
					.filter(data=>data==d)
					.style("stroke","red");
					this.B_TipRemove()
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
					this.$store.commit({
						type:'userMouseover',
					})
				})
				.on("mousemove",(d)=>{
						
					this.B_TipRemove();
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
				})
				.on("mouseout",(d)=>{
					d3.select("#gCircles1").selectAll("circle")
					.data(this.B_nodes31)
					.filter(data=>data==d)
					.style("stroke","black");
					setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
					let v1 = this.B_getPat(d.name,0,this.B_nodes1)
					let v2 = this.B_getPat(d.name,0,this.B_nodes2)
					this.$store.commit({
						type:'userMouseout',
						view:'viewB',
						width:this.widthB,
					height:this.heightB,
						obj:'tips(tree nodes)',
						name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
						value:v1 + ' vs ' + v2,
						desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
						desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
            data:{
              industry:d.name,
              company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
              province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
              attribute:'comparison'
            }
					})
					this.$store.commit('OutRecordState')
				})
				
				d3.select("#gCircles1").selectAll("circle")
				.data(this.B_nodes31)
				.exit()
				.remove()
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.enter()
				.append("path")
				.attr("class","links1")
				.style("fill","none")
				.style("stroke","black")
				.style("stroke-width",0.5)
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.transition()
				.attr("d",function(d){return B_diagonal1(d);});
				
				d3.select("#gLinks1").selectAll("path")
				.data(B_links3)
				.exit()
				.remove();
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.enter()
				.append("circle")
				.attr("class","circles2")
				.attr("r",4)
				.style("fill","white")
				.style("stroke","black")
				
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.style("fill","white")
				.on("click",()=>{})
				.on("mouseover",(d)=>{
								d3.select("#gCircles2").selectAll("circle")
								.data(this.B_nodes32)
								.filter(data=>data==d)
								.style("stroke","red");
								this.B_TipRemove()
								this.B_createTip(d,1,this.B_nodes32)
								this.$store.commit({
									type:'userMouseover',
								})
				})
				.on("mousemove",(d)=>{
						this.B_TipRemove();
						this.B_createTip(d,1,this.B_nodes32)
				})
				.on("mouseout",(d)=>{
						d3.select("#gCircles2").selectAll("circle")
						.data(this.B_nodes32)
						.filter(data=>data==d)
						.style("stroke","black");
						setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
						this.$store.commit({
							type:'userMouseout',
							view:'viewB',
							width:this.widthB,
					height:this.heightB,
							obj:'tips(tree nodes)',
							name: this.treeData[1] + ':' +d.name,
							value:d.patent_num,
							desc:'the patent number of ' + this.treeData[1] + ' in ' +d.name + ' is ' + d.patent_num,
							desc0: 'hover:' + this.treeData[1] + 'in' + d.name,
							data:{
                  industry:d.name,
                  company:this.treeTypeFlag == 'company'?[this.treeData[1]]:[],
                  province:this.treeTypeFlag == 'province'?[this.treeData[1]]:[],
                  attribute:'patent_num'
							}
						})
						this.$store.commit('OutRecordState')
				})
				.transition()
				.attr("r",4)
				
				.attr("cx",d=>d.y)
				.attr("cy",d=>d.x);
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
								if(d.name!="半导体显示"&& d.children && (this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1)  ){
										return d
								}
				})
				.on("click",d=>{
							this.roam(d.name,d.depth);
				});
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
								if(!d.parent && d.name!="半导体显示"){
											return d
								}
				})
				.on("click",()=>{
						this.$store.commit({
							type:'objBDepth',
							flag:0,
							depth:0,
							rootName:'半导体显示'
						})
						this.roam("半导体显示",0);
				})
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
								if( this.D2.indexOf(d.name) != -1 && this.D1.indexOf(d.name) == -1){
									return true
								}
				})
				.transition()
				.style("fill","#4cde71")
				.attr("r",7)
				.attr("cx",d=>d.y )
				.attr("cy",d=>d.x )
				
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
								if( this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1 &&this.B_getPat(d.name,0,this.B_nodes2)>this.B_getPat(d.name,0,this.B_nodes1)){
									return true
								}
				})
				.attr("r",6)
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.filter(d=>{
					if(this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) != -1){
						return true
					}
				})
				.on("mouseover",d=>{
					d3.select("#gCircles2").selectAll("circle")
					.data(this.B_nodes32)
					.filter(data=>data==d)
					.style("stroke","red");
					this.B_TipRemove()
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
					this.$store.commit({
						type:'userMouseover',
					})
				})
				.on("mousemove",(d)=>{
						
					this.B_TipRemove();
					this.B_createTipBar(d,this.B_nodes1,this.B_nodes2)
				})
				.on("mouseout",(d)=>{
					d3.select("#gCircles2").selectAll("circle")
					.data(this.B_nodes32)
					.filter(data=>data==d)
					.style("stroke","black");
					setTimeout(() => {
							this.B_TipRemove()
						}, 1500);
					let v1 = this.B_getPat(d.name,0,this.B_nodes1)
					let v2 = this.B_getPat(d.name,0,this.B_nodes2)
					this.$store.commit({
						type:'userMouseout',
						view:'viewB',
						width:this.widthB,
					height:this.heightB,
						obj:'tips(tree nodes)',
						name:this.treeData[0] + 'vs' + this.treeData[1] + ':' +d.name,
						value: v1+ ' vs ' +v2 ,
						desc0:'compare ' + this.treeData[0] + ' to ' + this.treeData[1] + ' in ' + d.name,
						desc:'the comparison between ' + this.treeData[0] + ' and ' + this.treeData[1] + ' in ' + d.name + ' with patent num '
						+ v1 + ' and ' + v2 +' respectively',
            data:{
              industry:d.name,
              company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
              province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
              attribute:'comparison'
            }
					})
					this.$store.commit('OutRecordState')
				})
				d3.select("#gCircles2").selectAll("circle")
				.data(this.B_nodes32)
				.exit()
				.remove();
				
				d3.select("#gLinks2").selectAll("path")
				.data(B_links32)
				.enter()
				.append("path")
				.attr("class","links2")
				.style("fill","none")
				.style("stroke","black")
				.style("stroke-width",0.5)
				
				d3.select("#gLinks2").selectAll("path")
				.data(B_links32)
				.attr("d",function(d){return B_diagonal2(d);})
				
				d3.select("#gLinks2").selectAll("path")
				.data(B_links32)
				.exit()
				.remove()
				
				//////console.log(this.D1,this.D2)
				this.createDia()
				
				
				
				d3.select("#gTag1").selectAll("text")
				.remove();
				//////console.log(this.B_nodes31)
				d3.select("#gTag1").selectAll("text")
				.data(this.B_nodes31)
				.enter()
				.append("text")
				.attr("dx",20)
				.attr("dy",this.heightB/2)
				.attr("font-family", "sans-serif")
				.attr("font-size", "10px")
				.attr("font-weight", "bold")
				.style("fill","black")
				.attr("text-anchor","start")
				
				
				d3.select("#gTag1").selectAll("text")
				.data(this.B_nodes31)
				.filter(d=>{
								if( this.B_nodes31.length<100&&!d.children&&this.D1.indexOf(d.name) != -1 && this.D2.indexOf(d.name) == -1){
									return d
								}
				})
				.transition()
				.attr("dx",d=>d.y +20)
				.attr("dy",d=>d.x +5)
				.text(d=>d.name);
				
				
				d3.select("#gTag2").selectAll("text")

				
				.remove();
				d3.select("#gTag2").selectAll("text")
				.data(this.B_nodes32)
				.enter()
				.append("text")
				.attr("dx",20)
				.attr("dy",this.heightB/2)
				.attr("font-family", "sans-serif")
				.attr("font-size", "10px")
				.attr("font-weight", "bold")
				.style("fill","black")
				.attr("text-anchor","end")
				
				d3.select("#gTag2").selectAll("text")
				.data(this.B_nodes32)
				.filter(d=>{
								if( this.B_nodes32.length<100&&!d.children&&this.D1.indexOf(d.name) == -1 && this.D2.indexOf(d.name) != -1){
									return d
								}
				})
				.transition()
				.attr("dx",d=>d.y -10)
				.attr("dy",d=>d.x +5)
				.text(d=>d.name);
				
			}
		}
	},
	watch:{
		splited(val){
			if(this.treeData.length == 2){
				if(val){
					this.split();
					this.$store.commit({
						type:'userClick',
						view:'viewB',
						obj:'split(button)',
						width:this.widthB,
					height:this.heightB,
						name:this.treeData[0] + ' vs '+ this.treeData[1],
						value:'split:true',
						desc0:'split view of' + this.treeData[0] + ' and '+ this.treeData[1],
						desc:'the split view of tree comparison between ' + this.treeData[0] + ' and '+ this.treeData[1],
            data:{
              industry:this.rootName,
              company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
              province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
              attribute:'comparison'
            }
					})
					this.$store.commit('ClickRecordState')
				}
				else{
					this.merge();
					this.$store.commit({
						type:'userClick',
						view:'viewB',
						width:this.widthB,
						height:this.heightB,
						obj:'split(button)',
						name:this.treeData[0] + ' vs '+ this.treeData[1],
						value:'split:false',
						desc0:'merged view of' + this.treeData[0] + ' and '+ this.treeData[1],
						desc:'the merged view of tree comparison between ' + this.treeData[0] + ' and '+ this.treeData[1],
						visualKeys:{},

            data:{
              industry:this.rootName,
              company:this.treeTypeFlag == 'company'?[this.treeData[0],this.treeData[1]]:[],
              province:this.treeTypeFlag == 'province'?[this.treeData[0],this.treeData[1]]:[],
              attribute:'comparison'
            }
					})
					this.$store.commit('ClickRecordState')
				}
			}
			if(val){
				
				d3.select("#splitBtn").select("rect").transition().style("fill","#1ee710");
				d3.select("#splitBtn").select("circle").transition().attr("cx",70);
			}
			else{
				d3.select("#gTag1").selectAll("text").remove()
				d3.select("#gTag2").selectAll("text").remove()
				d3.select("#splitBtn").select("rect").transition().style("fill","#939393");
				d3.select("#splitBtn").select("circle").transition().attr("cx",45);
			}
		},
		showBtn(val){
			if(val){
				d3.select("#splitBtn")
				.style("display",'inline');
				d3.select("#reportBtn")
				.style("display",'inline')
			}
			else{
				d3.select("#splitBtn")
				.style("display",'none');
				d3.select("#reportBtn")
				.style("display",'none')
			}
		},
		rootName(val){
			d3.select("#Btitle")
			.text(val + '产业树对比图')
		},
		reportFlag(val){
			if(val){
				this.B_report()
				d3.select("#reportBtn").select("rect").transition().style("fill","#1ee710");
				d3.select("#reportBtn").select("circle").transition().attr("cx",70);
			}
			else{
				this.B_TipRemove()
				d3.select("#reportBtn").select("rect").transition().style("fill","#939393");
				d3.select("#reportBtn").select("circle").transition().attr("cx",45);
			}
			
		},
		treeD(){
			
			if(this.treeData.length == 0){
				this.$store.commit("objBclear")
				this.$store.commit("elementClearMatrix")
				// 这里！！
			}
			if(this.splited){
				this.$store.commit("objBSplitFlag")
			}
			this.createNewTree()
			
			if(this.treeData[0]){
				d3.select("#Btitle")
				.style("display",'inline');
				d3.select("#Bleft")
				.text(this.treeData[0])
				if(this.treeData[1]){
					d3.select("#Bright")
					.text(this.treeData[1])
					this.storyFlag = true;
					//this.appendStory(this.story_text,this.B_nodes1,'red',this.treeData[0],this.story.list,35,25,this.widthB - 110,14,'simsun',this.D1,1,this.B_nodes31)
					
					d3.select
				}
				else {
					d3.select("#gCircles2").selectAll("circle").remove();
					d3.select("#gLinks2").selectAll("path").remove();
					d3.select("#gDia").selectAll("line").remove();
					//////console.log(this.B_nodes1)
					d3.select("#Bright")
					.text('');
					this.createNewTree()
					this.storyFlag = false;
				}
			}
			else{
				d3.select("#Bleft")
				.text('');
				d3.select("#Bright")
				.text('');
				d3.select("#Btitle")
				.style("display",'none');
				this.storyFlag = false;
			}
			
		},
		storyFlag(val){
			if(val){
				d3.select("#Bbtn")
				.style("display",'inline')
				this.storyIndex = 1
			}
			else{
				d3.select("#Bbtn")
				.style("display",'none')
				d3.select("#svgB2").selectAll(".storyText").remove()
				this.storyIndex = 0
			}
		},
		storyIndex(val){
			if(val == 1){
				this.appendStory(this.story_text,this.B_nodes1,'red',this.treeData[0],this.story.list,35,25,this.widthB - 110,14,'simsun',this.D1,1,this.B_nodes31)
			}
			else if(val == 2){
				this.appendStory(this.story_text,this.B_nodes2,'blue',this.treeData[1],this.story.list,35,25,this.widthB - 110,14,'simsun',this.D2,2,this.B_nodes32)
			}
			else if(val ==0){
				d3.select("#svgB2").selectAll(".storyText").remove()
			}
		}
		
		
	}
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

</style>
