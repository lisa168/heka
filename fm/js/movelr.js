var aPages=$('.page'),
    ind = $('.page').length,
	w = $(window).width(),
	musicao = document.getElementsByClassName('musicaudio')[0],
	musicbtn = document.getElementsByClassName('musicbtn')[0],
	u = navigator.userAgent,
	timer1,
	hashal,
	speed=80,
	speedtop =$('.overflowdiv').scrollTop(),
	touchBox = document.getElementsByClassName('page'),
	aPage = $('.page'),
	pagemove=true,
	opatm =0,
	isMeiZu = u.indexOf('; zh-cn; M')>-1,
	opatmfn,
	openhk;
	$(window).load(function(){
		$('.nrtextbigbox .midtextbox').height($('.nrtextbigbox .pupdiv').height());
		//文字居中
		$('.fm_textbigbox .pupdiv h3').css('margin-left',-($('.pupdiv h3').width())/2);
	});
	openhk=setTimeout(function(){fnNext()},5000)
	
	opatmj();
	function opatmj(){
		clearInterval(opatmfn);
		opatmfn = setInterval(function(){	
			opatm+=2;
			if(opatm>10){
				opatm=10;
				clearInterval(opatmfn);
				opatmz();
				return;
			};
			$('.hbbtn span').css('opacity',opatm/10);
			$('.dxbtn span').css('opacity',opatm/10+0.3);
		},100);
	};
	function opatmz(){
		clearInterval(opatmfn);
		opatmfn = setInterval(function(){	
			opatm-=2;
			if(opatm<0){
				opatm=0;
				clearInterval(opatmfn);
				opatmj();
				return;
			};
			$('.hbbtn span').css('opacity',opatm/10);
			$('.dxbtn span').css('opacity',opatm/10-0.3);
		},100);
	};
		
$('.syright').html($('.syleft').html());
// 左右滑动效果
	var myswipe=Swipe($('#pages')[0], {
		continuous:false,
		disableScroll:false,
		stopPropation:true,
		callback:function(index,element){
			cleartimeout(openhk);
			aPages.removeClass('active');
			aPages.eq(index).addClass('active');
		}
	});
function fnScale(){
	ws = $(window).width()/320.0;
	hs = $(window).height()/548.0;
	//if( ws - hs > 1 ) ws = hs;
	$('.pageImg').each(function() {
        $(this).css( { scale : hs < ws ? ws : hs } );
    });	
	//定页面内容区域的大小，高或者宽比例缩小时都会影响宽的大小
	$('.pagecontent').each(function() {
       	$(this).css( { scale : hs > ws ? ws : hs });
    });
	$('.pagecontent').each(function(){
		var n=hs>ws?ws:hs;
		$('.pagecontent').css({ 'width':(320*ws/n-320)+320+'px'});
		$('.pagecontent').css({ 'margin-left':-((320*ws/n-320)/2)-160+'px'});
		$('.overflowbox').css({ 'margin-top':-(548*hs/n-548)/2+'px'});
		$('.fmbottom').css({ 'margin-bottom':-(548*hs/n-548)/2+'px'});
	});
};
//当改变窗口大小时
fnScale();
window.onresize = function(){
	fnScale();
};
$('.box').css('height','100%');

//背景音乐
$(document).bind('touchend' , function (event){
	if(musicao){
		musicao.play();
	}else{
		return;	
	};
	if(!isMeiZu){
		$('.musicbtn').removeClass('musicStop').addClass('musicBounce');
	};
	$(document).unbind('touchend');
	event.preventDefault();
});
if(musicbtn){
	musicbtn.onclick= function(event){
		if( musicao.paused){
			musicao.play();	
			if(!isMeiZu){
				$('.musicbtn').removeClass('musicStop').addClass('musicBounce');
			}else{
				$('.musicbtn').removeClass('musicStoping').addClass('musicPlaying');
			}
		}else{
			musicao.pause();
			if(!isMeiZu){
				$('.musicbtn').removeClass('musicBounce').addClass('musicStop');
			}else{
				$('.musicbtn').removeClass('musicPlaying').addClass('musicStoping');
			}
		};
	};	
};
