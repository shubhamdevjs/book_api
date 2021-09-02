const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        require: true,
    },
    tile:{
        type: String,
        require: true,
    },
    authors: [Number],

    language:String,

    pubDate: String,

    numOfPage: Number,
 
    category: [String],

    publication: Number,

});

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;