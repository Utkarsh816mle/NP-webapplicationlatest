const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    NFTname: {
        type: String,
        required: true
    },
    Tags: {
        type: String,
        required: true
    },
    AssetID: {
        type: Number,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    CreatorName: {
        type: String,
        required: true
    },
    Owner:{
        type:String,
        required: true
    },
    Listed:{
        type:Boolean,
        required: true
    },
    tokenId:{
        type:Number,
        required: true
    },
    files: [Object]
}, {timestamps: true});

module.exports = mongoose.model('MultipleFile', mulitipleFileSchema);