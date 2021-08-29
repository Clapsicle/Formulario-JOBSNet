const Candidate = require("../models/Candidate");

module.exports = {
  async register(req, res) {
    const allowedFields = [
      'nome',
      'cargo',
      'dataNasc',
      'estadoCivil',
      'genero',
      'cep',
      'endereco',
      'numero',
      'bairro',
      'cidade',
      'estado',
      'email',
      'celular',
      'identidade',
      'cpf',
      'habilitacao',
      'carro',
      'tel1',
      'tel2',
    ];

    const newCandidate = new Candidate();

    Object.keys(req.body).forEach((field) => {
        if (allowedFields.includes(field)) {
            newCandidate[field] = req.body[field];
        }
    })

    await newCandidate.save((err, savedCandidate) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Ops, temos um erro!");
      }

      return res.status(200).send(savedCandidate);
    });
  },
};
