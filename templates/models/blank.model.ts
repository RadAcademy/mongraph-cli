import * as mongoose from 'mongoose';
import { I{{blank_c}} } from './{{blank}}.interface';
import * as timestamps from 'mongoose-times';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema: mongoose.Schema = new mongoose.Schema({
  password: String,
  email: {
    type: String,
    required: [true, 'A email is required.'],
    unique: true,
    lowercase: true,
    trim: true
  },
});

schema.index({'$**': 'text'});
schema.plugin(timestamps, {created: 'createdOn', lastUpdated: 'updatedOn'});
schema.post('save', (err, res, next) => {
  switch (err.code) {
    case 11000: {
      next(new Error('Email already in use.'));
      break;
    }
    default: {
      next(new Error(err.message));
      break;
    }
  }
});

export default mongoose.model<I{{blank_c}}>('{{blank_c}}', schema, '{{blank_c}}s');
