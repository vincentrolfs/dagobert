export const find = <T extends Element>(id: string, name?: string): T => {
  return document.querySelector<T>(
    name ? `#${id} [name="${name}"]` : `#${id}`
  )!;
};
