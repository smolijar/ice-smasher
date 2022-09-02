<script lang="ts">
  let questions: 'questions' | null = null
  import Question from './modules/Questions.svelte'
</script>

<main>
  {#if questions === 'questions'}
    <Question />
  {:else}
    <h1>TODO front page and shit</h1>
    <button on:click={() => questions = 'questions'}>Questions</button>
  {/if}
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
  main,
  :global(body),
  :global(html) {
    height: 100%;
  }
</style>
