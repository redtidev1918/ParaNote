## API reference

### Comment API

| Method | Endpoint | Notes |
|------|------|------|
| GET | `/api/v1/comments` | Fetch comments |
| POST | `/api/v1/comments` | Post a comment |
| POST | `/api/v1/comments/like` | Like |
| DELETE | `/api/v1/comments` | Delete a comment |

### User management API

| Method | Endpoint | Notes |
|------|------|------|
| GET | `/api/v1/ban` | Get the block list |
| POST | `/api/v1/ban` | Block a user |
| DELETE | `/api/v1/ban` | Unblock a user |

### Data management API

| Method | Endpoint | Notes |
|------|------|------|
| GET | `/api/v1/export` | Export data (requires `x-admin-secret`) |
| POST | `/api/v1/import` | Import data (requires `x-admin-secret`) |
| GET | `/api/v1/fetch` | Fetch a web page |

### Data migration example

```bash
# via the CLI (recommended)
paranote export -o backup.json
paranote import backup.json

# via the API
curl -H "x-admin-secret: $ADMIN_SECRET" http://localhost:4000/api/v1/export -o backup.json
curl -X POST -H "x-admin-secret: $ADMIN_SECRET" -H "Content-Type: application/json" \
     -d @backup.json http://localhost:4000/api/v1/import
```

---

