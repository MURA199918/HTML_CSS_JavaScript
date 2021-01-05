class EmployeePayrollData{
    //property
   
    //constructor
    
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

    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
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
        if(gender=='M' || gender=='F'){
            this._gender = gender;
        }else{
            throw 'Gender is Invalid';
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
       this.startDate = startDate;
    }

    //method
    toString(){
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        const empDate = this.startDate === undefined ? "undefined" :
                        this.startDate.toLocaleDateString("en-US", options);
        return "name=" + this.name + ", salary=" + this.salary + ", "+
               "gender=" + this.gender + ", profilePic=" + this.profilePic + ", department=" + this.department +
                ", startDate=" + empDate +", note=" +this.note;
    }
}

window.addEventListener('DDMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        }catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
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
})

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
    }catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    }catch (e){
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}