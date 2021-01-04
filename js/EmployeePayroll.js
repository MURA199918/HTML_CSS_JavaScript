class EmployeePayrollData{
    //property
   
    //constructor
    
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
        let dNow = new Date();
        if(dNow.getTime() >= startDate.getTime()){
            this._startDate = startDate;
        }else{
            throw 'Date is Invalid';
        }
    }

    //method
    toString(){
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        const empDate = this.startDate === undefined ? "undefined" :
                        this.startDate.toLocaleDateString("en-US", options);
        return "id=" + this.id + ", name='" + this.name + ", salary=" + this.salary + ", "+
               "gender=" + this.gender + ", profilePic=" + this.profilePic + ", department=" + this.department +
                ", startDate=" + empDate +", note=" +this.note;
    }
}