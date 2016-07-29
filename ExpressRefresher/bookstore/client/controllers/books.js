/**
 * Created by David on 30/07/2016.
 */
var myApp = angular.module('myApp');
                // controller name, controller code
myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams ){
    console.log("BooksController loaded..");
    // scope binds it to the view, http to allow get req to talk to api
    // scope fn to get the books
    $scope.getBooks = function(){
        $http.get('api/books').success(function(response){
            $scope.books = response;
        });
        // so http allows use to talk to the api to get the books
    };

    $scope.getBook = function(){
        var id = $routeParams.id;
        $http.get('api/books/'+id).success(function(response){
            $scope.book = response;
        });
        // so http allows use to talk to the api to get the books
    };
    
    $scope.addBook = function(){
        console.log($scope.book);
        $http.post('api/books/', $scope.book).success(function(response){
            console.log("Book added");
            window.location.href="#/books";
        })
    }
}]);

