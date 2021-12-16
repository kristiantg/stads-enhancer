let table = document.getElementById('resultTable');
let tableChildren = table.children;
let rows = tableChildren[1].rows;
let sumOfECTS = 0;
let gradeAverage = 0;
let gradeAverageWeighted = 0;
let entries = 0;

removeFailed();
getSumOfECTS();
calAverage(); 

let roundedWeightedAverage = Math.round(gradeAverageWeighted * 100) / 100;
let roundedAverage = Math.round((gradeAverage / entries) * 100 ) / 100;

function calAverage() {
    for (let row of rows) {

        let grade = row.children[2].innerText;
        let ects = parseFloat(row.children[4].innerText);

        if (!isNaN(grade)) {
            grade = parseInt(grade);
            gradeAverage += grade;
            weightedGradeSum = (grade * ects) / sumOfECTS;
            gradeAverageWeighted += weightedGradeSum;
            entries++;
        }
    }
}

function getSumOfECTS() {
    for (let row of rows) {
        let grade = row.children[2].innerText;

        if (!isNaN(grade)) {
            let ects = parseFloat(row.children[4].innerText);
            sumOfECTS += ects;
        }
    }
}

function removeFailed() {
    for (let row of rows) { 
        let grade = row.children[2].innerText;
        if(!isNaN(grade)){
            if(removeFailed && (grade === '00' || grade === 'EB' || grade === '-03')){
                row.remove();
            }
        }
    }
}

function addRow(text, average) {
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0); 
    row.insertCell(1);
    let cell3 = row.insertCell(2); 
   
    row.insertCell(3);
    row.insertCell(4);
    cell1.innerHTML = text;
    cell3.innerHTML = average;
    cell3.className = 'average';
}

function setStyling(){
    let resultCells = document.getElementsByClassName('average');
    for (let cell of resultCells) { 
        cell.style.textAlign="center";
    }
}

addRow("Gennemsnit: ", roundedAverage);
addRow("Vægtet gennemsnit: ", roundedWeightedAverage);
setStyling();