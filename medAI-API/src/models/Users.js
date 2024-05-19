import mongoose from 'mongoose';

// Define the Message schema
const MessageSchema = new mongoose.Schema({
  sender: String,
  message: String
});

// Define the Conversation schema
const ConversationSchema = new mongoose.Schema({
  messages: [MessageSchema]
});

// Define the User schema
const UserSchema = new mongoose.Schema({
  _id: String, 
  name: String,
  email: String,
  conversations: [ConversationSchema]
},{
    timestamp: true,
    collection: "users"
});

const User = mongoose.model('User', UserSchema);

export default User;
