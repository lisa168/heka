$(function (){
	var speed=35;
	var speedtop =$('.overflowdiv').scrollTop();
	var touchBox = document.getElementsByClassName('overflowdiv');
	$('.pno2').html($('.pno1').html());
	function Marquee(){ 
		if($('.pno2').offset().top-$('.overflowdiv').scrollTop()<=0) {
			speedtop-=$('.pno1').height();
			$('.overflowdiv').scrollTop(speedtop);
		}else{ 
			speedtop++;
		  	$('.overflowdiv').scrollTop(speedtop);
		}; 
	} ;
	var MyMar=setInterval(Marquee,speed); 
	if($('.pno1').height()<=160){
		clearInterval(MyMar);
		$('.pno2').hide();
	}
	else{
		MyMar=setInterval(Marquee,speed); 
		$('.pno2').show();
	}
	//模板随手指移动;
	if(touchBox){
		for(var lunum=0;lunum<touchBox.length;lunum++){
			touchBox[lunum].addEventListener("touchstart", touchStart, false);
		};
	};
	function touchStart(event){
		clearInterval(MyMar);
		that = this;
		event.stopPropagation();
	 	var touch = event.touches[0];
	 	bBtn = true;
	 	downTime = Date.now();
	 	downY = touch.pageY;
	 	downTop = $('.overflowdiv').scrollTop();
		that.addEventListener("touchmove", touchMove, false);
	};
	function touchMove(event){
		var touch = event.touches[0];
		
		$('.overflowdiv').scrollTop(downY - touch.pageY + downTop);
		speedtop=$('.overflowdiv').scrollTop();
		that.addEventListener("touchend", touchEnd, false);
	}
	function touchEnd(event){
		var touchs = event.changedTouches[0];
		MyMar=setInterval(Marquee,speed)
		this.ontouchmove = null;
		this.ontouchend = null;
	}
});