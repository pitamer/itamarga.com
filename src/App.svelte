<script>
    import Line from './Line.svelte'
    import {crossfade, fly} from 'svelte/transition';
    import {cubicOut} from 'svelte/easing';
    import {flip} from 'svelte/animate';
    import {
        DEFAULT_FLY_POSITION_DIFFERENCE,
        DEFAULT_TRANSITION_DURATION,
        INITIAL_MENU_ITEMS,
        LONG_DELAY_DURATION,
        SHORT_DELAY_DURATION,
        SMALL_FLY_POSITION_DIFFERENCE,
        TOTAL_TEXT_LINES_TRANSITION_IN_DURATION,
        WAVE_DELAY_BASE,
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

<main id="app">
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
                    <img alt="avatar" src="./avatar.png" draggable="false" />
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
                    <img alt="avatar" src="./avatar.png" draggable="false" />
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

  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 16px;

    .layout-1, .layout-2 {
      width: 100%;
      height: 100%;
      flex-grow: 1;
      display: flex;
    }

    .layout-1 {
      max-height: 80%;
      position: absolute;

      flex-flow: column;
      justify-content: space-evenly;

      .title-container {
        display: flex;
        flex-flow: column;
        place-items: center;

        .title-logo {
          @include base.avatar(10em, 2px);
        }

        .title-text {
          display: flex;
          flex-flow: column;
          align-items: center;

          .title-text-top-row {
            font-size: 2.5em;
            margin: 20px 0 0 0;
          }

          .title-text-bottom-row {
            font-size: 1.9em;
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
            @include base.clickable-item;
          }
        }
      }
    }

    .layout-2 {
      max-height: 96%;
      position: relative;

      .selected-item-slot {
        flex-grow: 1;
        display: grid;
        grid-template-columns: 1fr;
        place-items: center;
        overflow-x: visible;
        @include base.completely-eliminate-desktop-scrollbars;

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
            font-size: 1.15em;
            line-height: 32px;
          }
        }
      }

      .items-and-logo-container {
        display: flex;
        flex-flow: column;
        min-width: 150px;
        max-width: 200px;
        justify-content: center;
        padding: 0 30px;

        .title-logo {
          @include base.avatar(40px, 1px);
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
              @include base.clickable-item;
            }
          }
        }
      }
    }
  }

  // tablets, landscape iPads, lo-res laptops and desktops
  @media (max-width: 1024px) {
    #app {
      font-size: 14px;
    }
  }

  // portrait tablets, portrait iPads, landscape e-readers, landscape big smartphones
  @media (max-width: 960px) {
    #app {
      font-size: 11px;

      .layout-2 {
        .selected-item-slot {
          .selected-item {
            margin: 10px 20px 0 10px;

            div {
              line-height: 22px;
            }
          }
        }
      }
    }

    @media (max-height: 480px) {
      #app {
        font-size: 8px;
      }
    }

    @media (min-height: 960px) {
      #app {
        font-size: 14px;
      }
    }

  }

  // portrait e-readers, smaller tablets, smartphones
  @media (max-width: 640px) {
    #app {
      font-size: 10px;

      .layout-1 {
        .items-container {
          height: auto;

          .items-group {
            max-width: 100vw;
            display: grid;
            grid-template-columns: 1fr 1fr;

            .item {
              justify-self: start;
              margin-left: 15%;
              margin-top: 10%;
            }
          }
        }
      }

      .layout-2 {
        flex-flow: column-reverse;

        .selected-item-slot {
          overflow-X: hidden;
          overflow-y: scroll;

          .selected-item {
            margin: 10px 9px 0 9px;

            div {
              line-height: 22px;
            }
          }
        }

        .items-and-logo-container {
          max-width: 100%;
          display: flex;
          flex-flow: row;

          box-shadow: 0 0 7px 5px #000;
          z-index: 1;

          padding: 0;
          margin: 0;

          .title-logo {
            height: 20px;
            width: 20px;
            margin: base.$mobile_selectable_items_spacing;
          }

          .items-container {
            flex-flow: row;
            flex-grow: 1;

            .items-group {
              flex-flow: row;
              justify-content: space-around;

              a {
                box-shadow: none;
              }

              .item {
                padding: base.$mobile_selectable_items_spacing;
                font-size: 0;
              }
            }
          }
        }
      }
    }

    @media (min-height: 730px) {
      #app {
        font-size: 11px;

        .layout-2 {
          .selected-item-slot {
            .selected-item {
              margin: 10px 10px 0 10px;
            }
          }
        }
      }
    }

    @media (min-height: 830px) {
      #app {
        font-size: 12px;
      }
    }

  }

  // Devices that are outrageously tiny
  @media (max-width: 319px), (max-height: 319px) {
    #app * {
      display: none;
      opacity: 0;
    }

    #app::after {
      display: flex;
      content: "Hey! That's a pretty tiny screen you've got there! Mind trying a bigger one? :)";
      font-size: 20px;
      margin: 10px;
      text-align: center;
    }
  }

</style>
