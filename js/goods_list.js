/**
 * Created by lenovo on 16-7-8.
 */
$(document).ready(function(){
    var goods_info = [
        {barcode:"000", type: '饮料', name: '可口可乐', price: '3', unit: '瓶'},
        {barcode:"001", type: '饮料', name: '雪碧', price: '3', unit: '瓶'},
        {barcode:"002", type: '水果', name: '苹果', price: '5.5', unit: '斤'},
        {barcode:"003", type: '水果', name: '荔枝', price: '15', unit: '斤'},
        {barcode:"004", type: '生活用品', name: '电池', price: '2', unit: '个'},
        {barcode:"005", type: '食品', name: '方便面', price: '4.5', unit: '袋'}];
    show_shopping_cart_initial();
    bind_goods_list_jump_function();
    add_goods_info_rows(goods_info);
    show_shopping_cart_count(goods_info);

})

function show_shopping_cart_initial(){
    var number = localStorage.getItem("num")||0;
    $("#shopping_cart_num").text(number);
}
function show_shopping_cart_count(goods_info){
    //$(".button_style").click(function(){
    var barcode=[];
    for(var i=0;i<goods_info.length;i++){
        $("#"+goods_info[i].barcode+"").click(function(){
            var number = $("#shopping_cart_num").text();
            number = parseInt(number) + 1;
            localStorage.setItem("num", number);
            $("#shopping_cart_num").text(number);
            //if(barcode.indexOf(goods_info[i].barcode)==-1){
            //    barcode.push(goods_info[i].barcode);
            //    localStorage.setItem(goods_info[i].barcode,JSON.stringify(goods_info[i]));
            //}
            for(var j=0;j<goods_info.length;j++){
                if(barcode.indexOf(goods_info[j].barcode)==-1){
                    barcode.push(goods_info[j].barcode);
                    localStorage.setItem(goods_info[j].barcode,JSON.stringify(goods_info[j]));
                    break;
                }
            }
        });
    }
}
function bind_goods_list_jump_function() {
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

function add_goods_info_rows(goods_info){
    var get_string=$("#get_rows").text();
    for(var i = 0; i < goods_info.length; i++){
        var replace=get_string.replace(/type/,goods_info[i].type)
            .replace(/name/,goods_info[i].name)
            .replace(/price/,goods_info[i].price)
            .replace(/unit/,goods_info[i].unit)
            .replace(/id_number/,goods_info[i].barcode);
        $("#table_body").append(replace);
    }
}
/*function add_goods_info_rows() {
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
        var rows="<tr>"
        rows+="<td>" + goods_info[i].type + "</td>";
        rows+="<td>" + goods_info[i].name + "</td>";
        rows+="<td>" + goods_info[i].count + "</td>";
        rows+="<td>" + goods_info[i].unit + "</td>";
        rows+="<td><button  class='button_style' onclick='show_shopping_cart_count()' id="+goods_info[i].barcode+">加入购物车</button></td>";
        rows+="</tr>"
        $("#table_body").append(rows);
        //$("#table_body").append("<tr><td>" + goods_info[i].type + "</td><td>" + goods_info[i].name + "</td><td>" + goods_info[i].price + "</td><td>" + goods_info[i].unit + "</td><td><button  class='button_style' onclick='show_shopping_cart_count()' id="+goods_info[i].barcode+">加入购物车</button></td></tr>");
    }
}*/

