photos = gallery.photos;
pics = document.getElementById('links')
picture = []
pictureLink = []

for (let i = 0; i < photos.length; i++) {

    pictureLink[i] = document.createElement("a")
    pictureLink[i].setAttribute("href", photos[i].source)
    pictureLink[i].setAttribute("title", photos[i].name)
    pictureLink[i].setAttribute("data-description", photos[i].description)
    picture[i] = document.createElement("img")
    picture[i].setAttribute("height", "200px")
    picture[i].setAttribute("src", photos[i].source)
    picture[i].setAttribute("alt", photos[i].title)

    pictureLink[i].appendChild(picture[i])
    pics.appendChild(pictureLink[i])

}

document.getElementById('links').onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {
            index: link, event: event,
            onslide: function (index, slide) {

                self = this;
                var initializeAdditional = function (index, data, klass, self) {
                    var text = self.list[index].getAttribute(data),
                        node = self.container.find(klass);
                    node.empty();
                    if (text) {
                        node[0].appendChild(document.createTextNode(text));
                    }
                };
                initializeAdditional(index, 'data-description', '.description', self);
            }
        },
        links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
};




search = document.getElementById('search');
search.addEventListener('input',function (event){
    filter(search.value);
})

function filter(input){
    for (let i = 0; i < photos.length; i++) {

        if(photos[i].name.includes(input) || photos[i].title.includes(input) || photos[i].description.includes(input)) {
            pictureLink[i].style.display = "inline-block";
        }else{
            pictureLink[i].style.display = "none";
        }}
}