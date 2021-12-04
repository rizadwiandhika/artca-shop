const Art = require('./art')
// const Cart = require('./cart')
// const Complaint = require('./complaint')
const Courier = require('./courier')
const Discussion = require('./discussion')
const ExpeditionStatus = require('./expedition-status')
const PaymentMethodStep = require('./payment-method-step')
const PaymentMethod = require('./payment-method')
// const Review = require('./review')
const Reply = require('./reply')
const Transaction = require('./transaction')
// const TransactionDetail = require('./trasaction-detail')
const User = require('./user')

function initializeRelation() {
  // ! Relasi many-to-many harus terakhir,
  // ! kalo ngga nanti ada bug: foreign key ngga ikut ke insert
  // contoh: user.addProduct({...}), foreignkey user pada product ngga ada

  User.hasMany(Art)
  Art.belongsTo(User)

  // TransactionDetail.hasOne(Review)
  // Review.belongsTo(TransactionDetail)

  // TransactionDetail.hasOne(Complaint)
  // Complaint.belongsTo(TransactionDetail)

  Courier.hasMany(Transaction)
  Transaction.belongsTo(Courier)

  ExpeditionStatus.hasMany(Transaction)
  Transaction.belongsTo(ExpeditionStatus)

  PaymentMethod.hasMany(Transaction)
  Transaction.belongsTo(PaymentMethod)

  User.hasMany(Transaction)
  Transaction.belongsTo(User)

  PaymentMethod.hasMany(PaymentMethodStep)
  PaymentMethodStep.belongsTo(PaymentMethod)

  // User.belongsToMany(Art, { through: Cart })
  // Art.belongsToMany(User, { through: Cart })

  User.belongsToMany(Art, { through: Discussion })
  Art.belongsToMany(User, { through: Discussion })

  User.belongsToMany(Discussion, { through: Reply })
  Discussion.belongsToMany(User, { through: Reply })

  // Art.belongsToMany(Transaction, { through: TransactionDetail })
  // Transaction.belongsToMany(Art, { through: TransactionDetail })
  Art.hasMany(Transaction)
  Transaction.belongsTo(Art)
}

module.exports = {
  initializeRelation
}

/* 
model.User.belongsToMany(model.Art, { through: model.Cart })
model.Art.belongsToMany(model.User, { through: model.Cart })

model.User.belongsToMany(model.Art, { through: model.Discussion })
model.Art.belongsToMany(model.User, { through: model.Discussion })

model.User.belongsToMany(model.Discussion, { through: model.Reply })
model.Discussion.belongsToMany(model.User, { through: model.Reply })

model.Art.belongsToMany(model.Transaction, { through: model.TransactionDetail })
model.Transaction.belongsToMany(model.Art, { through: model.TransactionDetail })

model.Art.belongsTo(model.User)

model.Review.belongsTo(model.TransactionDetail)

model.Complaint.belongsTo(model.TransactionDetail)

model.Transaction.belongsTo(model.Courier)
model.Transaction.belongsTo(model.ExpeditionStatus)
model.Transaction.belongsTo(model.PaymentMethod)
model.Transaction.belongsTo(model.User)

model.PaymentMethodStep.belongsTo(model.PaymentMethod)
*/
