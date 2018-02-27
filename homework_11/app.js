var rootNode = document.getElementById("root");

let list = document.createElement("ul");

function treeBuilder(array, list) {
    for (let i = 0; i < array.length; i++) {
        let hasChildrenProperty = 'children' in array[i],
            li = document.createElement("li"),
            span = document.createElement("span"),
            iElem = document.createElement("i"),
            textNode = document.createTextNode(array[i].title);
        iElem.classList.add("material-icons");
        if (array[i].folder) {
            iElem.innerHTML = "folder";
            iElem.classList.add("golden-icon");
        } else {
            iElem.innerHTML = "insert_drive_file";
            iElem.classList.add("gray-icon");
        };
        span.appendChild(iElem);
        span.appendChild(textNode);
        li.appendChild(span);
        list.appendChild(li);

        function addEvent(element){
            element.firstElementChild.addEventListener("click", function (event) {
                if (getComputedStyle(this.nextElementSibling).display === "none") {
                    this.nextElementSibling.style.display = "block";
                    this.firstElementChild.innerHTML = "folder_open";
                } else {
                    this.nextElementSibling.style.display = "none";
                    this.firstElementChild.innerHTML = "folder";
                };
                event.stopPropagation();
            }, false);
        };

        if (array[i].folder && hasChildrenProperty && !array[i].children) {
            let span = document.createElement("span"),
                textNode = document.createTextNode("Folder is empty");
            span.appendChild(textNode);
            span.style.fontStyle = "italic";
            span.style.display = "none";
            li.appendChild(span);
            addEvent(li);
        };

        if (array[i].folder && array[i].children) {
            let ul = document.createElement("ul");
            li.appendChild(ul);
            treeBuilder(array[i].children, ul);
            if (li.children.length !== 0) {
                li.lastElementChild.style.display = "none";
            };
            addEvent(li);
        };
    };
};
treeBuilder(structure, list);

rootNode.appendChild(list);