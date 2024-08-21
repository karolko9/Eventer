<script>
    export let click = () => {};
</script>
  
<button on:click={click}><slot /></button>
  
<style>
  button{
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    border: none;
    border-radius: 20px;
    min-height: 30px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #5b2784;
    color: white;
    transition: filter 0.3s;
    transition: transform 0.1s;
  }
  button:hover{
    filter: brightness(130%);
  }
  button:active{
    transform: scale(0.95);
  }
</style>