/**
 * Created by lenovo on 16-7-8.
 */
$(document).ready(function(){
    shopping_cart_null_check();
    display_shopping_cart_num();
    index_jump_function();
});
function shopping_cart_null_check(){
    if (localStorage.getItem("num") == null) { localStorage.setItem("num", 0);}//判断开始是否有数.
    var number = localStorage.getItem("num");
    //$("#shopping_cart_num").click(function(){
        $("").text();
    //});
    //document.getElementById("shopping_cart_num").innerText = number;
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

function add_button_event(id_name,file_name) {
    $("button#"+id_name+"").click(function(){
        window.location.href = file_name;
    });
}
