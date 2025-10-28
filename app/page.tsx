'use client';

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const QUESTIONS = [
  "What’s the weather like today?",
  "What’s trending on X (Twitter) right now?",
  "Summarize a document for me",
  "Help me write a polite email",
  "Got any movie recommendations?"
] as const;

const MODELS = ["GPT 4.1 mini", "GPT 4.1", "GPT-4o", "GPT-4.1 Flash"] as const;

type ChipOption = "deep" | "search";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [activeChips, setActiveChips] = useState<Record<ChipOption, boolean>>({
    deep: true,
    search: false
  });
  const [selectedModel, setSelectedModel] = useState<typeof MODELS[number]>(MODELS[0]);

  const handleQuestionSelect = (question: string) => {
    setPrompt(question);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>, question: string) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Space") {
      event.preventDefault();
      handleQuestionSelect(question);
    }
  };

  const handleChipToggle = (chip: ChipOption) => {
    setActiveChips((prev) => ({
      ...prev,
      [chip]: !prev[chip]
    }));
  };

  return (
    <main className={styles.app}>
      <header className={styles.statusBar} aria-label="状态栏">
        <span className={styles.time}>9:41</span>
        <div className={styles.dynamicIsland} aria-hidden="true" />
        <Image
          src="/assets/status-levels.svg"
          alt=""
          width={135}
          height={13}
          className={styles.statusLevels}
          priority
        />
      </header>

      <div className={styles.device}>
        <header className={styles.topBar} aria-label="顶部导航">
          <Image src="/assets/icon-left.svg" alt="打开菜单" width={28} height={28} />
          <div className={styles.brand}>
            <Image
              src="/assets/logo.svg"
              alt=""
              width={22}
              height={25}
              className={styles.brandMark}
              aria-hidden="true"
            />
            <span className={styles.brandName}>Nirmala</span>
          </div>
          <Image src="/assets/icon-right.svg" alt="用户设置" width={28} height={28} />
        </header>

        <section className={styles.hero} aria-labelledby="hero-title">
          <Image
            src="/assets/greeting-icon.svg"
            alt=""
            width={57}
            height={64}
            className={styles.heroIcon}
            aria-hidden="true"
          />
          <div className={styles.heroCopy}>
            <h1 id="hero-title" className={styles.heroTitle}>
              Hey, Nirmala is here!
            </h1>
            <p className={styles.heroSubtitle}>Let me help you find clarity in seconds.</p>
          </div>
        </section>

        <section className={styles.questions} aria-labelledby="questions-title">
          <h2 id="questions-title" className={styles.questionsTitle}>
            ✨ Ask me anything
          </h2>
          <ul className={styles.questionList}>
            {QUESTIONS.map((question) => (
              <li
                key={question}
                className={styles.questionItem}
                role="button"
                tabIndex={0}
                onClick={() => handleQuestionSelect(question)}
                onKeyDown={(event) => handleKeyDown(event, question)}
              >
                {question}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.voiceCard} aria-labelledby="voice-title">
          <div className={styles.voiceHeader}>
            <textarea
              id="voice-title"
              placeholder="Let’s talk"
              className={styles.voiceLabel}
              aria-label="语音提示输入框"
              rows={2}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
            <div className={styles.voiceWave} aria-hidden="true">
              <svg
                className={styles.voiceWaveMic}
                viewBox="0 0 34 34"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" y="0" width="34" height="34" rx="17" fill="white" fillOpacity="0.08" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="33"
                  height="33"
                  rx="16.5"
                  stroke="white"
                  strokeOpacity="0.04"
                  fill="none"
                />
                <path
                  d="M23.6739 16.1114C23.6101 16.1753 23.5342 16.226 23.4508 16.2606C23.3673 16.2952 23.2778 16.313 23.1875 16.313C23.0972 16.313 23.0077 16.2952 22.9242 16.2606C22.8408 16.226 22.7649 16.1753 22.7011 16.1114L17.6875 11.0969V24.5625C17.6875 24.7448 17.6151 24.9197 17.4861 25.0486C17.3572 25.1776 17.1823 25.25 17 25.25C16.8177 25.25 16.6428 25.1776 16.5139 25.0486C16.3849 24.9197 16.3125 24.7448 16.3125 24.5625V11.0969L11.2989 16.1114C11.1699 16.2404 10.9949 16.3129 10.8125 16.3129C10.6301 16.3129 10.4551 16.2404 10.3261 16.1114C10.1971 15.9824 10.1246 15.8074 10.1246 15.625C10.1246 15.4426 10.1971 15.2676 10.3261 15.1386L16.5136 8.95109C16.5774 8.88716 16.6533 8.83645 16.7367 8.80186C16.8202 8.76726 16.9097 8.74945 17 8.74945C17.0903 8.74945 17.1798 8.76726 17.2633 8.80186C17.3467 8.83645 17.4226 8.88716 17.4864 8.95109L23.6739 15.1386C23.7378 15.2024 23.7885 15.2783 23.8231 15.3617C23.8577 15.4452 23.8755 15.5346 23.8755 15.625C23.8755 15.7153 23.8577 15.8048 23.8231 15.8883C23.7885 15.9717 23.7378 16.0475 23.6739 16.1114Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <div className={styles.voiceFooter}>
            <div className={styles.voiceChips}>
              <button
                type="button"
                className={`${styles.voiceChip} ${
                  activeChips.deep ? styles.chipPrimary : styles.chipSecondary
                }`}
                onClick={() => handleChipToggle("deep")}
                aria-pressed={activeChips.deep}
              >
                <svg
                  className={styles.voiceChipIcon}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M15.5 7.75C15.4993 7.08771 15.3112 6.43914 14.9572 5.87935C14.6033 5.31957 14.098 4.87146 13.5 4.58688V4.5C13.4994 3.85576 13.2915 3.22882 12.9069 2.71195C12.5224 2.19507 11.9816 1.81572 11.3647 1.63002C10.7479 1.44432 10.0876 1.46214 9.48159 1.68084C8.87561 1.89954 8.35613 2.30751 8.00001 2.84438C7.64389 2.30751 7.12441 1.89954 6.51843 1.68084C5.91245 1.46214 5.25217 1.44432 4.63527 1.63002C4.01838 1.81572 3.47765 2.19507 3.09309 2.71195C2.70854 3.22882 2.50059 3.85576 2.50001 4.5V4.58688C1.90147 4.87068 1.39576 5.31851 1.04164 5.87833C0.687524 6.43814 0.499542 7.08696 0.499542 7.74937C0.499542 8.41179 0.687524 9.06061 1.04164 9.62042C1.39576 10.1802 1.90147 10.6281 2.50001 10.9119V11C2.50059 11.6442 2.70854 12.2712 3.09309 12.7881C3.47765 13.3049 4.01838 13.6843 4.63527 13.87C5.25217 14.0557 5.91245 14.0379 6.51843 13.8192C7.12441 13.6005 7.64389 13.1925 8.00001 12.6556C8.35613 13.1925 8.87561 13.6005 9.48159 13.8192C10.0876 14.0379 10.7479 14.0557 11.3647 13.87C11.9816 13.6843 12.5224 13.3049 12.9069 12.7881C13.2915 12.2712 13.4994 11.6442 13.5 11V10.9119C14.0979 10.6275 14.6031 10.1796 14.9571 9.62005C15.311 9.06048 15.4993 8.41211 15.5 7.75ZM5.50001 13C5.00685 12.9999 4.53111 12.8177 4.16415 12.4882C3.79719 12.1587 3.5649 11.7053 3.51189 11.215C3.67358 11.2381 3.83668 11.2498 4.00001 11.25H4.50001C4.63262 11.25 4.7598 11.1973 4.85356 11.1036C4.94733 11.0098 5.00001 10.8826 5.00001 10.75C5.00001 10.6174 4.94733 10.4902 4.85356 10.3964C4.7598 10.3027 4.63262 10.25 4.50001 10.25H4.00001C3.40974 10.2507 2.83826 10.0425 2.38675 9.66228C1.93524 9.28206 1.63283 8.75434 1.53306 8.17256C1.43329 7.59078 1.54259 6.99246 1.84162 6.48353C2.14065 5.9746 2.61011 5.58789 3.16689 5.39188C3.26431 5.35738 3.34864 5.29355 3.4083 5.20916C3.46795 5.12477 3.49999 5.02397 3.50001 4.92063V4.5C3.50001 3.96957 3.71072 3.46086 4.0858 3.08579C4.46087 2.71071 4.96958 2.5 5.50001 2.5C6.03044 2.5 6.53915 2.71071 6.91422 3.08579C7.2893 3.46086 7.50001 3.96957 7.50001 4.5V8.76625C6.95096 8.27243 6.23847 7.99946 5.50001 8C5.3674 8 5.24023 8.05268 5.14646 8.14645C5.05269 8.24021 5.00001 8.36739 5.00001 8.5C5.00001 8.63261 5.05269 8.75979 5.14646 8.85355C5.24023 8.94732 5.3674 9 5.50001 9C6.03044 9 6.53915 9.21071 6.91422 9.58579C7.2893 9.96086 7.50001 10.4696 7.50001 11C7.50001 11.5304 7.2893 12.0391 6.91422 12.4142C6.53915 12.7893 6.03044 13 5.50001 13ZM12 10.25H11.5C11.3674 10.25 11.2402 10.3027 11.1465 10.3964C11.0527 10.4902 11 10.6174 11 10.75C11 10.8826 11.0527 11.0098 11.1465 11.1036C11.2402 11.1973 11.3674 11.25 11.5 11.25H12C12.1633 11.2498 12.3264 11.2381 12.4881 11.215C12.4466 11.5992 12.2947 11.9631 12.0507 12.2627C11.8067 12.5624 11.4812 12.7849 11.1134 12.9035C10.7457 13.0221 10.3514 13.0316 9.97838 12.9309C9.60533 12.8301 9.26945 12.6235 9.01134 12.3359C8.75324 12.0484 8.58396 11.6922 8.52397 11.3105C8.46399 10.9288 8.51586 10.5378 8.67333 10.185C8.8308 9.8321 9.08711 9.53241 9.41128 9.32212C9.73546 9.11183 10.1136 8.99994 10.5 9C10.6326 9 10.7598 8.94732 10.8536 8.85355C10.9473 8.75979 11 8.63261 11 8.5C11 8.36739 10.9473 8.24021 10.8536 8.14645C10.7598 8.05268 10.6326 8 10.5 8C9.76155 7.99946 9.04906 8.27243 8.50001 8.76625V4.5C8.50001 3.96957 8.71072 3.46086 9.0858 3.08579C9.46087 2.71071 9.96958 2.5 10.5 2.5C11.0304 2.5 11.5392 2.71071 11.9142 3.08579C12.2893 3.46086 12.5 3.96957 12.5 4.5V4.92063C12.5 5.02397 12.5321 5.12477 12.5917 5.20916C12.6514 5.29355 12.7357 5.35738 12.8331 5.39188C13.3899 5.58789 13.8594 5.9746 14.1584 6.48353C14.4574 6.99246 14.5667 7.59078 14.467 8.17256C14.3672 8.75434 14.0648 9.28206 13.6133 9.66228C13.1618 10.0425 12.5903 10.2507 12 10.25ZM13 7C13 7.13261 12.9473 7.25979 12.8536 7.35355C12.7598 7.44732 12.6326 7.5 12.5 7.5H12.25C11.6533 7.5 11.081 7.26295 10.659 6.84099C10.2371 6.41903 10 5.84674 10 5.25V5C10 4.86739 10.0527 4.74022 10.1465 4.64645C10.2402 4.55268 10.3674 4.5 10.5 4.5C10.6326 4.5 10.7598 4.55268 10.8536 4.64645C10.9473 4.74022 11 4.86739 11 5V5.25C11 5.58152 11.1317 5.89946 11.3661 6.13388C11.6005 6.3683 11.9185 6.5 12.25 6.5H12.5C12.6326 6.5 12.7598 6.55268 12.8536 6.64645C12.9473 6.74021 13 6.86739 13 7ZM3.75001 7.5H3.50001C3.3674 7.5 3.24023 7.44732 3.14646 7.35355C3.05269 7.25979 3.00001 7.13261 3.00001 7C3.00001 6.86739 3.05269 6.74021 3.14646 6.64645C3.24023 6.55268 3.3674 6.5 3.50001 6.5H3.75001C4.08153 6.5 4.39947 6.3683 4.63389 6.13388C4.86831 5.89946 5.00001 5.58152 5.00001 5.25V5C5.00001 4.86739 5.05269 4.74022 5.14646 4.64645C5.24023 4.55268 5.3674 4.5 5.50001 4.5C5.63262 4.5 5.7598 4.55268 5.85356 4.64645C5.94733 4.74022 6.00001 4.86739 6.00001 5V5.25C6.00001 5.84674 5.76296 6.41903 5.341 6.84099C4.91904 7.26295 4.34675 7.5 3.75001 7.5Z"
                  fill="currentColor"
                />
                <span>Deep Think</span>
              </button>
              <button
                type="button"
                className={`${styles.voiceChip} ${
                  activeChips.search ? styles.chipPrimary : styles.chipSecondary
                }`}
                onClick={() => handleChipToggle("search")}
                aria-pressed={activeChips.search}
              >
                <svg
                  className={styles.voiceChipIcon}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.498 6.2767 13.8126 4.62455 12.594 3.406C11.3754 2.18744 9.7233 1.50198 8 1.5ZM13.4763 7.5H10.9869C10.875 5.21813 9.99625 3.60438 9.27563 2.65C10.3945 2.9187 11.4013 3.53086 12.1548 4.40064C12.9082 5.27042 13.3705 6.3542 13.4769 7.5H13.4763ZM6.01438 8.5H9.98563C9.84125 11.1006 8.59625 12.6944 8 13.3125C7.40313 12.6938 6.15875 11.1 6.01438 8.5ZM6.01438 7.5C6.15875 4.89937 7.40375 3.30562 8 2.6875C8.59688 3.30813 9.84125 4.90188 9.98563 7.5H6.01438ZM6.72438 2.65C6.00375 3.60438 5.125 5.21813 5.01313 7.5H2.52313C2.6295 6.3542 3.09182 5.27042 3.84525 4.40064C4.59869 3.53086 5.60546 2.9187 6.72438 2.65ZM2.52313 8.5H5.01313C5.12688 10.7819 6.00375 12.3956 6.72438 13.35C5.60546 13.0813 4.59869 12.4691 3.84525 11.5994C3.09182 10.7296 2.6295 9.6458 2.52313 8.5ZM9.27313 13.35C9.99375 12.3956 10.8706 10.7819 10.9844 8.5H13.4744C13.3682 9.64547 12.9062 10.729 12.1533 11.5988C11.4003 12.4685 10.3941 13.0809 9.27563 13.35H9.27313Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Search</span>
              </button>
            </div>
            <div className={styles.voiceModelWrapper}>
              <select
                className={styles.voiceModel}
                value={selectedModel}
                onChange={(event) => setSelectedModel(event.target.value as typeof MODELS[number])}
                aria-label="选择模型"
              >
                {MODELS.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <svg
                className={styles.voiceModelChevron}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M4.64645 6.64645C4.84171 6.45118 5.15829 6.45118 5.35355 6.64645L8 9.29289L10.6464 6.64645C10.8417 6.45118 11.1583 6.45118 11.3536 6.64645C11.5488 6.84171 11.5488 7.15829 11.3536 7.35355L8.35355 10.3536C8.15829 10.5488 7.84171 10.5488 7.64645 10.3536L4.64645 7.35355C4.45118 7.15829 4.45118 6.84171 4.64645 6.64645Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
