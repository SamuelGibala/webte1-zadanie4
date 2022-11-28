photos = gallery.photos;
pics = document.getElementById('links')
picture = []
pictureLink = []

for (let i=0; i<photos.length; i++) {

    pictureLink[i] = document.createElement("a")
    pictureLink[i].setAttribute("href",photos[i].source)
    pictureLink[i].setAttribute("title",photos[i].name)
    pictureLink[i].setAttribute("data-description",photos[i].description)
    picture[i] = document.createElement("img")
    picture[i].setAttribute("height","200px")
    picture[i].setAttribute("src",photos[i].source)
    picture[i].setAttribute("alt",photos[i].title)

    pictureLink[i].appendChild(picture[i])
    pics.appendChild(pictureLink[i])
}