document.getElementById('add-course').addEventListener('click', addCourse);
document.getElementById('calculate-gpa').addEventListener('click', calculateGPA);
document.getElementById('reset').addEventListener('click', resetCalculator);
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-row')) {
    event.target.parentElement.parentElement.remove();
  }
});

function addCourse() {
  const courseBody = document.getElementById('course-body');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><input type="checkbox" class="course-check"></td>
    <td><input type="text" class="course-name" placeholder="Course"></td>
    <td>
      <select class="grade">
        <option value="">--</option>
        <option value="4.3">A+</option>
        <option value="4.0">A</option>
        <option value="3.7">A-</option>
        <option value="3.3">B+</option>
        <option value="3.0">B</option>
        <option value="2.7">B-</option>
        <option value="2.3">C+</option>
        <option value="2.0">C</option>
        <option value="1.7">C-</option>
        <option value="1.0">D</option>
        <option value="0.7">D-</option>
        <option value="0.0">F</option>
      </select>
    </td>
    <td><input type="number" class="credits" placeholder="Credits"></td>
    <td><button class="remove-row">✖</button></td>
  `;
  courseBody.appendChild(newRow);
}

function calculateGPA() {
  const courseRows = document.querySelectorAll('#course-body tr');
  let totalCredits = 0;
  let weightedGradePoints = 0;

  courseRows.forEach(row => {
    const isChecked = row.querySelector('.course-check').checked;
    const gradeValue = parseFloat(row.querySelector('.grade').value);
    const creditValue = parseFloat(row.querySelector('.credits').value);

    if (isChecked && !isNaN(gradeValue) && !isNaN(creditValue)) {
      totalCredits += creditValue;
      weightedGradePoints += gradeValue * creditValue;
    }
  });

  const gpa = weightedGradePoints / totalCredits;
  document.getElementById('gpa-result').innerText = isNaN(gpa) ? "* Please enter valid inputs" : gpa.toFixed(2);
}

function resetCalculator() {
  document.getElementById('course-body').innerHTML = `
    <tr>
      <td><input type="checkbox" class="course-check"></td>
      <td><input type="text" class="course-name" placeholder="Course"></td>
      <td>
        <select class="grade">
          <option value="">--</option>
          <option value="4.3">A+</option>
          <option value="4.0">A</option>
          <option value="3.7">A-</option>
          <option value="3.3">B+</option>
          <option value="3.0">B</option>
          <option value="2.7">B-</option>
          <option value="2.3">C+</option>
          <option value="2.0">C</option>
          <option value="1.7">C-</option>
          <option value="1.0">D</option>
          <option value="0.7">D-</option>
          <option value="0.0">F</option>
        </select>
      </td>
      <td><input type="number" class="credits" placeholder="Credits"></td>
      <td><button class="remove-row">✖</button></td>
    </tr>
  `;
  document.getElementById('gpa-result').innerText = "* Please click 'Calculate' to see result";
}
