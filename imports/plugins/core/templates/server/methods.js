import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Reaction from "/imports/plugins/core/core/server/Reaction";
import ReactionError from "@reactioncommerce/reaction-error";
import { Templates } from "/lib/collections";

/**
 * @file Methods for Templates. Run these methods using `Meteor.call()`.
 *
 *
 * @namespace Templates/Methods
*/

export const methods = {
  /**
   * @name templates/email/update
   * @method
   * @memberof Templates/Methods
   * @todo Add permissions
   * @summary Updates email template in Templates collection
   * @param {String} templateId - id of template to remove
   * @param {Object} doc - data to update
   * @return {Number} remove template
   */
  "templates/email/update"(templateId, doc) {
    check(templateId, String);
    check(doc, Object);

    const shopId = Reaction.getShopId();
    const userId = Reaction.getUserId();

    // Check that this user has permission to update templates for the active shop
    if (!Reaction.hasPermission("reaction-templates", userId, shopId)) {
      throw new ReactionError("access-denied", "Access Denied");
    }

    return Templates.update({
      _id: templateId,
      type: "email",
      shopId // Ensure that the template we're attempting to update is owned by the active shop.
    }, {
      $set: {
        title: doc.title,
        name: doc.name,
        language: doc.language,
        template: doc.template,
        subject: doc.subject,
        enabled: doc.enabled
      }
    });
  }
};

Meteor.methods(methods);
