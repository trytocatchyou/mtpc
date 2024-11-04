# Mome Template Project Cli

## get started

## install
```
npm install mtpc -g

```

## load your config
```

mtpc load -k proj_a -r https://github.com/a/b.git -n my_project -b master

-k [required] the key used by <init> command to define your project key
-r [required] the template project repo url
-n [required] project name
-b [optional] which git branch to download , default value is main

template-config.json file staged in

windows: C:\Users\{YouUserName}\.mtpc
macos: /Users/{YourUsername}/.mtpc
linux: /home/{YourUsername}/.mtpc

You can edit the configuration file directly

```

## init your project by clone template
```

mtpc init


```

