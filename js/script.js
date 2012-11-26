/*
 * Скрипт для демо-страницы FotoFlow Slider - jQuery-плагин
 * http://www.alexbr.ru
 *
 * Copyright 2012, Alexey Broslavets
 *
 */

$(document).ready(function() {

var up_down_hover=false;

$("#settings input[id='boxes']").attr('checked', true);
$("#settings input[id='medium']").attr('checked', true);
$("#settings input[id='circle']").attr('checked', false);
$("#settings input[id='downscaled']").attr('checked', false);
$("#settings input[id='upscaled']").attr('checked', false);
$("#settings input[id='opac']").attr('checked', true);
$("#settings input[id='left-top']").attr('checked', true);
$("#settings input[id='delay5_btn']").attr('checked', true);
$("#settings input[id='timeline_btn']").attr('checked', true);

$().fotoflow();

$("#settings input[id='boxes']").click(function(){
    $().fotoflow('setter','elem_type', 'boxes');
});

$("#settings input[id='bars']").click(function(){
    $().fotoflow('setter','elem_type', 'bars');
});

$("#settings input[id='circles']").click(function(){

   $().fotoflow('setter','elem_type', 'circles');
});

$("#settings input[id='fullslide']").click(function(){
    $().fotoflow('setter','elem_type', 'fullslide');
});

$("#settings input[id='small']").click(function(){
    if($("#settings input[id='fullslide']").is(':checked')){
        return;
    }
    $().fotoflow('setter','elem_size', 'small');

    if ($("#settings input[id='boxes']").is(':checked') || $("#settings input[id='circles']").is(':checked')){
        $().fotoflow('setter','elem_size', 'small');

    }
});

$("#settings input[id='medium']").click(function(){
    if($("#settings input[id='fullslide']").is(':checked')){
        return;
    }
    $().fotoflow('setter','elem_size', 'medium');
    if ($("#settings input[id='boxes']").is(':checked') || $("#settings input[id='circles']").is(':checked')){
    $().fotoflow('setter','elem_size', 'medium');

    }
});

$("#settings input[id='large']").click(function(){
    if($("#settings input[id='fullslide']").is(':checked')){
        return;
    }

    $().fotoflow('setter','elem_size', 'large');
    if ($("#settings input[id='boxes']").is(':checked') || $("#settings input[id='circles']").is(':checked')){
    $().fotoflow('setter','elem_size', 'large');
    }
});

$("#settings input[id='circle']").click(function(){
    if ($().fotoflow('getter', "round")==0){
    $().fotoflow('setter','round', 50);

    } else( $().fotoflow('setter','round', 0))

});

$("#settings input[id='downscale']").click(function(){

    var value=$('#scale_val').text()-0;
    if (value==0 ){return}

    value=Math.round((value-0.1) * 10) / 10;
    if (value==0 || value==1){value=value+'.0'}
        $('#scale_val').text(value);


        $().fotoflow('setter','scale', value);

});



$("#settings input[id='upscale']").click(function(){

         var value=$('#scale_val').text()-0;
    if (value==2 ){return}
    value=Math.round((value+0.1) * 10) / 10;
        if (value==1 || value==2){value=value+'.0'}
        $('#scale_val').text(value);
        $().fotoflow('setter','scale', value);
});

$("#settings input[id='upspeed']").click(function(){

         var value=$('#ef_speed_val').text()-0;
    if (value==3 ){return}
    value=Math.round((value+0.1) * 10) / 10;
        if (value==1 || value==2 || value==3){value=value+'.0'}
        $('#ef_speed_val').text(value);
        $().fotoflow('setter','trans_k', value);
});


$("#settings input[id='downspeed']").click(function(){


    var value=$('#ef_speed_val').text()-0;
    if (value==0 ){return}

    value=Math.round((value-0.1) * 10) / 10;
    if (value==0 || value==1 || value==2){value=value+'.0'}
        $('#ef_speed_val').text(value);


        $().fotoflow('setter','trans_k', value);

});


$("#settings input[id='upspeed']+label, #settings input[id='downspeed']+label, #settings input[id='ef_speed']+label").bind('mousewheel DOMMouseScroll', function(event) {
var delta;
var value;
     delta=event.originalEvent.wheelDelta;
     if (!delta){delta=event.originalEvent.detail*(-1)}

    if(delta>0){
        value=$('#ef_speed_val').text()-0;
    if (value==3 ){return}
    value=Math.round((value+0.1) * 10) / 10;
        if (value==1 || value==2 || value==3){value=value+'.0'}
        $('#ef_speed_val').text(value);
        $().fotoflow('setter','trans_k', value);
        } else {

             value=$('#ef_speed_val').text()-0;
    if (value==0 ){return}

    value=Math.round((value-0.1) * 10) / 10;
    if (value==0 || value==1 || value==2){value=value+'.0'}
        $('#ef_speed_val').text(value);


        $().fotoflow('setter','trans_k', value);
        }

event.stopPropagation();
event.preventDefault();
});


$("#settings input[id='upscale']+label, #settings input[id='downscale']+label, #settings input[id='scale']+label").hover(
    function(){
        up_down_hover=true;
    },
    function(){
        up_down_hover=false;
    }
);

$("#settings input[id='upscale']+label, #settings input[id='downscale']+label, #settings input[id='scale']+label").bind('mousewheel DOMMouseScroll', function(event) {
var delta;
var value;
     delta=event.originalEvent.wheelDelta;
     if (!delta){delta=event.originalEvent.detail*(-1)}

    if(delta>0){
        value=$('#scale_val').text()-0;
    if (value==2 ){return}
    value=Math.round((value+0.1) * 10) / 10;
        if (value==1 || value==2){value=value+'.0'}
        $('#scale_val').text(value);
        $().fotoflow('setter','scale', value);
        } else {

             value=$('#scale_val').text()-0;
    if (value==0 ){return}

    value=Math.round((value-0.1) * 10) / 10;
    if (value==0 || value==1){value=value+'.0'}
        $('#scale_val').text(value);


        $().fotoflow('setter','scale', value);
        }

event.stopPropagation();
event.preventDefault();
});


$("#settings input[id='left']").click(function(){
   $().fotoflow('setter','dir', 'left');

});

$("#settings input[id='top']").click(function(){
    $().fotoflow('setter','dir', 'top');

});

$("#settings input[id='left-top']").click(function(){
    $().fotoflow('setter','dir', 'left-top');

});

$("#settings input[id='random']").click(function(){
    $().fotoflow('setter','dir', 'random');

});

$("#settings input[name='delay']").click(function(){
    $().fotoflow('setter','slides_delay', $(this).attr('value'));

});

$("#settings input[id='timeline_btn']").click(function(){

  if ($().fotoflow('getter', "show_timeline")==true)

	$().fotoflow('setter', "show_timeline", false);
  else {$().fotoflow('setter','show_timeline', true)}
});


$("#settings input[id='speed_rand']").click(function(){

  if ($().fotoflow('getter', "delay_rand")==true)

	$().fotoflow('setter', "delay_rand", false);
  else {$().fotoflow('setter','delay_rand', true)}
});

if ($().fotoflow('getter', 'autorun')==true){
    $("#settings label[for='start_exmpl']").hide();
} else {
    $("#settings label[for='stop_exmpl']").hide();
}

$("#settings input[id='start_exmpl']").click(function(){
  $("#settings label[for='start_exmpl']").hide();
  $("#settings label[for='stop_exmpl']").show();
  $().fotoflow('run');
});

$("#settings input[id='stop_exmpl']").click(function(){
  $("#settings label[for='stop_exmpl']").hide();
  $("#settings label[for='start_exmpl']").show();
  $().fotoflow('stop');
});

$("#settings input[id='prev_exmpl']").click(function(){
  $("#settings label[for='stop_exmpl']").hide();
  $("#settings label[for='start_exmpl']").show();
  $().fotoflow('prev');
});

$("#settings input[id='next_exmpl']").click(function(){
  $("#settings label[for='stop_exmpl']").hide();
  $("#settings label[for='start_exmpl']").show();
  $().fotoflow('next');
});

var images_loaded=0;
var number_of_imgs=$('#slides img').length;
var img_loaded_yes=false;



});


