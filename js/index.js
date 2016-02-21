window.onload=function(){

	var ctx=document.querySelector('#canvas').getContext('2d');
	var birds=document.querySelector('#bird');
	var zhuzi=document.querySelector('#zhuzi');
	var button1=document.querySelector('#begin-button');
	var button2=document.querySelector('#end-button');
	var begin=document.querySelector('#begin');
	var end=document.querySelector('#end');

	var bird={
		x:140,
		y:264,
		w:40,
		h:28,
	}
	var guandaos=[
        {
        	top:{x:300,y:0,w:40,h:300},
        	bottom:{x:300,y:400,w:40,h:300}
        },  
        {
        	top:{x:510,y:0,w:40,h:300},
        	bottom:{x:510,y:400,w:40,h:300}
        }
    ];
	    
	    
	/*var ctx=document.querySelector('#canvas').getContext('2d');*/
	//{x,y,w,h} {}
	var recvsrec =  function(rect0,rect1){
	  if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
	    return false;
	  } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
	    return false;
	  } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
	    return false;
	  } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
	    return false;
	  }
	  return true;
	};
   
    /*canvas.addEventListener('click',function(e){
      bird.y -= upspeed;
    },false);
    canvas.addEventListener('touchend',function(e){
      bird.y -= upspeed;
    },false);*/

	
	var draw=function(){
		
		ctx.clearRect(0,0,320,568);
		
	//画小鸟	
		bird.y+=2;
		//ctx.fillRect(bird.x,bird.y,);
         ctx.drawImage(birds,0,0,40,28,bird.x,bird.y,bird.w,bird.h);
         
		 //画管道
      var vs;
      for(var i=0;i<guandaos.length;i++){
         var z=guandaos[i];
         z.top.x-=1;
         z.bottom.x-=1;
         ctx.drawImage(zhuzi,z.top.x,z.top.y,z.top.w,z.top.h);
         ctx.drawImage(zhuzi,z.bottom.x,z.bottom.y,z.bottom.w,z.bottom.h);

         if(recvsrec(bird,z.top)||recvsrec(bird,z.bottom)){
         	vs=true;//return;
         }
         if(z.top.x<=-z.top.w){
         	z.top.x=450;
         	z.bottom.x=450;
         	z.top.h=Math.random()*200+100;
         	z.bottom.y=z.top.h+100;
         	z.bottom.h=568-z.bottom.y;
         }
         if(vs){

         	end.style.display="block";
         	return;
         }

      };
	//边界判断	
		if(bird.y>=568-29){
			//cancelAnimationFrame(r);
			ctx.drawImage(birds,140,568,bird.w,bird.h);
		}else if(bird.y<=0){
             ctx.drawImage(birds,140,0,bird.w,bird.h);
		}else{
			window.requestAnimationFrame(draw);
		}
	  //requestAnimationFrame(draw);
	}
     
     document.onclick=function(){
     	bird.y-=40;
     }
    

   button1.onclick=function(){
    begin.style.display="none";
    //convas.style.display="block";
	requestAnimationFrame(draw);
}
    /*button2.onclick=function(){
    end.style.display="none";
    //convas.style.display="block";
	requestAnimationFrame(draw);
}*/
}