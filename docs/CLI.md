## CLI 命令行工具

ParaNote 提供完整的命令行工具，让你无需 Web 管理后台即可管理评论和用户。

### 服务器命令

```bash
# 启动服务器
paranote start [options]
  --port, -p    指定端口 (默认: 4000)
  --host        指定主机 (默认: 0.0.0.0)
  --mode, -m    部署模式: full | api | reader

# 初始化配置文件
paranote init

# 构建嵌入脚本
paranote build

# 查看版本
paranote version
```

### 数据管理

```bash
# 查看统计信息
paranote stats

# 列出评论
paranote list [options]
  --site        按站点过滤
  --work        按作品过滤
  --chapter     按章节过滤
  --limit, -n   限制数量
  --json        JSON 格式输出

# 搜索评论
paranote search <keyword> [options]
  --site        按站点过滤
  --limit, -n   限制数量
  --json        JSON 格式输出

# 删除评论
paranote delete <comment-id> [options]
  --yes, -y     跳过确认

# 导出数据
paranote export [options]
  --output, -o  输出文件路径
  --storage, -s 存储类型: file | mongo

# 导入数据
paranote import <file> [options]
  --storage, -s 存储类型: file | mongo
```

### 用户管理

```bash
# 拉黑用户
paranote ban <user-id> --site <site-id> [options]
  --reason      拉黑原因
  --yes, -y     跳过确认

# 解除拉黑
paranote unban <user-id> --site <site-id>

# 查看黑名单
paranote banlist [options]
  --site        按站点过滤
  --json        JSON 格式输出
```

### 使用示例

```bash
# 查看最新 10 条评论
paranote list --limit 10

# 搜索包含"垃圾"的评论
paranote search "垃圾" --site my-site

# 删除评论 (会显示详情并要求确认)
paranote delete abc123

# 静默删除 (用于脚本)
paranote delete abc123 -y

# 拉黑用户
paranote ban ip_abc123 --site my-site --reason "发布垃圾评论" -y

# 导出备份
paranote export -o backup.json

# 从 MongoDB 导出
paranote export -s mongo -o mongo-backup.json

# 以 JSON 格式输出 (便于管道处理)
paranote list --json | jq '.[] | .id'
```

---

