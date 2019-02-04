Feature: Search selenium-cucumber npm in google
I want to find selenium-cucumber npm page in google search

@google_search
Scenario: Searching selenium-cucumber npm page in google
	Given I am opening google search page
	When I am typing "npm selenium-cucumber" in search field
	And I am pressing search in Google button
	Then I should get "selenium-cucumber-js - npm" as first result
	
	

