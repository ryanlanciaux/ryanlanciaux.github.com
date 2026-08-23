---
title: "Vagrantfile for Octopress"
date: "2014-05-13T03:59:03.284Z"
path: "/blog/2014/05/13/vagrantfile-for-octopress/"
---

I've recently started using [Vagrant](http://www.vagrantup.com) for managing lightweight virtual machines for various projects. Vagrant is awesome because it allows you to:

1. **Configure an environment for a specific project / application** -- For instance, if you want to install Ruby / Rails and a mongo database, you can set up an environment specifically for your project. You don't need to worry about messing up another project's requirements because each project can have it's own!
1. **Save system resources** -- Vagrant starts Virtual Machines in headless mode (no UI) -- the VM I'm using for my blog (which we'll see more in a second) is only using 512megs of RAM and it runs without any hiccups. Additionally, these VMs take virtually no hard-drive space when you are not using them. When you're done using a machine, you can remove it, keeping only the Vagrantfile and provision scripts. Your scripts can be run later on and your environment will be setup exactly as it was the last time it was configured. 
1. **Edit all your code from your host machine** -- Often times with development VMs, I would treat the machine as if it was a standalone computer (installing vim / sublime, etc. etc). Using Vagrant, however, you can edit the code on the host machine and simply run/serve the application with the VM (it should be noted you definitely could do this with standard VMs -- it's just a bit easier with Vagrant). As a developer who is pretty OCD about IDE configuration, this is a fantastic feature. 
1. **Easily share machines with other developers** -- Vagrant cuts down on the need for sharing giant virtual machines between different computers / developers. You can simply share your Vagrantfile and provision scripts and you have the same environment on any machine (assuming that machine can run Vagrant, etc.). 

## Vagrant File
We are going to walk through the Vagrantfile and provisioning script I'm using for my blog. First off, the [Vagrantfile](https://docs.vagrantup.com/v2/vagrantfile/index.html):

```
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  config.vm.provision :shell, :path => "bootstrap.sh"
  config.vm.network :private_network, ip: '10.0.33.36'
  config.ssh.forward_agent = true

  config.vm.synced_folder "../octopress", "/home/vagrant/octopress", create: false

  config.vm.provider :virtualbox do |vb|
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
    vb.customize ["modifyvm", :id, "--memory", "512"]
  end
end

```

Vagrant files are written in Ruby, however, you don't need to know Ruby to use Vagrant -- the configuration code is nothing too crazy. Lets walk through some of the more interesting parts of the Vagrantfile...

#### Box settings  

The first thing we are doing in the configuration block is defining the type of machine to use. Precise64 is a 64bit Ubuntu 12.04 machine. I generally use this one but there are [quite a few to choose from](https://vagrantcloud.com/discover/featured) in the [Vagrant Cloud](https://vagrantcloud.com/). With `box_url` we are describing where this box can be downloaded if it is not currently available on the host machine. 

#### Provision settings

Next, we are telling Vagrant to run this `bootstrap.sh` as part of it's [provisioning](https://docs.vagrantup.com/v2/provisioning/index.html) process. Provisioning is where we will define what the environment should look like so it's not just a base Ubuntu machine. You can provision a Vagrant box with Chef, Puppet, etc. but for this post I'm just using a shell script (still learning Chef). We will take a look at this shell script in a little bit. 

#### Network / Sync settings 

Following the vm configuration, we are setting up the networking and folder options for our box. The `vm.network` property is stating that when there is a webserver running on this machine, we can access it on our host browser at '10.0.33.36'. The `synced_folder` property is stating that the folder `octopress` living in a sibling folder to the folder that the Vagrantfile is contained in should be accessible within the virtual machine as `~/octopress`. The octopress directory already exists (and has it's own github repo) so we do not want to recreate it. 

#### Additional settings 
Finally, in the provider block toward the bottom of this script we are adjusting the memory used and setting a property that allows us to use symbolic links. 

## Provisioning Script

As we talked about earlier, the provisioning script is what differentiates our box from a base Ubuntu machine. In the case of this example it's basically just a shell script. 

```
#!/usr/bin/env bash
HOME="/home/vagrant"
PROV_FILE=.vagrant_provision.lock

#inspired by https://github.com/junwatu/nodejs-vagrant 
if [ -f $PROV_FILE ];
then
    echo "Already Provisioned"
else
    touch $PROV_FILE

    sudo apt-get install -y git make

    git clone https://github.com/sstephenson/rbenv.git $HOME/.rbenv

    # Install ruby-build
    git clone https://github.com/sstephenson/ruby-build.git $HOME/.rbenv/plugins/ruby-build

    $HOME/.rbenv/bin/rbenv install 1.9.3-p194
    $HOME/.rbenv/bin/rbenv global 1.9.3-p194

    #Add rbenv to PATH
    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> $HOME/.profile
    echo 'eval "$(rbenv init -)"' >> $HOME/.profile

    #own rbenv as the vagrant user
    sudo chown -Rf vagrant $HOME/.rbenv

    #don't like doing this
    sudo su - vagrant -c "rbenv rehash && cd /home/vagrant/octopress/ && gem install bundler"
    sudo su - vagrant -c "cd /home/vagrant/octopress/ && bundle install"
fi
```

I'm not going to spend as much time on this as it's not too interesting if you know shell scripting (and there is probably a better way to do a lot of this). 

1. Check to see if the provision lock exists. If it does it means our box is already setup and we shouldn't configure our environment again. 
1. If the lock file does not exist we are create it 
1. Get git and make
1. Install rbenv and Ruby `1.9.3-p194` (that was the version I was using when my blog was on an actual machine so I'll stick with that for now)
1. modify the path so it contains the Ruby defined in rbenv
1. Change the ownership of the .rbenv file from the privileged user (sudo) to vagrant -- if you don't do this, you will not be able to use the gem files when you ssh into the box later on. 
1. Rehash rbenv so it uses the right Ruby version and install the bundler gem as the vagrant user
1. Install the files required to run octopress (as it says in the comment, I really don't like the sudo su - vagrant commands)

## Running the machine

Once everything is setup, you can simply say `vagrant up`. Vagrant will then run through the Vagrantfile and the script to configure the environment. Once the configuration is complete, you can say `vagrant ssh`. Once you are ssh'd into the box, you can `cd octopress`, `rake generate`, `rake preview`, etc (see [Octopress docs](http://octopress.org/docs/blogging/) for more information). When finished, `vagrant halt` will shut down the VM. If you need to destroy the box, you simply can type `vagrant destroy`. Removing the machine does not remove the code in the synced folders or the Vagrant scripts. Running `vagrant up` will configure the machine all over again and your code will still be intact where you left off.

## Finishing up

I have tossed this [Octopress Vagrantfile and provision script on github](https://github.com/ryanlanciaux/octopress-vagrant). For more information on Vagrant, check out the [Vagrant site](http://www.vagrantup.com). Of further note, I referenced [junwatu's Vagrant script](https://github.com/junwatu/nodejs-vagrant) when writing the Octopress script. Please feel free to [submit pull requests](https://github.com/ryanlanciaux/ryanlanciaux.github.com) for any corrections that you may have to this content. 


