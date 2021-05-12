/**
 * Created by lenovo on 16-7-11.
 */
$(document).ready(function(){
    show_shopping_cart_initial();
    get_goods_list_jump_function();
    show_goods_number();
})

function get_goods_info(){


}

function show_shopping_cart_initial(){
    var number = localStorage.getItem("num")||0;
    $("#shopping_cart_num").text(number);
}

function show_goods_number(){//暂时只能用一个；
    var number = localStorage.getItem("number")||0;
    $("#show_goods_num").text(number);
    $("#dec_goods_num").click(function(){
        var num = $("#show_goods_num").text();
        num = parseInt(num) - 1;
        if(num>=0){
            localStorage.setItem("number", num);
            $("#show_goods_num").text(num);
        }else{
            window.location.href = "goods_list.html";
        }
    });
    $("#add_goods_num").click(function(){
        var num = $("#show_goods_num").text();
        num = parseInt(num) + 1;
        localStorage.setItem("number", num);
        $("#show_goods_num").text(num);
    });
}

/*function show_shopping_cart_count(){
    var replace = $("#shopping_cart_num").text();
    replace = parseInt(replace) + 1;
    localStorage.setItem("num", replace);
    $("#shopping_cart_num").text(replace);
}*/

function get_goods_list_jump_function() {
    add_button_event("lets_label","goods_list.html");
    add_button_event("index","index.html");
    add_button_event("goods_list","goods_list.html")
}

function add_button_event(id_name,file_name)
{
    $("button#"+id_name+"").click(function(){
        window.location.href = file_name;
    });
}