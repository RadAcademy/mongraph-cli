import * as fs from 'fs';
// import * as path from 'path';

export const generate = (name: string) => {

  const CURR_DIR      = process.cwd();
  const templatesPath = `${__dirname}/templates/`;

  try {
    fs.mkdirSync('api');
    fs.mkdirSync('models');
  } catch (error) {
    console.info('Folders Exist')
  } 
  
   console.info(name, CURR_DIR, templatesPath)
};
