let table = document.getElementById("ite");
    function addTable(name,code,p1,p2,gst,dist,net){
            let attr = document.createAttribute("align");
            attr.value = "center";
            let row = document.createElement("tr");
            let cell = document.createElement("td");
            let cell1 = document.createElement("td");
            let cell2 = document.createElement("td");
            let cell3 = document.createElement("td");
            let cell4 = document.createElement("td");
            let cell5 = document.createElement("td");
            let cell6 = document.createElement("td");
            let txt = document.createTextNode(name);
            let txt1 = document.createTextNode(code);
            let txt2 = document.createTextNode(p1);
            let txt3 = document.createTextNode(p2);
            let txt4 = document.createTextNode(gst);
            let txt5 = document.createTextNode(dist);
            let txt6 = document.createTextNode(net);
            cell.appendChild(txt);
            cell1.appendChild(txt1);
            cell2.appendChild(txt2);
            cell3.appendChild(txt3);
            cell4.appendChild(txt4);
            cell5.appendChild(txt5);
            cell6.appendChild(txt6);
            //cell.setAttributeNode(attr);
            // cell1.setAttributeNode(attr);
            // cell2.setAttributeNode(attr);
            // cell3.setAttributeNode(attr);
            // cell4.setAttributeNode(attr);
            // cell5.setAttributeNode(attr);
            // cell6.setAttributeNode(attr);
            row.appendChild(cell);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            row.appendChild(cell5);
            row.appendChild(cell6);
            table.appendChild(row);
    }