<template>
	
	<svg id = 'graphSvg2' 
	:height = 'svgConfig.height' :width = 'svgConfig.width'
	@click = 'log()'>
	
	<g @click = 'allFlag = !allFlag'>
		<rect id = 'btnAll'
		:x = 'svgConfig.width - 110'
		:y = '20'
		:fill = 'allFlag? "#5aeaf1":"white"'></rect>
		<text
		:dx = 'svgConfig.width - 65'
		:dy = '45'
		fill = 'black'
		text-anchor = 'middle'>
			all
		</text>
	</g>
	
	<g id = 'linksRight'>
		<line v-for = '(d,i) in links'
		:key = 'i'
		:x1 = 'd.source.x'
		:x2 = 'd.target.x'
		:y1 = 'd.source.y'
		:y2 = 'd.target.y'
		stroke = '#e7fffc'
		stroke-width = 0.5
		:stroke-opacity = 'allFlag? 1:judgeLink(d)? 1:0.2'>
			
		</line>
	</g>
	<g id = 'circlesRight'>
		
	</g>
	<g id = 'tipRight' v-if = 'hover.flag'>
		<rect height = '60px'
		width = '200px'
		fill = '#95fdff'
		fill-opacity = 0.7
		:x = "XY[0] +10"
		:y = "XY[1] - 30"
		rx = 20>
			
		</rect>
		<text :dx = 'XY[0]+20' :dy = 'XY[1] - 5'>industry:{{hover.data.name}}</text>
		<text :dx = 'XY[0]+20' :dy = 'XY[1] + 15'>patent:{{hover.data.patent_num}}</text>
	</g>
	</svg>
	
</template>

<script>
	import * as d3 from "d3"
	export default{
		name:'graph',
		data(){
			return{
				color:d3.scale.category20(),
				svgConfig:{
					height:800,
					width:800,
					backgroundColor:"black",
					opacity:0.8,
				},
				XY:[0,0],
				allFlag:true,
				hover:{
					flag:false,
					data:{
						
					}
				}
				
			}
		},
		mounted(){

		},
		computed:{
			selected(){
				return this.$store.state.selected
			},
			flare(){
				return this.$store.state.flare
			},
			actionList(){
				return this.$store.state.user.actionList
			},
			attention(){
				let sol = []
				let list = []
				function getStr(string){
					for(let i = 0;i<string.length;i++){
						if(string.substring(i,i+1) == ':'){
							return string.substring(i+1,string.length)
						}
					}
				}
				for(let i = 0;i<this.actionList.length;i++){
					if(this.actionList[i].view == 'objA'){
						sol.push(this.actionList[i].name)
					}
					else if(this.actionList[i].obj == 'roam'){
						sol.push(this.actionList[i].data)
					}
					else if(this.actionList[i].obj == 'single_node' ||this.actionList[i].obj == 'tree_node_comparison'){
						sol.push(getStr(this.actionList[i].name))
					}
				}
				
				var pushParent =(d,list)=>{
					if(this.judge(d.name,list)){
						list.push(d.name)
					}
					if(d.parent){
						pushParent(d.parent,list)
					}
				}
				for(let i = 0;i<sol.length;i++){
					
					for(let j = 0;j<this.nodes.length;j++){
						if(sol[i] == this.nodes[j].name){
							console.log(this.nodes[j].name)
							pushParent(this.nodes[j],list)
						}
					}
				}
				
				return list
				
			},
			nodes(){
				let sol = []
				function traverse(node,depth){
					if (node.children){
						node.children.forEach(d=>{
							d.parent = node
							traverse(d,depth+1)
						})
					}
					node.depth = depth
					sol.push(node)
				}
				traverse(this.flare,0)
				return sol
			},
			links(){
				return d3.layout.tree().links(this.nodes)
			},
			flag(){
					return this.$store.state.graphBtn
			},
			force(){
				return d3.layout.force()
					.size([this.svgConfig.width,this.svgConfig.height])
					.on("tick",this.tick)
					.gravity(0.2)
					.charge(-200)
					.friction(0.85)
			},
			
		},
		methods:{
			judgeLink(d){
				if((!this.judge(d.source.name,this.attention)) && (!this.judge(d.target.name,this.attention))){
					return true
				}
				return false
			},
			judge(name,list){
				if(list.indexOf(name) != -1){
					return false
				}
				return true
			},
			log(){
				console.log(this.attention)
			},
			tick(){
				d3.select("#circlesRight")
				.selectAll('circle')
				.attr("cx",d=>d.x)
				.attr("cy",d=>d.y)
			},
			render(){
				this.force.links(this.links)
				.linkStrength(1)
				.linkDistance(30)
				.nodes(this.nodes)
				.start();
				
				d3.select("#circlesRight")
				.selectAll("circle")
				.data(this.nodes)
				.enter()
				.append("circle")
				
				d3.select("#circlesRight")
				.selectAll("circle")
				.data(this.nodes)
				.attr("r",d=>d.name == '半导体显示'? 10 :5)
				
				.style("fill",d=>d.parent? this.color(d.parent.name):"red")
				.style("fill-opacity",this.allFlag? 1:0.3)
				.call(this.force.drag)
				.on("mouseover",d=>{
					this.hover.flag = true
					this.hover.data = d
					console.log(d)
				})
				.on("mousemove",()=>{
					this.XY = [event.offsetX>this.svgConfig.width - 220? event.offsetX-220:event.offsetX,event.offsetY]
				})
				.on("mouseout",()=>{
					this.hover.flag = false
					this.hover.data = {}
				})
				
				d3.select("#circlesRight")
				.selectAll("circle")
				.data(this.nodes)
				.filter(d=>!this.judge(d.name,this.attention))
				.style("fill-opacity",1)
			}
		},
		watch:{
			allFlag(){
				this.render()
			},
			attention(){
				this.render()
			},
			links(){
				this.render()
			},
			selected(){
				this.render()
			}
			
		}
		
	}
</script>

<style>
	#graphSvg2{
		position:absolute;
		left:880px;
		top:70px;
		background-color: black;
		opacity:0.8
		
	}
	#btnAll{
		position:absolute;
		height :40px;
		width : 90px;
		rx:10px;
	}
</style>
