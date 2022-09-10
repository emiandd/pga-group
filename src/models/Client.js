const { DataTypes } = require('sequelize');

module.exports = sequelize => {

	sequelize.define('client', {

		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false
		},

		contactName: {
			type: DataTypes.STRING,
			allowNull: false
		},

		address: {
			type: DataTypes.STRING,
			allowNull: false
		},

		country: {
			type: DataTypes.STRING,
			allowNull: false
		},

		city: {
			type: DataTypes.STRING,
			allowNull: false
		},

		postalCode: {
			type: DataTypes.STRING,
			allowNull: false
		}
	})
}
