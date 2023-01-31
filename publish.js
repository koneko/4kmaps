// import exec
const { exec } = require('child_process');

// automate the process of publishing to github repository

exec("git add .", function (err, stdout, stderr) {
    if (err) {
        console.log(err);
    } else {
        console.log(stdout);
    }
})

exec(`git commit -m \"added maps automatically (${Date.now()})\"`, function (err, stdout, stderr) {
    if (err) {
        console.log(err);
    } else {
        console.log(stdout);
    }
})

// origin master
exec("git push origin master", function (err, stdout, stderr) {
    if (err) {
        console.log(err);
    } else {
        console.log(stdout);
    }
    console.log("Finished publishing maps, list will update in a few minutes.")
})
