// Select the div with a class of "user-data"
const userDataDiv = document.querySelector('.user-data');
const username = "mrithwik";

// Fetch user data from the GitHub API
const fetchUserData = async function () {
    const responseJson = await fetch(`https://api.github.com/users/${username}`);
    const userData = await responseJson.json();
    console.log(userData);
    // return userData;
    displayUserData(userData);
};

fetchUserData();

// Fetch and display user information
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
};