// on create, check if mobile device --> redirect to index page

var http = require('http'),
    fs = require('fs');

function handle_incoming_request(req, res) {
    console.log('ICOMING REQUEST: ' + req.method + ' ' + req.url);
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify( { error: null } ) + '\n');
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);

/*
function process_request(req, res) {
    var body = 'Thanks for calling!\n';
    var content_length = body.length;
    res.writeHead(200, {
        'Content-Length': content_length,
        'Content-Type': 'text-plain'
    });
    res.end(body);
}

var s = http.createServer(process_request);
s.listen(8080);
*/


function load_album_list(callback) {
    fs.readdir( 'albums', function(err, files) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, files);
    });
}