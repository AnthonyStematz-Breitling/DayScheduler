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
    var divrow =$("<div></div>").addClass("time-block row input-group mb-3");
    var timeslot = $("<span></span>").text(Schedule.hourText[i]).addClass("hour input-group-prepend").attr("data-input", Schedule.hourValues[i]);
    var inputSection = $("<input></input>").addClass("input form-control").attr("id", Schedule.hourValues[i]).attr("data-input", Schedule.hourValues[i]);
    //creating an array of the inputs
    Schedule.inputBox.push(inputSection);
    console.log(Schedule.inputBox)
    var savebtn = $("<button class='saveBtn input-group-append'>Save</button>");
    //attaching time, input, and button to a div to seperate each hour clearly
    divrow.append(timeslot)
    divrow.append(inputSection)
    divrow.append(savebtn)
    //attaching each hour div to the time block parent 
    $(".container").append(divrow)
}
//day at top
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"))
   
//testing hour 
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
   
   //intiating new class after testing hour
   $("input").each(function(){
       console.log(this)
       $(this).addClass(testMoment($(this).data('input')));
       testMoment()
   });

//retrieving saved inputs from local storage and set in correct timeslot
savedInput()
function savedInput(){
 $.each(Schedule.inputBox, function(){
     task =this
     placement=this.attr("id")
     RetreivePlans() 
 })
 }   
   
   function RetreivePlans(){
      var scheduledPlans = JSON.parse(localStorage.getItem("plans"))
       $.each(scheduledPlans, function(index){
           if(placement === index){
                task.val(this)
           }
       })
   }
//sending input values with thier id to local storage
   $("button").click(function(){
       var task 
       var placement 
       $.each(Schedule.inputBox, function(){
        task=this.val().trim()
         placement=this.attr("id")
         assignObjectValue()
       })
       function assignObjectValue(){
       $.each(Schedule.inputEntrees, function(index){
            console.log(index)
            if(index === placement){
            Schedule.inputEntrees[placement] = task
            console.log(Schedule.inputEntrees)
           }

           localStorage.setItem("plans", JSON.stringify(Schedule.inputEntrees))
       })
    }

    })




