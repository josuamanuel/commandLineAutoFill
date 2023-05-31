import * as nexpect from 'nexpect'

let selection = ''

nexpect.spawn('/Library/Frameworks/Python.framework/Versions/3.9/bin/adfs-aws-login')
.expect('Username')
.sendline('\n')
//.expect('Password')
//.sendline('Corcordoba11\n')
.wait('productinfo-kubernetes-limited-dev', line => selection = line.substring(2,4))
.sendline(selection + '\n')
.run(function (err) {
  if (!err) {
    console.log('Finished OK!!!');
  }
  else {
    console.log(err)
  }
});