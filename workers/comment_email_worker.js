const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

//setting up worker to create a queue with given name, and add items to the queue and execute this every time it is called
// here a queue is created with name 'emails'
queue.process('emails', function(job, done){
    //console.log('emails worker is processing a job',job.data);

    //sending confirmation mail to user who have posted
    commentsMailer.newComment(job.data);

    done();
})