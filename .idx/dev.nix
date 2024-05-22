{ pkgs, ... }: {
  channel = "unstable";
  packages = [
    # pkgs.cargo
    # pkgs.rustc
    pkgs.rustup
    pkgs.stdenv.cc
  ];
  env = {};
  idx = {
    extensions = [
    ];
    workspace = {
      onCreate = {
        # npm-install = "npm install";
      };
      onStart = {
        onStart = "sh .idx/env.sh";
      };
    };
  };
}
