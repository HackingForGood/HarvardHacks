var feedback;

function feedback_load() {
    feedback_setup();
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    socket.on('no', function() {
        console.log('no');
        feedback.new_vote(0);
    });
    socket.on('yes', function() {
        console.log('yes');
        feedback.new_vote(1);
    });
}

function feedback_setup() {
    feedback = new Feedback({
        'identifier': '#feedback-area'
    });
    feedback.draw();
}

var Feedback = function(opts) {
    this.identifier = opts.identifier;
    this.width = window.innerWidth;
    this.height = 400;
}

Feedback.prototype.draw = function() {
    var canvas = d3.select(this.identifier);
    canvas.selectAll('*').remove();
    this.svg = canvas.append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .classed('svg', true);
}

Feedback.prototype.new_vote = function(vote) {
    var img;
    if (vote == 1)
        img = Flask.url_for('static', {"filename":'img/thumbs-up.png'});
    else
        img = Flask.url_for('static', {"filename":'img/thumbs-down.png'});

    var obj = this.svg.append('image')
        .attr('href', img)
        .attr('x', (Math.random() * (window.innerWidth - 200)) + 100)
        .attr('y', (Math.random() * (this.height - 100)) + 50)
        .attr('width', 50)
        .attr('height', 50)
        .style('opacity', 0);

    obj.transition()
        .duration(300)
        .style('opacity', 1)
        .transition()
        .delay(8000)
        .duration(2000)
        .style('opacity', 0)
        .on('end', function() {
            obj.remove();
        });
}
