import * as mongoose from 'mongoose';

export interface I{{name_c}} extends mongoose.Document {
  _id: string;
  {{#each values}}
  {{this.name}}: {{this.type_interface}};
  {{/each}}
}
