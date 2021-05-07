/**
 * Created by lenovo on 16-7-8.
 */
$(document).ready(function(){
    shopping_cart_null_check();
    goods_list_jump_function();
    add_rows();
})
function shopping_cart_null_check(){
    if (localStorage.getItem("num") == null) { localStorage.setItem("num", 0);}//判断开始是否有数.
    var number = localStorage.getItem("num");
    $("#shopping_cart_num").text(number);
}

function shopping_cart_count(){
    var replace = $("#shopping_cart_num").text();
    replace = parseInt(replace) + 1;
    localStorage.setItem("num", replace);
    $("#shopping_cart_num").text(replace);
}

function goods_list_jump_function() {
    add_button_event("lets_label","goods_list.html");
    add_button_event("index","index.html");
    add_button_event("shopping","shopping_cart.html");
}

function add_button_event(id_name,file_name)
{
    $("button#"+id_name+"").click(function(){
        window.location.href = file_name;
    });
}

function add_rows() {
    var goods_info = [
        {type: '饮料', name: '可口可乐', count: '3', unit: '瓶'},
        {type: '饮料', name: '雪碧', count: '3', unit: '瓶'},
        {type: '水果', name: '苹果', count: '5.5', unit: '斤'},
        {type: '水果', name: '荔枝', count: '15', unit: '斤'},
        {type: '生活用品', name: '电池', count: '2', unit: '个'},
        {type: '食品', name: '方便面', count: '4.5', unit: '袋'}];
    for (var i = 0; i < goods_info.length; i++) {
        var trObj = document.createElement("tr");//用于创建指定的HTML元素。
        trObj.id = new Date().getTime();
        trObj.innerHTML += "<td>" + goods_info[i].type + "</td><td>" + goods_info[i].name + "</td><td>" + goods_info[i].count + "</td><td>" + goods_info[i].unit + "</td><td><button class='button_style' onclick='shopping_cart_count()'>加入购物车</button></td>";
        document.getElementById("table_body").appendChild(trObj);//appendChild()方法向节点添加最后一个子节点.
    }
}

