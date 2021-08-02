<script>
    import Item from './Item.svelte'
    import Line from './Line.svelte'
    import {fade, crossfade} from 'svelte/transition';
    import { elasticOut, cubicOut } from 'svelte/easing';
    import { flip } from 'svelte/animate';

    // const [send, receive] = crossfade({duration: d => Math.sqrt(d * 2000), easing: elasticOut});
    const [send, receive] = crossfade({duration: 750, easing: cubicOut});

    let uid = 1

    let menuItems = [
        {id: uid++, isSelectable: true, isSelected: false, name: 'About me'},
        {id: uid++, isSelectable: true, isSelected: false, name: 'Experience'},
        {id: uid++, isSelectable: true, isSelected: false, name: 'Blog'},
        {id: uid++, isSelectable: true, isSelected: false, name: 'Contact'},
        {id: uid++, isSelectable: false, name: 'LinkedIn'},
        {id: uid++, isSelectable: false, name: 'Twitter'},
        {id: uid++, isSelectable: false, name: 'StackOverflow'},
        {id: uid++, isSelectable: false, name: 'Github'},
    ]

    const select = (item) => {
        if (item.isSelectable) {
            menuItems = menuItems.map(i => ({...i, isSelected: i === item}))
        }
        else {
            console.log(item.name)
        }
    }

    const clearSelection = () => {
        menuItems = menuItems.map(i => ({...i, isSelected: false}))
    }

    $: selectedItem = menuItems.find(item => item.isSelected)
    $: selectableItems = menuItems.find(item => item.isSelectable && !item.isSelected)
    $: nonSelectableItems = menuItems.find(item => !item.isSelectable)
</script>

<main>
    <div class="App">
        <Line position="top" isTilted={!selectedItem}/>

        {#if !selectedItem}
            <div
                class="title-container"

            >
                <div
                    class="title-logo"
                    on:click={clearSelection}
                    in:receive="{{key: 'title'}}"
                    out:send="{{key: 'title'}}"
                >
                    Logo
                </div>
                <div class="title-text" transition:fade>
                    <h1 class="title-text-top-row">
                        I'm Itamar Galili,
                    </h1>
                    <h2 class="title-text-bottom-row">
                        a software developer
                    </h2>
                </div>
            </div>

            <div class="items-container-down">
                <div class="items-container-row top-row">
                    {#each selectableItems as item (item.id)}
                    <div
                        class="item"
                        on:click={() => select(item)}
                        in:receive="{{key: item.id}}"
                        out:send="{{key: item.id}}"
                    >
                        {item.name}
                    </div>
                    {/each}
                </div>
                <div class="items-container-row bottom-row">
                    {#each nonSelectableItems as item (item.id)}
                    <div
                        class="item"
                        in:receive="{{key: item.id}}"
                        out:send="{{key: item.id}}"
                    >
                        {item.name}
                    </div>
                    {/each}
                </div>
            </div>
        {/if}

        {#if selectedItem}
            {#each menuItems.filter(item => item.isSelected) as item (item.id)}
            <h1
                style="position: absolute; top: 140px; left: 30%;"
                in:receive="{{key: selectedItem.id}}"
                out:send="{{key: selectedItem.id}}"
            >
                {selectedItem.name}
            </h1>
            {/each}

            <div class="items-container-left">
                <div
                    class="title-logo"
                    on:click={clearSelection}
                    in:receive="{{key: 'title'}}"
                    out:send="{{key: 'title'}}"
                >
                    Logo
                </div>
                <div class="items-container-row top-row">
                    {#each selectableItems as item (item.id)}
                    <div
                        class="item"
                        on:click={() => select(item)}
                        in:receive="{{key: item.id}}"
                        out:send="{{key: item.id}}"
                        animate:flip
                    >
                        {item.name}
                    </div>
                    {/each}
                </div>
                <div class="items-container-row bottom-row">
                    {#each nonSelectableItems as item (item.id)}
                    <div
                        class="item"
                        in:receive="{{key: item.id}}"
                        out:send="{{key: item.id}}"
                        animate:flip
                    >
                        {item.name}
                    </div>
                    {/each}
                </div>
            </div>
        {/if}

        <Line position="bottom" isTilted={!selectedItem}/>
    </div>
</main>

<style lang="scss">
  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    background-color: #000;

    .title-container {
      display: flex;
      flex-flow: column;
      place-items: center;

      .title-logo {
        border: 1px white solid;
        background-color: #223;
        width: 175px;
        height: 175px;
        border-radius: 50%;
        display: grid;
        place-items: center;
      }

      .title-text {
        display: flex;
        flex-flow: column;

        .title-text-top-row {
          font-size: 40px;
          margin: 10px 0;
        }

        .title-text-bottom-row {
          font-size: 30px;
          margin: 10px 0;
        }
      }
    }

    .items-container-down {
      display: flex;
      flex-flow: column;

      .items-container-row {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        .item {
            margin: 0 20px;
            padding: 0 10px;
        }
      }
    }

    .items-container-left {
      display: flex;
      flex-flow: column;
      position: absolute;
      top: 40%;
      left: 5%;

      .title-logo {
          border: 1px white solid;
          background-color: #223;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: grid;
          place-items: center;
      }

      .items-container-row {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        //margin: 20px 0;
        .item {
            margin: 5px 0;
        }
      }
    }
  }

  main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: #000;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
