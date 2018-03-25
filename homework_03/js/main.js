function Employee({
    name,
    primarySkill,
    age,
    salary
}) {
    let _history = '';

    this.name = name;
    this.primarySkill = primarySkill;
    this.age = age;
    this.salary = salary;
    this.workingTime = {
        totalTime: 0,
        currentWorkingTime: 0
    };

    this.getSalary = function () {
        return this.salary;
    };

    this.setSalary = function (newSalary) {
        if (!isNaN(parseFloat(newSalary)) && isFinite(newSalary) && (newSalary > 0)) {
            if (newSalary < this.salary) {
                _history += `"try to change salary from ${this.salary} to ${newSalary}"\n`;
            } else {
                _history += `"change salary from ${this.salary} to ${newSalary}"\n`;
                this.salary = newSalary;
            };
        } else {
            console.log('You can set to salary only finite number more than 0');
        };
    };

    this.getWorkTimeInSeconds = function () {
        if (this.workingTime.currentWorkingTime === 0) {
            return this.workingTime.totalTime / 1000;
        };
        return (this.workingTime.totalTime + (performance.now() - this.workingTime.currentWorkingTime)) / 1000;
    };

    this.hire = function (companyName) {
        this.companyName = companyName;
        _history += `"${this.name} is hired to ${this.companyName} in ${new Date()}"\n`;
        this.workingTime.currentWorkingTime = performance.now();
    };

    this.fire = function () {
        _history += `"${this.name} is fired from ${this.companyName} in ${new Date()}"\n`;
        this.workingTime.totalTime += performance.now() - this.workingTime.currentWorkingTime;
        this.workingTime.currentWorkingTime = 0;
        this.companyName = null;
    };

    this.getHistory = function () {
        return _history;
    };
};

function Company({
    name,
    owner,
    maxCompanySize
}) {
    this.name = name;
    this.owner = owner;
    this.maxCount = maxCompanySize;

    let _employeesStore = [],
        _logs = `"${this.name} was created in ${new Date()}"\n`;

    this.addNewEmployee = function (employee) {
        if (employee instanceof Employee) {
            if (employee.companyName) {
                if (employee.companyName === this.name) {
                    console.log(`You can not hire ${employee.name} once again`);
                    return;
                } else {
                    console.log(`You can not hire ${employee.name}, he has already had a job`);
                    return;
                };
            };
            if (_employeesStore.length === this.maxCount) {
                let minSalary = Math.min(..._employeesStore.map(empl => empl.salary));
                for (let i = 0; i < _employeesStore.length; i++) {
                    if (_employeesStore[i].salary === minSalary) {
                        this.removeEmployee(i);
                        employee.hire(this.name);
                        _employeesStore.push(employee);
                        _logs += `"${employee.name} starts working at ${this.name} in ${new Date()}"\n`;
                        break;
                    };
                };
            } else {
                _employeesStore.push(employee);
                _logs += `"${employee.name} starts working at ${this.name} in ${new Date()}"\n`;
                employee.hire(this.name);
            };
        } else {
            console.log('Please try to add Employee instance');
        };
    };

    this.removeEmployee = function (index) {
        if (!isNaN(parseFloat(index)) && isFinite(index) && index >= 0 && index < _employeesStore.length) {
            _logs += `"${_employeesStore[index].name} ends working at ${this.name} in ${new Date()}"\n`;
            _employeesStore[index].fire();
            _employeesStore.splice(index, 1);
        } else {
            console.log('Enter the index from array of employee');
        };
    };

    this.getAverageSalary = function () {
        return (_employeesStore.reduce((a, b) => ({
            salary: a.salary + b.salary
        }))).salary / _employeesStore.length;
    };

    this.getEmployees = function () {
        if (_employeesStore.length === 0) {
            return 'There are not any employees here';
        };
        return _employeesStore;
    };

    this.getFormattedListOfEmployees = function () {
        if (_employeesStore.length === 0) {
            return 'There are not any employees here';
        };

        let formattedListOfEmployees = '';
        for (let i = 0; i < _employeesStore.length; i++) {
            formattedListOfEmployees += `"${_employeesStore[i].name} - works in ${this.name} ${(
                performance.now() - _employeesStore[i].workingTime.currentWorkingTime) / 1000} seconds"\n`;
        };
        return formattedListOfEmployees;
    };

    this.getAverageAge = function () {
        return (_employeesStore.reduce((a, b) => ({
            age: a.age + b.age
        }))).age / _employeesStore.length;
    };

    this.getHistory = function () {
        return _logs;
    };
};


let artem = new Employee({name: "Artem", age: 15, salary: 1000, primarySkill: "UX"});
let vova = new Employee({name: "Vova", age: 16, salary: 2000, primarySkill: "BE"});
let vasyl = new Employee({name: "Vasyl", age: 25, salary: 1000, primarySkill: "FE"});
let ivan = new Employee({name: "Ivan", age: 35, salary: 5000, primarySkill: "FE"});
let orest = new Employee({name: "Orest", age: 29, salary: 300, primarySkill: "AT"});
let anton = new Employee({name: "Anton", age: 19, salary: 500, primarySkill: "Manager"});

let epam = new Company({name: "Epam", owner: "Arkadii", maxCompanySize: 5});
epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);
epam.addNewEmployee(orest);
epam.addNewEmployee(anton);

console.log(epam.getHistory());

epam.removeEmployee(2);

console.log(vasyl.getHistory());
console.log(epam.getAverageSalary());
console.log(epam.getAverageAge());

epam.addNewEmployee(5,6,9,5);

setTimeout(() => {
   epam.removeEmployee(1);
   console.log(artem.getWorkTimeInSeconds());
}, 5000);

vova.setSalary(900);
vova.setSalary(2200);
console.log(vova.getHistory());