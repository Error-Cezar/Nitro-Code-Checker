console.clear()

function wait(ms) {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
        end = new Date().getTime()
    }
    return;
}

const { doesNotMatch } = require('assert');
const fetch = require('node-fetch');
var codes = [];
let checked = 0;
let valid = 0;
let invalid = 0;
let url;

function end() {
    console.log(`| Done checking the codes ! | \n Valid codes = ${valid} \n Invalid codes = ${invalid}`)
    if (valid > 0) {
    console.log(`Working codes: ${codes}`)
} else {
    console.log("Couldn't find any working codes...")
}};

(async() => {
    console.log("loading...")
    wait(1500)
    console.log("making stuff gud...")
    wait(1500)
    console.log("starting..")
    wait(100)

    let chalk = require('chalk');
    let rl = require('readline');
    const fs = require('fs');
    let answer1;

    console.log(chalk.red(`
    /$$   /$$ /$$   /$$                                /$$$$$$  /$$                           /$$                          
    | $$$ | $$|__/  | $$                               /$$__  $$| $$                          | $$                          
    | $$$$| $$ /$$ /$$$$$$    /$$$$$$   /$$$$$$       | $$  \__/| $$$$$$$   /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$   /$$$$$$ 
    | $$ $$ $$| $$|_  $$_/   /$$__  $$ /$$__  $$      | $$      | $$__  $$ /$$__  $$ /$$_____/| $$  /$$/ /$$__  $$ /$$__  $$
    | $$  $$$$| $$  | $$    | $$  \__/| $$  \ $$      | $$      | $$  \ $$| $$$$$$$$| $$      | $$$$$$/ | $$$$$$$$| $$  \__/
    | $$\  $$$| $$  | $$ /$$| $$      | $$  | $$      | $$    $$| $$  | $$| $$_____/| $$      | $$_  $$ | $$_____/| $$      
    | $$ \  $$| $$  |  $$$$/| $$      |  $$$$$$/      |  $$$$$$/| $$  | $$|  $$$$$$$|  $$$$$$$| $$ \  $$|  $$$$$$$| $$      
    |__/  \__/|__/   \___/  |__/       \______/        \______/ |__/  |__/ \_______/ \_______/|__/  \__/ \_______/|__/  
    `))

    let instance = rl.createInterface({
        input: process.stdin,
        output: process.stdout
     });
    
        await new Promise((resolve, reject) => {
            instance.question(chalk.white('Please put the path of the file \n > '), _userid => {
                answer1 = _userid.toString();
                
                resolve();
            });
        });

        try {
            // read contents of the file
            const data = fs.readFileSync(answer1, 'UTF-8');
        
            // split the contents by new line
            const lines = data.split(/\r?\n/);
           console.log(lines.length)
            // print all lines
            var bar = new Promise((resolve, reject) => {
            lines.forEach((code) => {
                if(code !== "") {
                if (code.includes("https://discord.gift")) {
                    url = code
                } else {
                    url = `https://discord.gift/${code}`
                }
            
                fetch(`https://discordapp.com/api/v6/entitlements/gift-codes/${url}?with_application=false&with_subscription_plan=true`).then(res => { 
                if(res.status == 200) {
                console.log(`Valid | ${url}`)
                valid = valid + 1;
                codes.push(url);
                checked = checked + 1
                if (checked == lines.length) {
                    resolve();
                }
                } else {
                console.log(`Invalid | ${url}`)
                invalid = invalid + 1;
                codes.push(url);
                checked = checked + 1
                console.log(checked)
                if (checked == lines.length) {
                    resolve();
                }
                }
            });
                }

        });
    });

    bar.then(() => {
        console.log(`| Done checking the codes ! | \n Valid codes = ${valid} \n Invalid codes = ${invalid}`)
        if (valid > 0) {
        console.log(`Working codes: ${codes}`)
    } else {
        console.log("Couldn't find any working codes...")
    }
});


        } catch (err) {
            console.error(err);
        }

})();