const body = document.getElementById("newsBody");
const search = document.getElementById("searchBar");
const errorMessage = document.getElementById("error");
const resetButton = document.getElementById("button");

async function fetchNews(value) {
	try {
		let response = await fetch(
			`https://newsapi.org/v2/everything?q=${value}&from=2023-08-1&sortBy=popularity&apiKey=3fc3482200ca420dace9c853f28540a9`
		);
		let data = await response.json();
		console.log(data.articles);
		return data.articles;
	} catch (error) {
		console.log(error);
		return null;
	}
}

async function main(value) {
	 news = await fetchNews(value);
	if (news != null) {
		for (let i in news) {
			const news_element = document.createElement("div");
			const list = [
				"news",
				"col-lg-3",
				"col-md-6",
				"col-sm-12",
				"d-flex",
				"justify-content-center",
				"align-items-center",
				"flex-column",
			];
			news_element.classList.add(...list);
			news.forEach(() => {
				news_element.innerHTML = `
         <div class="image">
  <img src=${news[i].urlToImage} alt="image" draggable="false" />
</div>
<p class="source"><strong>Source: ${news[i].source.name}</strong></p>
<p class="title">
${news[i].title}
</p>
<body class="body">
${news[i].content}
</body>
<a href="<p>${news[i].url}</p>
">Countinue reading</a>
         `;
				body.appendChild(news_element);
			});
		}
	} else {
		errorMessage.style.opacity = "1";
	}
}

window.addEventListener("keydown", (e) => {
	word = e.target.value;
	if (e.keycode === 13 || e.key === "Enter") {
		main(word);
	}
});
resetButton.addEventListener("click", (e) => {
	location.reload();
  search.value = ''
});
