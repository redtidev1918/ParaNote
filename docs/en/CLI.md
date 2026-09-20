## CLI

ParaNote ships a complete CLI so comments and users can be managed without the web admin UI.

### Server commands

```bash
paranote start [options]
  --port, -p    port (default: 4000)
  --host        host (default: 0.0.0.0)
  --mode, -m    deployment mode: full | api | reader

paranote init     # create the configuration file
paranote build    # build the embed script
paranote version  # print the version
```

### Data management

```bash
paranote stats                 # statistics
paranote list                  # list comments
paranote search "<keyword>"    # search comments
paranote delete <id>           # delete a comment (shows details and asks for confirmation)
paranote export -o backup.json # export data
paranote import backup.json    # import data
paranote ban <user>            # block a user
paranote unban <user>          # unblock a user
paranote banlist               # show the block list
```

---

