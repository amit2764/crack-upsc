const newsContainer = document.getElementById("news-container");
const qaForm = document.getElementById("qa-form");
const qaList = document.getElementById("qa-list");

async function fetchUPSCNews() {
  try {
    const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.upsc.gov.in/rss.xml");
    const data = await response.json();
    const newsItems = data.items.slice(0, 10);

    newsContainer.innerHTML = newsItems.map(item => `
      <div class="news-item">
        <a href="${item.link}" target="_blank"><strong>${item.title}</strong></a>
        <p>${item.pubDate}</p>
      </div>
    `).join("");
  } catch (error) {
    newsContainer.innerHTML = "<p>Failed to fetch news. Please refresh.</p>";
  }
}

qaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const question = document.getElementById("question").value.trim();
  const answer = document.getElementById("answer").value.trim();

  if (question && answer) {
    const entry = { question, answer, time: new Date().toLocaleString() };
    const oldData = JSON.parse(localStorage.getItem("qaData")) || [];
    oldData.unshift(entry);
    localStorage.setItem("qaData", JSON.stringify(oldData));
    displayQA();
    qaForm.reset();
  }
});

function displayQA() {
  const data = JSON.parse(localStorage.getItem("qaData")) || [];
  qaList.innerHTML = data.map(d => `
    <div class="qa-item">
      <h4>Q: ${d.question}</h4>
      <p><strong>Explanation:</strong> ${d.answer}</p>
      <small>Posted on ${d.time}</small>
    </div>
  `).join("");
}

// Refresh every 10 minutes
setInterval(fetchUPSCNews, 10 * 60 * 1000);

fetchUPSCNews();
displayQA();
