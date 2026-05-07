import { useMemo, useState } from "react";
import { Sparkles, RefreshCw, Copy, BookOpen } from "lucide-react";

type ArticleSection = {
  heading: string;
  body: string;
};

const buildArticle = (theme: string): { title: string; lead: string; sections: ArticleSection[]; conclusion: string; tags: string[] } => {
  const cleanedTheme = theme.trim();
  const title = `【保存版】${cleanedTheme}をわかりやすく解説`;

  return {
    title,
    lead: `${cleanedTheme}について、「何から始めればよいかわからない」という方に向けて、要点をシンプルに整理しました。この記事では基本の考え方から実践の流れまで、今日から使える形で紹介します。`,
    sections: [
      {
        heading: `${cleanedTheme}とは？`,
        body: `${cleanedTheme}は、目的を明確にしてから小さく試すことで成果が出やすくなるテーマです。まずは全体像をつかみ、必要な要素を分解して考えるのがポイントです。`
      },
      {
        heading: `失敗しないための3つのポイント`,
        body: `1つ目は「目的を1文で言語化する」こと。2つ目は「最初のハードルを低くする」こと。3つ目は「振り返りを仕組みにする」ことです。この3点を押さえるだけで、${cleanedTheme}の継続率は大きく上がります。`
      },
      {
        heading: `今日からできる実践ステップ`,
        body: `ステップ1: 取り組む理由をメモする。ステップ2: 15分でできる最小アクションを決める。ステップ3: 実行後に「よかった点・改善点」を記録する。この流れを1週間続けると、${cleanedTheme}への理解が一気に深まります。`
      }
    ],
    conclusion: `${cleanedTheme}は、完璧を目指すよりも「小さく始めて改善する」ことが成功の近道です。まずは1つだけアクションを決めて、今日から実践してみてください。`,
    tags: [cleanedTheme, "学び", "初心者向け", "実践"]
  };
};

const Index = () => {
  const [theme, setTheme] = useState("");
  const [submittedTheme, setSubmittedTheme] = useState("");

  const article = useMemo(() => {
    if (!submittedTheme) return null;
    return buildArticle(submittedTheme);
  }, [submittedTheme]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) return;
    setSubmittedTheme(theme.trim());
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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">テーマ入力で記事を自動生成</h1>
          <p className="text-slate-600">
            テーマを入力すると、そのテーマに沿ったnote記事のドラフトを即座に作成します。
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleGenerate} className="space-y-4">
            <label htmlFor="theme" className="block text-sm font-medium text-slate-700">
              記事テーマ
            </label>
            <input
              id="theme"
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例：副業ブログの始め方"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                記事を生成
              </button>
              <button
                type="button"
                onClick={() => {
                  setTheme("");
                  setSubmittedTheme("");
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
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              >
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
