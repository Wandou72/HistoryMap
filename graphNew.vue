<template>
	<div :height = 'svgConfig.height' :width = 'svgConfig.width'>
  <svg id = 'graphSvg' 
	:height = 'svgConfig.height' :width = 'svgConfig.width'
	@click = 'log()'>
      <g id = 'matrix'>
        <g class = 'row' v-for = '(d,i) in community'
        :key = 'i'>
          <rect v-for = '(k,j) in d'
          :key = 'j'
          :x = 'j * (200/d.length) + 20 + svgConfig.width - 300'
          :y = 'i * (500/community.length) + 20 + 200'
          :height = '500/community.length - 5'
          :width = '200/d.length-5'
          :fill = 'k == 1?"red":"white"'>
          </rect>
          <text
          :dx = 'svgConfig.width - 300 + 10'
          :dy = '(i+0.5) * (500/community.length) + 25 + 200 '
          text-anchor = 'end'
          fill = 'white'
          >
            {{dataNodes[i].type == 'attribute'?dataNodes[i].name:dataNodes[i].name.length>=5? dataNodes[i].name.substring(0,5) + '..':dataNodes[i].name}}
          </text>
          
        </g>
        <text v-for = '(d,i) in cluster'
        :key = 'i'
        :dx = 'cluster.length<9?(i+0.5) * (200/cluster.length) + 20 + svgConfig.width - 300 :(i+0.5) * (200/cluster.length) + 17 + svgConfig.width - 300'
        dy = 215
        text-anchor = 'middle'
        font-weight = 'bold'
        :font-size = 'cluster.length<9? 20 : 10'
        fill = 'white'
        @mouseover = 'clusterHighlight(i)'
        @mouseout = 'outerOut()'
        >
            {{i+1}}
        </text>
        <text 
        :dx = '120+svgConfig.width - 300'
        dy = 185
        font-size = 25
        font-weight = 'bold'
        fill = 'white'
        text-anchor = 'middle'>
          cluster
        </text>
        
      </g>
      <g id = 'parameter'>
        <g class = 'subRatio' transform = 'translate(0,50)'>
          <text
          fill = 'white'
          font-size = 20
          font-weight = 'bold'
          dx = 20
          dy = 40
          >Sub-community ratio :{{subRatio}}</text>
          <g v-for = '(d,i) in range.subRatio'
          :key = 'i'
          @click.stop = 'subRatio = d'>
          <rect
          :x = 'i * 30 + 20'
          y = 50
          width = 22
          height = 20
          :fill = 'd == subRatio? "#7dbcff":"white"'
          rx = 3
          >
          </rect>
          <text
          font-size = 13
          :dx = 'i * 30 + 31'
          dy = 65
          fill = 'black'
          text-anchor = 'middle'>
            {{d}}
          </text>
          </g>
        </g>
        
        <g class = 'dc' transform = 'translate(0,150)'>
          <text
          fill = 'white'
          font-size = 20
          font-weight = 'bold'
          dx = 20
          dy = 40
          
          >Cutoff distance: {{dc}}</text>
          <g v-for = '(d,i) in range.dc'
          :key = 'i'
          @click.stop = 'dc = d'>
          <rect
          :x = 'i * 30 + 20'
          y = 50
          width = 22
          height = 20
          :fill = 'd == dc? "#7dbcff":"white"'
          rx = 3
          >
          </rect>
          <text
          font-size = 13
          :dx = 'i * 30 + 31'
          dy = 65
          fill = 'black'
          text-anchor = 'middle'>
            {{d}}
          </text>
          </g>
        </g>
        <g class = 'commonSig' transform = 'translate(0,250)'>
          <text
          fill = 'white'
          font-size = 20
          font-weight = 'bold'
          dx = 20
          dy = 40
          >Common node influence: {{commonSig}}</text>
          <g v-for = '(d,i) in range.commonSig'
          :key = 'i'
          @click.stop = 'commonSig = d'>
          <rect
          :x = 'i * 30 + 20'
          y = 50
          width = 22
          height = 20
          :fill = 'd == commonSig? "#7dbcff":"white"'
          rx = 3
          >
          </rect>
          <text
          font-size = 13
          :dx = 'i * 30 + 31'
          dy = 65
          fill = 'black'
          text-anchor = 'middle'>
            {{d}}
          </text>
          </g>
        </g>
      </g>
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
      <!-- <g id = 'hull' v-if = 'hullFlag'>
        <circle v-for = '(d,i) in hull'
        :key = 'i'
        :cx = 'd.x'
        :cy = 'd.y'
        :r = 'd.r'
        fill = 'yellow'
        fill-opacity = 0.2>
          
        </circle>
      </g> -->
      
      
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
  </div>
  <!-- <g>
    <input type = 'text' placeholder = 'subRatio' >
  </g> -->
  
  
  
  
	
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
        XY:[],
        subRatio:0.2,//constant,[0,1]
        dc:2,//constant,cutoff distance
        small:0.1,//constant,a small positive value to avoid zero denominator
				commonSig:0.5,//[0,1],parameter controlling how significantly a common node influences the link strength
				range:{
          subRatio:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1],
          dc:[1,2,3,4,5,6,7,8,9,10],
          commonSig:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1],
        },
        hullFlag:false,
        
			}
		},
		mounted(){

		},
		computed:{
      linkDistance(){
        if (this.dataNodes.length < 10){
          return 200
        }
        else if(this.dataNodes.length < 20){
          return 150
        }
        else if(this.dataNodes.length< 30){
          return 100
        }
        else{
          return 50
        }
      },
      /* hull(){
        let sol = []
        for(let i = 0;i<this.piece.length;i++){
          let tmp = []
          for(let j = 0;j<this.dataNodes.length;j++){
            if(this.community[j][i] == 1){
              tmp.push([this.dataNodes[j].x,this.dataNodes[j].y])
            }
          }
          sol.push(tmp)
        }
        var getCircle = (ary)=>{
          
          let x = 0
          let y = 0
          let max = 0
          for(let i = 0;i<ary.length;i++){
            x += ary[i][0]
            y += ary[i][1]
          }
          x  = x/ary.length
          y = y/ary.length
          for(let i = 0;i<ary.length;i++){
            let dis = ((ary[i][0]-x)**2 + (ary[i][1]-y)**2) ** 0.5
            if(dis > max){
              max = dis
            }
          }
          max += 30
          return {x:x,y:y,r:max}
        }
        let sol2 = []
        for(let i = 0;i<sol.length;i++){
          sol2.push(getCircle(sol[i]))
        }
        return sol2
      }, */
      piece(){
        let sol = []
        for(let i = 0;i<this.community[0].length;i++){
          let tmp = []
          for(let j = 0;j<this.community.length;j++){
            if(this.community[j][i] == 1){
              tmp.push({type:this.dataNodes[j].type,name:this.dataNodes[j].name})
            }
          }
          sol.push(tmp)
        }
        return sol
      },
      community(){
        //let o = 0.2 // rate in [0,1]
        let cls = []
        for(let i = 0;i<this.cluster.length;i++){
          cls.push(this.cluster[i].cl)
        }
        var getCluster = (index)=>{
          for(let i = 0;i<this.firstRound.length;i++){
            if(this.firstRound[i].index == index){
              return this.firstRound[i].cl
            }
          }
        }
        var member = (index,cluster)=>{
          let lis = []
          let ind = this.sortGetIndex(this.disMatrix[index])
          for(let k = 1;k<=this.knn;k++){
            if(getCluster(ind[k]) == cluster){
              lis.push(ind[k])
            }
          }
          return lis
        }
        var sumLS = (index,cluster)=>{
          if(cluster!= 'all'){
            let memberList = member(index,cluster)
            let sol = 0
            for(let i = 0;i<memberList.length;i++){
              sol+=this.ls(index,memberList[i],this.adjMatrix)
            }
            return sol
          }
          else{
            let sol = 0
            for(let i = 0;i<this.gamma.length;i++){
              sol+=this.ls(index,i,this.adjMatrix)
            }
            return sol
          }
        }
        
        var getMembership=(index,cluster)=>{
          let sol = 0
          let lst = member(index,cluster)
          for(let i = 0;i<lst.length;i++){
            sol += this.ls(index,lst[i],this.adjMatrix) * sumLS(lst[i],cluster)/sumLS(lst[i],'all')
          }
          return sol
        }
        var judgeCluster = (index,cluster)=>{
          if(this.firstRound[index].cl == cluster){
            return 1
          }
          else{
            if(getMembership(index,this.firstRound[index].cl) == 0){
              return 0
            }
            else{
              if(getMembership(index,cluster)/getMembership(index,this.firstRound[index].cl)>this.subRatio){
                return 1
              }
              return 0
            }
          }
        }
        let sol = []
        for(let i = 0;i<this.gamma.length;i++){
          let tmp = []
          for(let j = 0;j<cls.length;j++){
            tmp.push(judgeCluster(i,cls[j]))
          }
          sol.push(tmp)
        }
       
        
        return sol
      },
      firstRound(){
        let sol = []
        var getCl = (index)=>{
          let label = this.cluster[0].cl
          let min = 999
          for(let i = 0;i<this.cluster.length;i++){
            if(this.disMatrix[this.cluster[i].index][index]<min){
              min = this.disMatrix[this.cluster[i].index][index]
              label = this.cluster[i].cl
            }
            
          }
          return label
        }
        var judgeCenter = (index)=>{
          for(let i = 0;i<this.cluster.length;i++){
            if (this.cluster[i].index == index){
              return this.cluster[i].cl
            }
          }
          return false
        }
        for(let i = 0;i<this.gamma.length;i++){
          if(!judgeCenter(i)){
            sol.push({index:i,cl:getCl(i)})
          }
          else{
            sol.push({index:i,cl:judgeCenter(i)})
          }
        }
        return sol
      },
      cluster(){
        let sol = []
        let initial = this.dGamma
        let pointer = 0
        var getSum = ary=>{
          let s = 0
          for(let i = 0;i<ary.length;i++){
            s += ary[i]
          }
          return s
        }
        var predict = (ary)=>{
          let len = ary.length
          let xAry = []
          let xyAry = []
          let xxAry = []
          for(let i = 0;i<ary.length;i++){
            xAry.push(i)
            xyAry.push(i * ary[i])
            xxAry.push(i * i)
          }
          let yBar = getSum(ary)/len
          let xyBar = getSum(xyAry)/len
          let xBar = getSum(xAry)/len
          let xxBar = getSum(xxAry)/len
          
          let a = (xyBar - xBar * yBar)/(xxBar - xBar ** 2)
          let b = yBar - a * xBar
          return a * len + b
        }
        
        while(initial.length>3){
          let max = 0,tmpPointer = 0
          for(let i = 0;i<initial.length;i++){
            if(initial[i]>max){
              max = initial[i]
              tmpPointer = i
            }
          }
          
          let pred = predict(initial.slice(0,tmpPointer))
          let diff = max - pred
          if(diff>2 * pred){
            pointer = tmpPointer
          }
          initial = this.dGamma.slice(0,tmpPointer)
        }
        for(let i = pointer+1;i<this.gammaSortDic.length;i++){
          sol.push({index:this.gammaSortDic[i].index,cl:'cluster'+(i-pointer)})
        }
        return sol
        
      },
      dGamma(){
        let sol = []
        for(let i = 0;i<this.gammaSortDic.length-1;i++){
          sol.push(this.gammaSortDic[i+1].gamma - this.gammaSortDic[i].gamma)
        }
        return sol
      },
      gammaSortDic(){
        let ind = this.sortGetIndex(this.gamma)
        
        let sol = []
        for(let i = 0;i<ind.length;i++){
          if(this.gamma[ind[i]]){
            sol.push({gamma:this.gamma[ind[i]],index:ind[i]})
          }
        }
        return sol
      },
      gamma(){
        let sol = []
        for(let i = 0;i<this.normalDelta.length;i++){
          sol.push(this.normalDelta[i] * this.normalRou[i])
        }
        return sol
      },
      normalDelta(){
        let max = Math.max(...this.deltaArray)
        let min = Math.min(...this.deltaArray)
        let sol = []
        for(let i = 0;i<this.deltaArray.length;i++){
          sol.push((this.deltaArray[i]-min)/(max-min))
        }
        return sol
      },
      normalRou(){
        let max = Math.max(...this.rouArray)
        let min = Math.min(...this.rouArray)
        let sol = []
        for(let i = 0;i<this.rouArray.length;i++){
          sol.push((this.rouArray[i]-min)/(max-min))
        }
        return sol
      },
      deltaArray(){
        let sol = []
        for(let i = 0;i<this.adjMatrix.length;i++){
          sol.push(this.delta(i,this.disMatrix))
        }
        return sol
      },
      rouArray(){
        let sol = []
        for(let i = 0;i<this.adjMatrix.length;i++){
          sol.push(this.rou(i,this.disMatrix))
        }
        return sol
      },
      knn(){
        if(this.adjMatrix.length == 0){
          return 0
        }
        let sum = 0
        
        for(let i = 0;i<this.adjMatrix.length;i++){
          for(let j = 0;j<this.adjMatrix.length;j++){
            if(this.adjMatrix[i][j]>0){
              sum++
            }
          }
        }
        return Math.round(sum/this.adjMatrix.length)
        
      },
      disMatrix(){
        let sol = []
        for(let i = 0;i<this.adjMatrix.length;i++){
          let vector = []
          for(let j = 0;j<this.adjMatrix.length;j++){
            if(i == j){
              vector.push(0)
            }
            else{
              vector.push(this.dist(i,j,this.adjMatrix))
            }
          }
          sol.push(vector)
        }
        return sol
      },
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
                  weight:i<this.actionList.length-1?1+this.actionList[i+1].timeStamp - this.actionList[i].timeStamp:11,
                  i:getIndex(tmp[j],this.dataNodes),
                  j:getIndex(tmp[k],this.dataNodes)})
                }
                else{
                  sol[judgeIn(tmp[j],tmp[k],sol)].weight+=  i<this.actionList.length-1?1+this.actionList[i+1].timeStamp - this.actionList[i].timeStamp:11
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
      
      sortGetIndex(ary){
        let label = []
        let sol = []
        for(let i = 0;i<ary.length;i++){
          label.push({value:ary[i],index:i})
        }
        label.sort(function(a,b){return a.value - b.value})
        for(let i = 0;i<label.length;i++){
          sol.push(label[i].index)
          
        }
        return sol
      },
      delta(i,dis){
        let rou = this.rouArray[i]
        let min = 999
        for(let j = 0;j<this.rouArray.length;j++){
          if(i!=j && this.rouArray[j]>rou){
            if(dis[i][j]<min){
              min = dis[i][j]
            }
          }
        }
        if(min == 999){
          return Math.max(...dis[i])
        }
        return min
      },
      rou(i,dis){
        //let dc = 2 // constant, cutoff distance
        let index = this.sortGetIndex(dis[i])
        let sol = 0
        for(let k = 1;k<=this.knn;k++){
          let j = index[k]
          let r = Math.exp(-1 * ((dis[i][j])/(this.dc))**2)
          sol += r
        }
        return sol
      },
      dist(i,j,adj){
        //et e = 0.1 // e is a small positive number
        return 1/(this.ls(i,j,adj) + this.small)
      },
      ls(i,j,adj){
        let common = []
        for(let k = 0;k<adj.length;k++){
            if(adj[i][k]>0 && adj[j][k]>0){
              common.push(k)
            }
        }
        var sumArray = (ary)=>{
          let ret = 0
          for(let k = 0;k<ary.length;k++){
            ret += ary[k]
          }
          return ret
        }
        let min = Math.min(sumArray(adj[i]),sumArray(adj[j]))
        return ((this.cc(i,j,adj)+adj[i][j]) * (common.length + 1))/min
      },
      cc(i,j,adj){
        let common = []
        let sol = 0
        let r = this.maxw - this.minw
        //let t = 0.5 // t is in [0,1],constant
        //et n = 0.1// n is a small positive
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
            sol += w * Math.exp(-1 * ((w - this.maxw)/(r * this.commonSig + this.small))**2)
            
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
      clusterHighlight(ind){
        let indexList = []
        for(let i = 0;i<this.community.length;i++){
          if(this.community[i][ind] == 1){
            indexList.push(i)
          }
        }
        
        d3.select("#innerGraph").selectAll("circle")
        .filter(d=>indexList.indexOf(d.index)==-1)
        .style("fill-opacity",0.3)
        .style("stroke-opacity",0.3)
        
        d3.select("#innerGraph").selectAll("circle")
        .filter(d=>indexList.indexOf(d.index)!=-1)
        .style("fill-opacity",1)
        .style("stroke-opacity",1)
        
        d3.select("#innerLinks").selectAll("line")
        .filter(k=>indexList.indexOf(k.source.index)!=-1 && indexList.indexOf(k.target.index)!=-1)
        .style("stroke-opacity",1)
        
        d3.select("#innerLinks").selectAll("line")
        .filter(k=>indexList.indexOf(k.source.index)==-1 || indexList.indexOf(k.target.index)==-1)
        .style("stroke-opacity",0)
        
        d3.select("#outerLinks")
        .selectAll("line")
        .filter(k=>indexList.indexOf(k.target.index) != -1)
        .style("stroke-opacity",1)
        .style("stroke-width",2)
        
        d3.select("#outerLinks")
        .selectAll("line")
        .filter(k=>indexList.indexOf(k.target.index) == -1)
        .style("stroke-opacity",0)
        
        d3.select("#outerLinks")
        .selectAll("polygon")
        .filter(k=>indexList.indexOf(k.target.index) != -1)
        .style("fill-opacity",1)
        
        d3.select("#outerLinks")
        .selectAll("polygon")
        .filter(k=>indexList.indexOf(k.target.index) == -1)
        .style("fill-opacity",0)
        
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
      getHull(){
        let sol = []
        for(let i = 0;i<this.piece.length;i++){
          let tmp = []
          for(let j = 0;j<this.dataNodes.length;j++){
            if(this.community[j][i] == 1){
              tmp.push([this.dataNodes[j].x,this.dataNodes[j].y])
            }
          }
          sol.push(tmp)
        }
        var getCircle = (ary)=>{
          
          let x = 0
          let y = 0
          let max = 0
          for(let i = 0;i<ary.length;i++){
            x += ary[i][0]
            y += ary[i][1]
          }
          x  = x/ary.length
          y = y/ary.length
          for(let i = 0;i<ary.length;i++){
            let dis = ((ary[i][0]-x)**2 + (ary[i][1]-y)**2) ** 0.5
            if(dis > max){
              max = dis
            }
          }
          max += 30
          return {x:x,y:y,r:max}
        }
        let sol2 = []
        for(let i = 0;i<sol.length;i++){
          sol2.push(getCircle(sol[i]))
        }
        return sol2
      },
			log(){
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
        console.log('actList',this.actionList)
				console.log('actNode',this.actionNodes)
        console.log('dataNode',this.dataNodes)
        console.log('dataLink',this.dataLinks)
        console.log('interLink',this.interactionLinks)
        console.log('arc',this.arcData)
        console.log('adjcent',this.adjMatrix)
        console.log('cc',this.cc(0,1,this.adjMatrix))
        console.log('ls',this.ls(0,1,this.adjMatrix))
        console.log('dist',this.dist(0,1,this.adjMatrix))
        console.log('disMatrix',this.disMatrix)
        console.log('knn',this.knn)
        console.log('rou',this.normalRou)
        console.log('delta',this.normalDelta)
        console.log('gamma',this.gammaSortDic)
        console.log('dr',this.dGamma)
        console.log('cluster',this.cluster)
        console.log('firstRound',this.firstRound)
        console.log('community',this.community)
        console.log('piece',this.piece)
        console.log('hull',this.getHull())
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
        
        
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
        
        /* d3.select("#hull")
        .selectAll("circle")
        .data(this.getHull())
        .enter()
        .append("circle")
        .attr("fill",'yellow') */
        
        
      }
			
		},
		watch:{
			dataNodes(){
        this.force
        .linkStrength(0.8)
        .linkDistance(this.linkDistance)
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
        .attr("r",d=>Math.min(10 + d.count * 3 , 30))
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
  #matrix{
    transition: all 0.3s;
  }
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
