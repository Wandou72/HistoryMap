<template>
	
	<svg id = 'graphSvg' 
	:height = 'svgConfig.height' :width = 'svgConfig.width'
	@click = 'log()'>
      <g @click = 'innerLinkFlag = !innerLinkFlag'>
        <rect id = 'btnIndexLink'
        :x = 'svgConfig.width - 110'
        :y = '20'
        :fill = 'innerLinkFlag? "#5aeaf1":"white"'></rect>
        <text
        :dx = 'svgConfig.width - 65'
        :dy = '45'
        fill = 'black'
        text-anchor = 'middle'>
          inner link
        </text>
      </g>
      
      <g @click = 'outerLinkFlag = !outerLinkFlag'>
        <rect id = 'btnIndexLink'
        :x = 'svgConfig.width - 210'
        :y = '20'
        :fill = 'outerLinkFlag? "#5aeaf1":"white"'></rect>
        <text
        :dx = 'svgConfig.width - 165'
        :dy = '45'
        fill = 'black'
        text-anchor = 'middle'>
          outer link
        </text>
      </g>

    <g id = 'graph'>
      <g id = 'outerLinks' v-show = 'outerLinkFlag'>
        
      </g>
      <g id = 'outerCircle' v-if = 'actionList.length>4'>
   
        <path v-for = '(d,i) in arcData'
        :key = 'i'
        :d = 'arc(d,i)'
        :fill = 'd.color'
        fill-opacity = '0.8'
        :transform = "'translate('+[svgConfig.width/2,svgConfig.height/2]+')'">
          
        </path>
        <circle v-for = '(d,i) in actionNodes'
        :key = 'i'
        :cx = 'd.xy[0]'
        :cy = 'd.xy[1]'
        r = 10
        :fill = 'color(d.data.view)'
        stroke = 'white'
        @mouseover = 'outerTip(d),outerHighlight(d)'
        @mouseout = 'hover.flag = false,outerOut()'>
          
        </circle>
        
      </g>
      <g id = 'innerLinks' v-show = 'innerLinkFlag'>
          
        
      </g>
      <g id = 'innerGraph' >
        
      </g>
      
  
    </g>
    
      <g id = 'tip' v-if = 'hover.flag && hover.type == "outer"'>
        <rect height = 80
        :width = 'hover.data.data.obj.length>10?(hover.data.data.obj.length+12) *8 +10:230'
        fill = '#95fdff'
        fill-opacity = 0.7
        :x = "XY[0] +10"
        :y = "XY[1] - 30"
        rx = 20>
          
        </rect>
        <text :dx = 'XY[0]+20' :dy = 'XY[1] - 5'>Interaction: {{hover.data.data.obj}}</text>
        <text :dx = 'XY[0]+20' :dy = 'XY[1] +15'>View: {{ hover.data.data.view.substring(hover.data.data.view.length-1,hover.data.data.view.length)}}</text>
        <text :dx = 'XY[0]+20' :dy = 'XY[1] +35'>Time stamp: {{hover.data.data.timeStamp.toFixed(2)}}</text>
        <!-- <text :dx = 'XY[0]+20' :dy = 'XY[1] +55'>{{'data:'+hover.data.data}}</text>
        <text :dx = 'XY[0]+20' :dy = 'XY[1] +75'>{{'type:' +(hover.data.lastTime?("hover for "+hover.data.lastTime.toFixed(2) + " seconds"):"click")}}</text> -->
      </g>
      
      <g id = 'tip' v-if = 'hover.flag && hover.type == "inner"'>
        <rect height = 80
        :width = 'hover.data.name.length>10?(hover.data.name.length+5) *15 +10:230'
        fill = '#95fdff'
        fill-opacity = 0.7
        :x = "XY[0] +10"
        :y = "XY[1] - 30"
        rx = 20>
          
        </rect>
        <text :dx = 'XY[0]+20' :dy = 'XY[1] - 5'>Name: {{hover.data.name}}</text>
        <text :dx = 'XY[0]+20' :dy = 'XY[1] +15'>Type: {{hover.data.type}}</text>
        <text :dx = 'XY[0]+20' :dy = 'XY[1] +35'>Count: {{hover.data.count}}</text>
        <!-- <text :dx = 'XY[0]+20' :dy = 'XY[1] +55'>{{'data:'+hover.data.data}}</text>
        <text :dx = 'XY[0]+20' :dy = 'XY[1] +75'>{{'type:' +(hover.data.lastTime?("hover for "+hover.data.lastTime.toFixed(2) + " seconds"):"click")}}</text> -->
      </g>
	</svg>
	
