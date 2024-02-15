
function showContent(event, contentId) {
  event.preventDefault(); // Prevent default anchor behavior

  // Special case: If contentId is 'content5' (Add Patient link), navigate directly to that content
  if (contentId === 'content5') {
    var content5 = document.getElementById(contentId);
    content5.classList.remove('hidden');
    return; // Exit the function early to prevent hiding other content sections
  }

  // Hide all content divs except content5
  var contents = document.getElementsByClassName('content');
  for (var i = 0; i < contents.length; i++) {
    if (contents[i].id !== 'content5') { // Skip hiding content5
      contents[i].classList.add('hidden');
    }
  }

  // Show the selected content div
  var selectedContent = document.getElementById(contentId);
  selectedContent.classList.remove('hidden');
}


// Patient Statistics Chart
var patientCtx = document.getElementById('patientChart').getContext('2d');
var patientChart = new Chart(patientCtx, {
    type: 'bar',
    data: {
        labels: ['Admitted', 'Outpatients'],
        datasets: [{
            label: 'Patient Statistics',
            data: [150, 1850],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Appointment Overview Chart
var appointmentCtx = document.getElementById('appointmentChart').getContext('2d');
var appointmentChart = new Chart(appointmentCtx, {
    type: 'pie',
    data: {
        labels: ['Upcoming', 'Missed'],
        datasets: [{
            label: 'Appointment Overview',
            data: [80, 20],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 205, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        // Additional options here
    }
});

// Beds Availability Chart
var bedsCtx = document.getElementById('bedsChart').getContext('2d');
var bedsChart = new Chart(bedsCtx, {
    type: 'doughnut',
    data: {
        labels: ['Occupied', 'Available'],
        datasets: [{
            label: 'Beds Availability',
            data: [100, 100],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        // Additional options here
    }
});

document.addEventListener('DOMContentLoaded', function() {
  var patientsContent = document.getElementById('content1');
  var admitLink = patientsContent.querySelector('.admit-link');
  var admissionForm = document.getElementById('admissionForm');
  var admitForm = document.getElementById('admitForm');

  // Function to toggle visibility of admission form
  function toggleAdmissionForm() {
    admissionForm.classList.toggle('hidden');
  }

  // Event listener for clicking on "Admit Patients" link
  admitLink.addEventListener('click', function(event) {
    event.preventDefault();
    showContent(event, 'content5'); // Directly navigate to content 5 when clicking "Admit Patients" link
  });

  // Event listener for form submission
  admitForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // Retrieve form data
    var patientName = document.getElementById('patientName').value;
    var patientAge = document.getElementById('patientAge').value;
    var patientGender = document.getElementById('patientGender').value;
    var patientCondition = document.getElementById('patientCondition').value;

    // Here you can perform further actions with the form data, like sending it to a server or updating a database
    console.log('Patient Name:', patientName);
    console.log('Patient Age:', patientAge);
    console.log('Patient Gender:', patientGender);
    console.log('Patient Condition:', patientCondition);

    // Reset form fields
    admitForm.reset();
    // Hide admission form after submission
    toggleAdmissionForm();
  });
});




document.addEventListener('DOMContentLoaded', function() {
  var patientsContent = document.getElementById('content1');
  var admitLink = patientsContent.querySelector('.admit-link');

  // Function to create admission form
  function createAdmissionForm() {
    var admissionForm = document.createElement('div');
    admissionForm.id = 'admissionForm';
    admissionForm.classList.add('hidden');
    admissionForm.innerHTML = `
      <h3>Admit Patient</h3>
      <form id="admitForm">
        <label for="patientName">Patient Name:</label>
        <input type="text" id="patientName" name="patientName" required><br><br>
        
        <label for="patientAge">Patient Age:</label>
        <input type="number" id="patientAge" name="patientAge" required><br><br>
        
        <label for="patientGender">Patient Gender:</label>
        <select id="patientGender" name="patientGender" required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select><br><br>
        
        <label for="patientCondition">Patient Condition:</label>
        <textarea id="patientCondition" name="patientCondition" rows="4" cols="50" required></textarea><br><br>
        
        <button type="submit">Admit Patient</button>
      </form>`;
    patientsContent.appendChild(admissionForm);

    // Event listener for form submission
    admissionForm.querySelector('#admitForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Retrieve form data
      var patientName = document.getElementById('patientName').value;
      var patientAge = document.getElementById('patientAge').value;
      var patientGender = document.getElementById('patientGender').value;
      var patientCondition = document.getElementById('patientCondition').value;

      // Here you can perform further actions with the form data, like sending it to a server or updating a database
      console.log('Patient Name:', patientName);
      console.log('Patient Age:', patientAge);
      console.log('Patient Gender:', patientGender);
      console.log('Patient Condition:', patientCondition);

      // Reset form fields
      admissionForm.querySelector('#admitForm').reset();
      // Hide admission form after submission
      admissionForm.classList.add('hidden');
    });
  }

  // Event listener for clicking on "Admit Patients" link
  admitLink.addEventListener('click', function(event) {
    event.preventDefault();
    var admissionForm = document.getElementById('admissionForm');
    if (!admissionForm) {
      createAdmissionForm();
    } else {
      admissionForm.classList.toggle('hidden');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var patientsContent = document.getElementById('content1');
  var dischargeLink = patientsContent.querySelector('.discharge-link');

  // Function to create discharge form
  function createDischargeForm() {
    var dischargeForm = document.createElement('div');
    dischargeForm.id = 'dischargeForm';
    dischargeForm.classList.add('hidden');
    dischargeForm.innerHTML = `
      <h3>Discharge Patient</h3>
      <form id="dischargeForm">
        <label for="patientID">Patient ID:</label>
        <input type="text" id="patientID" name="patientID" required><br><br>
        
        <label for="dischargeReason">Reason for Discharge:</label>
        <textarea id="dischargeReason" name="dischargeReason" rows="4" cols="50" required></textarea><br><br>
        
        <button type="submit">Discharge Patient</button>
      </form>`;
    patientsContent.appendChild(dischargeForm);

    // Event listener for form submission
    dischargeForm.querySelector('#dischargeForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Retrieve form data
      var patientID = document.getElementById('patientID').value;
      var dischargeReason = document.getElementById('dischargeReason').value;

      // Here you can perform further actions with the form data, like sending it to a server or updating a database
      console.log('Patient ID:', patientID);
      console.log('Reason for Discharge:', dischargeReason);

      // Reset form fields
      dischargeForm.querySelector('#dischargeForm').reset();
      // Hide discharge form after submission
      dischargeForm.classList.add('hidden');
    });
  }

  // Event listener for clicking on "Discharge Patients" link
  dischargeLink.addEventListener('click', function(event) {
    event.preventDefault();
    var dischargeForm = document.getElementById('dischargeForm');
    if (!dischargeForm) {
      createDischargeForm();
    } else {
      dischargeForm.classList.toggle('hidden');
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var patientsContent = document.getElementById('content1');
  var patientInfoLink = patientsContent.querySelector('.patient-info');
  var patientSearchSection = document.getElementById('patientSearch');

  // Function to toggle visibility of patient search section
  function togglePatientSearch() {
    patientSearchSection.classList.toggle('hidden');
  }

  // Event listener for clicking on "View Patient Info" link
  patientInfoLink.addEventListener('click', function(event) {
    event.preventDefault();
    togglePatientSearch();
  });

  // Event listener for search button
  document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();
    var searchBy = document.getElementById('searchBy').value;
    var searchInput = document.getElementById('searchInput').value;
    // Here you can perform search operation and display patient info in table
    // For demo purposes, I'm just displaying a static table
    displayPatientInfo(searchBy, searchInput);
  });

  // Function to display patient information in table
  function displayPatientInfo(searchBy, searchInput) {
    var patientInfoTable = document.getElementById('patientInfoTable');
    // Here you should fetch patient information based on search criteria
    // For demo purposes, I'm creating a static table
    var patientData = [
      { id: 1, name: 'John Doe', age: 35, gender: 'Male' },
      { id: 2, name: 'Jane Smith', age: 28, gender: 'Female' }
    ];
    var tableHTML = '<table border="1"><tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th></tr>';
    patientData.forEach(function(patient) {
      if ((searchBy === 'name' && patient.name.toLowerCase().includes(searchInput.toLowerCase())) ||
          (searchBy === 'id' && patient.id.toString().includes(searchInput))) {
        tableHTML += '<tr><td>' + patient.id + '</td><td>' + patient.name + '</td><td>' + patient.age + '</td><td>' + patient.gender + '</td></tr>';
      }
    });
    tableHTML += '</table>';
    patientInfoTable.innerHTML = tableHTML;
  }
});