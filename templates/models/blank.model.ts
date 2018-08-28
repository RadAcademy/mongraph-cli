import * as mongoose from 'mongoose';
import { I{{name_c}} } from './{{name}}.interface';
import * as timestamps from 'mongoose-times';

const schema: mongoose.Schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  {{#each values}}
  {{this.name}}: {{this.type_mongoose}},
  {{/each}}
});

schema.index({'$**': 'text'});
schema.plugin(timestamps, {created: 'createdOn', lastUpdated: 'updatedOn'});

export default mongoose.model<I{{name_c}}>('{{name_c}}', schema, '{{name_c}}s');
