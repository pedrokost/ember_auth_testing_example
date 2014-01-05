ember\_auth\_testing\_example
===========================

This is an example of how to write integration tests for ember-auth. This project helped me discover a bug in the code, where the coffeescript was incorrectly written and caused the tests to fail in obscure ways.

## To run the tests:

	1. git clone https://github.com/pedrokost/ember_auth_testing_example.git
	2. cd ember_auth_testing_example
	3. ruby -run -e httpd . -p5000
	4. Open http://localhost:5000?test in the browser


## Remaining issues:
	[x] Tests always fail returning some JSON.
		The issue was the the `module` function in the tests was incorrectly written. 
	[] A test fails every second time it is run. 

