function getColors() {
    return ['#e6ccb3', '#dfbf9f', '#d9b38c', '#d2a679', '#cc9966', '#c68c53'];
}

function getFillColor() {
    var colors = getColors();
    return colors[Math.floor(Math.random() * Math.floor(colors.length))];
}

function getNextStart(max, lastStart) {
    var value = 0;
    if (Math.random() >= 0.5) {
        value = lastStart + Math.floor(Math.random() * Math.floor(max));
    } else {
        value = lastStart - Math.floor(Math.random() * Math.floor(max));
    }
    return value;
} 

function generateStarts(maxOverlap, tileWidth, floorWidth) {
    // default to one full tile at the start.
    var startPositions = [0];

    // Generate start positions until you reach the width of the room
    for(i=tileWidth; i<floorWidth; i+=tileWidth) {
        var lastStart = startPositions[startPositions.length-1];
        var ns = getNextStart(maxOverlap, lastStart);
        if (maxOverlap > 0) {
            while (ns == lastStart) {
                ns = getNextStart(maxOverlap, lastStart);
            }
        }
        startPositions.push(ns);
    }
    return startPositions;
}    

function generateTiles(w, h, fw, fh, offset) {
    var maxOverlap = h / 3.0;
    if (!offset) {
        maxOverlap = 0;
    }
    var startPositions = generateStarts(maxOverlap, w, fw);
    var tiles = []
    for(i=0; i<startPositions.length; i++) {
        for(j=0; j<fh; j+=h) {
            var color = getFillColor();
            var tile = {x1: i*w, 
                        y1: startPositions[i] + j,
                        c: color,
                        w: w,
                        h: h};
            tiles.push(tile);
        }
    }
    return tiles;
}

function renderTiles(ctx, tiles) {
    for(var i=0; i<tiles.length; i++) {
        ctx.fillStyle = tiles[i].c;
        ctx.fillRect(tiles[i].x1, tiles[i].y1, tiles[i].w, tiles[i].h);

        ctx.lineWidth="1";
        ctx.strokeStyle=getColors()[2];
        ctx.rect(tiles[i].x1, tiles[i].y1, tiles[i].w, tiles[i].h);
        ctx.stroke();
    }
}

// var c = document.getElementById('myCanvas');
// var ctx = c.getContext('2d');
// var w = 8;
// var h = 48;
// var cw = c.width;
// var ch = c.height;

// var tiles = generateTiles(w, h, cw, ch);
// renderTiles(ctx, tiles);
