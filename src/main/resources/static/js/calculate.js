// Name : Chan Cheuk Lam
// CMPT 276 Assignment 1

var lower_bounds = [100.00,95.00,90,85,80,75,70,65,60,55,50,0]
var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01]

var button = document.querySelector('input[value="Submit"]')

const NO_OF_GRADES = 11
const HIST_SYMBOL = "o"

//Event for submit new student grade
button.addEventListener('click',function(evt){
    evt.preventDefault()
    var inputgrade = document.getElementById("newgrade")
    if (!isNaN(inputgrade.value) && !isNaN(parseFloat(inputgrade.value))){//check numeric
        if (inputgrade.value>lower_bounds[0]) {//check input > Max
            window.alert("Input greater than Max. Please input a valid number")
        } else {
            if (inputgrade.value<lower_bounds[NO_OF_GRADES]){//Check input < lower bound of F
                window.alert("Input less than smallest lower bound. Please input a valid number")
            } else {//Update grades and refresh histogram
                grades.push(Number(inputgrade.value))
                fill_hist()

                window.alert("One student grade has been added : "+inputgrade.value)
                inputgrade.value = ""
            }
        }
    } else {
        window.alert("Non numeric input "+inputgrade.value+". Please input a valid number")
    }
})

//function to check lower boundary values in the event of change value
function checkbound(bound,objectname) {
    var x = document.getElementById(objectname).value;
    if (!isNaN(x) && !isNaN(parseFloat(x))){ //check numeric
        if (bound >0 ) { //check overlapping with upper grade range
            if (x >= lower_bounds[bound-1]){
                window.alert("Overlap with upper grade range. Please input a valid number")
                return
            }
        }
        if (bound < NO_OF_GRADES ) {
            if (x <= lower_bounds[bound+1]){//check overlapping with lower grade range
                window.alert("Overlap with lower grade range. Please input a valid number")
                return
            }
        }
        if (bound ==0 ) {//check if there is student with mark > new Max
            var i = 0
            while (i < grades.length) {
              if (x < grades[i]){
                    window.alert("There is a student having mark higher than Max. Please input a valid number")
                    return
                }
                i++
            } 
        }
        if (bound ==NO_OF_GRADES ) {//check if there is student with mark lower than F
            i = 0
            while (i < grades.length) {
              if (x > grades[i]){
                    window.alert("There is a student having mark lower than lower bound of F. Please input a valid number")
                    return
                }
                i++
            } 
        }
        lower_bounds[bound] = Number(x)
        //refresh lower bounds and histogram
        fill_bounds()
        fill_hist()
    } else {
        window.alert("Non numeric input "+x+". Please input a valid number")
    }
  }

//function to fill up the lower boundary values
function fill_bounds() {

    for (i = 0; i<NO_OF_GRADES+1; i++){
        var id = "lower_bounds"+i
        var t = document.getElementById(id)
        t.value = lower_bounds[i].toFixed(2)
    }
}

//Function to construct the histogram
function fill_hist() {

    var hist = ["","","","","","","","","","",""]
    var j
    for (i = 0; i<grades.length; i++){
        j = 1
        while (grades[i] < lower_bounds[j]){
            j++
        }
        hist[j-1]=hist[j-1]+HIST_SYMBOL
        console.log(hist) 
    }

    for (i = 0; i<NO_OF_GRADES; i++){
        var id = "data"+i
        document.getElementById(id).innerHTML=hist[i]
    }

}

//initialize lower boundaries and histogram
fill_bounds()
fill_hist()