</template>

<script>
	import * as d3 from "d3"
	export default{
		name:'graphNew',
		data(){
			return{
				color:d3.scale.category10(),
				svgConfig:{
					height:this.$store.state.height * 0.95,
					width:this.$store.state.width * 0.95,
					backgroundColor:"black",
					opacity:0.8,
				},
        innerLinkFlag:true,
        outerLinkFlag:true,
        hover:{
          flag:false,
          data:{},
          type:'inner'
        },
        XY:[]
				
				
			}
		},
		mounted(){

		},
		computed:{
      minw(){
        let min = 9999
        for(let i = 0;i<this.dataLinks.length;i++){
          if(this.dataLinks[i].weight < min && this.dataLinks[i].weight>0){
            min = this.dataLinks[i].weight
          }
        }
        return min
      },
      maxw(){
        let max = 0
        for(let i = 0;i<this.dataLinks.length;i++){
          if(this.dataLinks[i].weight > max){
            max = this.dataLinks[i].weight
          }
        }
        return max
      },
      adjMatrix(){
        let sol = []
        let n = this.dataNodes.length
        var getWeight = (i,j,links)=>{
          if(i == j){
            return 0
          }
          for(let k = 0;k<links.length;k++){
            if((links[k].i == i && links[k].j == j)||
            (links[k].i == j && links[k].j == i)){
              return links[k].weight
            }
          }
          return 0
        }
        for(let i = 0;i<n;i++){
          let vector = []
          for(let j = 0;j<n;j++){
            vector.push(getWeight(i,j,this.dataLinks))
          }
          sol.push(vector)
        }
        return sol
        
      },
      arc(){
        return d3.svg.arc().outerRadius(this.svgConfig.height/2-18) 
                        .innerRadius(this.svgConfig.height/2-22);
      },
      arcData(){
        let endR = Math.PI * 2  * 350/360
        let endT = this.actionList[this.actionList.length-1].timeStamp
        let sol = []
        for(let i = 0;i<this.actionList.length-1;i++){
          
          sol.push({
            startAngle:this.actionList[i].timeStamp/endT * endR,
            endAngle:this.actionList[i+1].timeStamp/endT *endR,
            color:this.color(this.actionList[i].view)
          })
        }
        return sol
        /* var data = [ 
            {startAngle: 0, endAngle: 0.1 * endAngle},
            {startAngle: 0.1 * endAngle, endAngle: 0.2 * endAngle},
            {startAngle: 0.2 * endAngle, endAngle: 0.4 * endAngle},
            {startAngle: 0.4 * endAngle, endAngle: 0.6 * endAngle},        
            {startAngle: 0.6 * endAngle, endAngle: 0.7 * endAngle},        
            {startAngle: 0.7 * endAngle, endAngle: 0.9 * endAngle},        
            {startAngle: 0.9 * endAngle, endAngle: endAngle}
        ]; */
      },
      force(){
          return d3.layout.force()
            .size([this.svgConfig.width,this.svgConfig.height])
            .on("tick",this.tick)
            .gravity(0.1)
            .charge(-1000)
            .friction(0.85)
      },
			actionList(){
				return this.$store.state.user.actionList
			},
      actionNodes(){
        if(this.actionList.length<2){
          return []
        }
        else{
          let center = [this.svgConfig.width/2,this.svgConfig.height/2]
          let endT = this.actionList[this.actionList.length-1].timeStamp
          let endR = Math.PI * 2  * 350/360
          let R = this.svgConfig.height/2 - 20
          var getPos = (data,outerRadius,endTime,endRadius)=>{
            let alpha = (data.timeStamp )/(endTime) * endRadius
            return [center[0] + outerRadius * Math.sin(alpha),
            center[1] - outerRadius * Math.cos(alpha)]
          }
          let sol = []
          for(let i = 0;i<this.actionList.length;i++){
            sol.push({xy:getPos(this.actionList[i],R,endT,endR),data:this.actionList[i]})
          }
          return sol
        }
        
        
      },
      dataNodes(){
        let sol = []
        if(this.actionList.length<2){
          return sol
        }
        else{
          let lst = []
          for(let i = 0;i<this.actionList.length;i++){
            if(this.actionList[i].data.industry!=''){
              lst.push({name:this.actionList[i].data.industry,type:'industry'})
            }
            if(this.actionList[i].data.company.length>0){
              for(let j = 0;j<this.actionList[i].data.company.length;j++){
                lst.push({name:this.actionList[i].data.company[j],type:'company'})
              }
            }
            if(this.actionList[i].data.province.length>0){
              for(let j = 0;j<this.actionList[i].data.province.length;j++){
                lst.push({name:this.actionList[i].data.province[j],type:'province'})
              }
            }
            if(this.actionList[i].data.attribute!=''){
              lst.push({name:this.actionList[i].data.attribute,type:'attribute'})
            }
          }
          let tmp = []
          var count = (str,arr)=>{
            let c = 0
            for(let i = 0;i<arr.length;i++){
              if(arr[i].name == str){
                c++
              }
            }
            return c
          }
          for(let i = 0;i<lst.length;i++){
            if(tmp.indexOf(lst[i].name) == -1){
              tmp.push(lst[i].name)
              sol.push({name:lst[i].name,type:lst[i].type,count:count(lst[i].name,lst)})
            }
          }
          return sol
        }
      },
      dataNodes2(){
        return this.dataNodes.length
      },
      dataLinks(){
        let sol = []
        if(this.actionList.length<2){
          return []
        }
        else{
          var judgeIn = (key1,key2,lst)=>{
            for(let i = 0;i<lst.length;i++){
              if((lst[i].source.name == key1 && lst[i].target.name == key2)
              ||(lst[i].source.name == key2 && lst[i].target.name == key1)){
                return i
              }
            }
            return 'notIn'
          }
          var getIndex = (key,lst)=>{
            for(let i = 0;i<lst.length;i++){
              if(lst[i].name == key){
                return i
              }
            }
          }
          for(let i = 0;i<this.actionNodes.length;i++){
            let tmp = []
            if(this.actionList[i].data.industry!=''){
              tmp.push(this.actionList[i].data.industry)
            }
            if(this.actionList[i].data.company.length>0){
              for(let j = 0;j<this.actionList[i].data.company.length;j++){
                tmp.push(this.actionList[i].data.company[j])
              }
            }
            if(this.actionList[i].data.province.length>0){
              for(let j = 0;j<this.actionList[i].data.province.length;j++){
                tmp.push(this.actionList[i].data.province[j])
              }
            }
            if(this.actionList[i].data.attribute!=''){
              tmp.push(this.actionList[i].data.attribute)
            }
            
            for(let j = 0;j<tmp.length-1;j++){
              for(let k = j+1;k<tmp.length;k++){
                if(judgeIn(tmp[j],tmp[k],sol) == 'notIn' && tmp[j]!=tmp[k]){
                  sol.push({source:this.dataNodes[getIndex(tmp[j],this.dataNodes)],
                  target:this.dataNodes[getIndex(tmp[k],this.dataNodes)],
                  weight:1,
                  i:getIndex(tmp[j],this.dataNodes),
                  j:getIndex(tmp[k],this.dataNodes)})
                }
                else{
                  sol[judgeIn(tmp[j],tmp[k],sol)].weight++
                }
              }
            }
          }
        }
        return sol
      },
      interactionLinks(){
        let sol = []
        if(this.actionList.length<2){
          return []
        }
        else{
          var getIndex = (key,lst)=>{
            for(let i = 0;i<lst.length;i++){
              if(lst[i].name == key){
                return i
              }
            }
          }
          for(let i = 0;i<this.actionNodes.length;i++){
            let tmp = []
            if(this.actionList[i].data.industry!=''){
              tmp.push(this.actionList[i].data.industry)
            }
            if(this.actionList[i].data.company.length>0){
              for(let j = 0;j<this.actionList[i].data.company.length;j++){
                tmp.push(this.actionList[i].data.company[j])
              }
            }
            if(this.actionList[i].data.province.length>0){
              for(let j = 0;j<this.actionList[i].data.province.length;j++){
                tmp.push(this.actionList[i].data.province[j])
              }
            }
            if(this.actionList[i].data.attribute!=''){
              tmp.push(this.actionList[i].data.attribute)
            }
            for(let j = 0;j<tmp.length;j++){
              sol.push({
                source:this.actionNodes[i],
                target:this.dataNodes[getIndex(tmp[j],this.dataNodes)]
              })
            }
            
            
          }
          return sol
        }
      },
			
		},
		methods:{
      cc(i,j,adj){
        let common = []
        let sol = 0
        let r = this.maxw - this.minw
        let t = 0.5 // t is in [0,1],constant
        for(let k = 0;k<adj.length;k++){
            if(adj[i][k]>0 && adj[j][k]>0){
              common.push(k)
            }
        }
        if(!common){
          return sol
        }
        else{
          for(let k = 0;k<common.length;k++){
            let index = common[k]
            let w = Math.min(adj[i][index],adj[j][index])
            sol += w * Math.exp(-((w-this.maxw)/(r*t+n))**2)
            
          }
        }
        return sol
        
      },
      outerTip(d){
        
        this.XY = [d.xy[0],d.xy[1]>this.svgConfig.height/2? d.xy[1]-30 : d.xy[1]+30]
        this.hover.flag = true
        this.hover.type = 'outer'
        this.hover.data = d
        
      },
      innerHighlight(d){
        let tmp = [d.name]
        
        for(let i = 0;i<this.dataLinks.length;i++){
          if(d.name == this.dataLinks[i].target.name){
            tmp.push(this.dataLinks[i].source.name)
          }
          else if(d.name == this.dataLinks[i].source.name){
            tmp.push(this.dataLinks[i].target.name)
          }
        }
        
        d3.select("#innerGraph").selectAll("circle")
        .filter(d=>tmp.indexOf(d.name)==-1)
        .style("fill-opacity",0.3)
        .style("stroke-opacity",0.3)
        
        d3.select("#innerGraph").selectAll("circle")
        .filter(d=>tmp.indexOf(d.name)!=-1)
        .style("fill-opacity",1)
        .style("stroke-opacity",1)
        
        d3.select("#innerLinks").selectAll("line")
        .filter(k=>tmp.indexOf(k.source.name)!=-1 && tmp.indexOf(k.target.name)!=-1)
        .style("stroke-opacity",1)
        
        d3.select("#innerLinks").selectAll("line")
        .filter(k=>tmp.indexOf(k.source.name)==-1 || tmp.indexOf(k.target.name)==-1)
        .style("stroke-opacity",0)
        
        d3.select("#outerLinks")
        .selectAll("line")
        .filter(k=>k.target.name == d.name)
        .style("stroke-opacity",1)
        .style("stroke-width",2)
        
        d3.select("#outerLinks")
        .selectAll("line")
        .filter(k=>k.target.name != d.name)
        .style("stroke-opacity",0)
        
        d3.select("#outerLinks")
        .selectAll("polygon")
        .filter(k=>k.target.name == d.name)
        .style("fill-opacity",1)
        
        d3.select("#outerLinks")
        .selectAll("polygon")
        .filter(k=>k.target.name != d.name)
        .style("fill-opacity",0)
        
        
      },
      outerHighlight(d){
        let tmp = []
        if(d.data.data.industry!=''){
          tmp.push(d.data.data.industry)
        }
        if(d.data.data.company.length>0){
          for(let j = 0;j<d.data.data.company.length;j++){
            tmp.push(d.data.data.company[j])
          }
        }
        if(d.data.data.province.length>0){
          for(let j = 0;j<d.data.data.province.length;j++){
            tmp.push(d.data.data.province[j])
          }
        }
        if(d.data.data.attribute!=''){
          tmp.push(d.data.data.attribute)
        }
        
        d3.select("#innerGraph").selectAll("circle")
        .filter(d=>tmp.indexOf(d.name)==-1)
        .style("fill-opacity",0.3)
        .style("stroke-opacity",0.3)
        
        d3.select("#innerGraph").selectAll("circle")
        .filter(d=>tmp.indexOf(d.name)!=-1)
        .style("fill-opacity",1)
        .style("stroke-opacity",1)
        
        d3.select("#outerLinks")
        .selectAll("line")
        .filter(k=>k.source.data.timeStamp == d.data.timeStamp)
        .style("stroke-opacity",1)
        .style("stroke-width",2)
        
        d3.select("#outerLinks")
        .selectAll("line")
        .filter(k=>k.source.data.timeStamp != d.data.timeStamp)
        .style("stroke-opacity",0)
       
        d3.select("#outerLinks")
        .selectAll("polygon")
        .filter(k=>k.source.data.timeStamp == d.data.timeStamp)
        .style("fill-opacity",1)
        
        d3.select("#outerLinks")
        .selectAll("polygon")
        .filter(k=>k.source.data.timeStamp != d.data.timeStamp)
        .style("fill-opacity",0)
        
        d3.select("#innerLinks").selectAll("line")
        .filter(k=>tmp.indexOf(k.source.name)!=-1 && tmp.indexOf(k.target.name)!=-1)
        .style("stroke-opacity",1)
        
        d3.select("#innerLinks").selectAll("line")
        .filter(k=>tmp.indexOf(k.source.name)==-1 || tmp.indexOf(k.target.name)==-1)
        .style("stroke-opacity",0)
        
        
        
      },
      outerOut(){
        d3.select("#innerGraph").selectAll("circle")
        .style("fill-opacity",1)
        .style("stroke-opacity",1)
        
        d3.select("#innerLinks").selectAll("line")
        .style("stroke-opacity",1)
        .style("stroke-width",2)
        
        d3.select("#outerLinks").selectAll("line")
        .style("stroke-opacity",1)
        .style("stroke-width",0.5)
        
        d3.select("#outerLinks")
        .selectAll("polygon")
        //.filter(k=>k.source.data.timeStamp == d.data.timeStamp)
        .style("fill-opacity",1)
        
      },
			getAngle(point1,point2){
				let sin = this.tri(point1,point2,"sin")
				return Math.asin(sin)
			},
			getPoint(point1,point2){
				
				let r = 15,
				angle = Math.PI/9
				let theta = this.getAngle(point1,point2)
				
				if(point1.xy[0]<point2.x){
					theta = Math.PI-theta
				}
				
				let theta1 = theta - angle,
				theta2 = theta + angle,
				sin1 = Math.sin(theta1),
				sin2 = Math.sin(theta2),
				cos1 = Math.cos(theta1),
				cos2 = Math.cos(theta2)
				
				let x  = this.getNewPos(point2,point1,-(10 + point2.count * 3) - 10)[0],
				y = this.getNewPos(point2,point1,-(10 + point2.count * 3)-10)[1]
				let p1 = [x  + r * cos1,y + r * sin1],
				p2 = [x + r * cos2,y + r * sin2],
				p3 = [x,y]
				return [p1,p2,p3]
				
			},
			log(){
				console.log('actNode',this.actionNodes)
        console.log('dataNode',this.dataNodes)
        console.log('dataLink',this.dataLinks)
        console.log('interLink',this.interactionLinks)
        console.log('arc',this.arcData)
        console.log('adjcent',this.adjMatrix)
        console.log('comon',this.cc(0,1,this.adjMatrix))
        
        //this.createNodes()
			},
			tick(){
				d3.select("#innerGraph")
				.selectAll('circle')
				.attr("cx",d=>d.x)
				.attr("cy",d=>d.y)
        
        d3.select("#innerLinks").selectAll("line")
        .attr("x1",d=>d.source.x)
        .attr("x2",d=>d.target.x)
        .attr("y1",d=>d.source.y)
        .attr("y2",d=>d.target.y)
        
        d3.select("#outerLinks").selectAll("line")
        .attr("x1",d=>d.source.xy[0])
        .attr("x2",d=>this.getNewPos(d.target,d.source,-(10 + d.target.count * 3) - 10)[0])
        .attr("y1",d=>d.source.xy[1])
        .attr("y2",d=>this.getNewPos(d.target,d.source,-(10 + d.target.count * 3) - 10)[1])
        
        d3.select("#outerLinks").selectAll("polygon")
        .attr("points",d=>this.getPoint(d.source,d.target))
			},
			tri(point1,point2,type){
       
				let x1 = point1.xy[0],
				x2 = point2.x,
				y1 = point1.xy[1],
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
				
        
				return [point1.x - r * this.tri(point2,point1,"cos"),point1.y - r * this.tri(point2,point1,"sin")]
				
					
			},
      createNodes(){
        
        this.force
        .linkStrength(0.8)
        .linkDistance(100)
        .nodes(this.dataNodes)
        .links(this.dataLinks)
        .start();
        
        d3.select("#innerGraph")
        .selectAll("circle")
        .data(this.dataNodes)
        .enter()
        .append("circle")
        .call(this.force.drag)
        
        d3.select("#innerGraph")
        .selectAll("circle")
        .data(this.dataNodes)
        .attr("class","dots")
        .attr("r",20)
        .style("fill",d=> this.color(d.type))
        .style("stroke",'white')
        
        
        d3.select("#innerLinks")
        .selectAll("line")
        .data(this.dataLinks)
        .enter()
        .append("line")
        
        d3.select("#innerLinks")
        .selectAll("line")
        .data(this.dataLinks)
        .attr("stroke",'red')
        .attr('stroke-width',2)
      }
			
		},
		watch:{
			dataNodes(){
        this.force
        .linkStrength(0.8)
        .linkDistance(300)
        .nodes(this.dataNodes)
        .links(this.dataLinks)
        .start();
        
        d3.select("#innerGraph")
        .selectAll("circle")
        .data(this.dataNodes)
        .enter()
        .append("circle")
        .call(this.force.drag)
        
        d3.select("#innerGraph")
        .selectAll("circle")
        .data(this.dataNodes)
        .attr("r",d=>10 + d.count * 3)
        .style("fill",d=> this.color(d.type))
        .style("stroke",'white')
          .on("mouseover",d=>{
              this.hover.type = 'inner'
              this.hover.flag = true
              this.hover.data = d
              this.innerHighlight(d)
            
          })
          .on("mousemove",()=>{
            let wid = this.hover.data.name.length>10?(this.hover.data.name.length+5) * 10 +10:230
            this.XY = [event.offsetX>this.svgConfig.width - wid -20? event.offsetX - wid -20: event.offsetX,event.offsetY]
          })
          .on("mouseout",()=>{
            
              this.hover.flag = false;
              this.hover.data = {}
              this.outerOut()
          });
        
        d3.select("#innerGraph")
        .selectAll("circle")
        .data(this.dataNodes)
        .exit()
        .remove()
        
        d3.select("#innerLinks")
        .selectAll("line")
        .data(this.dataLinks)
        .enter()
        .append("line")
        
        d3.select("#innerLinks")
        .selectAll("line")
        .data(this.dataLinks)
        .attr("stroke",'red')
        .attr('stroke-width',2)
        
        d3.select("#innerLinks")
        .selectAll("line")
        .data(this.dataLinks)
        .exit()
        .remove()
        
        d3.select("#outerLinks")
        .selectAll("line")
        .data(this.interactionLinks)
        .enter()
        .append("line")
        
        d3.select("#outerLinks")
        .selectAll("line")
        .data(this.interactionLinks)
        .attr("stroke",'white')
        .attr('stroke-width',0.5)
        
        d3.select("#outerLinks")
        .selectAll("line")
        .data(this.interactionLinks)
        .exit()
        .remove()
        
        d3.select("#outerLinks")
        .selectAll("polygon")
        .data(this.interactionLinks)
        .enter()
        .append("polygon")
        
        d3.select("#outerLinks")
        .selectAll("polygon")
        .data(this.interactionLinks)
        .attr('fill','white')
        
        d3.select("#outerLinks")
        .selectAll("polygon")
        .data(this.interactionLinks)
        .exit()
        .remove()
        /* <polygon v-if = 'getNewPos(d.source,d.target,15)[0]'
        :points = 'getPoint(d.source,d.target)'
        :fill = 'linksColor(d)'
        :fill-opacity = 'linksOpacity(d)'>
        </polygon> */
        
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
