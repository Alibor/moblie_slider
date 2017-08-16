/*
 移动端轮播，支持手势滑动，支持自动播放，基于zepto实现
 @Alibor
*/
;function slider(e,n,o){
  var autoTime = o.autoTime || 5000;
  var activeClass = o.activeClass || "active";
  var parentClass = o.parentClass || "carousel";
  var height = o.height || 200;
  var length;
  var i = 0;
  var scWidth = window.screen.availWidth;
// 初始化页面样式
function _init(ele,nav){
	length = $(ele).find("img").length;
	for(var i=0;i<length;i++){
		var li = "<li style='float: left;display: block;margin: 0 5px;width: 6px;height: 6px;border-radius: 50%;background: #999;opacity: 0.5;'></li>"
		$(nav).append(li);
  };
  $('body').css({"margin":0,"padding":0});
  $(nav).css({"position":"absolute"});
  var nav_width = $(nav).width();
  $(nav).css({'left': "50%","margin-left": -(nav_width / 2) + "px","bottom": "10px"});
  $(nav).find("li").first().addClass(activeClass);
  $(nav).find("li").first().css({"background-color":"#fff !important","opacity":"1 !important"});
  $("."+parentClass).css({"height":height+"px","overflow":"hidden","position":"relative","width":"100%"});
	$(ele).css("width",length*100+"%");
  $(ele).find("img").parent().css("width",1/length*100+"%");
  $(ele).css({"height":"100%","position":"absolute","top":0,"left":0});
  $(ele).find("a").css({"display":"block","float":"left","height":"100%"});
  $(ele).find("a img").css({"width":"100%","height":"100%","display":"block","float":"left"});    
};
_init(e,n);

 $(nav).find("li").each(function(index,ele){
   if($(this).hasClass(activeClass)){
     $(this).css({"background-color":"#fff !important","opacity":"1 !important"})
   }else{
     $(this).css({"background-color":"#999 !important","opacity":"0.5 !important"})
   }
 })

function _btnControl(ele,nav){
	$(nav).find("li").each(function(){
		$(this).on("tap",function(){
		$(this).addClass(activeClass);
	    $(this).siblings().removeClass(activeClass);
	    var index = $(this).index();
	    i = index;
	    var now_width = scwidth * -i;
	    $(ele).animate({
        'left': now_width + "px"
        },500);
	    })
    })
};
_btnControl(e,n);

function Move(ele,nav){
  this.moveNext=function (){
    i++;
    if (i > length - 1) {
    i = 0;
  }
  var now_width = scWidth * -i;
  $(nav).find("li").eq(i).addClass(activeClass).siblings().removeClass(activeClass);
  $(ele).animate({
    'left': now_width + "px"
  },
  500);
  $(nav).find("li").each(function(index,ele){
   if($(this).hasClass(activeClass)){
     $(this).css({"background-color":"#fff !important","opacity":"1 !important"})
   }else{
     $(this).css({"background-color":"#999 !important","opacity":"0.5 !important"})
   }
  })
  },
  this.movePrev=function (){
  i--;
  if (i < 0) {
    i = length - 1;
  }
  var now_width = scWidth * -i;
  $(nav).find("li").eq(i).addClass(activeClass).siblings().removeClass(activeClass);
  $(ele).animate({
    'left': now_width + "px"
  },
  500);
  $(nav).find("li").each(function(index,ele){
   if($(this).hasClass(activeClass)){
     $(this).css({"background-color":"#fff !important","opacity":"1 !important"})
   }else{
     $(this).css({"background-color":"#999 !important","opacity":"0.5 !important"})
   }
  })
  }
};   
var move = new Move(e,n);
function moveHandler(ele){
  // 手势控制轮播
  $(ele).on('touchstart', touchSatrtFunc);
  $(ele).on('touchmove', touchMoveFunc);
  $(ele).on('touchend', touchEndFunc);
  // touchstart事件
  function touchSatrtFunc(evt) {
    try {
      var touch = evt.targetTouches[0];
      var x = Number(touch.pageX);
      var y = Number(touch.pageY);
      startX = x;
      startY = y;
    } catch(e) {
      console.log('touchSatrtFunc：' + e.message);
    }
    $(ele).on('touchmove', touchMoveFunc);
  }
  // touchmove事件
  function touchMoveFunc(evt) {
    try {
      var touch = evt.targetTouches[0];
      var x = Number(touch.pageX);
      var y = Number(touch.pageY);
      //判断滑动方向
      if (x - startX > 80) {
        move.movePrev();
        $(ele).off('touchmove', touchMoveFunc);
      } else if (x - startX < -80) {
        move.moveNext();
        $(ele).off('touchmove', touchMoveFunc);
      }
    } catch(e) {
      console.log('touchMoveFunc：' + e.message);
    }
  }
  // touchend事件
  function touchEndFunc(evt) {
    try {
    } catch (e) {
        console.log('touchEndFunc：' + e.message);
    }
  };
}
        
moveHandler(e);
if(autoTime == 0){
}else{
  var t = setInterval(move.moveNext,autoTime);
}
}
