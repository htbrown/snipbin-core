import { Schema } from 'mongoose';

export default new Schema({
    name: String,
    content: String,
    language: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateCreated: Date,
    dateModified: { type: Date, default: Date.now() }
});