var functionToGetMidpoints = function (arrayOfCoordinates) 
{
	var arrayOfMidpoints = [];
	for (var selectedCoordinate = 0; selectedCoordinate < arrayOfCoordinates.length-1; selectedCoordinate ++)
	{
		var coordinatesOfAMidpoint = [];
		return1=((arrayOfCoordinates[selectedCoordinate][0])+(arrayOfCoordinates[selectedCoordinate+1][0]))/2;
		return2=((arrayOfCoordinates[selectedCoordinate][1])+(arrayOfCoordinates[selectedCoordinate+1][1]))/2;
		coordinatesOfAMidpoint.push(return1,return2);
		arrayOfMidpoints.push(coordinatesOfAMidpoint);
	}
	return(arrayOfMidpoints)
}