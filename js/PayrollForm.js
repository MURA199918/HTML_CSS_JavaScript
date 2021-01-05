class EmployeePayrollData{
    //property
   
    //constructor
    constructor(...params) {
        this.name = params[0];
        this.salary = params[1];
        this.gender = params[2];
        this.startDate = params[3];
        this.department = params[4];
        this.note = params[5];
    }
    
    //getter and setter method

    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if(nameRegex.test(name)){
            this._name = name;
        }else{
            throw 'Name is Incorrect';
        }
    }

    get salary() { return this._salary; }
    set salary(salary) {
        if(salary>=0){
            this._salary = salary;
        }else{
            throw 'Salary is Incorrect';
        }
    }

    get gender() { return this._gender; }
    set gender(gender) {
        if (gender != undefined) {
            let genderRegex = RegExp('^(male|female)$');
            if (genderRegex.test(gender)) {
                this._gender = gender;
            } else {
                throw "Gender is Incorrect";
            }
        }
    }

    get department() { return this._department; }
    set department(department) {
        this._department = department;
    }

    get note() {return this._note; }
    set note(note) {
        this._note = note;
    }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
       this._startDate = startDate;
    }

    //method
    toString(){
        return "name=" + this.name + ", salary=" + this.salary + ", "+ "gender=" + this.gender + ", department=" + this.department +
                ", startDate=" + this.startDate +", note=" +this.note;
    }
}

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});

const day = document.querySelector("#day");
const year = document.querySelector("#year");
const month = document.querySelector("#month");
const dateError = document.querySelector(".date-error");
[day, month, year].forEach((item) =>
  item.addEventListener("input", function () {
    if (month.value == 'February') {
      if (isLeapYear(year.value)) {
        if (day.value > 29) {
          dateError.textContent = "Invalid Date!";
        } 
        else dateError.textContent = "";
      } 
      else {
        if (day.value > 28) {
          dateError.textContent = "Invalid Date!";
        } 
        else dateError.textContent = "";
      }
    }
    else if (month.value == 'April' || month.value == 'June' || month.value == 'September' || month.value == 'November') {
      if (day.value > 30) {
        dateError.textContent = "Invalid Date!";
      } 
      else dateError.textContent = "";
    }
    else{
        if(day.value > 31) {
            dateError.textContent = "Invalid Date!";
        }
        else dateError.textContent = "";
    }
  })
);

const isLeapYear = (year) => {
    let result = false;
    if (year % 4 == 0) {
      if (year % 100 == 0) {
        if (year % 400 == 0) {
          result = true;
        }
      } else {
        result = true;
      }
    }
    return result;
};

function save() {
    try {
        var name = document.querySelector('#name').value;
        var salary = document.querySelector('#salary').value;
        var gender = document.querySelector('input[name=gender]:checked').value;
        var year = document.querySelector('#year').value;
        var month = document.querySelector('#month').value;
        var day = document.querySelector('#day').value;
        var note = document.querySelector('#notes').value;
        var startDate = new Date(year, month, day);
        let department = new Array();
        const departmentForm = document.getElementsByClassName("checkbox");
        for (let i = 0; i < departmentForm.length; i++) {
            if (departmentForm[i].checked)
                department.push(departmentForm[i].value);
        }
        var employee = new EmployeePayrollData(name, salary, gender, startDate, department, note);
        alert(employee);
    } catch (error) {
        alert(error);
    }
} 

