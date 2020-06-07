const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterruptSchema = Schema({
	Lado: String,
	Fecha: {date: Date},
	date: {type: Date, default: Date()}
});

module.exports = mongoose.model('inter', InterruptSchema);