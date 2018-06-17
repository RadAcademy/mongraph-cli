import * as fs from 'fs';
// import * as path from 'path';

export const generate = (input: string) => {

  const name         = input.toLowerCase();
  const CURR_DIR     = process.cwd();
  const TEMPLATE_DIR = `${__dirname}/templates/`;
  const API_ROOT     = 'api';
  const MODEL_ROOT   = 'models';

  // Create root folders.
  try {
    fs.mkdirSync(API_ROOT);
    fs.mkdirSync(MODEL_ROOT);
  } catch (error) {
    console.info('Root folders exist.')
  } 

  // Create new input folders.
  try {
    fs.mkdirSync(`${API_ROOT}/${name}`);
    fs.mkdirSync(`${MODEL_ROOT}/${name}`);
  } catch (error) {
    console.info('Your new input already exists, Exiting...')
    return;
  } 

  // API
  const apiFilesToCreate = fs.readdirSync(`${TEMPLATE_DIR}/${API_ROOT}`);
  apiFilesToCreate.forEach(file => {
    const origFilePath = `${TEMPLATE_DIR}/${API_ROOT}/${file}`;
    const fileStats    = fs.statSync(origFilePath);

    if (fileStats.isFile()) {
      const newFileName = file.replace("blank", name);
      const writePath = `${CURR_DIR}/${API_ROOT}/${name}/${newFileName}`;
      let contents = fs.readFileSync(origFilePath, 'utf8');
      contents = contents.replace(/{{blank}}/g, name);
      contents = contents.replace(/{{blank_c}}/g, name.charAt(0).toUpperCase() + name.slice(1));
      fs.writeFileSync(writePath, contents, 'utf8');
    }
  });

  // MODELS
  const modelFilesToCreate = fs.readdirSync(`${TEMPLATE_DIR}/${MODEL_ROOT}`);
  modelFilesToCreate.forEach(file => {
    const origFilePath = `${TEMPLATE_DIR}/${MODEL_ROOT}/${file}`;
    const fileStats    = fs.statSync(origFilePath);

    if (fileStats.isFile()) {
      const newFileName = file.replace("blank", name);
      const writePath = `${CURR_DIR}/${MODEL_ROOT}/${name}/${newFileName}`;
      let contents = fs.readFileSync(origFilePath, 'utf8');
      contents = contents.replace(/{{blank}}/g, name);
      contents = contents.replace(/{{blank_c}}/g, name.charAt(0).toUpperCase() + name.slice(1));
      fs.writeFileSync(writePath, contents, 'utf8');
    }
  });
};
