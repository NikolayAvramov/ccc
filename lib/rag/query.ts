const META_PATTERNS = [
  /българск/i,
  /\bезик\b/i,
  /как работиш/i,
  /как се справяш/i,
  /кой си\b/i,
  /какво правиш/i,
  /как да те ползвам/i,
  /какво можеш/i,
  /what can you do/i,
  /how do you work/i,
];

const CAR_HINT_PATTERNS = [
  /porsche|jaguar|ferrari|bmw|mercedes|toyota|ford|chevrolet|lamborghini|aston|volkswagen|honda|mazda|nissan|audi|alfa|plymouth|shelby|corvette|mustang|miura|beetle|supra|cobra|quattro|nsx|skyline|land cruiser|e-type|356|911|vin\b|двигател|шаси|колекционер|реставрац|matching numbers|класическ/i,
];

export function isAssistantMetaQuestion(query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return false;

  const isMeta = META_PATTERNS.some((pattern) => pattern.test(trimmed));
  if (!isMeta) return false;

  const mentionsCars = CAR_HINT_PATTERNS.some((pattern) => pattern.test(trimmed));
  return !mentionsCars;
}

export function isBulgarianQuery(query: string): boolean {
  return /[а-яА-ЯёЁ]/.test(query);
}
