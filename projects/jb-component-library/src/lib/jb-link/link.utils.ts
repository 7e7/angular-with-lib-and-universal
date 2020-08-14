let uniqueId = 0;

export function addSrOnly(documentRef, srText, renderer, elementRef) {
  const srId = `jb-link-id-${uniqueId++}`;
  const srOnly = documentRef.createElement('p');
  srOnly.setAttribute('class', 'sr-only');
  srOnly.setAttribute('id', srId);
  srOnly.innerHTML = srText;
  renderer.appendChild(elementRef.nativeElement, srOnly);
  return srId;
}
