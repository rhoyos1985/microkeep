import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';

import { Keeps } from './keeps.js';

const KEEP_ID = new SimpleSchema({
  keepId: { type: String },
}).validator();

const KEEPVALIDATE = new SimpleSchema({
    keep: { type: String },
    priority: {type: Number},
}).validator();

const UPDATEKEEPVALIDATE = new SimpleSchema({
    keepId: { type: String },
    newKeep: { type: String },
    newPriority: { type: Number },
}).validator();

export const insert = new ValidatedMethod({
    name: 'keeps.insert',
    validate: KEEPVALIDATE,
    run({ keep, priority }) {

        if (!this.userId) {
            throw new Meteor.Error('Error not user id','Error not user id');
        }

        const keeps = {
            userId: this.userId,
            keep,
            priority,
        };

        return Keeps.insert(keeps, (err)=>{
            if(!err){
                console.log(err);
            }
        });
    },
});

export const update = new ValidatedMethod({
  name: 'keep.update',
  validate: UPDATEKEEPVALIDATE,
  run({ keepId, newKeep, newPriority }) {
    const keep = Keeps.findOne(keepId);

    Keeps.update(keepId, {
      $set: { keep: newKeep, priority: newPriority },
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'lists.remove',
  validate: KEEP_ID,
  run({ keepId }) {
    const keep = Keeps.findOne(keepId);

    /*if (!list.editableBy(this.userId)) {
      throw new Meteor.Error('api.lists.remove.accessDenied',
        'You don\'t have permission to remove this list.');
    }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data

    if (list.isLastPublicList()) {
      throw new Meteor.Error('api.lists.remove.lastPublicList',
        'Cannot delete the last public list.');
    }*/

    Keeps.remove(keepId);
  },
});