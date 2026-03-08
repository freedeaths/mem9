export type SiteLocale = 'en' | 'zh' | 'ja';
export type SiteThemePreference = 'light' | 'dark' | 'system';
export type SiteResolvedTheme = 'light' | 'dark';

export interface SiteMeta {
  title: string;
  description: string;
}

export interface SiteNavCopy {
  home: string;
  features: string;
  platforms: string;
}

export interface SiteHeroHighlight {
  title: string;
  description: string;
}

export interface SiteHeroCopy {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  onboardingLabel: string;
  onboardingCommand: string;
  highlights: SiteHeroHighlight[];
}

export interface SiteFeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface SiteFeaturesCopy {
  kicker: string;
  title: string;
  description: string;
  items: SiteFeatureItem[];
}

export interface SitePlatformItem {
  name: string;
  desc: string;
  detail: string;
}

export interface SitePlatformsCopy {
  kicker: string;
  title: string;
  description: string;
  items: SitePlatformItem[];
  note: string;
}

export interface SiteFooterCopy {
  github: string;
  license: string;
  contributing: string;
  copyright: string;
}

export interface SiteAriaCopy {
  home: string;
  changeLanguage: string;
  changeTheme: string;
  themeModeLight: string;
  themeModeDark: string;
  themeModeSystem: string;
  copyOnboarding: string;
}

export interface SiteThemeOptionsCopy {
  light: string;
  dark: string;
  system: string;
}

export interface SiteCopyFeedback {
  copied: string;
  copyFailed: string;
}

export interface SiteDictionary {
  meta: SiteMeta;
  nav: SiteNavCopy;
  hero: SiteHeroCopy;
  features: SiteFeaturesCopy;
  platforms: SitePlatformsCopy;
  footer: SiteFooterCopy;
  aria: SiteAriaCopy;
  themeOptions: SiteThemeOptionsCopy;
  copyFeedback: SiteCopyFeedback;
  localeNames: Record<SiteLocale, string>;
}

export const DEFAULT_LOCALE: SiteLocale = 'en';
export const DEFAULT_THEME_PREFERENCE: SiteThemePreference = 'system';
export const LOCALE_STORAGE_KEY = 'mem9.locale';
export const THEME_STORAGE_KEY = 'mem9.theme';
export const siteLocales: SiteLocale[] = ['en', 'zh', 'ja'];

