/**
 * Created by lenovo on 16-7-11.
 */
$(document).ready(function(){
    var goods_info=localStorage.getItem("goods_info");
    goods_info=JSON.parse(goods_info);
    var goods_count=get_goods_num(goods_info);
    var item_info=get_goods_info(goods_info,goods_count);
    add_goods_info_rows(item_info);
    show_shopping_cart_initial();
    get_goods_list_jump_function();
    show_goods_number(item_info);
})

function get_goods_num(goods_info){
   var goods_count={};
    for(var i=0;i<goods_info.length;i++){
        var key=goods_info[i].barcode;
        if(key in goods_count){
            goods_count[key]++;
        }else{
            goods_count[key]=1;
        }
    }
    return goods_count;
}

function get_goods_info(goods_info,goods_count){
    var item_info=[];
    var barcode=[];
    for(var i=0;i<goods_info.length;i++){
        if(barcode.indexOf(goods_info[i].barcode)==-1){
            barcode.push(goods_info[i].barcode);
            goods_info[i].count=goods_count[goods_info[i].barcode];
            item_info.push(goods_info[i])
        }
    }
    return item_info;
}

function add_goods_info_rows(goods_info){
    var get_string=$("#get_rows").text();
    var barcode=[];
    for(var i = 0; i < goods_info.length; i++){
        var replace=get_string.replace(/type/,goods_info[i].type)
            .replace(/name/,goods_info[i].name)
            .replace(/price/,goods_info[i].price)
            .replace(/unit/,goods_info[i].unit)
            .replace(/dec_goods_num_id/,'dec'+goods_info[i].barcode)
            .replace(/show_goods_num_id/,goods_info[i].barcode)
            .replace(/add_goods_num_id/,'add'+goods_info[i].barcode)
            .replace(/tr_id/,'tr'+goods_info[i].barcode);
        $("#table_body").append(replace);
    }
}

function del_goods_info_row(barcode){
    var goods_info=JSON.parse(localStorage.getItem("goods_info"));
    for(var i=0;i<goods_info.length;i++){
        if(goods_info[i].barcode==barcode){
            goods_info.splice(i,1);
        }
    }
    localStorage.setItem("goods_info",JSON.stringify(goods_info));
    $("#tr"+barcode+"").remove();
    if(goods_info.length==0){
        window.location.href = "goods_list.html";
    }
}

function show_shopping_cart_initial(){
    var number = localStorage.getItem("num")||0;
    $("#shopping_cart_num").text(number);
}

function show_goods_number(item_info){
    for(var i=0;i<item_info.length;i++){
        $("#"+item_info[i].barcode+"").text(item_info[i].count);
        show_goods_num(item_info,item_info[i].barcode)
    }
}

function show_goods_num(item_info,barcode){
    $("#add"+barcode+"").click(function(){
        for(var i=0;i<item_info.length;i++){
            if(item_info[i].barcode==barcode){
                item_info[i].count++;
                localStorage.setItem("goods_info",JSON.stringify(item_info));
                $("#"+barcode+"").text(item_info[i].count);
                var number=parseInt($("#shopping_cart_num").text())+1;
                localStorage.setItem("num",number);
                $("#shopping_cart_num").text(number);
            }
        }
    });
    $("#dec"+barcode+"").click(function(){
        for(var i=0;i<item_info.length;i++) {
            if (item_info[i].barcode == barcode) {
                item_info[i].count--;
                if(num>0){
                    localStorage.setItem("goods_info",JSON.stringify(item_info));
                    $("#"+barcode+"").text(item_info[i].count);
                    var number=parseInt($("#shopping_cart_num").text())-1;
                    localStorage.setItem("num",number);
                    $("#shopping_cart_num").text(number);
                }else{
                    localStorage.setItem(barcode, num)
                    number=parseInt($("#shopping_cart_num").text())-1;
                    localStorage.setItem("num",number);
                    $("#shopping_cart_num").text(number);
                    del_goods_info_row(barcode);
                }
            }
        }
    });
}

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