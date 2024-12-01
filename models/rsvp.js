const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rsvpSchema = new Schema(
  {
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			required: true,
		},
		status: {
			type: String,
			enum: ["YES", "NO", "MAYBE"],
			required: true,
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

module.exports = mongoose.model("Rsvp", rsvpSchema);
