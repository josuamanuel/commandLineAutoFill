#! /usr/bin/env node

import { spawn} from 'child_process'
import { stdin as input, stdout as output } from 'node:process';

process.env
// Spawn the shell command.
const child = spawn(
  '/Library/Frameworks/Python.framework/Versions/3.9/bin/adfs-aws-login',
   [],
   {
    env: {ADFS_DEFAULT_PASSWORD: process.env.CONFIDENTIAL, ...process.env}
   }
)

let index = 0
child.stdout.on('data', (data) => {

  let dataStr = data.toString()

  if(index === 0 ) {
    child.stdin.write('\n')
  }

  if(index === 1) {
    let selection = findAndExtractSeclection('productinfo-kubernetes-limited-dev', dataStr)
    child.stdin.write(selection + '\n')
  }

  console.log(`${index} ${dataStr.length}-> ${dataStr}`)

  index++
})


// Read errors from the child process's stderr.
child.stderr.on('data', (data) => {
  console.error(`Received error: ${data}`)
})
// Handle error at spawning
child.on('error', (code) => {
  console.log('Error spawning ', code);
})

// Handle end of child
child.stdout.on('end', function () {
  console.log('child stream ended...');
});

// Handle the exit
child.on('exit', (code) => {
  console.log('child exit with code: ', code);
})

// Handle the completion of the child process.
child.on('close', (code) => {
  console.log('child close with code: ', code);
  child.stdin.end()
  process.exit(code)
})

function findAndExtractSeclection(value, textOptions)
{
  return textOptions.split(/\r?\n/).find(el => el.indexOf(value) !== -1).substring(2,4).trim() + '\n'
}
