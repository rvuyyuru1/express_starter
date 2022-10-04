const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ProjectSchema = new schema(
  {
    name: { type: String, required: true },
    labelColor: { type: String },
    user_id: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  },
  { timestamps: true, autoIndex: true, optimisticConcurrency: true },
);
module.exports = Project = mongoose.model('projects', ProjectSchema);
