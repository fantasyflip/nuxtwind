import { getHighlighter } from "shiki-es";

export async function useCodeToHtml(code, lang) {
  const colorMode = useColorMode().value;
  const theme = colorMode === "light" ? "github-light" : "github-dark";
  const highlighter = await getHighlighter({
    theme: theme,
    langs: [lang],
  });
  let html = highlighter.codeToHtml(code, { lang: lang });
  if (colorMode === "light") {
    html = html.replace(
      'class="shiki" style="background-color: #ffffff"',
      'class="shiki bg-gray-300"'
    );
  } else {
    html = html.replace(
      'class="shiki" style="background-color: #0d1117"',
      'class="shiki bg-zinc-800"'
    );
  }
  return html;
}
