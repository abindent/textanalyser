/**
 * Generate comprehensive text export with all analysis results
 */
export function generateExportText(analysis: any, customAIResult?: string): string {
  const lines: string[] = [];

  lines.push("╔════════════════════════════════════════════════════════════════╗");
  lines.push("║              TEXT ANALYSIS FULL REPORT                         ║");
  lines.push("╚════════════════════════════════════════════════════════════════╝");
  lines.push("");
  lines.push(`Generated: ${new Date().toLocaleString()}`);
  lines. push(`Report ID: ${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substr(2, 9)}`);
  lines.push("");

  // === ANALYSIS OUTPUT ===
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("📋 ANALYSIS OUTPUT");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push(analysis.output || "[No output]");
  lines.push("");

  // === BASIC STATISTICS ===
  if (analysis.metadata?. counts) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("📊 BASIC STATISTICS");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`Characters:        ${analysis.metadata.counts.characterCount || 0}`);
    lines. push(`Alphabets:         ${analysis.metadata.counts.alphabetCount || 0}`);
    lines.push(`Numbers:           ${analysis.metadata.counts.numericCount || 0}`);
    lines.push(`Words:             ${analysis.metadata.counts.wordCount || 0}`);
    lines.push(`Sentences:         ${analysis.metadata.counts.sentenceCount || 0}`);
    lines.push(`Execution Time:    ${analysis.executionTime || 0}ms`);
    lines.push("");
  }

  // === SENTIMENT ANALYSIS ===
  if (analysis.sentiment) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("😊 SENTIMENT ANALYSIS");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines. push(`Classification:    ${analysis.sentiment.classification?. toUpperCase() || 'N/A'}`);
    lines.push(`Sentiment Score:   ${(analysis.sentiment.score || 0).toFixed(3)}`);
    lines.push(`Positive Words:    ${analysis.sentiment.positiveWordCount || 0}`);
    lines.push(`Negative Words:    ${analysis.sentiment.negativeWordCount || 0}`);
    lines.push(`Total Words:       ${analysis.sentiment. totalWords || 0}`);
    lines.push("");
  }

  // === READABILITY METRICS ===
  if (analysis. readability) {
    lines. push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("📖 READABILITY METRICS (Flesch-Kincaid)");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`Flesch Score:      ${analysis.readability. readabilityScore?. toFixed(1) || 0}`);
    lines.push(`Grade Level:       ${analysis.readability.gradeLevel?. toFixed(1) || 0}`);
    lines.push(`Complexity:        ${analysis.readability. complexity || 'N/A'}`);
    lines.push(`Words/Sentence:    ${analysis.readability.avgWordsPerSentence?. toFixed(1) || 0}`);
    lines.push(`Syllables/Word:    ${analysis.readability. avgSyllablesPerWord?. toFixed(2) || 0}`);
    lines.push("");
  }

  // === LANGUAGE DETECTION ===
  if (analysis. languageDetection) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("🌐 LANGUAGE DETECTION");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines. push(`Detected Language: ${analysis.languageDetection.detectedLanguage || 'Unknown'}`);
    lines.push(`Confidence:        ${((analysis.languageDetection.confidence || 0) * 100).toFixed(1)}%`);
    if (analysis.languageDetection. scores) {
      lines.push("\nLanguage Scores:");
      Object.entries(analysis.languageDetection.scores).forEach(([lang, score]: any) => {
        lines.push(`  ${lang}:  ${(score * 100).toFixed(1)}%`);
      });
    }
    lines.push("");
  }

  // === TEXT SUMMARY ===
  if (analysis. summary) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("✨ TEXT SUMMARY");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(analysis.summary || "[No summary available]");
    lines.push("");
  }

  // === EXTRACTED EMAILS ===
  if (analysis. metadata?.emails && analysis.metadata.emails.length > 0) {
    lines. push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("✉️  EXTRACTED EMAILS");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    analysis.metadata.emails.forEach((email: string, i: number) => {
      lines.push(`  ${i + 1}. ${email}`);
    });
    lines.push("");
  }

  // === EXTRACTED PHONE NUMBERS ===
  if (analysis.metadata?.phoneNumbers && analysis.metadata.phoneNumbers.length > 0) {
    lines. push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("📲 EXTRACTED PHONE NUMBERS");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    analysis.metadata.phoneNumbers.forEach((phone: string, i: number) => {
      lines.push(`  ${i + 1}.  ${phone}`);
    });
    lines.push("");
  }

  // === EXTRACTED URLS ===
  if (analysis. metadata?.urls && analysis.metadata. urls.length > 0) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("🔗 EXTRACTED URLs");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    analysis.metadata.urls.forEach((url: string, i: number) => {
      lines.push(`  ${i + 1}.  ${url}`);
    });
    lines.push("");
  }

  // === EXTRACTED MENTIONS ===
  if (analysis. metadata?.mentions && analysis.metadata. mentions.length > 0) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("👤 EXTRACTED MENTIONS (@)");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(analysis.metadata.mentions.join(", "));
    lines.push("");
  }

  // === EXTRACTED HASHTAGS ===
  if (analysis.metadata?.hashtags && analysis.metadata.hashtags. length > 0) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("# EXTRACTED HASHTAGS");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(analysis.metadata.hashtags.join(", "));
    lines.push("");
  }

  // === EXTRACTED EMOJIS ===
  if (analysis.metadata?.custom?.extractEmojis?. uniqueEmojis) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("😊 EXTRACTED EMOJIS");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`Unique Emojis:     ${analysis.metadata.custom.extractEmojis.uniqueEmojis. join(" ")}`);
    lines.push(`Total Count:       ${analysis.metadata.custom.extractEmojis.totalEmojis || 0}`);
    lines. push(`Unique Count:      ${analysis.metadata.custom.extractEmojis.uniqueEmojiCount || 0}`);
    if (analysis.metadata.custom.extractEmojis. emojiCategories) {
      lines.push(`Nature Emojis:     ${analysis.metadata.custom.extractEmojis.emojiCategories.nature || 0}`);
      lines.push(`Object Emojis:     ${analysis.metadata.custom.extractEmojis.emojiCategories. objects || 0}`);
      lines.push(`Symbol Emojis:     ${analysis.metadata.custom.extractEmojis.emojiCategories. symbols || 0}`);
    }
    lines.push("");
  }

  // === GEMINI AI RESULTS ===
  if (analysis. gemini) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("🤖 GEMINI AI ANALYSIS");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Advanced Sentiment
    if (analysis.gemini. sentiment) {
      lines.push("\n[Advanced Sentiment Analysis]");
      lines.push(`Classification: ${analysis.gemini.sentiment.classification?. toUpperCase() || 'N/A'}`);
      lines.push(`Explanation:    ${analysis.gemini.sentiment. explanation || ''}`);
      lines.push(`Confidence:     ${((analysis.gemini.sentiment.confidence || 0) * 100).toFixed(1)}%`);
    }

    // AI Summary
    if (analysis.gemini.summary) {
      lines.push("\n[AI-Generated Summary]");
      lines. push(analysis.gemini.summary);
    }

    // Keywords & Topics
    if (analysis.gemini.keywords) {
      if (analysis.gemini.keywords. topics?. length > 0) {
        lines.push("\n[Extracted Topics]");
        lines.push(analysis.gemini. keywords.topics.join(", "));
      }
      if (analysis.gemini.keywords.keywords?.length > 0) {
        lines.push("\n[Extracted Keywords]");
        lines. push(analysis.gemini.keywords.keywords.join(", "));
      }
    }

    lines.push("");
  }

  // === CUSTOM AI ANALYSIS ===
  if (customAIResult) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("✨ CUSTOM AI ANALYSIS");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines. push(customAIResult);
    lines.push("");
  }

  // === TEXT COMPARISON ===
  if (analysis. textComparison) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("🔄 TEXT COMPARISON RESULTS");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`Similarity:        ${analysis.textComparison. similarity?. toFixed(2) || 0}%`);
    lines.push(`Edit Distance:     ${analysis.textComparison.editDistance || 0}`);
    if (analysis.textComparison. wordDifference) {
      lines.push(`Words Added:       ${analysis.textComparison.wordDifference.addedCount || 0}`);
      lines.push(`Words Removed:     ${analysis.textComparison. wordDifference.removedCount || 0}`);
      lines.push(`Words Unchanged:   ${analysis.textComparison.wordDifference.unchangedCount || 0}`);
    }
    lines.push("");
  }

  // === OPERATIONS PERFORMED ===
  if (analysis.operations?. length || analysis.builtInOperations?.length || analysis.customOperations?.length) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("⚙️  OPERATIONS PERFORMED");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    if (analysis.builtInOperations?.length) {
      lines.push("Built-in Operations:");
      analysis.builtInOperations.forEach((op: string) => lines.push(`  • ${op}`));
    }
    if (analysis.customOperations?.length) {
      lines. push("Custom Operations:");
      analysis.customOperations.forEach((op: string) => lines.push(`  • ${op}`));
    }
    lines.push("");
  }

  // === FOOTER ===
  lines.push("╔════════════════════════════════════════════════════════════════╗");
  lines.push("║                   END OF REPORT                               ║");
  lines.push("╚════════════════════════════════════════════════════════════════╝");

  return lines.join("\n");
}

