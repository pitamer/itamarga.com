<script lang="ts">
    export let position: string
    export let isTilted: boolean
    export let color: string
</script>

<div class={`line ${position}-line ${isTilted ? 'tilted' : ''} ${color}`}>
</div>

<style lang="scss">
  .line {
    background-color: #39d353; // # var
    width: 100%;
    height: 20px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: 0.75s ease-out; // # var
    //transition: clip-path 0.75s ease-out 0.75s, width 0.75s ease-out 0s, height 0.75s; // # var

    &.top-line {align-self: flex-end;}
    &.bottom-line {align-self: flex-start;}

    &.green {background-color: #39d353;}
    &.blue {background-color: #00bcd6;}
    &.purple {background-color: #9c33ff;}
    &.red {background-color: #f25a46;}
    &.yellow {background-color: #fac840;}

    &.tilted {
      transition: 0.75s ease-out;
      //transition: clip-path 0.75s ease-out 0s, width 0.75s ease-out 0.75s, height 0.75s; // # var
      height: 110px;
      //width: 88%; // #

      &.top-line {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
        //align-self: flex-end; // #
      }

      &.bottom-line {
        clip-path: polygon(0 0, 100% 100%, 100% 100%, 0 100%);
        //align-self: flex-start; // #
      }
    }
  }
</style>
