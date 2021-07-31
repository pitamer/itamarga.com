<script>
    import Item from './Item.svelte'

    let isTilted = true
    const toggleTilt = () => isTilted = !isTilted

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
</script>

<main>
    <div class="App" on:click={toggleTilt}>
        <div class={`line top-line ${isTilted ? 'tilted' : ''}`}>
        </div>
        <div class="title-container">
            <div class="title-logo">
                Logo
            </div>
            <div class="title-text">
                <h1 class="title-text-top-row">
                    I'm Itamar Galili,
                </h1>
                <h2 class="title-text-bottom-row">
                    a software developer
                </h2>
            </div>
        </div>
        <div class="items-container">
            <div class="items-container-row top-row">
                {#each menuItems.filter(item => item.isSelectable) as {id, name}}
                    <Item name={name}/>
                {/each}
            </div>
            <div class="items-container-row bottom-row">
                {#each menuItems.filter(item => !item.isSelectable) as {id, name}}
                    <Item name={name}/>
                {/each}
            </div>
        </div>
        <div class={`line bottom-line ${isTilted ? 'tilted' : ''}`}>
        </div>
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

    .line {
      background-color: #39d353; // # var
      width: 100%;
      height: 75px;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      transition: 0.75s ease-out; // # var

      &.tilted {
        transition: 0.75s ease-out; // # var
        height: 100px;

        &.top-line {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
        }

        &.bottom-line {
          clip-path: polygon(0 0, 100% 100%, 100% 100%, 0 100%);
        }
      }
    }

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

      .items-container-row {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
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
