// Select the div with a class of "user-data"
const userDataDiv = document.querySelector('.user-data');
const username = "mrithwik";

const userRepoDiv = document.querySelector('.repo-list');

const reposClass = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

// Fetch user data from the GitHub API
const fetchUserData = async function () {
    const responseJson = await fetch(`https://api.github.com/users/${username}`);
    const userData = await responseJson.json();
    console.log(userData);
    // return userData;
    displayUserData(userData);
};

fetchUserData();

// Display the fetched user information
const displayUserData = function (userData) {
    const userInfoClass = document.createElement("div");
    userInfoClass.classList.add("user-info");
    userInfoClass.innerHTML = `
    <figure>
      <img alt="user avatar" src=${userData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Bio:</strong> ${userData.bio}</p>
      <p><strong>Location:</strong> ${userData.location}</p>
      <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div>
    `;
    userDataDiv.append(userInfoClass);
    fetchUserRepos();
};

// Fetch user repos
const fetchUserRepos = async function () {
    const responseJson = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const userRepos = await responseJson.json();
    console.log(userRepos);
    displayUserRepos(userRepos);
};

// Display the fetched user repos
const displayUserRepos = function (repos) {
    // For each repo create a list element which has a button element
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");

        // add button using appendChild
        const button = document.createElement("button");
        button.classList.add("repo-name");
        button.textContent = repo.name;
        li.appendChild(button);

        // add button with html manually
        // li.innerHTML = `<button type="button" class="repo-name">${repo.name}</button>`;

        // console.log(li);
        userRepoDiv.append(li);
    };
};

userRepoDiv.addEventListener("click", function (e) {
    if (e.target.matches(".repo-name")) {
        const repoName = e.target.innerText;
        fetchRepoInfo(repoName);
    };
});

const fetchRepoInfo = async function (repoName) {
    const repoInfoJson = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoInfoJson.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    let languages = [];
    for (const language in languageData) {
        languages.push(language);
    };
    console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("repo-info");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
    repoData.classList.remove("hide");
    reposClass.classList.add("hide");
};

