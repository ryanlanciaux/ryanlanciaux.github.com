---
title: "Running Jest on Linux"
date: "2017-08-17T16:44:03.284Z"
path: "/blog/2017/08/17/running-jest-on-linux/"
---

I frequently switch between devices and operating systems and recently ran into a strange bug when running unit tests in Linux. Jest would run just fine on macOS and Windows, but when I ran my tests on Linux I would receive an error message mentioning `ENOSPC`. This error traditionally means the hard drive is out of space.

In my case, however, I was running into an issue because I was attempting to monitor more files than the default limit in Ubuntu. Running the following command seems to fix the issue: 

```bash
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

This permanently updates the amount of watchers on the system avoiding the issue that was previously encountered. [See here for a more detailed explanation](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details)