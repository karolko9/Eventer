#!/bin/bash

# Define colors
RESET="\033[0m"
BOLD="\033[1m"
GREEN="\033[32m"
YELLOW="\033[33m"
CYAN="\033[36m"
RED="\033[31m"

echo -e "${BOLD}${CYAN}Deploying ledger with tokens signed to default - karol 10icp${RESET}"

dfx deploy icrc1_ledger_canister --argument "(variant {
  Init = record {
    token_symbol = \"ICRC1\";
    token_name = \"L-ICRC1\";

    transfer_fee = 10_000;
    metadata = vec {};
    initial_balances = vec {
      record {
        record {
          owner = principal \"$(dfx identity --identity default get-principal)\";
        };
        10_000_000_000; 
      };
    };

    feature_flags = opt record {
      icrc2 = true;
    };
  }
})"

echo -e "${BOLD}${GREEN}Host principal: \"$(dfx identity --identity host get-principal)\"${RESET}"

echo -e "${BOLD}${YELLOW}Querying balances...${RESET}"

dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {
  owner = principal \"$(dfx identity --identity default get-principal)\";
})"

dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {
  owner = principal \"$(dfx identity --identity host get-principal)\";
})"

echo -e "${BOLD}${CYAN}Deploying app_backend...${RESET}"

dfx deploy app_backend

echo -e "${BOLD}${YELLOW}Approving amount for app_backend...${RESET}"

dfx canister call --identity default icrc1_ledger_canister icrc2_approve "(
  record {
    spender= record {
      owner = principal \"$(dfx canister id app_backend)\";
    };
    amount = 1_000_000_000: nat;
  }
)"

echo -e "${BOLD}${CYAN}Transferring amount to host principal...${RESET}"

dfx canister call app_backend transfer "(record {
  amount = 1_000_000_000;
  to_account = record {
    owner = principal \"$(dfx identity --identity host get-principal)\";
  };
})"

echo -e "${BOLD}${YELLOW}Querying balances after transfer...${RESET}"

dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {
  owner = principal \"$(dfx identity --identity default get-principal)\";
})"

dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {
  owner = principal \"$(dfx identity --identity host get-principal)\";
})"
