const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	vote: {
		type: Number,
		default: 0,
		require: true
	  },
	title: {
		type: String,
		require: true
	},
	post: {
		type: String,
		require: true
	},
	comments: {
		type: Array,
		default: []
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});
let Article;
module.exports = Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);
