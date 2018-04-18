const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('streamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res , next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n', (err)=>{
        if(err){
            console.log('error to append log!!!')
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        //currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle : 'About Page',
        //currentYear: new Date().getFullYear()
    });
});

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
});