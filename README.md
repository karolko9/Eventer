# Internet Computer Template

Featuring Svelte 5 with Typescript and Tailwind at Frontend and Rust at the backend.

## How to run it

First run the command below to create a local instance of ICP.

```bash
dfx start --clean
```

Then you can build and deploy both frontend and backend to the started instance with.
Notice that the first run will fail as the interface is not yet generated.

```bash
dfx deploy # Repeat if failed
```
