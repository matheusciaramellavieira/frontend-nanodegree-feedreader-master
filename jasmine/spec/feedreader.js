/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds !== null).toBeTruthy();
			expect(allFeeds instanceof Array).toBeTruthy();
			expect(allFeeds.length).not.toBe(0);
		});


		/* Loops through each feed
		 * in the allFeeds object and ensures it has a **URL** defined
		 * and that the URL is not empty.
		 */
		it("url not undefined, null or empty", function() {
			allFeeds.forEach(f => {
				expect(f.url).toBeDefined();
				expect(f.url !== null).toBeTruthy();
				expect(f.url.length > 0).toBeTruthy();
			});
		});


		/* Loops through each feed
		 * in the allFeeds object and ensures it has a **name** defined
		 * and that the name is not empty.
		 */
		it("name not undefined, null or empty", function() {
			allFeeds.forEach(f => {
				expect(f.name).toBeDefined();
				expect(f.name != null).toBeTruthy();
				expect(f.name.length).not.toBe(0);
			});
		});
	});


	/* Done: Write a new test suite named "The menu" */
	describe("The menu", function() {

		//used in all testes inside here
		let body = document.body;

		/* Ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it("menu element hiden by default", function() {
			expect(body.className).toContain("menu-hidden");
		});

		/* Ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it("changes visibility when click", function() {

			let menu = document.querySelector(".menu-icon-link");

			//click once, cant be menu-hiden around
			menu.click();
			expect(body.className).not.toContain("menu-hidden");

			//click twice, menu-hiden should be there
			menu.click();
			expect(body.className).toContain("menu-hidden");
		});
	});


	/* Done: Write a new test suite named "Initial Entries" */
	describe("Initial Entries", function() {

		//asynchonous need
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});

		/* Ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 */
		it("at least a single entry", function(done) {
			let entry = document.querySelector(".feed").getElementsByClassName("entry");
			expect(entry.length).toBeGreaterThan(0);
			done();
		});

	});


	/* Done: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {

		//two contents to verify
		let contentOne, contentTwo;

    beforeEach(function(done) {
			loadFeed(0, function() {
				contentOne = document.querySelector(".feed").innerHTML;

				loadFeed(1, function() {
					contentTwo = document.querySelector(".feed").innerHTML;
					done();
				});
			});

		});
		/* Ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		it('content change when loadFeed func is called', function() {
			expect(contentOne).not.toBe(contentTwo);
		});
	});
}());
