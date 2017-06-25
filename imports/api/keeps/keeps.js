import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


class KeepsCollection extends Mongo.Collection {
  	insert(doc, callback) {
  		const ourDoc = {
  			userId: doc.userId,
  			description: doc.text,
  		};
  		const result = super.insert(ourDoc, callback);
  		return result;
  	}
  	update(selector, modifier, options, callback) {
  		const result = super.update(selector, modifier);
  		return result;
  	}
  	remove(selector, callback) {
  		const categorie = this.find(selector).fetch();
  		const result = super.remove(categorie);
  		return result;
  	}
}

export const Keeps = new CategoriesCollection('Keeps');

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
		default:1,	
	},
	createAt: {
		type: Date,
		autoValue: () => {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} 
		},
		denyUpdate: true,
		optional: true,
	},
	updateAt: {
		type: Date,
		autoValue: () => {
			if (this.isUpdate) {
				return new Date();
			} 
		},
		denyInsert: true,
		optional: true,	
	},
});

Keeps.attachSchema(Keeps.schema);