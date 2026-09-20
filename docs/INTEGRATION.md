## 站长集成指南

### 脚本配置参数

| 属性名 | 必填 | 默认值 | 说明 |
|--------|------|--------|------|
| `src` | 是 | - | 指向 embed.js 的 URL |
| `data-site-id` | 是 | default-site | 站点唯一标识 |
| `data-api-base` | 否 | 自动推导 | 后端 API 地址 |

### JWT 用户认证

Token 是标准 HS256 JWT，Payload 必须包含 `siteId` 和 `sub`。

**Node.js**
```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign({
  siteId: 'my-site',
  sub: user.id,
  name: user.username,
  avatar: user.avatarUrl,
  role: 'admin'  // 可选，管理员可删除任意评论
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

**前端注入**
```html
<script>window.PARANOTE_TOKEN = "eyJhbGciOiJIUzI1Ni...";</script>
```

**服务端配置**
```bash
SITE_SECRETS='{"my-site":"YOUR_SECRET"}'
```

### 匿名用户

未接入用户系统时，ParaNote 自动根据 IP 生成唯一访客身份：

- **稳定身份**：`访客-a1b2c3` (基于 IP hash)
- **稳定头像**：同一 IP 用户拥有固定头像颜色
- **点赞支持**：匿名用户可点赞 (基于 IP 防重复)

### 样式定制

```css
:root {
  --na-bg: #f7f7f7;          /* 背景色 */
  --na-card-bg: #ffffff;     /* 卡片背景 */
  --na-primary: #bd1c2b;     /* 主题色 */
  --na-text: #333333;        /* 文字颜色 */
  --na-sidebar-width: 380px; /* 侧边栏宽度 */
}
```

---

