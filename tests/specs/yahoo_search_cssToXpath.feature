Feature: Search xpath to css npm  in yahoo
I want to find  xpath to css npm page in yahoo search

@yahoo_search
Scenario: Searching xpath to css npm npm page in yahoo
	Given I am opening yahoo search page
	When I am typing "npm xpath to css" in yahoo search field
	And I am pressing search in yahoo button
	Then I should get "xpath-to-css - npm" as first result in yahoo results
	
	

