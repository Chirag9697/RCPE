"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const objection_1 = require("objection");
const roles_1 = require("../../roles/domain/roles");
const recipies_1 = require("../../recipies");
const favourite_recipies_1 = require("../../favourite-recipies/domain/favourite-recipies");
class users extends objection_1.Model {
    static get tableName() {
        return 'users';
    }
}
exports.users = users;
users.relationMappings = {
    roles: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: roles_1.roles,
        join: {
            from: 'users.id',
            to: 'roles.roleuser'
        }
    },
    userrelation: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: recipies_1.recipies,
        join: {
            from: "users.id",
            to: "recipies.ownerid"
        }
    },
    userfavouriterelation: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: favourite_recipies_1.favouriterecipies,
        join: {
            from: "users.id",
            to: "favouriterecipies.userid",
        }
    },
};
//# sourceMappingURL=users.js.map