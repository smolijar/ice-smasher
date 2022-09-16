<script lang="ts">
  import { slide } from 'svelte/transition'
  let questions: 'questions' | null = null
  import Question from './modules/Questions.svelte'
</script>

<main>
  {#if questions === 'questions'}
    <Question />
  {:else}
    <div class="splash" transition:slide>
      <img src="/cat.png" alt="Cat sitting on iceberg, by Midjourney" />
      <h1>Ice smasher</h1>
      <p>Come, sit down and join me to break the ice on your gathering</p>
      <button on:click={() => (questions = 'questions')}>Questions</button>
      <p><a href="https://github.com/grissius/ice-smasher">GitHub</a></p>
    </div>
  {/if}
</main>

<svelte:head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
    </style>
</svelte:head>

<style>
  .splash {
    color: white;
    text-align: center;
    height: 100%;
    background: linear-gradient(132deg, rgb(2, 108, 223) 0.00%, rgb(0, 246, 253) 100.00%);
  }
  img {
    margin: 100px 0 0 0;
    border: solid #eee 10px;
    border-bottom-width: 30px;
    height: 350px;
    box-shadow: 2px 2px 15px rgba(0,0,0,0.4);
    rotate: 2deg;
    position: relative;
  }
  
  main,
  :global(body),
  :global(html) {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  :global(*) {
    font-family: 'Roboto Slab', serif;
  }
</style>
