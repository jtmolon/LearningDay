(function() {jQuery.fn['bounds'] = function () {
		var bounds = {
					left: Number.POSITIVE_INFINITY,
		top: Number.POSITIVE_INFINITY,
		right: Number.NEGATIVE_INFINITY,
		bottom: Number.NEGATIVE_INFINITY,
		width: Number.NaN,
		height: Number.NaN
		};

			this.each(function (i,el) {
						var elQ = $(el);
								var off = elQ.offset();
										off.right = off.left + $(elQ).width();
												off.bottom = off.top + $(elQ).height();

														if (off.left < bounds.left)
						bounds.left = off.left;

					if (off.top < bounds.top)
						bounds.top = off.top;

					if (off.right > bounds.right)
						bounds.right = off.right;

					if (off.bottom > bounds.bottom)
						bounds.bottom = off.bottom;
				});

				bounds.width = bounds.right - bounds.left;
					bounds.height = bounds.bottom - bounds.top;
						return bounds;
}})();

var menuCenter = {top:0, left:0};
var isMenuOpen = false;

$(document).ready(function(){
	$(document).click(requestMenu);
	canvas = document.getElementById("over");
	//$(canvas).width($(document).outerWidth());	 
	//$(canvas).height($(document).outerHeight());	 

	$(document).mousemove(drawLine);
});

function requestMenu(e){
	if(isMenuOpen){
		closeMenu(e);
		return;
	}
	props = {top:e.pageY , left: e.pageX };
	menuCenter = props;
	$("#menu_container").show().animate(props, 200,openMenu);
}

function closeMenu(e){
	isMenuOpen = false;
	$("#menu_container div").each(function(){
		props = {top:0, left: 0};
		$(this).animate(props, 200, function(){
			$(this).css("display","none");
		});
	});
}

function openMenu(e){
	isMenuOpen = true;
	$("#menu_container div").css("display", "block");
	wid = $("#menu_container div").width();
	hei = $("#menu_container div").height();
	wid *= 1.5;
	hei *= 1.5;

	size = $("#menu_container div").length;
	i = 0;
	$("#menu_container div").each(function(){
		j = 1.0 - ((size-i) / (size));
		j *= (Math.PI*2);

		props = {top: Math.sin(j) * hei, left: Math.cos(j) * wid}

		$(this).animate(props, 200);	
		i++;
	});
}

function drawLine(e){
	if(!isMenuOpen){
		$("#line").css("display", "none");
		return;
	}
	$("#line").css("display", "block");
	r = 180+Math.atan2(menuCenter.top-(e.pageY-32), menuCenter.left-(e.pageX-32))*(180/Math.PI);
	w = Math.sqrt( Math.pow(menuCenter.top-(e.pageY-32) , 2)+Math.pow(menuCenter.left-(e.pageX-32), 2)  );
	w = Math.max(32, Math.min(128, w));
	$("#line").css("width", w);
	$("#line").css({"-moz-transform" : "rotate("+r+"deg)", "-webkit-transform" : "rotate("+r+"deg)"});
	$("#line").css("top", menuCenter.top + 32);	
	$("#line").css("left", menuCenter.left + 32);
}
