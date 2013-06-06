---
layout: post
title: "Learning AngularJS"
date: 2013-06-04 21:39
comments: true
categories: [js, angular, sails]
---
I have recently been playing around with some of the client-side MV_ frameworks. I have avoided Angular for quite some time because I was not a fan of using ng-click (etc.) HTML attributes to fire off js events. The more I've used the framework, however, the less of an issue that has been to me.

As noted in a [previous post](http://ryanlanciaux.github.io/blog/2013/05/09/less-alt-plus-tab-with-sublimetext/), another framework I have been using a bit is [SailsJS](http://www.sailsjs.com). While this post is not about Sails, I am using it as the REST endpoints of the AngularJS application.

First off, sails needs to be installed. Assuming you have [node installed](https://github.com/joyent/node/wiki/Installation), just `npm install -g sails` From there, create a new sails project from the command line `sails new foodinventory` and cd into that directory. Once in the directory, create a model `sails generate model food` and a controller so we can access the model `sails generate controller food`. Open up api/models/Food.js and edit the file to look like this:

```javascript
/*---------------------
  :: Food
  -> model
---------------------*/
module.exports = {
  attributes  : {
    name: 'STRING',
    type: 'STRING',
    expiration: 'DATE',
    quantity: 'STRING', //for sake of example, ignore that this is a string...
    percentRemaining: 'INTEGER'
  }
};
```
Now go back to the console and type `sails lift`. You should be presented with a cool ascii sailboat and a message stating that sails is running on port 1337. Fire up your browser and head to http://localhost:1337 -- just to see the initial sails page. From there, navigate to /food -- this should return an empty array, which is the JSON representation what's currently stored in our food list.

Add a couple of records to the Food list by visiting http://localhost:1337/food/create?name=Spinach&type=Vegetable&expiration=2013-06-20&quantity=16oz&percentRemaining=75 and /food/create with other properties. Now that you have a couple records in, lets start with the Angular stuffs.


  *Please note that there are better ways to utilize the sails framework to write single page applications with Angular (see [here](https://github.com/balderdashy/sails/issues/273) and [here](https://github.com/balderdashy/sails/issues/205)) -- For the sake of example we're setting everything up in very few files.*


Open up your Layout file which is located in `views/layout.ejs` and add the following includes before `<%- assets.js() %>`:

```html
 <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
 <script src="http//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.2/angular.min.js"></script>
 <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular-resource.min.js"></script>
```

From here we're going to edit the default view. We can keep the same div structure as the sails default view but we're stripping out all the CSS and other content -- we should have something like this:

```html
 <h1 id="header">
   Food Inventory
 </h1>
 <div id="content">
    Some Content Goes Here
 </div>
 <div id="footer">
    <a target="_blank" href="http://sailsjs.com" class="copyright">Built with Sails.js</a>
 </div>
```

Upon refreshing this page, you can see that not much is going on; we should totally do something about that. First, we want to add the ng-app directive to the html tag in layout.ejs (it should now look like `<html ng-app="foodApp"`). This [bootstraps](http://docs.angularjs.org/tutorial/step_00) (not to be confused with [Bootstrap](http://www.getbootstrap.com)) our application, stating that the html tag is the Angular root. We could techincally add this directive to any element but the html tag is as good as any for this example.

Next, we're going to flip back to our index view (under /home) and add an Angular factory for our food app:

```javascript
    var foodApp = angular.module('foodApp', ['ngResource']);

    foodApp.factory('Food', ['$resource', function($resource){
        return $resource('/food/:id', {id:'@id'});
    }]);

```

Using the factory, we can now access Query / Get / Save / Delete functions off our Food model (the REST API under /food). By using the :id, we are stating that we can alternatively pass an id (e.g. /Food/1).

You may notice that we're injecting 'ngResource' into our module -- this is the Angular library (that we've already included in the layout page) that is used to interact with our sails REST API that we created above.

Now that we can access the data, lets add a controller.. The controller is responsible for managing the state of the application. There are plenty of tutorials that deal with [how to create a controller in Angular](http://docs.angularjs.org/tutorial/step_02), so lets just jump right in..

```javascript
function FoodController($scope, Food){
  $scope.food = Food.query();

  $scope.isFormActive = false;

  $scope.toggleForm = function(){
    if ($scope.isFormActive){
        $scope.isFormActive = false;
        return;
    }

    $scope.isFormActive = true;
    $scope.editableFood = new Food();
  };

  $scope.addFood = function(){
        $scope.editableFood.$save();
        $scope.food.push($scope.editableFood);
        $scope.toggleForm();
  };
};
```

Our controller is just a plain old javascript function that takes $scope (used to sync data between controller and the view) and our Food item as parameters. The very first line in the controller is obtaining a list of all of the Food items (essentially the same as going to /Food and copying the JSON) and storing it in the $scope.food array.

The isFormActive property is used to determine whether or not we want to show the create form. The toggle form action is used to change this active property as well as create a new model object to use with the form.

Finally, the addFood method posts the newly created food item to our API. This editableForm 'pattern' was something I first came across on [K. Scott Allen's website](http://odetocode.com/blogs/scott/archive/2013/02/21/forms-with-angularjs.aspx).

Now lets write some HTML that utilizes this controller... We'll start this process by specifying that the #content area in our layout page corresponds to the FoodController with the ng-controller directive -- Our modified #content tag should look like this: `<div id="content" ng-controller="FoodController">`. All of our $scope.___ properties are now available to use in expressions within the #content div.

Next we're going to add a repeater to show the food items.

```html
    <table>
      <thead>
        <tr class="row">
          <th>Name</th>
          <th>Type</th>
          <th>Expiration</th>
          <th>Quantity</th>
          <th>Percent Remaining</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row" ng-repeat="f in food">
            <td>{% raw %}{{f.name}}{% endraw %}</td>
            <td>{% raw %}{{f.type}}{% endraw %}</td>
            <td>{% raw %}{{f.expiration}}{% endraw %}</td>
            <td>{% raw %}{{f.quantity}}{% endraw %}</td>
            <td class="progress"><div class="bar" style="width: {% raw %}{{f.percentRemaining}}%{% endraw %}"</td>
        </tr>
      </tbody>
    </table>
```

The tr element inside the tbody is where we are telling angular to loop through all our food items. We are going to reference the current item as f and display all of its properties. You may notice in the last column that we're using Twitter Bootstrap's progress bar in addition to an Angular expression. The expressions in Angular can be quite powerful and seem to have a bit more functionality than many of the other templating frameworks. Go ahead and refresh your page to see how everything is looking so far.

Next we want to add the ability to add new items from this page

```html
  <button ng-click="toggleForm()" ng-hide="isFormActive">Add One</button>
  <button ng-click="toggleForm()" ng-show="isFormActive">Hide Form</button>
  <form ng-show="isFormActive">
      <hr />
      <label for="name">Name:</label>
      <input name="name" ng-model="editableFood.name" />
      <br />

      <label for="type">Type:</label>
      <input name="type" ng-model="editableFood.type" />
      <br />

      <label for="expiration">Expiration</label>
      <input name="expiration" ng-model="editableFood.expiration" />
      <br />

      <label for="quantity">Quantity</label>
      <input name="quantity" ng-model="editableFood.quantity" />
      <br />

      <label for="percentRemaining">Percent Remaining</label>
      <input name="percentRemaining" ng-model="editableFood.percentRemaining" /><br />

        <div class="span4 text-right">
          <div class="row">
            <button ng-click="toggleForm()">Cancel</button>
            <button ng-click="addFood()">Add</button>
          </div>
        </div>
  </form>
```

There is a bit more going on with the Angular directives in this snippet of HTML. First, you'll notice that several of our elements have ng-click directives; these directives are calling functions on the controller when the user clicks on element. In addition to the click functions, we are using the ng-show / ng-hide directives to show or hide content based on a given condition. For instance, the button for 'Add One' is only visible when isFormActive = false and the 'Hide Form' button is only visible when isFormActive = true.

We are using the ng-model directive to bind a form element to $scope.editableFood (which is being created in the toggleForm method of the FoodController). Clicking on 'Add' will call the addFood method on the FoodController -- this will post the new record to our /Food/Create and push the value into our $scope.food array. The UI will update automatically because Angular $scope properties are observed by default.

So far, we've created a simple REST API and added / retrieved data from this API with AngularJS. The full contents of the modified files are available [over here](https://gist.github.com/ryanlanciaux/5711426). I plan on writing another part in this series where we will focus on searching / ordering / filtering the displayed data and in-place editing on the food list.