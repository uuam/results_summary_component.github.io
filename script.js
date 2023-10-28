const summary = document.querySelectorAll(".summary");
const summaryList = document.querySelector(".summary-list");
const score = document.querySelector(".score");
const contiune = document.querySelector("button");

async function fetchData() {
  try {
    const promise = await fetch("./data.json");
    if (!promise.ok) {
      throw new Error('Network response was not ok"');
    }
    const data = promise.json();
    return data;
  } catch (error) {
    console.log("error message:", error);
    return null;
  }
}
let calcScore = [];
let averageScore = 0;
fetchData().then((data) => {
  data.forEach((item) => {
    const itemInner = document.createElement("div");
    itemInner.classList.add(`summary-item`);
    itemInner.classList.add(`${item.category.toLowerCase()}`);
    itemInner.innerHTML = `
    <div class="title">
      <img src="${item.icon}" />
      <p class="title">${item.category}</p>
    </div>
    <div class="precent">
      <span>${item.score}</span>
      <span> / 100</span>
  </div>`;
    summaryList.append(itemInner);
    calcScore.push(item.score);
  });
  const sum = calcScore.reduce((a, b) => a + b, 0);
  averageScore = Math.round(sum / data.length);
});

contiune.addEventListener("click", (e) => {
  e.preventDefault();
  let currentNumber = 0;
  const interval = setInterval(() => {
    currentNumber += 1;
    score.classList.add('bounce')
    setTimeout(() => score.classList.remove('bounce'),40);
    score.textContent = `${currentNumber}`.padStart(2,0);
    if(currentNumber>= averageScore) {
      clearInterval(interval)}
  }, 20);
});
