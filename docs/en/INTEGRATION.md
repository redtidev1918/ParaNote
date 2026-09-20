## Integration guide

### Script attributes

| Attribute | Required | Default | Notes |
|--------|------|--------|------|
| `src` | yes | - | URL of `embed.js` |
| `data-site-id` | yes | `default-site` | Unique site identifier |
| `data-api-base` | no | inferred | Backend API base URL |

### JWT user authentication

The token is a standard HS256 JWT whose payload must contain `siteId` and `sub`.

**Node.js**
```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign({
  siteId: 'my-site',
  sub: user.id,
  name: user.username,
  avatar: user.avatarUrl,
  role: 'admin'  // optional; admins may delete any comment
}, process.env.PARANOTE_SECRET);
```

**Python**
```python
import jwt, time
token = jwt.encode({
    "siteId": "my-site",
    "sub": str(user.id),
    "name": user.username,
    "exp": int(time.time()) + 3600
}, "YOUR_SECRET", algorithm="HS256")
```

**Front-end injection**
```html
<script>window.PARANOTE_TOKEN = "eyJhbGciOiJIUzI1Ni...";</script>
```

**Server configuration**
```bash
SITE_SECRETS='{"my-site":"YOUR_SECRET"}'
```

### Anonymous users

Without a user system, ParaNote derives a unique visitor identity from the IP address:

- **Stable identity**: `访客-a1b2c3` (based on an IP hash)
- **Stable avatar**: the same IP keeps a fixed avatar colour
- **Likes supported**: anonymous users can like (de-duplicated per IP)

### Style customisation

```css
:root {
  --na-bg: #f7f7f7;          /* background */
  --na-card-bg: #ffffff;     /* card background */
  --na-primary: #bd1c2b;     /* accent colour */
  --na-text: #333333;        /* text colour */
  --na-sidebar-width: 380px; /* sidebar width */
}
```

---

