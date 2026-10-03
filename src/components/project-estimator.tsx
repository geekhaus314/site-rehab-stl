"use client";

import { useMemo, useRef, useState } from "react";

import {
  estimatorQuestions,
  primaryEstimateLine,
  scoreEstimate,
  type EstimatorAnswers,
  type EstimatorLine,
} from "@/lib/studio-data";

const resultCopy: Record<EstimatorLine, { eyebrow: string; label: string; result: string }> = {
  rehab: {
    eyebrow: "Fix",
    label: "A site that works",
    result: "A site you are not embarrassed to text a customer.",
  },
  launch: {
    eyebrow: "New",
    label: "A new site",
    result: "A first impression that gets you the call.",
  },
  visibility: {
    eyebrow: "Found",
    label: "Showing up when people search",
    result: "People searching your trade find you.",
  },
  systems: {
    eyebrow: "Work",
    label: "Bookings, quotes and payments",
    result: "Work comes in without you chasing it.",
  },
  none: {
    eyebrow: "No job",
    label: "Nothing to fix",
    result: "Your website is doing its job.",
  },
};

export function ProjectEstimator() {
  const [answers, setAnswers] = useState<EstimatorAnswers>({});
  const resultRef = useRef<HTMLDivElement>(null);
  const answered = Object.keys(answers).length;
  const totals = useMemo(() => scoreEstimate(answers), [answers]);
  const line = primaryEstimateLine(totals);
  const result = resultCopy[line];
  const complete = answered === estimatorQuestions.length;
  const hasSite = totals.rehab > 0;
  const price =
    line === "launch"
      ? "$1,200 fixed"
      : line === "rehab"
        ? "$900–$1,600"
        : line === "none"
          ? "Nothing to do"
          : "Depends — ask me";
  const duration = line === "launch" ? "1–2 days" : line === "rehab" ? "3–6 days" : "—";

  const included = complete && line !== "none"
    ? [
        {
          title: result.label,
          note: result.result,
          talk: false,
        },
        {
          title: "Showing up when people search",
          note: "Included with anything I build. The pages and listings that make you come up for your trade nearby.",
          talk: false,
        },
        ...(totals.systems > 0
          ? [
              {
                title: "Bookings, quotes and payments",
                note: "Quoted separately, because it depends what you already use. I will not put a number on it until I have seen it.",
                talk: true,
              },
            ]
          : []),
      ]
    : [];

  return (
    <div className="estimator">
      <form
        className="est-form"
        onChange={(event) => {
          const form = event.currentTarget;
          const data = new FormData(form);
          const next: EstimatorAnswers = {};
          for (const question of estimatorQuestions) {
            const answer = data.get(question.id);
            if (typeof answer === "string" && answer) next[question.id] = answer;
          }
          setAnswers(next);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (complete) resultRef.current?.focus();
        }}
      >
        <p className="est__tally" aria-live="polite">
          {complete ? "" : `${answered} of ${estimatorQuestions.length} answered`}
        </p>
        {estimatorQuestions.map((question, index) => (
          <fieldset className="est__q" key={question.id}>
            <legend>
              <span className="est__n">{String(index + 1).padStart(2, "0")}</span>
              {question.ask}
            </legend>
            {"help" in question && question.help && (
              <p className="est__help">{question.help}</p>
            )}
            <div className="est__opts">
              {question.options.map((option) => (
                <label className="est__opt" key={option.label}>
                  <input
                    type="radio"
                    name={question.id}
                    value={option.label}
                    required
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <button className="btn est-go" type="submit" disabled={!complete}>
          Show me
        </button>
      </form>

      <div
        className="est-out"
        ref={resultRef}
        tabIndex={-1}
        role="region"
        aria-labelledby="est-scope"
        hidden={!complete}
      >
        <div className="est__head">
          <p className="eyebrow">Where you land</p>
          <h3 className="h3" id="est-scope">
            {result.eyebrow} — {result.label}
          </h3>
          <p className="muted">{result.result}</p>
        </div>
        <dl className="est__figures">
          <div>
            <dt>Cost</dt>
            <dd>
              {price}
              {totals.systems > 0 && line !== "systems" && (
                <span className="est__plus"> + bookings</span>
              )}
            </dd>
          </div>
          <div>
            <dt>How long</dt>
            <dd>{duration}</dd>
          </div>
        </dl>
        {included.length > 0 && (
          <ul className="est__list">
            {included.map((item) => (
              <li className={`est__item${item.talk ? " est__item--talk" : ""}`} key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.note}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="est__caveat">
          {line === "none"
            ? "Send me the address anyway. I would rather tell you it is fine than take money for it."
            : `Roughly, from four answers. The real number is after I have looked at your site — and it will not go up.${hasSite ? " Longer if the old site was built somewhere that has since shut." : line === "launch" ? " Most of that is me waiting on your details, not me working." : ""}`}
        </p>
      </div>
    </div>
  );
}
