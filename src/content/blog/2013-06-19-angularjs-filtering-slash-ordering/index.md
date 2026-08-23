---
title: "Learning AngularJS II : Filtering / Ordering"
date: "2013-06-19T20:38:03.284Z"
path: "/blog/2013/06/19/angularjs-filtering-slash-ordering/"
---

Last time I wrote about some basic AngularJS functionality for interacting with a RESTful API. We're going to continue where with left off with our food inventory app to add some filtering/sorting . [Check out the first post](http://ryanlanciaux.github.io/blog/2013/06/04/learning-angularjs/) if you missed it, as we will be depending heavily on what is covered there.

### Filtering

Lets say we want to search through our food inventory for something specific like oranges. We first need to open the index.ejs (that we created in [Part 1](http://ryanlanciaux.github.io/blog/2013/06/04/learning-angularjs/)) and add the following right before our table definition.

```html
<div class="filter">
  <label for="filter">filter:</label>
  <input type="text" name="filter" ng-model="filter" />
</div>
```

The div isn't entirely necessary, however, it could be useful for applying styling (it's pretty ugly as it sits). Now that the filter definition is complete, we need to go back to our repeater definition and pipe the results through the filter as so:

```html
<tr class="row" ng-repeat="f in food | filter:filter">
```

In a console in your project directory -- fire off a `sails lift` command, navigate to http://localhost:1337 in your browser of choice and start typing in the filter input box. You'll notice that all of the model bound columns are available to be filtered (e.g. entering fruit displays only food items that were classified as fruit -- typing in orange shows only any records with orange in the name etc. etc.). Also, you may notice that this is not case sensitive.

### Ordering

Now lets add the ability to sort the data in our table. If we followed the basic example on the [AngularJS docs site](http://docs-angularjs-org-dev.appspot.com/api/ng.filter:orderBy), we could simply create a sort variable that we would modify in the table headers and reference in the orderBy of our repeater. The value of the sort property should be the names of one of our columns.

```html
<th><a ng-click="sort='name'">Name</a></th>
...
<tr class="row" ng-repeat="f in food | filter:filter | orderBy:sort">
```

To handle ascending / descending we could do something like this (however, as we'll see in a minute this may not be an ideal solution):


```html
<th><a ng-click="sort='name'; reverse=!reverse">Name</a></th>
...
<tr class="row" ng-repeat="f in food | filter:filter | orderBy:sort:reverse">
```

Unfortunately, the reverse value would be shared across all columns. That means that if I click the 'Name' column and sort it descending and then click the 'Type' column -- we will notice that it is sorting in ascending order. The problem is that the shared reverse variable is never getting reset when sorting by a different column.

To get around this, lets move our sorting functionality to the controller so we're not duplicating a lot of code:

```javascript
$scope.sort = "name";
$scope.reverse = false;

$scope.changeSort = function(value){
    if ($scope.sort == value){
      $scope.reverse = !$scope.reverse;
      return;
    }

    $scope.sort = value;
    $scope.reverse = false;
}
```

We're creating the sort and reverse properties that are referenced in the orderBy of the repeater (`orderBy:sort:reverse`) as well as a function to manage whether to change the sort column or simply change the value of reverse. If you click the 'Name' column several times, the sort will not change, however, the reverse value will (which wil trigger ascending / descending order).

Next we need to change our table headers so they call this function when clicked. As before, the column's property name will be passed as a parameter to this function:

```html
<th><a ng-click="changeSort('name')">Name</a></th>
<th><a ng-click="changeSort('type')">Type</a></th>
<th><a ng-click="changeSort('expiration')">Expiration</a></th>
```

At this point fire up the page and see how everything is looking. The sorting / filtering is all working as intended. I have created [a gist of the newly created index.ejs](https://gist.github.com/ryanlanciaux/5822098) file that you can [view here](https://gist.github.com/ryanlanciaux/5822098). In the next part of this series we will look at routes and editing our data.
