<script lang="ts">
    export let position: string
    export let isTilted: boolean
    export let color: string
</script>

<div class={`line ${position}-line ${isTilted ? 'tilted' : ''} ${color}`}>
</div>

<style lang="scss">
  @use 'base';

  .line {
    width: 100%;
    height: 2%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: 0.75s ease-out, background-color 1.5s ease-in-out;
    position: absolute;
    z-index: 1;

    &.top-line {
      top: 0;
    }

    &.bottom-line {
      bottom: 0;
    }

    background-color: base.$green;

    &.blue {
      background-color: base.$blue;
    }

    &.purple {
      background-color: base.$purple;
    }

    &.red {
      background-color: base.$red;
    }

    &.yellow {
      background-color: base.$yellow;
    }

    &.tilted {
      height: 10%;

      &.top-line {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
      }

      &.bottom-line {
        clip-path: polygon(0 0, 100% 100%, 100% 100%, 0 100%);
      }
    }
  }
</style>
