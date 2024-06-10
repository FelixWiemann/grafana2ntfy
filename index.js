const axios = require('axios').default
const http = require('http');

data = []

ntfy = process.env.NTFY_INSTANCE

post_options = {
    baseURL: process.env.NTFY_INSTANCE,
    method: 'POST',
    url: '/Plants',
    headers: {
        'Authorization': `Bearer ${process.env.NTFY_TOKEN}`,
        'Priority': "default"
    }
};

getPrio = (state) => {
    switch (state) {
        case "alerting":
            return "high"
        case "ok":
            return "default"
        default:
            return "high"
    } 
}

handlePost = (req, res) => {
    try{
        res.writeHead(200,{'Content-Type': 'text/plain'})
        req.on("data", function(chunk) {
            d = JSON.parse(chunk.toString())
            post_options.url = req.url
            post_options.data = d.message
            post_options.headers["Priority"] = getPrio(d.state)
            post_options.headers["Title"] = d.title.trim()
            // console.log(post_options)
            axios(post_options)
        });
        res.end()
    }
    catch (error) {
        console.error("got error processing post " + error)
        
    }
    return
}

handleError = (req, res) => {
    res.writeHead(400,{'Content-Type': 'text/plain'})
    console.error("got invalid request type on " + req.url)
    res.write("error")
    res.end()
}

http.createServer((req, res) => {

    switch (req.method) {
        case "POST":
            //console.log(req.bo)
            handlePost(req, res)
            break
        default:
            handleError(req, res)
            break
    }

}).listen(4116)