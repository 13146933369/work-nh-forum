function hasClass( elements,cName ){ 
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
}; 
function addClass( elements,cName ){ 
    if( !hasClass( elements,cName ) ){ 
        elements.className += " " + cName; 
    }; 
}; 
function removeClass( elements,cName ){ 
    if( hasClass( elements,cName ) ){ 
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
    }; 
};
var setTransition = function(obj, time) {  
    time = time || 0;  
    var style = 'all ' + time + 's ease-in-out';  
    obj.style.webkitTransition = style;  
    obj.style.transition = style;  
};  

var setTransform = function(obj, x , y) {  
    x = x || '0px';  
    y = y || '0px';  
    var style = 'translate3d(' + x + ',' + y + ', 0)';  
    obj.style.webkitTransform = style;  
    obj.style.transform = style;  
};  

var setAnimate = function(obj, time, x , y) {  
    setTransition(obj, time);  
    setTransform(obj, x , y);  
};  
    
var arrayAddZeroToStr = function(arr){
   
    if(arr.length > 0){
        for(var i = 0;i<arr.length;i++){
            if(parseInt(arr[i])<10){
                arr[i] = '0' + arr[i]
            }
        }
    }
    return arr
}

var getYesterday = function(){
    var day1 = new Date();
    day1.setTime(day1.getTime()-24*60*60*1000);
    var month = day1.getMonth()+1 > 10 ? day1.getMonth()+1 : '0'+(day1.getMonth()+1);
    var day = day1.getDate()>10?day1.getDate():'0'+day1.getDate();
    var s1 = day1.getFullYear()+"-" + (month) + "-" + day;
    return s1
}


function getDay(day){
　　var today = new Date();
　　var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
　　today.setTime(targetday_milliseconds); //注意，这行是关键代码
　　var tYear = today.getFullYear();
　　var tMonth = today.getMonth();
　　var tDate = today.getDate();
　　tMonth = doHandleMonth(tMonth + 1);
　　tDate = doHandleMonth(tDate);
　　return tYear+"-"+tMonth+"-"+tDate;
     
}
     
function doHandleMonth(month){
　　var m = month;
　　if(month.toString().length == 1){
　　　　m = "0" + month;
　　}
　　return m;
}

export {hasClass , addClass , removeClass , setAnimate , arrayAddZeroToStr , getYesterday , getDay}
