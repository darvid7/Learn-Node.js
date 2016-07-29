/**
 * Created by David on 30/07/2016.
 */
// FRONT END APP JS FILE
// [] for dependencies, even if none need empty []
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
    // go to a particular url, use this controller, show this view (templateUrl)

    $routeProvider.when('/', {
            controller:'BooksController',   // controller to use when user goes to '//'
            templateUrl: 'views/books.html' // view to show when ^
        })
        .when('/books', {
            controller: 'BooksController',
            templateUrl: 'views/books.html'
        })
        .when('/books/details/:id', {
            controller: 'BooksController',
            templateUrl: 'views/book_details.html'
        })
        .when('/books/add', {
            controller: 'BooksController',
            templateUrl: 'views/add_book.html'
        })
        .when('/books/edit/:id', {
            controller: 'BooksController',
            templateUrl: 'views/edit_book.html'
        })
        // redirect to home page if not one of these urls
        .otherwise({
            redirectTo:'/'
        })
});