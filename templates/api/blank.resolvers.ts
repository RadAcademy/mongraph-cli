import {{name_c}}Model from '../../models/{{name}}/{{name}}.model';

export const resolver = {

  Query: {
    {{name}}ById: (root, {_id}) => {{name_c}}Model.findOne({_id: _id}),
    all{{name_c}}s: (root)        => {{name_c}}Model.find({}).sort('-createdOn')
  },

  Mutation: {

    save{{name_c}}: (root, { {{name}} }) => {
      return new {{name_c}}Model({
        {{#each values}}
        {{this.name}}: {{../name}}.{{this.name}},
        {{/each}}
      }).save().catch(err => new Error(err.message));
    },
    update{{name_c}}: (root, {{{name}}}) => {
      return {{name_c}}Model.findByIdAndUpdate({_id: {{name}}._id}, { ...{{name}} }).catch(err => new Error(err.message));
    }

  }
};
