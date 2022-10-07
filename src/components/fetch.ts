export interface FetchState {
  translatedText: string;
  error: any;
  isLoaded: boolean;
}

export async function fetchTranslation(query: string, sourceLang: string, targetLang: string): Promise<FetchState> {
  try {
    const response = await fetch("https://translate.argosopentech.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: query,
        source: sourceLang,
        target: targetLang,
        format: "text",
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const text = await response.json();
      return {
        translatedText: text.translatedText,
        isLoaded: true,
        error: null,
      };
    } else {
      return {
        translatedText: "",
        isLoaded: true,
        error: null,
      };
    }
  } catch (error) {
    return {
      translatedText: "",
      isLoaded: true,
      error: error,
    };
  }
}

export async function fetchLanguages(): Promise<{ code: string; name: string }[]> {
  const response = await fetch("https://translate.argosopentech.com/languages", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const langs = await response.json();
    return langs;
  }
  throw "response not okay";
}
