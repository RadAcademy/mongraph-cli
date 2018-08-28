import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { processTypeInterface, processTypeMongoose, processTypeGql } from './helpers';

export const generate = (input: string, vals: string) => {

  const name          = input.toLowerCase();
  const CURR_DIR      = process.cwd();
  const TEMPLATE_ROOT = `${__dirname}/templates`;
  const API_ROOT      = `${CURR_DIR}/src/server/src/api`;
  const MODEL_ROOT    = `${CURR_DIR}/src/server/src/models`;
  const GRAPHQL_ROOT  = `${CURR_DIR}/src/client/graphql`;
  const strings       = vals.split(',');
  let values:any      = [];

  for (const val of strings) {
    const name           = val.split(':')[0].trim();
    const type_interface = processTypeInterface(val.split(':')[1].trim());
    const type_mongoose  = processTypeMongoose(val.split(':')[1].trim());
    const type_gql       = processTypeGql(val.split(':')[1].trim());
    values.push({name, type_interface, type_mongoose, type_gql})
  }

  const data = {
    name:  name,
    name_c: name.charAt(0).toUpperCase() + name.slice(1),
    values: values
  }

  // Create root folders.
  try {
    fs.mkdirSync(API_ROOT);
    fs.mkdirSync(MODEL_ROOT);
    fs.mkdirSync(GRAPHQL_ROOT);
  } catch (error) {
    console.info('Root folders exist.')
  } 

  // Create new input folders.
  try {
    fs.mkdirSync(`${API_ROOT}/${name}`);
    fs.mkdirSync(`${MODEL_ROOT}/${name}`);
    fs.mkdirSync(`${GRAPHQL_ROOT}/${name}`);
  } catch (error) {
    console.info('Your new input already exists, Exiting...')
    return;
  } 

  // API
  const apiFilesToCreate = fs.readdirSync(`${TEMPLATE_ROOT}/api`);
  apiFilesToCreate.forEach(file => {
    // File
    const origFilePath = `${TEMPLATE_ROOT}/api/${file}`;
    const fileStats    = fs.statSync(origFilePath);
    // Check is file
    if (fileStats.isFile()) {
      const newFileName = file.replace("blank", name);
      const writePath   = `${API_ROOT}/${name}/${newFileName}`;
      const source      = fs.readFileSync(origFilePath, 'utf8');
      const template    = handlebars.compile(source);
      const result      = template(data);
      fs.writeFileSync(writePath, result, 'utf8');
    }
  });

  // MODELS
  const modelFilesToCreate = fs.readdirSync(`${TEMPLATE_ROOT}/models`);
  modelFilesToCreate.forEach(file => {
    // File
    const origFilePath = `${TEMPLATE_ROOT}/models/${file}`;
    const fileStats    = fs.statSync(origFilePath);
    // Check is file
    if (fileStats.isFile()) {
      const newFileName = file.replace("blank", name);
      const writePath   = `${MODEL_ROOT}/${name}/${newFileName}`;
      const source      = fs.readFileSync(origFilePath, 'utf8');
      const template    = handlebars.compile(source);
      const result      = template(data);
      fs.writeFileSync(writePath, result, 'utf8');
    }
  });

  // graphql
  const graphqlFilesToCreate = fs.readdirSync(`${TEMPLATE_ROOT}/graphql`);
  graphqlFilesToCreate.forEach(file => {
    // File
    const origFilePath = `${TEMPLATE_ROOT}/graphql/${file}`;
    const fileStats    = fs.statSync(origFilePath);
    // Check is file
    if (fileStats.isFile()) {
      const newFileName = file.replace("blank", name);
      const writePath   = `${GRAPHQL_ROOT}/${name}/${newFileName}`;
      const source      = fs.readFileSync(origFilePath, 'utf8');
      const template    = handlebars.compile(source);
      const result      = template(data);
      fs.writeFileSync(writePath, result, 'utf8');
    }
  });
};
