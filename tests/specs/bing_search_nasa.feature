Feature: Bing Search
This is a sample feature to test Bing search engine

@bing_search
  Scenario: Search something from bing
    Given browse to web site "https://www.bing.com"
    When input keyword "Nasa Mars"
    Then click bing Search button
	And first search result should contain text "NASA’s Mars Exploration Program"

	
	

