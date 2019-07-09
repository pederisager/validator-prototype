export const getFile = (path, files, prefix='') =>
  files.filter(f => f.path === prefix + path)[0]

const trimLeadingSlash = path =>
  path.startsWith('/')
    ? path.slice(1)
    : path

// Detect the common path prefix given an array of files
// TODO: This would probably work better with a Trie
// or a similar data structure
export const detectPrefix = (files) => {
  // Split paths along slashes
  const stems = new Set(files.map(
    f => trimLeadingSlash(f.path).split('/')[0]
  ))

  // A stem is detected if there is one
  // and only one common initial path
  return stems.size === 1
    ? '/' + stems.values().next().value
    : ''
    // TODO: The code above is somewhat ugly,
    // because the set contents is only available
    // through an iterator.
    // Maybe there's a nicer solution?
}
