import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    collection: 'chats'
}
);

const Message = model('Message', messageSchema);

export default Message;
