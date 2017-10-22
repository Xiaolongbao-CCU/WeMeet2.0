"use strict";
export function downloadCSV(array) {
    let finalArray = [];
    finalArray.push("")
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (array[j][i][k]) {
                    const escape = array[j][i][k]
                        .replace(/\\/g, "\\\\")
                        .replace(/\n/g, "\\n")
                        .replace(/,/g, "\\,");
                    finalArray.push(escape);
                } else {
                    finalArray.push("");
                }
            }
            if(j == 2){
                finalArray.push("\n")
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 6; j++) {
            for (let k = 0; k < 3; k++) {
                if (array[j][i][k]) {
                    const escape = array[j][i][k]
                        .replace(/\\/g, "\\\\")
                        .replace(/\n/g, "\\n")
                        .replace(/,/g, "\\,");
                    finalArray.push(escape);
                } else {
                    finalArray.push("");
                }
            }
            if(j == 5){
                finalArray.push("\n")
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 6; j < 9; j++) {
            for (let k = 0; k < 3; k++) {
                if (array[j][i][k]) {
                    const escape = array[j][i][k]
                        .replace(/\\/g, "\\\\")
                        .replace(/\n/g, "\\n")
                        .replace(/,/g, "\\,");
                    finalArray.push(escape);
                } else {
                    finalArray.push("");
                }
            }
            if(j == 8){
                finalArray.push("\n")
            }
        }
    }

    let data = "data:text/csv;charset=utf-8" + finalArray.join()
    var encodedUri = encodeURI(data);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "九宮格法.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
