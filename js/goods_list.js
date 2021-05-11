/**
 * Created by lenovo on 16-7-8.
 */
$(document).ready(function(){
    show_shopping_cart_initial();
    binding_goods_list_jump_function();
    add_goods_info_rows();
})

function show_shopping_cart_initial(){
    var number = localStorage.getItem("num")||0;
    $("#shopping_cart_num").text(number);
}

function show_shopping_cart_count(){
    var number = $("#shopping_cart_num").text();
    number = parseInt(number) + 1;
    localStorage.setItem("num", number);
    $("#shopping_cart_num").text(number);

}

function binding_goods_list_jump_function() {
    add_button_jump_event("lets_label","goods_list.html");
    add_button_jump_event("index","index.html");
    add_button_jump_event("shopping","shopping_cart.html");
}

function add_button_jump_event(id_name,file_name)
{
    $("#"+id_name+"").click(function(){
        window.location.href = file_name;
    });
}

function add_goods_info_rows() {
    var goods_info = [
        {barcode:"000", type: '饮料', name: '可口可乐', count: '3', unit: '瓶'},
        {barcode:"001", type: '饮料', name: '雪碧', count: '3', unit: '瓶'},
        {barcode:"002", type: '水果', name: '苹果', count: '5.5', unit: '斤'},
        {barcode:"003", type: '水果', name: '荔枝', count: '15', unit: '斤'},
        {barcode:"004", type: '生活用品', name: '电池', count: '2', unit: '个'},
        {barcode:"005", type: '食品', name: '方便面', count: '4.5', unit: '袋'}];
    for (var i = 0; i < goods_info.length; i++) {
        //var i=JSON.stringify(goods_info[i]);
        //localStorage(goods_info[i].barcode,i);
        $("tbody#table_body").append("<tr><td>" + goods_info[i].type + "</td><td>" + goods_info[i].name + "</td><td>" + goods_info[i].count + "</td><td>" + goods_info[i].unit + "</td><td><button  class='button_style' onclick='show_shopping_cart_count()' id="+goods_info[i].barcode+">加入购物车</button></td></tr>");
    }
}

