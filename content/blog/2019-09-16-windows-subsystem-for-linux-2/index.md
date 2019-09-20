---
title: "Windows Subsystem for Linux for JavaScript development"
date: "2019-09-16T07:15:03.284Z"
path: "/blog/2019/09/16/windows-subsystem-for-linux-2/"
---

My beloved MacBook Pro is currently with Apple Care for some repairs. Unfortunately, I have a lot to do this week and no other computers that are really set up for development. While my computer is in the shop, I'm going to do my normal development work on a Windows desktop I have with [Windows Subsystem for Linux v2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-index).

[Windows Subsystem for Linux has been out for a bit of time now but a release of 2.0 is around the corner](https://docs.microsoft.com/en-us/windows/wsl/wsl2-about). There are a number of reported improvements but the one I'm most excited about is enhanced speed / performance. While I have yet to really write much code on this computer, WSL 2 seems pretty fast with the repositories I've prepared for the week ahead. 

## Install WSL 2

There are a number of guides on installing WSL 2 but the ones that I referenced were the official [Microsoft Documentation](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) and [this post by Thomas Maurer](https://www.thomasmaurer.ch/2019/06/install-wsl-2-on-windows-10/).

These guides are pretty complete but I did get tripped up a little ensuring that all my system updates were complete before attempting to install WSL. Once joining the Windows Insider Program, ensure that System Update has completed and your Windows build version is 18917 (or higher). You can determine your Windows version by running "winver".

Once WSL 2 is installed, go to the Microsoft Store and Download Ubuntu and set the WSL version `wsl --set-version Ubuntu 2` from Powershell.

Hopefully, you can run Ubuntu from the start menu but at this point in the installation process I started receiving an error:

```
The requested operation could not be completed due to a virtual disk system limitation. Virtual hard disk files must be uncompressed and unencrypted and must not be sparse. 
```

It turns out my Ubuntu directory was being compressed in Windows. Once changing compression settings for this folder, I could run my Ubuntu distro. [See this discussion on GitHub for more on that](https://github.com/microsoft/WSL/issues/4103). 


## Install nvm

nvm is a node version manager. I use it to run different projects with different versions of node. nvm can be installed with the [Setup directions from the documentation](https://github.com/nvm-sh/nvm#install--update-script) 

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

## Install node

Once nvm is installed, node can be installed by typing `nvm install v#` - I installed node v11 as the default. You can specify a default by typing `nvm alias default v11`

## Install yarn

I generally use yarn, rather than the npm cli for node dependency management. To install yarn, follow the [directions from the project's setup guide](https://yarnpkg.com/en/docs/install#debian-stable):

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Yarn should be installed on your Distro now right? For me, not so much. Once I navigated to a project and ran `yarn install`, I was greeted with a nice error message:

```
00h00m00s 0/0: : ERROR: There are no scenarios; must have at least one.
```

Upon some research, I stumbled upon [a thread on GitHub where others were encountering this same issue](https://github.com/yarnpkg/yarn/issues/2821#issuecomment-284181365). 


It turns out that there's another `yarn` that's installed through `cmdtest`. Removing cmdtest (`sudo apt remove cmdtest`) followed by the [standard yarn install instructions](https://yarnpkg.com/en/docs/install#debian-stable) should work. It should be noted that after bumping into this error and resolution I noticed that the install instructions note that Ubuntu 17.04 and above could encounter this scenario and I didn't catch it 🤦‍♂️. 


## VS Code 

If you don't have [Visual Studio Code](https://code.visualstudio.com/), you should install it and the [`Remote - WSL Plugin`](https://code.visualstudio.com/docs/remote/remote-overview)

This plugin lets you type `code .` in your Ubuntu terminal and open up the project in Code in Windows (although, [you could always use vim](http://ryanlanciaux.com/blog/2017/10/26/neovim-for-software-development/)) 


## Install zsh and set as your default shell (optional)

I use zsh as my default shell along with oh-my-zsh. Install instructions can be found here: 

- [zsh install instructions](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH#ubuntu-debian--derivatives-windows-10-wsl--native-linux-kernel-with-windows-10-build-1903)
- [oh-my-zsh install instructions](https://github.com/robbyrussell/oh-my-zsh)

## Windows Terminal

[Windows terminal](https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab) is a new terminal client for running multiple shell applications (Powershell, WSL, cmd, etc). I'm mostly using it for WSL but it's nice that you can launch a Powershell / cmd tab as well. [Windows Terminal is available in the Microsoft Store](https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab). 

By default, Powershell was my default command line application. To change this to WSL open the settings and change the `defaultProfile` property to match the guid property for your WSL distro. For example: 

```
{
  ..
  "defaultProfile": "{2c4de342-38b7-51cf-b940-2309a097f518}",
  "profiles": [
    ...,
    {
      "acrylicOpacity": 0.5,
      "closeOnExit": true,
      "colorScheme": "Solarized Dark",
      "commandline": "ubuntu",
      "cursorColor": "#FFFFFF",
      "cursorShape": "bar",
      "fontFace": "Consolas",
      "fontSize": 10,
      "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
      "historySize": 9001,
      "icon": "ms-appx:///ProfileIcons/{9acb9455-ca41-5af7-950f-6bca1bc9722f}.png",
      "name": "Ubuntu",
      "padding": "0, 0, 0, 0",
      "snapOnInput": true,
      "startingDirectory": "~/",
      "useAcrylic": false
    },  
}
```

The default profile matches the guid for my Ubuntu profile. One other thing of note, I changed my `commandline` property to `ubuntu` rather than the default to load in my home directory (there is quite possibly a better way to do that).

## Reference web applications by IP Address instead of localhost

The WSL documentation mentions this but thought it would be good to call out here as well. You currently need to access your applications by IP address rather than localhost. 

```
ip addr | grep eth0
```

This should get the IP address that you can use to reference your application.

## Wrapping Up

That's it for now - while I am looking forward to having my standard development machine back, I am excited to try WSL 2 for the next couple of days.
