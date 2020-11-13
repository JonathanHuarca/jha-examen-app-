const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  nombre: String,
  ciclo: Number,
  nota: Number ,
  descripcion: String,
  observacion: String,
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('tasks', TaskSchema);
