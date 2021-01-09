let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    if(site_properties.use_local_storage.match("true")) {
        getEmployeePayrollDataFromStorage();
    }else getEmployeePayrollDataFromServer();
});

const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromStorage = () =>{
    employeePayrollList = localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
       .then(responseText => {
           employeePayrollList = JSON.parse(responseText);
           processEmployeePayrollDataResponse();
       })
       .catch(error => {
           console.log("GET Error Status: "+JSON.stringify(error));
           employeePayrollList = [];
           processEmployeePayrollDataResponse();
       });
}

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>StartDate</th><th>Actions</th></tr>";
    
    if(employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const empPayrollData of employeePayrollList){
        innerHtml = `${innerHtml}
        <tr> 
            <td><img class = "profile" src = "${empPayrollData._profilePic}" alt = ""></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td>
                <img id = "${empPayrollData.id}" src = "../assets/icons/delete-black-18dp.svg" onclick = "remove(this)" alt = "delete">
                <img id = "${empPayrollData.id}" src = "../assets/icons/create-black-18dp.svg" onclick = "update(this)" alt = "edit">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml =``;
    for (const dept of deptList){
        deptHtml = `${deptHtml}<div class = "dept-label">${dept}</div>`;
    }
    return deptHtml;
}

const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData.id == node.id);
    if(!employeePayrollData) return;
    const index = employeePayrollList.map(empData => empData.id).indexOf(employeePayrollData.id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
} 

const update = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData.id==node.id);
    if(!employeePayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
}