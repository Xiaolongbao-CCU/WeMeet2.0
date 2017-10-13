"use strict";
export function downloadCSV(array) {
    let a = [];
    a.push("")
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (array[j][i][k]) {
                    const escape = array[j][i][k]
                        .replace(/\\/g, "\\\\")
                        .replace(/\n/g, "\\n")
                        .replace(/,/g, "\\,");
                    a.push(escape);
                } else {
                    a.push("");
                }
            }
            if(j == 2){
                a.push("\n")
            }
        }
    }

    let b = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 6; j++) {
            for (let k = 0; k < 3; k++) {
                if (array[j][i][k]) {
                    const escape = array[j][i][k]
                        .replace(/\\/g, "\\\\")
                        .replace(/\n/g, "\\n")
                        .replace(/,/g, "\\,");
                    b.push(escape);
                } else {
                    b.push("");
                }
            }
            if(j == 5){
                b.push("\n")
            }
        }
    }
    let c = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 6; j < 9; j++) {
            for (let k = 0; k < 3; k++) {
                if (array[j][i][k]) {
                    const escape = array[j][i][k]
                        .replace(/\\/g, "\\\\")
                        .replace(/\n/g, "\\n")
                        .replace(/,/g, "\\,");
                    c.push(escape);
                } else {
                    c.push("");
                }
            }
            if(j == 8){
                c.push("\n")
            }
        }
    }

    let d = a.concat(b,c)

    let data = "data:text/csv;charset=utf-8," + d.join()
    var encodedUri = encodeURI(data);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "九宮格法.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
