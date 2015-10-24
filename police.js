//Police API stuff
getRouteSafeness([[53.4564714,-2.225529],[53.4558641,-2.225356]],12,function(data){
  console.log(data);
});

function formatDate(date)
{
  return (date.getYear()+1900)+'-'+(date.getMonth()+1<10?'0':'')+(date.getMonth()+1);
}

function getRouteSafeness(array,months,callback)
{
  var date = new Date("2015-08");
  var currentDate = date;
  var count = 0;
  var crimes = 0;
  console.log(months);
  for (var i = 0; i<array.length; i++)
  {
    for (var j = 0; j<months; j++)
    {
      console.log(currentDate);
      $.ajax({
        url: 'https://data.police.uk/api/crimes-at-location',
        type: 'POST',
        data: 'date='+formatDate(date)+'&lat='+array[i][0]+'&lng='+array[i][1], // or $('#myform').serializeArray()
        success: function(data) {
          crimes += data.length;
          count++;
          console.log(data);
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
      callback(crimes);
    }
  }
}
