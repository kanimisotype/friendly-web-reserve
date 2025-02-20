
import { Calendar } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const [step, setStep] = useState(1);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-accent rounded-full text-sm font-medium mb-4">
            簡単予約システム
          </span>
          <h1 className="text-4xl font-bold mb-6 text-secondary">
            オンライン予約
          </h1>
          <p className="text-muted-foreground mb-8">
            スムーズな予約体験をお届けします。数クリックで完了します。
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= num
                      ? "bg-secondary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      step > num ? "bg-secondary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <motion.div
            className="space-y-6"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            {step === 1 && (
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h2 className="text-2xl font-semibold mb-4">日付を選択</h2>
                <p className="text-muted-foreground mb-6">
                  ご希望の日付をお選びください
                </p>
                <button
                  onClick={() => setStep(2)}
                  className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  次へ進む
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">時間を選択</h2>
                <p className="text-muted-foreground mb-6">
                  ご希望の時間をお選びください
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto mb-6">
                  {["10:00", "11:00", "13:00", "14:00", "15:00", "16:00"].map((time) => (
                    <button
                      key={time}
                      className="px-4 py-3 border rounded-lg hover:border-secondary hover:bg-muted/50 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    戻る
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    次へ
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-center">予約情報入力</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">お名前</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">メールアドレス</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">電話番号</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                  <div className="flex justify-center gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      戻る
                    </button>
                    <button
                      type="submit"
                      className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
                    >
                      予約を確定
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
