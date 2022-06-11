<template>
	
  <svg id = "svgF" @click = 'log()'>
		<!-- <text id = 'tx' dx = 20 dy = 50>{{treeTypeFlag}}</text> -->
		<rect
	x = 0
	:y = 'heightF - 50'
	height = 50
	width = 60
	fill = 'orange'>
	</rect>
	<text
	dx = 30
	:dy = 'heightF - 17'
	text-anchor = 'middle'
	fill = 'white'
	font-size = 25
	font-weight = 'bold'
	>E
	</text>
	</svg>

</template>

<script>
import * as d3 from "d3"

import axios from 'axios'

export default {
	name: 'componentF',
	data(){
		return {
			heightF:this.$store.state.height * 0.6,
			widthF:this.$store.state.width * 0.3,
			hovered:'',
			nodesLength:0,
			comparisonMode:'sim',
			tipFlag:false,
			//matrixData:['上海市','北京市','广东省','浙江省'],
			//matrixData:['清华大学','北京大学','复旦大学','上海交通大学']
			
			
		}
	},
	mounted(){
		
		d3.select("#tx").attr("dy",20)
		this.$store.commit({
			type :"appendLine",
			id :'lineF',
			svg :'svgF',
			width:this.widthF,
			height:this.heightF * 1 / 3 -20,
			color: 'mediumseagreen',
			stroke:1
		});
		
		this.$store.commit({
			type:'appendTitle',
			id:'FbarTitle',
			class:'classF',
			svg:'svgF',
			dx:'24px',
			dy:'36px',
			size:'14px'
			
		});
		d3.select("#svgF")
		.attr("width",this.widthF)
		.attr("height",this.heightF);
		
		
		axios.get('province_pat_pro.json')
		.then(response=>{
			////console.log(response	)
			this.$store.commit({
				type:'FprovincePro',
				provjson:response
			})
		});
		
		axios.get('comp_pat_pro.json')
		.then(response=>{
			this.$store.commit({
				type:'FcompanyPro',
				projson:response
			})
		})
		
		axios.get('supply_chain(1).csv')
		.then(response=>{
			let a = d3.csv.parse(response.data);
			this.$store.commit({
				type :"FindData",
				value :a
			});
		})
		
		d3.select("#svgF").append("g").attr("id",'Fbar');
		d3.select("#svgF").append("g").attr("id","Fmatrix");
		this.$store.commit({
			type:'appendBtn',
			svgID:'svgF',
			btnID:'Fbtn',
			width:this.widthF,
			text:'switch'
		})
		
		d3.select("#Fbtn")
		.on("click",()=>{
			this.modeChange();
		})
		.style("display",'none')
		
		this.appendLgd()
		
		
		
	},
	computed:{
		matrixData(){
			let sol = []
			for(let i = 0;i<this.treeData.length;i++){
				sol.push(this.treeData[i])
			}
			for(let i = 0;i<this.$store.state.matrixElement.length;i++){
				if(this.treeData.indexOf(this.$store.state.matrixElement[i]) == -1){
					sol.push(this.$store.state.matrixElement[i])
				}
				
			}
			return sol
		},
		matrixData3(){
			return this.matrixData2 +'1'
		},
		matrixData2(){
			let tmp = [];
			if(this.treeTypeFlag == 'company'){
				for(let i = 0;i<this.matrixData.length;i++){
					for(let j = 0;j<this.matrixData.length;j++){
						if(this.comparisonMode == 'sim'){
							tmp.push({x:i,y:j,rate:this.sim(this.matrixData[i],this.matrixData[j],this.projson)})
						}
						else if(this.comparisonMode == 'complement'){
							tmp.push({x:i,y:j,rate:this.complement(this.matrixData[i],this.matrixData[j],this.projson)})
						}
						
					}
				}
			}
			else if(this.treeTypeFlag =='province'){
				for(let i = 0;i<this.matrixData.length;i++){
					for(let j = 0;j<this.matrixData.length;j++){
						if(this.comparisonMode == 'sim'){
							tmp.push({x:i,y:j,rate:this.sim(this.matrixData[i].substring(0,2),this.matrixData[j].substring(0,2),this.provjson)})
						}
						else if(this.comparisonMode == 'complement'){
							tmp.push({x:i,y:j,rate:this.complement(this.matrixData[i].substring(0,2),this.matrixData[j].substring(0,2),this.provjson)})
						}
						
					}
				}
			}
			return tmp
		},
		treeData1(){
			return this.treeData[0]? this.treeData[0]:''
		},
		bar_data1(){
			return this.bar_data +'1'
		},
		bar_data(){
			let a = [];
			let b = [];
			
			let c = [];
			if(this.treeData[0] && this.treeTypeFlag == 'company'){
				d3.select("#svgD").selectAll("circle")
				.filter((d,i)=>{
					if(i>0){
						a.push(d.name);
					}
				}) 
				a = a.filter(d=>d!=this.treeData[0])
				for(let i = 0;i<a.length;i++){
					if(this.comparisonMode == 'sim'){
						b.push({name:a[i],rate:this.sim(a[i],this.treeData[0],this.projson)})
					}
					else if(this.comparisonMode == 'complement'){
						b.push({name:a[i],rate:this.complement(a[i],this.treeData[0],this.projson)})
					}
				}
				
				b.sort((a,b)=>{
					return b.rate - a.rate
				})
				
				c = b.slice(0,5);
				
				
			}
			else if(this.treeData[0] && this.treeTypeFlag == 'province'){
				
				
				
				for(let i = 0;i<this.$store.state.province.length;i++){
					a.push(this.$store.state.province[i].substring(0,2))
				}
				a = a.filter(d=>d!=this.treeData[0].substring(0,2));
				for(let i = 0;i<a.length;i++){
					if(this.comparisonMode == 'sim'){
						b.push({name:this.transform(a[i]),rate:this.sim(a[i],this.treeData[0].substring(0,2),this.provjson)})
					}
					else if(this.comparisonMode =='complement'){
						b.push({name:this.transform(a[i]),rate:this.complement(a[i],this.treeData[0].substring(0,2),this.provjson)})
					}
					
				}
				
				b.sort((a,b)=>{
					return b.rate - a.rate
				})
				c = b.slice(0,5);
				
				
			}
			
			
			return c
		},
		province(){
			return this.$store.state.province
		},
		treeTypeFlag(){
			return this.$store.state.treeTypeFlag
		},
		treeData(){
			return this.$store.state.objB.treeData
		},
		treeD(){
			return this.treeData + '1'
		},
		provjson(){
			return this.$store.state.objF.provjson
		},
		projson(){
			return this.$store.state.objF.projson
		},
		F_indData(){
			let k = [];
			for(let i = 0;i<this.$store.state.objF.indData.length;i++){
				if(k.indexOf(this.$store.state.objF.indData[i].industry_name)==-1){
					k.push(this.$store.state.objF.indData[i].industry_name)
				}
			}
			return k
		}
	},
	methods:{
		log(){
			console.log(this.treeData)
			console.log(this.$store.state.matrixElement)
		},
		F_TipRemove(){
			d3.select("#svgF").selectAll(".tips")
			.remove()
		},
		F_createTip(d){
			function mouseXY(e){
							e=e||window.event;
							return { "x": e.offsetX, "y": e.offsetY };
						}
			let XY = mouseXY(event);
			let tempWidth = this.matrixData[d.x].length>8 || this.matrixData[d.y].length>8?  Math.max(this.matrixData[d.x].length,this.matrixData[d.y].length)*15 +10 :160
			let svgF = d3.select("#svgF")
			let txt = this.comparisonMode == 'sim'? '结构相似性系数:':'互补性系数:'
			
			if(XY.x>0 && XY.x < this.widthF - tempWidth ){
				svgF.append("rect")
				.attr("id","tipBack")
				.attr("class","tips")
				.attr("x", XY.x+10)
				.attr("y",XY.y-30)
				.style("height",80)
				.style("width",tempWidth)
				.attr("rx",20);
				
				svgF.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y-5)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "#e34b00")
				//.text(this.matrixData[d.y])
				.text('company/province ***')
				
				svgF.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y+15)
				
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "#9eea74")
				//.text(this.matrixData[d.x]) ;
				.text('company/province ***')
				svgF.append("text")
				.attr("class","tips")
				.attr("dx",XY.x+20)
				.attr("dy",XY.y+35)
				.attr("text-anchor","start")
				.attr("font-family", "sans-serif")
				.attr("font-size", "14px")
				.attr("font-weight", "bold")
				.attr("fill", "white")
				.text(txt+d.rate.toFixed(3))
			}
				else{
					svgF.append("rect")
					.attr("id","tipBack")
					.attr("class","tips")
					.attr("x", XY.x- 10 - tempWidth)
					.attr("y",XY.y-30)
					.style("height",80)
					.style("width",tempWidth)
					.attr("rx",20);
					
					svgF.append("text")
					.attr("class","tips")
					.attr("dx",XY.x- tempWidth)
					.attr("dy",XY.y-5)
					.attr("text-anchor","start")
					.attr("font-family", "sans-serif")
					.attr("font-size", "14px")
					.attr("font-weight", "bold")
					.attr("fill", "#e34b00")
					//.text(this.matrixData[d.y])
					.text('company/province ***')
					svgF.append("text")
					.attr("class","tips")
					.attr("dx",XY.x- tempWidth)
					.attr("dy",XY.y+15)
					
					.attr("text-anchor","start")
					.attr("font-family", "sans-serif")
					.attr("font-size", "14px")
					.attr("font-weight", "bold")
					.attr("fill", "#9eea74")
					//.text(this.matrixData[d.x]) ;
					.text('company/province ***')
					svgF.append("text")
					.attr("class","tips")
					.attr("dx",XY.x- tempWidth)
					.attr("dy",XY.y+35)
					.attr("text-anchor","start")
					.attr("font-family", "sans-serif")
					.attr("font-size", "14px")
					.attr("font-weight", "bold")
					.attr("fill", "white")
					.text(txt+d.rate.toFixed(3))
				}
		
		
		},
		appendLgd(){
			let defs = d3.select("#svgF").append("defs");
			let linearGradient2 = defs.append("linearGradient")
									.attr("id","linearColor2")
									.attr("x1","0%")
									.attr("y1","0%")
									.attr("x2","100%")
									.attr("y2","0%");
			linearGradient2.append("stop")
							.attr("offset","0%")
							.style("stop-color","#c1e8ca");
			linearGradient2.append("stop")
							.attr("offset","100%")
							.style("stop-color","#48784f");
							
			d3.select("#svgF").append("rect")				
			.attr("class","lgd1")
			.attr("x",this.widthF/5)
			.attr("rx",6)
			.attr("y",this.heightF/5 * 2 - 10)
			.attr("width",this.widthF/5 * 3 )
			.attr("height",12)
			.style("fill","url(#" + linearGradient2.attr("id") + ")");	
					
			d3.select("#svgF").append("text")
				.attr("class","lgd1")
				.attr("font-family", "sans-serif")
				.style("font-size", "20px")
				.attr("dx","24px")
				.attr("dy",this.heightF/3 +10)
				.style("font-weight","bold")
				.attr("text-anchor","start")
				.text("结构相似性系数矩阵")
				
			d3.select("#svgF").append("text")
			.attr("class","lgd1")
			.attr("font-family", "sans-serif")
			.style("font-size", 15)
			.attr("dx",this.widthF/5 -15)
			.style("font-weight","bold")
			.attr("dy",this.heightF/5 * 2 + 5 )
			.text(0);
			
			d3.select("#svgF").append("text")
			.attr("class","lgd1")
			.attr("font-family", "sans-serif")
			.style("font-size", 15)
			.style("font-weight","bold")
			.attr("dx",this.widthF/5  + this.widthF/5 *3 +5 )
			.attr("dy",this.heightF/5 * 2 + 5 )
			.text(1)
						
			d3.select("#svgF").selectAll(".lgd1")
			.style("display",'none')
			
		},
		modeChange(){
			if(this.comparisonMode=='sim'){
				this.comparisonMode='complement'
				this.$store.commit({
					type:'userClick',
					view:'viewF',
					width:this.widthF,
					height:this.heightF,
					obj:'switch(comparison mode)',
					name:this.treeData[0],
					value:'complement',
					desc:'show the complementarity of ' + this.treeData[0] + ' and others',
					visualKeys:{},
          data:{
            industry:'',
            company:this.treeTypeFlag == 'company'?[this.treeData[0]]:[],
            province:this.treeTypeFlag == 'province'?[this.treeData[0]]:[],
            attribute:'complement'
          }
				})
				this.$store.commit('ClickRecordState')
			}
			else if(this.comparisonMode=='complement'){
				this.comparisonMode='sim'
				this.$store.commit({
					type:'userClick',
					view:'viewF',
					width:this.widthF,
					height:this.heightF,
					obj:'switch(comparison mode)',
					name:this.treeData[0],
					value:'similarity',
					desc:'show the similarity of ' + this.treeData[0] + ' and others',
          data:{
            industry:'',
            company:this.treeTypeFlag == 'company'?[this.treeData[0]]:[],
            province:this.treeTypeFlag == 'province'?[this.treeData[0]]:[],
            attribute:'similarity'
          }
				})
				this.$store.commit('ClickRecordState')
			}
			this.updateBar()
		},
		transform(name){
			for(let i = 0;i<this.$store.state.province.length;i++){
				if (this.$store.state.province[i].substring(0,2) == name.substring(0,2)){
					return this.$store.state.province[i]
				}
			}
		},
		updateBar(){
			let bar_color = d3.scale.category20();
			let bar_scale = d3.scale.linear().domain([this.bar_data[this.bar_data.length-1].rate,this.bar_data[0].rate]).range([70,this.widthF/3]);
			let pd = 10,wd = 8;
			let bar = d3.select("#Fbar")
			
			bar.selectAll('rect')
			.data(this.bar_data)
			.enter()
			.append("rect")
			.attr("class","bar1")
			.attr("height",wd)
			.attr("width",0)
			.on("mouseover",function(){
				d3.select(this)
				.attr("stroke-width",1)
				.attr("stroke",'red')
			})
			.on("mouseout",function(){
				d3.select(this)
				.attr("stroke-width",0)
				
			})
			.on("click",(d)=>{
				this.$store.commit({
					type:'updateTreeData',
					name:d.name,
					treeTypeFlag:this.treeTypeFlag
				})
				
				this.$store.commit({
					type:'userClick',
					view:'viewF',
					width:this.widthF,
					height:this.heightF,
					obj:this.treeTypeFlag == 'company'? 'select company':'select province',
					name:this.treeData[0] + 'vs' + d.name,
					value:d.rate,
					desc:'the ' + this.comparisonMode + ' rate of ' + this.treeData[0] + ' and ' +  d.name + ' is ' + d.rate,
          data:{
            industry:'',
            company:this.treeTypeFlag == 'company'?[this.treeData[0],d.name]:[],
            province:this.treeTypeFlag == 'province'?[this.treeData[0],d.name]:[],
            attribute:'comparison'
          }
				})
				this.$store.commit('ClickRecordState')
			})
			
			
			bar.selectAll("rect")
			.data(this.bar_data)
			.attr("rx",5)
			.style("fill",(d,i)=>bar_color(i))
			.attr("x",this.widthF/2)
			.attr("y",(d,i)=> 60 + i * (pd+wd) -10)
			.transition()
			.delay((d,i)=> i * 200)
			
			.attr("width",d=>bar_scale(d.rate));
			
			bar.selectAll("rect")
			.data(this.bar_data)
			.exit()
			.remove()
			
			
			
			bar.selectAll(".text1")
			.data(this.bar_data)
			.enter()
			.append("text")
			.attr("font-family", "sans-serif")
			.attr("font-weight", "bold")
			.attr("class","text1")
			.attr("font-size", 0)
			
			bar.selectAll(".text1")
			.data(this.bar_data)
			.attr("dx",this.widthF/2 - 10)
			.attr("dy",(d,i)=> 60 + i * (pd+wd) )
			.attr("text-anchor","end")
			.attr("fill","black")
			.transition()
			.delay((d,i)=> i * 200)
			.attr("font-size", 10)
			.text(d=>d.name);
			
			bar.selectAll(".text1")
			.data(this.bar_data)
			.exit()
			.remove();
			
			bar.selectAll(".text2")
			.data(this.bar_data)
			.enter()
			.append("text")
			.attr("font-family", "sans-serif")
			.attr("font-weight", "bold")
			.style("fill",'black')
			.attr("class","text2")
			.attr("font-size", 0)
			
			bar.selectAll(".text2")
			.data(this.bar_data)
			.transition()
			.delay((d,i)=> i * 200)
			.attr("font-size", 12)
			.attr("dx",d=>bar_scale(d.rate) + this.widthF/2 +5)
			.attr("dy",(d,i)=> 60 + i * (pd+wd) )
			.text(d=>d.rate.toFixed(3))
			
			
			bar.selectAll(".text2")
			.data(this.bar_data)
			.exit()
			.remove();
		},
		sim(x,y,dataset){
			if(x==y){
				return 1
			}
			else if(x.substring(0,2) == "台湾" || x.substring(0,2) == "香港"||x.substring(0,2) == "澳门"
			||y.substring(0,2) == "台湾" ||y.substring(0,2) == "香港" ||y.substring(0,2) == "澳门"){
				return 0;
			}
			
			
			else{
				let sumXY = 0;
				for(let i = 0;i<this.F_indData.length;i++){
					if(dataset.data[x][this.F_indData[i]] && dataset.data[y][this.F_indData[i]]){
						sumXY += dataset.data[x][this.F_indData[i]] * dataset.data[y][this.F_indData[i]]
					}
				}
				
				let sumXS = 0;
				for(let i = 0;i<this.F_indData.length;i++){
					if(dataset.data[x][this.F_indData[i]]){
						sumXS += dataset.data[x][this.F_indData[i]] * dataset.data[x][this.F_indData[i]] 
					}
				}
				
				let sumYS = 0;
				for(let i = 0;i<this.F_indData.length;i++){
					if(dataset.data[y][this.F_indData[i]]){
						sumYS += dataset.data[y][this.F_indData[i]] * dataset.data[y][this.F_indData[i]] 
					}
				}
				
				let simRate = sumXY/Math.sqrt(sumXS * sumYS)
					
				return simRate;
			}
			
		},
		complement(x,y,dataset){
			if(x == y){
				return 0;
			}
			else if(x.substring(0,2) == "台湾" || x.substring(0,2) == "香港"||x.substring(0,2) == "澳门"
			||y.substring(0,2) == "台湾" ||y.substring(0,2) == "香港" ||y.substring(0,2) == "澳门"){
				return 0;
			}
			else{
				let keys = [];
				for( let key in dataset.data[x]){
					// eslint-disable-next-line
					if(dataset.data[x].hasOwnProperty(key)){
						keys.push(key);
					}
				}
				for( let key in dataset.data[y]){
					// eslint-disable-next-line
					if(dataset.data[y].hasOwnProperty(key) && keys.indexOf(key) == -1){
						keys.push(key);
					}
				}
				let sumXY = 0;
				for(let i = 0;i<keys.length;i++){
					if(dataset.data[x][keys[i]] && dataset.data[y][keys[i]]){
						sumXY += dataset.data[x][keys[i]] * dataset.data[y][keys[i]]
					}
				}
				
				let sumXS = 0;
				for(let i = 0;i<keys.length;i++){
					if(dataset.data[x][keys[i]]){
						sumXS += dataset.data[x][keys[i]] * dataset.data[x][keys[i]] 
					}
				}
				
				let sumYS = 0;
				for(let i = 0;i<keys.length;i++){
					if(dataset.data[y][keys[i]]){
						sumYS += dataset.data[y][keys[i]] * dataset.data[y][keys[i]] 
					}
				}
				let simRate = sumXY/Math.sqrt(sumXS * sumYS)
				
				return 1 - simRate;
			}
			
		},
		matrixUpdate(){
			let pd = 2,wd = this.matrixData.length == 0? 0:(this.widthF/2 - (this.matrixData.length-1) *pd)/this.matrixData.length;
			let matrix_color = d3.scale.linear().domain([0,1]).range(["#c1e8ca","#48784f"]);
			d3.select("#Fmatrix").selectAll("rect")
			.data(this.matrixData2)
			.enter()
			.append("rect")
			.attr("fill",'white')
			.attr("height",0)
			.attr("width",0)
			
			d3.select("#Fmatrix").selectAll("rect")
			.data(this.matrixData2)
			
			.on("mouseover",(d)=>{
				d3.select("#Fmatrix").selectAll("text")
				.data(this.matrixData)
				.filter(data=>data == this.matrixData[d.y] )
				.style("fill","#e34b00");
				
				d3.select("#Fmatrix").selectAll("text")
				.data(this.matrixData)
				.filter(data=>data == this.matrixData[d.x] )
				.style("fill","#9eea74");
				
				d3.select("#Fmatrix").selectAll("rect")
				.data(this.matrixData2)
				.filter(data=>data.x == d.x && data.y == d.y || data.x == d.y && data.y == d.x)
				.style("fill","red");
				//this.F_TipRemove()
				this.F_createTip(d)
				if(d.x!=d.y){
					this.$store.commit({
					type:'userMouseover'
				})
				}
				
			})
			.on("mousemove",(d)=>{
				
				this.F_TipRemove();
				this.F_createTip(d)
			})
			.on("mouseout",(d)=>{
				setTimeout(
					()=>{
						this.F_TipRemove();
					},1500
				)
				
				d3.select("#Fmatrix").selectAll("text")
				.data(this.matrixData)
				.filter(data=>data == this.matrixData[d.x] || data == this.matrixData[d.y])
				.style("fill","black");
				
				d3.select("#Fmatrix").selectAll("rect")
				.data(this.matrixData2)
				.filter(data=>data.x == d.x && data.y == d.y || data.x == d.y && data.y == d.x)
				.style("fill",data=>matrix_color(data.rate))
				let type = this.comparisonMode == 'sim'?'similarity':'complement'
				if(d.x != d.y){
					this.$store.commit({
					type:'userMouseout',
					dif:'fast',
					view:'viewF',
					width:this.widthF,
					height:this.heightF,
					obj:'tips(matrix)',
					name:this.matrixData[d.x] +' vs '+this.matrixData[d.y],
					value:d.rate,
					desc:'the ' + type + ' rate of ' + this.matrixData[d.x] + ' and ' +  this.matrixData[d.y] + ' is ' + d.rate.toFixed(3),
          data:{
            industry:'',
            company:this.treeTypeFlag == 'company'?[this.matrixData[d.x],this.matrixData[d.y]]:[],
            province:this.treeTypeFlag == 'province'?[this.matrixData[d.x],this.matrixData[d.y]]:[],
            attribute:this.comparisonMode == 'sim'?'similarity':'complement'
          }
				})
				this.$store.commit('OutRecordState')
				}
				
			})
			.transition()
			.attr("x",d=>(this.widthF - this.matrixData.length * wd - pd *(this.matrixData.length-1))/2 + d.x * (wd + pd) + this.widthF/6)
			.attr("y",d=>(this.heightF - this.matrixData.length * wd - pd *(this.matrixData.length-1))/2 + d.y * (wd + pd) +this.heightF/5)
			.attr("height",wd)
			.attr("width",wd)
			.attr("rx",wd/5)
			.style("fill",d=>matrix_color(d.rate))
			
			
			d3.select("#Fmatrix").selectAll("rect")
			.data(this.matrixData2)
			.exit()
			.remove()
			
			d3.select("#Fmatrix").selectAll("text")
			.data(this.matrixData)
			.enter()
			.append("text")
			.attr("font-family", "sans-serif")
			.style("font-size", 10)
			.attr("text-anchor","end")
			
			d3.select("#Fmatrix").selectAll("text")
			.data(this.matrixData)
			.transition()
			.attr("dx",(this.widthF - this.matrixData.length * wd - pd *(this.matrixData.length-1))/2+ this.widthF/6-5)
			.attr("dy",(d,i)=>(this.heightF - this.matrixData.length * wd - pd *(this.matrixData.length-1))/2 +i* (wd + pd)+this.heightF/5 + wd /2 +3)
			.text(d=>d)
			
			d3.select("#Fmatrix").selectAll("text")
			.data(this.matrixData)
			.exit()
			.remove()
		}
	},
	watch:{
		treeD(){
			if(this.treeData[0]){
				d3.select("#FbarTitle")
				.text(this.treeData[0]+'竞争排序')
				
			}
			else{
				d3.select("#FbarTitle")
				.text('')
				
				d3.select("#Fmatrix").selectAll("rect").remove()
				d3.select("#Fmatrix").selectAll("text").remove()
			}
		},
		matrixData3(){
			this.matrixUpdate()
		},
		comparisonMode(val){
			this.matrixUpdate()
			if(val == 'sim'){
				d3.select("#FbarTitle")
				.text(this.treeData[0]+'竞争排序')
			}
			else if(val =='complement'){
				d3.select("#FbarTitle")
				.text(this.treeData[0]+'互补排序')
			}
		},
		treeData1(){
			if(this.treeData1){
				this.updateBar();
				d3.select("#svgF").selectAll(".lgd1")
				.style("display",'inline')
				d3.select("#Fbtn").style("display",'inline')
				
				if(this.treeTypeFlag=='company'){
					for(let i = 0;i<this.bar_data.length;i++){
						
						this.$store.commit({
							type : 'changeMatrixElement',
							element : this.bar_data[i].name
						})
					}
				}
				else{
					for(let i = 0;i<this.bar_data.length;i++){
						
						this.$store.commit({
							type : 'changeMatrixElement',
							element : this.bar_data[i].name
						})
					}
				}
				
			}
			else{
				d3.select("#Fbar").selectAll("rect").remove();
				d3.select("#Fbar").selectAll("text").remove();
				d3.select("#svgF").selectAll(".lgd1")
				.style("display",'none')
				d3.select("#Fbtn").style("display",'none')
				
			}
			
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
