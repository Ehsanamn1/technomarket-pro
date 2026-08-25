// تکنومارکت پرو — تعاملات
jQuery(function($){
  // theme toggle
  function setTheme(t){document.documentElement.classList.toggle('dark',t==='dark');localStorage.setItem('tm-theme',t);$('#iconMoon').toggleClass('hidden',t==='dark');$('#iconSun').toggleClass('hidden',t!=='dark');}
  setTheme(localStorage.getItem('tm-theme')||'light');
  $('#themeBtn').on('click',function(){setTheme(document.documentElement.classList.contains('dark')?'light':'dark');});

  // scroll progress + shrink
  var header=$('#header');
  $(window).on('scroll',function(){var h=document.documentElement.scrollTop;$('#progress').css('width',(h/document.documentElement.scrollHeight*100)+'%');header.toggleClass('shrink',h>40);});

  // reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.1});
  $('.reveal').each(function(){io.observe(this);});

  // mega tabs
  $('.sepahan-mega-tab').on('click',function(){
    $('.sepahan-mega-tab').removeClass('is-active');$('.sepahan-mega-content').removeClass('is-active');
    $(this).addClass('is-active');
    $('.sepahan-mega-content[data-c="'+$(this).data('t')+'"]').addClass('is-active');
  });

  // 3D tilt hero
  if($('#heroTilt').length){
    $('#hero').on('mousemove',function(e){var r=$('#heroTilt')[0].getBoundingClientRect();var x=e.clientX-r.left-r.width/2;var y=e.clientY-r.top-r.height/2;$('#heroTilt').css('transform','perspective(1000px) rotateY('+(x/22)+'deg) rotateX('+(-y/22)+'deg) translateZ(10px)');});
    $('#hero').on('mouseleave',function(){$('#heroTilt').css('transform','');});
  }
  // magnetic cta
  $('.magnetic').on('mousemove',function(e){var r=this.getBoundingClientRect();var x=e.clientX-r.left-r.width/2;var y=e.clientY-r.top-r.height/2;this.style.transform='translate('+(x/6)+'px,'+(y/6)+'px)';});
  $('.magnetic').on('mouseleave',function(){this.style.transform='';});

  // horizontal scroll
  window.scrollRow=function(id,dir){document.getElementById(id).scrollBy({left:dir*260,behavior:'smooth'});};

  // modal
  window.openModal=function(){$('#modalBack').addClass('show');};
  window.closeModal=function(){$('#modalBack').removeClass('show');};
  if($('#tiltCard').length){
    $('#modalBack').on('mousemove',function(e){var r=$('#tiltCard')[0].getBoundingClientRect();var x=e.clientX-r.left-r.width/2;var y=e.clientY-r.top-r.height/2;$('#tiltCard').css('transform','perspective(900px) rotateY('+(x/30)+'deg) rotateX('+(-y/30)+'deg)');});
    $('#modalBack').on('mouseleave',function(){$('#tiltCard').css('transform','');});
  }
  if(!localStorage.getItem('tm-modal')){setTimeout(function(){openModal();localStorage.setItem('tm-modal','1');},3500);}

  // countdown
  var total=2*3600+15*60+49;
  setInterval(function(){total--;if(total<0)total=0;var h=String(Math.floor(total/3600)).padStart(2,'0');var m=String(Math.floor(total%3600/60)).padStart(2,'0');var s=String(total%60).padStart(2,'0');$('#cd-h').text(h);$('#cd-m').text(m);$('#cd-s').text(s);},1000);
});
