c = document.getElementById('canv');
c.width = window.innerWidth;
c.height = window.innerHeight;
$ = c.getContext('2d');
var msX = 0;
var msY = 0;
var _x = 0;
var _y = 0;
var u = 0;

window.addEventListener('touchmove', function(e) {
    _x = e.touches[0].pageX;
    _y = e.touches[0].pageY;

    if (_x < 0) {
        _x = 0;
    }
    if (_y < 0) {
        _y = 0;
    }

    msX = _x;
    msY = _y;
    return true;
}, false);

window.addEventListener('mousemove', function(e) {
    _x = e.pageX;
    _y = e.pageY;

    if (_x < 0) {
        _x = 0;
    }
    if (_y < 0) {
        _y = 0;
    }

    msX = _x;
    msY = _y;
    return true;
}, false);

var _tick = 0;
var _rotX = 0;
var _rotY = 0;
var _sp = 0.08;
var _sc = 0.3;
var _obj = [];
var g;

//primary center [ obj 0 ]
_obj.push({
    name: "primary",
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    z: 0,
    prime: null,
    sc: 1,
    rad: 180,
    rotX: 0,
    rotY: 0,
    n: _tick++
});

//tiny inner orbiter [ obj 1 ]
_obj.push({
    name: "orbital",
    x: 0,
    y: 0,
    z: 0,
    rad: 15,
    prime: _obj[0],
    dist: 40,
    rotX: Math.PI * 2 / 7 * 0,
    rotY: 0,
    spX: 365 / 88,
    spY: 0,
    n: _tick++
});

//tiny inner orbiter [ obj 2 ]
_obj.push({
    name: "orbital",
    x: 0,
    y: 0,
    z: 0,
    rad: 25,
    prime: _obj[0],
    dist: 60,
    rotX: Math.PI * 2 / 7 * 1,
    rotY: 0,
    spX: 365 / 365,
    spY: 0,
    n: _tick++
});

//tiny inner orbiter [ obj 3 ] 
_obj.push({
    name: "orbital",
    x: 0,
    y: 0,
    z: 0,
    rad: 25,
    prime: _obj[0],
    dist: 110,
    rotX: Math.PI * 2 / 7 * 2,
    rotY: 0,
    spX: 365 / 203,
    spY: 0,
    n: _tick++
});

//tiny inner orbiter [ obj 4 ]
_obj.push({
    name: "orbital",
    x: 0,
    y: 0,
    z: 0,
    rad: 35,
    prime: _obj[0],
    dist: 150,
    rotX: Math.PI * 2 / 7 * 3,
    rotY: 0,
    spX: 365 / 687,
    spY: 0,
    n: _tick++
});
// [ obj 5 ]
_obj.push({
    name: "orbital",
    x: 0,
    y: 0,
    z: 0,
    rad: 60,
    prime: _obj[0],
    dist: 190,
    rotX: Math.PI * 2 / 7 * 4,
    rotY: 0,
    spX: 1 / 11.86,
    spY: 0,
    n: _tick++
});

// [ obj 6 ]
_obj.push({
    name: "orbital",
    x: 0,
    y: 0,
    z: 0,
    rad: 90,
    prime: _obj[0],
    dist: 440,
    rotX: Math.PI * 2 / 7 * 5,
    rotY: 0,
    spX: 29.46 / 365,
    spY: 0,
    n: _tick++
});

//[ obj 7 ]
_obj.push({
    name: "orbital",
    x: 0,
    y: 0,
    z: 0,
    rad: 130,
    prime: _obj[0],
    dist: 600,
    rotX: Math.PI * 2 / 7 * 6,
    rotY: 0,
    spX: 1 / 84.07,
    spY: 0,
    n: _tick++
});

// [ obj 8 ]
_obj.push({
    name: "orbital",
    x: 0,
    y: 0,
    z: 0,
    rad: 60,
    prime: _obj[0],
    dist: 780,
    rotX: Math.PI * 2 / 7 * 7,
    rotY: 0,
    spX: 1 / 164.8,
    spY: 0,
    n: _tick++
});

//tiny orbiter of obj 3
_obj.push({
    name: "orbital",
    x: 0,
    y: 0,
    z: 0,
    rad: 8,
    prime: _obj[3],
    dist: 30,
    rotX: Math.PI * 2 / 7 * 1,
    rotY: 0,
    spX: 365 / 97,
    spY: 0,
    n: _tick++
});

//obj 7 ring
for (i = 0; i < 25; i++) {
    _obj.push({
        x: 0,
        y: 0,
        z: 0,
        rad: Math.random() * 8,
        prime: _obj[7],
        dist: 40 + 10 * Math.random(),
        col: "hsla(255, 255%, 255%, 1)",
        rotX: Math.PI * 2 * Math.random(),
        rotY: 0.1 * Math.random(),
        spX: 0.1 + 0.1 * Math.random(),
        spY: 0.00 * Math.random(),
        n: _tick++
    });
}

