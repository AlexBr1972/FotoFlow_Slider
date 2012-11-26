/*
 * FotoFlow Slider v1.0
 * http://www.alexbr.ru
 *
 * Copyright 2012, Alexey Broslavets
 * Распространяется бесплатно и подпадает под действие лицензии MIT.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function($){

var number_of_imgs;
var images_loaded=0;

var slideshow_timer;
var autorun;
var add_elem=1;
var shift_elem=0;
var round_fin= 0;
var elem_h;
var elem_w;
var elem_size;
var elem_type;
var container_id;
var scale;
var round;
var opac;
var dir;
var trans_k;
var slides_delay;
var show_timeline;
var show_nav;
var is_running;
var is_transition_end;
var current=1;
var images;
var flow_dir="forward";
var max_elem_delay=0;
var is_trans_supports;
var slides_w;
var slides_h;
var delay_rand;
var last_delay_el;

function init_elements(){

    switch (elem_size){
    case 'medium':
        elem_h=60;
        elem_w=60;
        break;
    case 'small':
        elem_h=40;
        elem_w=40;
        break;
    case 'large':
        elem_h=80;
        elem_w=80;
        break;
    default:
        elem_h=60;
        elem_w=60;
}

    switch (elem_type){
     case 'boxes':
         elem_h=elem_w;
        round_fin=0;
        add_elem=1;
        shift_elem=0;
        break;
     case 'bars':
        elem_h=slides_h;
        round_fin=0;
        add_elem=1;
        shift_elem=0;
        break;
    case 'circles':
        elem_h=elem_w;
        shift_elem=elem_h/2;
        round_fin=50;
        add_elem=2;
        break;
    case 'fullslide':
        elem_h=slides_h;
        elem_w=slides_w;
        round_fin=0;
        add_elem=0;
        shift_elem=0;
    default:
        elem_h=elem_w;
        round_fin=0;
        add_elem=1;
        shift_elem=0;
        }
}
function create_slide(curr_img){


    var curr_bg='url('+$(curr_img).attr('src')+')';
    var indx=$(curr_img).data('img_indx');
    var curr_Slide=$('<div id=slide_'+ indx +'></div>').css(
       {
           position: 'absolute',

           top: '0px',
           left: '0px',
           zIndex: number_of_imgs+1,
           display: 'block'

       });
       setTimeout(function(){
           max_elem_delay=0;
           create_elems(curr_Slide, round+'%', scale, opac, dir, 500, 75);
           $(curr_Slide).insertBefore($('#'+container_id).find('img').first());
           $(curr_Slide).find('span').css({'background-image': curr_bg});
            }, 500);
     }


function create_slide_no_trans(curr_img){


    var curr_bg=$(curr_img).attr('src');
    var indx=$(curr_img).data('img_indx');
    var curr_Slide=$('<div id=slide_'+ indx +'></div>').css(
       {
           position: 'absolute',
           top: '0px',
           left: '0px',
           zIndex: number_of_imgs+1,
           display: 'block'
       });
       setTimeout(function(){


           $('<img>',{
               src: curr_bg
           }).hide().appendTo(curr_Slide);
           $(curr_Slide).insertBefore($('#'+container_id ).children('img').first());
            }, 500);
     }


function create_elems(slide,  brd_radius, scale, opac, dir, trans_time, trans_delay){
    var x_count;
    var y_count;
    var elem_count;
    var curr_x;
    var curr_y;
    var curr_bg_pos;
    var transition_prop;
    var transition_prop_brd;
    var slide_id=$(slide).attr('id');
    var spans;
    var trans_delay_rand;
    
    

    if (scale<0){scale=0}
    if (scale>2){scale=2}

    if (trans_k<0) {trans_k=0}
    if (trans_k>3) {trans_k=3}

    if (elem_type=='fullslide'){trans_time=trans_time*trans_k};
    
    if (delay_rand){
        trans_delay_rand=100;
    } else {
        trans_delay_rand=0;
    }
    trans_delay=trans_delay*trans_k;
    init_elements();

    x_count=Math.floor(slides_w / elem_w) +add_elem;
    y_count=Math.floor(slides_h / elem_h) +add_elem;
    elem_count=x_count*y_count;




          for(i=1; i<=(elem_count); i++){
                curr_x_temp=((i-1)%(x_count));
                curr_x=curr_x_temp*elem_w ;
                curr_y_temp=(Math.floor((i-1)/x_count)%x_count);
                curr_y=curr_y_temp*elem_h ;
                curr_bg_pos=((curr_x*(-1))+shift_elem)+'px '+((curr_y*(-1))+shift_elem)+'px'

                switch(dir){
                    case 'random':
                        trans_delay_temp=Math.floor(Math.random()*500*trans_k+(trans_delay));
                        if (max_elem_delay<=trans_delay_temp){max_elem_delay=trans_delay_temp;last_delay_el=i-1;};

                        break;
                    case 'top':
                        trans_delay_temp=curr_y_temp*(trans_delay+(Math.random()*trans_delay_rand));
                        if (max_elem_delay<=trans_delay_temp){max_elem_delay=trans_delay_temp;last_delay_el=i-1;};
                        break;
                    case 'left':
                        trans_delay_temp=curr_x_temp*(trans_delay+(Math.random()*trans_delay_rand));
                        if (max_elem_delay<=trans_delay_temp){
                            max_elem_delay=trans_delay_temp;last_delay_el=i-1;};
                        break;
                    case 'left-top':
                        trans_delay_temp=Math.floor((((i-1)/x_count)%y_count))*trans_delay + curr_x_temp*(trans_delay+(Math.random()*trans_delay_rand));
                        if (max_elem_delay<=trans_delay_temp){max_elem_delay=trans_delay_temp;last_delay_el=i-1;};
                        break;
                    default:
                        trans_delay_temp=Math.floor((((i-1)/x_count)%y_count))*(trans_delay+(Math.random()*trans_delay_rand)) + curr_x_temp*(trans_delay+(Math.random()*trans_delay_rand));
                        if (max_elem_delay<=trans_delay_temp){max_elem_delay=trans_delay_temp;last_delay_el=i-1;};
                }


                transition_prop='all '+ trans_time + 'ms linear ' + trans_delay_temp +'ms';


         $('<span id="'+slide_id+'_elem_'+i+'"/>').css(
                  {position: 'absolute',
                   overflow: 'hidden',
                   backgroundRepeat: 'no-repeat',
                   display: 'inline-block',
                   padding: '0px',
                   margin: '0px',
                   height: elem_h +shift_elem,
                   width:  elem_w +shift_elem,
                   left:   curr_x -shift_elem ,
                   top:    curr_y -shift_elem,
                   backgroundSize: '810px 426px',
                   backgroundPosition: curr_bg_pos,
                   borderRadius: brd_radius || '0px',
                   'opacity': opac,
                   'transform': 'scale(+' +scale+ ')'


                   }).css({

                   'transition': transition_prop

                    }).appendTo(slide);

            }
            switch(dir){
                    case 'random':
                        trans_delay_temp=500+trans_delay;
             transition_prop='all '+ trans_time + 'ms linear ' + trans_delay_temp +'ms';

            $(slide).find('span:last').css({'transition': transition_prop});
            }
}

function stop_SlideShow(){
    $("#stop_ff_btn").css({zIndex: -10});

   if (is_trans_supports) {
    if (is_transition_end==true){
            $('div[id^="slide_"]').eq(1).find('span').eq(last_delay_el).unbind('transitionend oTransitionEnd webkitTransitionEnd msTransitionEnd mozTransitionEnd');
            clearTimeout(slideshow_timer);
            $('#timeline').css('animation', 'none');

    } else {

            $('div[id^="slide_"]').eq(1).find('span').eq(last_delay_el).bind('transitionend oTransitionEnd otransitionend webkitTransitionEnd msTransitionEnd mozTransitionEnd', function () {
            $('div[id^="slide_"]').eq(1).find('span').eq(last_delay_el).unbind('transitionend oTransitionEnd webkitTransitionEnd msTransitionEnd mozTransitionEnd');
            clearTimeout(slideshow_timer);
            $('#timeline').css('animation', 'none');
            is_transition_end=true;

        });
    }
   } else{
       clearTimeout(slideshow_timer);
       $('#timeline').stop().hide().css({width: '0%'});
   }
}

function run_SlideShow(next_Img){

    next_Img=next_Img % number_of_imgs;
    current=next_Img;

is_transition_end=false;
$('div[id^="slide_"]').eq(1).find('span').css({'opacity': 1, 'transform': 'scale(1.0)'}).css({'borderRadius': round_fin});

$('div[id^="slide_"]').eq(1).find('span').eq(last_delay_el).bind('transitionend oTransitionEnd otransitionend webkitTransitionEnd msTransitionEnd mozTransitionEnd', function () {
$('div[id^="slide_"]').eq(1).find('span').eq(last_delay_el).unbind('transitionend oTransitionEnd otransitionend webkitTransitionEnd msTransitionEnd mozTransitionEnd');
is_transition_end=true;

    setTimeout(function(){
        $('div[id^="slide_"]').eq(0).remove();

    },
        500);


$(images[0]).css({display: 'none'});

if (show_timeline==true && is_running==true){
$('#timeline').css({
                'animationDuration': slides_delay+'ms',
                'animationName': 'time_line_anim',
                'animationTimingFunction': 'ease',
                'animationIterationCount': 1,
                'animationPlayState': 'running'});

}

       create_slide(images[next_Img]);
     if (is_running==true){
       slideshow_timer=setTimeout(function(){
           run_SlideShow(++next_Img);
           $('#timeline').css('animation', 'none');
            }, slides_delay);
     }
});

}

function run_SlideShow_no_trans(next_Img){

    next_Img=next_Img % number_of_imgs;
    current=next_Img;



$('div[id^="slide_"]').eq(1).find('img').fadeIn(1000*trans_k, function(){
    is_transition_end=true;
    $('div[id^="slide_"]').eq(0).remove();
    $(images[0]).css({display: 'none'});


    if (show_timeline==true && is_running==true){
            $('#timeline').show().animate({width: '100%'}, (slides_delay-0), function(){$(this).css({width: '0%'})});

    }

       create_slide_no_trans(images[next_Img]);
     if (is_running==true){
       slideshow_timer=setTimeout(function(){
           run_SlideShow_no_trans(++next_Img);

            }, slides_delay);
     }

});

}


var methods = {
    init : function( params ) {
     	  var options = $.extend({}, $.fn.fotoflow.defaults, params);

container_id=options.container_id;
autorun=options.autorun;
slides_w=options.slides_w;
slides_h=options.slides_h;
scale=options.scale;
round=options.round;
opac=options.opac;
dir=options.dir;
trans_k=options.trans_k;
slides_delay=options.slides_delay;
show_timeline=options.show_timeline;
show_nav=options.show_nav;
elem_size=options.elem_size;
elem_type=options.elem_type;
images=$('#'+container_id+' img');
number_of_imgs=images.length;
delay_rand=options.delay_rand;
$(images[0]).css({display: 'block'});

$('#'+container_id).addClass('ff_slideshow');

if(slides_w==0){


$('#'+container_id+' img').first().load(function(){
    slides_w=$(this).width();
    slides_h=$(this).height();
    $('#'+container_id).width(slides_w);
    $('#'+container_id).height(slides_h);
});
} else {
    if (slides_w < slides_h){
        slides_h=slides_w;
    }
    $('#'+container_id).width(slides_w);
    $('#'+container_id).height(slides_h);
}




var supports = (function() {
   var div = document.createElement('div'),
      vendors = 'Khtml Ms O Moz Webkit'.split(' '),
      len = vendors.length;
   return function(prop) {
      if ( prop in div.style ) return true;
      prop = prop.replace(/^[a-z]/, function(val) {
         return val.toUpperCase();
      });
      while(len--) {
         if ( vendors[len] + prop in div.style ) {


            return true;
         }
      }
      return false;
   };
})();

is_trans_supports=supports('transition');



init_SlideShow(container_id);


init_elements();




function init_SlideShow(){


    var currImg;
    var top_Zi=0;
    var top_Img;
    var next_Img;


    images.each(
        function(n){$(this).data('img_indx',n);}
        );

        $('<div id="nav_btns"></div>').insertAfter($('#'+container_id).find('img').last());
        $('<div id="prev_ff_btn"></div>').appendTo($('#nav_btns'));
        $('<div id="next_ff_btn"></div>').appendTo($('#nav_btns'));
        $('<div id="stop_ff_btn"></div>').appendTo($('#nav_btns'));
        $('<div id="start_ff_btn"></div>').appendTo($('#nav_btns'));

        $('<div id="timeline"></div>').insertBefore('#nav_btns');


        $('#start_ff_btn').show();
        $('#stop_ff_btn').hide();

        currImg=images[1];
        next_Img=images[0];

if (is_trans_supports){
        create_slide(next_Img);
        create_slide(currImg);
} else {
        create_slide_no_trans(next_Img);
        create_slide_no_trans(currImg);
}


        if (options.autorun==true){
            is_running=true;
            current=1;
            $('#start_ff_btn').hide();
            $('#stop_ff_btn').show();
            if (is_trans_supports){
            setTimeout( function(){run_SlideShow(2)}, slides_delay);
            } else {
            setTimeout( function(){run_SlideShow_no_trans(2)}, slides_delay);
            }
        }


}


if (show_nav==true){

$('#start_ff_btn').live('click', function(){

    $(this).hide();
    $('#stop_ff_btn').show();
    is_running=true;
    if (is_trans_supports){
    run_SlideShow((current+1) % number_of_imgs);
    } else {
    run_SlideShow_no_trans((current+1) % number_of_imgs);
    }
});

$("#stop_ff_btn").live('click', function(){
    $(this).hide();
    $('#start_ff_btn').show();
    is_running=false;
    stop_SlideShow();


});

$("#next_ff_btn").live('click', function(){
    if (is_transition_end==false){return}

    if (is_trans_supports){

    is_running=false;
    stop_SlideShow();
    $('#start_ff_btn').show();
        $('#stop_ff_btn').hide();

      if (flow_dir=='backward'){

            var curr_bg='url('+$(images[(number_of_imgs+current+2) % number_of_imgs]).attr('src')+')';
            $('div[id^="slide_"]').eq(1).find('span').css({'background-image': curr_bg});
            run_SlideShow((number_of_imgs+current-1) % number_of_imgs);
            flow_dir='forward';
            return;
     }

    flow_dir='forward';

    run_SlideShow((current+1) % number_of_imgs);
    } else {
     is_running=false;
    stop_SlideShow();
    $('#start_ff_btn').show();
        $('#stop_ff_btn').hide();

      if (flow_dir=='backward'){

            var curr_bg=$(images[(number_of_imgs+current+2) % number_of_imgs]).attr('src');
            $('div[id^="slide_"]').eq(1).find('img').attr({'src': curr_bg});
            run_SlideShow_no_trans((number_of_imgs+current-1) % number_of_imgs);
            flow_dir='forward';
            return;
     }

    flow_dir='forward';

    run_SlideShow_no_trans((current+1) % number_of_imgs);


    }
});

$("#prev_ff_btn").live('click', function(){
    if (is_transition_end==false){return}

    if (is_trans_supports){

    is_running=false;
    stop_SlideShow();
    $('#start_ff_btn').show();
    $('#stop_ff_btn').hide();


     if (flow_dir=='forward'){

            var curr_bg='url('+$(images[(number_of_imgs+current-2) % number_of_imgs]).attr('src')+')';
            $('div[id^="slide_"]').eq(1).find('span').css({'background-image': curr_bg});
            run_SlideShow((number_of_imgs+current+1) % number_of_imgs);
            flow_dir='backward';
            return;
     }


    run_SlideShow((number_of_imgs+current-1) % number_of_imgs);

    } else{
    is_running=false;
    stop_SlideShow();
    $('#start_ff_btn').show();
    $('#stop_ff_btn').hide();


     if (flow_dir=='forward'){

            var curr_bg=$(images[(number_of_imgs+current-2) % number_of_imgs]).attr('src');
            $('div[id^="slide_"]').eq(1).find('img').attr({'src': curr_bg});
            run_SlideShow_no_trans((number_of_imgs+current+1) % number_of_imgs);
            flow_dir='backward';
            return;
     }


    run_SlideShow_no_trans((number_of_imgs+current-1) % number_of_imgs);

    }
});


$('#'+container_id).hover(function(){
    $('#nav_btns' ).fadeIn();
    },
    function(){
    $('#nav_btns').fadeOut();
});

}

    },
    run : function( ) {

      $('#start_ff_btn').trigger('click');
    },
    stop : function( ) {

      $("#stop_ff_btn").trigger('click');
    },
    next: function(){
        $("#next_ff_btn").trigger('click');
    },
    prev: function(){
        $("#prev_ff_btn").trigger('click');
    },
    setter : function( _newoption, _newvalue ) {
        
      if (!$.fn.fotoflow.defaults[_newoption])  {return}
            
      if (typeof _newvalue === 'string'){
	  eval(_newoption+"='"+ _newvalue+"'");
      } else{
          eval(_newoption+"="+ _newvalue);
      }
      
    
    },
    getter : function( _newoption ){
       
       if (!$.fn.fotoflow.defaults[_newoption])  {return}
       var retval;
       eval ('retval=' + _newoption);
       return  retval;
    }
  };

$.fn.fotoflow=function(method){



$.fn.fotoflow.defaults={


    container_id: 'slides',
    slides_w: 0,
    slides_h: 0,
    elem_type: 'boxes',
    elem_size: 'medium',
    scale: 1,
    round: 0,
    opac: 0,
    dir: 'left-top',
    trans_k: 1,
    slides_delay: 5000,
    show_timeline: true,
    autorun: true,
    show_nav: true,
    delay_rand: false


};


    if ( methods[method] ) {

        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {

        return methods.init.apply( this, arguments );
    } else {

        $.error( 'Метод "' +  method + '" не найден в плагине jQuery.FotoFlow' );

    }

};

})(jQuery);





