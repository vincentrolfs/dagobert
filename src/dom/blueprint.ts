export const blueprint = <T extends Element>(
  id: string,
  map: Record<string, string>,
  classNames: string[]
): T => {
  const blueprint = document.querySelector<T>(`#${id}.blueprint`);

  if (!blueprint) {
    throw new Error(`not found: #${id}.blueprint`);
  }
  const clone = blueprint.cloneNode(true) as T;

  clone.classList.remove("blueprint");
  classNames.forEach((x) => clone.classList.add(x));
  Object.entries(map).forEach(([key, value]) => {
    const child = clone.querySelector(`._${key}`);

    if (!child) {
      return;
    }

    child.classList.remove(`_${key}`);
    child.innerHTML = value.toString();
  });

  blueprint.parentElement!.appendChild(clone);

  return clone;
};
