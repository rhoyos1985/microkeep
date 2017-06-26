import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


class KeepsCollection extends Mongo.Collection {
  	insert(doc, callback) {
  		const ourDoc = doc
  		const result = super.insert(ourDoc, callback);
  		return result;
  	}
  	update(selector, modifier) {
  	    const result = super.update(selector, modifier);
  	    return result;
  	}
  	remove(selector, callback) {
  		const result = super.remove(selector);
  		return result;
  	}
}

export const Keeps = new KeepsCollection('Keeps');

// Deny all client-side updates since we will be using methods to manage this collection
Keeps.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Keeps.schema = new SimpleSchema({
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	keep: {
		type: String,
		max: 250,
	},
	priority:{
		type: Number,
		min: 1,
		defaultValue:1,	
	},
	createAt: {
		type: Date,
		autoValue: function() {
      		if (this.isInsert) {
        		return new Date();
      		} else if (this.isUpsert) {
        		return {$setOnInsert: new Date()};
      		} else {
        		this.unset();  // Prevent user from supplying their own value
      		}
    	},	
	},
	updatedAt: {
    	type: Date,
    	autoValue: function() {
    		if (this.isUpdate) {
        		return new Date();
      		}
    	},
    	denyInsert: true,
    	optional: true
  	},
});

Keeps.attachSchema(Keeps.schema);

Keeps.publicFields = {
  keep: 1,
  priority: 1,
  createAt: 1,
};