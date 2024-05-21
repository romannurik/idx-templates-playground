{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs
  ];

  # Sets environment variables in the workspace
  env = {
    # You can get a Gemini API key through the IDX Integrations panel to the left!
    GOOGLE_API_KEY = "<your-api-key>";
  };

  # Enable previews and customize configuration
  idx.previews = {
    enable = true;
    previews = [
      {
        command = [
          "npx"
          "genkit"
          "start"
          "--port"
          "$PORT"
        ];
        manager = "web";
        id = "web";
      }
    ];
  };

  idx.workspace.onCreate.init = ''
    npm i -D genkit
    tput bold ; tput setaf 202
    echo
    echo "╔══════════════════════════════════════╗"
    echo "║ Follow the instructions below to get ║"
    echo "║ started with Genkit!                 ║"
    echo "╚══════════════════════════════════════╝"
    echo
    tput init ; tput sgr0
    npx genkit init -p nodejs -m googleai
  '';
}
