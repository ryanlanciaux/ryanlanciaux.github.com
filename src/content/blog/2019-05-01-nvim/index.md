---
title: "NeoVim for Software Development"
date: "2019-05-01T07:15:03.284Z"
path: "/blog/2017/10/26/neovim-for-software-development/"
---

I've recently been interested in
using the tried-and-true vim editor again. For those unfamiliar, vim is an
editor that was first released in 1991. Vim boasts a large community of users,
plugins, and add-ons. Most vim users configure
their editor quite heavily. This customization is one of the nicest things about
vim. That said, it's also one of the more challenging things to get right.

In order to consider my vim configuration a success, I wanted to have some
IDE like features available. Things like "find in project", "jump to file", and
linting / TypeScript support are necessary. This article is a high-level overview of how I setup NeoVim (nvim) to achieve these results.

## 1) Install nvim

I am using NeoVim (nvim) instead of the standard vim. NeoVim is a "vim-based"
text editor. It's fairly compatible with standard vim but it adds some
features around what types of things plugins can do (as well as some other things).

It's good to [follow the documentation for installing
nvim](https://github.com/neovim/neovim/wiki/Installing-Neovim). On my Mac, I ran

```
brew install --HEAD neovim
```

## 2) Install VimPlug

VimPlug is what I'm using to manage my plugins. [Take a look at the installation
documentation](https://github.com/junegunn/vim-plug). For my setup, I ran the
following:

```
curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

## 3) Set up the config files

nvim's configuration, by default, is controlled from
`.config/nvim/init.vim`. This file could contain all of the configuration
options for nvim. As time goes on, placing our configuration in one file could get unwieldy over time. Thankfully, you can [split
your vim
configuration files](https://afnan.io/2018-04-12/my-neovim-development-setup/#split-up-your-initvim) to
make it easier to manage. Following [that
guide](https://afnan.io/2018-04-12/my-neovim-development-setup/#split-up-your-initvim),
``init.vim``, loads configuration from other config files. I have the following
files but any number / name of configuration files could be used.

### 01.plugins.vim

This is where I place all my plugin installation information.

```
call plug#begin('~/.vim/plugged')
  " Plugins go here
call plug#end()
```

### 02.settings.vim ###

This settings.vim contains all of my standard nvim configuration.

### 03.plugin-settings.vim ###

Plugin configuration goes in this file. I wanted to keep this separate from the
plugin installation but it could technically be placed along side the
installation configuration file.

## 4) Configure default vim settings

[My vim settings are available
here](https://github.com/ryanlanciaux/nvim-config/blob/master/config/02.settings.vim) to see how I set this up. These settings are mostly personal preference. [Take a look at this guide on configuring vim for more info](https://www.linode.com/docs/tools-reference/tools/introduction-to-vim-customization/).

## 5) Install Plugins

With this structure in place, everything should be in a good place to begin
installing and configuring plugins. Plugins can be installed using VimPlug by
placing statements `Plug` statements between the opening and closing plug
functions. For example

```
Plug 'bling/vim-bufferline'
```

After configuring the plugins, run `:PlugInstall` to install the plugins.

A couple of plugins that I'm using are:

### [ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim)

ctrlp is described as a "Full path fuzzy file, buffer, mru, tag, ... finder for
Vim." I use this similarly to how I use Command+P in VS Code to quickly jump to
another file.

### [ctrlsf](https://github.com/dyng/ctrlsf.vim)

This plugin makes it very easy to quickly search a codebase and edit files
in the search results view.

### [Conquer of Completion](https://github.com/neoclide/coc.nvim)

This plugin is what I use to get intellisense information like VS Code. The
autocompletion is surprisingly good. The documentation boasts that it has the
same language protocol support that powers VS Code.

Conquer of completion has completion sources for TypeScript and other programming languages that
may need to be installed separately. [See the docs for more on this](https://github.com/neoclide/coc.nvim#extensions)

### [Ale](https://github.com/w0rp/ale)

Ale stands for "Asynchronous Lint Engine." Ale lives up to the name and is great at linting my JavaScript codebases.

## Wrapping up

While vim may not be for everyone and might not even be my primary editor, it 
can be a nice way to edit code. [My configuration files are available on
github](https://github.com/ryanlanciaux/nvim-config).
