		var booksApp = angular.module("booksApp", ["ngRoute"]); //[] Means no dependancies

		booksApp.config(function($routeProvider){
			$routeProvider
				.when('/',{
					controller: 'SimpleController',
					templateUrl: 'src/partials/Homepage.html'
				})
				.when('/view2',{
					controller: 'SimpleController',
					templateUrl: 'src/partials/View2.html'
				})
				.when('/view3',{
					controller: 'SimpleController',
					templateUrl: 'src/partials/View3.html'
				})
				.otherwise({redirectTo: '/'});
		});

		booksApp.factory("simpleFactory", function(){
			var factory = {},
				customers = [
					{
						name: 'Dave Smith',
						city: 'New York City'
					},
					{
						name: 'Alex Doe',
						city: 'Phoenix'
					}
				];

			factory.getCustomers = function(){
				console.log("Factory returned customers");
				return customers;
			}
			return factory;
		});

		/*booksApp.service("simpleService", function(){
			var customers = [
					{
						name: 'Dave Smith',
						city: 'New York City'
					},
					{
						name: 'Alex Doe',
						city: 'Phoenix'
					}
				];
				
			this.getCustomers = function(){
				console.log("Service returned customers");
				return customers;
			}
		});*/

		booksApp.controller("SimpleController", function($scope, simpleFactory){
			$scope.customers = simpleFactory.getCustomers();

			$scope.addCustomer = function(){
				$scope.customers.push({
					name: $scope.newCustomer.name,
					city: $scope.newCustomer.city
				});
				console.log("Customer added");
			};

		});

		/* Could also be done as: 
		var controllers = {};
		controllers.SimpleController = function($scope){
			$scope.customers = [
				{
					name: 'Dave Smith',
					city: 'New York City'
				},
				{
					name: 'Alex Doe',
					city: 'Phoenix'
				}
			]
		};
		booksApp.controller(controllers); */

		booksApp.directive("testdirective", function(){
			return {
				restrict: 'E',
				transclude: true,
				link: function(scope, element, attributes){
					
					/*console.log("Scope: ", scope);
					console.log("Element: ", element);
					console.log("Attributes: ", attributes);*/

					element.bind("mouseenter", function(){
						element[0].innerHTML = "They see me rollin'";
					});
				},
				template: '<h2>Custom directive</h2>'
			}
		});


		booksApp.controller("blogpostController", function($scope){
			
			$scope.info = [];

			this.addBook = function(){
				$scope.info.push("Book");
			}
			this.addGenre = function(){
				$scope.info.push("Genre");
			}
			this.addAuthor = function(){
				$scope.info.push("Author");
			}

		})
		.directive("blogpost", function(){
			return {
				restrict: 'E',
				scope: {},
				controller: 'blogpostController',
				link: function(scope, element, attributes){
					element.bind('mouseenter', function(){
						console.log(scope.info);
					});
				}
			}
		})
		.directive("book", function(){
			return {
				require: 'blogpost',
				link: function(scope, element, attributes, blogpostController){
					blogpostController.addBook();
				}
			}
		})
		.directive("genre", function(){
			return {
				require: 'blogpost',
				link: function(scope, element, attributes, blogpostController){
					blogpostController.addGenre();
				}
			}
		})
		.directive("author", function(){
			return {
				require: 'blogpost',
				link: function(scope, element, attributes, blogpostController){
					blogpostController.addAuthor();
				}
			}
		})