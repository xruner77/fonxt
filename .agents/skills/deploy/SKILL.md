---
name: deploy
description: 构建 fonxt.com 并部署到生产服务器 a2.xruner.tk (/www/wwwroot/fonxt.com)。
---

# 部署技能 (Deployment Skill)

当用户要求部署当前项目、发布上线或更新生产环境时，调用此技能。本技能沉淀了服务器连接凭据、目标目录路径与完整安全的部署工作流。

## 服务器配置参数

- **目标服务器**: `a2.xruner.tk` (解析 IP: `152.70.91.67`)
- **SSH 端口**: `58750`
- **登录用户**: `root`
- **SSH 私钥路径**: `~/.ssh/152.70.91.67_id_ed25519`
- **远端网站目录**: `/www/wwwroot/fonxt.com`
- **Web 运行用户/组**: `www:www`

## 推荐一键部署命令

项目已内置自动化部署脚本，可直接在项目根目录下执行：

```powershell
npm run deploy
```

或者直接执行 Node 部署脚本：
```powershell
node scripts/deploy.js
```

## 标准手动执行步骤与细节

若自动化脚本受限需分步排查或手动执行，请遵循以下规范步骤：

1. **项目构建与 SSG 预渲染**：
   ```powershell
   npm run build
   ```
   * 确保 `dist/index.html`（含 SSG 静态预渲染文本）、`dist/robots.txt`、`dist/sitemap.xml` 完整生成。

2. **本地归档压缩**：
   ```powershell
   tar -czf dist.tar.gz -C dist .
   ```

3. **SCP 安全上传**：
   ```powershell
   scp -P 58750 -i "$env:USERPROFILE\.ssh\152.70.91.67_id_ed25519" dist.tar.gz root@a2.xruner.tk:/tmp/dist.tar.gz
   ```

4. **远端解压与权限修复**：
   ```powershell
   ssh -p 58750 -i "$env:USERPROFILE\.ssh\152.70.91.67_id_ed25519" root@a2.xruner.tk "tar -xzf /tmp/dist.tar.gz -C /www/wwwroot/fonxt.com/ && rm -f /tmp/dist.tar.gz && chown -R www:www /www/wwwroot/fonxt.com/assets /www/wwwroot/fonxt.com/*.html /www/wwwroot/fonxt.com/*.png /www/wwwroot/fonxt.com/*.txt /www/wwwroot/fonxt.com/*.xml 2>/dev/null || true"
   ```
   > **注意**：宝塔面板中的 `.user.ini` 具有防篡改锁属性（`+i`），执行全局 `chown -R` 时会对该文件抛出 `Operation not permitted`。因此权限命令应精确针对静态资产，或在末尾追加 `|| true` 忽略锁定文件。

5. **本地临时归档清理**：
   ```powershell
   Remove-Item -Force dist.tar.gz
   ```

6. **部署后健康验证**：
   ```powershell
   ssh -p 58750 -i "$env:USERPROFILE\.ssh\152.70.91.67_id_ed25519" root@a2.xruner.tk "curl -I -s -H 'Host: fonxt.com' http://127.0.0.1/"
   ```
   * 确认响应 `HTTP/1.1 200 OK`，且内容长度正常。
