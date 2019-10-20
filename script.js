var app = angular.module("weatherApp", []);

app.controller("forecastControl",function($scope, $http){

  $scope.cityID = "";

	$scope.$watch('cityID', function(){
		if($scope.cityID != ""){	
			cityfetch();
		}
		else{
			$scope.cCity = "--";
			$scope.currentTemp = "--";  
			$scope.d1maxTemp = "--"; 
			$scope.d2maxTemp = "--";
			$scope.d3maxTemp = "--";
			$scope.d4maxTemp = "--";
			$scope.d5maxTemp = "--";
			$scope.d6maxTemp = "--";
			$scope.d1minTemp = "--";
			$scope.d2minTemp = "--";
			$scope.d3minTemp = "--";
			$scope.d4minTemp = "--";
			$scope.d5minTemp = "--";
			$scope.d6minTemp = "--";
		}	
	})
	
	var date = new Date();
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	$scope.currentDay = weekday[date.getDay()];
	
	if(date.getDay()+1 > 6){
		$scope.day1 = weekday[date.getDay()+1-7]; 
	}else{
		$scope.day1 = weekday[date.getDay()+1];
	}

	if(date.getDay()+2 > 6){
		$scope.day2 = weekday[date.getDay()+2-7]; 
	}else{
		$scope.day2 = weekday[date.getDay()+2];
	}

	if(date.getDay()+3 > 6){
		$scope.day3= weekday[date.getDay()+3-7]; 
	}else{
		$scope.day3 = weekday[date.getDay()+3];
	}

	if(date.getDay()+4 > 6){
		$scope.day4 = weekday[date.getDay()+4-7]; 
	}else{
		$scope.day4 = weekday[date.getDay()+4];
	}

	if(date.getDay()+5 > 6){
		$scope.day5 = weekday[date.getDay()+5-7]; 
	}else{
		$scope.day5 = weekday[date.getDay()+5];
	}

	if(date.getDay()+6 > 6){
		$scope.day6 = weekday[date.getDay()+6-7]; 
	}else{
		$scope.day6 = weekday[date.getDay()+6];
	}

	if(date.getDay()+7 > 6){
		$scope.day7 = weekday[date.getDay()+7-7]; 
	}else{
		$scope.day7 = weekday[date.getDay()+7];
	}

	function cityfetch(){
		$http.get("https://chathamweatherapi.azurewebsites.net/api/cities/search?byName="+$scope.cityID
).then(function(response){
			$scope.cCity = response.data.predictions[0].description;
			$scope.placeid = response.data.predictions[0].place_id;
			placeDetail();
			
		})
	}
	

	function placeDetail(){
		$http.get("https://chathamweatherapi.azurewebsites.net/api/cities/"+$scope.placeid
).then(function(response){
			$scope.long = response.data.result.geometry.location.lng;
			$scope.lat = response.data.result.geometry.location.lat;	
			forecastfetch();
		})
	}

	function forecastfetch(){
		$http.get("https://chathamweatherapi.azurewebsites.net/api/forecast?latitude="+$scope.lat+"&longitude="+$scope.long+"&source=FORECAST_IO").then(function(response){
			$scope.currentTemp = response.data.currently.temperature; 

			$scope.d1minTemp = response.data.futureForecasts[0].temperatureMin;
			$scope.d2minTemp = response.data.futureForecasts[1].temperatureMin;
			$scope.d3minTemp = response.data.futureForecasts[2].temperatureMin;
			$scope.d4minTemp = response.data.futureForecasts[3].temperatureMin;
			$scope.d5minTemp = response.data.futureForecasts[4].temperatureMin;
			$scope.d6minTemp = response.data.futureForecasts[5].temperatureMin;

			$scope.d1maxTemp = response.data.futureForecasts[0].temperatureMax;
			$scope.d2maxTemp = response.data.futureForecasts[1].temperatureMax;
			$scope.d3maxTemp = response.data.futureForecasts[2].temperatureMax;
			$scope.d4maxTemp = response.data.futureForecasts[3].temperatureMax;
			$scope.d5maxTemp = response.data.futureForecasts[4].temperatureMax;
			$scope.d6maxTemp = response.data.futureForecasts[5].temperatureMax;
				
			
		})
	}
});

