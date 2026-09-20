## API 参考

### 评论 API

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/v1/comments` | 获取评论 |
| POST | `/api/v1/comments` | 发布评论 |
| POST | `/api/v1/comments/like` | 点赞 |
| DELETE | `/api/v1/comments` | 删除评论 |

### 用户管理 API

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/v1/ban` | 获取黑名单 |
| POST | `/api/v1/ban` | 拉黑用户 |
| DELETE | `/api/v1/ban` | 解除拉黑 |

### 数据管理 API

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/v1/export` | 导出数据 (需 `x-admin-secret`) |
| POST | `/api/v1/import` | 导入数据 (需 `x-admin-secret`) |
| GET | `/api/v1/fetch` | 抓取网页 |

### 数据迁移示例

```bash
# 使用 CLI (推荐)
paranote export -o backup.json
paranote import backup.json

# 使用 API
curl -H "x-admin-secret: $ADMIN_SECRET" http://localhost:4000/api/v1/export -o backup.json
curl -X POST -H "x-admin-secret: $ADMIN_SECRET" -H "Content-Type: application/json" \
     -d @backup.json http://localhost:4000/api/v1/import
```

---

