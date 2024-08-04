import { writable, get } from "svelte/store";

const getMetaMaskPresent = () =>
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";

const getLocalStorageState = () => {
  if (typeof window === "undefined") {
    return {};
  }
  return JSON.parse(localStorage.getItem("walletState") || "{}");
};

// Function to convert ETH to Wei
const toWei = (ether) => {
  const factor = 1e18;
  return (parseFloat(ether) * factor).toString(16);
};

// Function to convert Wei to ETH
const fromWei = (wei, unit = 'ether') => {
  const units = {
    'ether': 1e18,
    'gwei': 1e9,
    'wei': 1,
  };
  return parseFloat(wei) / units[unit];
};

export function MetaMaskStore() {
  const loaded = writable(false);
  const isMetaMaskPresent = writable(getMetaMaskPresent());
  const walletState = writable(getLocalStorageState());
  const balance = writable(null);
  const error = writable(null);
  const transactionStatus = writable(null);

  const handleAccountsChanged = (newAccounts) => {
    if (Array.isArray(newAccounts) && newAccounts.length > 0 && newAccounts[0]) {
      const account = newAccounts[0];
      walletState.set({ account });
      fetchBalance(account);
    } else {
      walletState.set({});
      balance.set(null);
    }
  };

  const fetchBalance = async (account) => {
    try {
      const balanceWei = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest']
      });
      const balanceEth = fromWei(balanceWei, 'ether');
      balance.set(balanceEth);
    } catch (err) {
      error.set(`Failed to fetch balance: ${err.message}`);
    }
  };

  const init = async () => {
    if (!getMetaMaskPresent()) {
      loaded.set(true);
      return;
    }

    const savedState = getLocalStorageState();
    if (savedState.account) {
      try {
        const accountResponse = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accountResponse && accountResponse.length) {
          const account = accountResponse[0];
          walletState.set({ account });
          fetchBalance(account);
          window.ethereum.on("accountsChanged", handleAccountsChanged);
        }
      } catch (err) {
        error.set(`Failed to connect to MetaMask: ${err.message}`);
      }
    }

    setTimeout(() => {
      loaded.set(true);
    }, 500);

    walletState.subscribe((state) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("walletState", JSON.stringify(state));
      }
    });
  };

  const connect = async () => {
    if (!getMetaMaskPresent()) {
      error.set("MetaMask is not installed.");
      return;
    }

    try {
      const accountResponse = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accountResponse && accountResponse.length) {
        const account = accountResponse[0];
        walletState.set({ account });
        fetchBalance(account);
        window.ethereum.on("accountsChanged", handleAccountsChanged);
      }
    } catch (err) {
      error.set(`Failed to connect to MetaMask: ${err.message}`);
    }
  };

  const sendTransaction = async ({ to, value }) => {
    try {
      const from = get(walletState).account; // Correctly get the account
      const transactionParameters = {
        to,
        value: '0x' + toWei(value), // Convert value to hexadecimal
        from,
      };
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      transactionStatus.set('Pending');

      const interval = setInterval(async () => {
        const receipt = await window.ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash],
        });
        if (receipt) {
          clearInterval(interval);
          if (receipt.status) {
            transactionStatus.set('Confirmed');
          } else {
            transactionStatus.set('Failed');
          }
        }
      }, 1000);
    } catch (err) {
      error.set(`Transaction failed: ${err.message}`);
    }
  };

  return {
    isMetaMaskPresent,
    walletState,
    loaded,
    connect,
    init,
    balance,
    error,
    sendTransaction,
    transactionStatus,
  };
}
