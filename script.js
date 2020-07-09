

$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"))

// create an array of hours
//assign those hours data for time
//loop through if 
//var times=[9, 10,11,12,13,14,15, 16, 17]
function testMoment(currentHour){
    if(moment().hour() === currentHour){
        return "present"
    }
    else if (moment().hour() > currentHour){
        return "past"
    }
    else{
        return "future"
    }

}

$("input").each(function(){
    $(this).addClass(testMoment($(this).data('input')))
    testMoment()
})