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
    subtotal(item_info);
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
    localStorage.setItem("barcode",JSON.stringify(barcode));
    localStorage.setItem("goods_info",JSON.stringify(item_info));
    return item_info;
}

/*function subtotal(item_info){
    var total=0;
    var save_total=0;
    var discount_subtotal=0;
    for(var i=0;i<item_info.length;i++){
        var goods_info=JSON.parse(localStorage.getItem("goods_info"));
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
        goods_info[i].count=localStorage.getItem(item_info[i].barcode);
        goods_info[i].subtotal=subtotal;
        goods_info[i].discount_subtotal=discount_subtotal;
        total+=subtotal;
    }
    console.log(JSON.stringify(goods_info));
    $("#total").text(total.toFixed(2));
    localStorage.setItem("pay_info",JSON.stringify(goods_info));
    localStorage.setItem("total",total);
    localStorage.setItem("save_total",save_total);
}*/
function subtotal(item_info){
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
        total+=subtotal;
    }
    $("#total").text(total.toFixed(2));
    localStorage.setItem("pay_info",JSON.stringify(item_info));
    localStorage.setItem("total",total);
    localStorage.setItem("save_total",save_total);
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
            .replace(/tr_id/,'tr'+goods_info[i].barcode)
            .replace(/subtotal_id/,'subtotal'+goods_info[i].barcode);
        $("#table_body").append(replace);
    }
}

function del_goods_info_row(barcode,item_info){
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
    var barcode=JSON.parse(localStorage.getItem("barcode"));
    for(var i=0;i<barcode.length;i++){
        if(localStorage.getItem(barcode[i])){
            $("#"+barcode[i]+"").text(localStorage.getItem(barcode[i]));
        }else{
            $("#"+barcode[i]+"").text(item_info[i].count);
            localStorage.setItem(barcode[i],item_info[i].count);
        }
        show_goods_num(barcode[i],item_info);
    }
}

function show_goods_num(barcode,item_info){
    $("#add"+barcode+"").click(function(){
        var num=$("#"+barcode).text();
        num=parseInt(num)+1;
        $("#"+barcode+"").text(num);
        localStorage.setItem(barcode,num);
        var number=parseInt($("#shopping_cart_num").text())+1;
        localStorage.setItem("num",number);
        $("#shopping_cart_num").text(number);
        subtotal(item_info);
    });
    $("#dec"+barcode+"").click(function(){
        var num=localStorage.getItem(barcode);
        num=parseInt(num)-1;
        if(num>0){
            localStorage.setItem(barcode,num);
            $("#"+barcode+"").text(num);
            var number=parseInt($("#shopping_cart_num").text())-1;
            localStorage.setItem("num",number);
            $("#shopping_cart_num").text(number);
            subtotal(item_info);
        }else{
            localStorage.setItem(barcode,num);
            number=parseInt($("#shopping_cart_num").text())-1;
            localStorage.setItem("num",number);
            $("#shopping_cart_num").text(number);
            del_goods_info_row(barcode,item_info);
        }
    });
}

function get_goods_list_jump_function() {
    add_button_event("lets_label","goods_list.html");
    add_button_event("index","index.html");
    add_button_event("goods_list","goods_list.html");
    add_button_event("pay","pay_info_confirm.html");
}

function add_button_event(id_name,file_name)
{
    $("button#"+id_name+"").click(function(){
        window.location.href = file_name;
    });
}


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
