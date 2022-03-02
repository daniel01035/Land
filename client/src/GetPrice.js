module.exports=
{
GetPriceMinMax : function(arr) {
    var min = arr[0];
    var max = arr[0];
    var avg = 0;
    for(var i= 0; i < arr.length; i++){
      if(min>arr[i]){
        min = arr[i];
      }
      if(max<arr[i]){
        max = arr[i];
      }
      avg += arr[i];
    }
    avg = avg/arr.length;
    let obj = {
        minprice : min,
        maxprice : max,
        avgprice : avg
    }
    
    return(obj);
    // this.setState({lowprice : min, highprice : max});
  }
}