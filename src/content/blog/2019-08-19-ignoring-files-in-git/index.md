---
title: "Ignoring files in git"
date: "2019-08-19T07:15:03.284Z"
path: "/blog/2019/08/19/ignoring-files-in-git/"
---

## No, this isn't a post about .gitignore

The `.gitignore` file is a great way to exclude files from a repository for all users. This post is not about that.

I often want to ignore files that a tool / editor I use generates in a project. Others who are working in the project may not be using these same tools so adding to a `.gitignore` file may not be the best solution.

## Exclude file

There is the concept of a local exclude file in git. It works just like `.gitignore` but the file is not checked in.

It's available at `.git/info/exclude` from a project directory.

## Keep in mind

Files that should **always** be ignored should be specified in `.gitignore`. Files that you want to exclude locally could go in `.git/info/exclude` 👍
