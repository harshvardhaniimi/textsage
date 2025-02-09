// background.js
chrome.runtime.onInstalled.addListener(() => {
    // Create ChatGPT ELI5 menu item
    chrome.contextMenus.create({
      id: "eli5_chatgpt",
      title: "ELI5 with ChatGPT",
      contexts: ["selection"]
    });
  
    // Create Claude ELI5 menu item
    chrome.contextMenus.create({
      id: "eli5_claude",
      title: "ELI5 with Claude",
      contexts: ["selection"]
    });
  
    // Create Perplexity Fact Check menu item
    chrome.contextMenus.create({
      id: "factcheck_perplexity",
      title: "Fact Check with Perplexity",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    const selectedText = encodeURIComponent(info.selectionText);
    let url;
  
    switch (info.menuItemId) {
      case "eli5_chatgpt":
        url = `https://www.chatgpt.com/?q=Explain%20this%20like%20I'm%205:%20${selectedText}`;
        break;
      case "eli5_claude":
        url = `https://claude.ai/new?q=Explain%20this%20like%20I'm%205:%20${selectedText}`;
        break;
      case "factcheck_perplexity":
        url = `https://perplexity.ai/search?q=Fact%20check%20this:%20${selectedText}`;
        break;
    }
  
    // Open the URL in a new tab
    chrome.tabs.create({ url });
  });