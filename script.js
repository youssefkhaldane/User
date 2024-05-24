            
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
    var Email = document.getElementById("Email").value;
    var tel = document.getElementById("tel").value;
    var CIN = document.getElementById("CIN").value;
    var city = document.getElementById("city").value;
    if (name === "") {
        showError("Name is required! Please fill in the Name field.");
        return;
    }
    
    if (!/^[A-Za-z\s]+$/.test(name)) {
        showError("First Name can only contain letters.");
        return;
    }

    if (Email === "") {
        showError("Email is required! Please fill in the Email field.");
        return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email)) {
        showError("Format d'email invalide");
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
    if (city === "") {
        showError("City is required. Please enter your City.");
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
    var cell6 = newRow.insertCell(5);

    cell1.innerHTML = name;
    cell2.innerHTML = Email;
    cell3.innerHTML = tel;
    cell4.innerHTML = CIN;
    cell5.innerHTML = city;
    cell6.innerHTML =
    '<button class="delete" onclick="deleteRow(this)"><strong>Delete</strong></button> ' +
    '<button class="update" onclick="updateRow(this)"><strong>Update</strong></button> ' +
    '<button class="affect" onclick="affectRow(this)"><strong>Affect</strong></button>';

    document.getElementById("name").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("CIN").value = "";
    showSuccess("User added successfully!");
});



function deleteRow(button) {
    // Display a confirmation dialog
    var confirmDelete = confirm("Are you sure you want to delete this row?");
    if (confirmDelete) {
        // Find the row containing the button
        var row = button.closest('tr');
        // Remove the row from the table
        row.parentNode.removeChild(row);
    }
}
function updateRow(btn) {
    var row = btn.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');

    for (var i = 0; i < cells.length - 1; i++) {
        var cell = cells[i];

        // تحقق ما إذا كانت الخلية تحتوي على حقل إدخال أو قائمة منسدلة بالفعل
        var inputPresent = cell.getElementsByTagName('input').length > 0;
        var selectPresent = cell.getElementsByTagName('select').length > 0;

        if (!inputPresent && !selectPresent) {
            var value = cell.innerHTML.trim();
            
            // تحقق ما إذا كانت الخلية تحتوي على نص يشير إلى قائمة المدن
            if (value === 'Select your city' || value === 'Agadir' || value === 'Bouznika' || value === 'Casablanca' || value === 'El Jadida' || value === 'Essaouira' || value === 'Fes' || value === 'Kenitra' || value === 'Meknes' || value === 'Mohammedia' || value === 'Oujda' || value === 'Rabat' || value === 'Safi' || value === 'Sale' || value === 'Tanger' || value === 'Tetouan') {
                cell.innerHTML = '<select id="city" name="city" class="input">' +
                    '<option value="">Select your city</option>' +
                    '<option value="Agadir">Agadir</option>' +
                    '<option value="Bouznika">Bouznika</option>' +
                    '<option value="Casablanca">Casablanca</option>' +
                    '<option value="El Jadida">El Jadida</option>' +
                    '<option value="Essaouira">Essaouira</option>' +
                    '<option value="Fes">Fes</option>' +
                    '<option value="Kenitra">Kenitra</option>' +
                    '<option value="Meknes">Meknes</option>' +
                    '<option value="Mohammedia">Mohammedia</option>' +
                    '<option value="Oujda">Oujda</option>' +
                    '<option value="Rabat">Rabat</option>' +
                    '<option value="Safi">Safi</option>' +
                    '<option value="Sale">Sale</option>' +
                    '<option value="Tanger">Tanger</option>' +
                    '<option value="Tetouan">Tetouan</option>' +
                    '</select>';
            } else {
                // تحويل الخلية إلى حقل إدخال
                cell.innerHTML = '<input type="text" value="' + value + '" style="border-radius: 10px; background-color: white; color: gray; padding: 5px; font-weight: bold; font-size: 16px; border: white;">';
            }
        }
    }
}






function affectRow(btn) {
    var row = btn.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    for (var i = 0; i < cells.length - 1; i++) {
        var cell = cells[i];
        var input = cell.querySelector('input');
        var select = cell.querySelector('select');
        if (input) {
            cell.innerHTML = input.value;
        } else if (select) {
            cell.innerHTML = select.options[select.selectedIndex].text;
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

