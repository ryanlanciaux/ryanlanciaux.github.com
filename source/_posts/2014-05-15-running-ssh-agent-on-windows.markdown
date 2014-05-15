---
layout: post
title: "Running ssh-agent on Windows"
date: 2014-05-15 03:41
comments: true
categories: [vagrant, virtual, ssh, windows]
---
There was one thing I didn't mention in my [previous post about running Octopress on a Vagrant machine](http://ryanlanciaux.github.io/blog/2014/05/13/vagrantfile-for-octopress/) -- in the machine's current state (with Windows as a host machine), we cannot deploy the site with a `rake deploy` command. The reason for this is we don't have an ssh key available to the Vagrant box. 

While we could create new keys on the Vagrant machine, this kind of seems to defeat part of the purpose of using Vagrant (setting up a development environment with little manual interaction). Additionally, we could simply share our host machine's ~/.ssh folder with our vagrant machine but this also seems kind of messy. 

Thankfully, there is a pretty simple way to get everything working to where we can use the host machine's ssh key and that is through an [ssh-agent](http://en.wikipedia.org/wiki/Ssh-agent). In the Vagrantfile we setup as part of the [previous post](http://ryanlanciaux.github.io/blog/2014/05/13/vagrantfile-for-octopress/), we are already giving our machine access to the ssh-agent with the following command `config.ssh.forward_agent = true`. The only problem with this forward_agent property is that you may not have an ssh-agent running (especially if you are on Windows). There are a couple things we can do to get around that... 

1. **Install [msysgit](http://msysgit.github.io/) and manually say ``eval `ssh-agent` `` followed by `ssh-add` (assuming your keys are id_rsa/id_rsa.pub)** -- You'd connect to your Vagrant machine after running this command and would be able to deploy, however, there are a couple of problems with this method. First off, this is a manual process you'd have to remember every time you wish to deploy. Another issue is that you have an ssh-agent process that you need to remember to get rid of down the road.
2. **Use msysgit and .profile** -- Adding the ``eval `ssh-agent` `` and `ssh-add` to the .profile would allow us to automate the process of starting the agent when loading the terminal. That being said, using the `eval` script would be bad -- it would create a new ssh-agent each time a new shell is loaded. Thankfully, [GitHub has shared a solution to this problem](https://help.github.com/articles/working-with-ssh-key-passphrases#auto-launching-ssh-agent-on-msysgit). 
3. **Use [posh-git](https://github.com/dahlbyk/posh-git) with PowerShell** -- Posh-git is a series of PowerShell scripts for git integration. Upon installing posh-git and running PowerShell, I was presented with my ssh key's password prompt. After entering the password, it started an ssh-agent and everything was good-to-go.

I generally stick with option 2, as I am not much of a PowerShell user. It's definitely nice to have the PowerShell option available as a backup, however. One thing I would really like to explore a bit more is making this working with [cmder](http://bliker.github.io/cmder/). I could not get the agent to run when using cmder (without having it launch PowerShell) but I did not spend much time on that yet. 

####Testing it out
If you want to test to make sure that your ssh-agent is running and getting shared to your vagrant machine...

1. Fire up your terminal (either PowerShell with posh-git or msysgit with the github agent code added to your .profile)
2. Navigate to the directory where your Vagrantfile is and `vagrant up` followed by `vagrant ssh`
3. Once ssh'd into your vagrant machine type `ssh -T git@github.com`

If everything is working you should see:<br /><br /> `Hi _______! You've successfully authenticated, but GitHub does not provide shell access.`