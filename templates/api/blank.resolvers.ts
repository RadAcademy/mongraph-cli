import * as bcrypt from 'bcrypt';
import {{blank_c}}Model from '../../models/{{blank}}/{{blank}}.model';
import { create{{blank_c}}Error } from '../../errors';

export const resolver = {

  Query: {
    {{blank}}ById: (root, {_id}) => {
      return {{blank_c}}Model.findOne({_id: _id});
    }
  },

  Mutation: {
    create{{blank_c}}: async (root, {email, password}) => {

      let hashedPassword = '';
      if (password) { hashedPassword = await bcrypt.hash(password, 12); }

      const {{blank}} = new {{blank_c}}Model({
        email: email,
        password: password
      });
      return {{blank}}.save().catch(err => new create{{blank_c}}Error({message: err.message}));
    }
  }
};
