function normalizeRootUrl(url) {
  if (url === '/') return '';

  return url;
}

module.exports.normalizeRootUrl = normalizeRootUrl;

