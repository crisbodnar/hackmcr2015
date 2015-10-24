//Police API stuff
// var array = [
//   [[53.4556949,-2.2253926],[53.4584239,-2.2274756],[53.4617181,-2.2302911]],
//   [[53.4564714,-2.225529],[53.4558641,-2.225356]],
// ];
//
// getSafestRoute(array,12,function(data){
//   console.log(data);
// });

function getSafestRoute(array,months,callback)
{
  var resultArray = [];
  for (var i = 0; i<array.length; i++)
  {
    getRouteSafeness(array[i],months,i,function(data,routeNumber){
      resultArray[routeNumber] = data;
      // console.log(resultArray);
      tryCallback();
    });
  }
  var tryCallback = function()
  {
    if(resultArray.length == array.length)
    {
      callback(min(resultArray));
    }
  }
}

function min(array){
  var result = 0;
  var resultValue = array[0];
  // console.log(0,resultValue);
  for (var i = 1; i<array.length; i++){
    // console.log(i,array[i]);
    if(array[i] < resultValue)
    {
      result = i;
      resultValue = array[i];
    }
  }
  return result;
}

function formatDate(date)
{
  return (date.getYear()+1900)+'-'+(date.getMonth()+1<10?'0':'')+(date.getMonth()+1);
}

function getRouteSafeness(array,months,routeNumber,callback)
{
  var date = new Date("2015-08");
  var currentDate = date;
  var count = 0;
  var crimes = 0;
  for (var i = 0; i<array.length; i++)
  {
    for (var j = 0; j<months; j++)
    {
      $.ajax({
        url: 'https://data.police.uk/api/crimes-at-location',
        type: 'POST',
        data: 'date='+formatDate(date)+'&lat='+array[i][0]+'&lng='+array[i][1], // or $('#myform').serializeArray()
        success: function(data) {
          crimes += data.length;
          count++;
          tryCallback();
        }
      });
    }
    currentDate.setMonth(currentDate.getMonth()-1);
  }
  var tryCallback = function()
  {
    if(count == (array.length*months))
    {
      // console.log(routeNumber,crimes,crimes/array.length);
      callback(crimes/array.length,routeNumber);
    }
  }
}
