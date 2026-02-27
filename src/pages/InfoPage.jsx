import { UI } from "@styles";

export function InfoPage() {
  return (
    <div className={UI.Panel()}>
      <h1>About This Weight Tracker</h1>

      <p>
        This app is designed around one simple idea: consistency beats
        perfection. You don’t need perfect days - you need frequent data and a
        clear trend. The goal is to make tracking feel lightweight, repeatable,
        and honest.
      </p>

      <p>
        Daily (or near-daily) weigh-ins are encouraged. Not because each
        individual number matters, but because frequent entries make trends
        clearer. Weight naturally fluctuates due to water, food volume, sodium,
        stress, and sleep. The more often you log, the less power any single
        fluctuation has.
      </p>

      <p>
        That’s why this app uses rolling averages. A rolling average smooths out
        short-term noise and highlights your true direction of travel. Instead
        of reacting emotionally to a single spike, you can focus on whether your
        trend is moving the way you intend.
      </p>

      <p>
        Goals in this app are percentage-based rather than fixed weekly targets.
        This keeps progress proportional to your current weight. For example, a
        1% per week reduction sustained over a year does not mean 52% total
        loss. Because each week compounds, 1% per week for 52 weeks results in
        roughly a 40% reduction over the year (0.99 × 0.99 × … for 52 weeks ≈
        60% remaining).
      </p>

      <p>
        When you start a goal, the first entry on or after the start date
        becomes your baseline for the next weigh-in. From the next entry onward,
        the app calculates what your goal weight would be based on your chosen
        weekly percentage. Tracking is done by day, not by time of day.
      </p>

      <p>
        The purpose of the goal line is not to judge you. It’s a reference. Your
        rolling average shows what is actually happening. The goal shows what
        would happen if you maintained your chosen rate. The gap between them is
        information - not success or failure.
      </p>
    </div>
  );
}
