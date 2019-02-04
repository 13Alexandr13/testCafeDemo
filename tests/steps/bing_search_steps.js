const {Given, When, Then, And}=require('cucumber');
const {Selector} = require('testcafe');


//const {expect} =require('chai');


Given(/^browse to web site "([^"]*)"$/, async function(tc,url) {
		await tc.navigateTo('https://www.bing.com/');
	});

When(/^input keyword "([^"]*)"$/, async function (tc,keyword) {
	let searchField=Selector('#sb_form_q');
	await tc.typeText(searchField, keyword);
	});
Then(/^click bing Search button$/, async function (tc) {
		//#sb_form_go
		let searchBtn=Selector('#sb_form_q');
		//await tc.click(searchBtn);
		await tc.pressKey('enter');		
	});

Then(/^first search result should contain text "([^"]*)"$/, async function (tc, keyword) {
	/* #b_results > li:nth-child(1) > h2 > a*/
	let Res=Selector('#b_results').find('a');  //check if specified elem exists
	await tc.expect(Res.innerText).contains(keyword,{ timeout: 500 }); 
	await tc.takeScreenshot();
});
 // asynchronously check assertion. { timeout: 500 } -specifies additional timeot during which testCafe tries to check assertion if a selector property or client function promise was used in assertion