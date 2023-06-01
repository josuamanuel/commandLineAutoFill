#! /usr/bin/env node

import { spawn } from 'child_process'

// Spawn the shell command.
const child = spawn(
  './login.js'
  //, ['arg1', 'arg2'])
)

let index = 0
child.stdout.on('data', (data) => {

  let toWrite
  let dataStr = data.toString()
  if(Math.floor(index / 2) !== 1 && dataStr === 'user: ') toWrite = 'wrongUser'
  if(Math.floor(index / 2) !== 1 && dataStr === 'password: ')  toWrite = 'wrongPassword'
  if(Math.floor(index / 2) === 1 && dataStr === 'user: ')  toWrite = 'myUser'
  if(Math.floor(index / 2) === 1 && dataStr === 'password: ')  toWrite = 'thePassword'
  child.stdin.write(toWrite + '\n')
  console.log(`${dataStr}${
    dataStr === 'password: '
      ? ''
      : (toWrite ?? '')  
    }`
  )
  index++
})


// Read errors from the child process's stderr.
child.stderr.on('data', (data) => {
  console.error(`Received error: ${data}`)
})

// Handle the completion of the child process.
child.on('close', (code) => {
  child.stdin.end()
  process.exit(code)
})

