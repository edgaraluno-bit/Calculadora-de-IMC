const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

function classifyIMC(imc) {
  if (imc < 18.5) return 'magreza';
  if (imc >= 18.5 && imc <= 24.9) return 'eutrofia';
  if (imc >= 25 && imc <= 29.9) return 'sobrepeso';
  if (imc >= 30 && imc <= 34.9) return 'obesidade grau I';
  if (imc >= 35 && imc <= 40) return 'obesidade grau II';
  return 'obesidade grau III';
}

app.post('/api/imc', (req, res) => {
  const { weight, height } = req.body;
  const imc = weight / (height * height);
  const category = classifyIMC(imc);
  res.json({ imc, category });
});

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
