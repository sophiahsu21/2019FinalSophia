document.body.onmousemove = function(ev){
    //make a trail of stars
    var size = Math.round(Math.random()*50);
    var trailStar = CreateStar(ev.pageX, ev.pageY, size, size);
    trailStar.style.opacity = Math.random();
    trailStar.style.pointerEvents = "none";
    var deg = Math.round(Math.random()*360);
    trailStar.style.webkitFilter = "hue-rotate("+deg+"deg)";
    trail.push(trailStar);
    if(trail.length > 50){
        /*for(var i = 0; i<trail.length; i++){
            sky.removeChild(trail[i]);
        }
        trail = [];*/
        sky.removeChild(trail[0]);
        trail.splice(0,1);
    }

    setTimeout(function(){
        trailStar.style.left = Math.round(Math.random()*window.innerWidth) +"px";
        trailStar.style.top = Math.round(Math.random()*window.innerHeight) +"px";
    }, 100)
}

setInterval(function(){
    var size = Math.round(Math.random()*50);

    var trailStar = CreateStar(Math.round(Math.random()*window.innerWidth), Math.round(Math.random()*window.innerHeight), size, size);
    var deg = Math.round(Math.random()*360);
    trailStar.style.webkitFilter = "hue-rotate("+deg+"deg)";
    trailStar.style.opacity = Math.random();
    setTimeout(function(){
        trailStar.style.left = Math.round(Math.random()*window.innerWidth) +"px";
        trailStar.style.top = Math.round(Math.random()*window.innerHeight) +"px";
    }, 100);

    stars.push(trailStar);

    if(stars.length > 100){
        sky.removeChild(stars[0]);
        stars.splice(0,1);
    }

    document.body.style.background = "rgb(0,0,"+Math.round(Math.random()*100)+")";
}, 100);