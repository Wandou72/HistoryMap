<template>
	
	<svg id = 'graphSvg' 
	:height = 'svgConfig.height' :width = 'svgConfig.width'
	@click = 'log()'>
		<g @click = 'linkFlag.index = !linkFlag.index'>
			<rect id = 'btnIndexLink'
			:x = 'svgConfig.width - 110'
			:y = '20'
			:fill = 'linkFlag.index? "#5aeaf1":"white"'></rect>
			<text
			:dx = 'svgConfig.width - 65'
			:dy = '45'
			fill = 'black'
			text-anchor = 'middle'>
				index link
			</text>
		</g>
		
		<g @click = 'linkFlag.view= !linkFlag.view'>
			<rect id = 'btnLink'
			:x = 'svgConfig.width - 210'
			:y = '20'
			:fill = 'linkFlag.view? "#5aeaf1":"white"'></rect>
			<text
			:dx = 'svgConfig.width - 165'
			:dy = '45'
			fill = 'black'
			text-anchor = 'middle'>
				view link
			</text>
		</g>
		
		<g id = 'linksLeft' v-show = 'linkFlag.view'>
			<line v-for = '(d,i) in links'
			:key = 'i'
			:x1 = 'd.source.x'
			:x2 = 'd.target.x'
			:y1 = 'd.source.y'
			:y2 = 'd.target.y'
			stroke = '#ff0000'
			stroke-width = 3>
				
			</line>
		</g>
		
		<g id = 'circlesLeft'>
			
		</g>
		<g id = 'indexLinks' v-show = 'linkFlag.index'>
			<template v-for = '(d,i) in links2'
			:key = 'i'>
				<line v-if = 'd.source && d.target'
				:x1 = "getNewPos(d.source,d.target,25)[0]"
				:x2 = 'getNewPos(d.target,d.source,30)[0]'
				:y1 = 'getNewPos(d.source,d.target,25)[1]'
				:y2 = 'getNewPos(d.target,d.source,30)[1]'
				
				
				:stroke = 'd.source.view == d.target.view? "white":"#00ff00"'
				stroke-width = 3
				>
				</line>
				<polygon v-if = 'd.source && d.target'
				:points = 'getPoint(d.source,d.target)'
				:fill = 'd.source.view == d.target.view? "white":"#00ff00"'>
					
				</polygon>
			</template>
		</g>
		
		<g id = 'textLeft'>
			<text v-for = '(d,i) in nodes'
			:key = 'i'
			:dx = 'd.x'
			:dy = 'd.y+8'
			fill = 'white'
			font-size = '22px'
			text-anchor = 'middle'
			font-weight = 'bold'
			>
				{{d.children?d.view.substring(3,4):d.index1}}
			</text>
			
		</g>
		<g id = 'tip' v-if = 'hover.flag'>
			<rect height = 120
			:width = 'hover.data.name.length>10?hover.data.name.length *18 +10:230'
			fill = '#95fdff'
			fill-opacity = 0.7
			:x = "XY[0] +10"
			:y = "XY[1] - 30"
			rx = 20>
				
			</rect>
			<text :dx = 'XY[0]+20' :dy = 'XY[1] - 5'>{{hover.data.name}}</text>
			<text :dx = 'XY[0]+20' :dy = 'XY[1] +15'>{{'view:'+'Svg' + hover.data.view.substring(hover.data.view.length-1,hover.data.view.length)}}</text>
			<text :dx = 'XY[0]+20' :dy = 'XY[1] +35'>{{'action:'+hover.data.obj}}</text>
			<text :dx = 'XY[0]+20' :dy = 'XY[1] +55'>{{'data:'+hover.data.data}}</text>
			<text :dx = 'XY[0]+20' :dy = 'XY[1] +75'>{{'type:' +(hover.data.lastTime?("hover for "+hover.data.lastTime.toFixed(2) + " seconds"):"click")}}</text>
		</g>
		
		
		
	</svg>
	
</template>

