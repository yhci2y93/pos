/**
 * Created by lenovo on 16-7-11.
 */
$(document).ready(function(){
    var goods_info=getItem_local("goods_info");
    var barcodes=getItem_local("barcode")
    add_goods_info_rows(barcodes,goods_info);
    show_shopping_cart_initial();
    show_goods_initial_number(barcodes,goods_info);
    get_goods_list_jump_function();
})

function add_goods_info_rows(barcodes,goods_info){
    var get_string=get_element_text_by_id("td_row_template");
    _.each(barcodes,function(id){
        var replace=get_string.replace(/type/,goods_info[id].type)
            .replace(/name/,goods_info[id].name)
            .replace(/price/,goods_info[id].price)
            .replace(/unit/,goods_info[id].unit)
            .replace(/dec_goods_num_id/,'dec'+goods_info[id].barcode)
            .replace(/goods_num_id/,goods_info[id].barcode)
            .replace(/add_goods_num_id/,'add'+goods_info[id].barcode)
            .replace(/tr_id/,'tr'+goods_info[id].barcode)
            .replace(/subtotal_id/,'subtotal'+goods_info[id].barcode);
        $("#table_body").append(replace);
    })
}

function show_shopping_cart_initial(){
    var number = localStorage.getItem("num")||0;
    set_element_text_by_id("shopping_cart_num",number);
}

function get_goods_list_jump_function() {
    add_button_event("lets_label","goods_list.html");
    add_button_event("index","index.html");
    add_button_event("goods_list","goods_list.html");
    add_button_event("pay","pay_info_confirm.html");
}

function add_button_event(id_name,file_name) {
    $("button#"+id_name).click(function(){
        window.location.href = file_name;
    });
}

function show_goods_initial_number(barcodes,goods_info){
    var total=0;
    _.each(barcodes,function(id){
        set_element_text_by_id(id,goods_info[id].count);
        show_subtotal(id);
        total=initial_total(id,goods_info,total);
        show_total();
        bind_goods_add_button_function(id,goods_info)
        bind_goods_dec_button_function(id,goods_info);
    })
}

function bind_goods_add_button_function(id,goods_info){
    $("#add"+id).click(function(){
        var num=parseInt(get_element_text_by_id(id))+1;
        execute_function(num,id,goods_info);
        var number=parseInt(get_element_text_by_id("shopping_cart_num"))+1;
        show_shopping_cart_num(number);
    });
}

function bind_goods_dec_button_function(id,goods_info){
    $("#dec"+id).click(function(){
        var num= parseInt(get_element_text_by_id(id))-1;
        execute_function(num,id,goods_info)
        var number=parseInt(get_element_text_by_id("shopping_cart_num"))-1;
        show_shopping_cart_num(number);
        if(num==0) del_goods_info_row(id,goods_info);
    });
}

function show_shopping_cart_num(number){
    set_element_text_by_id("shopping_cart_num",number);
    save_localstoage("num",number)
}

function execute_function(num,id,goods_info){
    set_element_text_by_id(id,num);
    replace_goods_info(id,goods_info,num);
    if(num>=3) discount_subtotal(id,goods_info,num);
    subtotal(id,goods_info,num);
}

function replace_goods_info(id,goods_info,num){
    goods_info[id].count=num;
    save_localstoage("goods_info",goods_info);
}

function del_goods_info_row(id,goods_info){
    goods_info[id]=undefined;
    save_localstoage("goods_info",goods_info);
    $("#tr"+id).remove();
    jump_goods_info(id);
}
function jump_goods_info(id){
    var barcodes=getItem_local("barcode");
    for(var i=0;i<barcodes.length;i++)
        if(barcodes[i]==id) barcodes.splice(i,1);
    save_localstoage("barcode",barcodes);
    if(barcodes.length==0) window.location.href = "goods_list.html";
}

function show_subtotal(id){
    var goods_info=getItem_local("goods_info");
    goods_info[id].count<3 ? set_element_text_by_id('subtotal'+id,goods_info[id].subtotal+"元") :
        set_element_text_by_id('subtotal'+id,goods_info[id].subtotal-goods_info[id].discount_subtotal+'(原价：'+goods_info[id].subtotal+'元)');
}

function subtotal(id,goods_info,num){
    total(id,goods_info,num);
    goods_info[id].subtotal=goods_info[id].price*num;
    save_localstoage("goods_info",goods_info);
    show_subtotal(id);
}

function discount_subtotal(id,goods_info,num){
    goods_info[id].discount_subtotal=goods_info[id].price*Math.floor(num/3);
    save_localstoage("goods_info",goods_info);
}

function initial_total(id,goods_info,total){
    total+=JSON.parse(goods_info[id].subtotal);
    save_localstoage("total",total);
    return total;
}

function total(id,goods_info,num){
    var total=getItem_local("total")
    total=total-goods_info[id].subtotal+goods_info[id].price*num;
    save_localstoage("total",total);
    show_total();
}

function show_total(){
    var total=getItem_local("total")
    set_element_text_by_id("total",total.toFixed(2))
}

function get_element_text_by_id(id){
    return $("#"+id).text()
}

