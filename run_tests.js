
const args= require('minimist')(process.argv.slice(2),{
	strings:['port','tagNames','browser', 'mode']		
});

/*Options list :
 port: port  quantity of ports mus be equal to browser quantity 
 tagNames: secify array of cucumber tag names to search test scenarios ( Valid syntax:--tags tag1, ... , tagN)
 browser: specifies array of browser names which are used to run scripts (Valid syntax: --browser name1, ... ,nameN)
 mode: specifies mode in which browser is required to open
 */
 
var tagN,browserNames='undefined';
//Output entered args;
console.log(args);

//options values set by default
const options =new Map();
options.set('port', ['1337']);
options.set('browser',['chrome']);
options.set('tagNames',['test']);

//get optios values from console input
const keyArr=Array.from(options.keys());
console.log(`opt keys: ${keyArr}`);

Array.from(keyArr).forEach((elem)=>{
	if (typeof args[elem]==='string'  &&  typeof args[elem]!=="undefined"){
		options.set(`${elem}`,args[elem].split(','));
	}
});
console.log(`Args passed: tags:${options.get('tagNames')}; browsers:${options.get('browser')}`)

//add "@" symbol to each tagName
const cuc_tags=((t)=>{
				let res=[];
				t.forEach((elem)=>{
				res.push(`@${elem}`);
				});
				return res;
				})(options.get('tagNames'));			
options.set('tagNames', cuc_tags);
				
//enable  run each feature in paralel				
options.set('paralelExec', options.get('tagNames').length);
console.log(options);

//compose report file name
const date =require('date-and-time');
let now =new Date();
//let dateToStr= date.format(now,'YYYY_MM_DD-hh:mm:ss');
let dateToStr= date.format(now,'YYYY_MM-DD_hh-mm-ss');
const fs=require('fs');
const reportStr=fs.createWriteStream(`${__dirname}/reports/report_${dateToStr}.xml`);

// define testCafe server and testCafe runner and run tests
const createTestCafe = require('gherkin-testcafe'); 
let testcafe = null;
createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe= tc;
        const runner = testcafe.createRunner();
        return runner
			.steps('./tests/steps/*.js')
			.specs('./tests/specs/*.feature')
            .browsers(options.get('browser'))
			.tags(options.get('tagNames'))
			.reporter('xunit', reportStr)
			.concurrency(options.get('paralelExec'))
			.screenshots(`${__dirname}`+'/Screenshots/',false,'${DATE}_${TIME}_${BROWSER}.png')		
            .run();
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });