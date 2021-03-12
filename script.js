//an object to represent the day planner
var Schedule = {
    hourText: ["9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM"],
    inputEntrees: {
        9: " ",
        10: " ",
        11: " ",
        12: " ",
        13: " ",
        14: " ",
        15: " ",
        16: " ",
        17: " ",
    },
}

//retrieving saved inputs from local storage and set in correct timeslot
RetreivePlans();
function RetreivePlans() {
    //get object from local storage 
    var scheduledPlans = JSON.parse(localStorage.getItem("plans"));
    //update Schedule object with object from local storage
    Schedule.inputEntrees = scheduledPlans;
};

//defines i so that it can be used in loop
let i = 0;
// loops through the Schedule.inputEntrees object 
Object.keys(Schedule.inputEntrees).forEach(function (value) {
    //creates html for the page
    let divrow = $("<div></div>").addClass("time-block input-group mb-3");
    let timeslot = $("<span></span>").text(Schedule.hourText[i]).addClass("input-group-prepend input-group-text");
    let inputSection = $("<input></input>").addClass("input form-control").attr("id", value).attr("data-input", value);
    //sets the input value separatly so it can be seen by user
    inputSection.val(Schedule.inputEntrees[value])
    let savebtn = $("<button class='saveBtn input-group-append input-group-text'>Save</button>").attr("value", value);
    //appends time input and button into di
    divrow.append(timeslot);
    divrow.append(inputSection);
    divrow.append(savebtn);
    //appends each div inside container
    $(".container").append(divrow);
    //increments i so that it can be used in loop
    i++
});

//taking the current date and dictating how it is displayed
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

//testing current hour against input hour value
function testMoment(currentHour) {
    if (moment().hour() === currentHour) {
        return "present"
    }
    else if (moment().hour() > currentHour) {
        return "past"
    }
    else {
        return "future"
    }
};

//running through each input and executing testMoment function
$("input").each(function () {
    //changing the class of the current input to the return of that function
    $(this).addClass(testMoment($(this).data('input')));
});

//sending input values with thier id to local storage
$("button").click(function (e) {
    //grabs the buttons value
    let id = e.target.value
    //updates the Schedule object with the inputs values
    //the input id matches the buttons given value
    Schedule.inputEntrees[id] = $("#" + id).val().trim()
    //puts new object into local storage
    localStorage.setItem("plans", JSON.stringify(Schedule.inputEntrees));
});