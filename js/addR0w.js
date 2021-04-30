/**
 * Created by lenovo on 16-7-1.
 */
var replace=0;
add();
function add(){
     replace=parseInt(replace)+1;
    var a=[{type:'饮料',name:'可口可乐',count:'3',unit:'瓶'},{type:'饮料',name:'雪碧',count:'3',unit:'瓶'},{type:'水果',name:'苹果',count:'5.5',unit:'斤'},{type:'水果',name:'荔枝',count:'15',unit:'斤'},{type:'生活用品',name:'电池',count:'2',unit:'个'},{type:'食品',name:'方便面',count:'4.5',unit:'袋'}];
    if(replace==1){
        for(var i=0;i<a.length;i++){
            var trObj = document.createElement("tr");
            trObj.id = new Date().getTime();
            trObj.innerHTML += "<td>"+a[i].type+"</td><td>"+a[i].name+"</td><td>"+a[i].count+"</td><td>"+a[i].unit+"</td><td><button class='button_style' onclick='count()'>加入购物车</button></td>";
            document.getElementById("tb").appendChild(trObj);
        }
    }
}