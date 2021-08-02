<script lang="ts">
    export let position: string
    export let isTilted: boolean
</script>

<div class={`line ${position}-line ${isTilted ? 'tilted' : ''}`}></div>

<style lang="scss">
  .line {
    background-color: #39d353; // # var
    width: 100%;
    height: 75px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: 0.75s ease-out; // # var

    &.tilted {
      transition: 0.75s ease-out; // # var
      height: 110px;

      &.top-line {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
      }

      &.bottom-line {
        clip-path: polygon(0 0, 100% 100%, 100% 100%, 0 100%);
      }
    }
  }
</style>
