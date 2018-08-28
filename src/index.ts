#!/usr/bin/env node

import * as commander from 'commander';
import { generate } from './commands';

commander
  .version('1.0.0')
  .description('Mongoose / Graphql file generator')

commander
  .command('generate <name> <values>')
  .alias('g')
  .description('Add new Mongoose Model & Interface, Graphql type & resolvers.')
  .action((name, values) => {
    generate(name, values)
  })

commander.parse(process.argv);