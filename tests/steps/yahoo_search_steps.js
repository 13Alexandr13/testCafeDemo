//this file contains example of xpath usage in testCafe


const {Given, When, Then, And}=require('cucumber');
const {Selector}=require('testcafe');
const  xpathToCss=require('xpath-to-css');
//const {expect}=require('chai');


Given (/^I am opening yahoo search page$/, async (tc)=>{
	await tc.navigateTo('https://www.yahoo.com/');	
});

When (/^I am typing "(.+)" in yahoo search field$/, async  (tc,textToSearch)=>{
	let searchField= Selector(xpathToCss('//*[@id="uh-search-box"]'));
	await tc.typeText(searchField, textToSearch);
});

When (/^I am pressing search in yahoo button$/, async (tc)=>{
	
	  let searchBtn=Selector(xpathToCss('//*[@id="uh-search-button"]'));
	  await tc.click(searchBtn);
});

Then (/^I should get "(.+)" as first result in yahoo results$/, async function(tc,searchRes){
	let cssSelectorExpression=xpathToCss('//*[@id="web"]/ol/li[1]/div/div[1]/h3/a');
	let res=Selector(cssSelectorExpression)();  //await for element with particular state
		
	await tc.expect(res.innerText).contains(searchRes);
	await tc.takeScreenshot();
});


