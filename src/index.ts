import * as fs from 'fs';
// import * as path from 'path';

export const generate = (name: string) => {

  // Create folders if they don't exist.
  fs.mkdirSync('api');
  fs.mkdirSync('models');
  
   console.info(name)
};