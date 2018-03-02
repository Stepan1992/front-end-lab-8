let root = document.getElementById("root");

if (window.location.hash !== "") {
    getTank();
} else {
    previewBuilder();
};

function previewBuilder() {
    let thumbnails = document.createElement("div"),
        header = document.createElement("h1"),
        tanksContainer = document.createElement("div");

    tanksContainer.classList.add("container");
    header.innerText = "Most popular tanks";
    thumbnails.appendChild(header);
    thumbnails.appendChild(tanksContainer);
    root.appendChild(thumbnails);

    for (let i = 0; i < tanks.length; i++) {
        let tankBlock = document.createElement("div"),
            image = document.createElement("img"),
            imgCaption = document.createElement("div"),
            h3 = document.createElement("h3"),
            flag = document.createElement("img");

        tankBlock.classList.add("tank");
        imgCaption.classList.add("caption");
        image.setAttribute("src", tanks[i].preview);
        image.setAttribute("title", "Click to details");
        tankBlock.appendChild(image);

        flag.setAttribute("src", tanks[i].country_image);
        flag.setAttribute("alt", tanks[i].country);
        flag.setAttribute("title", tanks[i].country);
        flag.classList.add("flag");

        imgCaption.appendChild(flag);
        h3.innerHTML = `<span class="level">${tanks[i].level}</span> ${tanks[i].model.toUpperCase()}`;
        h3.setAttribute("title", tanks[i].model);
        imgCaption.appendChild(h3);
        tankBlock.appendChild(imgCaption);
        tanksContainer.appendChild(tankBlock);

        tankBlock.addEventListener("click", function () {
            window.location.hash = encodeURIComponent(tanks[i].model);
            root.removeChild(root.firstChild);
        });
    };
};

function getTank() {
    let model = decodeURI(window.location.hash).slice(1);
    if (root.firstChild) {
        root.removeChild(root.firstChild);
    };
    if (model === "") {
        previewBuilder();
        return;
    };
    let currentTank,
        detailsContainer = document.createElement("div");
    detailsContainer.classList.add("tank-details");
    root.appendChild(detailsContainer);

    for (let i = 0; i < tanks.length; i++) {
        if (tanks[i].model === model) {
            currentTank = tanks[i];
            break;
        };
    };

    let tankNameBox = document.createElement("div"),
        flagBox = document.createElement("div"),
        flagImg = document.createElement("img"),
        tankName = document.createElement("h1"),
        tankPreview = document.createElement("div"),
        tableBlock = document.createElement("div"),
        homeLink = document.createElement("a");

    tankNameBox.classList.add("details-header");
    detailsContainer.appendChild(tankNameBox);
    tankNameBox.appendChild(flagBox);
    flagImg.setAttribute("src", currentTank.country_image);
    flagImg.setAttribute("title", currentTank.country);
    flagBox.appendChild(flagImg);
    tankName.innerHTML = `${currentTank.model.toUpperCase()} (level ${currentTank.level})`;
    tankNameBox.appendChild(tankName);

    tankPreview.classList.add("current-tank-block");
    tankPreview.innerHTML = `<h4>Preview</h4> <img src="${currentTank.preview}" alt="${currentTank.model}">`;
    detailsContainer.appendChild(tankPreview);

    tableBlock.classList.add("details-table");
    tableBlock.innerHTML = `<h4>Characteristic</h4> 
    <table><tr><td>damage</td><td>${currentTank.details.damage}</td></tr>
    <tr><td>breoning</td><td>${currentTank.details.breoning}</td></tr>
    <tr><td>attack speed</td><td>${currentTank.details.attack_speed}</td></tr>
    <tr><td>time of targeting</td><td>${currentTank.details.time_of_targeting}</td></tr>
    <tr><td>ammunition</td><td>${currentTank.details.ammunition}</td></tr>
    </table>`;
    detailsContainer.appendChild(tableBlock);

    homeLink.setAttribute("href", "");
    homeLink.innerText = "Back to list view";
    detailsContainer.appendChild(homeLink);
};

window.addEventListener("hashchange", getTank);