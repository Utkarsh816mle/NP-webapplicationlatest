'use strict';

const express = require('express');
const {upload} = require('../helpers/filehelper');
//
const {getSortMultipleFiles} = require('../controllers/fileuploadController');

//

const { multipleFileUpload,
        getallMultipleFiles,
        updateDB,
        getallMultipleFilesMyNFTsMarketPlace,
        getallMultipleFilesMarketPlace} = require('../controllers/fileuploadController');
const router = express.Router();

router.get('/getSortMultipleFiles',getSortMultipleFiles);

router.post('/multipleFiles', upload.array('files'), multipleFileUpload);

router.get('/getMultipleFiles', getallMultipleFiles);

router.get('/getMultipleFilesMarketPlace', getallMultipleFilesMarketPlace);

router.get('/getMultipleFilesMyNFTsMarketPlace', getallMultipleFilesMyNFTsMarketPlace);

router.put("/update/", updateDB)

module.exports = {
    routes: router
}