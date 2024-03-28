export function trimText(text, length = 80) {
  const shortened = text.substring(0, length);
  return text.length <= length ? shortened : shortened + "...";
}
