<p align="center">
    <img src="https://github.com/DeveloLongScript/DEST/raw/main/dest.png"
        height="130">
        
| :exclamation:  Some videos are appearing not to load and to show `Video Unavailable, Watch on YouTube`, which I have done research on, but don't see any fix, if you have a fix, PR it.   |
|-----------------------------------------|
| If you **REALLY** have to watch a video thats unavailable, clone the repo, run `npm install && npm run dev` to not have videos blocked |

![stage](https://img.shields.io/badge/stage-beta-important) ![server](https://img.shields.io/badge/server-sveltekit-yellow) ![ui](https://img.shields.io/badge/ui-smui-orange) ![version](https://img.shields.io/badge/version-0.1-red)

DEST is a video player, which compiles a topic into a video playlist.

# Setup

## Windows
Get the windows installer, run it and install it.
## Linux
Get the app image from the releases, run `chmod +x $appimage$`, and then run the appimage.

# Getting started

At first, there is no video playing, no playlist, nothing, just 3 lonely buttons. Click the settings one, then get a API token, which you can see how to in the section below, 
now, select the type of videos you would like to play, if its not there, click Add, and type in the type of video you would like, and then select it. Now hit save, hit the back button 
and enjoy some videos!

# API token

Go to the [Google Cloud Console](https://console.cloud.google.com/) click Select a Project, then New Project, type in any name you would like, and then hit Create. <br>
Then, hit the hamburger icon, 'APIs and Services', 'Library', then search 'YouTube Data API', hit the first result, 'Enable', 'Credentials', 'Create Credentials', 'API Key', then
copy the API key and put it in the settings of DEST.

# FAQ

## Q: Why do I need a API token?
A: We use it so we can search the topic you want on YouTube.

## Q: Why am I suddenly not getting any videos?
A: The API Token has been ratelimited, meaning you may not be able to use it until the next day.

## Q: Why am I not getting any videos, I just downloaded it
A: Make sure you read the Getting Started section.

## Q: How do I trust you with my API Token?
A: Look through the source code.

# Trobleshooting

## `Video Unavailable, Watch on YouTube` error when playing a video
Currently there are no fixes to this issue, unless someone knows how to fix it, and they make a PR.
