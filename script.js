            
const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    var name = document.getElementById("name").value;
    var lastName = document.getElementById("lastName").value;
    var tel = document.getElementById("tel").value;
    var CIN = document.getElementById("CIN").value;
    if (name === "") {
        showError("Name is required! Please fill in the Name field.");
        return;
    }
    
    if (!/^[A-Za-z\s]+$/.test(name)) {
        showError("First Name can only contain letters.");
        return;
    }

    if (lastName === "") {
        showError("Last Name is required! Please fill in the Last Name field.");
        return;
    }
    if (!/^[A-Za-z\s]+$/.test(lastName)) {
        showError("Last Name can only contain letters.");
        return;
    }
    
    if (tel === "") {
        showError("Telephone number is required. Please enter your telephone number.");
        return;
    }
    if (tel.length !== 10 || isNaN(tel)) {
        showError("phone number must be exactly 10 digits.");
        return;
    }
    if (CIN === "") {
        showError(" CIN is required! Please fill in the CIN field.");
        return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(CIN)) {
        showError("CIN must be alphanumeric.");
        return;
    }

    var table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        if (table.rows[i].cells[3].innerHTML === CIN) {
            showError("Existent CIN. Please provide a unique CIN.");
            return;
        }
    }

    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.innerHTML = name;
    cell2.innerHTML = lastName;
    cell3.innerHTML = tel;
    cell4.innerHTML = CIN;
    cell5.innerHTML =
    '<button class="delete" onclick="deleteRow(this)"><strong>Delete</strong></button> ' +
    '<button class="update" onclick="updateRow(this)"><strong>Update</strong></button> ' +
    '<button class="affect" onclick="affectRow(this)"><strong>Affect</strong></button>';

    document.getElementById("name").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("CIN").value = "";
    showSuccess("User added successfully!");
});

function deleteRow(btn) {
var row = btn.parentNode.parentNode;
row.parentNode.removeChild(row);
}

function updateRow(btn) {
var row = btn.parentNode.parentNode;
var cells = row.getElementsByTagName('td');
for (var i = 0; i < cells.length - 1; i++) {
    var cell = cells[i];
    var value = cell.innerHTML;
    cell.innerHTML = '<input type="text" value="' + value + '"   style=  "border-radius: 10px; background-color: white; color:gray; padding :5px; font-weight: bold; font-size: 16px; border:none ;">';
}
}

function affectRow(btn) {
var row = btn.parentNode.parentNode;
var cells = row.getElementsByTagName('td');
for (var i = 0; i < cells.length - 1; i++) {
    var cell = cells[i];
    var input = cell.querySelector('input');
    if (input) {
        cell.innerHTML = input.value;
    }
}
}

function showError(message) {
    var alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = "<p class='alert-message error'>" + message + "</p>";
    alertContainer.classList.add("show");
}

function showSuccess(message) {
    var alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = "<p class='alert-message success'>" + message + "</p>";
    alertContainer.classList.add("show");
}

document.addEventListener("click", function() {
    hideAlert();
});

function hideAlert() {
    var alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = "";
    alertContainer.classList.remove("show");
}

