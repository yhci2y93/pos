/**
 * Created by lenovo on 16-6-29.
 */
function count(){
    if (localStorage.a) {
        localStorage.a=Number(localStorage.a) +1;
    } else {
        localStorage.a=1;
    }
    return localStorage.a;
}