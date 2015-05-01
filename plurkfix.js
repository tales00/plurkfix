// 判斷網域正確之後，會有一段動態載入 jQuery 的程式碼
// 其實 plurk 應該是有使用 jQuery 所以這可能是多餘的動作，不過總之我還是加上去了。
// 這段動態載入 jQuery 的程式碼參考引用自 http://benalman.com/projects/run-jquery-code-bookmarklet/ 

// 判斷網址然後存在 _d 裡頭
_d = location.href.match( /plurk\.com\/(m\/)?p\/[\w\d_]+/i );

if ( _d !== null ) {
/* 如果網域正確則執行 */

(function(e,a,g,h,f,c,b,d){if(!(f=e.jQuery)||g>f.fn.jquery||h(f)){c=a.createElement("script");c.type="text/javascript";c.src="http://ajax.googleapis.com/ajax/libs/jquery/"+g+"/jquery.min.js";c.onload=c.onreadystatechange=function(){if(!b&&(!(d=this.readyState)||d=="loaded"||d=="complete")){h((f=e.jQuery).noConflict(1),b=1);f(c).remove()}};a.head.appendChild(c)}})(window,document,"1.11.1",function($,L){

/* my code start from here */

	console.log('plurk-fix loaded');

	var $thisfeed 	= $('#permanent_plurk, .contents'), 	// 抓出每一篇噗文（含首噗）
															// 抓出噗文中引用其他使用者的連結標籤
		$userlink 	= $thisfeed.find('a.ex_link[href^="http://www.plurk.com/"]:not(.nick)'),
		uniqueFlag  = []; 									// 旗標

	// 把圖檔的連結載入為縮圖
	// 僅在行動版執行
	if( _d[1] == 'm/' ) {
		$thisfeed
			.find('.bigplurk')
				.find('a[href$=".jpg"],a[href$=".png"],a[href$=".gif"]')
					.each(function() {
						$thisIMGlink = $(this);
						$thisIMGlink.html( $('<img>').attr( 'src', $thisIMGlink.attr('href') ) );
					});
	};

	// 把帳號連結替換使用者顯示的名稱
	$thisfeed
		.find('a.nick, a.user-nick')
			.each(function() {
				var $thisNick = $(this),
					thisName = $thisNick.text();
					
				if (uniqueFlag.indexOf(thisName) == -1) {
					uniqueFlag.push(thisName);
					userUrl = $thisNick.attr('href').match(/\/(?:m\/u\/)?([\w\d_]+)/i)[1];
					$userlink.filter('[href$="' + userUrl + '"]').text(thisName);
				}
			});
	
	// 把連結變成開在新視窗
	$thisfeed.find('a').attr('target', '_blank');

/* end of my code*/

});

/* 如果網域正確則執行 */
}
