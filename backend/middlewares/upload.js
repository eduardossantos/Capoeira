var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    promise = require('bluebird'),
    fs = require('fs');

var _this = this;

function Upload(){
    _this.enconding = '';
    _this.dir = 'C:/xampp/htdocs/TurbineNode/backend/img/';
    _this.maxFieldsSize = 2 * 1024 * 1024;
    _this.maxFields = 1000;
    _this.keepExtensions = true;
    _this.multiples = false;
}


Upload.prototype.setEncoding = function(enconding){
    _this.enconding = enconding;
}

Upload.prototype.setDir = function(dir){
    _this.dir = dir;
}

Upload.prototype.getDir = function(){
    return _this.dir;
}

Upload.prototype.setMaxFieldsSize  = function(size){
    _this.maxFieldsSize = maxFieldsSize;
}

Upload.prototype.setMaxFields  = function(fields){
    _this.maxFields = maxFields;
}

Upload.prototype.setMultiples  = function(multiples){
    _this.multiples = multiples
}


Upload.prototype.execute = function(req, diretorio){

    return new promise((resolve, reject) => {

        var form = new formidable.IncomingForm();

        

        if(_this.enconding){
            form.enconding = this.enconding;
        }

        if(!_this.dir){
            reject('Erro ao realizar o upload');
        }

        this.upload(req).then(function(result){
            var img = _this.dir + result.name;
            console.log(img);

            if(!fs.existsSync(img)) {
                fs.rename(result.path, img, function(err){
                    if(err) reject(err);
                    resolve("Upload realizado com sucesso");
                });
            }  else {
                reject("Erro ao realizar upload da imagem");
            }   

        }, function(err){
             if(err) reject(err);
        });

    });

}

Upload.prototype.upload = function(req){
    return new promise((resolve, reject) => {

        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files){
            if(err) reject(err);
            resolve(files.fileToUpload);
        });

         form.on('error', function(err) {
            reject(err);
        });

    });
}

module.exports = Upload;