---
title: "Learning AngularJS III: Routes"
date: "2013-08-17T19:47:03.284Z"
path: "/blog/2013/08/17/learning-angularjs-iii-routes/"
---

So far we've covered the basics of [using AngularJS to interact with RESTful services](http://ryanlanciaux.github.io/blog/2013/06/04/learning-angularjs/) and [Filtering / Ordering views in AngularJS](http://ryanlanciaux.github.io/blog/2013/06/19/angularjs-filtering-slash-ordering/). Using [AngularJS Routes](http://docs.angularjs.org/tutorial/step_07), we are going to add a bit of structure to this example app.

If you have not already, please take a look at [Part 1](http://ryanlanciaux.github.io/blog/2013/06/04/learning-angularjs/) and [Part 2](http://ryanlanciaux.github.io/blog/2013/06/19/angularjs-filtering-slash-ordering/) as we will be working with the app we have started there...

First off, lets open our index.ejs file. As you may notice this file is an unstructured mess. We want to break apart the controllers and templates into their own files so our architecture of our demo app is a bit more clear. When we're done, we will have the following files:

* **app.js** under /assets/js/angular/
* **controllers.js** under /assets/js/angular/
* **list.html** under /public/templates/ -- there is [a better way to use Angular with Sails](https://github.com/balderdashy/sails/issues/273), however, for the sake of example this is okay
* **detail.html** under /public/templates/
* **edit.html** under /public/templates/

## app.js

App.js is where we're storing our module definition (that we added in [Part 1](http://ryanlanciaux.github.io/blog/2013/06/04/learning-angularjs/)), our factory defintion and our routes. The factory is exactly the same as before except we've added an update endpoint.

#### Resource

```javascript
foodApp.factory('Food', ['$resource', function($resource){
    return $resource('/food/:id', {id:'@id'}, { update: {method:'PUT' } } );
}]);
```

By default, the [Angular resource module](http://docs.angularjs.org/api/ngResource.$resource) has get/save/query/remove/delete methods but no update. What's more, we want to make sure we are using a PUT method for storing our modified food items so Sails knows that we're trying to modify an existing record. Thankfully, we can add custom actions (as you may have noticed above) by simply adding a hash after our route parameters object in the resource defintion like so `{ update: {method:'PUT' } }`. Since this is just a hash, you can add as many definitions as you would like (e.g. `{ update: {method: 'PUT' }, somethingelse: {method: 'DELETE'} }`).

#### Routing

In [Part 1](http://ryanlanciaux.github.io/blog/2013/06/04/learning-angularjs/) we are showing/hiding a form based on a $scope variable on our controller. While this works, it may be a bit cleaner to use routing and separate our views by their function. Routing in Angular is pretty straight forward -- especially if you have routing experience in other frameworks.

```javascript
foodApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/food', {templateUrl: '/templates/list.html', controller: FoodController})
    .when('/food/edit/:id', {templateUrl: '/templates/edit.html', controller: FoodController})
    .when('/food/create', {templateUrl: '/templates/edit.html', controller: FoodController})
    .when('/food/:id', {templateUrl: '/templates/detail.html', controller: FoodController})
    .otherwise({redirectTo: '/food'});
}]);
```

When the URL matches one of the route values, the visitor will be directed to the template and given controller (you will notice that we're using the same controller for all our routes). Additionally, the routes that have :id will have a route parameter of id available in the controller (more on this later). If none of the routes are matched we default to /food. We won't focus too much on the views becuase they are mostly the same as our old index.ejs, however, they are available in [the gist created for this post](https://gist.github.com/ryanlanciaux/6257478).

## controllers.js

Our controller is mostly the same as before except we're no longer maintaining which page we're showing. The whole controller is available as [a gist](https://gist.github.com/ryanlanciaux/6257478) however, some of the more interesting parts are as follows:


```javascript
if($routeParams.id){
 $scope.currentFood = Food.get({id: $routeParams.id});
} else {
  $scope.currentFood = new Food();
  $scope.food = Food.query();
}
```
This is checking for the route parameter that we are setting in our route -- if it's there, we get the individual food item with that ID. When the parameter is not there, we get all the food items to be displayed in a list (and initialize a Food item for creates).

```javascript
$scope.addFood = function(){
      if ($scope.currentFood.id && $scope.currentFood.id != 0){
        Food.get({id: $scope.currentFood.id}, function(food){
            food.type = $scope.currentFood.type;
            food.name = $scope.currentFood.name;
            food.percentRemaining = $scope.currentFood.percentRemaining;
            food.quantity = $scope.currentFood.quantity;

            food.$update({}, function(){
              $location.path( "/" );
            });
        });
      } else {
        $scope.currentFood.$save();
        $location.path( "/" );
      }
};
```
In this method we are adding our food item or updating an existing food item. We start by checking the food item's id. If it has an id, we go ahead and get the server version and update the properties with the form values. If it doesn't have an id, we save the food item and redirect to the list view. Food.$save is calling the built in resource action where Food.$update is calling the custom resource action we created above -- both of these actions then interact with the Sails API on the server.

## Wrapping Up

So there we have it. While this is still an example app -- it's way more organized than the previous iterations. The code files are available in [this gist](https://gist.github.com/ryanlanciaux/6257478).
