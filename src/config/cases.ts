export interface CaseHighlightItem {
  title: string;
  desc: string;
  iconType?: 'layout' | 'visual' | 'responsive' | 'brand' | 'speed' | 'ai';
}

export interface CaseOverview {
  narrative?: string;
  target: string;
  audience: string;
  format: string;
}

export interface CaseScreenshotItem {
  image: string;
  label: string;
}

export interface CaseScreenshots {
  pcImage?: string;
  pcLabel?: string;
  mobileImages?: CaseScreenshotItem[];
}

export interface StoryCodeSnippet {
  lang: string;
  code: string;
  note?: string;
}

export interface StoryChapter {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  summary: string;
  narrative: string[];
  keyTakeaway?: string;
  codeSnippet?: StoryCodeSnippet;
}

export interface TutorialStep {
  stepNumber: string;
  title: string;
  desc: string;
  command?: string;
  commandLang?: string;
  tip?: string;
  warning?: string;
}

export interface HardwareSpecItem {
  label: string;
  value: string;
  desc: string;
}

export interface SysfsParamItem {
  name: string;
  path: string;
  defaultValue?: string;
  recommendedValue?: string;
  category: 'pq' | 'scaler' | 'hdmi' | 'window';
  categoryLabel?: string;
  effect: string;
  command?: string;
}

export interface ParamExtractionInfo {
  intro: string;
  methodology: {
    title: string;
    desc: string;
    technique: string;
  }[];
  keyParameters: SysfsParamItem[];
  probeScriptCode?: StoryCodeSnippet;
}

export interface CaseDownloadItem {
  title: string;
  fileName: string;
  fileSize: string;
  version: string;
  releaseDate: string;
  downloadUrl: string;
  md5: string;
  sha256: string;
  description: string;
  features: string[];
  installCommands: {
    label: string;
    cmd: string;
  }[];
}

export interface CaseItem {
  id: string;
  title: string;
  category: 'ip' | 'dev' | 'ai';
  categoryLabel: string;
  subtitle: string;
  description: string;
  client: string;
  year: string;
  coverImage: string;
  techStack: string[];
  highlights: string[];
  deliverables: string[];
  
  // 参考架构扩展字段（可选 + 完整向下兼容）
  tags?: string[];
  projectTime?: string;
  visitUrl?: string;
  overview?: CaseOverview;
  designHighlights?: CaseHighlightItem[];
    screenshots?: CaseScreenshots;

  // 硬核极客开发案例与实战教程扩展（可选 + 完整向下兼容）
  storyIntro?: string;
  storyChapters?: StoryChapter[];
  tutorialSteps?: TutorialStep[];
  hardwareSpecs?: HardwareSpecItem[];
  paramExtraction?: ParamExtractionInfo;
  downloadItem?: CaseDownloadItem;
}

export const caseCategories = [
  { id: 'all', label: '全部作品' },
  { id: 'ip', label: '🎨 IP形象与视觉设计' },
  { id: 'dev', label: '💻 网站 / 小程序 / App' },
  { id: 'ai', label: '⚡ AI应用与私有化落地' },
] as const;

