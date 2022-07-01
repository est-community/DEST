<!--

  DEST Video Player
  Made using SVELTE and SMUI

  index.svelte
-->
<script lang="js">
	import Fab, { Icon } from '@smui/fab';
	import { onMount } from 'svelte';
	import YoutubePlayer from 'youtube-player';
	import search from 'youtube-search'
	import { browser } from '$app/env';
	import Tooltip, { Wrapper }  from '@smui/tooltip'
import { xlink_attr } from 'svelte/internal';
	window.eletcron.send('readSettings', '');
	var player, playing;
	function fullscreen() {
		window.eletcron.send('fullscreen', "")
	}
	onMount(async () => {

		var a;
		window.eletcron.receive('file_contents', (e) => {
			
			var opts = {
				maxResults: 10,
				key: JSON.parse(e)["API_KEY"]
			};
			
			
			search(JSON.parse(e)["topic"], opts, function(err, results) {
				if(err) return console.log(err);
				
				var idlist = [];
				for (let i = 0; i < results.length; i++) {
					idlist.push(results[i]["id"])
				}
				a = idlist.join(',')
				console.log(a)
				var stateNames = {
					'-1': 'unstarted',
					0: 'ended',
					1: 'playing',
					2: 'paused',
					3: 'buffering',
					5: 'video cued',
				};
				player = YoutubePlayer('container', {
					playerVars: {
						controls: 0,
						fs: 0,
						disablekb: 1,
						playlist: a,
						loop: 1
					},
				});

				playing = 'unstarted'

				player.on('stateChange', (event) => {
					if (event.data == 2) {
						document.getElementById('icon').innerHTML = 'play_arrow';
						playing = 'no';
					} else if (event.data == 1) {
						document.getElementById('icon').innerHTML = 'pause';
						playing = 'yes';
					} else if (event.data == '-1') {
						document.getElementById('icon').innerHTML = 'play_arrow';
						playing = 'no'
					}
				});
			});
			
		});
		
		
		
	});
	
	function onPlayPauseButtonClicked() {
		if (playing == 'yes') {
			player.pauseVideo();
		} else if (playing == 'no') {
			player.playVideo();
			
		}
	}
	window.eletcron.receive('playpauseconnection', () => {
		if (playing == 'yes') {
			player.pauseVideo();
		} else if (playing == 'no') {
			player.playVideo();
		}
	})
	if (browser) {
	}
</script>
<div
	id="container"
	style="position:fixed; top:30px; left:0; bottom:0; right:0; width:100%; min-height: 100%; border:none; margin:0; padding:0px; overflow:auto;"
/>
<title>DEST</title>
<div class="flexy">
	<div class="margins">
		<div class="fab">
			<Wrapper>
				<Fab on:click={() => onPlayPauseButtonClicked()}>
					<Icon class="material-icons" id="icon">play_arrow</Icon>
				</Fab>

				<Tooltip>Play and pause the video.</Tooltip>
			</Wrapper>
			
		</div>
		<div class="settings">
			<Wrapper>
				<Fab href="settings/" on:click={() => (location.href = 'settings/')}>
					<Icon class="material-icons">settings</Icon>
				</Fab>

				<Tooltip>Look at the settings</Tooltip>
			</Wrapper>
			
		</div>
		<div class="fullscreen">
			<Wrapper>
				<Fab on:click={() => fullscreen()}>
					<Icon class="material-icons">fullscreen</Icon>
				</Fab>
				<Tooltip>Go into fullscreen mode.</Tooltip>
			</Wrapper>
			
		</div>
	</div>
</div>

<style>
	.fab {
		margin: 0px;
		top: auto;
		right: 20px;
		bottom: 20px;
		left: auto;
		position: fixed;
	}
	.settings {
		margin: 0px;
		top: auto;
		right: 20px;
		bottom: 85px;
		left: auto;
		position: fixed;
	}
	.fullscreen {
		margin: 0px;
		top: auto;
		right: 20px;
		bottom: 150px;
		left: auto;
		position: fixed;
	}
</style>
