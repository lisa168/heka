$(function (){
	$('.inputArea').on('click',function (){
		$(this).find('span').hide();
		$(this).children('.inputCommon').focus();
	});
	$('.inputCommon').on('blur',function (){
		if($(this).val()==''){
			$(this).parent().find('span').show();
		}
	});
	if(window.location.hash==''){
		window.location.hash="#0";
	}
	is_weixin();
	//关闭微信层
	$('.weixinfcbox').click(function(){
	    $('.weixinfcbox').css('display','none');
	});
	weixin();
	window.onresize=weixin;
	// 获取验证码
	$('.sryzm .yzm').off('click').on('click',function (){
		var telVal=$('.inputtxt .telephone').val().replace(/^\s+|\s+$/g);
		if($('.inputtxt .telephone').val()==''||!(/^1[3|4|5|8]\d{9}$/.test(telVal)))return;
		var _this=$(this);
		$(this).html('60秒后重新获取');
		$(this).addClass('active');
		var time=60;
		var timer=setInterval(function (){
			time--;
			_this.html(time+'秒后重新获取');
			if(time==0){
				clearInterval(timer);
				_this.removeClass('active');
				_this.html('重新获取验证码');
			}
		},1000);
	});
	// 控制祝福语字数
	$('.greet .textarea').off('keyup').on('keyup',function (){
		var len=$(this).val().length;
		if(len<=500){
			$('.controlSize strong').html(500-len);
		}else{
			$(this).val($(this).val().substring(0,500));
			$('.controlSize strong').html(0);
		}
		
	});
	iphoneOrother();
	//判断是苹果还是安卓和加载完顶部下载图片显示
	function iphoneOrother(){
		var ua=navigator.userAgent.toLowerCase();
		if(ua.indexOf('iphone') > -1 || ua.indexOf('mac') > -1){
			$('.xzfdtopbigboxa').attr('href',$('.xzfdtopbigboxa').attr('yyiphone'));
		}else{
			$('.xzfdtopbigboxa').attr('href',$('.xzfdtopbigboxa').attr('yyandroid'));
		}
	};
	
	function weixin(){
		var w=$(window).width();
		if(w<320){
			$('.weixinfcbox .weixinfctext').width(280*w/320);
		}else{
			$('.weixinfcbox .weixinfctext').width(280);
		}
	}
	//判断是否微信
	function is_weixin(){
	    var ua = navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i)=="micromessenger") {
	        if(window.location.hash.indexOf("a=1") > 0 ){
	            window.location.href = window.location.href.substring(0,window.location.href.length-4);
	            location.reload();
	        }else{
	        	$('.xzfdtopbigboxa').click(function(){
		            window.location.href = window.location.href+'?a=1'; 
		        });
	        };
	        $('.xzfdtopbigboxa').click(function(){
	            $('.weixinfcbox').css('display','block');
	        });
	    } else {
	        if(window.location.hash.indexOf("a=1") > 0 ){
	            if($('.xzfdtopbigboxa').attr('href')!=$('.xzfdtopbigboxa').attr('yyiphone')){
					window.location.href=$('.xzfdtopbigboxa').attr('href');
				};
	            $('.loading').css('display','none');
	            setTimeout(function(){
	                window.location.href = window.location.href.substring(0,window.location.href.length-4);
	                location.reload();
	            },3000);
	        };
	    };
	}
});