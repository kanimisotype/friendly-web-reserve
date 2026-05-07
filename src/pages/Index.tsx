import { useMemo, useState } from "react";
import { Sparkles, RefreshCw, Copy, BookOpen, Wand2 } from "lucide-react";

type ArticleSection = {
  heading: string;
  body: string;
};

type ArticleTone = "やさしく" | "論理的" | "熱量高め";
type ArticleLength = "短め" | "標準" | "長め";

type Article = {
  title: string;
  lead: string;
  sections: ArticleSection[];
  conclusion: string;
  tags: string[];
};

const sectionCountByLength: Record<ArticleLength, number> = {
  短め: 2,
  標準: 3,
  長め: 4
};

const tonePhrase: Record<ArticleTone, { opener: string; style: string; ender: string }> = {
  やさしく: {
    opener: "初めてでも安心して読めるように、",
    style: "専門用語はかみ砕いて、すぐ行動できる形で",
    ender: "気負わず一歩ずつ進めていきましょう"
  },
  論理的: {
    opener: "背景・課題・解決策の順で整理し、",
    style: "根拠と手順を明確にしながら",
    ender: "再現性のある形で進めることが重要です"
  },
  熱量高め: {
    opener: "モチベーションを高めながら、",
    style: "勢いを止めない実践重視の流れで",
    ender: "今日この瞬間から挑戦を始めましょう"
  }
};

const buildSections = (theme: string, length: ArticleLength): ArticleSection[] => {
  const baseSections: ArticleSection[] = [
    {
      heading: `${theme}とは？最初に押さえる全体像`,
      body: `${theme}は「目的を明確にし、小さく試して改善する」ことが成果につながるテーマです。まずはやることを細かく分解し、今の自分でも取り組める単位まで落とし込むことで、継続しやすくなります。`
    },
    {
      heading: `${theme}でつまずきやすいポイント`,
      body: `多くの人が失敗する原因は、最初から完璧を求めてしまうことです。最初は60点で公開・実行し、反応や結果を見ながら改善する方が、結果として速く高品質に到達できます。`
    },
    {
      heading: `今日からできる実践ステップ`,
      body: `ステップ1: 取り組む目的を1文で書く。ステップ2: 15分でできる最小タスクを決める。ステップ3: 実行後に気づきを3行で記録する。これを1週間回すだけで、${theme}の理解は大きく前進します。`
    },
    {
      heading: `成果を伸ばすコツ`,
      body: `週1回の振り返りで「うまくいった要因」を言語化すると、次の行動が明確になります。失敗の原因探しより、再現できる成功パターンの抽出に時間を使うと、成長速度が上がります。`
    }
  ];

  return baseSections.slice(0, sectionCountByLength[length]);
};

const buildArticle = (theme: string, tone: ArticleTone, length: ArticleLength): Article => {
  const cleanedTheme = theme.trim();
  const phrasing = tonePhrase[tone];

  return {
    title: `【${length}・${tone}】${cleanedTheme}の始め方と実践ガイド`,
    lead: `${cleanedTheme}について、${phrasing.opener}${phrasing.style}まとめました。この記事を読むことで、必要な考え方と最初の行動が明確になります。`,
    sections: buildSections(cleanedTheme, length),
    conclusion: `${cleanedTheme}の成功ポイントは、準備に時間をかけすぎず、まず試すことです。${phrasing.ender}。`,
    tags: [cleanedTheme, tone, length, "note", "実践"]
  };
};

const Index = () => {
  const [theme, setTheme] = useState("");
  const [tone, setTone] = useState<ArticleTone>("やさしく");
  const [length, setLength] = useState<ArticleLength>("標準");
  const [submitted, setSubmitted] = useState<{ theme: string; tone: ArticleTone; length: ArticleLength } | null>(null);
  const [error, setError] = useState("");

  const article = useMemo(() => {
    if (!submitted) return null;
    return buildArticle(submitted.theme, submitted.tone, submitted.length);
  }, [submitted]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = theme.trim();

    if (!trimmed) {
      setError("テーマを入力してください。");
      return;
    }

    if (trimmed.length < 2) {
      setError("テーマは2文字以上で入力してください。");
      return;
    }

    setError("");
    setSubmitted({ theme: trimmed, tone, length });
  };

  const handleCopy = async () => {
    if (!article) return;

    const articleText = [
      article.title,
      "",
      article.lead,
      "",
      ...article.sections.flatMap((section) => [section.heading, section.body, ""]),
      "まとめ",
      article.conclusion,
      "",
      `#${article.tags.join(" #")}`
    ].join("\n");

    await navigator.clipboard.writeText(articleText);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <section className="max-w-4xl mx-auto space-y-6">
        <header className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 px-4 py-1 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            note記事自動生成アプリ
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">テーマに沿って記事ドラフトを生成</h1>
          <p className="text-slate-600">テーマ・文体・長さを選ぶだけで、noteにそのまま使える下書きを作成できます。</p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="theme" className="block text-sm font-medium text-slate-700">記事テーマ</label>
              <input
                id="theme"
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="例：副業ブログの始め方"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="tone" className="block text-sm font-medium text-slate-700">文体</label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value as ArticleTone)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-300"
                >
                  <option value="やさしく">やさしく</option>
                  <option value="論理的">論理的</option>
                  <option value="熱量高め">熱量高め</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="length" className="block text-sm font-medium text-slate-700">長さ</label>
                <select
                  id="length"
                  value={length}
                  onChange={(e) => setLength(e.target.value as ArticleLength)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-300"
                >
                  <option value="短め">短め</option>
                  <option value="標準">標準</option>
                  <option value="長め">長め</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition-colors">
                <Wand2 className="w-4 h-4" />
                記事を生成
              </button>
              <button
                type="button"
                onClick={() => {
                  setTheme("");
                  setSubmitted(null);
                  setTone("やさしく");
                  setLength("標準");
                  setError("");
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                リセット
              </button>
            </div>
          </form>
        </div>

        {article && (
          <article className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-900">{article.title}</h2>
              <button type="button" onClick={handleCopy} className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                <Copy className="w-4 h-4" />
                コピー
              </button>
            </div>

            <p className="text-slate-700 leading-7">{article.lead}</p>

            {article.sections.map((section) => (
              <section key={section.heading} className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-800">{section.heading}</h3>
                <p className="text-slate-700 leading-7">{section.body}</p>
              </section>
            ))}

            <section className="space-y-2 border-t pt-4">
              <h3 className="text-xl font-semibold text-slate-800">まとめ</h3>
              <p className="text-slate-700 leading-7">{article.conclusion}</p>
            </section>

            <p className="text-sm text-slate-500">#{article.tags.join(" #")}</p>
          </article>
        )}
      </section>
    </main>
  );
};

export default Index;
