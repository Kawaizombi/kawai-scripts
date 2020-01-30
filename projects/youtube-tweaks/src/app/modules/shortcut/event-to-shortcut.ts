export default function eventToShortcut({shiftKey, ctrlKey, altKey, metaKey, code}: KeyboardEvent) {
  const path = [];
  ctrlKey && path.push('Ctrl');
  metaKey && path.push('Super');
  altKey && path.push('Alt');
  shiftKey && path.push('Shift');
  path.push(code);

  return path.join(' + ');
}
