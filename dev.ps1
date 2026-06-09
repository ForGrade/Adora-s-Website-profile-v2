$env:PATH = "$PSScriptRoot\scripts\node-bin;${env:ProgramFiles}\nodejs;$env:PATH"
& "$PSScriptRoot\scripts\node-bin\npm.cmd" run dev
