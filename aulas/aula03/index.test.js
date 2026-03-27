import {soma, divisao} from './index.js';

if (soma(1,1) === 2) console.log("passou 1º!");
else console.error("deu ruim 1º!");

if (soma(1,0) === 1) console.log("passou 2º!");
else console.error("deu ruim 2º!");

if (soma(1,-1) === 0) console.log("passou 3º!");
else console.error("deu ruim 3º!");

if (divisao(1,1) === 1) console.log("passou 4º!");
else console.error("deu ruim 4º!");

if (divisao(6,3) === 2) console.log("passou 5º!");
else console.error("deu ruim 5º!");

if (divisao(1,0) === undefined) console.log("passou 6º!");
else console.error("deu ruim 6º!");