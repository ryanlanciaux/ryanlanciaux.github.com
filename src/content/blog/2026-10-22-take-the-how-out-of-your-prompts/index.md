---
title: "Move the how out of your prompts and into your codebase"
date: "2026-10-22T12:00:00.000Z"
path: "/blog/2026/10/22/take-the-how-out-of-your-prompts/"
description: "Your prompt can't carry the burden of correctness alone. Strict types, lint rules, a design system, and deterministic checks do work a longer prompt never could."
ogImage: "./og-image.png"
tags:
  - ai-agents
  - architecture
---

I used to think a better prompt would fix a bad agent run. What started out as "Wow, look at all the things I'm not doing" quickly turned into "Why won't this thing follow instructions?" and "Why is it claiming it's done when it's not?"

After trying to prompt harder, adding wild system prompts, and getting frustrated with the agent, I've landed on the fact that I was trying to make it do something it can't do with just a prompt.

I'd fallen into a habit developers spent years unlearning.

## What React let me forget

Early in my career, the UI frequently didn't update itself when the data changed. Updating it was my responsibility. When a user pressed a button, I'd request a new screen with new data, then often set each control to match the new records, one at a time. I had to keep track of many of those steps and interactions in my head.

"We need to drop everything we're doing and use this library for the new version of our app." That was how I felt immediately after my first time trying React. UI was a projection of state. This wasn't the first library to do this, but it was so elegantly done.

Change the state, get an updated UI. I didn't have to remember to set a property value. As long as things were wired up correctly from the start, React handled the steps I used to write by hand.

Describing the UI only worked because of the machinery underneath React.

## Prompts don't have machinery

Prompts have no machinery underneath them. When an agent wasn't doing what I wanted, I tried to solve it with more prompting. The problem is agent output isn't deterministic, and a prompt isn't a deterministic check. Even if I spelled out every step, there was a non-zero chance some wouldn't be followed.

My next attempt at reining in the agent was a DAG-based workflow (or in other words, a strictly defined graph of steps). I laid out every step I wanted, in sequence. That made sure everything ran in the order I wanted. Unfortunately, it turned out to be overkill for many operations and burned a ton of tokens.

Looking back, I'd taken everything I'd appreciated about React and thrown it out the moment an agent was involved. React let me forget the machinery was there. The DAG made me build it by hand, one step at a time. What I wanted was to tell an agent the what and leave out the how. But React could do that because its machinery is deterministic. Agents aren't, so what can we do?

## Building the system around the agent

I rarely spell out the steps in a prompt anymore. I give an agent a goal and the context it needs and spend effort on the tools it uses to get there. A good system should help an agent fall into the [pit of success](https://learn.microsoft.com/en-us/archive/blogs/brada/the-pit-of-success), a system where the easy path is the right one. Here's what our configuration should provide:

### Strict codebase

Agents are good at [taking shortcuts](https://www.anthropic.com/claude-3-7-sonnet-system-card) to achieve a goal. Our codebase should be [painfully strict](https://x.com/ryanlanciaux/status/2111457456937460212) so those shortcuts don't turn into sloppy code. Linting, strict types, and locking down what can and can't be imported can help here.

### Examples

Agents [reference the code in our codebase](https://code.claude.com/docs/en/best-practices) to decide how future features should look. Any shortcuts, bad patterns, and misleading comments could influence the code that comes next. Establish the patterns we want, provide good examples when there are conflicting ways to do things, and be ruthless about removing unhelpful code comments.

### Design system

Design systems work hand-in-hand with a strict codebase and good examples. When the UI sticks to a solid design system, agents are far less likely to reinvent components we already have or build something that looks like a typical AI generated UI. Lint rules that prevent an agent from importing a base library when a design system equivalent exists ensure that it's used.

### Deterministic checks

Writing code is cheap. Being sure it's right is not. A model can build the check. It doesn't need to do the checking when something deterministic can. Giving an agent a way to check its work before it calls something complete saves time in one of the biggest bottlenecks with agents: human review. Tools like [@poteto's pstack](https://github.com/cursor/plugins/tree/main/pstack) provide verification skills, and [Microsoft](https://x.com/MSFTResearch/status/2112987215496093979), [Anthropic](https://www.anthropic.com/research/formal-verification) and others are using agents to write formal proofs, so code can be mathematically checked rather than just tested.

## Building the system is the craft now

Prompts still don't have machinery underneath them, but the system around the agent can. Strict types, lint rules, a design system, and deterministic checks do work a longer prompt never could.

Instead of demanding every step in a prompt, we give an agent a goal and the tools to get there. Inverting the burden from the prompt to the system built around what an agent can do is what makes the code better, more consistent, and more in line with what we want. None of this works without having a base knowledge of software engineering. You will have a rough time writing a good lint rule, example, or deterministic check without knowing what good code looks like. Many software developers aren't writing code by hand anymore, but the art of software development is valuable. It just looks more like building systems that unlock agents to build what we need.
