/**
 * Created by lenovo on 16-7-11.
 */
$(document).ready(function () {
    var goods_info = getitem_local("goods_info");
    add_goods_info_rows( goods_info);
    count_shopping_cart_num();
    load_add_and_dec_button_function(goods_info);
    total();
    get_goods_list_jump_function();
})

function add_goods_info_rows( goods_info) {
    var get_string = get_element_text_by_id("td_row_template");
    _.each(_.keys(goods_info), function (id) {
        var replace = get_string.replace(/type/, goods_info[id].type)
            .replace(/name/, goods_info[id].name)
            .replace(/price/, goods_info[id].price)
            .replace(/unit/, goods_info[id].unit)
            .replace(/dec_goods_num_id/, 'dec' + goods_info[id].barcode)
            .replace(/goods_num_id/, goods_info[id].barcode)
            .replace(/number/,goods_info[id].count)
            .replace(/add_goods_num_id/, 'add' + goods_info[id].barcode)
            .replace(/tr_id/, 'tr' + goods_info[id].barcode)
            .replace(/subtotal_id/, 'subtotal' + goods_info[id].barcode)//小计功能没有加载.replace(/subtotal/,subtotal(id));
        $("#table_body").append(replace);
        subtotal(id);
    })
}

function show_shopping_cart_num() {
    var number = localStorage.getItem("num") || 0;
    set_element_text_by_id("shopping_cart_num", number);
}

function get_goods_list_jump_function() {
    add_button_event("lets_label", "goods_list.html");
    add_button_event("index", "index.html");
    add_button_event("goods_list", "goods_list.html");
    add_button_event("pay", "pay_info_confirm.html");
}

function add_button_event(id_name, file_name) {
    $("button#" + id_name).click(function () {
        window.location.href = file_name;
    });
}

function load_add_and_dec_button_function( goods_info) {
    _.each(_.keys(goods_info), function (id) {
        bind_goods_button_function("add"+id);
        bind_goods_button_function("dec"+id);
    });
}

function bind_goods_button_function(id) {
    $("#" + id).click(function () {
        if(id.slice(0,3)=='add') replace_local_info(id.slice(3),1);
        if(id.slice(0,3)=='dec') replace_local_info(id.slice(3),-1);
    });
}

function replace_local_info(id, num) {
    show_goods_num(id, num);
    count_shopping_cart_num();
    discount_subtotal(id);
    subtotal(id);
    total();
    var goods_info=getitem_local("goods_info");
    if(goods_info[id].count==0) del_goods_info_row(id);
}

function show_goods_num(id, num){
    var goods_info=getitem_local("goods_info");
    goods_info[id].count += num;
    set_element_text_by_id(id,goods_info[id].count);
    save_localstoage("goods_info", goods_info);
}

function count_shopping_cart_num(){
    var goods_info=getitem_local("goods_info");
    var shopping_cart_num=0;
    _.each(_.keys(goods_info),function(id){
        shopping_cart_num+=goods_info[id].count;
    })
    localStorage.setItem("num",shopping_cart_num)
    show_shopping_cart_num();
}

function del_goods_info_row(id) {
    var goods_info=getitem_local("goods_info");
    delete goods_info[id];//goods_info[id]=undefined;
    save_localstoage("goods_info", goods_info);
    $("#tr" + id).remove();
    if (_.keys(goods_info).length == 0) window.location.href = "goods_list.html";
}

function show_subtotal(id) {
    var goods_info = getitem_local("goods_info");
    if(goods_info[id].count < 3){
        set_element_text_by_id('subtotal' + id, goods_info[id].subtotal + "元");
    }else{
        set_element_text_by_id('subtotal' + id, goods_info[id].subtotal - goods_info[id].discount_subtotal + '(原价：' + goods_info[id].subtotal + '元)');
    }
}

function subtotal(id) {
    var goods_info=getitem_local("goods_info");
    goods_info[id].subtotal = goods_info[id].price *goods_info[id].count;
    save_localstoage("goods_info", goods_info);
    show_subtotal(id);
}

function discount_subtotal(id) {
    var goods_info=getitem_local("goods_info");
    goods_info[id].discount_subtotal = Math.floor(goods_info[id].count / 3)*goods_info[id].price;
    save_localstoage("goods_info", goods_info);
}

function total() {
    var total=0;
    var goods_info=getitem_local("goods_info");
    _.each(_.keys(goods_info),function(id){
        total+=goods_info[id].subtotal;
    });
    save_localstoage("total", total);
    show_total();
}

function show_total() {
    var total = getitem_local("total")
    set_element_text_by_id("total", total.toFixed(2))
}

function get_element_text_by_id(id) {
    return $("#" + id).text()
}

function set_element_text_by_id(id, text) {
    $("#" + id).text(text)
}

function getitem_local(id) {
    return JSON.parse(localStorage.getItem(id));
}

function save_localstoage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}