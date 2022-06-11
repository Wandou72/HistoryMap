import { createStore } from 'vuex'
import * as d3 from 'd3'
import html2canvas from 'html2canvas'
// import isFrozen from 'core-js/library/fn/object/is-frozen'
//import axios from 'axios'
//import csvd from '@/data/csv.js'
//import axios from 'axios'
//let a;

const store = createStore({

		state(){
			return {
				width:document.documentElement.clientWidth-50,
				height:document.documentElement.clientHeight-50,
				geo : 1,
				data_overall :[],
				flare:{},
				province:['河北省','山西省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','陕西省','甘肃省','青海省','台湾省','内蒙古自治区','广西壮族自治区','西藏自治区','宁夏回族自治区','新疆维吾尔自治区','北京市','天津市','上海市','重庆市','香港特别行政区','澳门特别行政区'],
				leaf:false,
				selected:'',
				treeTypeFlag:'',
				matrixFlag:'tree',
				matrixElement:[],
				graphBtn:false,
				objB:{
					
					treeData:Array(0),
					flare0:false,
					flare1:false,
					flareSum:false,
					flareSum2:false,
					flareSum3:false,
					splited:false,
					rootName:'半导体显示',
					depth:0,

				},
				objD:{
					title:'',
					
				},
				objC:{
					geojson:{},
					seajson:{},
					circled:Array(0),
					
				},
				objF:{
					projson:{},
					provjson:{},
					indData:[]
				},
				user:{
					index1:0,
					actionList:[],
				},
				timeStamp:0,
				timeStampInterval:-1,

				userMouseover:{
					index1:0,
					time:0,
					interval:-1,
					mouseoverList:[],
				},
				story:{
				btn:false,
				text:[],
				},
				screenShot:[],
				visualStates:{
					Aselected: '',
					Aleaf:false,

					Bflare0 :false,
					Bflare1 :false,
					BflareSum :false,
					BflareSum2 :false,
					BflareSum3 :false,
					BtreeData: [],
					BtreeTypeFlag: '',
					
					Bsplited: false,
					Bdepth: 0,
					BrootName: '半导体显示',

					Ccircled: [],
					Dtitle:''
				},
				visualList:[]
				// visualVar:{
				// 	industry: null, 
				// 	splitFlag: false, 
				// 	companyA: null, 
				// 	companyB: null, 
				// 	provinceA: null, 
				// 	provinceB: null, 
				// 	treeNode: null,

				// }
			}
			
	},
	getters:{
		
	},


	mutations:{
	rebuildStates(state, payload){
		state.selected = payload.Aselected;
		state.leaf = payload.Aleaf;
		state.objB.flare0 = payload.Bflare0;
		state.objB.flare1 = payload.Bflare1;
		state.objB.flareSum = payload.BflareSum;
		state.objB.flareSum2 = payload.BflareSum2;
		state.objB.flareSum3 = payload.BflareSum3;
		state.objB.treeTypeFlag = payload.BtreeTypeFlag;
		state.objB.splited = payload.Bsplited;
		state.objB.depth = payload.Bdepth;
		state.objB.rootName = payload.BrootName;
		state.objB.treeData = payload.BtreeData;
		state.objD.title = payload.Dtitle
	},
	changeStatesA(state, payload){
		state.visualStates.Aselected = payload.Aselected;
		state.visualStates.Aleaf = payload.Aleaf;
	},

	changeStatesB(state, payload){
		state.visualStates.Bflare0 = payload.Bflare0;
		state.visualStates.Bflare1 = payload.Bflare1;
		state.visualStates.BflareSum = payload.BflareSum;
		state.visualStates.BflareSum2 = payload.BflareSum2;
		state.visualStates.BflareSum3 = payload.BflareSum3;
	},

	// clearStatesB(state, payload){
	// 	state.visualStates.BtreeData = [];
	// 	state.visualStates.BtreeTypeFlag = payload.flag;
	// 	state.visualStates.Bsplited = false;
	// 	state.visualStates.Bdepth = 0;
	// 	state.visualStates.BrootName = '半导体显示';
	// },

	changeStatesD(state, payload){
		state.visualStates.Dtitle = payload.Dtitle
	},

	ClickRecordState(state){
		let tmp = Object.assign({}, state.visualStates);
		state.visualList.push(tmp)	
	},

	OutRecordState(state){
		if(state.userMouseover.time>3){
			let tmp = Object.assign({}, state.visualStates);
			state.visualList.push(tmp)
		}
	},

	getImg(state,payload){
		
           //document.getElementById("app6"),
			html2canvas(
			document.getElementById(payload.id),
           {
            // width : 300,
             //height : 300,
             width:payload.width-2,
             height:payload.height-2,
             //windowWidth:document.body.scrollWidth,
             //windowHeight:document.body.scrollHeight,
             x:2,
             y:2,
             backgroundColor:'white',//画出来的图片有白色的边框,不要可设置背景为透明色（null）
             useCORS: true,//支持图片跨域
             scale: 0.5,//设置放大的倍数
           }
         ).then(canvas => {
           //截图用img元素承装，显示在页面的上
           ////console.log(img.src)
           //document.getElementById('test').appendChild(img);
           state.screenShot.push(canvas.toDataURL('image/jpeg')) // toDataURL :图片格式转成 base64
       
           //如果你需要下载截图，可以使用a标签进行下载
           
         })
	},

    changeStoryText(state,payload){
      state.story.text = payload.text
    },
	
    changeStoryBtn(state){
      state.story.btn  = !state.story.btn
    },

	showGraph(state){
			state.graphBtn = !state.graphBtn
		},
		
	userClick(state,payload){
      if(state.timeStamp == 0){
        state.timeStampInterval = setInterval(function(){
				state.timeStamp += 0.1
			},100)
      }
			let id 
			if(payload.view == 'viewA'){
				id = 'app'
			}
			else if(payload.view == 'viewB'){
				id = 'app2'
			}
			else if(payload.view == 'viewC'){
				id = 'app3'
			}
			else if(payload.view == 'viewD'){
				id = 'app4'
			}
			else if(payload.view == 'viewF'){
				id = 'app6'
			}
			
			setTimeout(() => {
				html2canvas(
					document.getElementById(id),
					{
					// width : 300,
					//height : 300,
					width:payload.width-2,
					height:payload.height-2,
					//windowWidth:document.body.scrollWidth,
					//windowHeight:document.body.scrollHeight,
					x:2,
					y:2,
					backgroundColor:'white',//画出来的图片有白色的边框,不要可设置背景为透明色（null）
					useCORS: true,//支持图片跨域
					scale: 1,//设置放大的倍数
					}
					).then(canvas => {
					state.screenShot.push(canvas.toDataURL('image/jpeg')) // toDataURL :图片格式转成 base64
					//如果你需要下载截图，可以使用a标签进行下载
					state.user.actionList.push({
						pic:canvas.toDataURL('image/jpeg'), 
						desc:payload.desc, 
						desc0:payload.desc0,
						timeStamp:state.timeStamp, 
						index1:state.user.index1, 
						view:payload.view, 
						obj:payload.obj,
						name:payload.name,
						data:payload.data,
						value:payload.value,
						// visualStates:tmp
					})
					
			
					
				})
			}, 1100);
			state.user.index1++
			
			

		},

		userMouseover(state){
			//state.userMouseover.time = 0
			state.userMouseover.time = 0
			clearInterval(state.userMouseover.interval)
			state.userMouseover.interval = setInterval(function(){
				state.userMouseover.time += 0.1
			},100)
			
		},
		userMouseout(state,payload){
			
			if(state.userMouseover.time>3){
				// let tmp = Object.assign({}, state.visualStates)
				// state.visualList.push(tmp)
			let id 
			if(payload.view == 'viewA'){
				id = 'app'
			}
			else if(payload.view == 'viewB'){
				id = 'app2'
			}
			else if(payload.view == 'viewC'){
				id = 'app3'
			}
			else if(payload.view == 'viewD'){
				id = 'app4'
			}
			else if(payload.view == 'viewF'){
				id = 'app6'
			}
			setTimeout(() => {
				html2canvas(
					document.getElementById(id),
					{
					// width : 300,
					//height : 300,
					width:payload.width,
					height:payload.height,
					//windowWidth:document.body.scrollWidth,
					//windowHeight:document.body.scrollHeight,
					x:0,
					y:0,
					backgroundColor:'white',//画出来的图片有白色的边框,不要可设置背景为透明色（null）
					useCORS: true,//支持图片跨域
					scale: 1,//设置放大的倍数
					}
					).then(canvas => {
					state.screenShot.push(canvas.toDataURL('image/jpeg')) // toDataURL :图片格式转成 base64
					//如果你需要下载截图，可以使用a标签进行下载
					state.user.actionList.push({
						pic:canvas.toDataURL('image/jpeg'),
						desc:payload.desc,
						desc0:payload.desc0,
						timeStamp:state.timeStamp-state.userMouseover.time,
						lastTime:state.userMouseover.time,
						index1:state.user.index1,
						view:payload.view,
						obj:payload.obj,
						name:payload.name,
						data:payload.data,
						value:payload.value,
						// visualStates:tmp
					})
					// state.visualList.push(state.visualStates)
			
					
				})
			}, payload.dif === 'fast'?0:1100);
			
			state.user.index1++
		}
			
		},
		elementClearMatrix(state){
			state.matrixElement = []
		},
		elementClear(state,payload){
			if((state.treeTypeFlag == 'company' && payload.flag == 'province')||
			(state.treeTypeFlag == 'province' && payload.flag == 'company')){
				state.matrixElement = []
				state.objB.treeData = [];
				state.treeTypeFlag = payload.flag;
				state.objB.splited = false;
				state.objB.depth = 0;
				state.objB.rootName = '半导体显示';
				d3.select("#svgB").selectAll("path").remove();
				d3.select("#svgB").selectAll("line").remove();
				d3.select("#gCircles1").selectAll("circle").remove();
				d3.select("#gCircles2").selectAll("circle").remove();

				state.visualStates.BtreeData = [];
				state.visualStates.BtreeTypeFlag = payload.flag;
				state.visualStates.Bsplited = false;
				state.visualStates.Bdepth = 0;
				state.visualStates.BrootName = '半导体显示';
				
			}
			else {
				state.treeTypeFlag = payload.flag
			}
		},

		changeMatrixElement(state,payload){
			
			if(state.matrixElement.indexOf(payload.element)==-1){
				//console.log(payload.element)
				state.matrixElement.push(payload.element)
				//console.log(state.matrixElement)
			}
			else if(state.matrixElement.indexOf(payload.element)!=-1){
				//console.log("!111")
				state.matrixElement.splice(state.matrixElement.indexOf(payload.element),1)
			}
		},
		/* changetreeTypeFlag(state,payload){
			
			if(state.treeTypeFlag != payload.flag){
				state.objB.treeData = [];
				state.treeTypeFlag = payload.flag;
				state.objB.splited = false;
				state.objB.depth = 0;
				state.objB.rootName = '半导体显示';
				d3.select("#svgB").selectAll("path").remove();
				d3.select("#svgB").selectAll("line").remove();
				d3.select("#gCircles1").selectAll("circle").remove();
				d3.select("#gCircles2").selectAll("circle").remove();
			}
		}, */
		changeMatrixFlag(state,payload){
			state.matrixFlag = payload.flag
		},
		appendBtn(state,payload){
			d3.select("#"+payload.svgID).append("g").attr("id",payload.btnID)
			.style("cursor",'pointer')
			.attr("transform",'translate('+[payload.width - 70,20]+')')
			.on("mousedown",()=>{
				d3.select('#'+payload.btnID)
				.select("rect")
				.style("fill","#4f4f51")
				
				
				d3.select('#'+payload.btnID)
				.select("text")
				.style("fill",'white')
			})
			.on("mouseup",()=>{
				d3.select('#'+payload.btnID)
				.select("rect")
				.style("fill",'#b4acc8')
				
				d3.select('#'+payload.btnID)
				.select("text")
				.style("fill",'black')
			})
			
			d3.select('#'+payload.btnID)
			.append("rect")
			.attr("width",60)
			.attr("height",25)
			.style("fill",'#b4acc8')
			.attr("stroke",'black')
			.attr("rx",8)
			
			d3.select('#'+payload.btnID)
			.append("text")
			.attr("dx",30)
			.attr("dy",17)
			.attr("text-anchor",'middle')
			.style("fill",'black')
			.style("font-weight",'bold')
			.text(payload.text)
		},
		updateTreeData(state,payload){
			
			if(state.objB.treeData.length == 0){
				state.objB.treeData.push(payload.name)
			}
			else if(state.objB.treeData.length == 1){
				if(state.objB.treeData[0] != payload.name){
					state.objB.treeData.push(payload.name)
				}
				else if(state.objB.treeData[0] == payload.name){
					state.objB.treeData = []
				}
			}
			else if(state.objB.treeData.length == 2){
				if(state.objB.treeData.indexOf(payload.name) == -1){
					state.objB.treeData[1] = payload.name
				}
				else if(state.objB.treeData.indexOf(payload.name) != -1){
					state.objB.treeData.splice(state.objB.treeData.indexOf(payload.name),1)
				}
			}
			
			// let tmp = Object.assign([], state.objB.treeData)
			// state.visualStates.BtreeData = tmp
			
		},
		synTreeData(state){
			let tmp = Object.assign([], state.objB.treeData)
			state.visualStates.BtreeData = tmp
		},
		FindData(state,payload){
			state.objF.indData = payload.value
		},
		FprovincePro(state,payload){
			state.objF.provjson = payload.provjson
		},
		FcompanyPro(state,payload){
			state.objF.projson = payload.projson
		},
		Cgeojson(state,payload){
			state.objC.geojson = payload.geojson
		},
		Cseajson(state,payload){
			state.objC.seajson = payload.seajson
		},
		delTreeData(state,payload){
			if(payload.index == 'left'){
				state.objB.treeData.splice(0,1)
			}
			else if (payload.index =='right'){
				state.objB.treeData.splice(1,1)
			}
			// let tmp = Object.assign({}, state.objB.treeData)
			// state.visualStates.BtreeData = tmp

		},
		objBDepth(state,payload){
			if(payload.flag == 0){
				state.objB.depth = 0;
				state.objB.rootName = '半导体显示'

				state.visualStates.Bdepth = 0
				state.visualStates.BrootName = '半导体显示'
			}
			else if(payload.flag >0){
				state.objB.depth += payload.depth
				state.objB.rootName = payload.rootName

				state.visualStates.Bdepth += payload.depth
				state.visualStates.BrootName = payload.rootName
			}
		},
		objBSplitFlag(state){
			if(state.objB.splited){
				state.objB.splited = false
				state.visualStates.Bsplited = false
			}
			else {
				state.objB.splited = true
				state.visualStates.Bsplited = true
			}

			
		},
		objBclear(state){
			d3.select("#svgB").selectAll("path").remove();
			d3.select("#svgB").selectAll("line").remove();
			d3.select("#gCircles1").selectAll("circle").remove();
			d3.select("#gCircles2").selectAll("circle").remove();
			
			state.objB ={
					
					treeData:Array(0),
					flare0:false,
					flare1:false,
					flareSum:false,
					flareSum2:false,
					flareSum3:false,
					splited:false,
					rootName:'半导体显示',
					depth:0,

				},

			state.visualStates.Bflare0 = false;
			state.visualStates.Bflare1 = false;
			state.visualStates.BflareSum = false;
			state.visualStates.BflareSum2 = false;
			state.visualStates.BflareSum3 = false;
			state.visualStates.Bsplited = false;
			state.visualStates.BrootName = '半导体显示';
			state.visualStates.Bdepth = 0;


			state.objC.circled = [];
			state.visualStates.Ccircled = [];
		},
		changeBtreeData(state,payload){
			if(state.objB.treeData.length == 0){
				state.objB.treeData.push(payload.comp)
			}
			else if(state.objB.treeData.length == 1){
				if(state.objB.treeData[0] != payload.comp){
					state.objB.treeData.push(payload.comp)
				}
				else if(state.objB.treeData[0] == payload.comp){
					state.objB.treeData = []
				}
			}
			else if(state.objB.treeData.length == 2){
				if(state.objB.treeData.indexOf(payload.comp) == -1){
					state.objB.treeData[1] = payload.comp
				}
				else if(state.objB.treeData.indexOf(payload.comp) != -1){
					state.objB.treeData.splice(state.objB.treeData.indexOf(payload.comp),1)
				}
			}
			
			let tmp = Object.assign([], state.objB.treeData)
			state.visualStates.BtreeData = tmp
			
		},
		changeBflare(state,payload){
			if(state.objB.treeData.length == 0 ){
				state.objB.flare0 = false;
				state.objB.flare1 = false;
				state.objB.flareSum = false;
				state.objB.flareSum2 = false;
				state.objB.flareSum3 = false;
				
			}
			else if(state.objB.treeData.length == 1){
				state.objB.flare0 = payload.flare0;
				state.objB.flare1 = false;
				state.objB.flareSum = false;
				state.objB.flareSum2 = false;
				state.objB.flareSum3 = false;
				
			}
			else if(state.objB.treeData.length == 2){
				state.objB.flare0 = payload.flare0;
				state.objB.flare1 = payload.flare1;
				state.objB.flareSum = payload.flareSum;
				state.objB.flareSum2 = payload.flareSum2;
				state.objB.flareSum3 = payload.flareSum3
			}
			
		},
		
		changeGlobalD(state,payload){
			state.objD[payload.key] = payload.value;
			
		},
		changeDataD(state,payload){
			state.selected = payload.selected;
			state.leaf = payload.leaf
		},
		changeGlobal(state,payload){
			state[payload.key] = payload.value
		},
		//appendLine(svg,width,height,color,stroke,id){
		appendLine(state,payload){
			d3.select("#"+payload.svg).append("line")
			.attr("id",payload.id)
			.attr("x1",0)
			.attr("x2",payload.width)
			.attr("y1",payload.height)
			.attr("y2",payload.height)
			.style("stroke",payload.color)
			.style("stroke-width",payload.stroke)
		},
		changeSvg(state,payload){
			d3.select("#"+payload.svg)
			.attr("width",payload.width)
			.attr("height",payload.height)
		},
		appendTitle(state,payload){
			d3.select("#"+payload.svg).append("text")
			.attr("id",payload.id)
			.attr("class",payload.class)
			.attr("dx",payload.dx)
			.attr("dy",payload.dy)
			.attr("font-family", "sans-serif")
			.attr("font-size", payload.size)
			.attr("font-weight", "bold")
			.style("fill","black")
			.attr("text-anchor","start");
		},
		changeApp(state,payload){
			d3.select("#"+payload.app)
			.style("width",payload.width + 'px')
			.style("height",payload.height + 'px')
			.style("top",payload.top + 'px')
			.style("left",payload.left + 'px')
		}
		
	}
	
})

export default store