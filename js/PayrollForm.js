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
    get id() { return this._id; }
    set id(id) {
        if(id>=0){
            this._id = id;
        }else{
            throw 'Id is Incorrect';
        }
    }

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
        if (startDate != undefined) {
            if (startDate <= new Date()) {
                const options = { year: "numeric", month: "long", day: "numeric" };
                const employeeDate = startDate.toLocaleDateString("en-US", options);
                this._startDate = employeeDate;
            }
            else throw " Please select valid date!";
        }
    }

    //method
    toString(){
        return "id=" + this.id + ", name='" + this.name + ", salary=" + this.salary + ", "+
               "gender=" + this.gender + ", profilePic=" + this.profilePic + ", department=" + this.department +
                ", startDate=" + this.startDate +", note=" +this.note;
    }
}

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});

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