function set_element_text_by_id(id,text){
    $("#"+id).text(text)
}

function getItem_local(id){
    return JSON.parse(localStorage.getItem(id));
}

function save_localstoage(key, value){
    localStorage.setItem(key,JSON.stringify(value));
}
/*function subtotal(item_info){
    var total=0;
    var save_total=0;
    var discount_subtotal=0;
    for(var i=0;i<item_info.length;i++){
        if(localStorage.getItem(item_info[i].barcode)<3){
            var subtotal=item_info[i].price*localStorage.getItem(item_info[i].barcode);
            $("#subtotal"+item_info[i].barcode+"").text(subtotal);
        }else{
            subtotal=item_info[i].price*localStorage.getItem(item_info[i].barcode);
            discount_subtotal=item_info[i].price*(localStorage.getItem(item_info[i].barcode)-
                Math.floor(localStorage.getItem(item_info[i].barcode)/3));
            save_total+=subtotal-discount_subtotal;
            $("#subtotal"+item_info[i].barcode+"").text(discount_subtotal+'(原价：'+subtotal+'元)');
        }
        item_info[i].count=localStorage.getItem(item_info[i].barcode);
        item_info[i].subtotal=subtotal;
        item_info[i].discount_subtotal=discount_subtotal;
    } else{
        total+=subtotal;
    }
    $("#total").text(total.toFixed(2));
    localStorage.setItem("pay_info",JSON.stringify(item_info));
    localStorage.setItem("total",total);
    localStorage.setItem("save_total",save_total);
}*/

/*function del_goods_info_row(barcode,item_info){
 var goods_info=JSON.parse(localStorage.getItem("goods_info"));
 var barcodes=JSON.parse((localStorage.getItem("barcode")));
 var pay_info=JSON.parse(localStorage.getItem("pay_info"))
 localStorage.removeItem(barcode);
 for(var i=0;i<goods_info.length;i++){
 if(goods_info[i].barcode==barcode){
 goods_info.splice(i,1);
 barcodes.splice(i,1);
 pay_info.splice(i,1);
 item_info.splice(i,1);
 }
 }
 subtotal(item_info);
 localStorage.setItem("goods_info",JSON.stringify(goods_info));
 localStorage.setItem("barcode",JSON.stringify(barcodes));
 localStorage.setItem("pay_info",JSON.stringify(pay_info));
 $("#tr"+barcode).remove();
 if(goods_info.length==0){
 window.location.href = "goods_list.html";
 }
 }*/
/*function add_goods_info_rows(goods_info,barcode){
 var get_string=$("#get_rows").text();
 for(var i = 0; i < barcode.length; i++){
 var replace=get_string.replace(/type/,goods_info[barcode[i]].type)
 .replace(/name/,goods_info[barcode[i]].name)
 .replace(/price/,goods_info[barcode[i]].price)
 .replace(/unit/,goods_info[barcode[i]].unit)
 .replace(/dec_goods_num_id/,'dec'+goods_info[barcode[i]].barcode)
 .replace(/goods_num_id/,goods_info[barcode[i]].barcode)
 .replace(/add_goods_num_id/,'add'+goods_info[barcode[i]].barcode)
 .replace(/tr_id/,'tr'+goods_info[barcode[i]].barcode)
 .replace(/subtotal_id/,'subtotal'+goods_info[barcode[i]].barcode);
 $("#table_body").append(replace);
 }
 }*/
/*
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
    localStorage.setItem("goods_info_add_num",JSON.stringify(item_info));
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
    var goods_info_add_num=JSON.parse(localStorage.getItem("goods_info_add_num"));
    for(var i=0;i<goods_info.length;i++){
        if(goods_info_add_num[i].barcode==barcode){
            goods_info_add_num.splice(i,1);
        }
    }
    localStorage.setItem("goods_info_add_num",JSON.stringify(goods_info));
    $("#tr"+barcode+"").remove();
    if(goods_info.length==0){
        window.location.href = "goods_list.html";
    }
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
                localStorage.setItem("goods_info_add_num",JSON.stringify(item_info));
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
                if( item_info[i].count>0){
                    localStorage.setItem("goods_info_add_num",JSON.stringify(item_info));
                    $("#"+barcode+"").text(item_info[i].count);
                    var number=parseInt($("#shopping_cart_num").text())-1;
                    localStorage.setItem("num",number);
                    $("#shopping_cart_num").text(number);
                }else{
                    localStorage.setItem("goods_info_add_num", JSON.stringify(item_info));
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
}*/




/*function show_goods_initial_number(item_info){
 var barcode=JSON.parse(localStorage.getItem("barcode"));
 for(var i=0;i<barcode.length;i++){
 if(localStorage.getItem(barcode[i])){
 $("#"+barcode[i]).text(localStorage.getItem(barcode[i]));
 }else{
 $("#"+barcode[i]).text(item_info[i].count);
 localStorage.setItem(barcode[i],item_info[i].count);
 }
 bind_goods_add_button_function(barcode[i],item_info);
 bind_goods_dec_button_function(barcode[i],item_info);
 }
 }*/