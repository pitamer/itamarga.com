<script>
    import Line from './Line.svelte'
    import { crossfade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { flip } from 'svelte/animate';
    import {
        DEFAULT_TRANSITION_DURATION,
        LONG_DELAY_DURATION,
        SHORT_DELAY_DURATION,
        WAVE_DELAY_BASE,
        TOTAL_TEXT_LINES_TRANSITION_IN_DURATION,
        DEFAULT_FLY_POSITION_DIFFERENCE,
        SMALL_FLY_POSITION_DIFFERENCE,
        INITIAL_MENU_ITEMS,
    } from './constants'

    let menuItems = INITIAL_MENU_ITEMS

    // #
    // let isCurrentlyTransitioning = false
    // const setIsCurrentlyTransitioning = (bool) => isCurrentlyTransitioning = bool

    const [send, receive] = crossfade({duration: DEFAULT_TRANSITION_DURATION, easing: cubicOut});

    const select = item => {
        if (item.isSelectable) {
            menuItems = menuItems.map(i => ({...i, isLastSelected: i.isSelected, isSelected: i === item}))
        }
        else {
            console.log(item.name)
        }
    }

    const clearSelection = () => {
        menuItems = menuItems.map(item => ({...item, isSelected: false}))
    }

    const getTransitionDelay = item => {
        if (selectedItem) {
            if (item.isSelected || item.isLastSelected) {
                return 0
            }
            return Math.abs(item.id - selectedItem.id) * WAVE_DELAY_BASE
        }
        return (item.id - 1) * WAVE_DELAY_BASE
    }

    const itemTransitionObject = item => ({key: item.id, delay: getTransitionDelay(item)})

    $: selectedItem = menuItems.find(item => item.isSelected)
    $: textLines = selectedItem?.textLines

    $: selectableItems = menuItems.filter(item => item.isSelectable && !item.isSelected)
    $: nonSelectableItems = menuItems.filter(item => !item.isSelectable)
</script>

<main id="App">
    <Line position="top" isTilted={!selectedItem} color={selectedItem?.color}/>

    {#if !selectedItem}
        <div class="layout-1">
            <div class="title-container">
                <div
                    class="title-logo"
                    on:click={clearSelection}
                    in:receive="{{key: 'site-logo'}}"
                    out:send="{{key: 'site-logo'}}"
                >
                </div>
                <div class="title-text">
                    <h1
                        class="title-text-top-row"
                        in:fly={{x: -DEFAULT_FLY_POSITION_DIFFERENCE, delay: LONG_DELAY_DURATION - SHORT_DELAY_DURATION}}
                        out:fly={{x: DEFAULT_FLY_POSITION_DIFFERENCE}}
                    >
                        I'm Itamar Galili,
                    </h1>
                    <h2
                        class="title-text-bottom-row"
                        in:fly={{x: -DEFAULT_FLY_POSITION_DIFFERENCE, delay: LONG_DELAY_DURATION}}
                        out:fly={{x: DEFAULT_FLY_POSITION_DIFFERENCE, delay: SHORT_DELAY_DURATION}}
                    >
                        a software developer
                    </h2>
                </div>
            </div>

            <div class="items-container">
                <div class="items-container-group top-row">
                    {#each selectableItems as item (item.id)}
                    <div
                        class="item"
                        on:click={() => select(item)}
                        in:receive="{itemTransitionObject(item)}"
                        out:send="{itemTransitionObject(item)}"
                    >
                        {item.name}
                    </div>
                    {/each}
                </div>
                <div class="items-container-group bottom-row">
                    {#each nonSelectableItems as item (item.id)}
                    <div
                        class="item"
                        in:receive="{itemTransitionObject(item)}"
                        out:send="{itemTransitionObject(item)}"
                    >
                        {item.name}
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}

    {#if selectedItem}
        <div class="layout-2">
            <div class="items-container">
                <div
                    class="title-logo"
                    on:click={clearSelection}
                    in:receive="{{key: 'site-logo'}}"
                    out:send="{{key: 'site-logo'}}"
                >
                </div>
                <div class="items-container-group">
                    {#each selectableItems.concat(nonSelectableItems) as item (item.id)}
                    <div
                        class="item"
                        on:click={() => select(item)}
                        in:receive="{itemTransitionObject(item)}"
                        out:send="{itemTransitionObject(item)}"
                        animate:flip
                    >
                        {item.name}
                    </div>
                    {/each}
                </div>
            </div>

            <div class="selected-item-slot">
                {#each menuItems.filter(item => item.isSelected) as item (item.id)}
                <div class="selected-item">
                    <h1
                        in:receive="{itemTransitionObject(item)}"
                        out:send="{itemTransitionObject(item)}"
                    >
                        {item.name}
                    </h1>
                    <div>
                        {#each textLines as textLine, index (index)}
                            <p
                                in:fly={{y: -SMALL_FLY_POSITION_DIFFERENCE, delay: index * (TOTAL_TEXT_LINES_TRANSITION_IN_DURATION / textLines.length) + LONG_DELAY_DURATION}}
                                out:fly={{x: SMALL_FLY_POSITION_DIFFERENCE, delay: index * (TOTAL_TEXT_LINES_TRANSITION_IN_DURATION / textLines.length)}}
                            >
                            {@html textLine}
                            </p>
                        {/each}
                    </div>
                </div>
                {/each}
            </div>

        </div>
    {/if}

    <Line position="bottom" isTilted={!selectedItem} color={selectedItem?.color}/>
</main>

<style lang="scss">
  @use 'base';

  #App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    background-color: #000;

    .layout-1 {
      flex-grow: 1;

      display: flex;
      flex-flow: column;
      justify-content: space-evenly;

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

      .items-container {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        height: 100px;

        .items-container-group {
          display: flex;
          justify-content: space-between;
          width: 600px;

          .item {
            @extend %clickable-button;
          }
        }
      }
    }

    .layout-1, .layout-2 {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .layout-2 {
      flex-grow: 1;

      display: flex;
      position: relative;

      .selected-item-slot {
        flex-grow: 1;
        display: grid;
        grid-template-columns: 1fr;
        place-items: center;

        .selected-item {
          grid-row-start: 1;
          grid-column-start: 1;
          display: flex;
          flex-flow: column;
          align-items: flex-start;
          max-width: 900px;
          margin-top: 70px;

          h1 {
            margin: 0;
            padding: 0;
          }

          div {
            font-size: 22px;
            line-height: 30px;
            margin: 0 40px 0 0;
          }
        }
      }

      .items-container {
        display: flex;
        flex-flow: column;
        min-width: 200px;
        justify-content: center;

        padding-left: 30px;

        .title-logo {
          border: 1px white solid;
          background-color: #223;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          cursor: pointer;
          margin: 30px 2px;
        }

        .items-container-group {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          align-items: flex-start;
          height: 300px;

          .item {
            @extend %clickable-button;
          }
        }
      }
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
