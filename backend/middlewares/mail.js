var nodemailer = require('nodemailer');
var config = require('../config/config');

function Mail(){
	this.service = config.SERVICE_MAIL,
	this.user = config.SERVICE_USER,
	this.pass = config.SERVICE_PASSOWORD,
	this.from = config.SERVICE_FROM,
	this.to = null,
	this.subject = '',
	this.text = ''
}

Mail.prototype.getTo = function() {
	return this.to;
};

Mail.prototype.setTo = function(to) {
	this.to = to;
};

Mail.prototype.getSubject = function() {
	return this.subject;
};

Mail.prototype.setSubject = function(subject) {
	this.subject = subject;
};

Mail.prototype.getText = function() {
	return this.text;
};

Mail.prototype.setText = function(text) {
	this.text = text;
};

Mail.prototype.send = function(){

	var transporter = nodemailer.createTransport({
	  	pool: true,
	    host: 'smtp.gmail.com',
	    port: 465,
	    secure: true, // use TLS
	    auth: {
	      user: this.user,
	      pass: this.pass
	    },
	    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    	}
	});

	let mailOptions = {
	  from: this.from,
	  to: this.to, // More than one = 'myfriend@yahoo.com, myotherfriend@yahoo.com'
	  subject: this.subject,
	  text: this.text
	};

	transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
	});
}

Mail.prototype.sendError = function(){

	this.to = 'luizsantos1992@gmail.com, eduardo120983@gmail.com';
	this.subject = 'Erro na aplicação Vadiando';

	var transporter = nodemailer.createTransport({
	  	pool: true,
	    host: 'smtp.gmail.com',
	    port: 465,
	    secure: true, // use TLS
	    auth: {
	      user: this.user,
	      pass: this.pass
	    },
	    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    	}
	});

	console.log(this.service);

	let mailOptions = {
	  from: this.from,
	  to: this.to, // More than one = 'myfriend@yahoo.com, myotherfriend@yahoo.com'
	  subject: this.subject,
	  text: this.text
	};

	transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
	});
}

module.exports = function(){
	return new Mail();
}