export const casesData: CaseItem[] = [  {
    "id": "phicomm-t1-hack",
    "title": "拯救沉睡神机：斐讯 T1 (S912) 底层逆向与 4K HDR 极客影院固化实战",
    "category": "dev",
    "categoryLabel": "底层逆向与固件调优",
    "subtitle": "物理闪存微创补丁 · 晶晨 VPP 硬件直通 · 环回 ADB 幽灵提权 · 局域网全功能画质中枢",
    "description": "深入 Linux 内核、Android MediaCodec 与晶晨芯片硬件视频管线，攻克明基 BenQ TK700 投影仪 1.02 固件 EDID 降级、Kodi 调参硬解暴毙与 Surface 视窗截断等底层硬伤。免刷机无损打造 4K 60Hz 10bit HDR 满屏极客家庭影院。",
    "client": "极客自研开源项目",
    "year": "2026",
    "coverImage": "/assets/cases/case-embedded-s912.png",
    "techStack": [
      "C / C++",
      "ARM64 汇编 / Capstone",
      "Linux Kernel & eMMC",
      "Ext4 物理块热补丁",
      "MediaCodec / Seccomp",
      "Amlogic VPP 硬件管线",
      "Java Socket ADB 协议",
      "RESTful API / Web UI"
    ],
    "highlights": [
      "开机永久锁死 4K 60Hz 10bit HDR 输出（阻断 BenQ TK700 投影仪 EDID 降级）",
      "物理闪存无损打入 Seccomp 热补丁，根治调参时 MediaCodec 硬解死机崩溃",
      "0% 算力调用晶晨 VPP 硬件变焦，联动 Kodi 消除 2.35:1 宽银幕黑边",
      "环回本地 ADB 协议获取 UID 2000，免 Root 弹窗与免刷机系统控制"
    ],
    "deliverables": [
      "斐讯 T1 闪存固化与热补丁完整脚本集",
      "T1ZoomHelper.apk (v3.0) 电视端画质自启微服务",
      "PC 批处理工具 set_video_zoom.bat 与 lock_4k60hz_10bit.bat",
      "完整的底层崩溃诊断与物理扇区计算逆向手记"
    ],
    "tags": [
      "底层逆向",
      "Android系统",
      "硬件解码",
      "物理闪存补丁",
      "画质引擎",
      "家庭影院"
    ],
    "projectTime": "2026.03",
    "visitUrl": "局域网微服务 · GitHub 开源",
    "overview": {
      "narrative": "斐讯 T1 搭载晶晨 S912 八核 64 位芯片与 Mali-T820MP3 GPU，拥有出色的 4K 60Hz 10-bit HDR 硬件解码基因，曾是极客圈公认的“百元神机”。然而，当老旧硬件遇上现代家庭影院时，一系列光怪陆离的底层兼容难题接踵而至。\n\n在实际影音调校中，我们遭遇了三重暗坑：首先是显示设备的“开机色彩失忆症”——并非所有设备都有此问题，但在笔者手头的【明基 BenQ TK700 4K 投影仪】上，为了获得完整 3D 播放能力送修升级到官方 1.02 固件后，意外触发了 EDID 协议判定 Bug，导致每次开机都被强制降级为泛白发灰的 8bit；其次是软件层的“调参猝死症”——Kodi 默认播放 16:9 原盘硬件解码极其稳定，但在播放 2.35:1 宽银幕电影直接调整画面参数与变焦时，会瞬间触发 Android 沙箱处决硬解进程导致死机；最后是系统环境的严苛限制——纯官方原厂固件由于缺乏 root 权限根本无法下发底层指令，必须基于带有 Root 的官改固件底包（如原厂 1.6T57 底包制作的 DB1 官改版，root 密码 31183118）。\n\n面对只读文件系统与芯片驱动的重重封锁，本项目展开了一场手术刀式的底层逆向攻坚：改写 U-Boot ENV 闪存永久封印自动重协商、在物理 eMMC 扇区无损打入 Seccomp 补丁根治调参死机、直通晶晨 VPP 视频后处理器以 0% 算力实现满屏无损变焦，并利用本地环回 ADB 协议实现无需电脑的静默自启与手机 Web 实时遥控。",
      "target": "终结 BenQ TK700 投影仪 EDID 降级、根治 Kodi 调参硬解死机、释放 2.35:1 宽银幕视野，免刷机打造极致稳定的 4K 60Hz 10bit 极客影院。",
      "audience": "家庭影院与投影玩家、老旧硬件救赎极客、嵌入式 Linux / Android 底层逆向开发者。",
      "format": "底层物理闪存热补丁 + 电视端自启 APK (v3.0) + 手机 Web 遥控中枢"
    },
    "designHighlights": [
      {
        "title": "根治开机色深失忆",
        "desc": "穿透 BenQ TK700 升级 1.02 固件后的 EDID 降级迷局，修改 U-Boot ENV 闪存关闭自动重协商，永久焊死 4K 60Hz 10bit HDR。",
        "iconType": "layout"
      },
      {
        "title": "物理闪存扇区微创热补",
        "desc": "利用数学算法精准定位 ext4 块 327225 与 eMMC 551481 扇区，859 字节无损补丁写入物理存储，根治 Kodi 调参硬解暴毙。",
        "iconType": "visual"
      },
      {
        "title": "芯片级 VPP 硬件满屏直通",
        "desc": "突破 Android SurfaceView 负坐标视窗截断壁垒，直通晶晨 VPP 硬件后处理器，0% 算力开销消除 2.35:1 宽银幕黑边。",
        "iconType": "responsive"
      },
      {
        "title": "环回 ADB 幽灵提权自启",
        "desc": "利用固件 5555 本地调试端口环回握手免授权获取 UID 2000，开机 1 秒静默自启，打造局域网手机实时画质遥控中枢。",
        "iconType": "brand"
      }
    ],
    "screenshots": {
      "pcImage": "/assets/cases/case-embedded-s912.png",
      "pcLabel": "4K 60Hz 10bit HDR 满屏播放与终端实时状态",
      "mobileImages": [
        {
          "image": "/assets/cases/case-embedded-s912-mobile.png",
          "label": "手机端局域网画质与变焦调优面板"
        },
        {
          "image": "/assets/cases/case-embedded-s912.png",
          "label": "晶晨芯片 VPP 硬件直通与无损输出"
        }
      ]
    },
    "hardwareSpecs": [
      {
        "label": "主控芯片",
        "value": "Amlogic S912",
        "desc": "八核 64 位 ARM Cortex-A53 @ 1.5GHz / Mali-T820MP3 GPU"
      },
      {
        "label": "前置系统环境",
        "value": "DB1 官改 Root 固件",
        "desc": "基于 1.6T57 底包，内置 su (密码 31183118)，纯原厂无 Root 不可行"
      },
      {
        "label": "物理闪存介质",
        "value": "16GB eMMC 5.0",
        "desc": "精准定位 ext4 块 327225 / 物理 551481 号 4KB 扇区微创热补"
      },
      {
        "label": "视频硬件管线",
        "value": "Amlogic VPP 协处理器",
        "desc": "0% CPU 占用直通 /sys/class/video/zoom 影院变焦与 DNLP 去灰"
      },
      {
        "label": "实测联动显示设备",
        "value": "明基 BenQ TK700 4K",
        "desc": "专治售后升级 1.02 固件 (完整 3D 版) 后的 EDID 8bit 降级 Bug"
      }
    ],
    "storyIntro": "这是一场历时数周、充满戏剧性转折的软硬件底层逆向侦探录。在探索的起点，我们遇到了经典的老旧硬件救赎难题：明基 TK700 投影仪在升级 1.02 固件获得完整 3D 能力后出现的开机色彩失忆症、Kodi 动态调参时硬解进程的神秘猝死，以及只读系统下普通应用无法提权的铁壁。遵循真实客观的工程精神，我们穿透应用层表象，在闪存扇区与芯片寄存器间抽丝剥茧。以下是五幕环环相扣的极客攻坚纪实：",
    "storyChapters": [
      {
        "id": "act-1",
        "badge": "第一幕 · 侦破篇",
        "title": "明基 BenQ TK700 的“开机健忘症”与 U-Boot 闪存固化",
        "subtitle": "BenQ TK700 升级 1.02 固件后的 EDID 握手迷局：如何穿透只读文件系统，将 4K 10bit 焊死在底层物理闪存？",
        "summary": "绝大多数显示设备协商正常，但在 BenQ TK700 升级 1.02 固件后，开机总被强退为灰暗的 8bit。通过反编译晶晨 systemcontrol 守护进程，找到控制自动重协商的总开关 is.bestmode，一键将 10bit 色深写入 U-Boot ENV 闪存。",
        "narrative": [
          "故事始于一场看似平常的家庭影院画质升级。笔者手头有一台明基 BenQ TK700 4K 投影仪，出厂搭载的 1.01 固件因缺少完整的 3D 播放能力，特意送去明基官方售后升级到了支持完整 3D 的 1.02 固件。然而，正是这版固件在与斐讯 T1 握手时埋下了一枚暗雷——普通电视与投影握手均属正常，但 TK700 升级后在每次冷开机或重新插拔 HDMI 时，T1 的显示模式都会被强行洗脑重置为泛白发灰、色阶断层的 444,8bit。",
          "要驯服这台盒子，纯原厂官方固件是行不通的，因为没有内置 su 权限；我们选用了经过完整验证的 DB1 官改固件（基于原厂 1.6T57 底包，内置 su 密码 31183118）。即便有了 Root 权限，Android 的系统分区依然受只读保护，常规编写脚本向 /sys 节点写入参数，断电重启后依然会被无情冲刷得一干二净。",
          "经过对晶晨核心显示守护进程 /system/bin/systemcontrol 的反编译逆向，我们终于揪出了关键元凶：ubootenv.var.is.bestmode！当它为 true 时，系统会盲信 EDID 的自动重协商结果。只要将其置为 false，显示引擎便会彻底关闭自动重协商，无条件读取保存在底层 U-Boot ENV 闪存中的物理参数。借助晶晨特权指令 dumpsys system_control -b set，我们将 4K 60Hz 420 10bit 一劳永逸地写入物理闪存。冷启动断电再开，420,10bit 坚如磐石，开机健忘症彻底绝迹！"
        ],
        "keyTakeaway": "不要在应用层的沙滩上修碉堡。找到底层状态机的控制总开关，直接向物理闪存下发既成事实。",
        "codeSnippet": {
          "lang": "bash",
          "code": "dumpsys system_control -b set ubootenv.var.is.bestmode false\ndumpsys system_control -b set ubootenv.var.outputmode 2160p60hz420\ndumpsys system_control -b set ubootenv.var.hdmimode 2160p60hz420\ndumpsys system_control -b set ubootenv.var.colorattribute 420,10bit\ndumpsys system_control -b set ubootenv.var.2160p60hz420_deepcolor 420,10bit",
          "note": "关闭自动重协商，在物理闪存 U-Boot ENV 中永久锁死 4K 60Hz 10-bit"
        }
      },
      {
        "id": "act-2",
        "badge": "第二幕 · 惊魂篇",
        "title": "死机惊魂！直接调整画面参数时的硬解离奇“自杀”",
        "subtitle": "Kodi 原盘普通硬解原本稳定，为何在伸手调节画面视窗的一刹那，硬解管线会离奇崩溃死机？",
        "summary": "常规 16:9 播放岁月静好，但一旦在播放中动态调整画面参数，驱动层就会尝试与 init 通信，而 Seccomp 过滤器因漏写 sendto 白名单直接触发 SIGSYS 致命信号处决硬解。",
        "narrative": [
          "攻克了开机 10bit 色深后，影院体验迎来了短暂的平静。在 Kodi 中载入 4K 10bit 蓝光原盘，原生的 MediaCodec (Surface) 硬件加速运行极其平稳，色彩通透，HDR 动态范围舒展。如果只是按部就班地看完一部常规 16:9 的片子，一切看起来都完美无瑕。",
          "真正的危机发生在我们试图【直接调整画面参数】的那一刻。为了让 2.35:1 宽银幕电影更好地契合幕布，我们在播放菜单中调节画面缩放与视窗参数。就在新参数生效的瞬间，屏幕画面突然卡死定格，CPU 占用狂飙至 100%，系统随即抛出 OMX/mediaserver died，整个硬解管线轰然垮塌，甚至连遥控器都彻底失去响应。",
          "带着抓捕真凶的决心，我们翻开了 Linux 内核留下的致命崩溃日志——/data/tombstones/tombstone_05。调用栈赫然写着：signal 31 (SIGSYS), code 1 (SYS_SECCOMP)！原来在动态调参初始化时，底层驱动 libOmxVideo.so 会调用 property_set 向系统 init 通信，而底层 libc 依赖 sendto 发送本地 UNIX domain socket。然而系统的安全沙箱配置 mediacodec-seccomp.policy 竟然漏掉了 sendto 的系统调用白名单！Linux 内核当场将其判定为越权入侵，以无上威严的 SIGSYS 信号，瞬间将硬解进程当场处决！"
        ],
        "keyTakeaway": "系统崩溃很少是玄学。Tombstone 里的那一行 SIGSYS，正是内核在忠实执行它所拿到的残缺法律。",
        "codeSnippet": {
          "lang": "text",
          "code": "pid: 4011, name: media.codec\nsignal 31 (SIGSYS), code 1 (SYS_SECCOMP)\n#07 libc.so (sendto+16)\n#09 libc.so (__system_property_set+206)\n#10 libOmxVideo.so (OMX_GetHandle+176)",
          "note": "Linux 内核 Tombstone 崩溃转储：Seccomp 沙箱无情处决硬解进程"
        }
      },
      {
        "id": "act-3",
        "badge": "第三幕 · 手术篇",
        "title": "给物理闪存做“微创心脏手术”——eMMC 扇区热补丁",
        "subtitle": "只读文件系统无法挂载修改？用纯数学穿透 Ext4 文件系统，在 551481 物理扇区精准动刀！",
        "summary": "编写 Python 计算器精准测算目标策略文件在 ext4 数据块 327225 与 eMMC 物理闪存 551481 扇区的位置，利用文件头注释区以 859B 严格等长无损写入 sendto: 1，彻底解除调参死机魔咒。",
        "narrative": [
          "找到了病灶，摆在面前的却是一堵高墙：由于 system 分区采用 ext4 只读镜像且无法通过 mount -o remount,rw 重新挂载，任何试图直接修改 /system/etc/seccomp_policy/ 的常规操作都会被系统无情拒绝。如果为此重新解包、修改固件、打包并全盘重刷，不仅耗时繁琐，更容易引入未知的稳定性隐患。",
          "真正的极客从不被文件系统表象束缚。既然逻辑文件层不让动，我们就直接去物理存储层动微创手术！我们编写了自动化 Python 脚本，通过解析 ext4 的 SuperBlock、Block Group 描述符与 Inode 表，如同 GPS 卫星定位般精准算出了 mediacodec-seccomp.policy 的物理落点：它正静静躺在 system 分区的第 327225 号数据块上。",
          "叠加 system 分区在整个 eMMC 芯片上的起始偏移（1794048 扇区），我们精确折算出了它在物理设备 /dev/block/mmcblk0 中的绝对位置：第 551481 号 4KB 扇区！为了绝不破坏文件系统的校验和与 Inode 结构，我们在原文件头部的无用注释区替换写入 sendto: 1，保持 859 字节等长无损，随后用 dd 笔直写入物理扇区并刷新内存缓存。修复后再进 Kodi 随意狂搓画面调参，MediaCodec 稳若泰山，调参死机魔咒彻底化解！"
        ],
        "keyTakeaway": "当操作系统的逻辑门向你关闭时，块设备的物理扇区永远向你敞开。保持尺寸与校验的一致，是微创手术的生命线。",
        "codeSnippet": {
          "lang": "bash",
          "code": "dd if=/sdcard/block_327225_patched.bin of=/dev/block/mmcblk0 seek=551481 bs=4096 count=1 conv=notrunc\nsync && echo 3 > /proc/sys/vm/drop_caches",
          "note": "向物理闪存 551481 号扇区精准灌入 859 字节微创修补块"
        }
      },
      {
        "id": "act-4",
        "badge": "第四幕 · 破局篇",
        "title": "击穿黑边结界！芯片 VPP 视频后处理器降维打击",
        "subtitle": "软件视窗的死胡同：为何 Kodi 缩放一大于 1.0 就失灵？直通芯片硬件管线实现 0% 算力满屏！",
        "summary": "Kodi Surface 硬解下画面放大超出视窗会导致负坐标，被 Android SurfaceFlinger 暴力裁剪。跳过应用层，直接控制晶晨芯片底层 VPP 视频后处理器节点，联动 Kodi JSON-RPC 释放全屏黑边。",
        "narrative": [
          "调参死机的暗雷排除了，下一个横亘在眼前的难题是宽银幕电影的上下黑边。在 16:9 的投影幕布上播放 2.35:1 比例的大片时，上下两条宽阔的黑边极其削弱沉浸感。我们尝试在 Kodi 的视频设置里将画面缩放调整为 125%，令人匪夷所思的现象出现了：画面可以随意缩小，但只要缩放比例大于 1.0，画面就纹丝不动！",
          "这并非 Kodi 的代码缺陷，而是 Android 渲染架构的宿命限制。在 MediaCodec Surface 硬件直通模式下，解码帧由底层 SurfaceFlinger 统筹渲染。一旦画面放大，视频图层的坐标就会溢出到屏幕之外变成负坐标，SurfaceFlinger 会在图层合成时无情地将溢出区域全部截断！若退回软解，弱小的 CPU 又会在 4K 巨浪面前瞬间熔化。",
          "解决困局的钥匙不在软件层，而在芯片硬件本身。晶晨 S912 内置了一颗极其强悍的专属协处理器——VPP（Video Post Processor 视频后处理器）。它坐落在解码引擎与 HDMI 发射芯片之间，拥有独立的硬件缩放与画质增强流水线。通过向内核节点 /sys/class/video/zoom 写入 125，并配合 Kodi 环回 9090 端口发送 JSON-RPC 展开底层视窗，我们以 0% 的 CPU 与 GPU 开销，让画面以丝滑无损的画质撑满了整个幕布！"
        ],
        "keyTakeaway": "在应用层绞尽脑汁的瓶颈，在芯片底层硬件工程师眼中往往只是一组早早预留好的寄存器。",
        "codeSnippet": {
          "lang": "bash",
          "code": "echo 125 > /sys/class/video/zoom\necho '{\"jsonrpc\":\"2.0\",\"method\":\"Player.SetViewMode\",\"params\":{\"viewmode\":\"zoom\"},\"id\":1}' | nc 127.0.0.1 9090",
          "note": "向晶晨 VPP 协处理器下发 125% 硬件变焦，并联动 Kodi 展开全屏视窗"
        }
      },
      {
        "id": "act-5",
        "badge": "第五幕 · 飞升篇",
        "title": "“无门之门”——环回本地 ADB 协议的幽灵提权",
        "subtitle": "告别看电影开电脑敲命令的尴尬：如何在电视端打造开机静默自启、手机一键遥控的画质中枢？",
        "summary": "官改固件内置 su 仅允许 UID 0 和 2000 执行，普通 App 无法提权。巧妙利用 5555 调试端口常开且免验证特性，自研 Java Socket 环回直通 ADB 秒获 shell 身份，打造出零弹窗、自启动的 T1ZoomHelper (v3.0)。",
        "narrative": [
          "一切底层能力都已齐备，但极客的产品思维要求我们必须完成从“实验验证”到“优雅日用”的最后闭环：我们绝不能容忍每次看电影前，都必须先打开电脑连上 ADB 敲几行命令。必须在电视盒子里运行一个常驻微服务，开机自启、静默监听，并提供手机遥控网页。",
          "然而，官改固件的 su 二进制程序极其刁钻：它被硬编码只信任 UID 0 (root) 和 UID 2000 (shell)，普通第三方 Android 应用在调用时会被瞬间拦截；同时系统只读，无法强行植入 Magisk 或 SuperSU 管理器。这扇看似紧闭的大门，实际上留有一道无形的“后门”——固件默认开启了 5555 网络调试端口，且 ro.adb.secure=0（无需任何秘钥弹窗确认）！",
          "我们在自研应用 T1ZoomHelper (v3.0) 中设计了一套惊艳的提权机制：应用启动时，直接在本地通过纯 Java Socket 环回连接 127.0.0.1:5555，自己作为 ADB 客户端向自己发起连接！瞬间便合法获得了 UID 2000（shell）的特权身份，随后顺理成章管道输入密码 31183118 调用 su 完成硬件控制。开机 1 秒内静默自启，电视屏幕无任何弹窗打扰；躺在沙发上拿起手机，扫码打开网页，无论是 125% 满屏变焦还是晶晨 DNLP 硬件画质增强，皆在指尖实时掌控。"
        ],
        "keyTakeaway": "真正的技术美学不仅在于攻克艰难的逆向关卡，更在于最后将繁杂的底层黑科技，封装成让普通人感受不到技术存在的极简体验。",
        "codeSnippet": {
          "lang": "java",
          "code": "Socket socket = new Socket(\"127.0.0.1\", 5555);\n// 环回本地 ADB 协议握手秒获 UID 2000，管道灌入密码 31183118 调用 su\nadbChannel.exec(\"echo 31183118 | su 0 echo 125 > /sys/class/video/zoom\");",
          "note": "纯 Java Socket 本地环回免 Root 提权核心控制逻辑"
        }
      }
    ],
    "tutorialSteps": [
      {
        "stepNumber": "00",
        "title": "【核心前提】确认刷入带 Root 的官改固件",
        "desc": "请务必在动手前确认系统环境：纯原厂官方固件由于没有内置 su 提权程序，系统处于完全锁定状态，是无法执行底层固化与寄存器控制的！必须刷入带有 Root 权限的固件。本教程经完整验证的推荐固件为：基于原厂 1.6T57 底包制作的【当贝/官改 Root 固件】（固件版本号：DB1_0000_7.1.2_1.6T57_0719_SH，内置 su 且 root 密码为 31183118，默认开启 5555 调试端口）。",
        "tip": "进入盒子的【设置】->【关于本机】即可查看系统版本。若系统满足前置条件，继续往下走一路畅通无阻。"
      },
      {
        "stepNumber": "01",
        "title": "局域网连接与环境准备",
        "desc": "将斐讯 T1 连上电视或投影仪（如明基 TK700）并接入家庭 Wi-Fi，在【设置】->【网络信息】中查看盒子分配到的局域网 IP（例如 192.168.123.98）。电脑端打开 PowerShell 并进入 ADB 工具目录，建立网络连接。",
        "command": ".\\adb.exe connect 192.168.123.98:5555",
        "commandLang": "powershell",
        "tip": "若连接成功，终端将返回 connected to 192.168.123.98:5555。如遇连接超时，请确认电脑与盒子处于同一局域网网段。"
      },
      {
        "stepNumber": "02",
        "title": "PowerShell 一键固化物理闪存参数",
        "desc": "针对明基 BenQ TK700 投影仪升级 1.02 固件后开机被 EDID 强制降级为 8bit 的 Bug，在电脑端 PowerShell 中执行以下命令。该命令会自动向底层 su 灌入密码 31183118，关闭 EDID 自动探测判定，并将 4K 60Hz 10bit 持久化刻入 U-Boot ENV 物理闪存。",
        "command": "powershell -Command \"echo '31183118`ndumpsys system_control -b set ubootenv.var.is.bestmode false`ndumpsys system_control -b set ubootenv.var.outputmode 2160p60hz420`ndumpsys system_control -b set ubootenv.var.hdmimode 2160p60hz420`ndumpsys system_control -b set ubootenv.var.colorattribute 420,10bit`ndumpsys system_control -b set ubootenv.var.2160p60hz420_deepcolor 420,10bit`nstop system_control`nstart system_control`nexit' | .\\adb.exe shell su\"",
        "commandLang": "powershell",
        "tip": "指令执行后电视屏幕可能会短暂闪烁 1 秒，这是 system_control 显示守护进程热重启生效的正常物理反应。"
      },
      {
        "stepNumber": "03",
        "title": "冷重启并核验硬件闪存状态",
        "desc": "执行重启命令，等待盒子彻底冷启动完成后，读取 HDMI 物理驱动节点与 eMMC 闪存 ENV 分区，确认 420,10bit 是否已在 BenQ TK700 上永久生效。",
        "command": ".\\adb.exe shell \"cat /sys/class/amhdmitx/amhdmitx0/attr && strings /dev/block/env | grep -E 'color|bestmode'\"",
        "commandLang": "bash",
        "tip": "期望返回包含 420,10bit 与 is.bestmode=false。此时无论投影仪开机、关机或插拔信号线，色深已 100% 永久焊死。"
      },
      {
        "stepNumber": "04",
        "title": "安装 T1ZoomHelper (v3.0) 电视端画质自启服务",
        "desc": "通过 ADB 安装自研的电视端后台服务 APK，并首次拉起激活。该微服务开机 1 秒内通过本地环回 ADB 静默自启，采用 Notification.PRIORITY_MIN 极低优先级前台保活，屏幕 0 像素遮挡，功耗几乎为零。",
        "command": ".\\adb.exe install -r T1ZoomHelper.apk\n.\\adb.exe shell am start -n com.phicomm.t1zoom/.MainActivity",
        "commandLang": "powershell",
        "tip": "安装激活后即可彻底拔掉电脑！以后无论是遥控关机还是拔插头冷断电，服务都会在开机时全自动拉起就绪。"
      },
      {
        "stepNumber": "05",
        "title": "手机扫码访问 Web 调色盘与一键去黑边",
        "desc": "手机连上同一 Wi-Fi，打开手机浏览器访问 http://盒机IP:8989（例如 http://192.168.123.98:8989），即可实时拖动滑块调节亮度、对比度、饱和度与晶晨 DNLP 硬件去灰，所有参数自动持久化保存。",
        "tip": "放映 2.35:1 宽银幕大片时，手机轻触【125% 影院变焦】，上下恼人黑边瞬间消失，画面无损等比铺满整面 16:9 幕布！"
      },
      {
        "stepNumber": "06",
        "title": "Kodi 配合使用避坑高能预警",
        "desc": "特别提醒：Kodi 播放普通的 16:9 片源时硬解原本完全稳定正常；去黑边只需手机点按 125% 硬件变焦即可。在 Kodi 的“视频设置”中，全局默认视图模式请务必保持为【正常 (Normal)】！",
        "warning": "千万切勿手滑将【拉伸 16:9】设为默认设置！否则以后打开任何标准的 16:9 电视剧或综艺时，画面都会被强行压扁变形！"
      }
    ],
    "paramExtraction": {
      "intro": "晶晨 S912 八核 64 位芯片在 Linux 内核层内置了庞大而精密的 VPP（Video Post Processor 视频后处理器）与画质色彩引擎（amvecm / amvideo）。然而，Android 上层应用框架与原厂设置仅暴露了极其粗糙的分辨率开关，导致大量硬核画质潜能被封印、老旧投影仪 HDR 严重发灰、2.35:1 宽银幕黑边无法消除。为此，我们建立了一套涵盖【内核 Sysfs 树探测】、【系统二进制反编译逆向】与【自动化探针框架】的三维参数提取与调校方法论：",
      "methodology": [
        {
          "title": "1. 内核 Sysfs 命名空间地毯式枚举 (Sysfs Tree Probing)",
          "desc": "深入 Linux 内核驱动在 /sys/module/am_vecm/parameters/（晶晨画质与色彩增强模块）、/sys/module/amvideo/parameters/（视频缩放流水线）、/sys/class/amhdmitx/（HDMI 发射控制器）以及 /sys/class/video/（视窗与变焦）下的所有底层接口。通过 ADB Shell 编写批处理探测脚本，测试每个节点的只读/可写权限与数值边界，捕获参数实时注入后显示输出的电平与画质响应。",
          "technique": "Sysfs 枚举 · 权限测试 · 动态数值注入"
        },
        {
          "title": "2. 系统总控守护进程与驱动反汇编 (Binary Disassembly & Symbol Tracing)",
          "desc": "使用 Capstone 反汇编与字符串提取工具，深入逆向晶晨核心总控守护进程 /system/bin/systemcontrol 与硬件抽象层 libOmxVideo.so、hwcomposer.amlogic.so。通过逆向 JNI 映射与 IPC 通信，不仅理清了 dumpsys system_control -b set 是如何将参数持久化映射到 /dev/block/env（U-Boot ENV 分区），更挖掘出掌控 EDID 重协商的关键开关 is.bestmode，一举破解开机色深掉回 8bit 的底层根因。",
          "technique": "Capstone ARM64 反汇编 · 符号交叉引用 · U-Boot ENV 映射"
        },
        {
          "title": "3. 自动化探针体系与波形验证 (Automated Probing & Hardware Verification)",
          "desc": "编写专用的 Python 自动化测试脚本（probe_parameters.py、probe_pq.py 等），建立一套可重复执行的探针套件。脚本自动下发并回读测试数据，结合 HDMI 信号分析与投影仪实际画面，精确验证了 DNLP 动态直方图对比度、Color Management 色彩管理、Dithering 抖动平滑、Super Scaler 超分辨率滤波与 125% 硬件变焦的实际生效链路。",
          "technique": "Python 探针框架 · 自动化回读验证 · 零算力硬件直通"
        }
      ],
      "keyParameters": [
        {
          "name": "dnlp_en",
          "path": "/sys/module/am_vecm/parameters/dnlp_en",
          "defaultValue": "0 (关闭)",
          "recommendedValue": "1 (启用)",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "晶晨硬件级 DNLP（Dynamic Non-linear Peak 动态非线性峰值）对比度增强。实时分析直方图压制高光死白并大幅提亮暗部细节，彻底根治投影仪 HDR 画质泛白发灰！",
          "command": "echo 1 > /sys/module/am_vecm/parameters/dnlp_en"
        },
        {
          "name": "dnlp_adj_level",
          "path": "/sys/module/am_vecm/parameters/dnlp_adj_level",
          "defaultValue": "0",
          "recommendedValue": "12 ~ 16",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "DNLP 动态对比度调节烈度（范围 0~32）。设为 14 可在大幅增强电影通透感的同时，完美保留人物肤色与暗场质感。",
          "command": "echo 14 > /sys/module/am_vecm/parameters/dnlp_adj_level"
        },
        {
          "name": "cm_en & cm_level",
          "path": "/sys/module/am_vecm/parameters/cm_en",
          "defaultValue": "0 (关闭)",
          "recommendedValue": "1 (启用, level=2)",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "Color Management 芯片硬件色彩管理引擎。提供高精度色相矫正与广色域保护，防止电影色彩过饱和溢出或饱和度不足。",
          "command": "echo 1 > /sys/module/am_vecm/parameters/cm_en && echo 2 > /sys/module/am_vecm/parameters/cm_level"
        },
        {
          "name": "vpp_dith_en & mode",
          "path": "/sys/module/am_vecm/parameters/vpp_dith_en",
          "defaultValue": "0 (关闭)",
          "recommendedValue": "1 (模式 1/2)",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "VPP 空间与时间混色抖动（Dithering）硬件引擎。在 10bit HDR 输入时消除天空、阴影等平滑过渡区域的色彩断层与色阶色带。",
          "command": "echo 1 > /sys/module/am_vecm/parameters/vpp_dith_en && echo 1 > /sys/module/am_vecm/parameters/vpp_dith_mode"
        },
        {
          "name": "range_control",
          "path": "/sys/module/am_vecm/parameters/range_control",
          "defaultValue": "0 (自动)",
          "recommendedValue": "1 (Limited 16-235)",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "HDMI 色彩动态范围映射控制。针对家用影院投影仪标准输入，精准锁定 16-235 视频级黑阶，告别暗场死黑或发灰。",
          "command": "echo 1 > /sys/module/am_vecm/parameters/range_control"
        },
        {
          "name": "super_scaler",
          "path": "/sys/module/amvideo/parameters/super_scaler",
          "defaultValue": "0 (关闭)",
          "recommendedValue": "1 (启用)",
          "category": "scaler",
          "categoryLabel": "缩放与超分引擎 (amvideo)",
          "effect": "晶晨 Super Scaler 硬件超分辨率边缘锐化与插值滤波算法。将 1080p 高码流片源在 4K 巨幕放映时大幅提升线条锐度与细节凝聚力。",
          "command": "echo 1 > /sys/module/amvideo/parameters/super_scaler"
        },
        {
          "name": "vert_chroma_filter_en",
          "path": "/sys/module/amvideo/parameters/vert_chroma_filter_en",
          "defaultValue": "0",
          "recommendedValue": "1 (启用)",
          "category": "scaler",
          "categoryLabel": "缩放与超分引擎 (amvideo)",
          "effect": "垂直色度抗锯齿滤波。消除 YUV420 隔行重采样带来的红色/蓝色高频边缘色度锯齿，字幕与高对比物体边缘更加细腻平滑。",
          "command": "echo 1 > /sys/module/amvideo/parameters/vert_chroma_filter_en"
        },
        {
          "name": "frac_rate_policy",
          "path": "/sys/class/amhdmitx/amhdmitx0/frac_rate_policy",
          "defaultValue": "0 (整数帧优先)",
          "recommendedValue": "1 (分数帧优先)",
          "category": "hdmi",
          "categoryLabel": "HDMI 握手与输出 (amhdmitx)",
          "effect": "分数刷新率智能跟随策略。自动精准锁定 23.976Hz 与 59.94Hz，根治 24 帧电影每 41 秒因时钟不同步强制跳 1 帧的微顿挫。",
          "command": "echo 1 > /sys/class/amhdmitx/amhdmitx0/frac_rate_policy"
        },
        {
          "name": "zoom (硬件变焦)",
          "path": "/sys/class/video/zoom",
          "defaultValue": "100 (100% 原始)",
          "recommendedValue": "125 (放大 125%)",
          "category": "window",
          "categoryLabel": "VPP 视频视窗与变焦 (video)",
          "effect": "晶晨 VPP 硬件数字变焦。位于硬解之后、HDMI 输出之前的独立硬件管线，0% CPU/GPU 占用将 2.35:1 电影无损切除上下黑边铺满整面 16:9 幕布！",
          "command": "echo 125 > /sys/class/video/zoom"
        },
        {
          "name": "screen_mode",
          "path": "/sys/class/video/screen_mode",
          "defaultValue": "0 (normal)",
          "recommendedValue": "0 / 1 / 4",
          "category": "window",
          "categoryLabel": "VPP 视频视窗与变焦 (video)",
          "effect": "画面宽高比硬件拉伸模式。0: 原比例居中；1: 全屏强制拉伸；4: 智能非线性拉伸（中间保真防人物变形，平缓拉伸两侧填满全屏）。",
          "command": "echo 0 > /sys/class/video/screen_mode"
        }
      ],
      "probeScriptCode": {
        "lang": "python",
        "code": "import os, subprocess\n\ndef probe_sysfs(name, path, test_val=None):\n    cur = subprocess.getoutput(f\"adb shell cat {path} 2>/dev/null\").strip()\n    print(f\"[PROBE] {name:24s} | Path: {path}\\n        Current Value: {cur}\")\n    if test_val is not None:\n        subprocess.run(f\"adb shell 'echo {test_val} > {path}'\", shell=True)\n        after = subprocess.getoutput(f\"adb shell cat {path} 2>/dev/null\").strip()\n        print(f\"        -> Injected '{test_val}': {after}\")\n\n# 1. 探测画质色彩引擎 amvecm\nprobe_sysfs(\"DNLP 对比度增强\", \"/sys/module/am_vecm/parameters/dnlp_en\", 1)\nprobe_sysfs(\"DNLP 调节级别\", \"/sys/module/am_vecm/parameters/dnlp_adj_level\", 14)\nprobe_sysfs(\"Color Management\", \"/sys/module/am_vecm/parameters/cm_en\", 1)\nprobe_sysfs(\"VPP Dithering 抖动\", \"/sys/module/am_vecm/parameters/vpp_dith_en\", 1)\n\n# 2. 探测超分缩放引擎 amvideo\nprobe_sysfs(\"Super Scaler 超分\", \"/sys/module/amvideo/parameters/super_scaler\", 1)\nprobe_sysfs(\"Chroma 垂直色度滤波\", \"/sys/module/amvideo/parameters/vert_chroma_filter_en\", 1)\n\n# 3. 探测 HDMI 刷新率与色彩深度\nprobe_sysfs(\"分数帧率策略\", \"/sys/class/amhdmitx/amhdmitx0/frac_rate_policy\", 1)\nprobe_sysfs(\"当前 HDMI 色彩属性\", \"/sys/class/amhdmitx/amhdmitx0/attr\")",
        "note": "自研晶晨 S912 硬件底层寄存器与画质参数全自动探测套件核心逻辑"
      }
    },
    "downloadItem": {
      "title": "T1ZoomHelper 电视端画质与变焦自启微服务",
      "fileName": "T1ZoomHelper.apk",
      "fileSize": "22.8 KB",
      "version": "v3.0 极客稳定版",
      "releaseDate": "2026.03",
      "downloadUrl": "/downloads/T1ZoomHelper.apk",
      "md5": "F5E265842D83E83A1567BA7A2460EB9E",
      "sha256": "624E7DAAA0891956D939DCED521C9CA921B9F8217F54FAEAD570B6E3988D5682",
      "description": "专为斐讯 T1 盒子（晶晨 S912 芯片平台）量身打造的超轻量电视端常驻服务。利用本地环回 ADB 协议实现开机 1 秒免 Root 弹窗静默自启，0% 算力调用晶晨 VPP 硬件实现 125% 影院等比变焦，消除 2.35:1 宽银幕上下黑边；常驻 HTTP 微服务支持手机扫码即开 Web 遥控面板，实时调节 DNLP 画质去灰与色彩管理，打造极致顺滑的极客家庭影院。",
      "features": [
        "免电脑 · 开机 1 秒静默自启：通过 127.0.0.1:5555 本地环回 ADB 免密提权，电视无任何弹窗打扰",
        "0% 算力硬件等比变焦：直通晶晨 VPP 协处理器 /sys/class/video/zoom，125% 满屏无损去黑边",
        "晶晨 DNLP 画质去灰引擎：动态非线性对比度与直方图增强实时写入，告别投影泛白发灰",
        "手机 Web 实时遥控中枢：内置 8989 端口轻量 HTTP 服务，同一局域网手机扫码即开调色盘",
        "极致轻量零遮挡：安装包仅 23KB，纯原生 Java Socket，无任何多余依赖，内存占用仅 8MB"
      ],
      "installCommands": [
        {
          "label": "ADB 网络安装指令",
          "cmd": "adb install -r T1ZoomHelper.apk"
        },
        {
          "label": "首次静默拉起服务",
          "cmd": "adb shell am start -n com.phicomm.t1zoom/.MainActivity"
        },
        {
          "label": "手机访问遥控面板地址",
          "cmd": "http://盒机局域网IP:8989"
        }
      ]
    }
  },
{
    id: 'ai-saas-portal',
    title: 'NextGen 科技企业高端官网与响应式落地页',
    category: 'dev',
    categoryLabel: '网站设计制作',
    subtitle: '高转化率设计 · 60fps 动效 · 全端响应式',
    description: '面向海外与国内高净值企业客户的高端数字化官网。采用暗夜玻璃拟态设计语言，搭配动态数据看板与微光边框交互。Lighthouse 性能跑分 98，首屏秒开，转化率提升 45%。',
    client: '某智能硬件科技公司',
    year: '2026',
    coverImage: '/assets/cases/case-web.png',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare Pages'],
    highlights: ['全端断点自适应（移动/iPad/4K屏）', '首屏加载耗时 < 0.6s', 'SEO 友好与 OpenGraph 深度配置'],
    deliverables: ['全套高保真 Figma 设计源文件', '完整前端响应式工程源码', 'CI/CD 自动化部署流水线'],
    tags: ['网页设计', '品牌官网', '响应式布局', '海外本地化'],
    projectTime: '2026.02',
    visitUrl: '线上官方门户',
    overview: {
      narrative: '本次项目为 NextGen 打造下一代国际化技术门户。围绕品牌科技感、产品矩阵演示、技术规格展示与销售线索获取等核心需求，采用现代极简与玻璃拟态设计语言，兼顾 PC 大屏与移动设备的顺滑交互。通过清晰的信息动线与 60fps 微动效，全面提升海外与国内企业客户的停留时长与转化率。',
      target: '提升国际化品牌科技感，强化销售线索获取，促成 B 端企业大客户签约。',
      audience: '企业技术采购决策者、行业合作伙伴、海外高净值客户。',
      format: 'PC 端 + 移动端（全端响应式设计）',
    },
    designHighlights: [
      {
        title: '清晰的信息架构',
        desc: '以简洁的视觉层级，突出产品核心优势与技术矩阵，提升客户阅读决策效率。',
        iconType: 'layout',
      },
      {
        title: '沉浸式视觉体验',
        desc: '运用微光边缘与动态数据流元素，营造生动、前沿的高端科技企业氛围。',
        iconType: 'visual',
      },
      {
        title: '响应式布局与适配',
        desc: '严谨适配 4K、笔记本、iPad 及各类手机屏幕，保障全设备零裁切体验。',
        iconType: 'responsive',
      },
      {
        title: '品牌视觉高度统一',
        desc: '延续科技蓝与曜石灰的核心调性，确立标准组件库，强化企业专业识别度。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-web.png',
      pcLabel: 'PC 端高保真页面效果',
      mobileImages: [
        { image: '/assets/cases/case-app.png', label: '移动端页面效果（首页）' },
        { image: '/assets/cases/case-mini.png', label: '移动端页面效果（功能列表）' },
      ],
    },
  },
  {
    id: 'enterprise-rag-kb',
    title: '企业私有化智能知识库与 RAG 问答系统',
    category: 'ai',
    categoryLabel: 'AI企业知识库',
    subtitle: '精准无幻觉 · 局域网离线保密 · 毫秒级语义检索',
    description: '针对企业数十万字产品手册、合同规约与技术文档，构建的高精度私有知识库系统。基于先进的向量检索与重排算法（Reranker），大模型回答精确标注原文出处，彻底杜绝胡言乱语。',
    client: '某精密制造与法务咨询机构',
    year: '2026',
    coverImage: '/assets/cases/case-ai-rag.png',
    techStack: ['Dify', 'DeepSeek-V3 / Qwen', 'ChromaDB', 'Docker', 'Python FastAPI'],
    highlights: ['支持 PDF/Word/Markdown 批量切片清洗', '私有机房单卡 4090 离线稳跑', '问答精准定位原文件页码'],
    deliverables: ['完整 Docker Compose 离线部署包', '数据清洗切片脚本', '企业专属管理后台与操作手册'],
    tags: ['AI大模型', '私有知识库', 'RAG系统', '数据安全'],
    projectTime: '2026.01',
    visitUrl: '私有化局域网部署',
    overview: {
      narrative: '针对企业内部数十万字技术规格、法务合同与服务 SOP 文档查询效率低、数据敏感无法使用公有云等痛点，我们为其定制搭建了这套 100% 局域网私有运行的 RAG 知识检索工作流。系统实现秒级多文档聚合检索，精准定位原始段落与页码，为员工提供零数据外泄风险的业务助手。',
      target: '解决海量企业文档查找繁琐难题，实现高精度零幻觉问答，保障商业机密安全。',
      audience: '企业各部门员工、技术研发团队、法务合规审计人员。',
      format: 'Web 管理后台 + 飞书/企微机器人终端',
    },
    designHighlights: [
      {
        title: '双栏结构化交互',
        desc: '左侧多级知识分类树状视图，右侧对话流精准映射出处引用，逻辑层次分明。',
        iconType: 'layout',
      },
      {
        title: '溯源高亮直觉体验',
        desc: '点击 AI 生成答案中的引用角标，即刻平滑跳转并高亮原始 PDF 页面片段。',
        iconType: 'visual',
      },
      {
        title: '多终端无缝协同',
        desc: '支持桌面端浏览器管理后台，并无缝嵌入移动办公软件，随时随地调取知识。',
        iconType: 'responsive',
      },
      {
        title: '企业级安全基调',
        desc: '遵循金融级严谨界面规范，权限分级、水印保护与审计日志状态清晰一目了然。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-ai-rag.png',
      pcLabel: 'PC 端知识检索与溯源大屏',
      mobileImages: [
        { image: '/assets/cases/case-ai-agent.png', label: '移动端对话与线索卡片' },
        { image: '/assets/cases/case-app.png', label: '移动端文档切片管理' },
      ],
    },
  },
  {
    id: 'tech-mascot-ip',
    title: 'FONXT 极客智友 3D IP 形象与矩阵延展',
    category: 'ip',
    categoryLabel: 'IP形象设计',
    subtitle: '潮玩极客风 · 3D盲盒质感 · 角色一致性闭环',
    description: '以科技蓝、幻彩紫为品牌主色，专为独立全栈数字工作室打造的标志性吉祥物。通过 ComfyUI 配合多层 ControlNet 与特征锁定工作流，生成了包含敲代码、绘图、架构演算等多套姿态的高一致性商业角色库。',
    client: '自研品牌 IP',
    year: '2026',
    coverImage: '/assets/cases/case-ip.png',
    techStack: ['ComfyUI', 'Midjourney v6', 'Photoshop', 'Blender', 'IP-Adapter'],
    highlights: ['多姿态角色一致性 100%', '4K 高清透明无损输出', '打通表情包及印刷物料规范'],
    deliverables: ['三视图设计规范手册', '8组高频业务表情包', '高精度商用透明图集', '源工程提示词与LoRA文件'],
    tags: ['IP设计', '3D建模', 'AI工作流', '品牌衍生物料'],
    projectTime: '2026.03',
    visitUrl: '数字资产库',
    overview: {
      narrative: '为建立统一且极具亲和力的科技极客形象，项目采用现代 3D 潮玩风格设计吉祥物。结合最前沿的 ComfyUI 特征锁定与 LoRA 训练方案，攻克了传统 3D 建模周期长与 AI 生图角色不一致的技术难关，快速延展出涵盖运营活动、技术文档插画及社群表情包的完整生态。',
      target: '塑造年轻化极客品牌心智，大幅降低品牌多场景物料的延展制作成本。',
      audience: '开发者、创业者、数字产品爱好者及商业合作伙伴。',
      format: '多姿态 3D 资产库 + 矢量物料手册',
    },
    designHighlights: [
      {
        title: '骨骼姿态动态锁定',
        desc: '建立标准三视图与特征参数规范，确保在任何动作与角度下形象高度一致。',
        iconType: 'layout',
      },
      {
        title: '微光与透光材质',
        desc: '模拟磨砂亚克力与微光发光件质感，在深浅色背景上均呈现出众的立体光泽。',
        iconType: 'visual',
      },
      {
        title: '多分辨率自适应',
        desc: '提供 4K 超高清商用渲染图与极小尺寸下依然清晰的矢量图标级显示支持。',
        iconType: 'responsive',
      },
      {
        title: '统一品牌识别体系',
        desc: '融入品牌核心青蓝与亮紫色谱，使吉祥物成为跨端界面的天然信任锚点。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-ip.png',
      pcLabel: '3D 角色全场景延展渲染图',
      mobileImages: [
        { image: '/assets/cases/case-app.png', label: '移动端表情与交互组件' },
        { image: '/assets/cases/case-mini.png', label: '小程序场景融入示意' },
      ],
    },
  },
  {
    id: 'smart-retail-mini',
    title: '智慧零售与预约服务微信原生小程序',
    category: 'dev',
    categoryLabel: '小程序设计制作',
    subtitle: '极致流畅交互 · 微信生态无缝闭环',
    description: '集商品展示、在线预约、积分会员体系与微信支付于一体的高性能小程序。针对微信内置环境进行了深度性能优化，包体轻量，触控反馈顺滑如原生 App。',
    client: '精品生活连锁品牌',
    year: '2025',
    coverImage: '/assets/cases/case-mini.png',
    techStack: ['微信小程序原生开发', 'TypeScript', 'Node.js', '微信支付 API', '云函数'],
    highlights: ['零依赖极速首开', '微信原生组件极致美学改造', '日均万级请求稳定运行'],
    deliverables: ['小程序前端工程源码', '后端接口云函数与数据库脚本', '微信商户号配置与上线指导'],
    tags: ['小程序开发', '智慧零售', '微信支付', '预约系统'],
    projectTime: '2025.11',
    visitUrl: '微信小程序端',
    overview: {
      narrative: '针对传统线下门店核销繁琐、会员沉淀困难的问题，为品牌定制了从商品浏览、分时预约到微信支付一键闭环的原生小程序。通过轻量化架构与原生动画调优，带来媲美 iOS 原生 App 的丝滑手感，有效助力客户实现私域会员翻倍。',
      target: '打通线上预约与线下核销链路，提升到店率与微信私域会员复购。',
      audience: '城市青年消费群体、连锁门店店员及品牌运营者。',
      format: '微信原生小程序（手机移动端专用）',
    },
    designHighlights: [
      {
        title: '极简预约流程',
        desc: '3步完成分时选座与技师挑选，大幅降低用户认知负担与中途流失率。',
        iconType: 'layout',
      },
      {
        title: '轻盈通透视觉风格',
        desc: '大面积留白配合卡片式微悬浮阴影，让商品与服务列表一览无余。',
        iconType: 'visual',
      },
      {
        title: '手势跟手动效',
        desc: '深度优化微信端内滚动与横滑手势，保障千元低端安卓机型 60fps 丝滑运行。',
        iconType: 'responsive',
      },
      {
        title: '连锁品牌统一调性',
        desc: '规范会员卡等级图标与徽章体系，强化忠诚度计划的高级感与尊享感。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-mini.png',
      pcLabel: '管理后台与数据看板预览',
      mobileImages: [
        { image: '/assets/cases/case-mini.png', label: '小程序首页与服务宫格' },
        { image: '/assets/cases/case-app.png', label: '预约选时与会员中心' },
      ],
    },
  },
  {
    id: 'ai-customer-service',
    title: '7×24h 智能业务客服机器人与线索分流工作流',
    category: 'ai',
    categoryLabel: '智能客服与工作流',
    subtitle: '多渠道接入 · 意图识别 · 自动转接企微销售',
    description: '部署于独立官网与小程序的智能前台接待。不仅能精准解答产品定价、规格参数，还能自动识别高意向客户，智能提取联系方式并实时推送到销售企微群。接待效率提升 80%，线索转化率翻倍。',
    client: 'B2B 数字化服务商',
    year: '2026',
    coverImage: '/assets/cases/case-ai-agent.png',
    techStack: ['LangChain', 'OpenAI/DeepSeek API', '企业微信 Webhook', 'Redis', 'Vue 3'],
    highlights: ['夜间无人值守 100% 自动响应', '精准意图多轮交互引导', '线索实时同步销售群'],
    deliverables: ['客服悬浮挂件 SDK', '企微机器人打通逻辑', '后台数据分析看板'],
    tags: ['智能客服', '意图识别', '企微自动化', '线索转化'],
    projectTime: '2026.01',
    visitUrl: '多渠道嵌入集成',
    overview: {
      narrative: '针对夜间与周末访客咨询流失严重的行业痛点，构建了这套具备自然语言意图引导能力的智能接待 Agent。机器人不仅能解答复杂产品矩阵参数，更能巧妙引导客户留下微信与电话，并在 1 秒内推送到值班销售手机，真正实现线索全天候无缝转化。',
      target: '实现 7×24 小时无人值守接待，高意向客户自动提取并秒级推送企微。',
      audience: '独立站访客、潜在意向采购客户、企业售前顾问团队。',
      format: '官网浮窗 SDK + 企微应用联动',
    },
    designHighlights: [
      {
        title: '对话引导式交互',
        desc: '根据用户问询动态推荐高频关联问题气泡，降低访客打字门槛。',
        iconType: 'layout',
      },
      {
        title: '拟人化呼吸反馈',
        desc: '思考中动态呼吸微波与打字机流式输出，给访客真实可靠的专家交流感。',
        iconType: 'visual',
      },
      {
        title: '轻量嵌入自适应',
        desc: '移动端下自动切换为全屏抽屉式对话，PC 端为精致右下角悬浮窗。',
        iconType: 'responsive',
      },
      {
        title: '企业微信通知规范',
        desc: '格式化 Markdown 卡片推送，销售在手机上可直接一键添加客户微信。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-ai-agent.png',
      pcLabel: '客服接待与意图分析控制台',
      mobileImages: [
        { image: '/assets/cases/case-ai-agent.png', label: '移动端访客对话界面' },
        { image: '/assets/cases/case-mini.png', label: '企微端销售线索推送卡片' },
      ],
    },
  },
  {
    id: 'cross-platform-app',
    title: '全流程数字内容创作者移动端 App',
    category: 'dev',
    categoryLabel: '移动端 APP 制作',
    subtitle: '双端统一体验 · 现代暗黑极简 UI · 离线缓存',
    description: '专为数字游民与独立创作者打造的任务规划与 AI 灵感记录移动 App。采用统一设计系统，提供极其丝滑的手势操作、本地离线 SQLite 同步与云端备份。',
    client: '数字游民社群',
    year: '2025',
    coverImage: '/assets/cases/case-app.png',
    techStack: ['Flutter / React Native', 'Tailwind', 'Supabase', 'SQLite'],
    highlights: ['iOS 与 Android 双端像素级一致', '复杂手势 60fps 顺滑跟手', '离线数据优先架构'],
    deliverables: ['双端可编译源码', 'App Store / 应用商店上架包', 'UI 设计规范组件库'],
    tags: ['移动App', '跨端开发', '暗黑极简', '离线优先'],
    projectTime: '2025.12',
    visitUrl: 'iOS / Android 客户端',
    overview: {
      narrative: '专为数字游民与创作者打造的高效工具应用。采用跨端架构保证双端像素级统一，配合纯粹的暗黑极简设计语言，将灵感记录、番茄专注与任务流无缝打通。即使在飞行模式或弱网环境下，也能顺畅编辑并在联网后自动增量同步。',
      target: '打造极致沉浸的无干扰创作环境，保障全球任何网络环境下的流畅记录。',
      audience: '独立开发者、数字游民、自由职业设计师及内容创作者。',
      format: 'iOS + Android 双端原生级 App',
    },
    designHighlights: [
      {
        title: '沉浸专注无干扰',
        desc: '遵循极简主义层次，关键操作均在拇指热区内完成，最大化书写视野。',
        iconType: 'layout',
      },
      {
        title: '柔和暗黑美学',
        desc: '深色高对比度排版，配合微光色彩点缀，夜间长时间使用眼睛不易疲劳。',
        iconType: 'visual',
      },
      {
        title: '手势驱动交互',
        desc: '右滑归档、下拉新建、双击展开，60fps 弹簧物理引擎让触控无比愉悦。',
        iconType: 'responsive',
      },
      {
        title: '全端图标规范',
        desc: '自研一套定制点阵风与线性图标系，在双端商店均呈现出独特的先锋质感。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-app.png',
      pcLabel: '平板横屏与大屏模式展示',
      mobileImages: [
        { image: '/assets/cases/case-app.png', label: '移动端创作与任务主视图' },
        { image: '/assets/cases/case-web.png', label: '多设备云端同步管理' },
      ],
    },
  },
];