export const siteCopy: Record<SiteLocale, SiteDictionary> = {
  en: {
    meta: {
      title: 'mem9 - Unlimited Memory Infrastructure for OpenClaw',
      description:
        'mem9.ai is unlimited memory infrastructure for OpenClaw. Persistent recall, hybrid search, and multi-agent context for Claude Code, OpenCode, OpenClaw, and custom tools.',
    },
    nav: {
      home: 'Home',
      features: 'Features',
      platforms: 'Platforms',
    },
    hero: {
      eyebrow: 'MEM9.AI',
      titleLead: 'Unlimited memory',
      titleAccent: 'for OpenClaw',
      subtitle:
        'Your agents forget everything between sessions. mem9 fixes that. Persistent memory infrastructure with hybrid search, shared spaces, and cross-agent recall from first write to forever.',
      onboardingLabel: 'Agent Onboarding',
      onboardingCommand:
        'Read https://mem9.ai/SKILL.md and follow the instructions to install and configure mem9 for OpenClaw',
      highlights: [
        {
          title: 'Never forget again',
          description:
            'Cloud-persistent memory that survives resets, restarts, and machine switches.',
        },
        {
          title: 'Securely backed up',
          description:
            'Your agent memory lives in durable cloud storage, not fragile local files.',
        },
        {
          title: 'Seamless onboarding',
          description:
            'Start with one instruction, then bring over existing memory without breaking your flow.',
        },
      ],
    },
    features: {
      kicker: 'Features',
      title: 'Persistent memory, zero plumbing',
      description:
        'Stop duct-taping databases, vector stores, and sync scripts together. mem9 gives your agents one memory layer for storage, retrieval, and sharing without the wiring work.',
      items: [
        {
          icon: '01',
          title: 'Instant persistent storage',
          description:
            'Spin up a durable memory backend in seconds. No schema design, no control plane, no ops. Your agent writes and mem9 persists.',
        },
        {
          icon: '02',
          title: 'Hybrid search, zero config',
          description:
            'Keyword search works out of the box. Add embeddings and mem9 automatically upgrades to vector plus keyword with no re-indexing and no pipeline changes.',
        },
        {
          icon: '03',
          title: 'Memory that follows your agent',
          description:
            "Close the tab. Restart the machine. Switch devices. Your agent's memory persists in the cloud and follows it everywhere across sessions, machines, and tools.",
        },
        {
          icon: '04',
          title: 'Open source, self-hostable',
          description:
            "Apache-2.0 Go server, TypeScript plugins, and bash hooks. Run it on our cloud or bring it home. Your agent's memory, your infrastructure.",
        },
      ],
    },
    platforms: {
      kicker: 'Platforms',
      title: 'One memory layer. Every agent.',
      description:
        "Agents shouldn't lose context when they switch tools. mem9 gives every agent in your stack a shared, persistent memory that stays durable, searchable, and always in sync.",
      items: [
        {
          name: 'OpenClaw',
          desc: 'Unlimited memory',
          detail:
            'Give your OpenClaw agents memory that never expires. Recall past conversations, reuse learned knowledge, and stay consistent session after session.',
        },
      ],
      note: 'Also works with any client that can read or write through the mem9 API layer.',
    },
    footer: {
      github: 'GitHub',
      license: 'Apache-2.0',
      contributing: 'Contributing',
      copyright: 'mem9.ai. Unlimited memory infrastructure for AI agents.',
    },
    aria: {
      home: 'mem9 home',
      changeLanguage: 'Change language',
      changeTheme: 'Change theme',
      themeModeLight: 'Theme mode: Light',
      themeModeDark: 'Theme mode: Dark',
      themeModeSystem: 'Theme mode: Follow system',
      copyOnboarding: 'Copy onboarding instructions',
    },
    themeOptions: {
      light: 'Light',
      dark: 'Dark',
      system: 'Follow system',
    },
    copyFeedback: {
      copied: 'Onboarding instructions copied.',
      copyFailed: 'Copy failed. Please copy the command manually.',
    },
    localeNames: {
      en: 'EN',
      zh: '中文',
      ja: '日本語',
    },
  },
  zh: {
    meta: {
      title: 'mem9 - 面向 OpenClaw 的无限记忆基础设施',
      description:
        'mem9.ai 为 OpenClaw 提供无限记忆基础设施，支持持久召回、混合搜索，以及面向 Claude Code、OpenCode、OpenClaw 和自定义工具的多 Agent 上下文共享。',
    },
    nav: {
      home: '首页',
      features: '能力',
      platforms: '平台',
    },
    hero: {
      eyebrow: 'MEM9.AI',
      titleLead: '无限记忆',
      titleAccent: 'for OpenClaw',
      subtitle:
        '你的 Agent 会在每次会话结束后忘掉一切，mem9 负责修复这件事。它提供持久化记忆基础设施，支持混合搜索、共享空间和跨 Agent 召回，从第一次写入一直保留到未来。',
      onboardingLabel: 'Agent 接入',
      onboardingCommand:
        '阅读 https://mem9.ai/SKILL.md ，按照说明为 OpenClaw 安装并配置 mem9',
      highlights: [
        {
          title: '不再遗忘',
          description: '云端持久记忆可跨越重置、重启和设备切换持续保留。',
        },
        {
          title: '安全备份',
          description: '你的 Agent 记忆存放在耐久云存储里，而不是脆弱的本地文件。',
        },
        {
          title: '无缝接入',
          description: '从一条指令开始，再逐步迁移已有记忆，不会打断现有工作流。',
        },
      ],
    },
    features: {
      kicker: '能力',
      title: '持久记忆，无需自己拼管线',
      description:
        '别再把数据库、向量库和同步脚本硬缝在一起。mem9 为你的 Agent 提供统一记忆层，一次解决存储、检索和共享。',
      items: [
        {
          icon: '01',
          title: '即时持久化存储',
          description:
            '几秒内就能启动耐久记忆后端。无需设计 schema，无需控制面，无需运维。你的 Agent 负责写入，mem9 负责持久化。',
        },
        {
          icon: '02',
          title: '混合搜索，零配置',
          description:
            '关键词搜索开箱即用。补上 embeddings 后，mem9 会自动升级为向量加关键词混合检索，无需重建索引，也无需改动流水线。',
        },
        {
          icon: '03',
          title: '记忆跟着 Agent 走',
          description:
            '关掉标签页、重启机器、切换设备都没问题。你的 Agent 记忆持续存在于云端，跨会话、跨机器、跨工具一路跟随。',
        },
        {
          icon: '04',
          title: '开源且可自托管',
          description:
            '提供 Apache-2.0 的 Go 服务端、TypeScript 插件和 bash hooks。你可以使用我们的云，也可以完全带回自己的基础设施。',
        },
      ],
    },
    platforms: {
      kicker: '平台',
      title: '一层记忆，覆盖每个 Agent。',
      description:
        'Agent 在切换工具时不该丢掉上下文。mem9 为你的整套 Agent 栈提供共享且持久的记忆层，始终可搜索、可同步、可长期保存。',
      items: [
        {
          name: 'OpenClaw',
          desc: '无限记忆',
          detail:
            '为你的 OpenClaw Agent 提供永不过期的记忆。回忆过去的对话，复用已经学到的知识，并在一轮又一轮会话中保持一致。',
        },
      ],
      note: '任何能够通过 mem9 API 层读写的客户端也都可以接入。',
    },
    footer: {
      github: 'GitHub',
      license: 'Apache-2.0',
      contributing: '参与贡献',
      copyright: 'mem9.ai。为 AI Agents 提供无限记忆基础设施。',
    },
    aria: {
      home: 'mem9 首页',
      changeLanguage: '切换语言',
      changeTheme: '切换主题',
      themeModeLight: '主题模式：浅色',
      themeModeDark: '主题模式：深色',
      themeModeSystem: '主题模式：跟随系统',
      copyOnboarding: '复制接入说明',
    },
    themeOptions: {
      light: '浅色',
      dark: '深色',
      system: '跟随系统',
    },
    copyFeedback: {
      copied: '已复制接入说明。',
      copyFailed: '复制失败，请手动复制命令。',
    },
    localeNames: {
      en: 'EN',
      zh: '中文',
      ja: '日本語',
    },
  },
  ja: {
    meta: {
      title: 'mem9 - OpenClaw 向け無制限メモリ基盤',
      description:
        'mem9.ai は OpenClaw 向けの無制限メモリ基盤です。永続リコール、ハイブリッド検索、そして Claude Code、OpenCode、OpenClaw、独自ツール向けのマルチエージェント文脈共有を提供します。',
    },
    nav: {
      home: 'ホーム',
      features: '機能',
      platforms: '対応環境',
    },
    hero: {
      eyebrow: 'MEM9.AI',
      titleLead: 'Unlimited memory',
      titleAccent: 'for OpenClaw',
      subtitle:
        'エージェントはセッションが変わるたびにすべてを忘れます。mem9 はそれを解決します。ハイブリッド検索、共有スペース、エージェント間リコールを備えた永続メモリ基盤で、最初の書き込みからずっと記憶を保ちます。',
      onboardingLabel: 'エージェント導入',
      onboardingCommand:
        'https://mem9.ai/SKILL.md を読み、手順に沿って OpenClaw 向けに mem9 をインストールして設定してください',
      highlights: [
        {
          title: 'もう忘れない',
          description:
            'クラウド永続メモリが、リセットや再起動、マシン切り替えをまたいで残り続けます。',
        },
        {
          title: '安全にバックアップ',
          description:
            'エージェントの記憶は壊れやすいローカルファイルではなく、耐久性の高いクラウドストレージに保存されます。',
        },
        {
          title: '導入はスムーズ',
          description:
            'ひとつの指示から始めて、既存メモリもあとから取り込めるので、今のフローを壊しません。',
        },
      ],
    },
    features: {
      kicker: '機能',
      title: '永続メモリを、配線作業なしで',
      description:
        'データベース、ベクトルストア、同期スクリプトを無理に継ぎ合わせる必要はありません。mem9 は保存、検索、共有をひとつのメモリレイヤーでまとめます。',
      items: [
        {
          icon: '01',
          title: '即座に永続ストレージ',
          description:
            '数秒で耐久性のあるメモリバックエンドを立ち上げられます。スキーマ設計も、コントロールプレーンも、運用も不要です。書き込めば mem9 が保持します。',
        },
        {
          icon: '02',
          title: 'ハイブリッド検索をゼロ設定で',
          description:
            'キーワード検索は最初から使えます。embeddings を追加すると、mem9 が自動でベクトルとキーワードのハイブリッド検索へ拡張し、再インデックスやパイプライン変更は不要です。',
        },
        {
          icon: '03',
          title: 'エージェントと一緒に動く記憶',
          description:
            'タブを閉じても、マシンを再起動しても、デバイスを変えても大丈夫です。エージェントの記憶はクラウドに残り、セッション、マシン、ツールをまたいで追従します。',
        },
        {
          icon: '04',
          title: 'オープンソースでセルフホスト可能',
          description:
            'Apache-2.0 の Go サーバー、TypeScript プラグイン、bash hooks を提供します。私たちのクラウドでも、自前の基盤でも動かせます。',
        },
      ],
    },
    platforms: {
      kicker: '対応環境',
      title: 'ひとつのメモリレイヤーを、すべてのエージェントへ。',
      description:
        'ツールを切り替えるたびにエージェントが文脈を失うべきではありません。mem9 はスタック内のすべてのエージェントに、永続的で検索可能、常に同期された共有メモリを提供します。',
      items: [
        {
          name: 'OpenClaw',
          desc: 'Unlimited memory',
          detail:
            'OpenClaw エージェントに期限のない記憶を与えます。過去の会話を呼び戻し、学習済みの知識を再利用し、セッションをまたいで一貫性を保てます。',
        },
      ],
      note: 'mem9 API レイヤー経由で読み書きできるクライアントなら、そのまま利用できます。',
    },
    footer: {
      github: 'GitHub',
      license: 'Apache-2.0',
      contributing: 'コントリビュート',
      copyright: 'mem9.ai。AI エージェント向けの無制限メモリ基盤。',
    },
    aria: {
      home: 'mem9 ホーム',
      changeLanguage: '言語を切り替える',
      changeTheme: 'テーマを切り替える',
      themeModeLight: 'テーマモード: ライト',
      themeModeDark: 'テーマモード: ダーク',
      themeModeSystem: 'テーマモード: システムに従う',
      copyOnboarding: '導入手順をコピー',
    },
    themeOptions: {
      light: 'ライト',
      dark: 'ダーク',
      system: 'システムに従う',
    },
    copyFeedback: {
      copied: '導入手順をコピーしました。',
      copyFailed: 'コピーに失敗しました。手動でコピーしてください。',
    },
    localeNames: {
      en: 'EN',
      zh: '中文',
      ja: '日本語',
    },
  },
};

export function isSiteLocale(value: string | null | undefined): value is SiteLocale {
  return value === 'en' || value === 'zh' || value === 'ja';
}

export function isSiteThemePreference(
  value: string | null | undefined,
): value is SiteThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function isSiteResolvedTheme(
  value: string | null | undefined,
): value is SiteResolvedTheme {
  return value === 'light' || value === 'dark';
}
