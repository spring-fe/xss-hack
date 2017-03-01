var PORT = 3000;

var http = require('http');//提供web服务
var url = require('url');//解析get请求
var query = require("querystring");//解析post请求
var fs = require('fs');
var mime = require('./mime').types;
var path = require('path');


var scripts;
//server1
var server1 = http.createServer(function(request, response){
	
	//判断是GET/POST请求
	if(request.method == "GET"){
		var urlStr = url.parse(request.url);
		var pathname = urlStr.pathname;
		var realPath = path.join("webapp",pathname);
		console.log(realPath)
		var ext = path.extname(realPath);
	    ext = ext ? ext.slice(1) : 'unknown';
	    fs.exists(realPath, function(exists){
			if(!exists){
				response.writeHead(404,{
					'Content-Type' : 'text/plain'
				});
				response.write("This request URL" + pathname + "was not found on this server.");
				response.end();
			}else{
				if(ext == 'unknown'){
					console.log(scripts)
					response.write(scripts);
					response.end();
					return;
				}
				fs.readFile(realPath, "binary", function(err, file){
					if(err){
						response.writeHead(500, {
							'Content-Type' : 'text/plain'
						});
						response.end(err);
					}else{
						var contentType = mime[ext] || "text/plain";
						console.log(contentType)
						response.writeHead(200, {
							'Content-Type' : contentType
						});
						response.write(file, "binary");
						response.end();
					}
				});
			}
	    });
    }else{
        var postdata = "";
        request.addListener("data",function(postchunk){
            postdata += postchunk;
        })

        //POST结束输出结果
        request.addListener("end",function(){
            var params = query.parse(postdata);
            console.log(params);
            scripts = params.messages;
            response.writeHead(301,{
            	'Location':'http://localhost:3000/hackedsite/list.html'
            });
            response.end();
        })
    }

});
server1.listen(3000);

console.log("Server runing at port: " + 3000 + ".");


//server2
var cookie;
var server2 = http.createServer(function(request, response){
	
	
	//判断是GET/POST请求
	if(request.method == "GET"){
		var urlStr = url.parse(request.url);
		var pathname = urlStr.pathname;
		cookie = urlStr.query;
		var realPath = path.join("webapp",pathname);
		console.log(realPath)
		var ext = path.extname(realPath);
	    ext = ext ? ext.slice(1) : 'unknown';
	    fs.exists(realPath, function(exists){
			if(!exists){
				response.writeHead(404,{
					'Content-Type' : 'text/plain'
				});
				response.write("This request URL" + pathname + "was not found on this server.");
				response.end();
			}else{
				if(ext == 'unknown'){
					var data = {a:1,b:2}
					response.write(JSON.stringify(data));
					response.end();
					return;
				}

				fs.readFile(realPath, "binary", function(err, file){
					if(err){
						response.writeHead(500, {
							'Content-Type' : 'text/plain'
						});
						response.end(err);
					}else{
						var contentType = mime[ext] || "text/plain";
						console.log(contentType)
						response.writeHead(200, {
							'Content-Type' : contentType
						});
						response.write(file, "binary");
						response.end();
					}
				});
			}
	    });
    }else{
        var postdata = "";
        request.addListener("data",function(postchunk){
            postdata += postchunk;
        })

        //POST结束输出结果
        request.addListener("end",function(){
        	response.writeHead(200, {
				'Content-Type' : 'text/plain'
			});
            var params = query.parse(postdata);
            //scripts = params.messages;
            response.write('1');
            response.end();
        })
    }

});
server2.listen(3100);
console.log("Server runing at port: " + 3100 + ".");