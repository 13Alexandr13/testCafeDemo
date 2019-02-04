const {Given, When, Then, And}=require('cucumber');
const {Selector}=require('testcafe');
//const xpathSelector =require( 'D:/DemoProjects/testCafe+CucumberDemo/finderByXpath');
//const {expect}=require('chai');


Given (/^I am opening google search page$/, async (tc)=>{
	await tc.navigateTo('http://www.google.com/ncr');	
});

When (/^I am typing "(.+)" in search field$/, async  (tc,textToSearch)=>{	
	 /*//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input*/
	 //let searchField=Selector(xpathSelector('//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input')); //searches input form  by xpath expression
	 let searchField=Selector('#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input');
	await tc.typeText(searchField, textToSearch);
});

When (/^I am pressing search in Google button$/, async (tc)=>{
	
	 //let searchField=Selector(xpathSelector('//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input')); //searches input form  by xpath expression
	  let searchField=Selector('#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input');
	  await tc.pressKey('enter');
});

Then (/^I should get "(.+)" as first result$/, async function(tc,searchRes){
	let Res=Selector('#rso > div:nth-child(1) > div > div > div > div > div.r > a:nth-child(1) > h3');  //check if specified elem exists
	await tc.expect(Res.innerText).contains(searchRes);
});


