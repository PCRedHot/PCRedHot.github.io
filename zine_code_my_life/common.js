window.addEventListener('load', function () {
    const collection = document.getElementsByClassName("gist-meta");
    for (let i = 0; i < collection.length; i++) collection[i].remove()
})

function searchByFunctionName(searchText) {
    const spanCollections = document.getElementsByTagName("span");
    var found;

    for (var i = 0; i < spanCollections.length; i++) {
        if (spanCollections[i].textContent == searchText) {
            found = spanCollections[i];
            break;
        }
    }

    return found;
}