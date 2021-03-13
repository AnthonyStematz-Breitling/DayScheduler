//array to show in time slot
let hourText = ["9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM"]
//set inputEntrees to object from local storage
//or object representing the military times and associated inputs
let inputEntrees = JSON.parse(localStorage.getItem("plans")) || {
    9: " ",
    10: " ",
    11: " ",
    12: " ",
    13: " ",
    14: " ",
    15: " ",
    16: " ",
    17: " ",
}
//return array of object keys and loops for each key
Object.keys(inputEntrees).forEach(function (key) {
    //set a variable of i since the keys start at 9 and increment up
    //I can now access the hourText array using i like in a for loop
    let i = key - 9
    //creates a div to hold an hour
    let divrow = $("<div></div>").addClass("time-block input-group mb-3");
    //creates the time span setting text from the hourText array
    let timeslot = $("<span></span>").text(hourText[i]).addClass("input-group-prepend input-group-text");
    //creates input with key with an id and data-input matching the key 
    let inputSection = $("<input></input>").addClass("input form-control").attr("id", key).attr("data-input", key);
    //updates the value of that input with matching value in inputEntrees
    inputSection.val(inputEntrees[key])
    //create save button and adds a defined value of the key
    let savebtn = $("<button class='saveBtn input-group-append input-group-text'>Save</button>").attr("value", key);
    //appends the three sections to the divrow
    divrow.append(timeslot);
    divrow.append(inputSection);
    divrow.append(savebtn);
    //appends the divrow to the contianer div in the html
    $(".container").append(divrow);
});

//gets the html by id and sets the text to the current day using momentJS
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

//running through each input
$("input").each(function () {
    //takes that input and adds a class
    //dependent on the return from testMoment
    $(this).addClass(testMoment($(this).data('input')));
});

//when any button is clicked
$("button").click(function (e) {
    //gets the value of that button
    let id = e.target.value
    //updates inputEntrees with the new input value
    inputEntrees[id] = $("#" + id).val().trim()
    //puts inputEntrees into local storage
    localStorage.setItem("plans", JSON.stringify(inputEntrees));
});