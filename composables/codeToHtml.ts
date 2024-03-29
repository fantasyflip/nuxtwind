import { getHighlighter } from "shiki-es";
import { Lang } from "shiki-es";

export async function useCodeToHtml(code: string, lang: Lang) {
  const colorMode = useColorMode().value;
  const theme = colorMode === "light" ? "github-light" : "github-dark";
  const highlighter = await getHighlighter({
    theme: theme,
    langs: [lang],
  });
  return highlighter.codeToHtml(code, { lang: lang });
}
