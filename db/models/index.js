const { User, UserSchema } = require('./user.model')
const { Request, RequestSchema } = require('./request.model')
const { Administrator, AdministratorSchema } = require('./administrator.model')
const { Document, DocumentSchema } = require('./document.model')
const { Address, AddressSchema } = require('./address.model')
const { Schedule, ScheduleSchema } = require('./schedule.model')
const { UsersRequests, UsersRequestsSchema } = require('./users.requests.model')
const { Cities, CitiesSchema } = require('./cities.model')
const { Location, LocationSchema } = require('./locations.model')
const { State, StateSchema } = require('./state.model')

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize))
    Request.init(RequestSchema, Request.config(sequelize))
    Administrator.init(AdministratorSchema, Administrator.config(sequelize))
    Document.init(DocumentSchema, Document.config(sequelize))
    Address.init(AddressSchema, Address.config(sequelize))
    Schedule.init(ScheduleSchema, Schedule.config(sequelize))
    UsersRequests.init(UsersRequestsSchema, UsersRequests.config(sequelize))
    Cities.init(CitiesSchema, Cities.config(sequelize))
    Location.init(LocationSchema, Location.config(sequelize))
    State.init(StateSchema, State.config(sequelize))

    Document.associate(sequelize.models)
    User.associate(sequelize.models)
    Address.associate(sequelize.models)
    Cities.associate(sequelize.models)
    Location.associate(sequelize.models)
    State.associate(sequelize.models)
}

module.exports = setupModels