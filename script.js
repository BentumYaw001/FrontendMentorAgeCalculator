// Input values declaration
let EmptyDay = document.getElementById('Day');
let EmptyMonth = document.getElementById('Month');
let EmptyYear = document.getElementById('Year');
let Dash1 = document.getElementById('Dash1');
let Dash2 = document.getElementById('Dash2');
let Dash3 = document.getElementById('Dash3');
let YearDisplay = document.getElementById('YearDisplay');
let MonthDisplay = document.getElementById('MonthDisplay');

let DayDisplay = document.getElementById('DayDisplay');


// Error display outputs
let DayError = document.getElementById('DayError');
let MonthError = document.getElementById('MonthError');
let YearError = document.getElementById('YearError');
let ValidDayError = document.getElementById('ValidDayError');
let ValidMonthError = document.getElementById('ValidMonthError');
let ValidYearError = document.getElementById('ValidYearError');

let DayLabel = document.getElementById('DayLabel');
let MonthLabel = document.getElementById('MonthLabel');
let YearLabel = document.getElementById('YearLabel');

// Get current date from the system
let CurrentDate = new Date();

document.querySelectorAll('#Day, #Month, #Year').forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });
});

// Display the error message
function ErrorDisplay(parameter, label, error) {
    parameter.style.borderColor = 'red';
    label.style.color = 'red';
    error.classList.remove('Hidden');
}

// Hide the error message
function ErrorHidden(parameter, label, error) {
    parameter.style.borderColor = '';
    label.style.color = '';
    error.classList.add('Hidden');
}

// Check for empty entries
function EmptyEntry(theInput, theLabel, border) {
    if (theInput.value.trim() == "") {
        theInput.style.borderColor = 'red';
        theLabel.style.color = 'red';
        border.classList.remove('Hidden');
        return false;
    } else {
        theInput.style.borderColor = '';
        theLabel.style.color = '';
        border.classList.add('Hidden');
        return true;
    }
}

// Validate the year
function IsValidYear() {
    const Year = parseInt(EmptyYear.value);
    if (isNaN(Year) || Year < 1900) {
        ErrorDisplay(EmptyYear, YearLabel, ValidYearError);
        return false;
    } else if (Year > CurrentDate.getFullYear()) {
        ErrorDisplay(EmptyYear, YearLabel, ValidYearError);
        return false;
    } else {
        ErrorHidden(EmptyYear, YearLabel, ValidYearError);
        ErrorHidden(EmptyYear, YearLabel, YearError);
        return true;
    }
}

// Validate the month
function IsValidMonth() {
    const Month = parseInt(EmptyMonth.value) - 1;
    if (isNaN(Month) || Month < 0 || Month > 11) {
        ErrorDisplay(EmptyMonth, MonthLabel, ValidMonthError);
        return false;
    } else {
        ErrorHidden(EmptyMonth, MonthLabel, ValidMonthError);
        return true;
    }
}

// Validate the day
function IsValidDay() {
    const Day = parseInt(EmptyDay.value);
    const Month = parseInt(EmptyMonth.value) - 1;
    const Year = parseInt(EmptyYear.value);
    const DaysInMonth = new Date(Year, Month + 1, 0).getDate();

    if (isNaN(Day) || Day < 1 || Day > DaysInMonth) {
        ErrorDisplay(EmptyDay, DayLabel, ValidDayError);
        return false;
    } else {
        ErrorHidden(EmptyDay, DayLabel, ValidDayError);
        return true;
    }
}

// Validate all inputs
function ErrorValidator() {
    let ValidDay = EmptyEntry(EmptyDay, DayLabel, DayError);
    let ValidMonth = EmptyEntry(EmptyMonth, MonthLabel, MonthError);
    let ValidYear = EmptyEntry(EmptyYear, YearLabel, YearError);

    if (ValidDay && ValidYear && ValidMonth && IsValidYear() && IsValidMonth() && IsValidDay()) {
        return true;
    } else {
        return false;
    }
}

// Calculate the resulting age
function CalculateResultingAge() {
    const Day = parseInt(EmptyDay.value);
    const Month = parseInt(EmptyMonth.value) - 1;
    const Year = parseInt(EmptyYear.value);
    let InputDate = new Date(Year, Month, Day);
  

    let years = CurrentDate.getFullYear() - InputDate.getFullYear();
    let months = CurrentDate.getMonth() - InputDate.getMonth();
    let days = CurrentDate.getDate() - InputDate.getDate();

    // Adjust for negative days and months
    if (days < 0) {
        months -= 1;
        days += new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    if(ErrorValidator()){
            YearDisplay.textContent = years;
            MonthDisplay.textContent =months;
            DayDisplay .textContent= days;
            Dash1.classList.add('Hidden');
            Dash2.classList.add('Hidden');
            Dash3.classList.add('Hidden');
    }
   
 

}

//Hidden Dashes.
function HiddenDashes(){
    YearDisplay.textContent='';
    MonthDisplay.textContent ='';
    DayDisplay .textContent= '';
    Dash1.classList.remove('Hidden');
    Dash2.classList.remove('Hidden');
    Dash3.classList.remove('Hidden');
}

// Handle submit button click
function SubmitButton() {
    if (ErrorValidator()) {
        CalculateResultingAge();
    }
    else{
         HiddenDashes();
    }
  
}
