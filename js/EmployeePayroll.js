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
      else throw "Salary is Incorrect";
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
              throw "Gender is incorrect";
          }
      }
  }

  get note() {
    return this._note;
  }
  set note(note) {
    this._note = note;
  }

  get startDate() { return this._startDate}
  set startDate(startDate){
    let now = new Date();
    if(startDate>now) throw "startDate is future Date!";
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if(diff/(1000*60*60*24) > 30) throw "StartDate is beyond 30 days!";
    this._startDate = startDate;
  }
  
  toString() {
      return " Name: " + this.name + " Salary: " + this.salary + " Gender: " + this.gender + " Start Date: " + this.startDate + "Department: " + this.department+
      "Profile Pic: " + this.profilePic+ "Notes: "+this.note;
  }
}

let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      setTextValue('.text-error',"");
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;
      setTextValue('.text-error',"");
    } catch (e) {
      setTextValue('.text-error',e);
    }
  });

  const date = document.querySelector('#date')
  date.addEventListener('input',function(){
      let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
      getInputValueById('#year');
      try {
        (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
        setTextValue('.date-error',"");
      } catch (e) {
        setTextValue('.date-error',e);
      }
  });


  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function () {
  output.textContent = salary.value;
  });

  checkForUpdate();
});

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if(!isUpdate)
  return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
}

const setForm = () => {
  setValue('#name', employeePayrollObj._name);
  setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
  setSelectedValues('[name=gender]',employeePayrollObj._gender);
  setSelectedValues('[name=department]',employeePayrollObj._department);
  setValue('#salary', employeePayrollObj._salary);
  setTextValue('.salary-output', employeePayrollObj._salary);
  setValue('#notes', employeePayrollObj._note);
  let date = stringifyDate(employeePayrollObj._startDate).split(" ");
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item =>{
      if(Array.isArray(value)){
          if(value.includes(item.value)){
              item.checked = true;
          }
      }else if(item.value == value){
          item.checked = true;
      }
  });
}

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
  let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
               getInputValueById('#year');
  employeePayrollData.startDate = new Date(date);
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
  setSelectedIndex('#day',0);
  setSelectedIndex('#month',0);
  setSelectedIndex('#year',0); 
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent= value;
}


const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}