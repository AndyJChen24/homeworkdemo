// on load get history from local storage
function onload(){
    var load = JSON.parse(localStorage.getItem("history"))
    // check if load is null if not then there is something in local storage 
    if(load != null){
        load.forEach(function(value){
            
            $("#previousSearch").prepend("<button class='btn-lg btn-block' id='"+value+"'>"+value+"</button>")
        })
    }
}
var list =[];
// store history into local storage
function store(city){
    list.push(city);
    
    localStorage.setItem("history",JSON.stringify(list))
}

$(document).ready(function(){
    // get date and year 
    var m = moment();
    // set format for date
    var date = m.format('MM/DD/YYYY');
    
    // load from local memory
    onload();
    // check if button block from previousSearch is clicked 
    $(".btn-block").click(function(event){
        //event.preventDefault();
        city= $(this).attr("id")
        aJax(city,date)
        store(city)
    })
    // if searchbtn is clicked
    $("#searchbtn").click(function(){
        // ajax called to search current city weather
        var city = $("#userCity").val()
        // check if the text box is empty and if not empty then do the rest of the program
        if (city.length > 0) {

            // prepend a button with the city name
            $("#previousSearch").prepend("<button class='btn-lg btn-block' id='"+city+"'>"+city+"</button>")
            //store city into local storage
            store(city);
            // called my ajax function
            aJax(city, date);  
            // check if button block from previousSearch is clicked 
            $(".btn-block").click(function(event){
                //event.preventDefault();
                city= $(this).attr("id")
                aJax(city,date)
            })
        }
        
    })
    
})



// My AJAX called function to get current weather, 5 day weather and UV Index
function aJax(city, date){
            var appID = "c0bc6e775276a56ec675604dad9eb699";
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + appID;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                // set all response value that we need
                var cityName = response.name+" "+date;
                var temperature = (response.main.temp-273.15)*(9/5)+32;
                var humidity = response.main.humidity;
                var windSpeed =  response.wind.speed;
                var iconCode = response.weather[0].icon;
                var iconLink ="https://openweathermap.org/img/w/" + iconCode + ".png"
                // Put them into html
                $(".city").html(cityName+ "<img src='" + iconLink+ "' alt='Weather icon'>");
                $(".temperature").html("Temperature: "+temperature.toFixed(2)+"&degF");
                $(".humidity").html("Humidity: "+humidity+"%")
                $(".windSpeed").html("Wind Speed: "+ windSpeed+ "MPH");

                // ajax call for UV Index and create a button base on serverity 
                var longitute = response.coord.lon;
                var latitute = response.coord.lat;
                var queryUVURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+ appID + "&lat=" +latitute+"&lon="+longitute;
                $.ajax({
                    url: queryUVURL,
                    method: "GET"
                }).then(function(response){
                    var uvIndex = response.value;
                    
                    if(uvIndex <3){
                        $(".btn").addClass("btn-success");
                        $(".btn").removeClass("btn-warning");
                        $(".btn").removeClass("btn-danger");
                    }
                    else if(uvIndex >3 && uvIndex <5){
                        $(".btn").addClass("btn-warning")
                        $(".btn").removeClass("btn-success");
                        $(".btn").removeClass("btn-danger");
                    }
                    else{
                        $(".btn").addClass("btn-danger")
                        $(".btn").removeClass("btn-success");
                        $(".btn").removeClass("btn-warning");
                    }
                    $(".btn").html(uvIndex);
                })


                // ajax call for 5 day forecast
                var query5dayURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city +"&appid="+appID;
                $.ajax({
                    url: query5dayURL,
                    method:"GET"
                }).then(function(response){
                    // i is the first card pointer 
                    var i =1;
                    // loop through the 3 hour 5 days array 
                    $.each(response.list, function(index, value){
                        // get the time of the current element in the array
                        var time = response.list[index].dt_txt;
                        // get the hour
                        var test = moment(time).format("hA")
                        // get the date 
                        var currentDate = moment(time).format("MM/DD/YYYY")
                        // check if it is 3PM
                        if(test == "3PM"){
                            // set up variables and set them into html
                            var Date = currentDate;
                            var Temp = (response.list[index].main.temp-273.15)*(9/5)+32;
                            var Humidity = response.list[index].main.humidity;
                            var icon = response.list[index].weather[0].icon;
                            var link = "https://openweathermap.org/img/w/" + icon + ".png";
                            //Set the html with those values
                            $("."+i+"DayDate").html(Date+"<img src='"+link+"' alt='Weather icon'>");
                            $("."+i+"DayTemp").html("Temp: "+Temp.toFixed(2)+"&degF");
                            $("."+i+"DayHumidity").html("Humidity: "+Humidity+"%");
                            // increment card value
                            i++;
                        }
                    })
                })
            })
}