<script>
    import Item from './Item.svelte'
    import Line from './Line.svelte'
    import {crossfade, fade, fly} from 'svelte/transition';
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
    $: selectableItems = menuItems.filter(item => item.isSelectable && !item.isSelected)
    $: nonSelectableItems = menuItems.filter(item => !item.isSelectable)
</script>

<main>
    <div class="App">
        <Line position="top" isTilted={!selectedItem}/>

        {#if !selectedItem}
            <div class="layout-1">
                <div class="title-container">
                    <div
                        class="title-logo"
                        on:click={clearSelection}
                        in:receive="{{key: 'title'}}"
                        out:send="{{key: 'title'}}"
                    >
<!--                        Logo-->
                    </div>
                    <div class="title-text">
                        <h1
                            class="title-text-top-row"
                            in:fly={{x: -40, delay: 410}}
                            out:fly={{x: 50}}
                        >
                            I'm Itamar Galili,
                        </h1>
                        <h2
                            class="title-text-bottom-row"
                            in:fly={{x: -40, delay: 485}}
                            out:fly={{x: 50, delay: 75}}
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
                            in:receive="{{key: item.id}}"
                            out:send="{{key: item.id}}"
                        >
                            {item.name}
                        </div>
                        {/each}
                    </div>
                    <div class="items-container-group bottom-row">
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
            </div>
        {/if}

        {#if selectedItem}
            <div class="layout-2">
                <div class="items-container">
                    <div
                        class="title-logo"
                        on:click={clearSelection}
                        in:receive="{{key: 'title'}}"
                        out:send="{{key: 'title'}}"
                    >
<!--                        Logo-->
                    </div>
                    <div class="items-container-group top-row">
                        {#each selectableItems.concat(nonSelectableItems) as item (item.id)}
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
<!--                    <div class="items-container-group bottom-row">-->
<!--                        {#each nonSelectableItems as item (item.id)}-->
<!--                        <div-->
<!--                            class="item"-->
<!--                            in:receive="{{key: item.id}}"-->
<!--                            out:send="{{key: item.id}}"-->
<!--                            animate:flip-->
<!--                        >-->
<!--                            {item.name}-->
<!--                        </div>-->
<!--                        {/each}-->
<!--                    </div>-->
                </div>

                <div class="selected-wait-list">
                    {#each menuItems.filter(item => item.isSelected) as item (item.id)}
                    <div class="selected-item-content">
                        <h1
                            in:receive="{{key: selectedItem.id}}"
                            out:send="{{key: selectedItem.id}}"
                        >
                            {selectedItem.name}
                        </h1>
                        <p
                            in:fly={{x: -25, delay: 600}}
                            out:fly={{x: 25}}
                        >
                            <br>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Consectetur corporis culpa deserunt dignissimos dolore
                            dolorem doloremque ducimus incidunt iste, magni odit
                            pariatur placeat praesentium, quidem reiciendis saepe ut
                            vel voluptatum.
                            <br><br>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Consectetur corporis culpa deserunt dignissimos dolore
                            dolorem doloremque ducimus incidunt iste, magni odit
                            pariatur placeat praesentium, quidem reiciendis saepe ut
                            vel voluptatum.
                            <br><br>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Consectetur corporis culpa deserunt dignissimos dolore
                            dolorem doloremque ducimus incidunt iste, magni odit
                            pariatur placeat praesentium, quidem reiciendis saepe ut
                            vel voluptatum.
                        </p>
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

      .selected-wait-list {
        flex-grow: 1;
        display: grid;
        grid-template-columns: auto 1fr;
        height: 100%;

        .selected-item-content {
          grid-row-start: 1;
          grid-column-start: 1;
          display: flex;
          flex-flow: column;
          align-items: flex-start;
          max-width: 800px;
          margin-top: 70px;

          h1 {
            margin: 0;
            padding: 0;
          }

          p {
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
        justify-content: space-evenly;

        padding: 30px;

        .title-logo {
          border: 1px white solid;
          background-color: #223;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: grid;
          place-items: center;
        }

        .items-container-group {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          align-items: flex-start;
          height: 300px;
          .item {
            //margin: 5px 0;
          }
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
