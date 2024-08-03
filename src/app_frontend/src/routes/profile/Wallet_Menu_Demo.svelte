<script>
    import { onMount } from "svelte";
    import { MetaMaskStore } from "../../lib/wallet.js";
    
    const { walletState, isMetaMaskPresent, connect, loaded, init, error } = MetaMaskStore();

    onMount(() => {
      init();
    });
</script>

<main>

    <div>
        {#if $loaded}
            {#if $error}
                <p>{$error}</p>
            {:else if $isMetaMaskPresent}
                {#if $walletState.account}
                    <p>{$walletState.account}</p>
                {:else}
                    <button on:click={connect}>Connect Wallet</button>
                {/if}
            {:else}
                <p>Please install MetaMask</p>
            {/if}
        {:else}
            <p>Loading...</p>
        {/if}
    </div>
</main>

<style>

</style>



