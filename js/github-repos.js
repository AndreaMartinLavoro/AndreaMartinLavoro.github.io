const GITHUB_USERNAME = "AndreaMartinLavoro";

async function loadRepos(){
  const container = document.getElementById("repos");

  try{
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    if(!response.ok) throw new Error();

    let repos = await response.json();

    repos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    container.innerHTML = "";

    repos.forEach(repo => {
      const updated = new Date(repo.updated_at).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });

      const card = document.createElement("a");
      card.className = "card card-link";
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener";

      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = repo.language ?? "N/D";

      const title = document.createElement("h3");
      title.textContent = repo.name;

      const desc = document.createElement("p");
      desc.textContent = repo.description ?? "Nessuna descrizione disponibile.";

      const meta = document.createElement("div");
      meta.className = "repo-meta";
      meta.innerHTML = `<span>★ ${repo.stargazers_count}</span><span>Aggiornato: ${updated}</span>`;

      card.append(tag, title, desc, meta);
      container.appendChild(card);
    });

    if(repos.length === 0){
      container.innerHTML = "<div class='repo-status'>Nessuna repository pubblica trovata.</div>";
    }
  }catch(e){
    container.innerHTML = "<div class='repo-status'>Impossibile recuperare le repository da GitHub.</div>";
  }
}

loadRepos();
