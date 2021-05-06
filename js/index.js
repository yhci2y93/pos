/**
 * Created by lenovo on 16-7-7.
 */
window.onload=function(){
    shopping_check();
    count();
    index_jump();
}
function shopping_check(){
    if (sessionStorage.getItem("num") == null) { sessionStorage.setItem("num", 0);}//判断开始是否有数.
    var number = sessionStorage.getItem("num");
    document.getElementById("shopping_cart_num").innerText = number;
}
function count(){
    var replace = document.getElementById("shopping_cart_num").innerText;//取出id="shopping_cart"标签之间的数，给replace.
    document.getElementById("shopping_cart_num").innerText = replace;//输出数到id="shopping_cart"标签之间。
}
function index_jump(){
    if(document.getElementById("goods_list")){
        document.getElementById("goods_list").onclick=function(){
            window.location.href="goods_list.html";
        }
    }
    if(document.getElementById("lets_lable")){
        document.getElementById("lets_lable").onclick=function(){
            window.location.href="goods_list.html";
        }
    }
    if(document.getElementById("lets_button")){
        document.getElementById("lets_button").onclick=function(){
            window.location.href="goods_list.html";
        }
    }
    if(document.getElementById("shopping")){
        document.getElementById("shopping").onclick=function(){
            window.location.href="shopping_cart.html";
        }
    }
}
