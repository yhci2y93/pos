/**
 * Created by lenovo on 16-7-8.
 */
$(document).ready(function(){
    shopping_cart_null_check();
    index_jump_function();
});
function shopping_cart_null_check(){
    if (localStorage.getItem("num") == null) { localStorage.setItem("num", 0);}//判断开始是否有数.
    var number = localStorage.getItem("num");
    $("#shopping_cart_num").text(number);
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
