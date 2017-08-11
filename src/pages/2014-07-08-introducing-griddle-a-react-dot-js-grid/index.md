---
title: "Introducing Griddle: A React.js grid"
date: "2014-07-08T01:01:03.284Z"
path: "/blog/2014/07/08/introducing-griddle-a-react-dot-js-grid/"
---

Many of the websites I have worked on have required a grid component. As I had been exploring [React.js](http://facebook.github.io/react/) more it was made apparent that I was going to need a grid component for it to be a viable my projects. There are many great solutions for displaying grid data with React but many seem to rely  on writing wrappers for components using jQuery or other libraries. While these solutions work well, I was hoping to render entirely with React. Additionally, I wanted to avoid a dependency on libraries like jQuery / Angular if I could help it. 

I decided to try my hand at writing a grid to fit my requirements -- the outcome is [Griddle - a simple React.js grid](http://dynamictyped.github.io/Griddle/).

## What it is ##
[Griddle](http://dynamictyped.github.io/Griddle/) is a configurable grid component for React.js. The main philosophy is that the grid should render quickly, contain a lot of the expected functionality and be simple to use without dictating how the rest of the code is structured. While Griddle is far from perfect I'm pretty happy with the initial outcome. 

## Where it's going ##
As stated above Griddle is far from finished. There are a lot of things that need to be cleaned up and a good deal of functionality that needs to be added. The high-level road map is as follows: 

1. **Tests** - The initial version of this grid was mostly a coding session or two followed by some basic clean-up. Griddle should be sustainable and tests are big part of that. 
1. **Metadata** - Griddle should allow a more advanced column order, locked columns, column width, etc. Currently with the column order, for example, an initial order is set but hiding and showing the column will display this column at the end of the list.
1. **Additional User-configuration** - The user should be able to drag columns around. 
1. **Better sub-grid support** - Currently sub-grids are constrained to have the same columns as the parent and are only one-level deep. Sub-grids should be able to have entirely different columns than the parent and should be able to be nested. Finally, sub-grids should be able to be loaded from the server.
1. **More responsive options** - Columns should have an optional priority. When the grid gets below a certain size, some columns should drop off depending on the priority. Additionally there should be the option to stack certain columns when a grid gets below a specific size.  
1. **Streaming Data** - Similar to one result page per request, there should be an option to allow the grid to get the initial page and stream the rest of the data behind the scenes.

## Conclusion ##

So that is basically [Griddle](http://dynamictyped.github.io/Griddle/). The priority of the road-map items could change but that is the current order. Please [check it out](http://dynamictyped.github.io/Griddle/) and submit issues for anything you run into :)    
  
