#!/bin/bash


# Deploy the ICrc1 ledger
dfx deploy icrc1_ledger_canister --argument "(variant {
  Init = record {
    token_symbol = \"ICRC1\";
    token_name = \"L-ICRC1\";
    minting_account = record {
      owner = principal \"$(dfx identity --identity anonymous get-principal)\"
    };
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
    archive_options = record {
      num_blocks_to_archive = 1000;
      trigger_threshold = 2000;
      controller_id = principal \"$(dfx identity --identity anonymous get-principal)\";
    };
    feature_flags = opt record {
      icrc2 = true;
    };
  }
})"


# check balance
# dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {
#   owner = principal \"$(dfx identity --identity default get-principal)\";
# })"

# dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {
#   owner = principal \"$(dfx identity --identity host get-principal)\";
# })"

# dfx deploy app_backend

# approve
dfx canister call --identity default icrc1_ledger_canister icrc2_approve "(
  record {
    spender= record {
      owner = principal \"$(dfx canister id app_backend)\";
    };
    amount = 1_000_000_000: nat;
  }
)"

tx_result=$(dfx canister call app_backend transfer "(record {
  amount = 1;
  to_account = record {
    owner = principal \"$(dfx identity --identity host get-principal)\";
  };
})")

echo "tx result: ${tx_result}"
