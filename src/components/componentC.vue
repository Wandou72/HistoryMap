<template>
	
    <svg id = "svgC" >
		<text id = 'txt'>Select Mode:{{matrixFlag}}</text>
		<rect
	x = 0
	:y = 'heightC - 50'
	height = 50
	width = 60
	fill = 'orange'>
	</rect>
	<text
	dx = 30
	:dy = 'heightC - 17'
	text-anchor = 'middle'
	fill = 'white'
	font-size = 25
	font-weight = 'bold'
	>D
	</text>
	</svg>

</template>

<script>
import * as d3 from "d3"

import axios from 'axios'

export default {
	name: 'componentC',
	data(){
		return {
			heightC:this.$store.state.height * 0.4,
			widthC:this.$store.state.width * 0.3,
			hovered:'',
			nodesLength:0,
			
		}
	},
	mounted(){

		// if(this.selected == ''){
		// 	this.$store.commit({
		// 	type:'changeDataD',
		// 	selected:"半导体显示",
		// 	})
		// }
		

		this.$store.commit({
			type:'appendBtn',
			svgID:'svgC',
			btnID:'Cbtn',
			width:this.widthC,
			text:'switch'
		})
		
		d3.select("#svgC").select("#Cbtn")
		.on("click",()=>{
			if(this.matrixFlag=='tree'){
				this.$store.commit({
					type:'changeMatrixFlag',
					flag:'matrix'
				})
				
			}
			else{
				this.$store.commit({
					type:'changeMatrixFlag',
					flag:'tree'
				})
				
			}
		})
		.style("display",'none')
		
		d3.select("#txt").attr("dy",70).attr("dx",this.widthC-150).style("display",'none')
		//console.log(this.$store.state.data_overall)
		d3.select("#svgC")
		.attr("width",this.widthC)
		.attr("height",this.heightC);
				
		
		this.$store.commit({
			type:'appendTitle',
			id:'CTitle',
			class:'classC',
			svg:'svgC',
			dx:'24px',
			dy:'36px',
			size:'20px'
			
		})
		
		d3.select("#CTitle").style("display",'none')
		
		
		axios.get('china.sea.json')
		.then(res=>{
			this.$store.commit({
				type:'Cseajson',
				seajson:res
			})
		})
		.then(()=>{
			this.createSea()
		})
		
		axios.get('china.geo.json')
		.then(response=>{
			this.$store.commit({
				type:'Cgeojson',
				geojson:response
			})
		})
		.then(()=>{
			this.createMap();
		})
		
		d3.select("#svgC").append("g").attr("id","Csea")
		.style("display","none")
		
		d3.select("#svgC").append("g").attr("id","Cmap")
		.style("display","none")

	},
	computed:{

		C_province(){
			let a = [];
			let C_temp = [];
			let C_temp_sum = 0;
			for(let i = 0;i<this.data_overall.length;i++){
				if(this.data_overall[i].name1 == this.selected || this.data_overall[i].name2 == this.selected||this.data_overall[i].name3 == this.selected||this.data_overall[i].name4 == this.selected
				||this.data_overall[i].name5 == this.selected||this.data_overall[i].name6 == this.selected||this.data_overall[i].name7 == this.selected||this.data_overall[i].name8 == this.selected){
					C_temp.push(this.data_overall[i])
				}
			}
			
			for(let i = 0;i<this.geojson.data.features.length;i++){
				a.push({name:this.geojson.data.features[i].properties.name,pat_num:0,pat_pro:0})
			}
			
			for(let i = 0;i<C_temp.length;i++){
				for(let j = 0;j<a.length;j++){
					if(C_temp[i].province.substring(0,2) == a[j].name.substring(0,2)){
						a[j].pat_num += parseInt(C_temp[i].patent_num)
					}
				}
			}
			
			for(let i = 0;i<a.length;i++){
				C_temp_sum += a[i].pat_num
			}
			
			for(let i = 0;i<a.length;i++){
				a[i].pat_pro = a[i].pat_num / C_temp_sum
			}
			
			return a
			
			
		},
		matrixElement1(){
			return this.matrixElement+'1'
		},
		matrixElement(){
			return this.$store.state.matrixElement
		},
		matrixFlag(){
			return this.$store.state.matrixFlag
		},
		treeD(){
			return this.treeData +'1'
		},
		treeData(){
				return this.$store.state.objB.treeData
		},
		seajson(){
			return this.$store.state.objC.seajson
		},
		geojson(){
			return this.$store.state.objC.geojson
			
		},
		data_overall(){
			return this.$store.state.data_overall
		},
		leaf(){
			return this.$store.state.leaf
		},
		selected(){
			return this.$store.state.selected
		},
		colorScale(){
			return d3.scale.linear().domain([0,0.5]).range(["#c8ccf9","#00007f"])
		}
	},
	methods:{
		C_TipRemove(){
			d3.select("#svgC").selectAll(".tips").remove()
		},
		// initial(){
		// 	if(this.selected == ''){
		// 		this.$store.commit({
		// 		type:'changeDataD',
		// 		selected:"半导体显示",
		// 		})
		// 	}
		// },
		C_createTip(d){
			function mouseXY(e){
							e=e||window.event;
							return { "x": e.offsetX, "y": e.offsetY };
						}
			let XY = mouseXY(event);
			let svgC = d3.select("#svgC");
			
			svgC.append("rect")
			.attr("id","tipBack")
			.attr("class","tips")
			.attr("x", XY.x+10)
			.attr("y",XY.y-30)
			.style("width",d.properties.name.length>8? d.properties.name.length *15 +10 :140)
			.attr("rx",20);
			
			svgC.append("text")
			.attr("class","tips")
			.attr("dx",XY.x+20)
			.attr("dy",XY.y-5)
			.attr("text-anchor","start")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("fill", "white")
			.text(this.transform(d.properties.name))
			
			svgC.append("text")
			.attr("class","tips")
			.attr("dx",XY.x+20)
			.attr("dy",XY.y+15)
			.attr("text-anchor","start")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("fill", "white")
			.text(()=>{
				for(let i = 0;i<this.C_province.length;i++){
					if(d.properties.name == this.C_province[i].name){
						return  '专利份额:' + this.C_province[i].pat_pro.toFixed(4) ;
						
					}
				}
			}) 
		},
		transform(name){
			for(let i = 0;i<this.$store.state.province.length;i++){
				if (this.$store.state.province[i].substring(0,2) == name.substring(0,2)){
					return this.$store.state.province[i]
				}
			}
		},
		createSea(){
			var C_projection=d3.geo.mercator()
			.center([113,29]) //地图中心位置,107是经度，31是纬度
			.scale(350/1900 * this.$store.state.width) //设置缩放量
			.translate([this.widthC/2,this.heightC * 3 /5]); // 设置平移量
			var C_path=d3.geo.path()
			.projection(C_projection);
		
			
			
			d3.select("#Csea").selectAll("path")
			.data(this.seajson.data.features) // 绑定数据
			.enter()
			.append("path")
			.attr("class","path2")
			.style("fill","white")
			.style("stroke","black")
			.style("stroke-width",1)
			.attr("d",C_path)
			
			
		},
		getPatPro(d){
			for(let i = 0;i<this.C_province.length;i++){
				if(d.properties.name == this.C_province[i].name){
					return this.C_province[i].pat_pro 
				}
			}
		},
		createMap(){
			var C_projection=d3.geo.mercator()
			.center([113,29]) //地图中心位置,107是经度，31是纬度
			.scale(350/1900 * this.$store.state.width) //设置缩放量
			.translate([this.widthC/2,this.heightC * 3 /5]); // 设置平移量
			
			var C_path=d3.geo.path()
			.projection(C_projection);
			let svgC = d3.select("#svgC");
			let defs = d3.select("#svgC").append("defs");
			let linearGradient2 = defs.append("linearGradient")
									.attr("id","linearColor4")
									.attr("x1","0%")
									.attr("y1","100%")
									.attr("x2","0%")
									.attr("y2","0%");
			
			linearGradient2.append("stop")
							.attr("offset","0%")
							.style("stop-color","#ffffff");
			
			linearGradient2.append("stop")
							.attr("offset","100%")
							.style("stop-color","#00007f");
			
			let lgd = svgC.append("g").attr("id","Clgd")
			.style("display","none")
			.attr("transform",'translate('+[0,20]+')')
			lgd.append("rect")
			.attr("class","lgdC")
			
			.attr("x",this.widthC * 9 / 10 +3)
			.attr("y",this.heightC/5 )
			.attr("rx",6)
			.attr("width",12 )
			.attr("height",this.heightC * 3 /5)
			.style("fill","url(#" + linearGradient2.attr("id") + ")");
			
			lgd.append("text")
			.attr("class","lgdC")
			
			.attr("font-family", "sans-serif")
			.style("font-size", 15)
			.style("font-weight","bold")
			.attr("text-anchor","middle")
			.attr("dx",this.widthC * 9 / 10 +10)
			.attr("dy",this.heightC/5 -5 )
			.text(0.5);
			
			lgd.append("text")
			.attr("class","lgdC")
			
			.attr("font-family", "sans-serif")
			.style("font-size", 15)
			.style("font-weight","bold")
			.attr("text-anchor","middle")
			.attr("dx",this.widthC * 9 / 10 +10 )
			.attr("dy",this.heightC/5 *4 +15)
			.text(0)
		
			
			
			
			d3.select("#Cmap").selectAll("path")
			.data(this.geojson.data.features) // 绑定数据
			.enter()
			.append("path")
			.attr("class","path1")
			.style("fill","white")
			.style("stroke","black")
			.style("stroke-width",0.2)
			.attr("d",C_path)
			.on("mouseover",(d)=>{
				this.hovered = d.properties.name
				this.C_TipRemove()
				this.C_createTip(d);
				this.$store.commit({
					type:'userMouseover'
				})
			})
			.on("mousemove",d=>{
				this.C_TipRemove();
				this.C_createTip(d);
			})
			.on("mouseout",(d)=>{
				this.hovered = '';
				let pro = this.getPatPro(d)
				setTimeout(() => {
							this.C_TipRemove()
						}, 1300);
				this.$store.commit({
					type:'userMouseout',
					view:'viewC',
					obj:'tips(province)',
					width:this.widthC,
					height:this.heightC,
					name:this.transform(d.properties.name) +':' +this.selected,
					value:pro,
					desc0:'hover province: '+' in ' + this.transform(d.properties.name),
					desc:'the proportion of ' + this.transform(d.properties.name) + ' in ' + this.selected + ' is ' + pro.toFixed(3),
          data:{
            industry:this.selected,
            company:[],
            province:[this.transform(d.properties.name)],
            attribute:'proportion'
          }
				})
				this.$store.commit('OutRecordState')
			})
			.on("click",(d)=>{
				let pro = this.getPatPro(d)
				this.$store.commit({
					type:"elementClear",
					flag:'province'
				})
				this.$store.commit({
					type:'userClick',
					view:'viewC',
					width:this.widthC,
					height:this.heightC,
					obj:'select province',
					name:this.transform(d.properties.name) +':' +this.selected,
					value:pro,
					desc0: 'select province:' + this.transform(d.properties.name),
					desc:'the proportion of ' + this.transform(d.properties.name) + ' in ' + this.selected + ' is ' + pro.toFixed(3),
					visualKeys:{},

          data:{
            industry:this.selected,
            company:[],
            province:[this.transform(d.properties.name)],
            attribute:'proportion'
          }
					
				})
				this.$store.commit('ClickRecordState')
				
				
				if(this.matrixFlag=='tree'){
					this.$store.commit({
						type:"updateTreeData",
						//treeTypeFlag :'province',
						name:this.transform(d.properties.name)
					})
					this.$store.commit("synTreeData")
				}
				else{
					this.$store.commit({
						type : 'changeMatrixElement',
						element : this.transform(d.properties.name)
					})
				}
				
			})
			
		},
		C_update(){
			//console.log(this.C_province)
			d3.select("#Cmap").selectAll(".path1")
			.data(this.geojson.data.features)
			.style("stroke-width",0.2)
			.transition()
			.style("stroke-width",0.2)
			.style("fill",d=>{
				for(let i = 0;i<this.C_province.length;i++){
					if(d.properties.name == this.C_province[i].name){
						return this.C_province[i].pat_pro == 0? "white" :this.colorScale(this.C_province[i].pat_pro);
						
					}
				}
			})
			
		},
		inData(d,dataset){
			let a = this.transform(d.properties.name);
			if(dataset.indexOf(a) != -1){
				return true
			}
			else{
				return false
			}
		}
		
	},
	watch:{
		selected(val){
				
				d3.select("#Cmap")
				.style("display",'inline');
				d3.select("#Csea")
				.style("display",'inline');
				d3.select("#Clgd")
				.style("display",'inline');
				d3.select("#CTitle")
				.style("display",'inline')
				.text(val + '产业地区分布图');
				d3.select("#Cbtn")
				.style("display",'inline')
				d3.select("#svgC").select("#txt")
				.style("display",'inline')
				this.C_update()
			
			
		},
		treeD(){
			d3.select("#svgC").selectAll(".path1")
			.filter(d=>this.inData(d,this.treeData))
			.style("fill","#06ddf4");
			
			d3.select("#svgC").selectAll(".path1")
			.filter(d=>!this.inData(d,this.treeData))
			.style("fill",d=>{
				for(let i = 0;i<this.C_province.length;i++){
					if(d.properties.name == this.C_province[i].name){
						return this.C_province[i].pat_pro == 0? "white" :this.colorScale(this.C_province[i].pat_pro);
						
					}
				}
			})
		},
		hovered(val){
			
			d3.select("#Cmap").selectAll(".path1")
			.data(this.geojson.data.features)
			.filter(d=>val == d.properties.name ||this.inData(d,this.treeData))
			.style("fill",'#06ddf4');
			
			d3.select("#Cmap").selectAll(".path1")
			.data(this.geojson.data.features)
			.filter(d=>val != d.properties.name && !this.inData(d,this.treeData) )
			.style("fill",d=>{
				for(let i = 0;i<this.C_province.length;i++){
					if(d.properties.name == this.C_province[i].name){
						return this.C_province[i].pat_pro == 0? "white" :this.colorScale(this.C_province[i].pat_pro);
						
					}
				}
			})
			
		},
		matrixElement1(){
			d3.select("#svgC").selectAll(".path1")
			.filter(d=>this.inData(d,this.matrixElement))
			.style("stroke","red")
			.style("stroke-width",1);
			
			d3.select("#svgC").selectAll(".path1")
			.filter(d=>!this.inData(d,this.matrixElement))
			.style("stroke","black")
			.style("stroke-width",0.2);
		}
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

</style>
