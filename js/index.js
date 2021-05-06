/**
 * Created by lenovo on 16-7-7.
 */
window.onload=function(){
    shopping_cart_null_check();
    display_shopping_cart_num();
    index_jump_function();
}
function shopping_cart_null_check(){
    if (sessionStorage.getItem("num") == null) { sessionStorage.setItem("num", 0);}//判断开始是否有数.
    var number = sessionStorage.getItem("num");
    document.getElementById("shopping_cart_num").innerText = number;
}
function display_shopping_cart_num(){
    var replace = document.getElementById("shopping_cart_num").innerText;//取出id="shopping_cart"标签之间的数，给replace.
    document.getElementById("shopping_cart_num").innerText = replace;//输出数到id="shopping_cart"标签之间。
}
function index_jump_function(){
    add_button_event("lets_label","goods_list.html");
    add_button_event("goods_list","goods_list.html");
    add_button_event("lets_button","goods_list.html");
    add_button_event("shopping","shopping_cart.html");
}
function add_button_event(id_name,file_name){
    document.getElementById(id_name).onclick = function () {
        window.location.href = file_name;
    }
}/*方法一*/
/*function index_jump_function(){
    var button_info=[{id:"goods_list",web_link:"goods_list.html"},{id:"lets_label",web_link:"goods_list.html"},{id:"lets_button",web_link:"goods_list.html"},{id:"shopping",web_link:"shopping_cart.html"}]
    var arr = document.getElementsByTagName('button');
    for(var i = 0;i<arr.length;i++){
        arr[i].onclick = function(){
            for(var j=0;j<button_info.length;j++){
                if(this.id==button_info[j].id)
                    document.getElementById(this.id).onclick= window.location.href=button_info[j].web_link;
            }
        }
    }
} 方法二*/
