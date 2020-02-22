

$(document).ready(function(){
    // get date and year 
    var m = moment();
    // set format for date
    var date = m.format('MMM Do YYYY');
    //set date to header
    $("#currentDay").text(date)
    onLoad();
    var now = currentTime();
    colorScheme(now);

    // get button click
    $(".saveBtn").on("click", function(){
        // get user input for plans for that time
        var plans = $(this).prev().val();

        // point to the sibling element 
        var keyPointer = $(this).siblings()[0];
        // set the text inside sibling element as the key to local storage
        var key = $(keyPointer).attr("id");
        
        // saved plans to local storage
        localStorage.setItem(key, JSON.stringify(plans))
    })
})






// called this function to load all user plans from local memory to screen
function onLoad(){
    // created an array for all the times on the planner because this program used the time as a key
    var timeblock = ["9AM", "10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM"]
    // for each time on the planner 
    $.each(timeblock, function(index,value){
        // get the what user store into local memery
        items = JSON.parse(localStorage.getItem(value))
        // put the value inside that key on the text blocks
        $("#"+ value).next().text(items);
    })
}

// Called this function to tell the current time
function currentTime(){
    var currentHour = moment().hours();
    var hour;
    // we want a 12 hour clock so if it exceed 12 then subtract 12 and concat PM to it
    if(currentHour > 12){
        currentHour = currentHour -12;
        hour = currentHour+"PM";
        console.log(hour)
    }
    else if(currentHour == 12){
        hour = currentHour +"PM";
    }
    else{hour = currentHour+"AM"}
    //return the hour
    return hour;
}

//create color scheme, gray for past , red for current , green for future
function colorScheme(now){


    // create an array to help check if time is prior to time block
    var priortime = ["0AM", "1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM"];
    $.each(priortime, function(index,value){
        if(now == value){
            
            // added class future for all div with class name of form so that all time prior to the timeblock is now in the future
            $(".form").addClass("future");
        }
    })
    // create an array to help check if time is after to time block
    var aftertime = ["9PM", "10PM", "11PM"];
    $.each(aftertime, function(index,value){
        if(now == value){
            
            // added class past for all div with class name of form so that all time on the timeblock is now in the past
            $(".form").addClass("past");
        }
    })

    var timeblock = ["9AM", "10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM"];
    // for each time on the planner 
    $.each(timeblock, function(index,value){
        
        // check if the current time is equal to the value in the array
        if(now == value){

            // add to the div with the ID of the current time a new class called present and remove the class future from it
            $("#" + value).next().addClass("present").removeClass("future");
            // Make a for loop to set the current index value as the maximum to loop through the timeblock array again  
            for(var i =0; i < index; i++){
                // all previous div before the current time get added a new class called past and remove the class future from it
                $("#"+timeblock[i]).next().addClass("past").removeClass("future");
            }
        }
    })
}