//obj 6 ring
for (i = 0; i < 50; i++) {
    _obj.push({
        x: 0,
        y: 0,
        z: 0,
        rad: 3,
        prime: _obj[6],
        dist: 20 + 5 * Math.random(),
        col: "hsla(40, 95%, 65%, 1)",
        rotX: Math.PI * 2 * (i / 69),
        rotY: 0,
        spX: 0.2 + 0.4 * Math.random(),
        spY: 0 * Math.random(),
        n: _tick++
    });
}
for (i = 0; i < 50; i++) {
    _obj.push({
        x: 0,
        y: 0,
        z: 0,
        rad: 3,
        prime: _obj[6],
        dist: 20 + 5 * Math.random(),
        col: "hsla(40, 95%, 95%, 1)",
        rotX: 0,
        rotY: Math.PI * 2 * (i / 69),
        spX: 0.2 + 0.4 * Math.random(),
        spY: 0 * Math.random(),
        n: _tick++
    });
}
//innermost ring around center [ obj 0 ]
for (i = 0; i < 30; i++) {
    _obj.push({
        x: 0,
        y: 0,
        z: 0,
        rad: 10,
        prime: _obj[0],
        dist: 30 + 20 * Math.random(),
        col: 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 130) + ',' + Math.floor(Math.random() * 255) + ')',
        rotX: Math.PI * 2 * Math.random(),
        rotY: 0.1 * Math.random(),
        spX: 0.1 + 0.1 * Math.random(),
        spY: 0.00 * Math.random(),
        n: _tick++
    });
}
//outer sphere
for (i = 0; i < 1400; i++) {
    _obj.push({
        x: 0,
        y: 0,
        z: 0,
        rad: Math.random() * 12,
        prime: _obj[0],
        dist: 80 + 1300 * Math.random(),
        col: 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 130) + ',' + Math.floor(Math.random() * 255) + ')',
        rotX: Math.PI * 2 * Math.random(),
        rotY: Math.random() * 0.4,
        spX: 0.05 + 0.2 - 0.2 * Math.random(),
        spY: 0.001 * Math.random(),
        n: _tick++
    });
}

function orbit() {
    $.fillStyle = 'hsla(247, 15%, 5%, .95)';
    $.fillRect(0, 0, c.width, c.height);
    $.fill();
    calc();
    for (i in _obj) {
        draw(_obj[i]);
        u -= .5;
    }
}

function draw(o) {

    if (o.name == "primary") {
        g = $.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.rad);
        g.addColorStop(0, "hsla(255,255%,255%,1)");
        g.addColorStop(1, "hsla(0, 95%, 35%, 1)");
        $.beginPath();
        $.fillStyle = g;
        $.arc(o.x, o.y, o.rad * o.sc * _sc, 0, Math.PI * 2, false);
        $.closePath();
        $.fill();
    }
    if (o.name == "orbital") {
        g = $.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.rad);
        g.addColorStop(0, "hsla(255,255%,255%,1)");
        g.addColorStop(1, "hsla(" + u % 200 + ", 90%, 50%, 1)");
        $.beginPath();
        $.fillStyle = g;
        $.arc(o.x, o.y, o.rad * o.sc * _sc, 0, Math.PI * 2, false);
        $.closePath();
        $.fill();
    } else {
        $.fillStyle = o.col;
        $.beginPath();
        $.arc(o.x, o.y, o.rad * o.sc * _sc, 0, Math.PI * 2, false);
        $.closePath();
        $.fill();
    }
}

function calc() {
    _obj.sort(n_sort);

    var dx = (msY / 60 - _rotY);
    var dy = (msX / 60 - _rotX);
    _rotY += dx / 10;
    _rotX += dy / 10;

    _obj[0].x = window.innerWidth / 2 + dx;
    _obj[0].y = window.innerHeight / 2 + dy;

    for (var i in _obj) {
        _obj[i].rotX += _obj[i].spX * _sp;
        _obj[i].rotY += _obj[i].spY * _sp;

        if (_obj[i].name != "primary") {
            _obj[i].z = _obj[i].prime.z - Math.sin(_rotY + _obj[i].rotY) * _obj[i].dist * Math.sin(_rotX + _obj[i].rotX + Math.PI / 2) * _sc;
            _obj[i].sc = 1 + (_obj[i].z / 450);

            _obj[i].x = _obj[i].prime.x + Math.sin(_rotX + _obj[i].rotX) * (_obj[i].dist + _obj[i].prime.rad) * _obj[i].sc * _sc;
            _obj[i].y = _obj[i].prime.y + Math.cos(_rotX + _obj[i].rotX) * (_obj[i].dist + _obj[i].prime.rad) * Math.cos(_rotY + _obj[i].rotY) * _obj[i].sc * _sc;
        } else {
            _obj[i].sc = 1 + _obj[i].z / 50000;
        }
    }
    _obj.sort(z_sort);
}

function n() {
    return '' + this.n;
}

function z() {
    return '' + this.z;
}

function n_sort(a, b) {
    return a.n - b.n;
}

function z_sort(a, b) {
    return a.z - b.z;
}

window.addEventListener('resize', function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}, false);

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

run();

function run() {
    window.requestAnimFrame(run);
    orbit();
}