var images =[],count = 0;
$('html,body').find('img').each(function(i) {
    images[i]=$(this).attr('src');
});

for (var i = 0; i < images.length; i++) {
    img = new Image;
    img.src = images[i];
    img.onload = function() {
        count++;
        var per = Math.floor(count/images.length*100);
        $('#load i span').text(per);
        if(count==images.length)
        {
            setTimeout(begin,500);
            function begin(){
                $('.loadwrap').fadeOut(100,function(){
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        direction: 'vertical',
                        noSwiping:true,
                        onSlideChangeEnd: function(swiper){
                            if(swiper.activeIndex==4){
                                $(".arr").hide();
                            }else{
                                $(".arr").show();
                            }
                        }
                    });
                    //getOffsetSum 获取相对与document的偏移量
                    function getOffsetSum(ele){
                        var top= 0,left=0;
                        while(ele){
                            // top+=ele.offsetTop;
                            left+=ele.offsetLeft;
                            ele=ele.offsetParent;
                        }
                        /*  alert(left+" : "+top);*/
                        return { top:top, left:left }
                    }
                    var maindiv=document.getElementById("btn");
                    var a=document.getElementById("a");
                    var website=document.getElementById("website");
                    maindiv.addEventListener("touchmove",touch,false);
                    function touch(e)
                    {
                        switch(e.type)
                        {
                            case "touchmove":
                                var ele=getOffsetSum(e.target);
                                var left=ele.left;
                                // var top=ele.top;

                                var x=e.touches[0].clientX-left/2;
                                // var y=e.touches[0].clientY-top/2;
                                e.preventDefault();

                                e.target.style.marginLeft=x+"px";
                                // console.log(x);

                                var progress=$('.btnLine').width()-160;
                                console.log(progress);

                                if(x>=progress){
                                    // e.target.style.backgroundColor='yellow';
                                    e.target.style.marginLeft=x+"px";
                                    e.preventDefault();
                                    swiper.slideTo(4);
                                    e.target.style.marginLeft=progress+"px";
                                }
                                else if(x<=0){
                                    // left=ele.left;
                                    e.target.style.marginLeft=10+"px";
                                }
                                else{
                                    // e.target.style.backgroundColor='green';
                                }

                        }

                    }
                });
            }
        }
    }

};

