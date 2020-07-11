//an object to represent the day planner
var Schedule={
    hourValues: [9, 10,11,12,13,14,15, 16, 17],
    hourText: ["9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM" ],
    inputBox: [],
    inputEntrees:{
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
    },
}
// a loop to create the html needed to show time, input, and save button
for(i=0;i<9; i++){

    console.log(i)
    var divrow =$("<div></div>").addClass("time-block input-group mb-3");
    var timeslot = $("<span></span>").text(Schedule.hourText[i]).addClass("input-group-prepend input-group-text");
    var inputSection = $("<input></input>").addClass("input form-control").attr("id", Schedule.hourValues[i]).attr("data-input", Schedule.hourValues[i]);
    
    //creating an array of the inputs
    Schedule.inputBox.push(inputSection);
    console.log(Schedule.inputBox);
    var savebtn = $("<button class='saveBtn input-group-append input-group-text'>Save</button>");
    
    //attaching time, input, and button to a div to seperate each hour clearly
    divrow.append(timeslot);
    divrow.append(inputSection);
    divrow.append(savebtn);
    //attaching each hour div to the time block parent 
    $(".container").append(divrow);
}



//taking the current date and dictating how it is displayed
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
   
//testing current hour against input hour value
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
       
   };
   
//running through each input and executing testMoment function
//changing the class of the current input to the return of that function
   $("input").each(function(){
       $(this).addClass(testMoment($(this).data('input')));
   });



//retrieving saved inputs from local storage and set in correct timeslot
savedInput()

    function savedInput(){
        // run through the array of html inputs
        $.each(Schedule.inputBox, function(){
            //assign task to current html input
            task = this;
            //assing placement to current html input id
            placement = this.attr("id");
            //run this function
            RetreivePlans(); 
        })
    }   
   
    function RetreivePlans(){
        //get object from local storage and put it in scheduledPlans variable
        var scheduledPlans = JSON.parse(localStorage.getItem("plans"));
        //run through the object
        $.each(scheduledPlans, function(index){
            //compare current placemment to current property 
           if(placement === index){
               //if they match assign the current properties value as the task value
                task.val(this);
                //this makes the html input value the current properties value
           }
        })
   }



//sending input values with thier id to local storage
   $("button").click(function(){
       //declare variables so that .each and assignObjectValue can both access them
       var task; 
       var placement; 
        // run through the array of html inputs
       $.each(Schedule.inputBox, function(){
           //assign task to the current input value
            task=this.val().trim();
            //assign placement to the id of the current html input
            placement=this.attr("id");
            //run this function 
            assignObjectValue();
        })

       function assignObjectValue(){
           //run through object
            $.each(Schedule.inputEntrees, function(index){
                console.log(index);
                //compare the current property to the current placement
                if(index === placement){
                //if they match change the current properties value to current task
                Schedule.inputEntrees[placement] = task
                console.log(Schedule.inputEntrees);
                }
                //place object in local storage
                localStorage.setItem("plans", JSON.stringify(Schedule.inputEntrees));
            })
        }

    })
    




