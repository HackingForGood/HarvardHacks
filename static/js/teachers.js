var heatmap = false;

window.onload = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            configure(user);
            show_classroom();
        } else {
            window.location = Flask.url_for('index');
        }
    });
}

function configure(user) {
    var uid = user.uid;

    // get the classes
    var classes = firebase.database().ref('classes/' + uid).orderByChild('name');
}

function show_classroom() {
    var classroom = new Classroom({
        'identifier': '#classroom',
    });
    classroom.draw();

    var students = [
        {
            'name': 'Sarah',
            'img': 'http://brianyuweb.com/img/students/student1.png'
        },
        {
            'name': 'Stephanie',
            'img': 'http://brianyuweb.com/img/students/student2.png'
        },
        {
            'name': 'Andy',
            'img': 'http://brianyuweb.com/img/students/student3.png'
        },
        {
            'name': 'Rachel',
            'img': 'http://brianyuweb.com/img/students/student4.png'
        },
        {
            'name': 'Kyle',
            'img': 'http://brianyuweb.com/img/students/student5.png'
        },
        {
            'name': 'Jodi',
            'img': 'http://brianyuweb.com/img/students/student6.png'
        },
        {
            'name': 'Kevin',
            'img': 'http://brianyuweb.com/img/students/student7.png'
        }
    ];
    for (var i = 0; i < students.length; i++) {

        // add student to classroom 
        classroom.add_student({
            'name': students[i]['name'],
            'img': students[i]['img'],
            'svg': classroom.svg,
            'index': i,
            'imageLayer': classroom.imageLayer,
            'overlayLayer': classroom.overlayLayer
        });

        // add student to table
        var table = $('#time-table');
        table.html(table.html() +
                "<tr>" + 
                "<td>" + students[i]['name'] + "</td>" + 
                "<td id='time-table-" + i + "'>0.00 s</td>" + 
                "</tr>");
    }

    $(document).keydown(function(evt) {
        if (evt.keyCode == 32) {
            // space down
            evt.preventDefault();
            if (heatmap)
                return;
            heatmap = true;
            
            // show heatmap
            classroom.show_heatmap();
        }
    });
    $(document).keyup(function(evt) {
        if (evt.keyCode == 32) {
            heatmap = false;
            // show heatmap
            for (var i = 0; i < classroom.students.length; i++) {
                classroom.students[i].remove_overlay();
            }
        }
    });
}

var Classroom = function(opts) {
    this.identifier = opts.identifier;
    this.students = [];
    this.width = window.innerWidth;
    this.height = 375;
}

Classroom.prototype.draw = function() {
    var canvas = d3.select(this.identifier);
    canvas.selectAll('*').remove();
    this.svg = canvas.append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .classed('svg', true);
    this.imageLayer = this.svg.append('g');
    this.overlayLayer = this.svg.append('g');
}

Classroom.prototype.add_student = function(opts) {
    var student = new Student(opts);
    this.students.push(student);
    student.draw();
}

Classroom.prototype.show_heatmap = function() {
    var data = [];
    for (var i = 0; i < this.students.length; i++) {
        data.push({
            'id': i,
            'time': this.students[i].total_time,
            'student': this.students[i]
        });
    }
    data.sort(function(x, y) {
        return x['time'] < y['time'];
    });
    for (var i = 0; i < data.length; i++) {
        var talk_status;
        if (i < this.students.length / 3)
            talk_status = -1; // talked the most, don't call on them
        else if (i > 2 * this.students.length / 3)
            talk_status = 1; // talked the least, call on them
        else
            talk_status = 0; // talked an average amount
        data[i]['student'].show_overlay(talk_status);
    }
}

var Student = function(opts) {
    this.name = opts.name;
    this.img = opts.img;
    this.index = opts.index;
    this.svg = opts.svg;
    this.imageLayer = opts.imageLayer;
    this.overlayLayer = opts.overlayLayer;
    this.x = Math.floor(Math.random() * 500) + 100;
    this.y = Math.floor(Math.random() * 300) + 50;
    this.radius = 45;
    this.speaking = null;
    this.total_time = 0;
    this.svg = opts.svg;
}

Student.prototype.draw = function() {
    var _this = this;
    this.box = this.imageLayer.append('image')
        .attr('href', this.img)
        .attr('x', this.x - this.radius)
        .attr('y', this.y - this.radius)
        .attr('width', this.radius * 2)
        .attr('height', this.radius * 2)
        .on('click', function() {
            _this.toggle_speaking();
        })
        .call(d3.drag()
        .on('drag', function() {
            _this.drag(d3.event.x, d3.event.y);
        }));
}

Student.prototype.drag = function(x, y) {
    this.x = x;
    this.y = y;
    this.box.attr('x', this.x - this.radius);
    this.box.attr('y', this.y - this.radius);
}

Student.prototype.show_overlay = function(val) {
    _this = this;
    var color = 'white';
    if (val == 1)
        color = 'green';
    else if (val == 0)
        color = 'yellow';
    else
        color = 'red';

    this.overlay = this.overlayLayer.append('circle')
        .attr('cx', this.x)
        .attr('cy', this.y)
        .attr('r', this.radius)
        .attr('fill', color)
        .attr('fill-opacity', 0.0);
    this.overlay.transition()
        .duration(500)
        .attr('fill-opacity', 0.67);
}

Student.prototype.remove_overlay = function() {
    if (this.overlay !== undefined)
        this.overlay.remove();
}

var speakInterval = null;
Student.prototype.toggle_speaking = function() {
    _this = this;
    if (this.speaking === null) {
        // start speaking
        this.speaking = Date.now();
        speakInterval = setInterval(function() {
            _this.total_time += 0.01;
            $('#time-table-' + _this.index).html(time_format(_this.total_time));
        }, 10);

        this.box.transition()
            .duration(500)
            .attr('x', this.x - this.radius - 10)
            .attr('y', this.y - this.radius - 10)
            .attr('width', this.radius * 2 + 20)
            .attr('height', this.radius * 2 + 20); 
    } else {
        // done speaking
        this.box.transition()
            .duration(500)
            .attr('x', this.x - this.radius)
            .attr('y', this.y - this.radius)
            .attr('width', this.radius * 2)
            .attr('height', this.radius * 2);
        clearInterval(speakInterval);

        var time = Date.now() - this.speaking;
        this.speaking = null;
    }
}

function time_format(t) {
    return parseFloat(t).toFixed(2) + ' s';
}
