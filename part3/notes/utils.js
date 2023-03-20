const generateId = (notes) =>
  notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 0;

module.exports = { generateId };
