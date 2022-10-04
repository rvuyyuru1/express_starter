const mongoose = require('mongoose');
const schema = mongoose.Schema;
const todoSchema = new schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    subtitle: {
      type: String,
    },
    is_done: {
      type: Boolean,
      default: false,
    },
    lastDate: {
      type: Date,
    },
    project_id: {
      type: schema.Types.ObjectId,
      required: true,
      ref: 'projects',
    },
  },
  { timestamps: true, autoIndex: true, optimisticConcurrency: true },
);
module.exports = Todos = mongoose.model('todos', todoSchema);
