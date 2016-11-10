// 前台调用
var $=function  () {
	return new Base();
}
// 基础库
function Base () {
	this.elements=[]
};
	// 初始化
	Base.prototype.ready=function(fn){
		addDomLoaded(fn);
	};
	// 创建数组来保存获取的节点和节点数组
	Base.prototype.elements=[];
	// 获取节点的操作写在构造函数里面
	Base.prototype.getId=function(id){
		// return document.getElementById(id);
		// 必须要返回this才行所以我们可以创建一个数组
		this.elements.push(document.getElementById(id));
		return this;
	};
	Base.prototype.getTag=function  (tag) {
		var tags=document.getElementsByTagName(tag);
		for (var i = 0; i < tags.length; i++) {
			this.elements.push(tags[i]);
		};
		return this;
	}
	Base.prototype.getName=function  (Name) {
		this.elements.push(document.getElementsByName(Name));
		return this;
	}
	Base.prototype.getClass=function  (className,idName) {
		var node=null;
		if (arguments.length==2) {
				node=document.getElementById(idName);
			}else{
				node=document;
			}
		var all=node.getElementsByTagName('*');
		for (var i = 0; i < all.length; i++) {
			if(all[i].className==className){
				this.elements.push(all[i]);
			}
		};
		return this;
	}
	// 获取某个节点并返回Base对象
	Base.prototype.eq=function  (num) {
		var element=this.elements[num];
		this.elements=[];
		this.elements[0]=element;
		return this;
	}
	// 获取某个节点并返回节点对象
	Base.prototype.ge=function  (num) {
		return this.elements[num];
	}
	// 获得首个节点，并返回这个节点对象
	Base.prototype.first=function  () {
		return this.elements[0];
	}
	// 获得最后一个节点，并返回这个节点对象
	Base.prototype.last=function  () {
	return this.elements[this.elements.length-1];
	}	
	// 添加class
	Base.prototype.addClass=function(className){
		for (var i = 0; i < this.elements.length; i++) {
			if(!hasClass(this.elements[i],className))
			this.elements[i].className+=' '+className;
		};
		return this;
	}
	// 移除class
	Base.prototype.removeClass=function(className){
		for (var i = 0; i < this.elements.length; i++) {
			if(hasClass(this.elements[i],className))
			this.elements[i].className+=this.elements[i].className.replace(new RegExp('(\\s|^)')+className+'(\\s|$)','');
		};
		return this;
	}

// 设置css
	Base.prototype.css=function  (attr,value) {
		for (var i = 0; i < this.elements.length; i++) {
			if (arguments.length==1) {
			getStyle(this.elements[i],attr);
		}
		else{
		this.elements[i].style[attr]=value;
			}
		}
		return this;
	}
	// 设置link或者style中的css规则
	// insertSheet(body{'background'},0)
	Base.prototype.addRule=function(num,selectorText,cssText,position){
		var sheet=document.styleSheets[num];
		insertRule(sheet,selectorText,cssText,position)
		return this;
	}
	// 移除link或者sytle中的css规则
	Base.prototype.removeRule=function  (num,index) {
		var sheet=document.styleSheets[num];
		
		return this;
	}
// 设置innerHTML
	Base.prototype.html=function  (str) {
		for (var i = 0; i < this.elements.length; i++) {
			if (arguments.length==0) {
			return this.elements[i].innerHTML;
		}else{
			this.elements[i].innerHTML=str;
			}
		}
		return this;
	}
// 调用点击事件
	Base.prototype.click=function  (fn) {
	for (var i = 0; i < this.elements.length; i++) {
		// this.elements[i].onclick=fn;
		addEvent(this.elements[i],'click',fn);
	}
	return this;
	}
// hover事件
	Base.prototype.hover=function(over,out){
		for (var i = 0; i < this.elements.length; i++) {
			// this.elements[i].onmouseover=over;
			// this.elements[i].onmouseout=out;
			addEvent(this.elements[i],'mouseover',over);
			addEvent(this.elements[i],'mouseout',out);
		};
		return this;
	};
