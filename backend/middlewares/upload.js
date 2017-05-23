var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
 
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload 
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files) {
     
    });
    var array = [];
    var count = 0;

    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
        console.log(count++);
        array.push(percent_complete.toFixed(2))
        res.end(json);
    });
 
    form.on('error', function(err) {
        //console.error(err);
    });
 
    form.on('end', function(fields, files) {
      //res.writeHead(200, {'content-type': 'text/plain'});
      //res.write('received upload:\n\n');
      var json = JSON.stringify({ 
          anArray: array
        });
        res.end(json);
    });
 
 
    return;
  }
 
  // show a file upload form 
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(3131);