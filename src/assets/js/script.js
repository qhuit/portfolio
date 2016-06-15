$(function() {

    $(window).scroll();

    //smooth scrolling between anchors
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    // parralax effect with data-scrollspeed
    $.fn.moveIt = function(){
        var $window = $(window);
        var $scrollHeight = $window.height();
        var instances = [];

        $(this).each(function(){
            instances.push(new moveItItem($(this)));
        });

        window.onscroll = function(){
            var scrollTop = $window.scrollTop();
            instances.forEach(function(inst){
                inst.update(scrollTop);
            });
            var devTop = $('development-demos').offset().top;
            var portraitTop = $('#myself').offset().top;
            if(scrollTop >= devTop-80){
                $('app-header').addClass('black');
            } else {
                $('app-header').removeClass('black');
            };
            if(scrollTop >= portraitTop - 150) {
                $('.scrollable').addClass('animated');
            } else {
                $('.scrollable').removeClass('animated');
            }

        }
    }

    var moveItItem = function(el){
        this.el = $(el);
        this.speed = parseInt(this.el.attr('data-scroll-speed'));
    };

    moveItItem.prototype.update = function(scrollTop){
        var pos = scrollTop / this.speed;
        this.el.css('transform', 'translateY(' + -pos + 'px)');
    };
    $('[data-scroll-speed]').moveIt();


});