function generateSiteCard(github_url, index, name, description, url, thumbnail, techstackid) {
    return `
<div>
    <a href="${url}"><h2>${index}. ${name}</h2></a>
    <img src="${thumbnail}" alt="${name} view">
    <div class="techstackcontainer" id="${techstackid}"></div>
    <p>${description}</p>
    <a class="checkongithub" href="${github_url}">Check on github</a>
</div>
`
}
async function generateTechstack(containerId, languageUrl) {
    const techstack = await (await fetch(languageUrl)).json()
    const techstackcontainer = document.getElementById(containerId)
    Object.keys(techstack).forEach((techstackstr) => {
        techstackcontainer.innerHTML += `<span>${techstackstr}</span>`
    })
}
async function init() {

    const repos = await (await fetch("https://api.github.com/users/febri-i/repos")).json()
    const visitable = repos.filter(repoInfo => {
        return repoInfo.homepage && !repoInfo.homepage.includes("github.com") && !repoInfo.homepage.includes("mercusuar")
    }).map(repoInfo => {
        return {
            url: repoInfo.homepage,
            github_url: repoInfo.html_url,
            name: repoInfo.name,
            description: repoInfo.description,
            languageUrl: repoInfo.languages_url,
            thumbnail: `https://raw.githubusercontent.com/Febri-i/${repoInfo.name}/main/thumbnail.png`
        };
    })
    const container = document.getElementById("stuffContainer");
    visitable.forEach((repoInfo, i) => {
        const techstackid = "techstack" + i;
        container.innerHTML += generateSiteCard(repoInfo.github_url, i + 1, repoInfo.name, repoInfo.description, repoInfo.url, repoInfo.thumbnail, techstackid)
        generateTechstack(techstackid, repoInfo.languageUrl)
    })
}

init();
