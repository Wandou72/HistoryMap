<template>
	
    <svg id = "svgD" >
		<text id = 'txD'>Select Mode:{{matrixFlag}}</text>
		<rect
	x = 0
	:y = 'heightD - 50'
	height = 50
	width = 60
	fill = 'orange'>
	</rect>
	<text
	dx = 30
	:dy = 'heightD - 17'
	text-anchor = 'middle'
	fill = 'white'
	font-size = 25
	font-weight = 'bold'
	>B
	</text>
	</svg>

</template>

<script>
import * as d3 from "d3"

//import axios from 'axios'

export default {
	name: 'componentD',
	data(){
		return {
			heightD:this.$store.state.height * 0.5,
			widthD:this.$store.state.width * 0.3,
			hovered:'',
			nodesLength:0,
			
		}
	},
	mounted(){
		d3.select("#txD")
		.attr("dy",70)
		.attr("dx",this.widthD-150)
		.style("display",'none')
		//console.log(this.$store.state.data_overall)
		d3.select("#svgD")
		.attr("width",this.widthD)
		.attr("height",this.heightD);
		
		this.$store.commit({
			type:'appendTitle',
			id:'DTitle',
			class:'classD',
			svg:'svgD',
			dx:'24px',
			dy:'36px',
			size:'20px'
			
		})
		
		this.$store.commit({
			type:'appendBtn',
			svgID:'svgD',
			btnID:'Dbtn',
			width:this.widthD,
			text:'switch'
		})
		
		d3.select("#svgD").select("#Dbtn")
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
	},
	computed:{
		matrixElement1(){
			return this.matrixElement+'1'
		},
		matrixElement(){
			return this.$store.state.matrixElement
		},
		matrixFlag(){
			return this.$store.state.matrixFlag
		},
		treeTypeFlag(){
			return this.$store.state.treeTypeFlag
		},
		treeD(){
			return this.treeData+'1'
		},
		treeData(){
			return this.$store.state.objB.treeData
		},
		circled(){
			return this.$store.state.objD.circled
		},
		circledLength(){
			return this.circled.length
		},
		D_title(){
			return this.$store.state.objD.title
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
			return d3.scale.linear().domain([0,this.nodesLength]).range(["#aaa7aa","#4e7f78"]);
		},
	},
	methods:{
		
		D_TipRemove(){
			d3.select("#svgD").selectAll(".tips").remove()
		},
		D_createTip(d){
			function mouseXY(e){
							e=e||window.event;
							return { "x": e.offsetX, "y": e.offsetY };
						}
			let XY = mouseXY(event);
			
			d3.select("#svgD").append("rect")
			.attr("id","tipBack")
			.attr("class","tips")
			.attr("x", XY.x+10)
			.attr("y",XY.y-30)
			.style("width",d.name.length *15 +10)
			.attr("rx",20);
			
			d3.select("#svgD").append("text")
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
			
			d3.select("#svgD").append("text")
			.attr("class","tips")
			.attr("dx",XY.x+20)
			.attr("dy",XY.y+15)
			.attr("text-anchor","start")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("fill", "white")
			.text('专利数:'+d.patent_num)
		},
		inner(x){
			let D_nodes;
			let inner = [];
			let temp = [];
			let indid = "";
			let indname = "";
			for(let i = 0;i<this.data_overall.length;i++){
				if(this.data_overall[i].name2 == x){
					temp.push({name:this.data_overall[i].comp_name,patent_num:this.data_overall[i].patent_num});
					indid = i+1;
				}
				else if(this.data_overall[i].name3 == x){
					temp.push({name:this.data_overall[i].comp_name,patent_num:this.data_overall[i].patent_num});
					indid = i+1;
				}
				else if(this.data_overall[i].name4 == x){
					temp.push({name:this.data_overall[i].comp_name,patent_num:this.data_overall[i].patent_num});
					indid = i+1;
				}
				else if(this.data_overall[i].name5 == x){
					temp.push({name:this.data_overall[i].comp_name,patent_num:this.data_overall[i].patent_num});
					indid = i+1;
				}
				else if(this.data_overall[i].name6 == x){
					temp.push({name:this.data_overall[i].comp_name,patent_num:this.data_overall[i].patent_num});
					indid = i+1;
				}
				else if(this.data_overall[i].name7 == x){
					temp.push({name:this.data_overall[i].comp_name,patent_num:this.data_overall[i].patent_num});
					indid = i+1;
				}
				else if(this.data_overall[i].name8 == x){
					temp.push({name:this.data_overall[i].comp_name,patent_num:this.data_overall[i].patent_num});
					indid = i+1;
				}
			}
			for(var i = 0;i<this.data_overall.length;i++){
				if(indid == this.data_overall[i].id){
					indname = this.data_overall[i].industry_name;
					break;
				}
			}
			inner = {name:x,children:temp};
			console.log("indname"+indname)
			let r = this.widthD * 0.65;
			
			let pack = d3.layout.pack()
			.size([r,r])
			.value(function(d){return d.patent_num});
			
			D_nodes = pack.nodes(inner);
			this.nodesLength = D_nodes.length;
			D_nodes.sort(function(a,b){
				return a.patent_num-b.patent_num
			}); 
			//let color2 = d3.scale.linear().domain([0,D_nodes.length]).range(["#aaa7aa","#4e7f78"]);
			//console.log(D_nodes)
			d3.select("#svgD").selectAll("circle")
			.data(D_nodes)
			.enter()
			.append("circle")
			.attr("class","classD")
			.attr("id",function(d){return d.name;})
			
			d3.select("#svgD").selectAll("circle")
			.data(D_nodes)
			.attr("transform","translate(70,50)")
			.attr("cx",function(d){return d.x;})
			.attr("cy",function(d){return d.y;})
			.attr("r",function(d){return d.r;})
			.on("mouseover",(d)=>{
				this.hovered = d.name
				this.D_TipRemove()
				this.D_createTip(d)
				
				this.$store.commit({
					type:'userMouseover',
				})
			})
			.on("mousemove",d=>{
				this.D_TipRemove()
				this.D_createTip(d)
			
			})
			.on("mouseout",(d)=>{
				this.hovered = ''
				setTimeout(() => {
							this.D_TipRemove()
						}, 1500);
				
				this.$store.commit({
					type:'userMouseout',
					view:'viewD',
					width:this.widthD,
					height:this.heightD,
					obj:'tips(company)',
					name:d.name + ':'+ this.selected,
					value:d.patent_num,
					desc0: 'hover company' + d.name,
					desc:'the patent number of ' + d.name + ' in ' + this.selected + ' is ' + d.patent_num,
          data:{
            industry:this.selected,
            company:[d.name],
            province:[],
            attribute:'patent_num'
          }
				})
				this.$store.commit('OutRecordState')
			})
			.on("click",(d)=>{
				this.$store.commit({
					type:"elementClear",
					flag:'company'
				})

				//这里也要存储
				// this.$store.commit({
				// 	type:"clearStatesB",
				// 	flag:'company'
				// })
				
				this.$store.commit({
					type:'userClick',
					view:'viewD',
					width:this.widthD,
					height:this.heightD,
					obj:'select company',
					name:d.name + ':'+ this.selected,
					value:d.patent_num,
					desc0: 'select company' + d.name,
					desc:'the patent number of ' + d.name + ' in ' + this.selected + ' is ' + d.patent_num,
					visualKeys:{},
          data:{
            industry:this.selected,
            company:[d.name],
            province:[],
            attribute:'patent_num'
          }
				})
				
				this.$store.commit('ClickRecordState')
				// 这里要存储
				if(this.matrixFlag=='tree'){
					this.$store.commit({
						type:"updateTreeData",
						//treeTypeFlag :'company',
						name:d.name
					})

					this.$store.commit("synTreeData")

					
				}
				else{
					this.$store.commit({
						type : 'changeMatrixElement',
						element : d.name
					})
				}
				//console.log(this.$store.state.objD.circled)
			})
			.style("stroke","none")
			.style("stroke-width",2)
			.style("fill","white")
			.transition().delay(function(d,i){return i+ d.r*3}).duration(500)
			.style("fill",(d,i)=>{return d.patent_num?this.colorScale(i):"none";});
			
			d3.select("#svgD").selectAll("circle")
			.data(D_nodes)
			.exit()
			.remove()
		},
		ale(){
			//console.log(this.$store.state.data_overall)
		}
	},
	watch:{
		leaf(val){
			if(val){
				this.inner(this.selected);
				d3.select("#Dbtn")
				.style("display",'inline')
				d3.select("#txD")
				.style("display",'inline')
			}
			else{
				d3.select("#svgD")
				.selectAll("circle")
				.remove();
				d3.select("#DTitle")
				.text('')
				d3.select("#Dbtn")
				.style("display",'none')
				d3.select("#txD")
				.style("display",'none')
			}
		},
		selected(val){
			if(this.leaf){
				this.inner(val);
				
			}
		},
		D_title(val){
			console.log("changeDtitle",val)
			if(this.leaf){
				d3.select("#DTitle")
				.text(val + '产业包含企业情况')
			}
		},
		hovered(val){
			
			
			d3.select("#svgD").selectAll("circle")
			.filter(d=>d.name != val)
			.style("fill",(d,i)=>{return d.patent_num?this.colorScale(i):"none";});
			
			d3.select("#svgD").selectAll("circle")
			.filter(d=>this.treeData.indexOf(d.name) != -1)
			.style("fill",'#25f4ff')
			
			d3.select("#svgD").selectAll("circle")
			.filter(d=>{return d.name == val && d.depth!= 0})
			.style("fill","red");
		},
		
		treeD(){
	
				d3.select("#svgD").selectAll("circle")
				.filter(d=>this.treeData.indexOf(d.name) != -1)
				.style("fill",'#25f4ff')
				
				
				
				
				d3.select("#svgD").selectAll("circle")
				.filter(d=>this.treeData.indexOf(d.name) == -1)
				.style("fill",(d,i)=>{return d.patent_num?this.colorScale(i):"none";});
				
		},
		matrixElement1(){
			d3.selectAll("#svgD").selectAll("circle")
			.filter(d=>{
				if(this.matrixElement.indexOf(d.name) != -1){
					return true
				}
			})
			.style("stroke","red");
			
			d3.selectAll("#svgD").selectAll("circle")
			.filter(d=>{
				if(this.matrixElement.indexOf(d.name) == -1){
					return true
				}
			})
			.style("stroke","none")
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
