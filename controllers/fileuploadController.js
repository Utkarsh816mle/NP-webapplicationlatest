'use strict';

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

const MultipleFile = require('../models/multiplefile');


const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            title: req.body.title,
            NFTname: req.body.NFTname,
            AssetID: req.body.AssetID,
            Amount: req.body.Amount,
            Description: req.body.Description,
            Tags: req.body.Tags,
            CreatorName: req.body.CreatorName,
            Owner:req.body.Owner,
            Listed:req.body.Listed,
            tokenId: req.body.tokenId,
            files: filesArray 
        });

// changes


const fs = require('fs');

const saveData = (multipleFiles) =>{


    const finished = (error)=>{
        if(error){
            console.error(error)
            return;
        }
    }
    const jsonData = JSON.stringify(multipleFiles,null,2)
    fs.appendFile('multipleFiles.json',jsonData,finished)
}


saveData(multipleFiles);



// changes
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

////

const getallMultipleFiles = async (req, res, next) => {
    try{
        
        let {filter} = req.query;
        filter = JSON.parse(filter)
        console.log(filter)
        const files = await MultipleFile.find({Owner: filter,Listed:false}).sort({Amount:-1});
        console.log(files)
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getallMultipleFilesMyNFTsMarketPlace = async (req, res, next) => {
    try{
        
        let {filter} = req.query;
        filter = JSON.parse(filter)
        console.log(filter)
        const files = await MultipleFile.find({Owner: filter,Listed: true}).sort({Amount:-1});
        console.log(files)
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const getallMultipleFilesMarketPlace = async (req, res, next) => {
    try{
        const files = await MultipleFile.find({Listed: true}).sort({Amount:-1});
        console.log(files)
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}


const getSortMultipleFiles = async (req, res, next) => {
    try{
        const files = await MultipleFile.find().sort({Amount:1});
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}
const updateDB = async(req,resp)=>{

    MongoClient.connect(url, function(err, db) {
        let {tokenId} = req.query;
        if (err) throw err;
        var dbo = db.db("upload-files-database");
        dbo.collection("multiplefiles").updateOne({tokenId:parseInt(tokenId)},{$set:{Listed:true}})
        resp.send({result:"Updated"});

      });

}

module.exports = {
    
    multipleFileUpload,
    
    getallMultipleFiles,

    getSortMultipleFiles,

    updateDB,

    getallMultipleFilesMyNFTsMarketPlace,

    getallMultipleFilesMarketPlace,
}