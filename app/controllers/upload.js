var fs = require('fs');
var path = require('path');
var raiz = 'anexos/';
var moment = require('moment');


//  TESTE CLOUDINARY
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'xxxxxx',
    api_key: 'xxxxx',
    api_secret: 'xxxxxx'
});

// FINAL TESTE CLOUDINARY

module.exports.addFile = async function (sampleFile, subdiretorio) {
    var _arquivos = [];
    var erro;

    try {
        fs.mkdirSync(raiz);
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
    //Criando subdiretorio
    try {
        fs.mkdirSync(raiz + '/' + subdiretorio);
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }

    if (Array.isArray(sampleFile)) {
        for (var i = 0; i < sampleFile.length; i++) {
            var File = sampleFile[i].split(',');
            var base64Data = File.length > 1 ? File[1] : File[0];
            let name_file = generateUUID() //moment(new Date()).format('DDMMYYYYhhmmss');
            await fs.writeFileSync(raiz + subdiretorio + '/' + name_file + '.jpg', base64Data, 'base64',)

            //  UPLOAD PARA CLOUDINARY
            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(raiz + subdiretorio + '/' + name_file + '.jpg', (result, err) => {
                    if (err) return reject(err);
                    _arquivos.push(result.secure_url);
                    resolve();
                })

            })
            // DELETANDO ARQUIVO LOCAL APOS UPLOAD
            await fs.unlinkSync(raiz + subdiretorio + '/' + name_file + '.jpg');


        }
    } else {
        var File = sampleFile.split(',');
        var base64Data = File.length > 1 ? File[1] : File[0];
        let name_file = generateUUID() //moment(new Date()).format('DDMMYYYYhhmmss');
        await fs.writeFileSync(raiz + subdiretorio + '/' + name_file + '.jpg', base64Data, 'base64',)

        //  UPLOAD PARA CLOUDINARY
        await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(raiz + subdiretorio + '/' + name_file + '.jpg', (result, err) => {
                if (err) return reject(err);
                _arquivos.push(result.secure_url);
                resolve();
            })

        })
        // DELETANDO ARQUIVO LOCAL APOS UPLOAD
        await fs.unlinkSync(raiz + subdiretorio + '/' + name_file + '.jpg');
        //   FINAL  UPLOAD PARA CLOUDINARY

    }

    return _arquivos;
};

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

module.exports.deleteArquivoCloudinary = async function (url) {
    let itens = url.split('/');
    let itens_id = itens[itens.length - 1];
    id = itens_id.split('.')[0];
    let result = await cloudinary.v2.uploader.destroy(id);
    return result;
}

