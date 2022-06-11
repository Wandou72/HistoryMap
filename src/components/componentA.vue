<template>

  <svg id = "svgA" @click = 'log()'>
    <rect
	x = 0
	:y = 'heightA - 50'
	height = 50
	width = 60
	fill = 'orange'>
	</rect>
	<text
	dx = 30
	:dy = 'heightA - 17'
	text-anchor = 'middle'
	fill = 'white'
	font-size = 25
	font-weight = 'bold'
	>A
	</text>
  </svg>

</template>

<script>
import * as d3 from "d3"

import axios from 'axios'

export default {
	name: 'componentA',
	data(){
		return {
			heightA:this.$store.state.height * 0.5,
			widthA:this.$store.state.width * 0.3,
			hovered:'',
			selected:'',
			leaf:false,
			bar_title:'',
			panel:false,
			removeFlag:false,
			timeOut:null,
      
		}
	},
	mounted(){
		
		this.$store.commit({
			type :'changeSvg',
			svg :'svgA',
			width : this.widthA,
			height : this.heightA
		})
		this.$store.commit({
			type:'appendBtn',
			svgID:'svgA',
			btnID:'Abtn',
			width:this.widthA,
			text:'show'
		})

		d3.select("#Abtn")
		.on("click",()=>{
			//console.log(this.$store.state.screenShot)
			this.$store.commit('showGraph')
			
		})

		axios.get('data.csv')
		.then(response=>{
			let a = d3.csv.parse(response.data);
			this.$store.commit({
				type :"changeGlobal",
				key :'geo',
				value :a
			});
			//console.log(this.$store.state.geo);
			let b = this.wholeTree(this.$store.state.geo);
			this.$store.commit({
				type :"changeGlobal",
				key :'data_overall',
				value :b
			});
			//console.log(this.$store.state.data_overall);
		})
		.then(()=>{
			const c = JSON.parse(JSON.stringify(this.dataToFlare(this.$store.state.data_overall)))
			this.$store.commit({
				type :"changeGlobal",
				key :'flare',
				value :c
			});
		})
		.then(()=>{
			//console.log(this.$store.state.flare)
			this.createSun(this.$store.state.flare)
		})
		//appendLine(svg,width,height,color,stroke,id){
		this.$store.commit({
			type :"appendLine",
			id :'lineA',
			svg :'svgA',
			width:this.widthA,
			height:this.heightA * 2 / 3 - 20,
			color: 'mediumseagreen',
			stroke:1
		});
		
		this.$store.commit({
			type:'appendTitle',
			id:'AbarTitle',
			svg:'svgA',
			dx:'24px',
			dy:16+this.heightA *2/3,
			size:14
			
		})
		
	},
	computed:{
		statesSelected(){
			return this.$store.state.selected
		},
		userData(){
			return this.$store.state.user.actionList
		},
		global(){
			return this.$store.state.geo
		},
		treeData(){
			return this.$store.state.objB.treeData
		},
		treeDataLength(){
			return this.treeData.length
		},
		treeDataIndex2(){
			return this.treeData[1]? this.treeData[1] : undefined
		},
		rootName(){
			return this.$store.state.objB.rootName
		},
		depth(){
			return this.$store.state.objB.depth
		},
		flare(){
			return this.$store.state.flare
		},
		visualStates(){
			return this.$store.state.visualStates
		}





		// 	selected: payload.selected,
		// 	treeTypeFlag: payload.treeTypeFlag,
		// 	matrixElement: payload.matrixElement,
		// 	graphBtn: payload.graphBtn,
		// 	objB: payload.objB,
		// 	objC: payload.objC,
		// 	objD: payload.objD,
		// 	objE: payload.objE

	},
	methods:{
		log(){
			// console.log(this.$store.state.screenShot)
			// console.log('selected', this.selected)
			// // console.log('visualStates', this.$store.state.visualStates.Aselected)
			// console.log('Dtitle', this.$store.state.objD.title)
			// console.log('visualList', this.$store.state.visualList)
			// console.log('actionList', this.$store.state.user.actionList)
			// console.log('treeData',this.$store.state.objB.treeData)
			console.log('graphBtn',this.$store.state.graphBtn)
		},
		shot(id){
			this.$store.commit({
				type:'getImg',
				id:id
			})
		},
		A_createTip(d,svgID,fillColor,fillOpacity,num){
			if (arguments.length <3){
				fillColor = 'black'
			}
			if(arguments.length<4){
				fillOpacity = 0.7
			}
			if (arguments.length<5){
				num = d.patent_num
			}
			function mouseXY(e){
							e=e||window.event;
							return { "x": e.offsetX, "y": e.offsetY };
						}
			let XY = mouseXY(event);
			
			d3.select("#"+svgID).append("rect")
			.attr("id","tipBack")
			.attr("class","tips")
			.attr('fill',fillColor)
			.style("opacity",fillOpacity)
			.attr("x", XY.x+10)
			.attr("y",XY.y-30)
			.style("width",d.name.length>10?d.name.length *15 +10:140)
			.attr("rx",20);
			
			d3.select("#"+svgID).append("text")
			.attr("class","tips")
			.attr("dx",XY.x+20)
			.attr("dy",XY.y-5)
			.attr("text-anchor","start")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("fill", "white")
			.text(d.name)
			
			d3.select("#"+svgID).append("text")
			.attr("class","tips")
			.attr("dx",XY.x+20)
			.attr("dy",XY.y+15)
			.attr("text-anchor","start")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("fill", "white")
			.text('专利数:'+num)
		},
		A_TipRemove(svgID){
			d3.select("#"+svgID).selectAll(".tips").remove()
		},
		tip_appendText(x,y,gID,text,fillColor){
			if(arguments.length<5){
				fillColor = 'white'
			}
			d3.select("#"+gID).append("text")
			.attr("class","tips")
			.attr("dx",x)
			.attr("dy",y)
			.attr("text-anchor","start")
			.attr("font-family", "sans-serif")
			.attr("font-size", "14px")
			.attr("font-weight", "bold")
			.attr("fill", fillColor)
			.text(text)
		},
		panel_createTip(d){
			
			function mouseXY(e){
							e=e||window.event;
							return { "x": e.offsetX, "y": e.offsetY };
						}
			let XY = mouseXY(event);
			let len = d.name.length>10?d.name.length *15 +10:140
			if(XY.x>this.$store.state.width * 0.70){
				XY.x -= len + 50
			}
			d3.select("#panel").append("rect")
			.attr("id","tipBack")
			.attr("class","tips")
			.style("height",100)
			.attr('fill','#000000')
			.style("opacity",1)
			.attr("x", XY.x+10)
			.attr("y",XY.y-30)
			.style("width",len)
			.attr("rx",20);
			
			this.tip_appendText(XY.x+20,XY.y-5,'panel',d.name);
			this.tip_appendText(XY.x+20,XY.y+15,'panel','view:'+'Svg' + d.view.substring(d.view.length-1,d.view.length));
			this.tip_appendText(XY.x+20,XY.y+35,'panel','action:'+d.obj)
			this.tip_appendText(XY.x+20,XY.y+55,'panel','data:'+d.data);
			
			
			
		},
		createBar(x){
			let B_tree = d3.layout.tree()
			.size([300,300]);
			let B_nodes = B_tree.nodes(x);
			B_nodes = B_nodes.filter(d=> ! d.children);
			B_nodes.sort((a,b)=>{
				return b.patent_num - a.patent_num
			})
			let ind_temp = [];
			if(B_nodes.length<=5){
				ind_temp = B_nodes
			}
			else{
				for(let i =0;i<5;i++){
					ind_temp.push(B_nodes[i])
				}
			}
			
			let bar_data = ind_temp;
			//console.log(bar_data);
			let bar_color = d3.scale.category20();
			let bar_scale = d3.scale.linear().domain([bar_data[bar_data.length-1].patent_num,bar_data[0].patent_num]).range([40,this.widthA/3]);
			let pd = 8,wd = 8;
			d3.select("#svgA").selectAll(".bar1")
			.data(bar_data)
			.enter()
			.append("rect")
			.attr("class","bar1")
			.attr("rx",5)
			.style("fill",(d,i)=>bar_color(i))
			.attr("x",this.widthA/2)
			.attr("y",(d,i)=> 40 + i * (pd+wd) +this.heightA*2/3 - 14)
			.attr("height",0)
			.attr("width",0)
			.on("mouseover",(d)=>{
				d3.select("#svgA").selectAll("path")
				.filter(data=>data.name == d.name)
				.style("fill","#ff0000");
				
				this.$store.commit({
					type:'userMouseover',
				})
				
			})
			.on("mouseout",(d)=>{
				d3.select("#svgA").selectAll("path")
				.filter(data=>data.name != this.selected)
				.style("fill","#fcf6db")
				d3.select("#svgA").selectAll("path")
				.filter(data=>data.name == this.selected)
				.style("fill","#06ddf4")
				
				this.$store.commit({
					type:'userMouseout',
					view:'viewA',
					obj:'tips(industry)',
					name:d.name,
					value:d.patent_num,
					height:this.heightA,
					width:this.widthA,
					desc0: 'hover industry' + d.name,
					desc:'the overall patent number in ' + d.name +' is ' + d.patent_num,
					
          data:{
            industry:d.name,
            company:[],
            province:[],
            attribute:'patent_num'
          }
				})
				this.$store.commit('OutRecordState')
				
			})
			
			
			d3.select("#svgA").selectAll(".bar1")
			.data(bar_data)
			.attr("width",0)
			.style("fill",(d,i)=>bar_color(i))
			.transition()
			.delay((d,i)=> i * 200)
			.attr("height",wd)
			.attr("width",d=>bar_scale(d.patent_num));
			
			d3.select("#svgA").selectAll(".bar1")
			.data(bar_data)
			.exit()
			.remove();
			
			d3.select("#svgA").selectAll(".barText1")
			.data(bar_data)
			.enter()
			.append("text")
			.attr("font-family", "sans-serif")
			.attr("font-weight", "bold")
			.attr("class","barText1")
			
			.attr("dx",this.widthA/2 - 10)
			.attr("dy",(d,i)=> 40 + i * (pd+wd) +10+this.heightA *2/3 -14)
			.attr("text-anchor","end")
			.text(d=>d.name)
			.attr("fill","black")
			.attr("font-size", "0px")
			.transition()
			.delay((d,i)=> i * 200)
			.attr("font-size", "12px")
			
			d3.select("#svgA").selectAll(".barText1")
			.data(bar_data)
			.text(d=>d.name)
			.attr("font-size", "0px")
			.transition()
			.delay((d,i)=> i * 200)
			.attr("font-size", "12px");
			
			d3.select("#svgA").selectAll(".barText1")
			.data(bar_data)
			.exit()
			.remove();
			
			d3.select("#svgA").selectAll(".barTextTag1")
			.data(bar_data)
			.enter()
			.append("text")
			.attr("font-family", "sans-serif")
			.attr("font-weight", "bold")
			.attr("class","barTextTag1")
			.attr("dx",d=>bar_scale(d.patent_num) + this.widthA/2 +5)
			.attr("dy",(d,i)=> 40 + i * (pd+wd) +10+this.heightA *2/3-14)
			.text(d=>d.patent_num)
			.attr("font-size", "0px")
			.transition()
			.delay((d,i)=> i * 200)
			.attr("font-size", "12px");
			
			d3.select("#svgA").selectAll(".barTextTag1")
			.data(bar_data)
			.text(d=>d.patent_num)
			.attr("font-size", "0px")
			.attr("dx",d=>bar_scale(d.patent_num) + this.widthA/2 +5)
			.transition()
			.delay((d,i)=> i * 200)
			.attr("font-size", "12px");
			
			d3.select("#svgA").selectAll(".barTextTag1")
			.data(bar_data)
			.exit()
			.remove();
		},
		wholeTree(data){
			let data_overall = [];
			let keys = ['id','name1','name2','name3','name4','name5','name6','name7','name8','comp_name','patent_num','province'];
			for(let i = 0;i<data.length;i++){
				let obj = new Object();
				for(let j = 0;j<keys.length;j++){
					obj[keys[j]] = data[i][keys[j]]
				}
				data_overall.push(obj);
				if(data_overall[i].name2 == "OLED" && data_overall[i].name3 == "制造工艺"){
					data_overall[i].name3 = "OLED制造工艺"
				}
				if(data_overall[i].name2 == "OLED" && data_overall[i].name3 == "制造设备"){
					data_overall[i].name3 = "OLED制造设备"
				}
				if(data_overall[i].name2 == "TFT-LCD" && data_overall[i].name3 == "制造工艺"){
					data_overall[i].name3 = "TFT-LCD制造工艺"
				}
				if(data_overall[i].name2 == "TFT-LCD" && data_overall[i].name3 == "制造设备"){
					data_overall[i].name3 = "TFT-LCD制造设备"
				}
				if(data_overall[i].name7 == "电致发光体(EL)" && data_overall[i].name6 == "电致发光体(EL)"){
					data_overall[i].name7 = "电致发光体(EL)(2)"
				}
				
			}
			//console.log(data_overall)
			return data_overall
			
			
		},
		
		createSun(data){
			const partition = d3.layout.partition()
			.value(function(d) { return d.patent_num +7000; });
			
			const radius = (Math.min(this.widthA,this.heightA) / 3) - 10;
			
			//console.log('!!!')
			
			let x = d3.scale.linear()
					.range([0, 2 * Math.PI]);
			
			let y = d3.scale.sqrt()
					.range([0, radius]);
			const arc = d3.svg.arc()
			.startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
			.endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
			.innerRadius(function(d) { return Math.max(0, y(d.y)); })
			.outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
			
			let group_sun = d3.select("#svgA").append("g").attr("id","sunrise")
			.attr("transform","translate("+ [500/2,500/3 ] +")");
			
			let A_title = d3.select("#svgA").append("text");
			
			A_title.attr("dx","24px")
			.attr("dy","30px")
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("font-weight", "bold")
			.style("fill","black")
			.attr("text-anchor","start")
			.text("半导体显示产业结构图");
			//console.log(partition.nodes(data))
			group_sun.selectAll("path")
					.data(partition.nodes(data))
					.enter().append("path")
					.attr("d", arc)
					.on("mouseover",(d)=>{
						this.hovered = d.name
						this.A_TipRemove('svgA');
						this.A_createTip(d,'svgA');
						this.$store.commit({
							type:'userMouseover'
						})
					})
					.on("mousemove",d=>{
						this.A_TipRemove('svgA');
						this.A_createTip(d,'svgA');
					})
					.on("mouseout",(d)=>{
						this.hovered = ''
						setTimeout(() => {
							this.A_TipRemove('svgA');
							}, 1500);
						
						this.$store.commit({
							type:'userMouseout',
							view:'viewA',
							obj:'tips(industry)',
							name:d.name,
							value:d.patent_num,
							width:this.widthA,
							height:this.heightA,
							desc0: 'hover industry' + d.name,
							desc:'the overall patent number in ' + d.name +' is ' + d.patent_num,
							data:{
								industry:d.name,
								company:[],
								province:[],
								attribute:'patent_num'
							}
						})
						this.$store.commit('OutRecordState')
						
					})
					// 选择产业节点
					.on("click",d=>{
						// console.log(this.selected);
						this.$store.commit("objBclear");
						this.selected = d.name;
						//console.log(this.selected);
						this.$store.commit({
							type:'userClick',
							view:'viewA',
							obj:'select industry(overall)',
							name:d.name,
							value:d.patent_num,
							height:this.heightA,
							width:this.widthA,
							desc:'the overall patent number in ' + d.name +' is ' + d.patent_num,	
							desc0:'Select industry ' + d.name,		
							data:{
								industry:d.name,
								company:[],
								province:[],
								attribute:'patent_num'
							},
							// visualKeys: {}
						})

						this.$store.commit('ClickRecordState')



						
						if(!d.children){
							this.leaf = true;
							this.createBar(d.parent);
							this.bar_title = d.parent.name
						}
						else if(d.children){
							this.leaf = false
							this.createBar(d);
							this.bar_title = d.name
						}
						
						//this.shot('app')
						
					})
					.style("fill", "#fcf6db")
					.style("fill-opacity",1)
					.style("stroke","#6c6c6c")
					
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
		aler2(){
			
			
		},
		createPanel(){
			let w = this.$store.state.width * 0.85;
			let h = this.$store.state.height * 0.7;
			let data = this.userData;
			let len = data.length;
			let column = 8
			let pd = 5,ph = h/(Math.ceil(len/column)+1);
			let boxWidth = (w - 50)/(column) - pd
			let boxHeight = 30
			
			d3.select("body")
			.append('svg')
			.attr("id",'panel')
			.style("left",this.$store.state.width * 0.08)
			.style("top",this.$store.state.height * 0.1)
			.style("position",'absolute')
			.attr("width",w)
			.attr("height",h)
			.style("background-color",'#000000')
			.style("opacity",0.7)
			
			let actions = d3.select("#panel").append("g")
			let color = d3.scale.category10()
			let scale = d3.scale.linear().domain([1,5]).range([boxHeight,ph ])
			actions.selectAll("rect")
			.data(data)
			.enter()
			.append('rect')
			.attr("width",d=>d.lastTime?boxWidth*3/4:boxWidth)
			.attr('height',d=>d.lastTime?scale(d.lastTime):boxHeight)
			.attr("x",(d,i)=> d.lastTime?(i%column) * (boxWidth + pd)+ pd + boxWidth/8:(i%column) * (boxWidth + pd)+ pd )
			.attr("y",(d,i)=>d.lastTime?(Math.floor(i/column)+1) * ph-scale(d.lastTime)+30:(Math.floor(i/column)+1) * ph)
			.attr("rx",10)
			.style("fill",d=>color(d.view))
			.style("stroke-width",3)
			.style("stroke",d=>d.lastTime? 'None':'white')
			.on("mouseover",(d)=>this.panel_createTip(d))
			.on("mousemove",d=>{
				this.A_TipRemove('panel');
				this.panel_createTip(d)
			})
			.on("mouseout",()=>{
				this.A_TipRemove('panel')
			})
			
			actions.selectAll("text")
			.data(data)
			.enter()
			.append('text')
			.attr("width",boxWidth)
			.attr('height',boxHeight)
			.style("fill",'white')
			.style("text-weight",'bold')
			.attr("text-anchor",'middle')
			.attr("dx",(d,i)=> (i%column) * (boxWidth + pd)+ pd  + boxWidth/2)
			.attr("dy",(d,i)=>(Math.floor(i/column)+1) * ph + 15)
			.on("mouseover",(d)=>this.panel_createTip(d))
			.on("mousemove",d=>{
				this.A_TipRemove('panel');
				this.panel_createTip(d)
			})
			.on("mouseout",()=>{
				this.A_TipRemove('panel')
			})
			.text(d=>d.obj)

		}
	},
	watch:{
		panel(val){
			if(val){
				this.createPanel()
			}
			else {
				d3.select("#panel")
				.remove()
			}
		},
		hovered(val){
			d3.select("#svgA").selectAll("path")
			.filter(d=>{return d.name == val})
			.style("fill","#06ddf4");
			
			d3.select("#svgA").selectAll("path")
			.filter(d=>{return d.name != val && d.name != this.selected})
			.style("fill","#fcf6db")
		},
		selected(val){
			d3.select("#svgA").selectAll("path")
			.filter(d=>{return d.name == val})
			.style("fill","#06ddf4");
			d3.select("#svgA").selectAll("path")
			.filter(d=>{return d.name != val})
			.style("fill","#fcf6db");
			this.$store.commit({
				type:'changeDataD',
				selected:val,
				leaf:this.leaf
			})
			this.$store.commit({
					type:'changeStatesA',
					Aselected:val,
					Aleaf:this.leaf
				})
			this.$store.commit({
				type:'changeGlobalD',
				key:'title',
				value:val
			})
			this.$store.commit({
				type: 'changeStatesD',
				Dtitle: val
				})
			// 需要在这里修改visualstates的参数

		},
		bar_title(val){
			d3.select("#AbarTitle")
			.text(val+"叶子产业专利数排序")
		},
		leaf(val){
				this.$store.commit({
					type:'changeDataD',
					selected:this.selected,
					leaf:val
				})
				this.$store.commit({
					type:'changeStatesA',
					Aselected:this.selected,
					Aleaf:val
				})

		},
		treeDataLength(val){
			
			let tempDatat =[];
			let tempDatat2 = [];
			let tempDatat3 = [];
			let tempDatat4 = [];
			let tempDatat5 = [];
			if(val == 0){
				this.$store.commit({
					type : 'changeBflare',
					
				})
			}
			else if(val == 1){
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i].comp_name == this.treeData[0]){
						tempDatat.push(this.$store.state.data_overall[i]);
					}
				}
				let a = this.dataToFlare(tempDatat)
				//console.log(a)
				this.$store.commit({
					type : 'changeBflare',
					flare0 :a
				})
			}
			else if(val == 2){
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i]['name'+(this.depth+1)]==this.rootName&&this.$store.state.data_overall[i].comp_name == this.treeData[0]){
						tempDatat.push(this.$store.state.data_overall[i]);
					}
				}
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i]['name'+(this.depth+1)]==this.rootName&&this.$store.state.data_overall[i].comp_name == this.treeData[1]){
						tempDatat2.push(this.$store.state.data_overall[i]);
					}
				}
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i]['name'+(this.depth+1)]==this.rootName&&(this.$store.state.data_overall[i].comp_name == this.treeData[0]||
					this.$store.state.data_overall[i].comp_name == this.treeData[1])){
						tempDatat3.push(this.$store.state.data_overall[i]);
					}
				}
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i]['name'+(this.depth+1)]==this.rootName&&(this.$store.state.data_overall[i].comp_name == this.treeData[0]||
					this.$store.state.data_overall[i].comp_name == this.treeData[1])){
						tempDatat4.push(this.$store.state.data_overall[i]);
					}
				}
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i]['name'+(this.depth+1)]==this.rootName&&(this.$store.state.data_overall[i].comp_name == this.treeData[0]||
					this.$store.state.data_overall[i].comp_name == this.treeData[1])){
						tempDatat5.push(this.$store.state.data_overall[i]);
					}
				}
				let a = this.dataToFlare(tempDatat);
				let b = this.dataToFlare(tempDatat2);
				let c = this.dataToFlare(tempDatat3);
				let d = this.dataToFlare(tempDatat4);
				let e = this.dataToFlare(tempDatat5);
				this.$store.commit({
					type : 'changeBflare',
					flare0 :a,
					flare1 :b,
					flareSum :c,
					flareSum2 :d,
					flareSum3 :e
				})
				this.$store.commit({
					type: 'changeStatesB',
					Bflare0 :a,
					Bflare1 :b,
					BflareSum :c,
					BflareSum2 :d,
					BflareSum3 :e
				})
			}
			
		},
		treeDataIndex2(val){
			let tempDatat =[];
			let tempDatat2 = [];
			let tempDatat3 = [];
			let tempDatat4 = [];
			let tempDatat5 = [];
			
			if(val){
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i].comp_name == this.treeData[0]){
						tempDatat.push(this.$store.state.data_overall[i]);
					}
				}
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i].comp_name == this.treeData[1]){
						tempDatat2.push(this.$store.state.data_overall[i]);
					}
				}
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i].comp_name == this.treeData[0]||
					this.$store.state.data_overall[i].comp_name == this.treeData[1]){
						tempDatat3.push(this.$store.state.data_overall[i]);
					}
				}
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i].comp_name == this.treeData[0]||
					this.$store.state.data_overall[i].comp_name == this.treeData[1]){
						tempDatat4.push(this.$store.state.data_overall[i]);
					}
				}
				for(let i = 0;i<this.$store.state.data_overall.length;i++){
					if(this.$store.state.data_overall[i].comp_name == this.treeData[0]||
					this.$store.state.data_overall[i].comp_name == this.treeData[1]){
						tempDatat5.push(this.$store.state.data_overall[i]);
					}
				}
				let a = this.dataToFlare(tempDatat);
				let b = this.dataToFlare(tempDatat2);
				let c = this.dataToFlare(tempDatat3);
				let d = this.dataToFlare(tempDatat4);
				let e = this.dataToFlare(tempDatat5);
				
				this.$store.commit({
					type : 'changeBflare',
					flare0 :a,
					flare1 :b,
					flareSum :c,
					flareSum2 :d,
					flareSum3 :e
				})

				this.$store.commit({
					type: 'changeStatesB',
					Bflare0 :a,
					Bflare1 :b,
					BflareSum :c,
					BflareSum2 :d,
					BflareSum3 :e
				})
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
