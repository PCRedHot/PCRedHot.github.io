window.addEventListener('load', function () {
    const collection = document.getElementsByClassName("gist-meta");
    for (let i = 0; i < collection.length; i++) collection[i].remove()
})

function searchByFunctionName(searchText) {
    const tags = ['span']

    var found;

    tags.forEach(tag => {
        if (found != null) return;

        const collection =  document.getElementsByTagName(tag);
        for (var i = 0; i < collection.length; i++) {
            if (collection[i].textContent == searchText) {
                found = collection[i];
                break;
            }
        }
    })

    return found;
}