// 显示
	Base.prototype.show=function(){
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display='block';
		};
		return this;
	}
// 隐藏
	Base.prototype.hide=function(){
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display='none';
		};
		return this;
	}
// 页面居中
	Base.prototype.center=function(width,height){
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.top=((document.documentElement.clientHeight-height)/2)+'px';
			this.elements[i].style.left=((document.documentElement.clientWidth-width)/2)+'px';
		};
		return this;
	}
// 改变页面大小
	Base.prototype.resize=function(fn){
		window.onresize	=fn;
		return this;	
	}
	Base.prototype.lock=function(){
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.width=getInner().width+'px';
			this.elements[i].style.height=getInner().height+'px';
			this.elements[i].style.display='block';
		};
	}

	Base.prototype.unlock=function(){
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display='none'
		};
	}
/*
	// 拖拽 没看懂
	Base.prototype.drag=function(){
		for (var i = 0; i < this.elements.length; i++) {
			addEvent(this.elements[i],'mousedown',function(e){
			// this.elements[i].onmousedown=function(e){
				e.preventDefault();
				// var e=getEvent(e);
				var _this=this;
				var diffX=e.clientX-_this.offsetLeft;
				var diffY=e.clientY-_this.offsetTop;
					// 鼠标锁住时触发（点击住）
				if(typeof _this.setCapture!='undefined'){
					_this.setCapture();
				}
				// document.onmousemove=function(e){
				addEvent(document,'mousemove',function(e){
					// var e=getEvent(e);
					var left=e.clientX-diffX;
					var top=e.clientY-diffY
					// 设置不得超过浏览器边缘
					if(left<0){
						left=0;
					}else if(left>getInner().width-_this.offsetWidth){
						left=getInner().width-_this.offsetWidth;
					}
					if(top<0){
						top=0
					}else if(top>getInner().height-_this.offsetheight){
						top=getInner().height-_this.offsetHeight;
					}
					_this.style.left=left+'px';
					_this.style.top=top+'px';

				});
				// 	document.onmouseup=function(){
				addEvent(document,'mouseup',function(){
						this.onmousemove=null;
						this.onmouseup=null;
					// 鼠标释放时触发（放开鼠标）
						if (typeof _this.releaseCapture!='undefined') {
							_this.releaseCapture();
						};
				});
			
			
			// 锁屏后防止，通过其他渠道拖拉页面滚动条		
			// addEvent(window,'scroll',function(){
			// 	document.documentElement.scrollTop=0;
			// 	document.body.scrollTop=0;
			});
		});
		return this;
	}
	}
		// function getEvent(event){
		// 	return event||window.event;
		// }
	// 阻止默认行为
		// function preDef(event){
		// var e=getEvent(event);
		// if(typeof e.preventDefault!='undefined'){
		// 	e.preventDefault();
		// }else{
		// 	e.returnValue=false;
		// }
		// }
		// 空DIV阻止默认行为
	// if (trim(this.innerHTML).length==0) {e.preventDefault();};
	// 表单项无法拖拽
	// if(e.target.tagName=='H2'){
	// 	addEvent(document,'mousemove',move);
	// 	addEvent(document,'mouseup',up);
	// }else{
	// 	removeEvent(document,'mouseover',move);
	// 	removeEvent(document,'mouseup',up);
	// }
	// 锁屏后防止，通过其他渠道拖拉页面滚动条
	// addEvent(window,'scroll',function(){
	// 	document.documentElement.scrollTop=0;
	// 	document.body.scrollTop=0;
	// });
*/


// 封装库--插件
	Base.prototype.extend=function(name,fn){
		Base.prototype[name]=fn;
	};

// 使用CSS选择器方式封装库，但是我感觉现在这个库我用着挺好的，先暂时不使用这个功能，要是用到再说

// 锁屏后防止，通过其他渠道拖拉页面滚动条
	addEvent(window,'scroll',function(){
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
	});













