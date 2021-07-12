<script>
    import Item from './Item.svelte';

    let isTilted = true;
    const toggleTilt = () => isTilted = !isTilted;
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
                <Item name={'About me'}/>
                <Item name={'Experience'}/>
                <Item name={'Blog'}/>
                <Item name={'Contact'}/>
            </div>
            <div class={'items-container-row bottom-row'}>
                <Item name={'LinkedIn'}/>
                <Item name={'Twitter'}/>
                <Item name={'StackOverflow'}/>
                <Item name={'Github'}/>
            </div>
        </div>
        <div class={`line bottom-line ${isTilted ? 'tilted' : ''}`}>
        </div>
    </div>
</main>

<style lang="scss">
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    margin: 0 auto;
    background-color: #000;

    .line {
      background-color: #39d353; // # var
      width: 110%;
      height: 60px;
      transition: 0.5s linear;

      &.top-line {
        margin-top: -10px;
      }

      &.bottom-line {
        margin-bottom: -10px;
      }

      &.tilted {
        transform: rotate(1.8deg);
        transition: 0.5s ease-out;

        &.top-line {
          margin-top: -30px;
        }

        &.bottom-line {
          margin-bottom: -30px;
        }
      }
    }

    .title-container {
      display: flex;
      flex-flow: column;
      place-items: center;

      .title-logo {
        border: 1px white solid;
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

  //main { // # Needed?
  //  width: 100%;
  //  height: 100%;
  //  margin: 0 auto;
  //  background-color: #000;
  //}

  //h1 { // # Cool! but DELETE
  //  color: black;
  //  text-shadow:
  //          0     0     white,
  //          1px   1px   white,
  //          1px   0     white,
  //          0     1px   white,
  //          -1px  -1px  white,
  //          -1px  0     white,
  //          -1px  1px   white,
  //          0     -1px  white,
  //          1px   -1px  white;
  //}

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
