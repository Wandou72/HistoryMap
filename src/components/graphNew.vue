<template>
	
	<svg id = 'graphSvg' 
	:height = 'svgConfig.height' :width = 'svgConfig.width'
	@click = 'log()'>
      <!-- <g id = 'matrix'
      transform = 'translate(0,-20)'>
        <g class = 'weight' v-for = '(d,i) in cluster'
        :key = 'i'>
          <rect
          :x = 'i * (500/cluster.length) + 5+20 + svgConfig.width - 600'
          y = 725
          :height = 'lenScale(getWeight(d))'
          :width = '500/cluster.length-15'
          fill = '#54f2f3'
          rx = 5
          
          >
          </rect>
          <text
          :dx = 'i * (500/cluster.length) + 5 +(500/cluster.length-15)/2 +20 + svgConfig.width - 600'
          :dy = '740 + lenScale(getWeight(d))'
          fill = 'black'
          text-anchor = 'middle'
          font-weight = 'bold'
          font-size = 12
          
          >
            {{(getWeight(d)/maxWeight).toFixed(2)}}
          </text>
        </g>
        <g class = 'row' v-for = '(d,i) in community'
        :key = 'i'>
          <rect v-for = '(k,j) in d'
          :key = 'j'
          :x = 'j * (500/d.length) + 20 + svgConfig.width - 600'
          :y = 'i * (550/community.length) + 20 + 150'
          :height = '550/community.length - 5'
          :width = '500/d.length-5'
          :fill = 'k == 1?getColor(i,j):"lightgrey"'
          stroke = 'white'
          :stroke-width = 'cluster[j].nodes[0].index == i? 10:0'
          stroke-dasharray = '4'
          
          >
          </rect>
          <text
          :dx = 'svgConfig.width - 600 + 10'
          :dy = '(i+0.5) * (550/community.length) + 25 + 150 '
          text-anchor = 'end'
          fill = 'black'
          >
            {{dataNodes[i].type == 'attribute'?dataNodes[i].name:dataNodes[i].name.length>=8? dataNodes[i].name.substring(0,8) + '..':dataNodes[i].name}}
          </text>
        </g>
        <text v-for = '(d,i) in cluster'
        :key = 'i'
        :dx = 'cluster.length<9?(i+0.5) * (500/cluster.length) + 20 + svgConfig.width - 600 :(i+0.5) * (500/cluster.length) + 17 + svgConfig.width - 600'
        dy = 165
        text-anchor = 'middle'
        font-weight = 'bold'
        :font-size = 'cluster.length<9? 24 : 15'
        fill = 'black'
        @mouseover = 'clusterHighlight(i)'
        @mouseout = 'outerOut()'
        >
            {{i+1}}
        </text>
        <text 
        :dx = '120+svgConfig.width - 450'
        dy = 135
        font-size = 25
        font-weight = 'bold'
        fill = 'black'
        text-anchor = 'middle'>
          cluster
        </text>
        <text
        :dx = '120+svgConfig.width - 450'
        dy = 835
        font-size = 25
        font-weight = 'bold'
        fill = 'black'
        text-anchor = 'middle'>
          weight
        </text>
      </g> -->

      

      <g @click = 'innerLinkFlag = !innerLinkFlag'>
        <rect id = 'btnIndexLink'
        :x = 'svgConfig.width - 110'
        :y = '20'
        :fill = 'innerLinkFlag? "#5aeaf1":"lightgrey"'></rect>
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
        :fill = 'outerLinkFlag? "#5aeaf1":"lightgrey"'></rect>
        <text
        :dx = 'svgConfig.width - 165'
        :dy = '45'
        fill = 'black'
        text-anchor = 'middle'>
          outer link
        </text>
      </g>

      <g @click = 'this.$store.commit("changeStoryBtn"),
        this.$store.commit({
          type:`changeStoryText`,
          text:storyTest
        })'>
        <rect id = 'btnIndexLink'
        :x = 'svgConfig.width - 310'
        :y = '20'
        :fill = 'this.$store.state.story.btn? "#5aeaf1":"lightgrey"'></rect>
        <text
        :dx = 'svgConfig.width - 265'
        :dy = '45'
        fill = 'black'
        text-anchor = 'middle'>
          Show story
        </text>
      </g>

      <g @click = 'notesFlag = !notesFlag'>
        <rect id = 'btnIndexLink'
        :x = 'svgConfig.width - 410'
        :y = '20'
        :fill = 'notesFlag? "#5aeaf1":"lightgrey"'>
        </rect>
        <text
        :dx = 'svgConfig.width - 365'
        :dy = '45'
        fill = 'black'
        text-anchor = 'middle'>
          Add Notes
        </text>
      </g>
      
    <g id = 'graph'
    :transform = '"translate("+[-svgConfig.width* 0.2,0]+")"'>
      <g id = 'outerLinks' v-show = 'outerLinkFlag'>
        
      </g>

      <g id = 'outerCircle' v-if = 'actionList.length>2'>
   
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
        @mouseover = 'outerTip(d), outerHighlight(d)'
        @mouseout = 'hover.flag = false, outerOut()'
        @click = 'rebuildState(d.states)'>  
        </circle>
        
      </g>

      <g id = 'innerLinks' v-show = 'innerLinkFlag'>
          
        
      </g>

      <g id = 'innerGraph' >
        
      </g>
      
      
    </g>
    
      <g id = 'tip' v-if = 'hover.flag && hover.type == "outer"'>
        
        <rect height = 380
        :width = 'hover.data.data.desc0.length>20?(hover.data.data.desc0.length+7) *15 : 340'
        fill = 'black'
        fill-opacity = 0.7
        :x = "XY[0] +10 - svgConfig.width * 0.2"
        :y = "XY[1] - 30"
        rx = 20>  
        </rect>
        
        <text fill = 'red' font-size="22" :dx = 'XY[0]+20 - this.svgConfig.width*0.2' :dy = 'XY[1] '>{{hover.data.data.desc0}}</text>
        <text fill = 'white' :dx = 'XY[0]+20 - this.svgConfig.width*0.2' :dy = 'XY[1] +25'>Interaction: {{hover.data.data.obj}}</text>
        <text fill = 'white' :dx = 'XY[0]+20- this.svgConfig.width*0.2' :dy = 'XY[1] +45'>View: {{ hover.data.data.view.substring(hover.data.data.view.length-1,hover.data.data.view.length)}}</text>
        <text fill = 'white' :dx = 'XY[0]+20- this.svgConfig.width*0.2' :dy = 'XY[1] +65'>Time stamp: {{hover.data.data.timeStamp.toFixed(2)}}</text>
        <image v-bind:href='hover.data.data.pic' :width= 300 :height=250 :x = 'XY[0]+20- this.svgConfig.width*0.2' :y = 'XY[1]+75'/>

        

        <!-- <text :dx = 'XY[0]+20' :dy = 'XY[1] +55'>{{'data:'+hover.data.data}}</text>
        <text :dx = 'XY[0]+20' :dy = 'XY[1] +75'>{{'type:' +(hover.data.lastTime?("hover for "+hover.data.lastTime.toFixed(2) + " seconds"):"click")}}</text> -->
      </g>
      
      <g id = 'tip' v-if = 'hover.flag && hover.type == "inner"'>
        <rect height = 100
        :width = 'hover.data.name.length>10?(hover.data.name.length+5) *15 +10:230'
        fill = 'black'
        fill-opacity = 0.7
        :x = "XY[0] +10"
        :y = "XY[1] - 30"
        rx = 20>
           
        </rect>

        <text fill = 'white' :dx = 'XY[0]+20' :dy = 'XY[1] - 5'>Name: {{hover.data.name}}</text>
        <text fill = 'white' :dx = 'XY[0]+20' :dy = 'XY[1] +15'>Type: {{hover.data.type}}</text>
        <text fill = 'white' :dx = 'XY[0]+20' :dy = 'XY[1] +35'>Count: {{hover.data.count}}</text>
        <text fill = 'white' :dx = 'XY[0]+20' :dy = 'XY[1] +55'>Duration: {{hover.data.dura}}</text>
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
        notesFlag:false,
        hover:{
          flag:false,
          data:{},
          type:'inner'
        },
        // statesSelected:{
        //   selected:'',
        //   leaf:''
        // },
        XY:[],
        storyBtn :false
				
				
			}
		},
		mounted(){
      
		},
		computed:{
      nCluster(){
        let sol = []
        for(let i = 0;i<this.cluster.length;i++){
          let t = this.cluster[i]
          let tmp = {}
          tmp['nodes'] = t.nodes
          tmp['count'] = t.count
          tmp['time'] = t.time
          if(this.diction[i]>=0){
            tmp['desc'] = this.diction[i]
          }
          else{
            tmp['desc'] = null
          }
          sol.push(tmp)
        }
        return sol
      },

      diction(){
        let sol = {}
        for(let i = 0;i<this.cluster.length;i++){
          let t = this.cluster[i].nodes
          if(t.length<5){
            let tmp = []
            
            for(let j of t){
              tmp.push(j.name)
            }
            //console.log(tmp)
            for(let j = 0;j<this.actToData.length;j++){
              let res = true
              //console.log(tmp,this.actToData[j])
              for(let k of this.actToData[j]){
                
                if( tmp.indexOf(k)  === -1){
                  res = false
                }
              }
              
              if(res == true){
                sol[i] = j
                break
              }
            }

          }
        }
        return sol
      },

      actToData(){
        let sol = []
        //console.log(this.actionNodes)
        for(let i = 0;i<this.actionNodes.length;i++){
          let t = this.actionNodes[i].data.data
          let tmp = []
          
          if(t.attribute){
            tmp.push(t.attribute)
          }
          if(t.industry){
            tmp.push(t.industry)
          }
          for(let j of t.company){
            tmp.push(j)
          }
          for(let j of t.province){
            tmp.push(j)
          }
          sol.push(tmp)
        }
        return sol
      },

      imgStory(){
        let sol = []
        for(let i = 0;i<this.actionNodes.length;i++){
          sol.push(this.actionNodes[i].data.desc)
        }
        return sol
      },

      storyTest(){
        let story = []
        for(let i = 0;i<this.newCluster.length;i++){
          if(i === 0){
            let tmp = {}
            let a1 = this.getStory(this.newCluster[i].parent)
            let first
            if(a1.length == 1){
            first = "The user is most concerned about " + a1[0] + '.'
            }
            else if(a1.length == 2){
            first = "The user is most concerned about " + a1[0] + ' and ' + a1[1] +  '.'
            }
            tmp['main'] = first
            tmp['sub'] = []
            for(let j = 0;j<this.newCluster[i].son.length;j++){
              let t = this.newCluster[i].son[j]
              if(t.desc>=0){
                tmp['sub'].push({id:t.desc,desc:this.imgStory[t.desc]})
              }
              
            }
            story.push(tmp)
          }
          else if(i >= 1){
            let tmp = {}
            let a1 = this.getStory(this.newCluster[i].parent)
            let first
            if(a1.length == 1){
            first = "The user is also concerned about " + a1[0] + '.'
            }
            else if(a1.length == 2){
            first = "The user is also concerned about " + a1[0] + ' and ' + a1[1] +  '.'
            }
            tmp['main'] = first
            tmp['sub'] = []
            for(let j = 0;j<this.newCluster[i].son.length;j++){
              let t = this.newCluster[i].son[j]
              if(t.desc>=0){
                tmp['sub'].push({id:t.desc,desc:this.imgStory[t.desc]})
              }
              
            }
            story.push(tmp)
          }
        }
        return story
      },

      storyPieces(){
        let sol = []
        for(let i = 0;i<this.cluster.length;i++){
          sol.push(this.getStory(this.cluster[i]))
        }
        return sol
      },
      newCluster(){
        let sol = []
        let tmp2 = []
        for(let i = 0;i<this.nCluster.length-1;i++){
          let tmp = []
          for(let j = i+1;j<this.nCluster.length;j++){
            if(this.judgeSub(this.nCluster[i],this.nCluster[j])){
              tmp.push(this.nCluster[j])
              tmp2.push(j)
            }
          }
          if(tmp2.indexOf(i) == -1){
            sol.push({parent:this.nCluster[i],son:tmp})
          }
        }
        return sol
      },

      lenScale(){
        return d3.scale.linear().domain([0,this.maxWeight]).range([5,75])
      },

      maxWeight(){
        
        let maxi = 0
        for(let i = 0;i<this.cluster.length;i++){
          let weight = this.getWeight(this.cluster[i])
          if(weight > maxi){
            maxi = weight
          }
        }
        return maxi
      },

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

      community(){
        let sol  = []
        for(let i = 0;i<this.dataNodes.length;i++){
          let tmp = []
          for(let j = 0;j<this.cluster.length;j++){
            tmp.push(0)
          }
          sol.push(tmp)
        }
        for(let i = 0;i<this.cluster.length;i++){
          for(let j = 0;j<this.cluster[i].nodes.length;j++){
            let row = this.cluster[i].nodes[j].index
            let col = i
            sol[row][col] = 1
          }
        }
        return sol
      },

      cluster(){
        let sol = []
        let ref = []
        
        for(let i = 0;i<this.dataNodes.length;i++){
          let provFlag = false
          let compFlag = false
          if(this.dataNodes[i].type != 'attribute'){
          //if(this.dataNodes[i].name != 'patent_num' && this.dataNodes[i].name != 'proportion' && this.dataNodes[i].name != 'comparison'){
            let tmp = [this.dataNodes[i]]
            let sumTime = this.dataNodes[i].dura
            let sumCount = this.dataNodes[i].count
            let tmp2 = [i]
            for(let j = 0;j<this.dataLinks.length;j++){
              if(this.dataLinks[j].i == i){
                if(this.dataNodes[this.dataLinks[j].j].type == 'company'){
                  compFlag = true
                }
                if(this.dataNodes[this.dataLinks[j].j].type == 'province'){
                  provFlag = true
                }
                tmp.push(this.dataNodes[this.dataLinks[j].j])
                tmp2.push(this.dataLinks[j].j)
                sumTime+=this.dataNodes[this.dataLinks[j].j].dura
                sumCount+=this.dataNodes[this.dataLinks[j].j].count
              }
              if(this.dataLinks[j].j == i){
                if(this.dataNodes[this.dataLinks[j].i].type == 'company'){
                  compFlag = true
                }
                if(this.dataNodes[this.dataLinks[j].i].type == 'province'){
                  provFlag = true
                }
                tmp.push(this.dataNodes[this.dataLinks[j].i])
                tmp2.push(this.dataLinks[j].i)
                sumTime+=this.dataNodes[this.dataLinks[j].i].dura
                sumCount+=this.dataNodes[this.dataLinks[j].j].count
              }
              
            }
            tmp2.sort()
            let st = tmp2.join('+')
            if(ref.indexOf(st) == -1 && !(compFlag && provFlag)){
              ref.push(st)
              sol.push({nodes:tmp,count:sumCount,time:sumTime})
            }
            
          }
          
          
        }
        sol.sort((a,b)=>{
          return this.getWeight(b) - this.getWeight(a)
        })
        return sol
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

      // 外圈弧长的数据
      arcData(){
        let endR = Math.PI * 2  * 350/360
        let endT = Math.log(this.actionList[this.actionList.length-1].timeStamp)
        let sol = []
        for(let i = 0;i<this.actionList.length-1;i++){
          
          sol.push({
            startAngle:Math.log(this.actionList[i].timeStamp)/endT * endR,
            endAngle:Math.log(this.actionList[i+1].timeStamp)/endT *endR,
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
      visualStates(){
        return this.$store.state.visualStates
      },
      visualList(){
        return this.$store.state.visualList
      },
      screenShot(){
        return this.$store.state.screenShot
      },
      selected(){
        return this.$store.state.selected
      },


      // 外圈的动作节点
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
            sol.push({xy:getPos(this.actionList[i],R,endT,endR), data:this.actionList[i], states:this.visualList[i+1]})
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
                
                lst.push({name:this.actionList[i].data.industry,type:'industry',
                time:i < this.actionList.length-1?this.actionList[i+1].timeStamp - this.actionList[i].timeStamp:10})

            }
            if(this.actionList[i].data.company.length>0){
              for(let j = 0;j<this.actionList[i].data.company.length;j++){
                lst.push({name:this.actionList[i].data.company[j],type:'company',
                time:i < this.actionList.length-1?this.actionList[i+1].timeStamp - this.actionList[i].timeStamp:10})
              }
            }
            if(this.actionList[i].data.province.length>0){
              for(let j = 0;j<this.actionList[i].data.province.length;j++){
                lst.push({name:this.actionList[i].data.province[j],type:'province',
                time:i < this.actionList.length-1?this.actionList[i+1].timeStamp - this.actionList[i].timeStamp:10})
              }
            }
            if(this.actionList[i].data.attribute!=''){
              lst.push({name:this.actionList[i].data.attribute,type:'attribute',
              time:i < this.actionList.length-1?this.actionList[i+1].timeStamp - this.actionList[i].timeStamp:10})
            }
          }
          // console.log(lst)
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
          
          var dura = (str,arr)=>{
            let c = 0
            for(let i = 0;i<arr.length;i++){
              if(arr[i].name == str){
                c += arr[i].time
              }
            }
            return parseFloat(c.toFixed(2))
          }
          
          let ind = 0
          for(let i = 0;i<lst.length;i++){
            if(tmp.indexOf(lst[i].name) == -1){
              tmp.push(lst[i].name)
              sol.push({index:ind,name:lst[i].name,type:lst[i].type,count:count(lst[i].name,lst),dura:dura(lst[i].name,lst)})
              ind++
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
      rebuildState(node){
        this.$store.commit('showGraph')

        // this.$store.commit()
        this.$store.commit({
          type: 'rebuildStates',
          Aselected: node.Aselected,
          Aleaf: node.Aleaf,
					Bflare0 :node.Bflare0,
					Bflare1 :node.Bflare1,
					BflareSum :node.BflareSum,
					BflareSum2 :node.BflareSum2,
					BflareSum3 :node.BflareSum3,
          BtreeTypeFlag: node.BtreeTypeFlag,
          Bsplited: node.Bsplited,
          Bdepth: node.Bdepth,
          BrootName: node.BrootName,
          BtreeData: node.BtreeData,
          Dtitle: node.Dtitle
        })
        // this.
      },
      getStory(cluster){
        //let company = []
        //let province = []
        let entity = []
        let attribute = []
        let industry = []
        let comparison = []
        
        for(let i = 0;i<cluster.nodes.length;i++){
          if(cluster.nodes[i].type == 'company'){
            entity.push(cluster.nodes[i].name)
          }
          else if(cluster.nodes[i].type == 'province'){
            entity.push(cluster.nodes[i].name)
          }
          else if(cluster.nodes[i].type == 'attribute'){
            if(cluster.nodes[i].name == 'proportion'){
              attribute.push('patent proportion')
            }
            else if(cluster.nodes[i].name == 'patent_num'){
              attribute.push('patent number')
            }
            else{
              comparison.push(cluster.nodes[i].name)
            }
            
          }
          else if(cluster.nodes[i].type == 'industry'){
            industry.push(cluster.nodes[i].name)
          }
        }
        
        let wordEntity = ''
        let wordIndustry = ''
        let wordAttribute = ''
        let wordComparison = ''
        
        if(attribute.length>0){
          if(attribute.length==1){
            wordAttribute = attribute[0]
          }
          else if(attribute.length == 2){
            wordAttribute = attribute[0] + ' and ' + attribute[1]
          }
          else{
            wordAttribute = attribute.join(', ')
          }
        }
        
        if(comparison.length>0){
          if(comparison.length==1){
            wordComparison = comparison[0]
          }
          else if(comparison.length == 2){
            wordComparison = comparison[0] + ' and ' + comparison[1]
          }
          else{
            wordComparison = comparison.join(', ')
          }
        }
        if(entity.length>0){
          if(entity.length==1){
            wordEntity = entity[0]
          }
          else if(entity.length == 2){
            wordEntity = entity[0] + ' and ' + entity[1]
          }
          else{
            wordEntity = entity.join(', ')
          }
        }
        
        if(industry.length>0){
          if(industry.length==1){
            wordIndustry = industry[0]
          }
          else if(industry.length == 2){
            wordIndustry = industry[0] + ' and ' + industry[1]
          }
          else{
            wordIndustry = industry.join(', ')
          }
        }
        let piece = []
        if(wordComparison){
          let text = wordComparison === "similarity" || wordComparison === "complement"? 'the ' + wordComparison + ' between ' + wordEntity : 'the ' + wordComparison + ' between ' + wordEntity + ' in ' + wordIndustry 
          piece.push(text)
        }
        if(wordAttribute){
          let text = 'the ' + wordAttribute + ' of ' + wordEntity + ' in ' + wordIndustry 
          piece.push(text)
        }
        return piece
        
      },
      judgeSub(parent,son){
        //console.log('123123123',parent,son)
        for(let i = 0;i< son.nodes.length;i++){
          //console.log('12312331',i)
          if(parent.nodes.indexOf(son.nodes[i]) == -1){
            return false
          }
        }
        return true
      },
      getColor(i,j){
        let maxi = this.getWeight(this.cluster[j])
        let maxi2 = 0
        for(let k = 0;k<this.cluster[j].nodes.length;k++){
          let tmp = this.cluster[j].nodes[k].count * 5 + this.cluster[j].nodes[k].dura
          if(tmp > maxi2){
            maxi2 = tmp
          }
        }
        let scale = d3.scale.linear().domain([0,maxi2/maxi]).range(['#f8de85',"#da0000"])
        return scale((this.dataNodes[i].count * 5 + this.dataNodes[i].dura)/maxi)
      },
      getWeight(clu){
        return clu.count * 5 + clu.time
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

      outerTip(d){
        
        this.XY = [d.xy[0],d.xy[1]>this.svgConfig.height/2? d.xy[1]-30  : d.xy[1]+30]
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
				// console.log('actNode',this.actionNodes)
        // console.log('dataNode',this.dataNodes)
        // console.log('dataLink',this.dataLinks)
        // console.log('interLink',this.interactionLinks)
        // console.log('arc',this.arcData)
        // console.log('adjcent',this.adjMatrix)
        // console.log('cluster',this.cluster)
        // console.log('matrix',this.community)
        // console.log('maxWeight',this.maxWeight)
        // console.log('newCluster',this.newCluster)
        // console.log('storyPieces',this.storyPieces)
        // console.log('storyTest',this.storyTest)
        // console.log('imgStory',this.imgStory)
        // console.log('act2Data',this.actToData)
        // console.log('dictionary',this.diction)
        // console.log('selected',this.selected)
        // console.log('actionList', this.actionList)
        // console.log('visualStates', this.visualStates)
        // console.log('visualList', this.visualList)
        // console.log('screenShot',this.screenShot)
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
        .attr("r",d=>10 + d.count * 3)
        .style("fill",d=> this.color(d.type))
        .style("stroke",'white')
          .on("mouseover",d=>{
              this.hover.type = 'inner'
              this.hover.flag = true
              this.hover.data = d
              //console.log(d)
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
        .attr("stroke",'grey')
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
        .attr('fill','grey')
        
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
		background-color: rgb(255, 255, 255);
		opacity:1;
		border: 5px solid rgb(199, 198, 198);
    border-radius: 50px;
	}
	#btnIndexLink ,#btnLink{
		position:absolute;
		height :40px;
		width : 90px;
		rx:10px;
	}
</style>
