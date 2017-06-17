window.onload = function() {
    $('#vote-yes').click(vote_yes);
    $('#vote-no').click(vote_no);
}

function checkIn() {
    console.log('here');
}

function submitEmotion() {
    console.log('emotion');
}

function question() {
    console.log('question');
}

function vote_yes() {
    console.log('yes');
    $.get(Flask.url_for('student_yes'));
}

function vote_no() {
    console.log('no');
    $.get(Flask.url_for('student_no'));
}
