setInterval(function(){
  for(var i=0;i<stars.length;i++){
        stars[i].style.top = Math.round(Math.random()*window.innerHeight) +"px";
    }
}, 1000);