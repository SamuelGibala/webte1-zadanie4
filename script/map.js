const pics = await fetch('./script/photos.json').then(r=>r.json())
// Creating map options
var mapOptions = {
    center: [49.089212, 19.699762],
    zoom: 12
}

// Creating a map object
var map = new L.map('map', mapOptions);

// Creating a Layer object
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

// Adding layer to the map
map.addLayer(layer);

var jsonFeatures = [];

//var pics = photos;

var locations = []
var points = [];

function makeLocations(){

    let bool = false;

    for (let j = 0; j < pics.length; j++) {
        if (j===0){
            locations[0] = {
                pictures: [0],
                x: pics[0].x,
                y: pics[0].y
            }
            points.push([pics[0].x,pics[0].y])
        }else {
            bool = false;
            for (var k = 0; k < locations.length; k++) {
                if (locations[k].x===pics[j].x && locations[k].y===pics[j].y){
                    bool = true;
                    break;
                }
            }
            if(bool===true){
                locations[k].pictures.push(j);
            }else {
                locations.push({
                    pictures: [j],
                    x: pics[j].x,
                    y: pics[j].y
                })
                points.push([pics[j].x,pics[j].y])
            }
        }
    }
}

makeLocations();


var i = 0;
locations.forEach(function(point){
    var lat = parseFloat(point.x);
    var lon = parseFloat(point.y);
    points[i] = L.latLng(point.x,point.y);
    i++;

    var feature = {type: 'Feature',
        properties: {
            num: String(i-1)
        },
        geometry: {
            type: 'Point',
            coordinates: [lon,lat]
        }
    };
    jsonFeatures.push(feature);
});

function makeGallery(num){

    let place = parseInt(num);
    var output = "";

    output = "<div id='links'>";

    for (let j = 0; j < locations[place].pictures.length; j++) {
        let pic = locations[place].pictures[j];

        output = output + "<a href='" + pics[pic].source + "' title='" + pics[pic].name + "' data-description='" + pics[pic].description + "' >";
        output = output + "<img src='" + pics[pic].source + "' width = '100%'>";
        output = output + "</a>";
    }

    output = output + "</div> ";
    return output;

}

var geoJson = { type: 'FeatureCollection', features: jsonFeatures };
layer = L.geoJson(geoJson,{
    onEachFeature: function (feature, layer) {
        layer.bindPopup(makeGallery(feature.properties.num));
    }
}).addTo(map);

var button = document.getElementById('trasa');

var clicked = false;

button.addEventListener('click',function (){
    if (!clicked) {
        var route = L.Routing.control({
            waypoints: points
        })
        route.addTo(map);
        clicked = true;
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
})
