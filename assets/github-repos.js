document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".repo-container");
  container.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      "https://api.github.com/search/repositories?q=shopify&per_page=12"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const data = await response.json();
    container.innerHTML = "";

    if (container) {
      data.items.forEach((repo) => {
        const hasWiki = repo.has_wiki
          ? `<span class="repo-badge">WIKI</span>`
          : "";
        container.innerHTML += `
            <a href="${repo.html_url}" target="_blank" class="repo-card-link">
              <div class="repo-card">
                ${hasWiki}
                <img src="${repo.owner.avatar_url}" alt="${repo.owner.login}'s avatar" class="repo-avatar" />
                <div class="repo-card-content">
                  <div class="repo-card-title">${repo.name}</div>
                  <div class="repo-card-description">${repo.full_name}</div>
                 </div>
              </div>
            </a>
          `;
      });
    } else {
      console.error("Container element not found");
    }
  } catch (error) {
    container.innerHTML = "<p>Failed to load repositories.</p>";
    console.error("Error when searching for data:", error);
  }
});
