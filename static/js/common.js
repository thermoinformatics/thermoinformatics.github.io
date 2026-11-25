!function(){	// limit scope
	$(function(){
		var $window = $(window),
		breakPoint = 767, //ブレイクポイントの設定
		wid = $window.width(),
		resizeTimer = false;


//////////////////////////////////////////////
//
//   function - parts
//
//////////////////////////////////////////////

/* change Img
*********************************************/
function changeImgSp(){
	$('.change-img').each(function(){
		$(this).attr("src",$(this).attr("src").replace(/_pc\./, '_sp.'));
	});
}
function changeImgPc(){
	$('.change-img').each(function(){
		$(this).attr("src",$(this).attr("src").replace(/_sp\./, '_pc.'));
	});
}

/* DON'T SCROLL
*********************************************/
// spメニューorコンテンツメニューが開いている間はスクロールしない
var scrollBlockerFlag,
		scrollpos;
function scrollBlocker(flag){
	if(flag){
		scrollpos = $(window).scrollTop();
		$('.l-body').addClass('is-fixed').css({'top': -scrollpos});
		scrollBlockerFlag = true;
	} else {
		$('.l-body').removeClass('is-fixed').removeAttr('style');
		window.scrollTo( 0 , scrollpos );
		scrollBlockerFlag = false;
	}
}

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function の追加スペース
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


//////////////////////////////////////////////
//
//   Common - PC / SP
//
//////////////////////////////////////////////

/* object fit
*********************************************/
objectFitImages();

/* position sticky
*********************************************/
var elem = document.querySelectorAll('.js-sticky-sidebar');
Stickyfill.add(elem);

/* smooth scroll
*********************************************/
$('.anchor').click(function(){
	var speed = 400;
	var href= $(this).attr("href");
	var target = $(href == "#" || href == "" ? 'html' : href);
	var position = target.offset().top;
	$("html, body").animate({scrollTop:position}, speed, "swing");
	return false;
});


/* ナビゲーション
*********************************************/
var trigger = $('.menu-btn');
trigger.click(function() {
	$('.l-body').toggleClass('is-menu-open');
	if($('.l-body').hasClass('is-fixed')) {
		scrollBlocker(false);
	} else {
		scrollBlocker(true);
	}
	return false;
});
//リンク押したら解除
$('.header a').click(function() {
	$('.l-body').removeClass('is-menu-open');
	scrollBlocker(false);
});

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
PCとSPで共通のものの追加スペース
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


/* .card hover
*********************************************/
$('.card__image,.card__title').hover(function() {
	$(this).parents('.card').addClass('is-hover');
}, function() {
	$(this).parents('.card').removeClass('is-hover');
});





/* フッター PIXI
*********************************************/

// var urlDomein = $(location).attr('search');
var siteImg = window.SITE_IMG || '/img/';

wid = $window.width();
if(wid <= breakPoint){
	//SP設定
	var canvasWidth = 768;
	var canvasHeight = 849;
	var ropeLength01 = 200; //ロープの長さ
	var ropeLength02 = 80; //ロープの長さ

}else if(wid > breakPoint){
	//PC設定
	var canvasWidth = 2000;
	var canvasHeight = 909;
	var ropeLength01 = 160; //ロープの長さ（右のオブジェクト）
	var ropeLength02 = 80; //ロープの長さ（左のオブジェクト）
}

var app = new PIXI.Application(canvasWidth,canvasHeight,{backgroundColor:0x052c5d});
var count01 = 0;
var count02 = 0;
var points01 = [];
var points02 = [];

document.getElementById('footer-deco').appendChild(app.view);

// strip01（右のオブジェクト）
for(var i = 0; i < 10; i++){
	points01.push(new PIXI.Point(i * ropeLength01,0));
}
var strip01 = new PIXI.mesh.Rope(PIXI.Texture.fromImage(siteImg + 'deco_footer_01.png'),points01);
if(wid <= breakPoint){
	//SP設定
	strip01.x = -100;
	strip01.y = 400;
}else if(wid > breakPoint){
	//PC設定
	strip01.x = 600;
	strip01.y = 400;
}
app.stage.addChild(strip01);
app.ticker.add(function(){
	count01 += .02;
	for(var i = 0; i < points01.length; i++){
		points01[i].y = Math.sin((i * .9) + count01) * 25;
		points01[i].x = i * ropeLength01 + Math.cos((i * 0.3) + count01) * 25;
	}
});


//strip02（左のオブジェクト）
for(var i = 0; i < 10; i++){
	points02.push(new PIXI.Point(i * ropeLength02,0));
}
var strip02 = new PIXI.mesh.Rope(PIXI.Texture.fromImage(siteImg + 'deco_footer_02.png'),points02);
if(wid <= breakPoint){
	//SP設定
	strip02.x = -1000;
	strip02.y = 500;
}else if(wid > breakPoint){
	//PC設定
	strip02.x = 0;
	strip02.y = 500;
}
app.stage.addChild(strip02);
app.ticker.add(function(){
	count02 += .02;
	for(var i = 0; i < points02.length; i++){
		points02[i].y = Math.sin((i * .8) + count02) * 13;
		points02[i].x = i * ropeLength02 + Math.cos((i * 0.3) + count02) * 13;
	}
});




//////////////////////////////////////////////
//
//   Only Pc Size Processing
//
function pcSizeOnly(){
//////////////////////////////////////////////
changeImgPc();

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
PCの時のみ実行するものの追加スペース
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/

/* PC メニュー解除
*********************************************/
if ($('.l-body').hasClass('is-menu-open')) {
	scrollBlocker(false);
	$('.l-body').removeClass('is-menu-open');
}


//////////////////////////////////////////////
}
//   Only Sp Size Processing
//
function spSizeOnly(){
//////////////////////////////////////////////
changeImgSp();

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
SPの時のみ実行するものの追加スペース
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


//////////////////////////////////////////////
}
//   Break Point & Window Resize
//
//////////////////////////////////////////////
		function descriminateBp(){
			wid = $window.width();
			if(wid <= breakPoint){
				spSizeOnly();
			}else if(wid > breakPoint){
				pcSizeOnly();
			}
		}
		descriminateBp();
		$window.resize(function() {
			if(wid > $window.width() || wid < $window.width()){
				if (resizeTimer !== false) {
					clearTimeout(resizeTimer);
				}
				resizeTimer = setTimeout(descriminateBp, 200);
			}
		});
	});
}();

//////////////////////////////////////////////
//
//	LOAD
//
//////////////////////////////////////////////
$(window).on('load',function(){

	/* Loading
	*********************************************/


});
