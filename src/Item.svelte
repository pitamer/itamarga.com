<script lang="ts">
    import {fade, crossfade} from 'svelte/transition';
    const [send, receive] = crossfade({duration: d => Math.sqrt(d * 200)});

    export let name: string;
    export let id: number;
</script>

<div
    class="item"
    on:click
    in:receive="{{key: item.id}}"
    out:send="{{key: item.id}}"
>
    {name}
</div>

<style lang="scss">
  .item {
    margin: 0 20px;
    padding: 0 10px;
  }
</style>
