const multer =require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({ 
    cloud_name:"dgk5l5osb",
    api_key:"516227337283734",
    api_secret:"wMcX1hMzMEqP0RBUncqYLAd2KNM",

  });
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"carRental",
        format:async()=>"jpeg",
        public_id:(req,file)=>file.filename,
    }
});

const parser=multer({
 
    storage:storage
});
module.exports=parser;


