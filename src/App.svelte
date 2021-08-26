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

    let isCurrentlyTransitioning = false
    const setTransitioningBusy = () => isCurrentlyTransitioning = true
    const setTransitioningFree = () => isCurrentlyTransitioning = false

    const [send, receive] = crossfade({duration: DEFAULT_TRANSITION_DURATION, easing: cubicOut})

    const select = item => {
        if (item.isSelectable && !isCurrentlyTransitioning) {
            setTransitioningBusy()
            menuItems = menuItems.map(i => ({...i, isLastSelected: i.isSelected, isSelected: i === item}))
        }
    }

    const clearSelection = () => {
        if (!isCurrentlyTransitioning) {
            setTransitioningBusy()
            menuItems = menuItems.map(item => ({...item, isSelected: false}))
        }
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
    const flipAnimationObject = {duration: DEFAULT_TRANSITION_DURATION}

    const itemTitle = item => `<i class="${item.icon}"></i> ${item.name}`

    $: selectedItem = menuItems.find(item => item.isSelected)
    $: textLines = selectedItem?.textLines

    $: selectableItems = menuItems.filter(item => item.isSelectable && !item.isSelected)
    $: nonSelectableItems = menuItems.filter(item => !item.isSelectable)

    // Since tracking transition activity through transition events alone turns out to be problematic, this
    // will cap the truthiness time of isCurrentlyTransitioning at an approximation of the transition time
    $: if (isCurrentlyTransitioning) {
        setTimeout(setTransitioningFree, DEFAULT_TRANSITION_DURATION + SHORT_DELAY_DURATION)
    }
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
                    on:introend={setTransitioningFree}
                    on:outroend={setTransitioningFree}
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
                <div class="items-group top-group">
                    {#each selectableItems as item (item.id)}
                    <span
                        class="item"
                        on:click={() => select(item)}
                        in:receive="{itemTransitionObject(item)}"
                        out:send="{itemTransitionObject(item)}"
                    >
                        {@html itemTitle(item)}
                    </span>
                    {/each}
                </div>
                <div class="items-group bottom-group">
                    {#each nonSelectableItems as item (item.id)}
                    <a
                        class="item"
                        in:receive="{itemTransitionObject(item)}"
                        out:send="{itemTransitionObject(item)}"
                    >
                        {@html itemTitle(item)}
                    </a>
                    {/each}
                </div>
            </div>
        </div>
    {/if}

    {#if selectedItem}
        <div class="layout-2">
            <div class="items-and-logo-container">
                <div
                    class="title-logo"
                    on:click={clearSelection}
                    in:receive="{{key: 'site-logo'}}"
                    out:send="{{key: 'site-logo'}}"
                >
                </div>
                <div class="items-container">
                    <div class="items-group top-group">
                        {#each selectableItems as item (item.id)}
                        <span
                            class="item"
                            on:click={() => select(item)}
                            in:receive="{itemTransitionObject(item)}"
                            out:send="{itemTransitionObject(item)}"
                            animate:flip={flipAnimationObject}
                        >
                            {@html itemTitle(item)}
                        </span>
                        {/each}
                    </div>
                    <div class="items-group bottom-group">
                        {#each nonSelectableItems as item (item.id)}
                        <a
                            class="item"
                            in:receive="{itemTransitionObject(item)}"
                            out:send="{itemTransitionObject(item)}"
                            animate:flip={flipAnimationObject}
                        >
                            {@html itemTitle(item)}
                        </a>
                        {/each}
                    </div>
                </div>
            </div>

            <div class="selected-item-slot">
                {#each menuItems.filter(item => item.isSelected) as item (item.id)}
                <div class="selected-item">
                    <h1
                        in:receive="{itemTransitionObject(item)}"
                        out:send="{itemTransitionObject(item)}"
                        on:introend={setTransitioningFree}
                        on:outroend={setTransitioningFree}
                    >
                        {@html itemTitle(item)}
                    </h1>
                    <div>
                        {#each textLines as textLine, index (index)}
                            <div
                                in:fly={{y: -SMALL_FLY_POSITION_DIFFERENCE, delay: index * (TOTAL_TEXT_LINES_TRANSITION_IN_DURATION / textLines.length) + LONG_DELAY_DURATION}}
                                out:fly={{x: SMALL_FLY_POSITION_DIFFERENCE, delay: index * (TOTAL_TEXT_LINES_TRANSITION_IN_DURATION / textLines.length)}}
                            >
                            {@html textLine}
                            </div>
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    .layout-1 {
      flex-grow: 1;
      max-height: 80%;

      display: flex;
      flex-flow: column;
      justify-content: space-evenly;

      .title-container {
        display: flex;
        flex-flow: column;
        place-items: center;

        .title-logo {
          border: 2px white solid;
          background-color: #223;
          width: 175px;
          height: 175px;
          border-radius: 50%;
        }

        .title-text {
          display: flex;
          flex-flow: column;
          align-items: center;

          .title-text-top-row {
            font-size: 40px;
            margin: 20px 0 0 0;
          }

          .title-text-bottom-row {
            font-size: 30px;
            margin: 15px 0 0 0;
          }
        }
      }

      .items-container {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        height: 110px;

        .items-group {
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
      max-height: 96%;

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
          max-width: 850px;
          margin: 0 40px 0 0;

          h1 {
            margin: 0;
            padding: 0;
          }

          div {
            font-size: 21px;
            line-height: 32px;
          }
        }
      }

      .items-and-logo-container {
        display: flex;
        flex-flow: column;
        max-width: 200px;
        justify-content: center;
        padding: 0 30px;

        .title-logo {
          border: 1px white solid;
          background-color: #223;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          margin: 20px 2px;
        }

        .items-container {
          height: 40%;
          display: flex;
          flex-flow: column;

          .items-group {
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            align-items: flex-start;

            &.top-group {
              flex-grow: 3;
            }

            &.bottom-group {
              flex-grow: 4;
            }

            .item {
              @extend %clickable-button;
            }
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
