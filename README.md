You'll need to manually run:

```
export PATH=`echo /home/user/.rustup/toolchains/nightly-2024*`/bin:/home/user/.cargo/bin:$PATH
```

in your terminal to get the `bend` command line.

Then, run:

```
$ time bend run sorter.bend
```