/**
 * Generate comprehensive JSON export
 */
export function generateExportJSON(analysis: any, customAIResult?: string): string {
  const exportData = {
    metadata: {
      generatedAt: new Date().toISOString(),
      reportId: `${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substr(2, 9)}`,
    },
    analysis: {
      output: analysis. output,
      executionTime: analysis.executionTime,
      statistics: analysis.metadata?. counts,
      sentiment: analysis.sentiment,
      readability: analysis.readability,
      languageDetection: analysis.languageDetection,
      textComparison: analysis.textComparison,
      summary: analysis.summary,
    },
    extracted: {
      emails: analysis.metadata?.emails || [],
      phoneNumbers: analysis.metadata?.phoneNumbers || [],
      urls: analysis. metadata?.urls || [],
      mentions: analysis.metadata?.mentions || [],
      hashtags: analysis.metadata?.hashtags || [],
      emojis: analysis.metadata?.custom?.extractEmojis || null,
    },
    ai: {
      gemini: analysis.gemini || null,
      customPrompt: customAIResult || null,
    },
    operations: {
      builtIn: analysis.builtInOperations || [],
      custom: analysis.customOperations || [],
      all: analysis.operations || [],
    },
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Generate comprehensive CSV export
 */
export function generateExportCSV(analysis: any, customAIResult?: string): string {
  const rows: string[][] = [];

  rows.push(["TEXT ANALYSIS REPORT"]);
  rows.push(["Generated", new Date().toLocaleString()]);
  rows.push([]);

  // Statistics
  rows.push(["STATISTICS"]);
  rows.push(["Metric", "Value"]);
  rows.push(["Characters", analysis.metadata?.counts?.characterCount || 0]);
  rows.push(["Alphabets", analysis.metadata?.counts?.alphabetCount || 0]);
  rows.push(["Numbers", analysis.metadata?.counts?.numericCount || 0]);
  rows.push(["Words", analysis.metadata?.counts?.wordCount || 0]);
  rows.push(["Sentences", analysis.metadata?.counts?.sentenceCount || 0]);
  rows. push([]);

  // Sentiment
  if (analysis.sentiment) {
    rows.push(["SENTIMENT ANALYSIS"]);
    rows.push(["Classification", analysis.sentiment. classification]);
    rows.push(["Score", analysis.sentiment.score]);
    rows.push(["Positive Words", analysis.sentiment.positiveWordCount]);
    rows.push(["Negative Words", analysis.sentiment.negativeWordCount]);
    rows.push([]);
  }

  // Extracted Data
  rows.push(["EXTRACTED DATA"]);
  rows.push(["Type", "Value"]);
  rows.push(["Emails", (analysis.metadata?.emails || []).join("; ")]);
  rows.push(["Phone Numbers", (analysis.metadata?.phoneNumbers || []).join("; ")]);
  rows.push(["URLs", (analysis.metadata?.urls || []).join("; ")]);
  rows.push(["Mentions", (analysis.metadata?.mentions || []).join("; ")]);
  rows.push(["Hashtags", (analysis. metadata?.hashtags || []).join("; ")]);
  rows. push([]);

  // CSV formatting
  return rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}