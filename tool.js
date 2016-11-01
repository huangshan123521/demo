// 跨浏览器获取窗口大小
function getInner(){
	if(window.innerWidth!='undefined'){
		return {
			width:window.innerWidth,
			height:window.innerHeight
	}
	}else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}
}

// 跨浏览器获取style
function getStyle (element,attr) {
	if (typeof window.getComputedStyle!='undefined') 
	{
		return window.getComputedStyle(element,null)[attr];
	}
	// IE的就需要使用
	else if (typeof element.getCurrentStyle!='undefined') {
		return element.getCurrentStyle[attr];
	}
}

// 判断class是否存在
function hasClass (element,className) {
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}
// 跨浏览器添加link或者style规则
function insertRule (sheet,selectorText,cssText,position) {
	if(typeof sheet.insertRule!='undefined'){
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}
	// IE情况下
	else if(typeof sheet.addRule!='undefined'){
		sheet.addRule(selectorText,cssText,position);
	}
}
// 跨浏览器移除link或者style规则
function removeRule (sheet,index) {
	// W3C情况下
		if(typeof sheet.deleteRule!='undefined'){
			sheet.deleteRule(index);
		}else if(typeof sheet.removeRule!='undefined'){
			sheet.removeRule(index);
		}
}

// 跨浏览器事件绑定
	// 事件的问题：IE就是事多
	// 1.同一个元素的同一事件句柄可以绑定多个监听函数window.load()
	// 2.W3C会将同一元素的同一事件句柄上多次注册的同一函数默认为忽略掉第一次注册后的函数，而IE确都执行 要兼容
	// 3.函数中的this指向处理事件的节点，而IE指向window 要兼容
	// 4.监听函数的执行顺序应当是按照当时绑定的顺序执行，而IE却不是 要兼容
	// 5.函数体不用使用event=event|window.event;来标准化Event对像


// 上
// // 跨浏览器添加事件绑定
// function addEvent (obj,type,fn) {
// 	// W3C
// 	if(typeof obj.addEventListener!='undefined'){
// 		obj.addEventListener(type,fn,false);
// 	}else if(typeof obj.attachEvent!='undefined'){
// 		obj.attachEvent('on'+type,fn);
// 	}
// }
// // 跨浏览器删除事件绑定
// function removeEvent (obj,type,fn) {
// 	// W3C
// 	if(typeof obj.removeEventListener!='undefined'){
// 		obj.removeEventListener(type,fn,false);
// 	}else if(typeof obj.detachEvent!='undefined'){
// 		obj.detachEvent('on'+type,fn);
// 	}
// }

//  中
// 1.无法删除事件】
// 2.无法顺序事件
// 跨浏览器模拟事件绑定

function addEvent (obj,type,fn) {
	// W3C
	if(typeof obj.addEventListener!='undefined'){
		obj.addEventListener(type,fn,false);
	}else {
		// 第一次创建
		if (!obj.events)
			// 创建一个可以保存事件的哈希表（散列表）
		 {obj.events={};};
		if(!obj.events[type]){
			// 创建一个可以保存事件处理函数的数组
			obj.events[type]=[];
			// 把第一次的事件处理函数先存储到第一个位置上
			if(obj['on'+type])obj.events[type][0]=fn;
			// 执行事件处理
			obj['on'+type]=addEvent.exec;
		}else{
			// 同一注册函数取消计数
			if(addEvent.array(fn,obj.events[type]))return false;
		}
		// 从第二次开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++]=fn;
		
	}
	
}
addEvent.array=function  (fn,es) {
	for(var i in es){
		if(es[i]==fn)return true;
	}
	return false;
}
addEvent.ID=1;
addEvent.exec=function  (event) {
	// 原本是e=event|window.event但是IE的组织默认行为和冒泡方法不同
	var e=event||addEvent.fixEvent(window.event);
	var es=this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
};
// 
function removeEvent (obj,type,fn) {
	// W3C
	if(typeof obj.removeEventListener!='undefined'){
		obj.removeEventListener(type,fn,false);
	}else {
		var es=obj.events[type];
		for(var i in es){
			if(es[i]==fn){
				delete obj.events[type][i];
			}
		}
	}
}

// 标准化event
	addEvent.fixEvent=function(event){
		event.target=event.srcElement;
		event.preventDefault=addEvent.fixEvent.preventDefault;
		event.stopPropagation=addEvent.fixEvent.stopPropagation;
		return event;
	}
// 阻住默认行为
addEvent.fixEvent.preventDefault=function(){
	return this.Value=false;
};
// 冒泡处理
addEvent.fixEvent.stopPropagation=function(){
	this.cancelBubble=true;
}
获取目标点
// addEvent.fixEvent=function(event){
// 	event.target=event.srcElement;
// 	return event;
// }
// 去除两边的空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
// 空DIV阻止默认行为
// if (trim(this.innerHTML).length==0) {e.preventDefault();};
// 表单项无法拖拽
// if(e.target.tagName=='log'){
// 	addEvent(document,'mousemove',move);
// 	addEvent(document,'mouseup',up);
// }else{
// 	removeEvent(document,'mouseover',move);
// 	removeEvent(document,'mouseup',up);
// }
// 锁屏后防止，通过其他渠道拖拉页面滚动条
addEvent(window,'scroll',function(){
	document.documentElement.scrollTop=0;
	document.body.scrollTop=0;
});
























