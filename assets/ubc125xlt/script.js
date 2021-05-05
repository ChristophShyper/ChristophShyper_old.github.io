
// file_header
var file_header = ''
var file_header_request = new XMLHttpRequest();
file_header_request.open('GET', 'assets/ubc125xlt/file_header.txt');
file_header_request.onreadystatechange = function() {
  if (file_header_request.readyState === 4) {
    file_header = file_header_request.responseText;
  }
}
file_header_request.send();

// file_footer
var file_footer = ''
var file_footer_request = new XMLHttpRequest();
file_footer_request.open('GET', 'assets/ubc125xlt/file_footer.txt');
file_footer_request.onreadystatechange = function() {
  if (file_footer_request.readyState === 4) {
    file_footer = file_footer_request.responseText;
  }
}
file_footer_request.send();

// airports_military
var airports_military = ''
var airports_military_request = new XMLHttpRequest();
airports_military_request.open('GET', 'assets/ubc125xlt/airports_military.txt');
airports_military_request.onreadystatechange = function() {
  if (airports_military_request.readyState === 4) {
    airports_military = airports_military_request.responseText;
  }
}
airports_military_request.send();

// airports_major
var airports_major = ''
var airports_major_request = new XMLHttpRequest();
airports_major_request.open('GET', 'assets/ubc125xlt/airports_major.txt');
airports_major_request.onreadystatechange = function() {
  if (airports_major_request.readyState === 4) {
    airports_major = airports_major_request.responseText;
  }
}
airports_major_request.send();

// airports_minor
var airports_minor = ''
var airports_minor_request = new XMLHttpRequest();
airports_minor_request.open('GET', 'assets/ubc125xlt/airports_minor.txt');
airports_minor_request.onreadystatechange = function() {
  if (airports_minor_request.readyState === 4) {
    airports_minor = airports_minor_request.responseText;
  }
}
airports_minor_request.send();

// services_emergency
var services_emergency = ''
var services_emergency_request = new XMLHttpRequest();
services_emergency_request.open('GET', 'assets/ubc125xlt/services_emergency.txt');
services_emergency_request.onreadystatechange = function() {
  if (services_emergency_request.readyState === 4) {
    services_emergency = services_emergency_request.responseText;
  }
}
services_emergency_request.send();

// handlers
const generate = document.getElementById('generate');
generate.onsubmit = generate_file;

function download_file(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

function generate_file(event) {
  var content = file_header;
  var airports_military_enable = document.getElementById('airports-military').checked;
  var airports_major_enable = document.getElementById('airports-major').checked;
  var airports_minor_enable = document.getElementById('airports-minor').checked;
  var services_emergency_enable = document.getElementById('services-emergency').checked;
  var frequencies = '';
  var file_name = 'ubc125xlt';
  if (airports_military_enable) {
    frequencies += airports_military;
    file_name += '-mil';
  };
  if (airports_major_enable) {
    frequencies += airports_major;
    file_name += '-maj';
  };
  if (airports_minor_enable) {
    frequencies += airports_minor;
    file_name += '-min';
  };
  if (services_emergency_enable) {
    frequencies += services_emergency;
    file_name += '-emr';
  };
  var lines = frequencies.split('\n').sort();
  if (lines[0] == '') { // for whatever reason first element is empty after sorting
    lines.shift();
  }
  var num = ''
  for (var i = 1; i <= 500; i++) { // there are only 500 entries
    if (i < 10) { num = '00' + i }
    else if (i >= 10 && i < 100) { num = '0' + i }
    else { num = i };
    if (i <= lines.length && typeof lines[i-1] != 'undefined') {
      content += 'CIN=' + num + ',' + lines[i-1] + '\n';
    } else {
      content += 'CIN=' + num + ', ,00000000,AUTO,0,2,1,0\n';
    };
  }
  content += file_footer;
  file_name += '.txt'
  download_file(file_name, content);
  event.preventDefault();
};
