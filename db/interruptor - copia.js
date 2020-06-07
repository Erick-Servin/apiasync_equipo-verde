const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterruptSchema = Schema({
	Lado: String,
	Fecha: new Date()
});

module.exports = mongoose.model('inter', InterruptSchema);