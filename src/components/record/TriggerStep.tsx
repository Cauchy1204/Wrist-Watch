const triggerOptions = ["打字", "鼠标使用", "手机使用", "游戏", "健身/训练", "提重物", "旋转动作", "撑地", "睡醒后", "不明原因"];

export function TriggerStep({
  triggers,
  onTriggersChange,
  onNext
}: {
  triggers: string[];
  onTriggersChange: (triggers: string[]) => void;
  onNext: () => void;
}) {
  function toggle(trigger: string) {
    onTriggersChange(triggers.includes(trigger) ? triggers.filter((item) => item !== trigger) : [...triggers, trigger]);
  }

  return (
    <section>
      <h1 className="text-3xl font-semibold text-ink">选择疼痛诱因</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">可以多选，也可以跳过后续在备注中说明。</p>

      <div className="premium-card mt-5 rounded-2xl p-4">
        <div className="flex flex-wrap gap-2">
          {triggerOptions.map((trigger) => {
            const selected = triggers.includes(trigger);
            return (
              <button
                key={trigger}
                type="button"
                onClick={() => toggle(trigger)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 ${
                  selected
                    ? "bg-gradient-to-r from-azure to-violet text-white shadow-[0_10px_24px_rgba(98,88,232,0.20)]"
                    : "border border-slate-200/80 bg-white/80 text-slate-600"
                }`}
              >
                {trigger}
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={onNext} className="primary-action mt-5 w-full rounded-xl py-4 font-semibold text-white">
        下一步：补充备注
      </button>
    </section>
  );
}
