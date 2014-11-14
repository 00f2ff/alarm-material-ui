$(function() {
	var days_of_the_week = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'],
			past_18 = 0;
	$('.arrow-left img').click(function() {
		// callback
		changeDate(-1);
	});
	$('.arrow-right img').click(function() {
		changeDate(1);
	});

	function changeDate(i) {
		// upper / lower bounds
		if (18+past_18+i >= 1 && 18+past_18+i <= 31) {
			past_18 += i;
		}
		var index;
		if (past_18 >= 0) {
			// wrap forward
			index = past_18 % 7;
		}
		if (past_18 < 0) {
			// wrap backward
			if (-past_18 % 7 == 0) {
				index = 0;
			}
			else {
				index = 7 - (-past_18 % 7);
			}
		}
		$('#day').html(18+past_18);
		$('.daybar').html(days_of_the_week[index]);
	}

	// CSS change handler for turning alarms on and off
	$('.slider-ball').click(function() {
		// find a-time and img
		var atime = $(this).parent().parent().find('.a-time');
		var img = $(this).parent().parent().parent().find('img')

		// remove existing class
		if ($(this).hasClass('alarm-on')) {
			$(this).removeClass('alarm-on');
			// animation and color
			$(this).addClass('alarm-off')
				.removeClass('bfill-active')
				.addClass('bfill-inactive');
			// make text active and change icon
			atime.removeClass('gtext-active')
				.addClass('text-inactive');
			img.attr('src','images/ic_notifications_none_grey600_18dp.png');
		}
		else if ($(this).hasClass('alarm-off')) {
			$(this).removeClass('alarm-off');
			// animation and color
			$(this).addClass('alarm-on')
				.removeClass('bfill-inactive')
				.addClass('bfill-active');
			// make text active and change icon
			atime.removeClass('text-inactive')
				.addClass('gtext-active');
			img.attr('src','images/ic_notifications_grey600_18dp.png');
		}
	});

	// handler for activating and deactivating alarm days
	$('.a-days span').click(function() {
		if ($(this).hasClass('btext-active')) {
			$(this).removeClass('btext-active')
				.addClass('text-inactive');
		}
		else if ($(this).hasClass('text-inactive')) {
			$(this).removeClass('text-inactive')
				.addClass('btext-active');
		}
	});

	// handler for arrow click fill
	$(".arrow").click(function(e){
		rippler(e, $('#background'), 'hsl(180, 40%, 80%)');
	});

	// handler for button click fill
	$('#floating-button').click(function(e) {
		rippler(e, $(this), 'white');
	});

	// this code is a modified version of http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design
	function rippler(e, parent, color) {
		var parent, ink, d, x, y;
		//create .ink element if it doesn't exist
		if(parent.find(".ink").length == 0) {
			parent.prepend("<span class='ink'></span>");
		}	
		ink = parent.find(".ink");
		//incase of quick double clicks stop the previous animation
		ink.removeClass("animate");

		// set color of .ink
		ink.css({background: color});
		
		//set size of .ink
		if(!ink.height() && !ink.width())
		{
			//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
			d = Math.max(parent.outerWidth(), parent.outerHeight());
			ink.css({height: d, width: d});
		}
		
		//get click coordinates
		// page click coordinates - how different background is from normal - half of ink dimensions (aka center of ink)
		x = e.pageX - parent.offset().left - ink.width()/2;
		y = e.pageY - parent.offset().top - ink.height()/2;

		//set the position and add class .animate
		ink.css({top: y+'px', left: x+'px'}).addClass("animate");
	}

})



