const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const Schema=mongoose.Schema;
const userProfileSchema=new Schema({
    Address:{type:String},
    City:{type:String},
    Userimage:{type:String},
    cloud_id:{type:String},
    users:[{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }]
});
userProfileSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Profile',userProfileSchema);   