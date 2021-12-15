let table = document.getElementById('resultTable');
let tableChildren = table.children;
let rows = tableChildren[1].rows;
rows[rows.length-1].remove();
rows[rows.length-1].remove();
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
        let ects = row.children[4].innerText;
        if ((!isNaN(grade)) && parseInt(grade) !== 0) {
            gradeAverage += parseInt(grade);
            weightedGradeSum = (parseInt(grade) * parseInt(ects)) / sumOfECTS;
            gradeAverageWeighted += weightedGradeSum;
            entries++;
        }
    }
}

function getSumOfECTS() {
    for (let row of rows) {
        let grade = row.children[2].innerText;

        if ((!isNaN(grade)) && parseInt(grade) !== 0) {
            let ects = row.children[4].innerText;
            sumOfECTS += parseInt(ects);
        }
    }
}

function removeFailed() {
    for (let row of rows) {
        let grade = row.children[2].innerText;
        if ((!isNaN(grade)) && parseInt(grade) === 0 || grade === 'EB') {
            row.remove();
        }
    }
}

function addRow(text, average) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0); 
    row.insertCell(1);
    var cell3 = row.insertCell(2); 
    row.insertCell(3);
    row.insertCell(4);
    cell1.innerHTML = text;
    cell3.innerHTML = average;
}

addRow("Gennemsnit: ", roundedAverage);
addRow("Vægtet gennemsnit: ", roundedWeightedAverage);