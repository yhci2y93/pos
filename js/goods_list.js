/**
 * Created by lenovo on 16-6-29.
 */
if(sessionStorage.getItem("num")==null){ sessionStorage.setItem("num",0);}//判断开始是否有数.
var number=sessionStorage.getItem("num");
document.getElementById("shopping_cart").innerHTML=number;
function count(){
    var replace=document.getElementById("shopping_cart").innerHTML;//取出id="shopping_cart"标签之间的数，给replace.
    replace=parseInt(replace)+1;
    sessionStorage.setItem("num",replace);//把数据存人sessionStorage.
    document.getElementById("shopping_cart").innerHTML=replace;//输出数到id="shopping_cart"标签之间。
}
