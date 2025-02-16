// background.js
chrome.runtime.onInstalled.addListener((details) => {
  // Create context menu items
  chrome.contextMenus.create({
    id: "factcheck_perplexity",
    title: "Fact Check with Perplexity",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "factcheck_grok",
    title: "Fact Check with Grok",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "explain_chatgpt",
    title: "Explain with ChatGPT",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "explain_claude",
    title: "Explain with Claude",
    contexts: ["selection"]
  });

  // Open website on update
  if (details.reason === 'update') {
    const websiteUrl = 'https://textsage.netlify.app';
    chrome.tabs.create({ url: websiteUrl });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = encodeURIComponent(info.selectionText);
  let url;

  switch (info.menuItemId) {
    case "explain_chatgpt":
      url = `https://www.chatgpt.com/?q=Please%20explain%20the%20following%20text%20in%20simple%20terms:%20${selectedText}`;
      break;
    case "explain_claude":
      url = `https://claude.ai/new?q=Please%20explain%20the%20following%20text%20in%20simple%20terms:%20${selectedText}`;
      break;
    case "factcheck_perplexity":
      url = `https://perplexity.ai/search?q=Please%20fact%20check%20the%20following%20information%20against%20reliable%20sources%20and%20indicate%20if%20each%20point%20is%20True,%20Partially%20True,%20or%20False.%20Provide%20sources%20for%20your%20verification:%20${selectedText}`;
      break;
    case "factcheck_grok":
      url = `https://x.com/i/grok?text=Please%20fact%20check%20the%20following%20information%20against%20reliable%20sources%20and%20indicate%20if%20each%20point%20is%20True,%20Partially%20True,%20or%20False.%20Provide%20sources%20for%20your%20verification:%20${selectedText}`;
      break;
  }

  // Open the URL in a new tab
  chrome.tabs.create({ url });
});