/**
 * Created by lenovo on 16-6-29.
 */
window.onload=function(){
    shopping_check();
    addrow();
    goods_list_jump();
}
function shopping_check(){
    if (sessionStorage.getItem("num") == null) { sessionStorage.setItem("num", 0);}//判断开始是否有数.
    var number = sessionStorage.getItem("num");
    document.getElementById("shopping_cart_num").innerText = number;
}
function count(){
    var replace = document.getElementById("shopping_cart_num").innerText;//取出id="shopping_cart"标签之间的数，给replace.
    replace = parseInt(replace) + 1;
    sessionStorage.setItem("num", replace);//把数据存人sessionStorage.
    document.getElementById("shopping_cart_num").innerText = replace;//输出数到id="shopping_cart"标签之间。
}
function goods_list_jump() {
    if(document.getElementById("lets_label")){
        document.getElementById("lets_label").onclick = function () {
            window.location.href = "goods_list.html";
        }
    }
    if(document.getElementById("index")){
        document.getElementById("index").onclick = function () {
            window.location.href = "index.html";
        }
    }
    if(document.getElementById("shopping")){
        document.getElementById("shopping").onclick = function () {
            window.location.href = "shopping_cart.html";
        }
    }
}