<script>
	import * as d3 from "d3"
	export default{
		name:'graph2',
		data(){
			return{
				color:d3.scale.category10(),
				svgConfig:{
					height:800,
					width:800,
					backgroundColor:"black",
					opacity:0.8,
				},
				linkFlag:{
					view:false,
					index:true
				},
				strokeScale:d3.scale.linear().domain([1,10]).range([2,10]),
				hover:{
					flag:false,
					data:{}
				},
				XY:[]
				
			}
		},
		mounted(){

		},
		computed:{
			flag(){
					return this.$store.state.graphBtn
			},
			
			force(){
				return d3.layout.force()
					.size([this.svgConfig.width,this.svgConfig.height])
					.on("tick",this.tick)
					.gravity(0.2)
					.charge(-1000)
					.friction(0.85)
			},
			actionList(){
				return this.$store.state.user.actionList
			},
			nodes(){
				let viewList = []
				let typeList = []
				for(let i = 0;i<this.actionList.length;i++){
					if(viewList.indexOf(this.actionList[i].view) == -1){
						viewList.push(this.actionList[i].view)
						typeList.push({view:this.actionList[i].view,children:[]})
					}
				}
				for(let i = 0;i<this.actionList.length;i++){
					for(let j = 0;j<typeList.length;j++){
						if(this.actionList[i].view == typeList[j].view){
							typeList[j].children.push(this.actionList[i])
						}
					}
				}
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
				for(let i = 0;i<typeList.length;i++){
					traverse(typeList[i],0)
				}
				
				return sol
				
			},
			links(){
				return d3.layout.tree().links(this.nodes)
			},
			links2(){
				let indexList = []
				
				for(let i = 0;i<this.nodes.length;i++){
					if (!this.nodes[i].children ){
						indexList.push(this.nodes[i])
						
					}
				}
				indexList.sort((a,b)=>a.index1 - b.index1)
				let indexLink = []
				for(let i = 0;i<indexList.length-1;i++){
					indexLink.push({source:indexList[i],target:indexList[i+1]})
				}
				return indexLink
			}
		},
		methods:{
			getAngle(point1,point2){
				let sin = this.tri(point1,point2,"sin")
				return Math.asin(sin)
			},
			getPoint(point1,point2){
				
				let r = 15,
				angle = Math.PI/6
				let theta = this.getAngle(point1,point2)
				
				if(point1.x<point2.x){
					theta = Math.PI-theta
				}
				
				let theta1 = theta - angle,
				theta2 = theta + angle,
				sin1 = Math.sin(theta1),
				sin2 = Math.sin(theta2),
				cos1 = Math.cos(theta1),
				cos2 = Math.cos(theta2)
				
				let x  = this.getNewPos(point2,point1,25)[0],
				y = this.getNewPos(point2,point1,25)[1]
				let p1 = [x  + r * cos1,y + r * sin1],
				p2 = [x + r * cos2,y + r * sin2],
				p3 = [x,y]
				return [p1,p2,p3]
				
			},
			log(){
				console.log(this.nodes)
				console.log(this.links)
				console.log(this.links2)
			},
			tick(){
				d3.select("#circlesLeft")
				.selectAll('circle')
				.attr("cx",d=>d.x)
				.attr("cy",d=>d.y)
			},
			tri(point1,point2,type){
				let x1 = point1.x,
				x2 = point2.x,
				y1 = point1.y,
				y2 = point2.y,
				a = y1-y2,
				b = x1-x2,
				c =Math.sqrt( a*a + b*b)
				if(type == 'sin'){
					return a/c
				}
				else if (type == 'cos'){
					return b/c
				}
				else if(type == 'tan'){
					return b==0? 0:a/b
				}
			},
			getNewPos(point1,point2,r){
				
				return [point1.x - r * this.tri(point1,point2,"cos"),point1.y - r * this.tri(point1,point2,"sin")]
				
					
				}
			
		},
		watch:{
			links(){
				this.force.links(this.links)
				.linkStrength(0.8)
				.linkDistance(100)
				.nodes(this.nodes)
				.start();
				
				d3.select("#circlesLeft")
				.selectAll("circle")
				.data(this.nodes)
				.enter()
				.append("circle")
				
				d3.select("#circlesLeft")
				.selectAll("circle")
				.attr("class","dots")
				.attr("r",d=>d.children? 25:18)
				
				.style("fill",d=> this.color(d.view))
				.style("stroke",d=>d.lastTime? "white":"none")
				.style("stroke-width",d=>d.lastTime? this.strokeScale(d.lastTime):0)
				.call(this.force.drag)
				.on("mouseover",d=>{
					if(!d.children){
						this.hover.flag = true;
						this.hover.data = d
					}
				})
				.on("mousemove",()=>{
					let wid = this.hover.data.name.length>10?this.hover.data.name.length *18 +10:230
					this.XY = [event.offsetX>this.svgConfig.width - wid -20? event.offsetX - wid -20: event.offsetX,event.offsetY]
				})
				.on("mouseout",(d)=>{
					if(!d.children){
						this.hover.flag = false;
						this.hover.data = {}
					}
				});
				
			}
		}
		
	}
</script>

<style>
	#graphSvg{
		position:absolute;
		left:50px;
		top:70px;
		background-color: black;
		opacity:0.8
		
	}
	#btnIndexLink ,#btnLink{
		position:absolute;
		height :40px;
		width : 90px;
		rx:10px;
	}
</style>
