<script>
  import { onMount } from "svelte";
  import { MetaMaskStore } from "../lib/wallet.js";

  const { walletState, isMetaMaskPresent, connect, loaded, init, balance, error, sendTransaction, transactionStatus } = MetaMaskStore();

  let toAddress = "";
  let amount = "";

  onMount(() => {
    init();
  });

  const handleSendTransaction = () => {
    sendTransaction({ to: toAddress, value: amount });
  };
</script>

<main>

  <div>
    {#if $loaded}
      {#if $error}
        <p>{$error}</p>
      {:else if $isMetaMaskPresent}
        {#if $walletState.account}
          <p>Account: {$walletState.account}</p>
          <p>Balance: {$balance} ETH</p>
          <!-- <div>
            <input type="text" placeholder="Recipient Address" bind:value={toAddress} />
            <input type="text" placeholder="Amount in ETH" bind:value={amount} />
            <button on:click={handleSendTransaction}>Send</button>
          </div> -->
          {#if $transactionStatus}
            <p>Transaction Status: {$transactionStatus}</p>
          {/if}
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
  /* Your CSS styles */
</style>
