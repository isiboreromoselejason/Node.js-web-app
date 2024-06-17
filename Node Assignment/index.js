const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const Contact = require('./models/contact');
const DanceClass = require('./models/danceClass');
const Event = require('./models/event');
const app = express();

dotenv.config();
const port = process.env.PORT || 3000;
const connectionUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/test`;

// Mongoose connection
mongoose.connect(connectionUrl
).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB", err);
});

// Express middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Pug settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    const params = {};
    res.render('home', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    res.render('contact', params);
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, phone, desc, age } = req.body;
        const newContact = new Contact({
            name,
            email,
            phone,
            desc,
            age
        });
        await newContact.save();
        res.redirect("/contact");
    } catch (err) {
        console.error("Error saving contact:", err);
        res.redirect("/contact"); // Handle error as per your need
    }
});

app.get('/classes', async (req, res) => {
    try {
        const danceClasses = await DanceClass.find();
        res.render('classes', { danceClasses });
    } catch (err) {
        console.error("Error fetching dance classes:", err);
        res.redirect("/"); // Handle error as per your need
    }
});

app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.render('events', { events });
    } catch (err) {
        console.error("Error fetching events:", err);
        res.redirect("/"); // Handle error as per your need
    }
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    try {
        const { type, name, description, instructor, timing } = req.body;
        if (type === 'class') {
            const newClass = new DanceClass({
                name,
                description,
                instructor,
                timing
            });
            await newClass.save();
        } else if (type === 'event') {
            const newEvent = new Event({
                name,
                description,
                timing
            });
            await newEvent.save();
        }
        res.redirect('/create');
    } catch (err) {
        console.error("Error creating class or event:", err);
        res.redirect('/create');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
