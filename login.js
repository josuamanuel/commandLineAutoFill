#! /usr/bin/env node
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const correctUser = "myUser";
const correctPwd = "thePassword";

let count = 0;
let isLoginOK = false

while (count < 3 && isLoginOK === false ) {
  const user = await rl.question("user: ");
  const pwd = await rl.question("password: ");

  if (user === correctUser && pwd === correctPwd) {
    console.log("Access granted");
    isLoginOK = true
  }
  
  count++;
}

if(isLoginOK === false) console.log("Exceeding retries..."); 

rl.close()