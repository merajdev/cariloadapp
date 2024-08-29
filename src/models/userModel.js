import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname:
    {
        type: String,
        required: [true, 'First name is required'],

    },
    lastname:
    {
        type: String,
        required: [true, 'Last name is required'],
    },
    password:
    {
        type: String,
        required: [true, 'Password is required'],
    },
    email:
    {
        type: String,
        required: [true, 'Email is required'],
    },
    isVerified:
    {
        type: Boolean,
        default: false,
    },
    isAdmin:
    {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,

});

const User = mongoose.model.users || mongoose.model('User', userSchema);

export default User;