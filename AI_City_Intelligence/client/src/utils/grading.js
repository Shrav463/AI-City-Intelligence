// client/src/utils/grading.js

export function getGrade(score) {
  if (score >= 93) return 'A+';
  if (score >= 87) return 'A';
  if (score >= 80) return 'A-';
  if (score >= 77) return 'B+';
  if (score >= 73) return 'B';
  if (score >= 70) return 'B-';
  if (score >= 67) return 'C+';
  if (score >= 63) return 'C';
  if (score >= 60) return 'C-';
  if (score >= 57) return 'D+';
  if (score >= 53) return 'D';
  return 'F';
}

export function getGradeColor(grade) {
  if (!grade) return 'var(--ink-dim)';
  if (grade.startsWith('A')) return 'var(--green)';
  if (grade.startsWith('B')) return 'var(--accent)';
  if (grade.startsWith('C')) return 'var(--yellow)';
  return 'var(--red)';
}

export function getVerdict(key, score) {
  const verdicts = {
    safety:   ['Crime-ridden','Risky','Watch your back','Decent','Pretty safe','Safe streets','Very secure','Fort Knox vibes'],
    afford:   ['Wallet-punishing','Pricey','Stretching budgets','Manageable','Fair value','Good deal','Cheap living','Budget paradise'],
    job:      ['No prospects','Slim pickings','Limited roles','Some options','Active market','Good hiring','Booming','Talent magnet'],
    lifestyle:['Sleepy hollow','Low-key','Quiet life','Balanced','Lively scene','Vibrant','Exciting','Never dull'],
    transit:  ['Car-dependent','Sparse transit','Works, barely','Adequate','Good coverage','Solid network','Excellent','Transit heaven'],
    food:     ['Fast food only','Limited options','Chain city','Growing scene','Decent variety','Solid dining','Culinary hotspot','World-class'],
    nature:   ['Concrete jungle','Parks are rare','Some green','Decent nature','Nice outdoors','Great parks','Nature-rich','Wild paradise'],
    expat:    ['Tough to settle','Hard start','Challenging','Doable','Welcoming','Friendly','Very open','Expat haven'],
  };
  const list = verdicts[key] || [];
  return list[Math.min(7, Math.floor(score / 12.6))] || '';
}
