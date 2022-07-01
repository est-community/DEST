<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Content id="simple-content"><Textfield variant="outlined" bind:value={valueB} label="New Search Query">
     <HelperText slot="helper">New Search Query</HelperText>
  </Textfield></Content>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => {
        if (!choices.includes(valueB)) {
            choices.splice(choices.length - 1, 0, valueB);
            selected = valueB
            valueB = ''
        } else {
            
        }
        
        
    }}>
      <Label>Submit</Label>
    </Button>
  </Actions>
</Dialog>

<TopAppBar bind:this={topAppBar} variant="standard">
    <Row>
      <Section>
        <IconButton class="material-icons" on:click={() => location.href = "/"}>arrow_back</IconButton>
        <Title>Settings</Title>
      </Section>
      
    </Row>
  </TopAppBar>
  <AutoAdjust {topAppBar}><br>
    <div class="text-title-mini">Your YouTube API Token</div>
    <div><a class="text-mini">Will be used for searching results. Find out how to get one </a><a href="https://github.com"  target="_blank" class="text-mini">here</a><a class="text-mini">.</a></div><br>
    <div class="columns margins">
        <div>
          <Textfield variant="outlined" bind:value={valueA} label="API Token">
            <HelperText slot="helper">YouTube API Token</HelperText>
          </Textfield>
        </div>
    </div><br>
    <div class="text-title-mini">Type of Videos</div>
    <a class="text-mini">What catagory of videos would you like, or create your own!</a><br>
    <Set chips={choices} let:chip choice bind:selected>
        {#if chip === 'Add'}
         <Chip {chip} on:click={() => {
            open = true;
        }}>
            <Text>{chip}</Text>
            <TrailingIcon class="material-icons">add</TrailingIcon>
        </Chip>
        {:else}
        <Chip {chip} >
            <Text>{chip}</Text>
        </Chip>
       {/if}
      </Set><br>
    <Button on:click={() => saveJSON()}>Save</Button>
    <Button on:click={() => {
      saveJSON()
      location.href = '/'
    }}>Save and go home</Button>
  </AutoAdjust>

  <title>DEST - Settings</title>
  <script lang="ts">
    import Icon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text';
    import Dialog, { Content, Actions } from '@smui/dialog';
    import type { TopAppBarComponentDev } from '@smui/top-app-bar';
  import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
  } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import Chip, { Set, Text, TrailingIcon } from '@smui/chips';
  import Button, { Label } from '@smui/button';
import Textfield from '@smui/textfield';
readJSON()
  function readJSON()  {
    window.eletcron.send('readSettings', '');
    window.eletcron.receive('file_contents', (e) => { 
        var hold = JSON.parse(e)["topicList"].split(",")
        hold.push("Add")
        choices = hold
        var apikey = JSON.parse(e)["API_KEY"]
        valueA = apikey
        var select = JSON.parse(e)["topic"]
        selected = select
    })
  }
  function saveJSON() {
    var realChoices = choices;
    realChoices.splice(realChoices.length - 1, 1)
    
    if (selected == "Add") {
        selected = choices[0]
    }

    var json = `
{
    "API_KEY": "` + valueA + `",
    "topic": "` + selected + `",
    "topicList": "`+ realChoices +`"
}
    `
    window.eletcron.send('writeSettings', json)
  }
  let choices = ['Chrismas Music', 'Halloween Music', 'Spring Music', 'Rain Sounds', 'Add'];
  let selected = 'Chrismas Music';
  let open = false;
  let topAppBar: TopAppBarComponentDev;
    let valueA = '';
  let valueB = '';
  </script>
  
  <style>
    /* Hide everything above this component. */
    :global(app),
    :global(body),
    :global(html) {
      display: block !important;
      height: auto !important;
      width: auto !important;
      position: static !important;
    }
    .text-title-mini {
        font-family: 'Roboto';
        font-size: 18px;
        

    }
    .text-title-reg {
        font-family: 'Roboto';
        font-size: 24px;
        
    }
    .text {
        font-family: 'Roboto';
       
    }
    .text-mini {
        font-family: 'Roboto';
        font-size: 12px;
        color: grey;
        
    }
  </style>