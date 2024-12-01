const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Rsvp = require('./rsvp')

const eventSchema = new Schema({
	category: {
		type: String,
		enum: ["Educational", "Recreational", "Undergraduate", "Graduate", "Other"],
		required: [true, "Category is required"],
	},
	title: {
		type: String,
		required: [true, "Title is required"],
	},
	host: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	location: {
		type: String,
		required: [true, "Location is required"],
	},
	start: {
		type: Date,
		required: [true, "Start date is required"],
	},
	end: {
		type: Date,
		required: [true, "End date is required"],
	},
	details: {
		type: String,
		required: [true, "Details are required"],
		minlength: 10,
	},
	image: {
		type: String,
		required: [true, "Image is required"],
		unique: true,
	},
});

eventSchema.pre("findOneAndDelete", function (next) { 
	Rsvp.deleteMany({ event: this.getFilter()._id })
		.then(res => {
			console.log(res)
			next()
		})
		.catch(err => next(err));
});

module.exports = mongoose.model("Event", eventSchema);