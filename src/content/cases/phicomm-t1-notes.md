## 极客实战手记：深入晶晨 S912 寄存器逆向与 Seccomp 热修补

本文为《斐讯 T1 4K 60Hz 10bit 闪存固化与全固件自适应硬解修复实战》的官方补充 Markdown 技术手记。展示 Markdown 内容与 React 19 渲染容器解耦驱动的效果。

> [!TIP]
> 本段落由独立的 Markdown 文件通过 Vite 原生 `?raw` 解耦载入，无需在 TypeScript 复杂对象中手动转义引号与换行符。

### 一、 核心痛点回顾与为什么需要底层调校

晶晨 S912（八核 Cortex-A53 + Mali-T820MP3）作为一代经典电视盒子神 U，在搭配 4K HDR 投影仪（如明基 TK700）时，经常面临两大痛点：

1. **EDID 握手异常降级**：开机被投影仪 EDID 强制识别为 8bit 色深，导致天空、阴影等平滑过渡区域出现严重的色彩断层；
2. **调参导致硬解断流**：在尝试写入变焦寄存器或画质寄存器时，Android 7.1 的 MediaCodec 进程触发安全沙箱异常被系统处决，画面直接黑屏卡死。

### 二、 核心修复命令与实测代码

在完成全固件自适应打补丁后，可通过以下命令测试硬件变焦与色彩抖动引擎：

```bash
# 1. 验证 Seccomp 补丁是否成功注入白名单
head -n 5 /system/etc/seccomp_policy/mediacodec-seccomp.policy

# 2. 直通晶晨 VPP 协处理器下发 125% 硬件变焦（仅在 Kodi 播放中生效）
echo 125 > /sys/class/video/zoom

# 3. 启用 VPP 空间与时间混色抖动（Dithering）
echo 1 > /sys/module/am_vecm/parameters/vpp_dith_en
echo 1 > /sys/module/am_vecm/parameters/vpp_dith_mode
```

> [!WARNING]
> 硬件变焦与画质微调功能直连晶晨 VPP 硬件管线，**只在 Kodi 播放视频时才有效**！在线视频 App（如 TVBox / 影视仓）请在播放器内直接调用 Exo 播放器并选“填充”即可满屏。

### 三、 调校前后参数对比基准表

| 调校维度 | 默认状态 | 极客优化状态 | 核心收益与画质表现 |
| :--- | :--- | :--- | :--- |
| **色彩输出** | 4K 60Hz 8bit (EDID握手) | **4K 60Hz 10bit (420)** | 永久固化闪存，消除色彩断层与色阶 |
| **电影黑边** | 上下大黑边 (2.35:1) | **125% 硬件无损满屏** | 0% CPU 占用铺满 16:9 整面巨幕 |
| **硬解稳定性** | 容易触发 SIGSYS 崩溃 | **Seccomp 白名单微创修补** | 狂搓变焦与画质调色稳如磐石 |
| **遥控便捷度** | 依赖电脑连接 ADB 命令 | **手机扫码 Web 调色盘** | 躺在沙发上拿起手机随心微调 |
