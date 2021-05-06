/**
 * Created by lenovo on 16-6-29.
 */
window.onload=function(){
    shopping_cart_null_check();
    add_rows();
    goods_list_jump_function();
}

function shopping_cart_null_check(){
    if (sessionStorage.getItem("num") == null) { sessionStorage.setItem("num", 0);}//判断开始是否有数.
    var number = sessionStorage.getItem("num");
    document.getElementById("shopping_cart_num").innerText = number;
}

function shopping_cart_count(){
    var replace = document.getElementById("shopping_cart_num").innerText;//取出id="shopping_cart"标签之间的数，给replace.
    replace = parseInt(replace) + 1;
    sessionStorage.setItem("num", replace);//把数据存人sessionStorage.
    document.getElementById("shopping_cart_num").innerText = replace;//输出数到id="shopping_cart"标签之间。
}

function goods_list_jump_function() {
    add_button_event("lets_label","goods_list.html");
    add_button_event("index","index.html");
    add_button_event("shopping","shopping_cart.html");
}

function add_button_event(id_name,file_name)
{
    document.getElementById(id_name).onclick = function () {
        window.location.href = file_name;
    }
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
        document.getElementById("tb").appendChild(trObj);//appendChild()方法向节点添加最后一个子节点.
    }
}
