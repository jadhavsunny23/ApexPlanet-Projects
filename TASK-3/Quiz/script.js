document.getElementById("submitBtn").addEventListener("click", function() {

    
  const color = document.querySelector('input[name="color"]:checked');
  const sport = document.querySelector('input[name="sport"]:checked');
  const language = document.querySelector('input[name="language"]:checked');
  const movies = document.querySelector('input[name="movies"]:checked');
  const season = document.querySelector('input[name="season"]:checked');


  if (!color || !sport || !language || !movies || !season) {
    alert("Please answer all questions before submitting!");
    return;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h4>Your Selected Answers:</h4>
    <p>Favourite Color:</strong> ${color.value}</p>
    <p>Favourite Sport:</strong> ${sport.value}</p>
    <p>Favourite Language:</strong> ${language.value}</p>
    <p>Favourite Movie Type:</strong> ${movies.value}</p>
    <p>Favourite Season:</strong> ${season.value}</p>
  `;
});
