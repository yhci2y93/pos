/**
 * Created by lenovo on 16-6-29.
 */
if(sessionStorage.getItem("num")==null){ sessionStorage.setItem("num",0);}
function count(){
    var replace=document.getElementById("shopping_cart").innerHTML;
    replace=parseInt(replace)+1;
    sessionStorage.setItem("num",replace);
    document.getElementById("shopping_cart").innerHTML=replace;
}
var number=sessionStorage.getItem("num");
if (isNaN(number)){number=0;}
document.getElementById("shopping_cart").innerHTML=number;