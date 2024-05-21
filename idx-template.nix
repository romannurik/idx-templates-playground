{pkgs, ... }: {  
  packages = [
    pkgs.nodejs
  ];
  bootstrap = ''
    mkdir "$out"
    mkdir "$out"/.idx
    cp ${./dev.nix} "$out"/.idx/dev.nix
    cp ${./README.md} "$out"/README.md
    env -C "$out" npm init -y
    chmod -R u+w "$out"
  '';
}
