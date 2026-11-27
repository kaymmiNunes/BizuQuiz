// Testes de regressão do motor: executar node tests/quiz.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = process.argv[2] || path.resolve(__dirname, '..');
const engine = fs.readFileSync(path.join(root,'assets/js/quiz.js'),'utf8');
const subjects = {informatica:'Informatica',portugues:'Português',artes:'artes',historia:'historia',matematica:'matematica',quimica:'quimica'};
function setup(code) {
  const elements = Object.fromEntries(['pergunta','bt1','bt2','bt3','bt4','.numerador'].map(k=>[k,{innerText:'',focusCount:0,focus(){this.focusCount++}}]));
  const location = {href:''};
  const ctx = vm.createContext({document:{getElementById:id=>elements[id],querySelector:id=>elements[id]},window:{location}});
  vm.runInContext(code,ctx);
  const questions = JSON.parse(vm.runInContext('JSON.stringify(perguntas)',ctx));
  return {ctx,questions,elements,location};
}
function snapshot(s) {return {display:Object.fromEntries(Object.entries(s.elements).map(([k,v])=>[k,[v.innerText,v.focusCount]])),href:s.location.href};}
function compare(a,b,label){assert.deepEqual(snapshot(a),snapshot(b),label);}
function answer(s,option){vm.runInContext(`responder(${option})`,s.ctx);}
for (const [slug,materia] of Object.entries(subjects)) {
  const code=fs.readFileSync(path.join(root,'assets/data/questoes',slug+'.js'),'utf8')+'\n'+engine;
  const originalPath=path.join(root,'.original-tests',slug+'.js');
  const original=fs.existsSync(originalPath)?fs.readFileSync(originalPath,'utf8'):null;
  let s=setup(code), old=original?setup(original):null;
  assert(s.questions.length>0,slug);
  if(old){assert.deepEqual(s.questions,old.questions,slug+' dados');compare(s,old,slug+' inicial');}
  for(let i=0;i<s.questions.length;i++){
    const q=s.questions[i];
    assert(typeof q.pergunta==='string' && q.respostas.length===4 && Number.isInteger(q.correta) && q.correta>=0 && q.correta<4,slug+' esquema');
    assert.equal(s.elements.pergunta.innerText,q.pergunta);
    assert.equal(s.elements['.numerador'].innerText,`Questão ${i+1} de ${s.questions.length}`);
    q.respostas.forEach((v,j)=>assert.equal(s.elements['bt'+(j+1)].innerText,v));
    // Todas as alternativas erradas, em todos os índices.
    for(let wrong=0;wrong<4;wrong++)if(wrong!==q.correta){
      const fail=setup(code), before=original?setup(original):null;
      for(let j=0;j<i;j++){answer(fail,s.questions[j].correta);if(before)answer(before,s.questions[j].correta);}
      answer(fail,wrong);assert.equal(fail.location.href,'erro.html');
      if(before){answer(before,wrong);compare(fail,before,slug+' derrota '+i+' '+wrong);}
    }
    answer(s,q.correta);
    if(old){answer(old,q.correta);compare(s,old,slug+' acerto '+i);}
  }
  assert.equal(s.location.href,'../../parabens/parabens.html?materia='+encodeURIComponent(materia));
  assert.equal(s.elements.pergunta.focusCount,s.questions.length-1);
  console.log(`OK ${slug}: ${s.questions.length} questões, vitória e todas as alternativas incorretas`);
}
