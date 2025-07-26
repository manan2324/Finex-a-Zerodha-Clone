import React, { useState, createContext } from "react";

import ActionWindow from "./ActionWindow";
import AnalysisModal from "./AnalysisModal";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [actionWindowState, setActionWindowState] = useState({ isOpen: false, uid: null, mode: null });
  const [analysisModalState, setAnalysisModalState] = useState({ isOpen: false, title: '', analysis: '', isLoading: false });
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openActionWindow = (uid, mode) => setActionWindowState({ isOpen: true, uid, mode });
  const closeActionWindow = () => setActionWindowState({ isOpen: false, uid: null, mode: null });
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const closeAnalysisModal = () => setAnalysisModalState({ isOpen: false, title: '', analysis: '', isLoading: false });

  const getAiAnalysis = async (type, data) => {
    let prompt;
    let title;

    if (type === 'stock') {
      title = `AI Analysis for ${data}`;
      prompt = `Provide a brief but insightful analysis for the stock: ${data}. Cover recent news, potential risks, and a general outlook for a retail investor. Use simple language. Format with headings for each section.`;
    } else if (type === 'portfolio') {
      title = 'AI Portfolio Summary';
      const portfolioString = data.map(h => `${h.qty} shares of ${h.name}`).join(', ');
      prompt = `Analyze this stock portfolio: ${portfolioString}. Briefly describe its diversification, overall risk profile, and suggest one area for potential improvement. Keep it concise and easy to understand.`;
    } else {
      return;
    }

    setAnalysisModalState({ isOpen: true, title, analysis: '', isLoading: true });

    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const result = await response.json();

      // Utility to remove Markdown formatting (bold, italics, headings, etc.)
      function stripMarkdown(text) {
        // Remove headings
        text = text.replace(/^#+\s?/gm, '');
        // Remove bold and italics
        text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
        text = text.replace(/(\*|_)(.*?)\1/g, '$2');
        // Remove inline code
        text = text.replace(/`([^`]+)`/g, '$1');
        // Remove links but keep text
        text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        // Remove unordered/ordered list markers
        text = text.replace(/^\s*[-*+]\s+/gm, '');
        text = text.replace(/^\s*\d+\.\s+/gm, '');
        return text;
      }

      if (result.candidates && result.candidates.length > 0) {
        let text = result.candidates[0].content.parts[0].text;
        text = stripMarkdown(text); // Clean formatting
        setAnalysisModalState({ isOpen: true, title, analysis: text, isLoading: false });
      } else {
        throw new Error("No content received from API.");
      }
    } catch (error) {
      console.error("Gemini API call failed:", error);
      setAnalysisModalState({ isOpen: true, title, analysis: `Error: Could not fetch analysis. ${error.message}`, isLoading: false });
    }
  };


  const value = {
    actionWindowState,
    openActionWindow,
    closeActionWindow,
    analysisModalState,
    getAiAnalysis,
    closeAnalysisModal,
    isSidebarOpen,
    toggleSidebar,
  };

  return (
    <GeneralContext.Provider value={value}>
      {children}
      {actionWindowState.isOpen && <ActionWindow />}
      {analysisModalState.isOpen && <AnalysisModal />}
    </GeneralContext.Provider>
  );
};