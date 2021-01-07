class EmployeePayrollData {

    get id(){
        return this._id;
    }

    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Name is incorrect!";
    }

    get profilePic() {
        return this._profilePic;
    }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        let salaryRegex = RegExp('^[1-9]{1}[0-9]*$');
        if (salaryRegex.test(salary))
            this._salary = salary;
        else throw "Salary is Invalid";
    }
    get gender() {
        return this._gender;
    }
    set gender(gender) {
        if (gender != undefined) {
            let genderRegex = RegExp('^(male|female)$');
            if (genderRegex.test(gender)) {
                this._gender = gender;
            } else {
                throw "Gender incorrect";
            }
        }
    }

    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate != undefined) {
            if (startDate <= new Date()) {
                const options = { year: "numeric", month: "long", day: "numeric" };
                const employeeDate = startDate.toLocaleDateString("en-US", options);
                this._startDate = employeeDate;
            }
            else throw " Please select valid date!";
        }
    }
    toString() {
        return " Name: " + this.name + " Salary: " + this.salary + " Gender: " + this.gender + " Start Date: " + this.startDate + "Department: " + this.department+
        "Profile Pic: " + this.profilePic+ "Notes: "+this.note;
    }
}



window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });
});


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
    if (month.value == 1) {
      if (isLeapYear(year.value)) {
        if (day.value > 29) {
          dateError.textContent = "Invalid Date!";
        } else dateError.textContent = "";
      } else {
        if (day.value > 28) {
          dateError.textContent = "Invalid Date!";
        } else dateError.textContent = "";
      }
    }
    if ( month.value == 3 || month.value == 5 || month.value == 8 || month.value == 10 ) {
      if (day.value > 30) {
        dateError.textContent = "Invalid Date!";
      } else dateError.textContent = "";
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

const save = () => {
  try{
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
  }catch(e){
    return;
  }
}

const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  try{
    employeePayrollData.name = getInputValueById('#name');
  }catch(e){
    setTextValue('.text-error',e);
    throw e;
  }
  employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.note = getInputValueById('#notes');
  let day= getInputValueById('#day');
  let month = getInputValueById('#month');
  let year = getInputValueById('#year');
  employeePayrollData.startDate = new Date(year, month, day);
  alert(employeePayrollData.toString());
  return employeePayrollData;
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value; 
}

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let setItems = [];
  allItems.forEach(items => {
    if(items.checked) setItems.push(items.value);
  });
  return setItems;
}

function createAndUpdateStorage(employeePayrollData){
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList != undefined){
      employeePayrollList.push(employeePayrollData);
  } else{
      employeePayrollList = [employeePayrollData];
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const resetForm = () => {
  setValue('#name','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary','');
  setValue('#day','1');
  setValue('#month','1');
  setValue('#year','2020'); 
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}