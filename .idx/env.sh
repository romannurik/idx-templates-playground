#!/bin/sh
rustup default nightly
rustup update
# TODO: figure out how to export PATH to all shells
export PATH=`echo /home/user/.rustup/toolchains/nightly-2024*`/bin:/home/user/.cargo/bin:$PATH
cargo install hvm bend-lang
#bend foo.bend