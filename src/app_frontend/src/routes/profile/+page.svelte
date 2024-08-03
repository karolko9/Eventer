<script>
    import LoggedIn from "../../components/LoggedIn.svelte";
    import Wallet_Menu_Demo from "./Wallet_Menu_Demo.svelte";

</script>

<main>
    <div>todo: implementation of profile component</div>
    <LoggedIn/>
    
    <div class="wallet">
        <Wallet_Menu_Demo/>
    </div>

</main>



<style>
.wallet {
    border: 2px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    max-width: 400px;
    margin: 20px auto;
  }

</style>
